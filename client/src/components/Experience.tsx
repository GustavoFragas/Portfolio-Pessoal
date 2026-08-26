import { ExternalLink } from 'lucide-react';
import { usePortfolioContent } from '../LocaleContext';
import ScrollReveal from './ScrollReveal';

export default function ExperienceSection() {
  const { content } = usePortfolioContent();
  const { experiences, ui } = content;

  return (
    <section id="trajetoria" className="section section--dark">
      <ScrollReveal className="section-shell ledger-shell" direction="right">
        <div className="section-heading">
          <p className="section-kicker">{ui.experience.kicker}</p>
          <h2>{ui.experience.title}</h2>
        </div>
        <div className="timeline-ledger">
          {experiences.map(([period, organization, role, notes, organizationUrl]) => (
            <article className="timeline-row" key={period + role}>
              <time>{period}</time>
              <div>
                <h3>{role}</h3>
                <p>
                  {organizationUrl ? (
                    <a
                      className="organization-link"
                      href={organizationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${organization} — ${ui.experience.openOfficialSite}`}
                    >
                      {organization} <ExternalLink aria-hidden="true" />
                    </a>
                  ) : organization}
                </p>
                <ul>{notes.map((note) => <li key={note}>{note}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
