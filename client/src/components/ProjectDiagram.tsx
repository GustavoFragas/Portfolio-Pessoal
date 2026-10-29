import { useId, type CSSProperties } from 'react';
import { diagramUi, type Diagram, type DiagramLink, type Pt } from '../data/projectDiagrams';
import type { PortfolioLocale } from '../data/portfolioLocales';
import '../styles/project-diagram.css';

// A small architecture drawing in the wall's own language: everything sits on a tile grid (5-unit
// tiles, 1-unit grout, like the wall), blocks are runs of tiles and the arrows are chains of tiles
// that go down in steps, never curves. Geometry (in tiles) and labels come from projectDiagrams.ts (the
// drawer's copies, with their steps, from projectDetails.ts).
// Two variants: `card` (labelled image with its own text alternative) and `steps` (the drawer's
// enlarged copy: numbered, lit in the order of its steps, hidden from assistive technology because
// the drawer lists the same steps as visible text).
const PITCH = 6;
const TILE = 5;
const WIDTH = 44; // tiles (263 units): the same for every diagram, so the text has the same size
const PAD = 7; // room for the step numbers that sit on the blocks' corners (steps variant)
const BADGE = 12;

/** Tiles along a path: straight runs, and stairs (two tiles across, two down) where it goes diagonally. */
function tilesAlong(path: readonly Pt[]): Pt[] {
  let [x, y] = path[0];
  const out: Pt[] = [[x, y]];
  for (const [tx, ty] of path.slice(1)) {
    while (x !== tx || y !== ty) {
      const dx = Math.sign(tx - x);
      const dy = Math.sign(ty - y);
      if (dx && dy) {
        for (let i = 0; i < 2 && x !== tx; i++) out.push([(x += dx), y]);
        for (let i = 0; i < 2 && y !== ty; i++) out.push([x, (y += dy)]);
      } else out.push([(x += dx), (y += dy)]);
    }
  }
  return out;
}

/** Pixel arrowhead at `tip`, pointing away from `from`: rows of 1, 3 and 5 tiles, a stepped triangle. */
function headTiles(tip: Pt, from: Pt): Pt[] {
  const dx = tip[0] - from[0];
  const dy = tip[1] - from[1];
  const out: Pt[] = [];
  for (let back = 1; back <= 2; back++) {
    for (let side = -back; side <= back; side++) out.push([tip[0] - dx * back - dy * side, tip[1] - dy * back + dx * side]);
  }
  return out;
}

const tilePath = (tiles: readonly Pt[]) => tiles.map(([x, y]) => `M${x * PITCH} ${y * PITCH}h${TILE}v${TILE}h-${TILE}z`).join('');

function linkPath(link: DiagramLink): string {
  const tiles = tilesAlong(link.path);
  const n = tiles.length;
  const heads = headTiles(tiles[n - 1], tiles[n - 2]);
  if (link.heads === 'both') heads.push(...headTiles(tiles[0], tiles[1]));
  const seen = new Set(tiles.map(([x, y]) => `${x},${y}`));
  return tilePath([...tiles, ...heads.filter(([x, y]) => !seen.has(`${x},${y}`))]);
}

const crossAt = ([cx, cy]: Pt): Pt[] => [[cx - 1, cy - 1], [cx + 1, cy - 1], [cx, cy], [cx - 1, cy + 1], [cx + 1, cy + 1]];

