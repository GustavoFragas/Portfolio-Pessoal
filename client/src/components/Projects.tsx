import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { usePortfolioContent } from '../LocaleContext';
import type { CaseItem, PortfolioLocale } from '../data/portfolioLocales';
import { cardDiagrams, diagrams } from '../data/projectDiagrams';
import { hash2 } from './pixelWall/tiles';
import ProjectDiagram from './ProjectDiagram';
import { useReducedMotion } from './pixelWall/useReducedMotion';
import TileReveal from './TileReveal';

const BAND_TILES = 120;
const PROGRESS_TILES_PER_PROJECT = 6;
// Vertical scroll spent per pixel of horizontal travel, and the longest pinned stretch in screens:
// short laptops get a faster rail so the pinned part never feels endless.
const RAIL_PACE = 0.7;
const RAIL_MIN_PACE = 0.38;
const RAIL_MAX_SCREENS = 1.7;
// Laptops with the browser open (e.g. 1440×780) get the rail; the cards scale with the height.
const RAIL_QUERY = '(min-width: 1024px) and (min-height: 600px)';
// A link to one project leaves its card this far under the top bar (carousel cap, stack).
const PROJECT_LINK_GAP = 24;

type Mode = 'rail' | 'carousel' | 'stack';

// The technical-details drawer (its component, the enlarged drawings with their steps, before → after
// and the numbers) stays out of the initial bundle. It is prefetched when the browser is idle after the
// page's images (the hero photo is the LCP), or as soon as a "Technical details" button is pointed at,
// touched or focused, and then mounted closed, so a click opens it at once. A click before that opens
// it as soon as its chunk arrives. No lazy()/Suspense: a Suspense boundary would add React's reveal
// throttle to that first opening.
const loadDrawer = () => import('./TechDrawer');
type Drawer = Awaited<ReturnType<typeof loadDrawer>>['default'];

function detectMode(reduced: boolean): Mode {
  const railOk = CSS.supports('position', 'sticky') && CSS.supports('overflow', 'clip');
  return reduced ? 'stack' : window.matchMedia(RAIL_QUERY).matches && railOk ? 'rail' : 'carousel';
}

type Copy = ReturnType<typeof usePortfolioContent>['content']['ui']['projects'];

function bandTone(row: number, index: number): string {
  const value = hash2(index, row, 11);
  if (value < 0.42) return 'var(--wall-pink)';
  if (value < 0.78) return 'var(--wall-navy)';
  if (value < 0.9) return 'var(--wall-pink-soft)';
  return 'var(--wall-ink)';
}

/** The card's band of wall tiles (shown on hover or focus). Its tiles only exist once the card is
    first pointed at, touched or focused, so a visit that never does pays nothing for them at load;
    `@starting-style` in index.css lets that first appearance play the same wave. */
function ProjectBand({ row }: { row: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const card = ref.current?.parentElement;
    if (!card || armed) return;
    const arm = () => setArmed(true);
    card.addEventListener('pointerover', arm);
    card.addEventListener('focusin', arm);
    return () => {
      card.removeEventListener('pointerover', arm);
      card.removeEventListener('focusin', arm);
    };
  }, [armed]);

  return (
    <div className="project__band" aria-hidden="true" ref={ref}>
      {armed && Array.from({ length: BAND_TILES }, (_, index) => (
        <span key={index} style={{ '--i': index, '--c': bandTone(row, index) } as CSSProperties} />
      ))}
    </div>
  );
}

