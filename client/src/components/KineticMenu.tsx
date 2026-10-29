import { memo, useCallback, useLayoutEffect, useRef, type CSSProperties, type RefObject } from 'react';
import { usePortfolioContent } from '../LocaleContext';
import { supportedLocales, type PortfolioLocale } from '../data/portfolioLocales';
import { setWallsSuspended } from './pixelWall/engine';
import { hash2 } from './pixelWall/tiles';
import { useReducedMotion } from './pixelWall/useReducedMotion';

const PANELS = ['ink', 'pink', 'paper'] as const;
const EASE = 'cubic-bezier(0.76, 0, 0.24, 1)';
const RISE = 'cubic-bezier(0.2, 0.8, 0.2, 1)';
const PANEL_OUT = 'translateX(100%)';
const PANEL_IN = 'translateX(0)';
const LINK_DOWN = 'translateY(115%) rotate(7deg)';
const LINK_UP = 'translateY(0) rotate(0deg)';
const SHAPE_COLORS = ['var(--wall-pink)', 'var(--wall-navy)', 'var(--wall-pink-soft)', 'var(--wall-pink)', 'var(--wall-ink)'];

type LanguageSwitcherProps = {
  label: string;
  locale: PortfolioLocale;
  onSelect: (locale: PortfolioLocale) => void;
};

