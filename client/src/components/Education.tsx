import { usePortfolioContent } from '../LocaleContext';

export default function EducationSection() {
  const { content } = usePortfolioContent();
  const { education, languages, ui } = content;

  return (
    <section id="formacao" className="section study" aria-labelledby="study-title">
      <div className="section__inner">
        <p className="kicker">{ui.education.languagesKicker}</p>
        <ul className="study__languages" aria-label={ui.education.languagesTitle}>
          {languages.map(([name, code, level]) => (
            <li key={code}>
              <span className="study__language" lang={code}>{name}</span>
              <span className="study__level">{level}</span>
            </li>
          ))}
        </ul>
        <div className="study__grid">
          <header className="study__head">
            <p className="kicker">{ui.education.kicker}</p>
            <h2 id="study-title">{ui.education.title}</h2>
          </header>
          <ol className="study__list">
            {education.map(([period, institution, program]) => (
              <li key={institution}>
                <p className="study__period">{period}</p>
                <h3>{institution}</h3>
                <p>{program}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
