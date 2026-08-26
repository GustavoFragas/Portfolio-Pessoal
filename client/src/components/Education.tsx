import { usePortfolioContent } from '../LocaleContext';
import ScrollReveal from './ScrollReveal';

export default function EducationSection() {
  const { content } = usePortfolioContent();
  const { education, languages, ui } = content;

  return (
    <section id="formacao" className="section section--paper section--tight">
      <ScrollReveal className="section-shell split-ledger" direction="up">
        <div>
          <div className="section-heading">
            <p className="section-kicker">{ui.education.educationKicker}</p>
            <h2>{ui.education.educationTitle}</h2>
          </div>
          <div className="compact-ledger">
            {education.map(([period, institution, program]) => (
              <article key={institution}>
                <time>{period}</time>
                <div>
                  <h3>{institution}</h3>
                  <p>{program}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div>
          <div className="section-heading">
            <p className="section-kicker">{ui.education.languagesKicker}</p>
            <h2>{ui.education.languagesTitle}</h2>
          </div>
          <div className="language-grid">
            {languages.map(([language, level]) => (
              <div key={language}>
                <span>{language}</span>
                <strong>{level}</strong>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
