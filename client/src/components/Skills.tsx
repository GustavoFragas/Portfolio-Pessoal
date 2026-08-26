import { usePortfolioContent } from '../LocaleContext';
import ScrollReveal from './ScrollReveal';

export default function Skills() {
  const { content } = usePortfolioContent();
  const { capabilities, ui } = content;

  return (
    <section id="capacidades" className="section section--paper">
      <ScrollReveal className="section-shell" direction="left">
        <div className="section-heading">
          <p className="section-kicker">{ui.skills.kicker}</p>
          <h2>{ui.skills.title}</h2>
          <p>{ui.skills.description}</p>
        </div>
        <div className="capability-table" role="table" aria-label={ui.skills.tableLabel}>
          <div className="capability-row capability-row--head" role="row">
            <span role="columnheader">{ui.skills.area}</span>
            <span role="columnheader">{ui.skills.evidence}</span>
            <span role="columnheader">{ui.skills.tools}</span>
            <span role="columnheader">{ui.skills.validation}</span>
          </div>
          {capabilities.map(([area, evidence, tools, validation]) => (
            <div className="capability-row" role="row" key={area}>
              <strong role="cell">{area}</strong>
              <p role="cell">{evidence}</p>
              <p role="cell" className="mono-list">{tools}</p>
              <p role="cell">{validation}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
