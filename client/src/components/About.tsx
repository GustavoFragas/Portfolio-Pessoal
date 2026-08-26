import { usePortfolioContent } from '../LocaleContext';
import ScrollReveal from './ScrollReveal';

export default function About() {
  const { content } = usePortfolioContent();
  const { evidenceRows, ui } = content;

  return (
    <section id="evidencias" className="section section--paper">
      <div className="section-shell">
        <ScrollReveal direction="left">
          <div className="section-heading section-heading--split">
            <div>
              <p className="section-kicker">{ui.about.kicker}</p>
              <h2>{ui.about.title}</h2>
            </div>
            <p>{ui.about.description}</p>
          </div>
        </ScrollReveal>
        <ScrollReveal direction="left">
          <div className="evidence-ledger" role="list">
            {evidenceRows.map(([domain, evidence, validation]) => (
              <article className="evidence-row" key={domain} role="listitem">
                <span>{domain}</span>
                <p>{evidence}</p>
                <small>{validation}</small>
              </article>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
