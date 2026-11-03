import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type Ref } from 'react';
import { ArrowDownRight } from 'lucide-react';
import '../styles/hero-badges.css';
import { usePortfolioContent } from '../LocaleContext';
import About, { AboutFacts } from './About';
import { createPixelWall, type CalmRect, type PixelWall, type Rect, type WallLayout } from './pixelWall/engine';
import { createStoryGlide } from './pixelWall/storyGlide';
import { useReducedMotion } from './pixelWall/useReducedMotion';

/** Mirrors the engine lifecycle; also the hook for tests and the CSS fallback. */
type WallState = 'loading' | 'entering' | 'idle' | 'static' | 'off';

const PORTRAIT_RATIO = 7 / 9;
// The portrait crop (x 120–820, y 440–1340 of profile.jpg) as WebP. The preload in index.html repeats
// both strings verbatim, so the browser picks the same file there and here (one download).
const PORTRAIT_SRCSET = '/images/profile-portrait-480.webp 480w, /images/profile-portrait-700.webp 700w';
// Upper bounds of the frame width: stacked layout (index.css) under 100vw minus two gutters, else 46%.
const PORTRAIT_SIZES = '(max-width: 759px) calc(100vw - 40px), (max-aspect-ratio: 4/5) calc(100vw - 40px), 46vw';
// Keep in sync with the engine and index.css: hero copy is gone at 0.18, the topbar turns to paper at 0.3.
const TEXT_GONE = 0.18;
const TOPBAR_PAPER = 0.3;

function relative(el: Element, base: DOMRect): Rect {
  const r = el.getBoundingClientRect();
  return { x: r.left - base.left, y: r.top - base.top, w: r.width, h: r.height };
}

function cssNumber(el: Element, name: string, fallback: number): number {
  const value = parseFloat(getComputedStyle(el).getPropertyValue(name));
  return Number.isFinite(value) ? value : fallback;
}

function setTopbarSurface(surface: 'wall' | 'paper') {
  const root = document.documentElement;
  if (root.dataset.topbar !== surface) root.dataset.topbar = surface;
}

type HeroCredsProps = { flow?: boolean; near: boolean; ref?: Ref<HTMLAnchorElement> };

/** Slices of the badge's thickness (depth and shade per slice live in hero-badges.css). */
const EDGE_SLICES = [0, 1, 2, 3, 4, 5, 6];
/** Pixel shadow under each badge: 5 floor tiles. */
const FLOOR_TILES = [0, 1, 2, 3, 4];

/** Compact row of the key credentials; links to the full section. The art (faces and the slices'
    mask) only exists once the row is near the viewport (`near`, from Hero), so the row that CSS
    hides at this width, or the phone row still below the story, never downloads it at load. */
function HeroCreds({ flow = false, near, ref }: HeroCredsProps) {
  const { content } = usePortfolioContent();
  const { hero } = content.ui;
  return (
    <a
      className={`hero__creds ${flow ? 'hero__creds--flow' : ''}`}
      href="#credenciais"
      data-calm={flow ? undefined : '2'}
      ref={ref}
    >
      {/* Named by its own text, so the name always contains what is on screen (the full or the short
          line, whichever the layout shows); the context and the commas are for screen readers only. The
          spaces between the pieces are not rendered in these grid/flex boxes, but keep the words apart. */}
      <span className="sr-only">{hero.credsLabel}: </span>
      {hero.creds.map((cred, index) => (
        <span className="hero__cred" key={cred.title}>
          {/* A small 3D badge: the art as front and back faces, slices masked by the art as its thickness.
              It only spins while the row says data-spin="on" (hero-badges.css). The <img> asks for the art
              in CORS mode, like the mask, so faces and slices share one download of the same file. */}
          <span
            aria-hidden="true"
            className={`hero__cred-emblem ${cred.logo ? 'hero__cred-emblem--logo' : ''}`}
            data-badge={cred.art.split('/').pop()?.replace(/(-\d+)?\.\w+$/, '')}
            style={{ '--i': index, ...(near && { '--art': `url("${cred.art}")` }) } as CSSProperties}
          >
            <span className="hero__cred-float">
              <span className="hero__cred-sculpt">
                {near && EDGE_SLICES.map((slice) => (
                  <i className="hero__cred-slice" key={slice} />
                ))}
                <span className="hero__cred-face">
                  {near && <img src={cred.art} alt="" crossOrigin="anonymous" decoding="async" fetchPriority="low" />}
                </span>
                <span className="hero__cred-face hero__cred-face--back">
                  {near && <img src={cred.art} alt="" crossOrigin="anonymous" decoding="async" fetchPriority="low" />}
                </span>
              </span>
            </span>
            <span className="hero__cred-floor">
              {FLOOR_TILES.map((tile) => (
                <i key={tile} />
              ))}
            </span>
          </span>
          <span className="hero__cred-text">
            <strong>{cred.title}</strong> <span>{cred.sub}</span>
          </span>
          <span className="hero__cred-short">{cred.short}</span>
          <span className="sr-only">{index < hero.creds.length - 1 ? ', ' : '. '}</span>{' '}
        </span>
      ))}
      <span className="sr-only">{hero.credsMore}</span>
    </a>
  );
}

