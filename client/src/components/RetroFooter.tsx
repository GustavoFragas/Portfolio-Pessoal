import { useEffect, useId, useRef, useState, type FocusEvent, type ReactNode } from 'react';
import { usePortfolioContent } from '../LocaleContext';
import '../styles/retro-footer.css';

// 8-bit footer. Behaviour adapted from 8bitcn's "8bit-navigation-menu" (shadcn + cva), rebuilt
// here without either: disclosure buttons, one panel at a time, opening upwards.

type PanelKey = 'nav' | 'contact';

/** Pixel chevron (points up: the panels open upwards). Rotates when its panel is open. */
function PixelChevron() {
  return (
    <svg className="retro-footer__chevron" viewBox="0 0 8 4" aria-hidden="true" shapeRendering="crispEdges">
      <path d="M3 0h2v1H3zM2 1h4v1H2zM1 2h2v1H1zM5 2h2v1H5zM0 3h2v1H0zM6 3h2v1H6z" fill="currentColor" />
    </svg>
  );
}

/** The ▲ of "▲ START", drawn: the pixel font has no glyph for it. */
function PixelTriangle() {
  return (
    <svg className="retro-footer__triangle" viewBox="0 0 7 4" aria-hidden="true" shapeRendering="crispEdges">
      <path d="M3 0h1v1H3zM2 1h3v1H2zM1 2h5v1H1zM0 3h7v1H0z" fill="currentColor" />
    </svg>
  );
}

export default function RetroFooter() {
  const { content } = usePortfolioContent();
  const { profile, navItems, ui } = content;
  const [open, setOpen] = useState<PanelKey | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef<Record<PanelKey, HTMLButtonElement | null>>({ nav: null, contact: null });
  const baseId = useId();
  const year = new Date().getFullYear();

  // Esc closes and returns focus to the trigger; a click or touch anywhere outside closes.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(null);
      triggerRefs.current[open]?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpen(null);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  // Focus leaving a panel and its own trigger (to the other trigger, START or out of the menu)
  // closes that panel, so it never lingers behind or covers what gets focus next.
  const onItemBlur = (key: PanelKey) => (event: FocusEvent<HTMLElement>) => {
    const next = event.relatedTarget as Node | null;
    if (next && !event.currentTarget.contains(next)) setOpen((current) => (current === key ? null : current));
  };

  const close = () => setOpen(null);
  const newTab = <span className="sr-only"> ({ui.footer.newTab})</span>;

  const groups: { key: PanelKey; label: string; links: ReactNode[] }[] = [
    {
      key: 'nav',
      label: ui.footer.navigate,
      links: navItems.map((item) => (
        <li key={item.href}>
          <a className="retro-footer__link" href={item.href} onClick={close}>
            <span className="retro-footer__label">{item.label}</span>
          </a>
        </li>
      )),
    },
    {
      key: 'contact',
      label: ui.footer.contact,
      links: [
        <li key="email">
          <a className="retro-footer__link" href={`mailto:${profile.email}`} onClick={close}>
            <span className="retro-footer__label">{ui.contact.email}</span>
            <span className="retro-footer__value">{profile.email}</span>
          </a>
        </li>,
        <li key="linkedin">
          <a className="retro-footer__link" href={profile.linkedIn} target="_blank" rel="noopener noreferrer" onClick={close}>
            <span className="retro-footer__label">{ui.contact.linkedin}</span>
            <span className="retro-footer__value">{profile.linkedInDisplay}</span>
            {newTab}
          </a>
        </li>,
        <li key="github">
          <a className="retro-footer__link" href={profile.gitHub} target="_blank" rel="noopener noreferrer" onClick={close}>
            <span className="retro-footer__label">{ui.contact.github}</span>
            <span className="retro-footer__value">{profile.gitHubDisplay}</span>
            {newTab}
          </a>
        </li>,
      ],
    },
  ];

  return (
    <footer className="site-footer retro-footer on-wall">
      <nav className="retro-footer__nav" aria-label={ui.footer.navLabel} ref={navRef}>
        <ul className="retro-footer__menu">
          {groups.map((group) => {
            const panelId = `${baseId}-${group.key}`;
            const expanded = open === group.key;
            return (
              <li className="retro-footer__item" key={group.key} onBlur={onItemBlur(group.key)}>
                <button
                  type="button"
                  className="retro-footer__trigger"
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onClick={() => setOpen(expanded ? null : group.key)}
                  ref={(el) => {
                    triggerRefs.current[group.key] = el;
                  }}
                >
                  <span>{group.label}</span>
                  <PixelChevron />
                </button>
                <div className="retro-footer__panel" id={panelId} hidden={!expanded}>
                  <ul className="retro-footer__links">{group.links}</ul>
                </div>
              </li>
            );
          })}
          <li className="retro-footer__item retro-footer__item--start">
            {/* "#top" is the top of the document (HTML spec). "#home" lives in the sticky story
                stage, so from down here it lands on About (scrollY = story range), not the hero.
                Only the game word shows; the accessible name starts with it (WCAG 2.5.3, so voice
                control can say "Start") and then says what it does. The title gives the same hint
                to pointer users who don't read "START" as "back to top". */}
            <a className="retro-footer__start" href="#top" onClick={close} aria-label={ui.footer.startLabel} title={ui.footer.startLabel}>
              <PixelTriangle />
              <span className="retro-footer__start-word">{ui.footer.start}</span>
            </a>
          </li>
        </ul>
      </nav>
      {/* Closing line in the game's own words: who and where, no stack credits. */}
      <div className="retro-footer__legal">
        <p>© {year} {profile.firstName} {profile.lastName}</p>
        <p>{ui.footer.place}</p>
      </div>
    </footer>
  );
}
