import { useEffect, useRef, type CSSProperties } from 'react';
import { X } from 'lucide-react';
import type { CaseItem, PortfolioContent, PortfolioLocale } from '../data/portfolioLocales';
import { diagramUi, type Pt } from '../data/projectDiagrams';
import { projectDetails, techDiagrams } from '../data/projectDetails';
import ProjectDiagram from './ProjectDiagram';

// Loaded on demand by Projects.tsx (kept out of the initial bundle with its data, projectDetails.ts).

// A shaft of six tiles and the diagrams' stepped head (columns of 5, 3 and 1 tiles).
const ARROW_TILES: readonly Pt[] = [
  ...Array.from({ length: 6 }, (_, x): Pt => [x, 2]),
  [6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [7, 1], [7, 2], [7, 3], [8, 2],
];
// The square mark of each stack tile in the drawer (graphics only: 3:1 or more on --surface-tint).
const CHIP_TONES = ['var(--wall-pink)', 'var(--wall-pink-soft)', 'var(--mark)'];
type Copy = PortfolioContent['ui']['projects'];

/** A pixel arrow: a shaft of tiles and the diagrams' stepped head. */
function PixelArrow({ className }: { className: string }) {
  return (
    <svg className={`pixel-arrow ${className}`} viewBox="0 0 53 29" width="53" height="29" aria-hidden="true" focusable="false">
      <path d={ARROW_TILES.map(([x, y]) => `M${x * 6} ${y * 6}h5v5h-5z`).join('')} />
    </svg>
  );
}

/** Accessible drawer for the technical details: native modal dialog (focus kept inside, Esc closes).
    Order: before → after, the real screen (only the ATS has one), verified numbers, the drawing lit
    step by step with its steps as a list, the stack as tiles, and the remaining text in up to three short
    columns: what I did, decisions (only if the case keeps any) and validation (if none, its caveat
    follows what I did). */
export default function TechDrawer({ item, row, copy, locale, onClose }: { item: CaseItem | null; row: number; copy: Copy; locale: PortfolioLocale; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const flowRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (item && !dialog.open) {
      dialog.showModal();
      // Every case opens at its top: the dialog keeps its scroll offset between openings, and with the
      // sticky head (phones) focusing Close no longer scrolls it back.
      dialog.scrollTop = 0;
      document.documentElement.classList.add('dialog-open');
    }
    if (!item && dialog.open) dialog.close();
  }, [item]);

  // The drawing lights step by step once half of it is in view inside the drawer, not while it is still
  // below the fold (phones, and the ATS, whose screenshot comes first). The CSS keeps its steps dimmed
  // until then; with reduced motion it is simply drawn whole.
  useEffect(() => {
    const dialog = ref.current;
    const flow = flowRef.current;
    const drawing = flow?.querySelector('.pdiag');
    if (!dialog || !flow || !drawing) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        flow.dataset.lit = '';
        observer.disconnect();
      },
      { root: dialog, threshold: 0.5 },
    );
    observer.observe(drawing);
    return () => observer.disconnect();
  }, [item]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const onDialogClose = () => {
      document.documentElement.classList.remove('dialog-open');
      onClose();
    };
    dialog.addEventListener('close', onDialogClose);
    return () => dialog.removeEventListener('close', onDialogClose);
  }, [onClose]);

  const detail = item ? projectDetails[item.key] : undefined;
  const lines = detail?.copy[locale];
  const tech = detail?.tech;
  const steps = (tech && techDiagrams[tech].copy[locale].steps) || [];
  const shot = item?.shot && { ...item.shot, ...detail?.shot };
  const validated = item ? item.validation.length > 0 : false;
  // "Decisions" only when the case keeps some that the steps, the stack and "what I did" do not already say.
  const decided = item ? item.decisions.length > 0 : false;
  const columns = 1 + Number(decided) + Number(validated);
  const caveat = item?.caveat && <p className="project__caveat">{item.caveat}</p>;

  return (
    <dialog
      ref={ref}
      id="project-tech"
      className="tech-drawer"
      aria-labelledby="project-tech-title"
      onClick={(event) => {
        // A click on the backdrop lands on the dialog element itself.
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
    >
      {item && (
        <div className="tech-drawer__body">
          <header className="tech-drawer__head">
            <span className="tech-drawer__num" aria-hidden="true">{String(row + 1).padStart(2, '0')}</span>
            <div>
              <p className="project__label">{copy.details}</p>
              <h3 id="project-tech-title">{item.title}</h3>
            </div>
            <button className="tech-drawer__close" type="button" onClick={() => ref.current?.close()} autoFocus>
              {copy.close} <X aria-hidden="true" />
            </button>
          </header>
          <div className="tech-shift">
            <div className="tech-shift__side">
              <h4>{copy.problem}</h4>
              <p>{lines?.before ?? item.problem}</p>
            </div>
            <PixelArrow className="tech-shift__arrow" />
            <div className="tech-shift__side tech-shift__side--after">
              <h4>{copy.result}</h4>
              <p>{lines?.after ?? item.result}</p>
            </div>
          </div>
          {shot && (
            <figure className="tech-drawer__shot">
              <img src={shot.src} width={shot.width} height={shot.height} alt={shot.alt} loading="lazy" decoding="async" />
              {lines?.shotCaption && <figcaption>{lines.shotCaption}</figcaption>}
            </figure>
          )}
          {lines?.figures?.map((figure) => (
            <div className="tech-figure" key={figure.spoken}>
              <p className="sr-only">{figure.spoken}</p>
              <div aria-hidden="true">
                <p className="tech-figure__label">{figure.label}</p>
                <p className="tech-figure__value">
                  <span>{figure.from}</span>
                  <PixelArrow className="tech-figure__arrow" />
                  <strong>{figure.to}</strong>
                </p>
                <p className="tech-figure__note">{figure.note}</p>
              </div>
            </div>
          ))}
          {lines?.counts && (
            <section className="tech-counts" aria-labelledby="project-tech-counts">
              <h4 id="project-tech-counts">{diagramUi[locale].counts}</h4>
              <ul>
                {lines.counts.map(({ value, unit }) => (
                  <li key={unit}>
                    <strong>{value}</strong> <span>{unit}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {tech && (
            <section className="tech-flow" aria-labelledby="project-tech-flow" ref={flowRef}>
              <h4 id="project-tech-flow">{diagramUi[locale].label}</h4>
              <ProjectDiagram diagram={tech} geometry={techDiagrams[tech]} locale={locale} variant="steps" />
              <ol className="tech-flow__steps">
                {steps.map((line, s) => (
                  <li key={line} style={{ '--s': s } as CSSProperties}>
                    <span className="tech-flow__num" aria-hidden="true">{s + 1}</span>
                    {line}
                  </li>
                ))}
              </ol>
            </section>
          )}
          <div className="tech-stack">
            <h4 id="project-tech-tools">{copy.tools}</h4>
            <ul className="tech-chips" aria-labelledby="project-tech-tools">
              {item.tools.map((tool, i) => <li key={tool} style={{ '--c': CHIP_TONES[i % CHIP_TONES.length] } as CSSProperties}>{tool}</li>)}
            </ul>
          </div>
          <div className="project__tech" style={{ '--cols': columns } as CSSProperties}>
            <div>
              <h4>{copy.did}</h4>
              <p>{item.did}</p>
              {!validated && caveat}
            </div>
            {decided && (
              <div>
                <h4>{copy.decisions}</h4>
                <ul>{item.decisions.map((entry) => <li key={entry}>{entry}</li>)}</ul>
              </div>
            )}
            {validated && (
              <div>
                <h4>{copy.validated}</h4>
                <ul>{item.validation.map((entry) => <li key={entry}>{entry}</li>)}</ul>
                {caveat}
              </div>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}
