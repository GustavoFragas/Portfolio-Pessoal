// Deterministic tile colours for the pixel wall. Pure functions, no DOM.

export const INK = 0;
export const NAVY = 1;
export const PINK = 2;
export const PINK_SOFT = 3;
export const PAPER = 4;

export type Rgb = readonly [number, number, number];

// Sampled from the AWS Summit panel in the original photo (see the design brief).
export const PALETTE: readonly Rgb[] = [
  [0x16, 0x0f, 0x29], // --wall-ink
  [0x22, 0x16, 0x3a], // --wall-navy
  [0xec, 0x43, 0x85], // --wall-pink
  [0xf6, 0xa3, 0xc4], // --wall-pink-soft
  [0xf4, 0xee, 0xe6], // --paper
];

export const INK_CSS = '#160F29';
export const PAPER_CSS = '#F4EEE6';

/** Integer hash of a tile coordinate, mapped to [0, 1). */
export function hash2(x: number, y: number, seed: number): number {
  let h = Math.imul(x | 0, 0x27d4eb2d) ^ Math.imul(y | 0, 0x165667b1) ^ Math.imul(seed | 0, 0x9e3779b1);
  h = Math.imul(h ^ (h >>> 15), 0x85ebca6b);
  h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

/** Smooth value noise over a coarse lattice, in [0, 1]. */
export function valueNoise(x: number, y: number, cell: number, seed: number): number {
  const gx = x / cell;
  const gy = y / cell;
  const x0 = Math.floor(gx);
  const y0 = Math.floor(gy);
  const fx = gx - x0;
  const fy = gy - y0;
  const sx = fx * fx * (3 - 2 * fx);
  const sy = fy * fy * (3 - 2 * fy);
  const a = hash2(x0, y0, seed);
  const b = hash2(x0 + 1, y0, seed);
  const c = hash2(x0, y0 + 1, seed);
  const d = hash2(x0 + 1, y0 + 1, seed);
  return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy;
}

/** Inclusive tile bounds of a calm zone. level 2 = no pink at all, 1 = little pink. */
export type TileZone = { c0: number; r0: number; c1: number; r1: number; level: 1 | 2 };

const CALM_FALLOFF = 3;

export type WallTiles = {
  /** Palette index per tile. */
  colors: Uint8Array;
  /** 0 = free, 1 = near text, 2 = behind text (breathing may only swap dark tones). */
  calm: Uint8Array;
};

/**
 * Procedural wall: ~58 % ink/navy, ~32 % pink, ~10 % light pink, grouped in short
 * rectangular runs like the physical panel. Calm zones keep text legible.
 */
export function buildWall(cols: number, rows: number, zones: readonly TileZone[], seed = 7): WallTiles {
  const colors = new Uint8Array(cols * rows);
  const calm = new Uint8Array(cols * rows);

  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      let factor = 0;
      let zero = false;
      let low = false;

      for (const zone of zones) {
        const dx = c < zone.c0 ? zone.c0 - c : c > zone.c1 ? c - zone.c1 : 0;
        const dy = r < zone.r0 ? zone.r0 - r : r > zone.r1 ? r - zone.r1 : 0;
        const distance = Math.max(dx, dy);
        if (distance === 0) {
          if (zone.level === 2) zero = true;
          else low = true;
        }
        const weight = Math.max(0, 1 - distance / CALM_FALLOFF) * (zone.level === 2 ? 1 : 0.7);
        if (weight > factor) factor = weight;
      }

      const regional = 0.75 + 0.5 * valueNoise(c, r, 9, seed);
      let pink = 0.32 * regional * (1 - factor);
      let soft = 0.1 * regional * (1 - Math.min(1, factor * 1.6));
      if (zero) {
        pink = 0;
        soft = 0;
      } else if (low) {
        pink = Math.min(pink, 0.1);
        soft = 0;
      }

      const superCol = Math.floor(c / 4);
      const superRow = Math.floor(r / 3);
      const shape = hash2(superCol, superRow, seed + 1);
      const runWidth = shape < 0.45 ? 1 : shape < 0.8 ? 2 : 3;
      const runHeight = hash2(superCol, superRow, seed + 2) < 0.65 ? 1 : 2;
      const runCol = Math.floor(c / runWidth);
      const runRow = Math.floor(r / runHeight);
      const value = hash2(runCol, runRow, seed + 3);

      const index = r * cols + c;
      if (value < pink) colors[index] = PINK;
      else if (value < pink + soft) colors[index] = PINK_SOFT;
      else colors[index] = hash2(runCol, runRow, seed + 4) < 0.55 ? NAVY : INK;

      calm[index] = zero ? 2 : low || factor > 0.35 ? 1 : 0;
    }
  }

  return { colors, calm };
}

/**
 * Scroll threshold at which each wall tile flips to paper. Tiles inside an
 * "early" zone (behind the About text) are gone before that text appears.
 */
export function buildThresholds(
  cols: number,
  rows: number,
  early: readonly TileZone[],
  seed = 7,
): Float32Array {
  const thresholds = new Float32Array(cols * rows);
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const noise = 0.6 * valueNoise(c, r, 7, seed + 9) + 0.4 * hash2(c, r, seed + 10);
      const isEarly = early.some((zone) => c >= zone.c0 && c <= zone.c1 && r >= zone.r0 && r <= zone.r1);
      thresholds[r * cols + c] = isEarly ? 0.1 + 0.3 * noise : 0.12 + 0.5 * noise;
    }
  }
  return thresholds;
}