function Label({ lines, x, y, w, h }: { lines: readonly string[]; x: number; y: number; w: number; h: number }) {
  const mid = y + h / 2;
  return (
    <text className="pdiag__text" x={x + w / 2} textAnchor="middle">
      {lines.map((line, i) => (
        <tspan key={line + i} className={i ? 'pdiag__sub' : undefined} x={x + w / 2} y={mid + (i - (lines.length - 1) / 2) * 13 + 4.2}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

type Variant = 'card' | 'steps';

export default function ProjectDiagram({ diagram, geometry, locale, variant = 'card' }: { diagram: string; geometry: Diagram; locale: PortfolioLocale; variant?: Variant }) {
  const titleId = useId();
  const copy = geometry.copy[locale];
  const steps = variant === 'steps';
  const width = WIDTH * PITCH - (PITCH - TILE);
  const height = geometry.rows * PITCH - (PITCH - TILE);
  const pad = steps ? PAD : 0;
  // Step of every part (steps variant): the drawer lights the drawing in this order.
  const order = steps ? (geometry.steps ?? []) : [];
  const stepOf = new Map<string, number>();
  order.forEach((ids, s) => ids.forEach((id) => stepOf.set(id, s)));
  const part = (id: string, base: CSSProperties = {}): { style?: CSSProperties; 'data-step'?: number } => {
    const s = stepOf.get(id);
    return s === undefined ? (Object.keys(base).length ? { style: base } : {}) : { style: { ...base, '--s': s } as CSSProperties, 'data-step': s + 1 };
  };
  // Each step's number sits on the top-left corner of its first block, or where the geometry says.
  const badges = order.map((ids, s) => {
    const block = geometry.blocks.find((b) => ids.includes(b.id));
    const set = geometry.badges?.[s];
    const at: Pt = set ? [set[0] * PITCH, set[1] * PITCH] : block ? [block.at[0] * PITCH, block.at[1] * PITCH] : [0, 0];
    return { s, x: at[0] - BADGE / 2, y: at[1] - BADGE / 2 };
  });

  const drawing = (
    <svg
      className="pdiag__svg"
      viewBox={`${-pad} ${-pad} ${width + 2 * pad} ${height + 2 * pad}`}
      width={width + 2 * pad}
      height={height + 2 * pad}
      {...(steps ? { 'aria-hidden': true, focusable: false } : { role: 'img', 'aria-labelledby': titleId })}
    >
      {!steps && <title id={titleId}>{copy.alt}</title>}
      {geometry.links.map((link, i) => (
        <path key={link.id} className={`pdiag__link${link.tone ? ` pdiag__link--${link.tone}` : ''}`} d={linkPath(link)} {...part(link.id, { '--k': i } as CSSProperties)} />
      ))}
      {geometry.cut && (
        <g className="pdiag__part" {...part(geometry.cut.id)}>
          <path className="pdiag__link" style={{ '--k': 0 } as CSSProperties} d={tilePath(tilesAlong(geometry.cut.path))} />
          <path className="pdiag__cut" d={tilePath(crossAt(geometry.cut.cross))} />
        </g>
      )}
      {geometry.blocks.map(({ id, at: [bx, by, bw, bh], key }) => {
        const x = bx * PITCH;
        const y = by * PITCH;
        const w = bw * PITCH - (PITCH - TILE);
        const h = bh * PITCH - (PITCH - TILE);
        return (
          <g key={id} className={`pdiag__block${key ? ' pdiag__block--key' : ''}`} {...part(id)}>
            <rect x={x} y={y} width={w} height={h} />
            <Label lines={copy.nodes[id] ?? []} x={x} y={y} w={w} h={h} />
          </g>
        );
      })}
      {geometry.notes.map(({ id, x, y, anchor = 'start' }) => (
        <text key={id} className="pdiag__note" textAnchor={anchor} {...part(id)}>
          {(copy.notes[id] ?? []).map((line, i) => (
            <tspan key={line + i} x={x * PITCH} y={y * PITCH + 8 + i * 12}>
              {line}
            </tspan>
          ))}
        </text>
      ))}
      {badges.map(({ s, x, y }) => (
        <g key={s} className="pdiag__badge" style={{ '--s': s } as CSSProperties}>
          <rect x={x} y={y} width={BADGE} height={BADGE} />
          <text x={x + BADGE / 2} y={y + BADGE / 2 + 3.6} textAnchor="middle">
            {s + 1}
          </text>
        </g>
      ))}
    </svg>
  );

  return (
    <div className={`pdiag${steps ? ' pdiag--steps' : ''}`} data-diagram={diagram}>
      {!steps && <p className="pdiag__label">{copy.label ?? diagramUi[locale].label}</p>}
      {drawing}
    </div>
  );
}
