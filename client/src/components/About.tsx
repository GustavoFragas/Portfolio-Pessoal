import type { RefObject } from 'react';
import { usePortfolioContent } from '../LocaleContext';

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

export default function About({ slotRef }: AboutProps) {
  const { content } = usePortfolioContent();
  const { about } = content.ui;

  return (
    <section className="about" aria-labelledby="about-title">
      <div className="about__slot-col">
        <div className="about__slot" ref={slotRef} aria-hidden="true" />
      </div>
      <div className="about__text" data-early="true">
        <p className="kicker">{about.kicker}</p>
        <h2 id="about-title">{about.title}</h2>
        {about.paragraphs.map((paragraph) => (
          <p className="about__paragraph" key={paragraph}>{paragraph}</p>
        ))}
        <AboutFacts className="about__facts--overlay" />
      </div>
    </section>
  );
}
