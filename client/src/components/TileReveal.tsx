import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { hash2 } from './pixelWall/tiles';
import { useReducedMotion } from './pixelWall/useReducedMotion';

const COLORS = ['var(--wall-pink)', 'var(--wall-navy)', 'var(--wall-ink)', 'var(--wall-navy)', 'var(--wall-pink-soft)'];
const COLS = 12;
const ROWS = 3;

/**
 * Wraps text so it assembles out of wall tiles as it scrolls into view. The
 * cover only exists where CSS scroll-driven animations are supported and motion
 * is allowed (index.css); everywhere else the text is simply there. It is also
 * only built once the text is about a screen away, so the page does not lay out
 * dozens of hidden tiles at load.
 */
export default function TileReveal({ children, seed = 1 }: { children: ReactNode; seed?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || near || reduced || !CSS.supports('animation-timeline: view()')) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setNear(true);
      },
      { rootMargin: '100% 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [near, reduced]);

  return (
    <span className="tile-reveal" ref={ref}>
      {children}
      {near && !reduced && (
        <span className="tile-reveal__cover" aria-hidden="true">
          {Array.from({ length: COLS * ROWS }, (_, k) => {
            const c = k % COLS;
            const r = Math.floor(k / COLS);
            const color = COLORS[Math.floor(hash2(c, r, seed) * COLORS.length)];
            const order = (c / COLS) * 0.75 + hash2(c, r, seed + 1) * 0.25;
            return <span key={k} style={{ '--c': color, '--o': order.toFixed(3) } as CSSProperties} />;
          })}
        </span>
      )}
    </span>
  );
}
