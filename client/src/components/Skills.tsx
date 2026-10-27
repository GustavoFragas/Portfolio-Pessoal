import { usePortfolioContent } from '../LocaleContext';

export default function Skills() {
  const { content } = usePortfolioContent();
  const { capabilities, ui } = content;

  return (
    <section id="ferramentas" className="section tools" aria-labelledby="tools-title">
      <div className="section__inner">
        <header className="section__head">
          <div>
            <p className="kicker">{ui.skills.kicker}</p>
            <h2 id="tools-title">{ui.skills.title}</h2>
          </div>
          <p className="section__intro">{ui.skills.intro}</p>
        </header>
        <ul className="tools__list">
          {capabilities.map(([area, sentence, tools]) => (
            <li className="tools__row" key={area}>
              <h3>{area}</h3>
              <p>{sentence}</p>
              <p className="tools__stack">{tools}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
