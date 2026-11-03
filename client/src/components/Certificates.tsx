import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { usePortfolioContent } from '../LocaleContext';
import type { Credential } from '../data/portfolioLocales';
import { hash2 } from './pixelWall/tiles';
import { useReducedMotion } from './pixelWall/useReducedMotion';
import TileReveal from './TileReveal';
import '../styles/credentials.css';

const ASSEMBLE_SIDE = 6;
const ASSEMBLE_COLORS = ['var(--wall-pink)', 'var(--wall-navy)', 'var(--wall-ink)', 'var(--wall-pink)', 'var(--wall-pink-soft)'];
const DRAG_THRESHOLD = 6;

type Copy = ReturnType<typeof usePortfolioContent>['content']['ui']['certificates'];

/** Wall tiles that fly in, cover the badge and flip away (only while the section is armed). */
function AssembleCover({ seed }: { seed: number }) {
  return (
    <span className="cred__assemble" aria-hidden="true">
      {Array.from({ length: ASSEMBLE_SIDE * ASSEMBLE_SIDE }, (_, k) => {
        const x = k % ASSEMBLE_SIDE;
        const y = Math.floor(k / ASSEMBLE_SIDE);
        const style = {
          '--c': ASSEMBLE_COLORS[Math.floor(hash2(x, y, seed) * ASSEMBLE_COLORS.length)],
          '--dx': `${Math.round((hash2(x, y, seed + 1) - 0.5) * 180)}px`,
          '--dy': `${Math.round((hash2(x, y, seed + 2) - 0.5) * 140 + 50)}px`,
          '--k': x + y,
        } as CSSProperties;
        return <span key={k} style={style} />;
      })}
    </span>
  );
}