/** Threshold value for tiles that never flip to paper. */
export const NEVER = 9;

/**
 * Keeps a ragged fringe of wall tiles around a rectangle (in tiles) so the
 * resolved portrait still carries pieces of the wall once the rest is paper.
 */
export function keepFringe(
  thresholds: Float32Array,
  cols: number,
  rows: number,
  zone: Omit<TileZone, 'level'>,
  blocked: readonly TileZone[],
  seed = 7,
): void {
  for (let r = Math.max(0, zone.r0 - 2); r <= Math.min(rows - 1, zone.r1 + 2); r += 1) {
    for (let c = Math.max(0, zone.c0 - 2); c <= Math.min(cols - 1, zone.c1 + 2); c += 1) {
      const dx = c < zone.c0 ? zone.c0 - c : c > zone.c1 ? c - zone.c1 : 0;
      const dy = r < zone.r0 ? zone.r0 - r : r > zone.r1 ? r - zone.r1 : 0;
      const distance = Math.max(dx, dy);
      if (distance === 0) continue;
      if (blocked.some((b) => c >= b.c0 && c <= b.c1 && r >= b.r0 && r <= b.r1)) continue;
      const chance = distance === 1 ? 0.5 : 0.22;
      if (hash2(c, r, seed + 40) < chance) thresholds[r * cols + c] = NEVER;
    }
  }
}

/**
 * Which portrait tiles show the photo. Tiles near the region edge randomly fall
 * back to the wall so Gustavo comes out of the wall instead of sitting in a box.
 */
export function buildPortraitMask(cols: number, rows: number, seed = 7): Uint8Array {
  const mask = new Uint8Array(cols * rows);
  const side = Math.max(2, Math.round(cols * 0.08));
  const top = Math.max(1, Math.round(rows * 0.03));
  const bottom = Math.max(2, Math.round(rows * 0.045));

  for (let j = 0; j < rows; j += 1) {
    for (let i = 0; i < cols; i += 1) {
      const edge = Math.min(i / side, (cols - 1 - i) / side, j / top, (rows - 1 - j) / bottom);
      const keep = edge >= 1 ? 1 : edge <= 0 ? 0.15 : 0.15 + 0.85 * edge * edge * (3 - 2 * edge);
      mask[j * cols + i] = hash2(i, j, seed + 20) < keep ? 1 : 0;
    }
  }

  return mask;
}

export type HeadArea = { x: number; y: number; rx: number; ry: number };

// Rough silhouette of Gustavo inside the crop (0..1): curly hair and face, then
// shoulders and sweater down to the hands. Only used to pick tile sizes.
const HEAD_SHAPE = { x: 0.49, y: 0.15, rx: 0.15, ry: 0.13 } as const;
const BODY_SHAPE = { u0: 0.17, u1: 0.81, v0: 0.27 } as const;

/**
 * Tile size per portrait cell while nothing points at it, as an index into the
 * engine levels: 0 = wall tile T for the panel behind him, 1 = T/2 for the body,
 * 2 = T/3 and 3 = T/4 over the head and shoulders. Every boundary is dithered per
 * tile, so the resolution grows toward the face without a hard ring or box.
 */
export function buildRestLevels(cols: number, rows: number, head: HeadArea, seed = 7): Uint8Array {
  const levels = new Uint8Array(cols * rows);
  for (let j = 0; j < rows; j += 1) {
    for (let i = 0; i < cols; i += 1) {
      const u = (i + 0.5) / cols;
      const v = (j + 0.5) / rows;
      const bodyDx = Math.max(BODY_SHAPE.u0 - u, 0, u - BODY_SHAPE.u1);
      const bodyDy = Math.max(BODY_SHAPE.v0 - v, 0);
      const body = Math.hypot(bodyDx, bodyDy);
      const headDistance = Math.max(0, Math.hypot((u - HEAD_SHAPE.x) / HEAD_SHAPE.rx, (v - HEAD_SHAPE.y) / HEAD_SHAPE.ry) - 1) * 0.14;
      const outside = Math.min(body, headDistance) + (hash2(i, j, seed + 51) - 0.5) * 0.05;
      const k = j * cols + i;
      if (outside > 0.035) {
        levels[k] = 0;
        continue;
      }
      const s = Math.hypot((u - head.x) / head.rx, (v - head.y) / head.ry) + (hash2(i, j, seed + 50) - 0.5) * 0.32;
      levels[k] = s < 0.62 ? 3 : s < 1.02 ? 2 : 1;
    }
  }
  return levels;
}

/** Entrance delay (seconds) per portrait tile: a diagonal wave plus a little jitter. */
export function buildEntranceDelays(cols: number, rows: number, spread: number, jitter: number, seed = 7): Float32Array {
  const delays = new Float32Array(cols * rows);
  const spanX = Math.max(1, cols - 1);
  const spanY = Math.max(1, rows - 1);
  for (let j = 0; j < rows; j += 1) {
    for (let i = 0; i < cols; i += 1) {
      delays[j * cols + i] = spread * ((i / spanX + j / spanY) / 2) + jitter * hash2(i, j, seed + 30);
    }
  }
  return delays;
}
