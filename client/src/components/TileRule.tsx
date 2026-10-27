import { hash2 } from './pixelWall/tiles';

const COUNT = 160;
const STEP = 13.5;

function tone(index: number, seed: number): string {
  const value = hash2(index, 0, seed);
  if (value < 0.1) return 'tile tile--pink';
  if (value < 0.17) return 'tile tile--navy';
  if (value < 0.21) return 'tile tile--soft';
  return 'tile tile--paper';
}

/** A one-row strip of the wall, used as the divider between sections. */
export default function TileRule({ seed = 1 }: { seed?: number }) {
  return (
    <svg
      className="tile-rule"
      viewBox={`0 0 ${COUNT * STEP} 12`}
      preserveAspectRatio="xMinYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      {Array.from({ length: COUNT }, (_, index) => (
        <rect key={index} className={tone(index, seed)} x={index * STEP} y={0} width={12} height={12} />
      ))}
    </svg>
  );
}
