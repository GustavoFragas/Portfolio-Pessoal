import { Fragment } from 'react';
import { usePortfolioContent } from '../LocaleContext';
import type { CaseItem, PortfolioLocale } from '../data/portfolioLocales';
import TileReveal from './TileReveal';
import '../styles/tools.css';

// "visto em → 01 · 02": the projects whose own stack (the case's `tools`, in the current locale) names a
// chip of the group, worked out here so it always follows the cases. Names match exactly once case and
// spaces are normalized. A case may name a tool more precisely than the chip; only these aliases bridge
// that, never a looser match: "React 19" is React at a version, "SQS FIFO" is SQS with its queue type,
// "Node/Express" is Node.js with its web framework.
const ALIASES: Readonly<Record<string, string>> = {
  'react 19': 'react',
  'sqs fifo': 'sqs',
  'node/express': 'node.js',
};

const toolName = (name: string) => {
  const normalized = name.toLowerCase().replace(/\s+/g, ' ').trim();
  return ALIASES[normalized] ?? normalized;
};

const seenCopy: Record<PortfolioLocale, { seen: string; project: (num: string, title: string) => string }> = {
  pt: { seen: 'visto em', project: (num, title) => `Ver o projeto ${num}, ${title}` },
  en: { seen: 'seen in', project: (num, title) => `See project ${num}, ${title}` },
  es: { seen: 'visto en', project: (num, title) => `Ver el proyecto ${num}, ${title}` },
};

function seenIn(chips: readonly string[], cases: readonly CaseItem[]) {
  const wanted = new Set(chips.map(toolName));
  return cases.flatMap((item, row) =>
    item.tools.some((tool) => wanted.has(toolName(tool))) ? [{ key: item.key, num: String(row + 1).padStart(2, '0'), title: item.title }] : [],
  );
}

export default function Skills() {
  const { content, locale } = usePortfolioContent();
  const { capabilities, cases, ui } = content;
  const copy = seenCopy[locale];

  return (
    <section id="ferramentas" className="section tools" aria-labelledby="tools-title">
      <div className="section__inner">
        <header className="section__head">
          <h2 id="tools-title"><TileReveal seed={8}>{ui.skills.title}</TileReveal></h2>
          <p className="section__intro">{ui.skills.intro}</p>
        </header>
        <ul className="tools__list">
          {capabilities.map(([area, sentence, chips]) => {
            const seen = seenIn(chips, cases);
            // A group seen in every existing case points nowhere in particular: no line for it.
            const showSeen = seen.length > 0 && seen.length < cases.length;
            return (
              <li className="tools__row" key={area}>
                <h3>{area}</h3>
                <p>{sentence}</p>
                {/* The drawer's stack tiles (.tech-chips in index.css); tools.css gives them its tones. */}
                <ul className="tech-chips tools__chips">
                  {chips.map((chip) => <li key={chip}>{chip}</li>)}
                </ul>
                {showSeen && (
                  <p className="tools__seen">
                    <span className="tools__seen-label">{copy.seen} <span aria-hidden="true">→</span></span>
                    {seen.map((card, i) => (
                      <Fragment key={card.key}>
                        {i > 0 && <span className="tools__seen-sep" aria-hidden="true">·</span>}
                        {/* Projects.tsx takes a link with data-project-key to that card (rail, carousel or stack). */}
                        <a href="#projetos" data-project-key={card.key} aria-label={copy.project(card.num, card.title)}>{card.num}</a>
                      </Fragment>
                    ))}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
