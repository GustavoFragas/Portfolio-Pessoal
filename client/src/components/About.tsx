import { useEffect, useRef, type RefObject } from 'react';
import { usePortfolioContent } from '../LocaleContext';
import '../styles/content.css';

/** Quick facts. Shown inside the sticky About on wide screens and after the story on phones. */
export function AboutFacts({ className }: { className: string }) {
  const { content } = usePortfolioContent();
  return (
    <dl className={`about__facts ${className}`}>
      {content.ui.about.facts.map(([term, value]) => (
        <div key={term}>
          <dt>{term}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

type AboutProps = {
  /** Where the resolved portrait lands at the end of the scroll story. */
  slotRef: RefObject<HTMLDivElement | null>;
};

// The About text fades in over story progress 0.45–0.7 (index.css). Its links only take
// clicks and Tab focus once the text is readable, never while it is invisible over the hero.
const LIVE_FROM = 0.6;

export default function About({ slotRef }: AboutProps) {
  const { content } = usePortfolioContent();
  const { about } = content.ui;
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const text = textRef.current;
    const story = text?.closest<HTMLElement>('.story');
    if (!text || !story) return;
    let live: boolean | null = null;
    const sync = () => {
      const wall = story.dataset.wall;
      const progress = Number.parseFloat(story.style.getPropertyValue('--p'));
      // Static page (reduced motion or no canvas): About is in normal flow and always live.
      const next = wall === 'static' || wall === 'off' || progress >= LIVE_FROM;
      if (next === live) return;
      live = next;
      text.dataset.live = String(next);
      text.querySelectorAll('a').forEach((link) => {
        link.inert = !next;
      });
    };
    sync();
    // The hero writes --p on the story every scroll frame; only a threshold crossing touches the DOM.
    const observer = new MutationObserver(sync);
    observer.observe(story, { attributes: true, attributeFilter: ['style', 'data-wall'] });
    return () => observer.disconnect();
  }, [about]);

  const [first, ...rest] = about.paragraphs;
  const [before, after] = first.split(about.volunteer.text);
  const linked = after !== undefined;

  return (
    <section className="about" aria-labelledby="about-title">
      <div className="about__slot-col">
        <div className="about__slot" ref={slotRef} aria-hidden="true" />
      </div>
      <div className="about__text" data-early="true" ref={textRef}>
        <h2 id="about-title">{about.title}</h2>
        <p className="about__paragraph">
          {linked ? (
            <>
              {before}
              <a
                className="about__link"
                href={about.volunteer.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={about.volunteer.label}
                title={about.volunteer.label}
              >
                {about.volunteer.text}
              </a>
              {after}
            </>
          ) : first}
        </p>
        {rest.map((paragraph) => (
          <p className="about__paragraph" key={paragraph}>{paragraph}</p>
        ))}
        <AboutFacts className="about__facts--overlay" />
      </div>
    </section>
  );
}
