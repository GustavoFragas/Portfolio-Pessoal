import type { CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { usePortfolioContent } from '../LocaleContext';
import { hash2 } from './pixelWall/tiles';

const BAND_TILES = 120;

function bandTone(row: number, index: number): string {
  const value = hash2(index, row, 11);
  if (value < 0.42) return 'var(--wall-pink)';
  if (value < 0.78) return 'var(--wall-navy)';
  if (value < 0.9) return 'var(--wall-pink-soft)';
  return 'var(--wall-ink)';
}

function joinList(items: readonly string[], and: string): string {
  if (items.length < 2) return items.join('');
  return `${items.slice(0, -1).join(', ')} ${and} ${items[items.length - 1]}`;
}

export default function Projects() {
  const { content } = usePortfolioContent();
  const { cases, ui } = content;
  const copy = ui.projects;

  return (
    <section id="projetos" className="section projects" aria-labelledby="projects-title">
      <div className="section__inner">
        <header className="section__head">
          <div>
            <p className="kicker">{copy.kicker}</p>
            <h2 id="projects-title">{copy.title}</h2>
          </div>
          <p className="section__intro">{copy.intro}</p>
        </header>
        <ol className="project-list">
          {cases.map((item, row) => (
            <li className="project" key={item.title}>
              <div className="project__band" aria-hidden="true">
                {Array.from({ length: BAND_TILES }, (_, index) => (
                  <span key={index} style={{ '--i': index, '--c': bandTone(row, index) } as CSSProperties} />
                ))}
              </div>
              <span className="project__num" aria-hidden="true">{String(row + 1).padStart(2, '0')}</span>
              <div className="project__body">
                <p className="project__label">{item.label}</p>
                <h3>{item.title}</h3>
                <p className="project__summary">{item.summary}</p>
                <p className="project__tools">{copy.toolsPrefix} {joinList(item.tools, copy.and)}.</p>
                <details className="project__details">
                  <summary>
                    <span className="project__toggle" aria-hidden="true" />
                    {copy.details}
                  </summary>
                  <div className="project__grid">
                    <div>
                      <h4>{copy.problem}</h4>
                      <p>{item.problem}</p>
                    </div>
                    <div>
                      <h4>{copy.did}</h4>
                      <p>{item.did}</p>
                      <ul>{item.decisions.map((entry) => <li key={entry}>{entry}</li>)}</ul>
                    </div>
                    <div>
                      <h4>{copy.validated}</h4>
                      <ul>{item.validation.map((entry) => <li key={entry}>{entry}</li>)}</ul>
                      {item.caveat && <p className="project__caveat">{item.caveat}</p>}
                    </div>
                  </div>
                </details>
                {item.link && (
                  <a className="text-link" href={item.link} target="_blank" rel="noopener noreferrer">
                    {copy.repository} <ArrowUpRight aria-hidden="true" />
                    <span className="sr-only"> ({copy.newTab})</span>
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
