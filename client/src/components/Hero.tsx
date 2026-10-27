import { useLayoutEffect, useRef, useState } from 'react';
import { ArrowDownRight } from 'lucide-react';
import { usePortfolioContent } from '../LocaleContext';
import About, { AboutFacts } from './About';
import { createPixelWall, type CalmRect, type PixelWall, type Rect, type WallLayout } from './pixelWall/engine';
import { useReducedMotion } from './pixelWall/useReducedMotion';

/** Mirrors the engine lifecycle; also the hook for tests and the CSS fallback. */
type WallState = 'loading' | 'entering' | 'idle' | 'static' | 'off';

const PORTRAIT_RATIO = 7 / 9;

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
  const actionsRef = useRef<HTMLDivElement>(null);
  const aboutSlotRef = useRef<HTMLDivElement>(null);
  const image = profile.image;
  const hiddenSurname = profile.name.replace(`${profile.firstName} ${profile.lastName}`, '').trim();

  useLayoutEffect(() => {
    const story = storyRef.current;
    const stage = stageRef.current;
    const heroBox = heroBoxRef.current;
    const canvas = canvasRef.current;
    const frameBox = frameBoxRef.current;
    const frame = frameRef.current;
    const actions = actionsRef.current;
    const aboutSlot = aboutSlotRef.current;
    if (!story || !stage || !heroBox || !canvas || !frameBox || !frame || !actions || !aboutSlot) return;

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
      story.querySelectorAll<HTMLElement>('[data-calm]').forEach((el) => {
        const rect = relative(el, base);
        if (rect.w > 0) calm.push({ ...rect, level: el.dataset.calm === '1' ? 1 : 2 });
      });
      // The fixed topbar sits over the top of the wall whenever the hero is on screen.
      document.querySelectorAll<HTMLElement>('.topbar [data-calm]').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width > 0) calm.push({ x: r.left - base.left, y: r.top, w: r.width, h: r.height, level: 2 });
      });
      const early = Array.from(story.querySelectorAll('[data-early]')).map((el) => relative(el, base));
      return {
        width: base.width,
        height: base.height,
        tile: base.width < 760 ? 9 : 12,
        calm,
        early,
        hero: relative(frame, base),
        about: motion ? relative(aboutSlot, base) : null,
      };
    };

    let lastProgress = -1;
    let ctaHidden = false;
    let scrollRaf = 0;
    let layoutRaf = 0;

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
      const hide = progress > 0.3;
      if (hide !== ctaHidden) {
        ctaHidden = hide;
        actions.inert = hide;
      }
      const topbarHeight = document.querySelector<HTMLElement>('.topbar__inner')?.offsetHeight ?? 64;
      const onWall = motion && wall
        ? progress < 0.1 && rect.bottom > topbarHeight
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

    if (wall) {
      const photo = new Image();
      photo.decoding = 'async';
      photo.onload = () => {
        if (disposed || !wall) return;
        wall.setPhoto(photo);
        if (motion && lastProgress <= 0.01 && wall.startEntry()) applyState('entering');
      };
      photo.onerror = () => {
        if (disposed) return;
        wall?.destroy();
        wall = null;
        applyState('off');
        scheduleLayout();
      };
      photo.src = image;
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

    let visible = true;
    const syncActive = () => wall?.setActive(visible && !document.hidden);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncActive();
    });
    intersection.observe(heroBox);
    document.addEventListener('visibilitychange', syncActive);
    window.addEventListener('scroll', scheduleScroll, { passive: true });
    window.addEventListener('resize', scheduleLayout);
    document.fonts?.ready.then(() => {
      if (!disposed) scheduleLayout();
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(scrollRaf);
      cancelAnimationFrame(layoutRaf);
      wall?.destroy();
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
                    src={image}
                    alt={ui.hero.portraitAlt}
                    width={1200}
                    height={1600}
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
              <h1 id="hero-title" className="hero__name" data-calm="1">
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
            </section>
          </div>
          <About slotRef={aboutSlotRef} />
        </div>
        <span id="sobre" className="story__anchor" aria-hidden="true" />
      </div>
      <div className="about-facts-flow">
        <AboutFacts className="about__facts--flow" />
      </div>
    </>
  );
}
