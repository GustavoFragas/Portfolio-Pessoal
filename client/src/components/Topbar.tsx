import { useCallback, useEffect, useRef, useState } from 'react';
import { usePortfolioContent } from '../LocaleContext';

// The animated menu (and the motion runtime it uses) stays out of the initial bundle. It is
// prefetched when the browser is idle after the page's eager images (the hero photo is the LCP),
// or as soon as the button is pointed at or focused, and then mounted closed, so a click opens it
// at once. A click before that opens it as soon as its chunk arrives. No lazy()/Suspense (same as
// the TechDrawer in Projects.tsx): a Suspense boundary would add React's reveal throttle to that
// first opening.
const loadMenu = () => import('./KineticMenu');
type Menu = Awaited<ReturnType<typeof loadMenu>>['default'];

export default function Topbar() {
  const [open, setOpen] = useState(false);
  const [Menu, setMenu] = useState<Menu | null>(null);
  const { content } = usePortfolioContent();
  const { profile, ui } = content;
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Resolves true once the menu can render (false if its chunk could not load).
  const prepare = useCallback(
    () => loadMenu().then((module) => { setMenu(() => module.default); return true; }, () => false),
    [],
  );
  const prefetch = useCallback(() => void prepare(), [prepare]);

  // Not before the eager images are in: the window's `load` comes before the hero photo has
  // arrived, and on a slow connection the chunk would share its bandwidth.
  useEffect(() => {
    const eager = [...document.images].filter((img) => !img.complete && img.loading !== 'lazy');
    void Promise.all(eager.map((img) => img.decode().catch(() => undefined))).then(() =>
      (window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1500)))(prefetch),
    );
  }, [prefetch]);

  const close = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
  }, []);

  return (
    <header className={`topbar ${open ? 'topbar--menu' : ''}`}>
      <div className="topbar__inner">
        <a className="brand" href="#home" data-calm="2" aria-label={`${profile.name} — ${ui.navigation.home}`} onClick={() => open && close()}>
          <span className="brand__mark" aria-hidden="true"><i /><i /><i /><i /></span>
          <span className="brand__name">{profile.firstName} {profile.lastName}</span>
        </a>
        {/* "Menu +" in the top right on every breakpoint; replaces the inline links and the old mobile menu. */}
        <button
          ref={buttonRef}
          className="menu-btn"
          type="button"
          data-calm="2"
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? ui.navigation.closeMenu : ui.navigation.openMenu}
          onPointerEnter={prefetch}
          onFocus={prefetch}
          onClick={() => {
            if (open) close();
            else void prepare().then((ready) => ready && setOpen(true));
          }}
        >
          <span className="menu-btn__label">
            <span aria-hidden={open}>{ui.navigation.menu}</span>
            <span aria-hidden={!open}>{ui.navigation.close}</span>
          </span>
          <span className="menu-btn__icon" aria-hidden="true" />
        </button>
      </div>
      {Menu && <Menu open={open} onClose={close} buttonRef={buttonRef} />}
    </header>
  );
}
