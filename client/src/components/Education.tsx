import { useEffect, useRef, type CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { usePortfolioContent } from '../LocaleContext';
import { institutionUrls } from '../data/portfolioContent';
import TileReveal from './TileReveal';
import '../styles/content.css';

// Official marks extracted from the certificates (docs/pixel-wall/asset-sources.md). Shown as a
// one-colour version: the file's own alpha is the mask and the text token is the ink, so the mark
// keeps its exact shape on the dark site without a light plate. The same display-size WebP serves the
// credential tiles and the hero badge (one URL per mark). `ratio` = width / height of the file.
// `mark` = the name the mark itself shows: where the mark appears, it replaces the repeated name in
// text, and the accessible name starts with what the mark reads, then the full name (WCAG 2.5.3).
const institutionLogos: Record<string, { src: string; ratio: number; mark: string }> = {
  'Brigham Young University‑Idaho': { src: '/certificates/logos/byu-idaho-340.webp', ratio: 340 / 204, mark: 'BYU‑Idaho' },
  DIO: { src: '/certificates/logos/dio-440.webp', ratio: 440 / 126, mark: 'DIO' },
};

export default function EducationSection() {
  const { content } = usePortfolioContent();
  const { education, languages, ui } = content;
  const sectionRef = useRef<HTMLElement>(null);

  // The logo masks (content.css) only load once the section is about a screen away, so they never
  // compete with the hero portrait for the first bytes.
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

  return (
    <section id="formacao" className="section study" aria-labelledby="study-title" ref={sectionRef}>
      <div className="section__inner">
        <p className="kicker">{ui.education.languagesKicker}</p>
        <ul className="study__languages" aria-label={ui.education.languagesTitle}>
          {languages.map(([name, code, level, proof]) => (
            <li key={code}>
              <span className="study__language" lang={code}>{name}</span>
              <span className="study__level">{level}</span>
              {/* One line of evidence under the level (Español): quieter, one tile mark, the big name unchanged. */}
              {proof && <span className="study__proof">{proof}</span>}
            </li>
          ))}
        </ul>
        <div className="study__grid">
          <header className="study__head">
            <h2 id="study-title"><TileReveal seed={13}>{ui.education.title}</TileReveal></h2>
            <p className="study__lead">{ui.education.lead}</p>
          </header>
          <ol className="study__list">
            {education.map(([period, institution, program, detail], index) => {
              const logo = institutionLogos[institution];
              const url = institutionUrls[institution];
              const firstOfInstitution = education.findIndex(([, name]) => name === institution) === index;
              const mark = logo && firstOfInstitution ? logo : undefined;
              // With the mark on screen the name is read, not shown twice; later entries keep the text.
              const name = mark ? (
                <>
                  <span
                    className="study__logo study__logo--mono"
                    aria-hidden="true"
                    style={{ '--logo': `url("${mark.src}")`, '--ratio': mark.ratio } as CSSProperties}
                  />
                  <span className="sr-only">{mark.mark === institution ? institution : `${mark.mark} — ${institution}`}</span>
                </>
              ) : institution;
              return (
                <li key={period + program}>
                  <p className="study__period">{period}</p>
                  <h3>
                    {url ? (
                      <a className={`quiet-link${mark ? ' study__mark' : ''}`} href={url} target="_blank" rel="noopener noreferrer">
                        {name}
                        <ArrowUpRight aria-hidden="true" />
                        <span className="sr-only"> ({ui.projects.newTab})</span>
                      </a>
                    ) : name}
                  </h3>
                  <p>{program}</p>
                  {detail && <p className="study__detail">{detail}</p>}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