function ProjectCard({ item, row, copy, locale, onDetails, onPrepare }: { item: CaseItem; row: number; copy: Copy; locale: PortfolioLocale; onDetails: (row: number, opener: HTMLButtonElement) => void; onPrepare: () => void }) {
  const drawing = cardDiagrams[item.key];
  return (
    <li className="project" data-key={item.key}>
      <ProjectBand row={row} />
      <div className="project__top">
        <span className="project__num" aria-hidden="true">{String(row + 1).padStart(2, '0')}</span>
        <div>
          <p className="project__label">{item.label}</p>
          <h3>{item.title}</h3>
        </div>
      </div>
      <p className="project__headline">
        <span className="project__headline-text">{item.headline}</span>
        {item.headlineNote && <span className="project__headline-note">{item.headlineNote}</span>}
      </p>
      <p className="project__what">{item.what}</p>
      {drawing && <ProjectDiagram diagram={drawing} geometry={diagrams[drawing]} locale={locale} />}
      <div className="project__foot">
        <ul className="project__tags" aria-label={copy.tags}>
          {item.tags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
        <div className="project__actions">
          {/* Problem, what I did, result and validation live in the drawer: the card stays a glance. */}
          <button
            className="project__disclosure"
            type="button"
            aria-haspopup="dialog"
            aria-controls="project-tech"
            onPointerEnter={onPrepare}
            onFocus={onPrepare}
            onClick={(event) => onDetails(row, event.currentTarget)}
          >
            <span className="project__toggle" aria-hidden="true" />
            {copy.details}
          </button>
          {item.link && (
            <a className="text-link" href={item.link} target="_blank" rel="noopener noreferrer">
              {copy.repository} <ArrowUpRight aria-hidden="true" />
              <span className="sr-only"> ({copy.newTab})</span>
            </a>
          )}
        </div>
      </div>
    </li>
  );
}

export default function Projects() {
  const { content, locale } = usePortfolioContent();
  const { cases, ui } = content;
  const copy = ui.projects;
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  // True from the drawer's opening until focus is back on its button (the browser restores it when the
  // dialog closes): the button is where it was, so the rail never moves for it.
  const restoringFocusRef = useRef(false);
  // The first render already has the final layout (no stack → carousel/rail relayout on mount).
  const [mode, setMode] = useState<Mode>(() => detectMode(reduced));
  const [detailsRow, setDetailsRow] = useState<number | null>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const [current, setCurrent] = useState(0);
  const [Drawer, setDrawer] = useState<Drawer | null>(null);

  // Resolves true once the drawer can render (false if its chunk could not load).
  const prepareDrawer = useCallback(
    () => loadDrawer().then((module) => { setDrawer(() => module.default); return true; }, () => false),
    [],
  );
  const prefetchDrawer = useCallback(() => void prepareDrawer(), [prepareDrawer]);

  // Idle prefetch only once the page's eager images are in: the window's `load` comes before the hero
  // photo (the LCP) has arrived, and on a slow connection the chunk would share its bandwidth.
  useEffect(() => {
    const eager = [...document.images].filter((img) => !img.complete && img.loading !== 'lazy');
    void Promise.all(eager.map((img) => img.decode().catch(() => undefined))).then(() =>
      (window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1500)))(prefetchDrawer),
    );
  }, [prefetchDrawer]);

  // Rail (wide screens): the normal vertical scroll slides the panels sideways; the wheel is never hijacked.
  // Carousel (below 1024 px): native horizontal swipe with scroll snap. Stack: reduced motion only.
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const track = trackRef.current;
    if (!section || !stage || !track) return;
    const query = window.matchMedia(RAIL_QUERY);
    let current: Mode = 'stack';
    let overflow = 0;
    let range = 0;
    let raf = 0;

    const setProgress = (p: number) => section.style.setProperty('--rail-p', p.toFixed(4));
    const updateRail = () => {
      raf = 0;
      if (current !== 'rail') return;
      const top = section.getBoundingClientRect().top;
      const p = range > 0 ? Math.min(1, Math.max(0, -top / range)) : 0;
      track.style.transform = `translate3d(${(-p * overflow).toFixed(1)}px, 0, 0)`;
      setProgress(p);
    };
    const updateCarousel = () => {
      if (current !== 'carousel') return;
      // Every read before the first write: one layout at most, never a second forced style pass.
      const left = track.scrollLeft;
      const max = track.scrollWidth - track.clientWidth;
      const card = track.querySelector<HTMLElement>('.project');
      const stepPx = card ? card.offsetWidth + (parseFloat(getComputedStyle(track).columnGap) || 0) : 1;
      const start = left < 4;
      const end = left > max - 4;
      const index = end ? cases.length - 1 : Math.min(cases.length - 1, Math.max(0, Math.round(left / stepPx)));
      setProgress(max > 0 ? left / max : 0);
      setEdges((prev) => (prev.start === start && prev.end === end ? prev : { start, end }));
      setCurrent((prev) => (prev === index ? prev : index));
    };
    const measure = () => {
      current = detectMode(reduced);
      if (section.dataset.rail !== current) section.dataset.rail = current;
      setMode(current);
      section.style.removeProperty('height');
      track.style.removeProperty('transform');
      if (current === 'rail') {
        track.style.transform = 'none';
        // Travel ends with the last card (plus the end padding) at the stage's edge. Not scrollWidth:
        // Gecko reports the max-content track far wider than the cards it lays out.
        const last = track.lastElementChild;
        const end = last ? last.getBoundingClientRect().right - stage.getBoundingClientRect().left + (parseFloat(getComputedStyle(track).paddingRight) || 0) : 0;
        overflow = Math.max(0, end - stage.clientWidth);
        range = Math.max(overflow * RAIL_MIN_PACE, Math.min(overflow * RAIL_PACE, window.innerHeight * RAIL_MAX_SCREENS));
        section.style.height = `${Math.round(stage.offsetHeight + range)}px`;
        updateRail();
      } else if (current === 'carousel') updateCarousel();
      else section.style.removeProperty('--rail-p');
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(updateRail);
    };
    // The page scroll at which the rail shows a panel whole: its left edge at the start padding, or
    // the end of the travel for the last ones.
    const railTop = (panel: HTMLElement) => {
      const lead = parseFloat(getComputedStyle(track).paddingLeft) || 0;
      const shift = Math.min(overflow, Math.max(0, panel.offsetLeft - lead));
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      return Math.round(sectionTop + (overflow > 0 ? (shift / overflow) * range : 0));
    };
    // True while a link to a project hands the focus to its title (that link already placed the page).
    let linking = false;
    // Keyboard on the rail: focusing something inside a panel brings that panel into view at once.
    // Only for keyboard focus: a mouse press also focuses the button (Chrome, Gecko), and moving the
    // page between mousedown and mouseup would slide the card away and lose the click.
    const onFocusIn = (event: FocusEvent) => {
      if (current !== 'rail' || overflow <= 0 || restoringFocusRef.current || linking) return;
      const target = event.target as HTMLElement;
      if (!target.matches(':focus-visible')) return;
      const panel = target.closest<HTMLElement>('.project');
      if (!panel) return;
      window.scrollTo({ top: railTop(panel), behavior: 'instant' });
      updateRail();
    };
    // A link to one project (`<a href="#projetos" data-project-key="…">`: "visto em" in Ferramentas, the
    // leadership highlight in Trajetória) lands on that card whole in view, not on the section's top.
    // Rail: where the rail shows it (railTop). Carousel: the section's own stop, or just enough further
    // for the card's foot (never past its top under the bar), and the carousel to the card. Stack: the
    // card ~24 px under the bar. App.tsx has already rendered the skipped sections (capture phase), so
    // these positions are the real ones. The URL gets #projetos like a plain link (Back returns), and
    // the focus goes to the card's title without a second scroll. Reduced motion: an instant jump.
    const onProjectLink = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const key = (event.target as Element | null)?.closest?.<HTMLElement>('a[data-project-key]')?.dataset.projectKey;
      const card = key ? [...track.children].find((el): el is HTMLElement => el instanceof HTMLElement && el.dataset.key === key) : undefined;
      if (!card) return;
      event.preventDefault();
      const behavior: ScrollBehavior = reduced ? 'instant' : 'smooth';
      const bar = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      const box = card.getBoundingClientRect();
      const cardTop = box.top + window.scrollY - bar - PROJECT_LINK_GAP;
      let top = cardTop;
      if (current === 'rail') top = railTop(card);
      else if (current === 'carousel') {
        const stop = section.getBoundingClientRect().top + window.scrollY - bar - (parseFloat(getComputedStyle(section).scrollMarginTop) || 0);
        top = Math.min(Math.max(stop, box.bottom + window.scrollY + PROJECT_LINK_GAP - window.innerHeight), cardTop);
        const inset = parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;
        track.scrollTo({ left: track.scrollLeft + box.left - track.getBoundingClientRect().left - inset, behavior });
      }
      if (window.location.hash === '#projetos') window.history.replaceState(window.history.state, '', '#projetos');
      else window.history.pushState(window.history.state, '', '#projetos');
      window.scrollTo({ top: Math.round(top), behavior });
      const title = card.querySelector<HTMLElement>('h3');
      if (title) {
        title.tabIndex = -1;
        linking = true;
        title.focus({ preventScroll: true });
        linking = false;
      }
    };

    measure();
    const resizeObserver = new ResizeObserver(() => measure());
    resizeObserver.observe(stage);
    resizeObserver.observe(track);
    query.addEventListener('change', measure);
    window.addEventListener('scroll', onScroll, { passive: true });
    track.addEventListener('scroll', updateCarousel, { passive: true });
    section.addEventListener('focusin', onFocusIn);
    document.addEventListener('click', onProjectLink);
    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      query.removeEventListener('change', measure);
      window.removeEventListener('scroll', onScroll);
      track.removeEventListener('scroll', updateCarousel);
      section.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('click', onProjectLink);
      section.style.removeProperty('height');
      section.style.removeProperty('--rail-p');
      track.style.removeProperty('transform');
    };
  }, [reduced, cases.length]);

  const step = (direction: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>('.project');
    if (!track || !card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const behavior = reduced ? 'auto' : 'smooth';
    track.scrollBy({ left: direction * (card.offsetWidth + gap), behavior });
    // The buttons sit under the cards: if the cards' top is above the screen (under the top bar), bring
    // it back, so the next project reads from its start and the buttons end up right under it again.
    const above = track.getBoundingClientRect().top - (parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0);
    if (above < 0) window.scrollBy({ top: above, behavior });
  };

  const openDetails = useCallback((row: number, opener: HTMLButtonElement) => {
    openerRef.current = opener;
    restoringFocusRef.current = true;
    setDetailsRow(row);
    void prepareDrawer().then((ready) => {
      if (ready) return;
      restoringFocusRef.current = false;
      setDetailsRow(null);
    });
  }, [prepareDrawer]);
  // Rail: a fine row of tiles; carousel: one tile per project.
  const tileCount = mode === 'carousel' ? cases.length : cases.length * PROGRESS_TILES_PER_PROJECT;
  const progressTiles = (
    <span className="projects__progress-tiles" aria-hidden="true">
      {Array.from({ length: tileCount }, (_, i) => (
        <span
          key={i}
          className={mode === 'carousel' ? (i === current ? 'is-current' : i < current ? 'is-past' : '') : undefined}
          style={{ '--i': i, '--n': tileCount } as CSSProperties}
        />
      ))}
    </span>
  );

  const closeDetails = useCallback(() => {
    setDetailsRow(null);
    openerRef.current?.focus({ preventScroll: true });
    restoringFocusRef.current = false;
  }, []);

  return (
    <section id="projetos" className="section projects" aria-labelledby="projects-title" ref={sectionRef} data-rail={mode}>
      <div className="projects__stage" ref={stageRef}>
        <header className="section__head projects__head">
          <div>
            <p className="kicker">{copy.kicker}</p>
            <h2 id="projects-title"><TileReveal seed={3}>{copy.title}</TileReveal></h2>
          </div>
          <p className="section__intro">{copy.intro}</p>
        </header>
        <div className="projects__progress">
          {mode !== 'carousel' && progressTiles}
          <span className="projects__progress-hint" aria-hidden="true">{mode === 'carousel' ? copy.swipeHint : copy.railHint}</span>
        </div>
        <ol className="project-list" ref={trackRef} aria-label={copy.title}>
          {cases.map((item, row) => (
            <ProjectCard key={item.key} item={item} row={row} copy={copy} locale={locale} onDetails={openDetails} onPrepare={prefetchDrawer} />
          ))}
        </ol>
        {/* Carousel: previous / next at the cards' foot, around the tile indicator (one tile per project). */}
        {mode === 'carousel' && (
          <div className="projects__pager">
            <button type="button" className="projects__step" onClick={() => step(-1)} disabled={edges.start} aria-label={copy.previous}>
              <ArrowLeft aria-hidden="true" />
            </button>
            {progressTiles}
            <button type="button" className="projects__step" onClick={() => step(1)} disabled={edges.end} aria-label={copy.next}>
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
      {Drawer && <Drawer item={detailsRow === null ? null : cases[detailsRow]} row={detailsRow ?? 0} copy={copy} locale={locale} onClose={closeDetails} />}
    </section>
  );
}