function CredentialTile({ item, index, copy, motion, assemble }: { item: Credential; index: number; copy: Copy; motion: boolean; assemble: boolean }) {
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const base = useRef(0); // degrees around Y, a multiple of 180
  const drag = useRef<{ x: number; startRy: number; moved: boolean } | null>(null);
  const swallowClick = useRef(false);
  const isPdf = item.url.endsWith('.pdf');

  const apply = useCallback((rx: number, ry: number, live: boolean) => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--rx', `${rx.toFixed(2)}deg`);
    card.style.setProperty('--ry', `${ry.toFixed(2)}deg`);
    card.toggleAttribute('data-live', live);
  }, []);

  // Keep the rotation in step with the flipped state (click, tap, keyboard or a snapped drag).
  useEffect(() => {
    if (!motion) return;
    const turns = Math.round(base.current / 180);
    if ((Math.abs(turns) % 2 === 1) !== flipped) base.current += 180;
    apply(0, base.current, false);
  }, [flipped, motion, apply]);

  const onPointerMove = (event: ReactPointerEvent<HTMLLIElement>) => {
    if (!motion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const d = drag.current;
    if (d) {
      const dx = event.clientX - d.x;
      if (!d.moved && Math.abs(dx) > DRAG_THRESHOLD) {
        d.moved = true;
        // Capture only once it is a real drag, so a plain click still reaches the button.
        event.currentTarget.setPointerCapture(event.pointerId);
      }
      if (d.moved) apply(0, d.startRy + dx * 0.75, true);
      return;
    }
    if (event.pointerType !== 'mouse') return;
    const u = (event.clientX - rect.left) / rect.width - 0.5;
    const v = (event.clientY - rect.top) / rect.height - 0.5;
    apply(-v * 22, base.current + u * 28, true);
  };
  const onPointerDown = (event: ReactPointerEvent<HTMLLIElement>) => {
    // A touch drag ends without a click, so a flag left by it would eat the next tap.
    swallowClick.current = false;
    if (!motion || (event.pointerType === 'mouse' && event.button !== 0)) return;
    drag.current = { x: event.clientX, startRy: base.current, moved: false };
  };
  const endDrag = (event: ReactPointerEvent<HTMLLIElement>) => {
    const d = drag.current;
    drag.current = null;
    if (!d || !d.moved) return;
    swallowClick.current = event.type === 'pointerup';
    // Only the click this pointerup dispatches belongs to the drag; a later keyboard or screen reader
    // click has no pointerdown to clear the flag.
    if (swallowClick.current) {
      window.setTimeout(() => {
        swallowClick.current = false;
      });
    }
    const ry = d.startRy + (event.clientX - d.x) * 0.75;
    base.current = Math.round(ry / 180) * 180;
    const nowFlipped = Math.abs(Math.round(base.current / 180)) % 2 === 1;
    apply(0, base.current, false);
    setFlipped(nowFlipped);
  };
  const onPointerLeave = () => {
    if (!motion || drag.current) return;
    apply(0, base.current, false);
  };

  const style = { '--n': index } as CSSProperties;

  return (
    <li
      className="cred"
      style={style}
      data-flipped={flipped}
      onPointerMove={onPointerMove}
      onPointerDown={onPointerDown}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={onPointerLeave}
      onFocus={(event) => {
        if (event.target instanceof HTMLElement && event.target.matches(':focus-visible')) setFlipped(true);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFlipped(false);
      }}
    >
      <div className="cred__float">
        <div className="cred__card" ref={cardRef}>
          <div className="cred__face cred__front">
            <span className="cred__emblem">
              {item.art && item.logo ? (
                // Official issuer mark in one light colour, no plate: its own alpha masks a block of the
                // text token, as in Education. Never stretched; the shape is exactly the official mark.
                <span className="cred__logo" role="img" aria-label={item.issuer} style={{ '--logo': `url("${item.art}")` } as CSSProperties} />
              ) : item.art ? (
                // CORS mode like the hero badge (its <img> and the mask of its slices), so the same file is
                // reused from memory instead of being downloaded a second time.
                <img src={item.art} alt={`${copy.badge}: ${item.name}`} crossOrigin="anonymous" loading="lazy" decoding="async" width={460} height={460} draggable={false} />
              ) : (
                <span className={`cred__plate ${item.issuer.length <= 4 ? 'cred__plate--short' : ''}`} aria-hidden="true">
                  {item.issuer}
                </span>
              )}
            </span>
            {/* No caption under an issuer mark: the art already is the name (kept in its aria-label). */}
            {!(item.art && item.logo) && <span className="cred__caption" aria-hidden="true">{item.caption}</span>}
            {assemble && <AssembleCover seed={20 + index * 7} />}
          </div>
          <div className="cred__face cred__back">
            <p className="cred__issuer">{copy.issuedBy} {item.issuer}</p>
            <h3>{item.name}</h3>
            {item.issued ? (
              <p className="cred__date">
                {copy.issuedOn} {item.issued}
                {item.expires && ` · ${copy.validUntil} ${item.expires}`}
              </p>
            ) : (
              item.date && <p className="cred__date">{item.date}</p>
            )}
            <p className="cred__proof">
              <span className="cred__proof-label">{copy.proves}</span> {item.proof}
            </p>
          </div>
          <span className="cred__side cred__side--top" aria-hidden="true" />
          <span className="cred__side cred__side--right" aria-hidden="true" />
          <span className="cred__side cred__side--bottom" aria-hidden="true" />
          <span className="cred__side cred__side--left" aria-hidden="true" />
        </div>
      </div>
      <button
        className="cred__toggle"
        type="button"
        aria-pressed={flipped}
        aria-label={`${copy.flip}: ${item.name}`}
        onClick={() => {
          if (swallowClick.current) {
            swallowClick.current = false;
            return;
          }
          setFlipped((value) => !value);
        }}
      />
      {/* Above the flip button, so following it never flips the tile; reachable by Tab (focus
          turns the tile to its back) and by touch once the back is showing. */}
      {item.verifyUrl ? (
        <a
          className="cred__link"
          href={item.verifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${copy.verify}: ${item.name} (${copy.newTab})`}
        >
          {copy.verify} <ArrowUpRight aria-hidden="true" />
        </a>
      ) : (
        item.url && (
          <a
            className="cred__link"
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${isPdf ? copy.openPdf : copy.open}: ${item.name} (${copy.newTab})`}
          >
            {isPdf ? copy.openPdf : copy.open} <ArrowUpRight aria-hidden="true" />
          </a>
        )
      )}
    </li>
  );
}

