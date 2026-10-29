import { ArrowUpRight } from 'lucide-react';
import type { CSSProperties } from 'react';
import { usePortfolioContent } from '../LocaleContext';
import TileReveal from './TileReveal';
import '../styles/content.css';
import '../styles/journey.css';

const ALEST = 'Alest';

export default function ExperienceSection() {
  const { content } = usePortfolioContent();
  const { experiences, ui } = content;
  const copy = ui.experience;
  const { leadership } = copy;
  const { feature } = leadership;
  // Alest roles in climbing order (oldest first), so each one sits under its step of the staircase.
  const alestRoles = experiences.filter(([, organization]) => organization === ALEST).reverse();
  const before = experiences.filter(([, organization]) => organization !== ALEST);
  const alestUrl = alestRoles[0]?.[4];

  return (
    <section id="trajetoria" className="section journey" aria-labelledby="journey-title">
      <div className="section__inner">
        {/* The claim as the section title, with the staircase that proves it beside it (≥ 1024 px). */}
        <div className="journey__top">
          <h2 id="journey-title"><TileReveal seed={5}>{copy.title}</TileReveal></h2>

          <div className="ladder__climb">
            <p className="ladder__where">
              {alestUrl ? (
                <a className="quiet-link" href={alestUrl} target="_blank" rel="noopener noreferrer" aria-label={`${copy.climbLabel} — ${copy.openOfficialSite}`}>
                  {copy.climbLabel}
                  <ArrowUpRight aria-hidden="true" />
                </a>
              ) : copy.climbLabel}
            </p>

            {/* Intern → Junior → Mid-level as a staircase of wall tiles, one step per role, date on the tread. */}
            <ol className="ladder__steps">
              {copy.climb.map(([role, since], step) => (
                <li className="ladder__step" key={role} style={{ '--s': step } as CSSProperties}>
                  <p className="ladder__tread">
                    <strong>{role}</strong>
                    <span className="ladder__date">{since}</span>
                  </p>
                  <span className="ladder__riser" aria-hidden="true" />
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="ladder">
          <ol className="ladder__roles">
            {alestRoles.map(([period, , role, notes], index) => {
              const current = index === alestRoles.length - 1;
              return (
                <li className={`ladder__role${current ? ' ladder__role--now' : ''}`} key={period + role}>
                  <p className="ladder__period">
                    {period}
                    {/* Real space before the badge: the flex gap shows one, but the text would read "hojeagora". */}
                    {current && <>{' '}<span className="ladder__now">{copy.current}</span></>}
                  </p>
                  {/* h3 under the section's H2, like "Liderança na prática" and "Antes da Alest". */}
                  <h3>{role}</h3>
                  <ul>{notes.map((note) => <li key={note}>{note}</li>)}</ul>
                </li>
              );
            })}
          </ol>

          {/* What the Alest team did while I am part of it: one quiet line each. A link only when there
              is a public source; never called an award unless it is one. */}
          {copy.teamHighlights.length > 0 && (
            <ul className="ladder__team">
              {copy.teamHighlights.map((item) => {
                const label = item.url ? `${item.title} · ${item.date} — ${copy.sourceLabel}: ${item.source} (${copy.newTab})` : undefined;
                return (
                  <li key={item.title + item.date}>
                    <span className="ladder__team-lead">{copy.teamLead}</span>{' '}
                    {item.url ? (
                      <a className="text-link" href={item.url} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}>
                        {item.title} · <span className="ladder__team-tail">{item.date} <ArrowUpRight aria-hidden="true" /></span>
                      </a>
                    ) : (
                      <>
                        {item.title} · <span className="ladder__team-tail">{item.date}</span>
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Leadership in practice (Rodada 6C): the featured role first (a 2×2 piece of the wall as its mark,
            the figures strip ending in the approval seal, three points and the link to case 01), then the
            compact lines A–E (one wall tile each) and the one approved testimonial, without a name. */}
        <div className="leadership">
          <h3 className="journey__label">{leadership.title}</h3>
          <div className="leadership__body">
            <div className="lead-feature">
              <header className="lead-feature__head">
                {/* Role and scope on two lines; the hidden comma keeps the heading's name readable. */}
                <h4>
                  <span className="lead-feature__role">{feature.role}</span>
                  <span className="sr-only">, </span>
                  <span className="lead-feature__scope">{feature.scope}</span>
                </h4>
                <p className="lead-feature__where">
                  {feature.context} · <span className="leadership__period">{feature.period}</span>
                </p>
              </header>
              <ul className="lead-feature__figures">
                {feature.figures.map(({ value, unit }) => (
                  <li key={unit}>
                    <strong>{value}</strong> <span>{unit}</span>
                  </li>
                ))}
                <li className="lead-feature__seal">{feature.seal}</li>
              </ul>
              <ul className="lead-feature__points">
                {feature.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
              <p className="lead-feature__more">
                <a className="text-link" href="#projetos" data-project-key={feature.project.key}>
                  {feature.project.label} <span aria-hidden="true">→</span>
                </a>
              </p>
            </div>
            {leadership.lines.length > 0 && (
              <ol className="leadership__lines">
                {leadership.lines.map((line) => (
                  <li className="leadership__line" key={line.role + line.scope}>
                    {/* Two paragraphs, so a screen reader pauses between the label and sector · period. */}
                    <div className="leadership__meta">
                      <p className="leadership__label">
                        {/* No-break space before the dot: a wrapped label never starts with "·". From 1100 px
                            the role takes its own line and the dot is left only to screen readers (journey.css). */}
                        <strong>{line.role}</strong><span className="leadership__sep">{'\u00a0· '}</span>{line.scope}
                      </p>
                      <p className="leadership__where">{line.context} · <span className="leadership__period">{line.period}</span></p>
                    </div>
                    <p className="leadership__text">{line.text}</p>
                  </li>
                ))}
              </ol>
            )}
            <figure className="leadership__quote">
              <blockquote>
                <p>{leadership.testimonial.quote}</p>
              </blockquote>
              <figcaption>
                <span className="leadership__by">{leadership.testimonial.attribution}</span>
                {leadership.testimonial.translated && (
                  <>
                    {' '}
                    <span className="leadership__note">{leadership.testimonial.translated}</span>
                  </>
                )}
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Before Alest: one line per role (period, role, place). */}
        <div className="prior-roles">
          <h3 className="journey__label">{copy.beforeLabel}</h3>
          <ol className="prior-roles__list">
            {before.map(([period, organization, role, , organizationUrl, linkLabel]) => (
              <li className="prior-roles__row" key={period + role}>
                {/* Real spaces between the cells: on phones they flow inline as one sentence. */}
                <span className="prior-roles__period">{period}</span>{' '}
                <span className="prior-roles__role">{role}</span>{' '}
                <span className="prior-roles__place">
                  {organizationUrl ? (
                    <a
                      className="quiet-link"
                      href={organizationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={linkLabel ?? `${organization} — ${copy.openOfficialSite}`}
                      title={linkLabel}
                    >
                      {organization}
                      <ArrowUpRight aria-hidden="true" />
                    </a>
                  ) : organization}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
