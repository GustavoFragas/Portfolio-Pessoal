import { hash2 } from './pixelWall/tiles';

const COUNT = 160;
const STEP = 13.5;
const TONES = ['paper', 'pink', 'navy', 'soft'] as const;

function tone(index: number, seed: number): (typeof TONES)[number] {
  const value = hash2(index, 0, seed);
  if (value < 0.1) return 'pink';
  if (value < 0.17) return 'navy';
  if (value < 0.21) return 'soft';
  return 'paper';
}

/** A one-row strip of the wall, used as the divider between sections. One <path> per tone (the same
    12×12 squares every 13.5 units): 4 nodes instead of 160 to style, lay out and paint. */
export default function TileRule({ seed = 1 }: { seed?: number }) {
  const paths: Record<(typeof TONES)[number], string> = { paper: '', pink: '', navy: '', soft: '' };
  for (let index = 0; index < COUNT; index += 1) paths[tone(index, seed)] += `M${index * STEP} 0h12v12h-12z`;
  return (
    <svg
      className="tile-rule"
      viewBox={`0 0 ${COUNT * STEP} 12`}
      preserveAspectRatio="xMinYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      {TONES.map((key) => paths[key] && <path key={key} className={`tile tile--${key}`} d={paths[key]} />)}
    </svg>
  );
}
