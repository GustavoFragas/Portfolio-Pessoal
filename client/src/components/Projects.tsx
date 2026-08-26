import { ExternalLink } from 'lucide-react';
import { usePortfolioContent } from '../LocaleContext';
import ScrollReveal from './ScrollReveal';

export default function Projects() {
  const { content } = usePortfolioContent();
  const { cases, ui } = content;

  return (
    <section id="cases" className="section section--dark">
      <div className="section-shell">
        <ScrollReveal direction="left">
          <div className="section-heading section-heading--split">
            <div>
              <p className="section-kicker">{ui.projects.kicker}</p>
              <h2>{ui.projects.title}</h2>
            </div>
            <p>{ui.projects.description}</p>
          </div>
        </ScrollReveal>
        <div className="case-stack">
          {cases.map((item) => (
            <ScrollReveal direction="left" key={item.title}>
              <article className="case-dossier">
                <header>
                  <div>
                    <span className="badge badge--warning">{item.label}</span>
                    <h3>{item.title}</h3>
                  </div>
                  {'link' in item && item.link && (
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      {ui.projects.repository} <ExternalLink aria-hidden="true" />
                    </a>
                  )}
                </header>
                <div className="case-grid">
                  <section>
                    <h4>{ui.projects.problem}</h4>
                    <p>{item.problem}</p>
                  </section>
                  <section>
                    <h4>{ui.projects.constraints}</h4>
                    <ul>{item.constraints.map((entry) => <li key={entry}>{entry}</li>)}</ul>
                  </section>
                  <section>
                    <h4>{ui.projects.responsibility}</h4>
                    <p>{item.responsibility}</p>
                  </section>
                  <section>
                    <h4>{ui.projects.decisions}</h4>
                    <ul>{item.decisions.map((entry) => <li key={entry}>{entry}</li>)}</ul>
                  </section>
                  <section>
                    <h4>{ui.projects.validation}</h4>
                    <ul>{item.validation.map((entry) => <li key={entry}>{entry}</li>)}</ul>
                  </section>
                  <section>
                    <h4>{ui.projects.tools}</h4>
                    <p className="mono-list">{item.tools.join(' / ')}</p>
                    {'caveat' in item && item.caveat && <p className="caveat">{item.caveat}</p>}
                  </section>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
