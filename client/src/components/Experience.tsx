import { ArrowUpRight } from 'lucide-react';
import { usePortfolioContent } from '../LocaleContext';

export default function ExperienceSection() {
  const { content } = usePortfolioContent();
  const { experiences, ui } = content;

  return (
    <section id="trajetoria" className="section journey" aria-labelledby="journey-title">
      <div className="section__inner">
        <header className="section__head section__head--single">
          <p className="kicker">{ui.experience.kicker}</p>
          <h2 id="journey-title">{ui.experience.title}</h2>
        </header>
        <ol className="journey__list">
          {experiences.map(([period, organization, role, notes, organizationUrl], index) => (
            <li className={`journey__row ${index === 0 ? 'journey__row--now' : ''}`} key={period + role}>
              <p className="journey__period">
                {period}
                {index === 0 && <span className="journey__now">{ui.experience.current}</span>}
              </p>
              <div>
                <h3>{role}</h3>
                <p className="journey__org">
                  {organizationUrl ? (
                    <a
                      className="text-link"
                      href={organizationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${organization} — ${ui.experience.openOfficialSite}`}
                    >
                      {organization} <ArrowUpRight aria-hidden="true" />
                    </a>
                  ) : organization}
                </p>
                <ul>{notes.map((note) => <li key={note}>{note}</li>)}</ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