export default function Certificates() {
  const { content } = usePortfolioContent();
  const { credentials, ui } = content;
  const copy = ui.certificates;
  const motion = !useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [assemble, setAssemble] = useState(false);

  // The issuer marks are CSS masks, which have no lazy loading of their own: index.css only applies
  // them once the section is about a screen away.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        section.dataset.near = 'true';
        observer.disconnect();
      },
      { rootMargin: '100% 0px' },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // The wall assembles each badge (≤ 0.6 s) the first time the tiles scroll into view. Arriving
  // by a link to #credenciais, or with the tiles already on screen, shows them straight away.
  // The section is armed (badges hidden, cover tiles built) only once the grid is about a screen
  // away, so the cover tiles do not exist at load. Where the grid is comes from the observer entry,
  // never from a layout read at mount (that forced a whole-page layout during the first load).
  useEffect(() => {
    const section = sectionRef.current;
    const grid = section?.querySelector('.cred-grid');
    if (!section || !grid || !motion || typeof IntersectionObserver === 'undefined') return;
    if (window.location.hash === '#credenciais') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || section.dataset.assemble !== 'armed') return;
        section.dataset.assemble = 'play';
        observer.disconnect();
      },
      { threshold: 0.2 },
    );
    const near = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        near.disconnect();
        const { top, bottom } = entry.boundingClientRect;
        const onScreen = top < window.innerHeight && bottom > 0;
        if (window.location.hash === '#credenciais' || onScreen) return;
        section.dataset.assemble = 'armed';
        setAssemble(true);
        observer.observe(grid);
      },
      { rootMargin: '100% 0px' },
    );
    near.observe(grid);
    const stop = () => {
      delete section.dataset.assemble;
      near.disconnect();
      observer.disconnect();
    };
    const skip = () => {
      if (window.location.hash === '#credenciais' && section.dataset.assemble !== 'play') stop();
    };
    window.addEventListener('hashchange', skip);
    // Same-hash clicks do not fire hashchange: catch every link to the section.
    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest?.('a[href="#credenciais"]');
      if (link && section.dataset.assemble !== 'play') stop();
    };
    document.addEventListener('click', onClick, true);
    return () => {
      stop();
      window.removeEventListener('hashchange', skip);
      document.removeEventListener('click', onClick, true);
    };
  }, [motion]);

  return (
    <section id="credenciais" className="section credentials" aria-labelledby="credentials-title" ref={sectionRef}>
      <div className="section__inner">
        <header className="cred-head">
          <div>
            <p className="kicker">{copy.kicker}</p>
            <h2 id="credentials-title"><TileReveal seed={9}>{copy.title}</TileReveal></h2>
          </div>
          <p>
            {motion ? (
              <>
                <span className="pointer-fine">{copy.hintPointer}</span>
                <span className="pointer-coarse">{copy.hintTouch}</span>
              </>
            ) : (
              <>
                <span className="pointer-fine">{copy.hintReduced}</span>
                <span className="pointer-coarse">{copy.hintReducedTouch}</span>
              </>
            )}
          </p>
        </header>
        <ul className="cred-grid">
          {credentials.map((item, index) => (
            <CredentialTile key={item.issuer + item.name} item={item} index={index} copy={copy} motion={motion} assemble={assemble} />
          ))}
        </ul>
      </div>
    </section>
  );
}