function LanguageSwitcher({ label, locale, onSelect }: LanguageSwitcherProps) {
  return (
    <div className="language-switcher" role="group" aria-label={label}>
      {supportedLocales.map((option) => (
        <button type="button" key={option} aria-pressed={locale === option} onClick={() => onSelect(option)}>
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

/** One composition of wall tiles per link, rising in the lower part of the menu panel on hover or focus. */
function TileShapes({ count }: { count: number }) {
  return (
    <div className="kmenu__shapes" aria-hidden="true">
      {Array.from({ length: count }, (_, link) => (
        <div className="kmenu__shape" key={link}>
          {Array.from({ length: 30 }, (_, k) => {
            const c = k % 6;
            const r = Math.floor(k / 6);
            if (hash2(c, r, 90 + link * 13) > 0.42) return null;
            const style = {
              gridColumn: c + 1,
              gridRow: r + 1,
              '--c': SHAPE_COLORS[Math.floor(hash2(c, r, 91 + link * 13) * SHAPE_COLORS.length)],
              '--d': c + r,
            } as CSSProperties;
            return <i key={k} style={style} />;
          })}
        </div>
      ))}
    </div>
  );
}

type Move = { el: Element; from: Keyframe; to: Keyframe; duration: number; delay?: number; easing?: string };

/** Entrance or exit of every moving part. Only transform and opacity, so the compositor runs them. */
function moves(root: HTMLElement, opening: boolean, reduced: boolean): Move[] {
  const shown = { opacity: 1 };
  const gone = { opacity: 0 };
  const fade = (el: Element, duration = 250, delay = 0): Move =>
    opening ? { el, from: gone, to: shown, duration, delay } : { el, from: shown, to: gone, duration, delay };
  const list: Move[] = [];
  const overlay = root.querySelector('.kmenu__overlay');
  if (overlay) list.push(reduced ? fade(overlay) : opening ? fade(overlay, 500) : fade(overlay, 550, 150));
  const panels = root.querySelectorAll('.kmenu__panel');
  panels.forEach((el, i) => {
    if (reduced) list.push(fade(el));
    else if (opening) list.push({ el, from: { transform: PANEL_OUT }, to: { transform: PANEL_IN }, duration: 750, delay: i * 80, easing: EASE });
    else list.push({ el, from: { transform: PANEL_IN }, to: { transform: PANEL_OUT }, duration: 550, delay: (panels.length - 1 - i) * 60, easing: EASE });
  });
  root.querySelectorAll('.kmenu__link').forEach((el, i) => {
    if (reduced) list.push(fade(el));
    else if (opening) list.push({ el, from: { transform: LINK_DOWN }, to: { transform: LINK_UP }, duration: 800, delay: 340 + i * 65, easing: RISE });
    else list.push({ el, from: { transform: LINK_UP }, to: { transform: LINK_DOWN }, duration: 300, easing: EASE });
  });
  const foot = root.querySelector('.kmenu__foot');
  if (foot) list.push(opening ? fade(foot, 400, reduced ? 0 : 700) : fade(foot, 200));
  return list;
}

/** Starts the moves; a part still moving (open/close interrupted) continues from where it is now. */
function play(list: Move[], live: Map<Element, Animation>): Animation[] {
  const interrupted = list.map(({ el, to }) => {
    if (live.get(el)?.playState !== 'running') return null;
    const style = getComputedStyle(el);
    return 'transform' in to ? { transform: style.transform } : { opacity: style.opacity };
  });
  return list.map(({ el, from, to, duration, delay = 0, easing = 'ease-in-out' }, i) => {
    live.get(el)?.cancel();
    const animation = el.animate([interrupted[i] ?? from, to], { duration, delay, easing, fill: 'both' });
    live.set(el, animation);
    return animation;
  });
}

/**
 * Makes the page behind the menu inert (or releases it) one element per frame. A single `inert` on
 * <main> restyles the whole document (~2.4k elements, ~55 ms on a 4× slower CPU) inside one frame of
 * the animation. Until the last step, the focus trap, aria-modal and the overlay keep the page out of
 * reach. `mine` remembers what the menu itself made inert, so a release never touches anything else.
 */
function stepInert(targets: readonly HTMLElement[], inert: boolean, mine: Set<HTMLElement>): () => void {
  let index = 0;
  let raf = 0;
  const step = () => {
    const el = targets[index];
    index += 1;
    if (inert && !el.inert) {
      el.inert = true;
      mine.add(el);
    } else if (!inert && mine.delete(el)) el.inert = false;
    raf = index < targets.length ? requestAnimationFrame(step) : 0;
  };
  if (targets.length) raf = requestAnimationFrame(step);
  return () => cancelAnimationFrame(raf);
}

/** Sections of <main> (the decorative, aria-hidden SVG rules between them have no `inert`), footer, skip link. */
function pageBehind(): HTMLElement[] {
  const main = document.getElementById('main-content');
  const all = [...(main?.children ?? []), document.querySelector('.site-footer'), document.querySelector('.skip-link')];
  return all.filter((el): el is HTMLElement => el instanceof HTMLElement);
}

type KineticMenuProps = {
  open: boolean;
  onClose: () => void;
  buttonRef: RefObject<HTMLButtonElement | null>;
};

/**
 * Kinetic menu (own take on a 21st.dev reference, no code copied): an overlay,
 * three panels sliding in from the right in cascade and huge condensed links
 * rising with a slight rotation. Reduced motion: fades only.
 */
export default function KineticMenu({ open, onClose, buttonRef }: KineticMenuProps) {
  const { content, locale, selectLocale } = usePortfolioContent();
  const { navItems, ui } = content;
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const liveRef = useRef(new Map<Element, Animation>());
  const inertJobRef = useRef<() => void>(() => {});
  const inertRef = useRef(new Set<HTMLElement>());

  // One active link at a time (hover or keyboard focus), so only one band and one tile shape show.
  // Written straight onto the DOM: hovering, focusing or closing re-renders nothing.
  const setActive = useCallback((index: number | null) => {
    const panel = panelRef.current;
    if (!panel) return;
    panel.querySelectorAll<HTMLElement>('.kmenu__link').forEach((el, i) => {
      el.dataset.active = String(i === index);
    });
    panel.querySelectorAll<HTMLElement>('.kmenu__shape').forEach((el, i) => {
      el.dataset.on = String(i === index);
    });
  }, []);

  // While open: the page behind is inert and does not scroll, its pixel walls pause, focus stays
  // inside (menu button + menu), Esc closes. Layout effect so the lock is released before a link's
  // own jump to its section runs.
  useLayoutEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const inertJob = inertJobRef;
    const mine = inertRef.current;
    root.classList.add('menu-open');
    setWallsSuspended(true);
    inertJob.current();
    inertJob.current = stepInert(pageBehind(), true, mine);
    const firstFocus = requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>('a[href]')?.focus({ preventScroll: true }));
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current || !buttonRef.current) return;
      const items = [buttonRef.current, ...panelRef.current.querySelectorAll<HTMLElement>('a[href], button')];
      const index = items.indexOf(document.activeElement as HTMLElement);
      if (event.shiftKey && index <= 0) {
        event.preventDefault();
        items[items.length - 1].focus();
      } else if (!event.shiftKey && (index === -1 || index === items.length - 1)) {
        event.preventDefault();
        items[0].focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      cancelAnimationFrame(firstFocus);
      document.removeEventListener('keydown', onKeyDown);
      root.classList.remove('menu-open');
      setWallsSuspended(false);
      inertJob.current();
      inertJob.current = stepInert([...mine], false, mine);
      setActive(null);
    };
  }, [open, onClose, buttonRef, setActive]);

  // The menu stays mounted and laid out, closed (`data-closed`: invisible, out of reach and of the
  // accessibility tree), once its chunk is in. Opening only flips that attribute and starts the
  // compositor animations, without a React render or a layout of its own. Closed again once the exit
  // has played; an open/close interrupted halfway turns back from where it is.
  useLayoutEffect(() => {
    const root = rootRef.current;
    const live = liveRef.current;
    if (!root) return;
    if (open) root.removeAttribute('data-closed');
    else if (root.hasAttribute('data-closed')) return;
    const animations = play(moves(root, open, reduced), live);
    if (open) return;
    let current = true;
    Promise.all(animations.map((animation) => animation.finished)).then(
      () => {
        if (!current) return;
        root.setAttribute('data-closed', '');
        live.forEach((animation) => animation.cancel());
        live.clear();
      },
      () => {},
    );
    return () => {
      current = false;
    };
  }, [open, reduced]);

  return (
    <div className="kmenu" id="site-menu" role="dialog" aria-modal="true" aria-label={ui.navigation.mainLabel} data-closed="" ref={rootRef}>
      <div className="kmenu__overlay" onClick={onClose} />
      {PANELS.slice(0, 2).map((tone) => (
        <div key={tone} className={`kmenu__panel kmenu__panel--${tone}`} aria-hidden="true" />
      ))}
      <div ref={panelRef} className="kmenu__panel kmenu__panel--paper">
        <MenuContent
          navItems={navItems}
          mainLabel={ui.navigation.mainLabel}
          languageLabel={ui.navigation.languageLabel}
          locale={locale}
          onSelectLocale={selectLocale}
          onActive={setActive}
          onClose={onClose}
          panelRef={panelRef}
        />
      </div>
    </div>
  );
}

type MenuContentProps = {
  navItems: ReturnType<typeof usePortfolioContent>['content']['navItems'];
  mainLabel: string;
  languageLabel: string;
  locale: PortfolioLocale;
  onSelectLocale: (locale: PortfolioLocale) => void;
  onActive: (index: number | null) => void;
  onClose: () => void;
  panelRef: RefObject<HTMLDivElement | null>;
};

/** The paper panel's content. Memoised: opening and closing never re-render it (only a locale change does). */
const MenuContent = memo(function MenuContent({ navItems, mainLabel, languageLabel, locale, onSelectLocale, onActive, onClose, panelRef }: MenuContentProps) {
  return (
    <>
      <TileShapes count={navItems.length} />
      <nav aria-label={mainLabel}>
        <ul
          className="kmenu__list"
          onMouseLeave={() => {
            const links = [...(panelRef.current?.querySelectorAll('.kmenu__link') ?? [])];
            const focused = links.indexOf(document.activeElement as Element);
            onActive(focused >= 0 ? focused : null);
          }}
        >
          {navItems.map((item, index) => (
            <li className="kmenu__clip" key={item.href}>
              <a
                className="kmenu__link"
                href={item.href}
                onMouseEnter={() => onActive(index)}
                onFocus={() => onActive(index)}
                onClick={onClose}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="kmenu__foot">
        <LanguageSwitcher label={languageLabel} locale={locale} onSelect={onSelectLocale} />
      </div>
    </>
  );
});