export default function Hero() {
  const { content } = usePortfolioContent();
  const { profile, ui } = content;
  const reduced = useReducedMotion();
  const [wallState, setWallState] = useState<WallState>(reduced ? 'static' : 'loading');
  const storyRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const heroBoxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameBoxRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLImageElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const credsRef = useRef<HTMLAnchorElement>(null);
  const flowCredsRef = useRef<HTMLAnchorElement>(null);
  const aboutSlotRef = useRef<HTMLDivElement>(null);
  const [credsNear, setCredsNear] = useState(false);
  const [flowCredsNear, setFlowCredsNear] = useState(false);
  const image = profile.image;
  const hiddenSurname = profile.name.replace(`${profile.firstName} ${profile.lastName}`, '').trim();

  // Each credential row gets its art once it is within half a screen of the viewport. A row hidden by
  // CSS never intersects, so it never loads; the portrait (LCP) keeps the bandwidth at load.
  useEffect(() => {
    const hero = credsRef.current;
    const rows = [hero, flowCredsRef.current].filter((row): row is HTMLAnchorElement => row !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          if (entry.target === hero) setCredsNear(true);
          else setFlowCredsNear(true);
        }
      },
      { rootMargin: '50% 0px' },
    );
    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, []);

  // Phones: the badges in the row after the story spin only while that row is on screen
  // (hidden by CSS elsewhere, so it never intersects there).
  useEffect(() => {
    const row = flowCredsRef.current;
    if (!row) return;
    const observer = new IntersectionObserver(([entry]) => {
      row.dataset.spin = entry.isIntersecting ? 'on' : 'off';
    });
    observer.observe(row);
    return () => {
      observer.disconnect();
      delete row.dataset.spin;
    };
  }, []);

  useLayoutEffect(() => {
    const story = storyRef.current;
    const stage = stageRef.current;
    const heroBox = heroBoxRef.current;
    const canvas = canvasRef.current;
    const frameBox = frameBoxRef.current;
    const frame = frameRef.current;
    const photo = portraitRef.current;
    const actions = actionsRef.current;
    const creds = credsRef.current;
    const aboutSlot = aboutSlotRef.current;
    if (!story || !stage || !heroBox || !canvas || !frameBox || !frame || !photo || !actions || !creds || !aboutSlot) return;

    const motion = !reduced;
    let disposed = false;
    let wall: PixelWall | null = null;

    const applyState = (next: WallState) => {
      story.dataset.wall = next; // the layout must switch before we measure it
      setWallState(next);
    };

    try {
      wall = createPixelWall(canvas, {
        mode: motion ? 'story' : 'static',
        motion,
        onEntryEnd: () => {
          if (!disposed) applyState('idle');
        },
      });
    } catch {
      wall = null;
    }
    applyState(wall ? (motion ? 'loading' : 'static') : 'off');

    const sizeFrame = () => {
      const box = frameBox.getBoundingClientRect();
      const fill = cssNumber(frameBox, '--frame-fill', 0.96);
      const align = cssNumber(frameBox, '--frame-align', 0.5);
      const height = Math.max(0, Math.min(box.height * fill, box.width / PORTRAIT_RATIO));
      const width = height * PORTRAIT_RATIO;
      frame.style.width = `${width}px`;
      frame.style.height = `${height}px`;
      frame.style.left = `${(box.width - width) / 2}px`;
      frame.style.top = `${(box.height - height) * align}px`;
    };

    const measure = (): WallLayout => {
      const base = canvas.getBoundingClientRect();
      const calm: CalmRect[] = [];
      const late: Rect[] = [];
      story.querySelectorAll<HTMLElement>('[data-calm]').forEach((el) => {
        const rect = relative(el, base);
        if (rect.w > 0) calm.push({ ...rect, level: el.dataset.calm === '1' ? 1 : 2 });
      });
      // The fixed topbar sits over the top of the wall whenever the hero is on screen.
      document.querySelectorAll<HTMLElement>('.topbar [data-calm]').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width === 0) return;
        const rect = { x: r.left - base.left, y: r.top, w: r.width, h: r.height };
        calm.push({ ...rect, level: 2 });
        late.push(rect);
      });
      const early = Array.from(story.querySelectorAll('[data-early]')).map((el) => relative(el, base));
      return {
        width: base.width,
        height: base.height,
        tile: base.width < 760 ? 9 : 12,
        calm,
        early,
        late,
        hero: relative(frame, base),
        about: motion ? relative(aboutSlot, base) : null,
        // Same breakpoint as the stacked (portrait) layout in index.css.
        fringe: window.matchMedia('(max-width: 759px), (max-aspect-ratio: 4/5)').matches ? 'steps' : 'scatter',
      };
    };

    let lastProgress = -1;
    let ctaHidden = false;
    let visible = true;
    let scrollRaf = 0;
    let layoutRaf = 0;

    // The credential badges spin only while the hero is on screen and its copy has not faded out.
    const syncSpin = () => {
      const spin = visible && !ctaHidden ? 'on' : 'off';
      if (creds.dataset.spin !== spin) creds.dataset.spin = spin;
    };

    const update = () => {
      scrollRaf = 0;
      const rect = story.getBoundingClientRect();
      let progress = 0;
      if (motion && wall) {
        const range = Math.max(1, rect.height - stage.offsetHeight);
        progress = Math.min(1, Math.max(0, -rect.top / range));
      }
      if (progress !== lastProgress) {
        lastProgress = progress;
        story.style.setProperty('--p', progress.toFixed(4));
        wall?.setProgress(progress);
      }
      const hide = progress >= TEXT_GONE; // same point where the copy reaches opacity 0
      if (hide !== ctaHidden) {
        ctaHidden = hide;
        actions.inert = hide;
        creds.inert = hide;
      }
      syncSpin();
      const topbarHeight = document.querySelector<HTMLElement>('.topbar__inner')?.offsetHeight ?? 64;
      const onWall = motion && wall
        ? progress < TOPBAR_PAPER && rect.bottom > topbarHeight
        : rect.top + heroBox.offsetHeight > topbarHeight * 1.5;
      setTopbarSurface(onWall ? 'wall' : 'paper');
    };

    const relayout = () => {
      layoutRaf = 0;
      sizeFrame();
      if (wall) wall.setLayout(measure());
      update();
    };

    const scheduleScroll = () => {
      if (!scrollRaf) scrollRaf = requestAnimationFrame(update);
    };
    const scheduleLayout = () => {
      if (!layoutRaf) layoutRaf = requestAnimationFrame(relayout);
    };

    relayout();

    // The wall paints the portrait <img> itself, so it reuses that one download, whichever file srcset picked.
    // decode() hands it over loaded, decoded and in a later task: the first paint never waits for the wall.
    // No photo to paint (failed load) or no canvas memory to paint it (iOS): the plain portrait stays.
    const dropWall = () => {
      wall?.destroy();
      wall = null;
      applyState('off');
      scheduleLayout();
    };
    const takePhoto = () => {
      if (disposed || !wall) return;
      if (!photo.naturalWidth) return dropWall();
      try {
        wall.setPhoto(photo);
      } catch {
        return dropWall();
      }
      if (motion && lastProgress <= 0.01 && wall.startEntry()) applyState('entering');
    };
    // decode() also rejects when srcset swaps files mid-load (resize, zoom): then decide once that file settles.
    const takeSettled = () => {
      photo.removeEventListener('load', takeSettled);
      photo.removeEventListener('error', takeSettled);
      takePhoto();
    };
    if (wall) {
      photo.decode().then(takePhoto, () => {
        if (photo.complete) return takePhoto();
        photo.addEventListener('load', takeSettled);
        photo.addEventListener('error', takeSettled);
      });
    }

    const local = (event: PointerEvent): [number, number] => {
      const box = canvas.getBoundingClientRect();
      return [event.clientX - box.left, event.clientY - box.top];
    };
    let touching = false;
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' && !touching) return;
      wall?.setPointer(...local(event), true);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'mouse') return;
      touching = true;
      wall?.setPointer(...local(event), true);
    };
    const onPointerEnd = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') touching = false;
      wall?.setPointer(...local(event), false);
    };
    const onPointerLeave = (event: PointerEvent) => {
      if (event.pointerType === 'mouse') wall?.setPointer(...local(event), false);
    };
    if (motion) {
      stage.addEventListener('pointermove', onPointerMove);
      stage.addEventListener('pointerdown', onPointerDown);
      stage.addEventListener('pointerup', onPointerEnd);
      stage.addEventListener('pointercancel', onPointerEnd);
      stage.addEventListener('pointerleave', onPointerLeave);
    }

    const resizeObserver = new ResizeObserver(scheduleLayout);
    resizeObserver.observe(heroBox);
    story.querySelectorAll('[data-calm], [data-early]').forEach((el) => resizeObserver.observe(el));
    const topbarInner = document.querySelector('.topbar__inner');
    if (topbarInner) resizeObserver.observe(topbarInner);

    const syncActive = () => wall?.setActive(visible && !document.hidden);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncActive();
      syncSpin();
    });
    intersection.observe(heroBox);
    document.addEventListener('visibilitychange', syncActive);
    window.addEventListener('scroll', scheduleScroll, { passive: true });
    window.addEventListener('resize', scheduleLayout);
    document.fonts?.ready.then(() => {
      if (!disposed) scheduleLayout();
    });
    // Hero → About plays whole, never skipped by a fast scroll (motion only).
    const stopGlide = motion && wall ? createStoryGlide(story, stage) : () => {};

    return () => {
      disposed = true;
      stopGlide();
      cancelAnimationFrame(scrollRaf);
      cancelAnimationFrame(layoutRaf);
      wall?.destroy();
      photo.removeEventListener('load', takeSettled);
      photo.removeEventListener('error', takeSettled);
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener('visibilitychange', syncActive);
      window.removeEventListener('scroll', scheduleScroll);
      window.removeEventListener('resize', scheduleLayout);
      stage.removeEventListener('pointermove', onPointerMove);
      stage.removeEventListener('pointerdown', onPointerDown);
      stage.removeEventListener('pointerup', onPointerEnd);
      stage.removeEventListener('pointercancel', onPointerEnd);
      stage.removeEventListener('pointerleave', onPointerLeave);
      actions.inert = false;
      creds.inert = false;
      delete creds.dataset.spin;
      story.style.removeProperty('--p');
      delete document.documentElement.dataset.topbar;
    };
  }, [reduced, image]);

  const interactive = wallState !== 'static' && wallState !== 'off';

  return (
    <>
      <div className="story" data-wall={wallState} ref={storyRef}>
        <div className="story__stage" ref={stageRef}>
          <div className="story__hero on-wall" ref={heroBoxRef}>
            <div className="story__frame-box" ref={frameBoxRef}>
              <div className="story__frame" ref={frameRef}>
                <div className="story__crop">
                  <img
                    ref={portraitRef}
                    src={image}
                    srcSet={PORTRAIT_SRCSET}
                    sizes={PORTRAIT_SIZES}
                    alt={ui.hero.portraitAlt}
                    width={700}
                    height={900}
                    decoding="async"
                    fetchPriority="high"
                  />
                </div>
                {interactive && (
                  <p className="hero__hint" aria-hidden="true">
                    <span className="hero__hint-pointer">{ui.hero.hintPointer}</span>
                    <span className="hero__hint-touch">{ui.hero.hintTouch}</span>
                  </p>
                )}
              </div>
            </div>
            <canvas className="story__canvas" ref={canvasRef} aria-hidden="true" />
            <section id="home" className="hero" aria-labelledby="hero-title">
              <p className="hero__hello" data-calm="2">{ui.hero.hello}</p>
              <h1 id="hero-title" className="hero__name" data-calm="2">
                <span>{profile.firstName}</span> <span>{profile.lastName}</span>
                {hiddenSurname && <span className="sr-only"> {hiddenSurname}</span>}
              </h1>
              <p className="hero__lead" data-calm="2">{ui.hero.lead}</p>
              <div className="hero__actions" data-calm="2" ref={actionsRef} role="group" aria-label={ui.hero.actionsLabel}>
                <a className="btn btn--pink" href="#projetos">
                  {ui.hero.primaryCta} <ArrowDownRight aria-hidden="true" />
                </a>
                <a className="btn btn--line" href="#contato">{ui.hero.secondaryCta}</a>
              </div>
              {/* The credentials that change the game, right at the start (on phones they follow the story). */}
              <HeroCreds ref={credsRef} near={credsNear} />
            </section>
          </div>
          <About slotRef={aboutSlotRef} />
        </div>
        <span id="sobre" className="story__anchor" aria-hidden="true" />
      </div>
      <div className="about-facts-flow">
        <AboutFacts className="about__facts--flow" />
      </div>
      <div className="creds-flow">
        <HeroCreds flow ref={flowCredsRef} near={flowCredsNear} />
      </div>
    </>
  );
}
