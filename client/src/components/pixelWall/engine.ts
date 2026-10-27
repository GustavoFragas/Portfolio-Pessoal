// Canvas2D engine for the pixel wall. No React, no WebGL. It draws on demand:
// a frame loop only runs while the entrance, the lens or the breathing is alive.
import {
  INK,
  INK_CSS,
  NAVY,
  NEVER,
  PALETTE,
  PAPER,
  PINK,
  PINK_SOFT,
  buildEntranceDelays,
  buildPortraitMask,
  buildThresholds,
  buildWall,
  keepFringe,
  type TileZone,
} from './tiles';

export type Rect = { x: number; y: number; w: number; h: number };
export type CalmRect = Rect & { level: 1 | 2 };

/** Everything in CSS pixels, relative to the canvas box. */
export type WallLayout = {
  width: number;
  height: number;
  tile: number;
  calm: readonly CalmRect[];
  early: readonly Rect[];
  hero?: Rect | null;
  about?: Rect | null;
};

/** story = hero with scroll story, static = reduced motion hero, wall = footer wall without photo. */
export type WallMode = 'story' | 'static' | 'wall';

export type PixelWall = {
  setLayout(layout: WallLayout): void;
  setPhoto(image: CanvasImageSource): void;
  setProgress(progress: number): void;
  setPointer(x: number, y: number, active: boolean): void;
  setActive(active: boolean): void;
  /** Returns true when the entrance is running or waiting for the photo. */
  startEntry(): boolean;
  finishEntry(): void;
  destroy(): void;
};

type Options = {
  mode: WallMode;
  motion: boolean;
  onEntryEnd?: () => void;
};

type Flip = { x: number; y: number; size: number; from: string; to: string; t: number; back: string };
type Breather = { index: number; to: number; start: number };

// Crop of the original 1200×1600 photo that leaves the AWS logo out.
const CROP = { x: 120, y: 440, w: 700, h: 900 } as const;
const PORTRAIT_RATIO = CROP.w / CROP.h;
const LEVELS = [1, 2, 3, 4, 6] as const;
const LEVEL_STEPS = [0.14, 0.26, 0.36, 0.46, 0.56] as const;
const FLIP_WINDOW = 0.045;
const MOVE_START = 0.16;
const MOVE_SPAN = 0.52;
const LENS_LIMIT = 0.06;
// Where the lens rests when no pointer is over the portrait: Gustavo's face,
// relative to the crop. Keeps the portrait recognizable above the fold.
const FACE = { x: 0.489, y: 0.165, radius: 0.82 } as const;
const ENTRY_SPREAD = 0.6;
const ENTRY_JITTER = 0.1;
const ENTRY_TILE = 0.3;
const ENTRY_TOTAL = ENTRY_SPREAD + ENTRY_JITTER + ENTRY_TILE;
const BREATH_INTERVAL = 1000 / 12;
const BREATH_LIFE = 1.8;
const BREATH_SHARE = 0.012;
const SHADES = 8;

const shadeTable: string[][] = PALETTE.map(([r, g, b]) =>
  Array.from({ length: SHADES + 1 }, (_, k) => {
    const f = 0.62 + 0.38 * (k / SHADES);
    return `rgb(${Math.round(r * f)},${Math.round(g * f)},${Math.round(b * f)})`;
  }),
);

function shade(index: number, s: number): string {
  return shadeTable[index][Math.round(Math.min(1, Math.max(0, s)) * SHADES)];
}

function rgbShade(r: number, g: number, b: number, s: number): string {
  const f = 0.62 + 0.38 * Math.min(1, Math.max(0, s));
  return `rgb(${Math.round(r * f)},${Math.round(g * f)},${Math.round(b * f)})`;
}

function clamp01(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}

function easeInOut(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

function makeCanvas(width: number, height: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(width));
  canvas.height = Math.max(1, Math.round(height));
  return canvas;
}

function context2d(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas2D unavailable');
  return ctx;
}

/** Halving steps keep the downscaled portrait from aliasing. */
function downscale(source: HTMLCanvasElement, width: number, height: number): HTMLCanvasElement {
  let current = source;
  while (current.width / 2 >= width && current.height / 2 >= height) {
    const next = makeCanvas(current.width / 2, current.height / 2);
    const ctx = context2d(next);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(current, 0, 0, next.width, next.height);
    current = next;
  }
  const out = makeCanvas(width, height);
  const ctx = context2d(out);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(current, 0, 0, out.width, out.height);
  return out;
}

function toZone(rect: Rect, dpr: number, td: number, cols: number, rows: number, pad: number): Omit<TileZone, 'level'> {
  return {
    c0: Math.max(0, Math.floor((rect.x * dpr) / td) - pad),
    r0: Math.max(0, Math.floor((rect.y * dpr) / td) - pad),
    c1: Math.min(cols - 1, Math.floor(((rect.x + rect.w) * dpr) / td) + pad),
    r1: Math.min(rows - 1, Math.floor(((rect.y + rect.h) * dpr) / td) + pad),
  };
}

export function createPixelWall(canvas: HTMLCanvasElement, options: Options): PixelWall | null {
  let maybeCtx: CanvasRenderingContext2D | null = null;
  try {
    maybeCtx = canvas.getContext('2d');
  } catch {
    maybeCtx = null;
  }
  if (!maybeCtx) return null;
  const ctx: CanvasRenderingContext2D = maybeCtx;
  const { mode, motion } = options;

  // Grid, in device pixels.
  let dpr = 1;
  let td = 12;
  let gd = 2;
  let cols = 0;
  let rows = 0;
  let widthD = 0;
  let heightD = 0;
  let colors: Uint8Array = new Uint8Array(0);
  let calm: Uint8Array = new Uint8Array(0);
  let thresholds: Float32Array = new Float32Array(0);
  let wallCanvas = makeCanvas(1, 1);
  let paperCanvas = makeCanvas(1, 1);
  let wallData: ImageData | null = null;
  let paperData: ImageData | null = null;
  let grout: CanvasPattern | null = null;

  // Portrait.
  let photo: CanvasImageSource | null = null;
  let cropCanvas: HTMLCanvasElement | null = null;
  let hero: Rect | null = null;
  let about: Rect | null = null;
  let pc0 = 0;
  let pr0 = 0;
  let pcols = 0;
  let prows = 0;
  let mask: Uint8Array = new Uint8Array(0);
  let maskCanvas: HTMLCanvasElement | null = null;
  let delays: Float32Array = new Float32Array(0);
  let levels: HTMLCanvasElement[] = [];
  let full: HTMLCanvasElement | null = null;
  let photoRgb: Uint8ClampedArray | null = null;
  let entryCanvas: HTMLCanvasElement | null = null;
  let entryData: ImageData | null = null;
  const scratch = makeCanvas(1, 1);
  const scratchCtx = context2d(scratch);

  // Motion state.
  let progress = 0;
  let entry: 'idle' | 'pending' | 'running' | 'done' = mode === 'story' && motion ? 'idle' : 'done';
  let entryStart = 0;
  const pointer = { x: 0, y: 0, active: false };
  const lens = { x: 0, y: 0, r: 0, ready: false };
  const rest = { x: 0, y: 0 };
  let lensRadius = 150;
  let active = true;
  let breathers: Breather[] = [];
  let raf = 0;
  let lastFrame = 0;
  let lastBreath = 0;
  let dirty = true;
  let destroyed = false;
  const flips: Flip[] = [];

  function request() {
    if (!raf && !destroyed) raf = requestAnimationFrame(frame);
  }

  function rebuildPortrait() {
    if (!hero || pcols <= 0 || prows <= 0) return;
    mask = buildPortraitMask(pcols, prows);
    delays = buildEntranceDelays(pcols, prows, ENTRY_SPREAD, ENTRY_JITTER);
    maskCanvas = makeCanvas(pcols, prows);
    const maskCtx = context2d(maskCanvas);
    const maskImage = maskCtx.createImageData(pcols, prows);
    for (let i = 0; i < mask.length; i += 1) maskImage.data[i * 4 + 3] = mask[i] ? 255 : 0;
    maskCtx.putImageData(maskImage, 0, 0);

    if (!photo) return;
    if (!cropCanvas) {
      cropCanvas = makeCanvas(CROP.w, CROP.h);
      const cropCtx = context2d(cropCanvas);
      cropCtx.imageSmoothingEnabled = true;
      cropCtx.imageSmoothingQuality = 'high';
      cropCtx.drawImage(photo, CROP.x, CROP.y, CROP.w, CROP.h, 0, 0, CROP.w, CROP.h);
    }

    const applyMask = (target: HTMLCanvasElement) => {
      const targetCtx = context2d(target);
      targetCtx.globalCompositeOperation = 'destination-in';
      targetCtx.imageSmoothingEnabled = false;
      targetCtx.drawImage(maskCanvas as HTMLCanvasElement, 0, 0, target.width, target.height);
      targetCtx.globalCompositeOperation = 'source-over';
    };

    levels = LEVELS.map((f) => downscale(cropCanvas as HTMLCanvasElement, pcols * f, prows * f));
    photoRgb = context2d(levels[0]).getImageData(0, 0, pcols, prows).data;
    levels.forEach(applyMask);
    full = makeCanvas(CROP.w, CROP.h);
    context2d(full).drawImage(cropCanvas, 0, 0);
    applyMask(full);
    entryCanvas = makeCanvas(pcols, prows);
    entryData = context2d(entryCanvas).createImageData(pcols, prows);
  }

  function setLayout(layout: WallLayout) {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    widthD = Math.max(1, Math.round(layout.width * dpr));
    heightD = Math.max(1, Math.round(layout.height * dpr));
    if (canvas.width !== widthD) canvas.width = widthD;
    if (canvas.height !== heightD) canvas.height = heightD;
    td = Math.max(4, Math.round(layout.tile * dpr));
    gd = Math.max(1, Math.round(1.5 * dpr));
    cols = Math.ceil(widthD / td);
    rows = Math.ceil(heightD / td);
    lensRadius = Math.min(150, Math.max(90, Math.min(layout.width, layout.height) * 0.17)) * dpr;

    const zones: TileZone[] = layout.calm.map((rect) => ({ ...toZone(rect, dpr, td, cols, rows, 0), level: rect.level }));
    const early: TileZone[] = layout.early.map((rect) => ({ ...toZone(rect, dpr, td, cols, rows, 2), level: 2 }));
    const wall = buildWall(cols, rows, zones);
    colors = wall.colors;
    calm = wall.calm;
    thresholds = buildThresholds(cols, rows, early);

    const previous = `${pcols}x${prows}`;
    hero = null;
    about = null;
    if (layout.hero && mode !== 'wall') {
      prows = Math.max(6, Math.round((layout.hero.h * dpr) / td));
      pcols = Math.max(5, Math.round(prows * PORTRAIT_RATIO));
      pr0 = Math.round((layout.hero.y * dpr) / td);
      pc0 = Math.round(((layout.hero.x + layout.hero.w / 2) * dpr) / td - pcols / 2);
      hero = { x: pc0 * td, y: pr0 * td, w: pcols * td, h: prows * td };
      rest.x = hero.x + hero.w * FACE.x;
      rest.y = hero.y + hero.h * FACE.y;
      if (!lens.ready) {
        lens.x = rest.x;
        lens.y = rest.y;
        lens.ready = true;
      }
      if (layout.about && mode === 'story') {
        const h = Math.round(layout.about.h * dpr);
        const w = Math.round((h * pcols) / prows);
        about = {
          x: Math.round((layout.about.x + layout.about.w / 2) * dpr - w / 2),
          y: Math.round(layout.about.y * dpr),
          w,
          h,
        };
        keepFringe(
          thresholds,
          cols,
          rows,
          toZone({ x: about.x / dpr, y: about.y / dpr, w: about.w / dpr, h: about.h / dpr }, dpr, td, cols, rows, 0),
          early,
        );
      }
      if (`${pcols}x${prows}` !== previous || !maskCanvas || (photo && !levels.length)) rebuildPortrait();
    }

    wallCanvas = makeCanvas(cols, rows);
    paperCanvas = makeCanvas(cols, rows);
    wallData = context2d(wallCanvas).createImageData(cols, rows);
    paperData = context2d(paperCanvas).createImageData(cols, rows);
    const [pr, pg, pb] = PALETTE[PAPER];
    for (let i = 0; i < cols * rows; i += 1) {
      paperData.data[i * 4] = pr;
      paperData.data[i * 4 + 1] = pg;
      paperData.data[i * 4 + 2] = pb;
    }
    const groutTile = makeCanvas(td, td);
    const groutCtx = context2d(groutTile);
    groutCtx.fillStyle = INK_CSS;
    groutCtx.fillRect(td - gd, 0, gd, td);
    groutCtx.fillRect(0, td - gd, td, gd);
    grout = ctx.createPattern(groutTile, 'repeat');
    breathers = [];
    dirty = true;
    render(performance.now());
    dirty = false;
    request();
  }

  function setPhoto(image: CanvasImageSource) {
    photo = image;
    cropCanvas = null;
    rebuildPortrait();
    if (entry === 'pending') beginEntry();
    dirty = true;
    request();
  }

  function beginEntry() {
    if (!photo || !levels.length) {
      entry = 'pending';
      return;
    }
    entry = 'running';
    entryStart = performance.now();
    request();
  }

  function finishEntry() {
    if (entry === 'done') return;
    entry = 'done';
    options.onEntryEnd?.();
    dirty = true;
    lastFrame = 0;
    request();
  }

  function isPortraitTile(c: number, r: number): boolean {
    if (!hero) return false;
    const i = c - pc0;
    const j = r - pr0;
    return i >= 0 && j >= 0 && i < pcols && j < prows && mask[j * pcols + i] === 1;
  }

  function canBreathe(p: number): boolean {
    return motion && active && mode !== 'static' && p < 0.1 && cols > 0;
  }

  function tickBreath(now: number) {
    breathers = breathers.filter((b) => (now - b.start) / 1000 < BREATH_LIFE);
    const target = Math.max(4, Math.round(cols * rows * BREATH_SHARE));
    const spawn = Math.min(target - breathers.length, Math.ceil(target / (BREATH_LIFE * 12)) + 1);
    for (let k = 0; k < spawn; k += 1) {
      const index = Math.floor(Math.random() * cols * rows);
      const c = index % cols;
      const r = Math.floor(index / cols);
      if (isPortraitTile(c, r) || breathers.some((b) => b.index === index)) continue;
      const from = colors[index];
      let to: number;
      if (calm[index] > 0) to = from === INK ? NAVY : INK;
      else {
        const choices = [INK, NAVY, PINK, PINK, PINK_SOFT].filter((value) => value !== from);
        to = choices[Math.floor(Math.random() * choices.length)];
      }
      breathers.push({ index, to, start: now });
    }
  }

  function fillWall(p: number, now: number) {
    if (!wallData || !paperData) return;
    const wd = wallData.data;
    const pd = paperData.data;
    const story = mode === 'story';
    const flipSize = td - gd;
    for (let i = 0; i < cols * rows; i += 1) {
      let index = colors[i];
      let paper = false;
      if (story && p > 0) {
        const th = thresholds[i];
        if (th < NEVER && p >= th + FLIP_WINDOW) paper = true;
        else if (th < NEVER && p > th) {
          paper = true;
          const t = (p - th) / FLIP_WINDOW;
          flips.push({
            x: (i % cols) * td,
            y: Math.floor(i / cols) * td,
            size: flipSize,
            from: shade(index, Math.abs(Math.cos(Math.PI * t))),
            to: shadeTable[PAPER][SHADES],
            t,
            back: shadeTable[PAPER][SHADES],
          });
        }
      }
      if (paper) index = PAPER;
      const color = PALETTE[index];
      const o = i * 4;
      wd[o] = color[0];
      wd[o + 1] = color[1];
      wd[o + 2] = color[2];
      wd[o + 3] = 255;
      pd[o + 3] = paper ? 255 : 0;
    }

    if (!motion || mode === 'static') return;
    for (const b of breathers) {
      const u = (now - b.start) / 1000 / BREATH_LIFE;
      if (u >= 1 || pd[b.index * 4 + 3] === 255) continue;
      const from = colors[b.index];
      const o = b.index * 4;
      const holding = u >= 0.2 && u <= 0.8;
      const shown = PALETTE[holding ? b.to : from];
      wd[o] = shown[0];
      wd[o + 1] = shown[1];
      wd[o + 2] = shown[2];
      if (!holding) {
        const t = u < 0.2 ? u / 0.2 : (u - 0.8) / 0.2;
        const a = u < 0.2 ? from : b.to;
        const z = u < 0.2 ? b.to : from;
        const s = Math.abs(Math.cos(Math.PI * t));
        wd[o] = PALETTE[INK][0];
        wd[o + 1] = PALETTE[INK][1];
        wd[o + 2] = PALETTE[INK][2];
        flips.push({
          x: (b.index % cols) * td,
          y: Math.floor(b.index / cols) * td,
          size: flipSize,
          from: shade(a, s),
          to: shade(z, s),
          t,
          back: INK_CSS,
        });
      }
    }
  }

  function drawFlips() {
    for (const f of flips) {
      ctx.fillStyle = f.back;
      ctx.fillRect(f.x, f.y, f.size, f.size);
      const h = f.size * Math.abs(Math.cos(Math.PI * f.t));
      if (h < 0.5) continue;
      ctx.fillStyle = f.t < 0.5 ? f.from : f.to;
      ctx.fillRect(f.x, f.y + (f.size - h) / 2, f.size, h);
    }
    flips.length = 0;
  }

  /** Draws a portrait image into rect with optional grout lines, masked to the ragged edge. */
  function drawPortraitImage(image: HTMLCanvasElement, rect: Rect, gridCols: number, gridRows: number, smooth: boolean) {
    const w = Math.max(1, Math.round(rect.w));
    const h = Math.max(1, Math.round(rect.h));
    const tile = gridRows > 0 ? h / gridRows : 0;
    const lineAlpha = tile >= 5 ? clamp01((tile - 5) / 4) : 0;
    if (lineAlpha <= 0 || !maskCanvas) {
      ctx.imageSmoothingEnabled = smooth;
      ctx.drawImage(image, Math.round(rect.x), Math.round(rect.y), w, h);
      ctx.imageSmoothingEnabled = false;
      return;
    }
    if (scratch.width < w || scratch.height < h) {
      scratch.width = Math.max(scratch.width, w);
      scratch.height = Math.max(scratch.height, h);
    }
    scratchCtx.globalCompositeOperation = 'source-over';
    scratchCtx.clearRect(0, 0, w, h);
    scratchCtx.imageSmoothingEnabled = smooth;
    scratchCtx.drawImage(image, 0, 0, w, h);
    const line = Math.max(1, Math.round((gd * tile) / td));
    scratchCtx.globalAlpha = lineAlpha;
    scratchCtx.fillStyle = INK_CSS;
    for (let k = 1; k <= gridCols; k += 1) scratchCtx.fillRect(Math.round((k * w) / gridCols) - line, 0, line, h);
    for (let k = 1; k <= gridRows; k += 1) scratchCtx.fillRect(0, Math.round((k * h) / gridRows) - line, w, line);
    scratchCtx.globalAlpha = 1;
    scratchCtx.globalCompositeOperation = 'destination-in';
    scratchCtx.imageSmoothingEnabled = false;
    scratchCtx.drawImage(maskCanvas, 0, 0, w, h);
    scratchCtx.globalCompositeOperation = 'source-over';
    ctx.drawImage(scratch, 0, 0, w, h, Math.round(rect.x), Math.round(rect.y), w, h);
  }

  function drawEntry(now: number) {
    if (!hero || !entryCanvas || !entryData || !photoRgb) return;
    const elapsed = (now - entryStart) / 1000;
    const data = entryData.data;
    const size = td - gd;
    const pending: Flip[] = [];
    for (let j = 0; j < prows; j += 1) {
      for (let i = 0; i < pcols; i += 1) {
        const k = j * pcols + i;
        const o = k * 4;
        if (!mask[k]) {
          data[o + 3] = 0;
          continue;
        }
        const c = pc0 + i;
        const r = pr0 + j;
        const wallIndex = c >= 0 && r >= 0 && c < cols && r < rows ? colors[r * cols + c] : INK;
        const t = (elapsed - delays[k]) / ENTRY_TILE;
        data[o + 3] = 255;
        if (t <= 0) {
          const w = PALETTE[wallIndex];
          data[o] = w[0];
          data[o + 1] = w[1];
          data[o + 2] = w[2];
        } else if (t >= 1) {
          data[o] = photoRgb[o];
          data[o + 1] = photoRgb[o + 1];
          data[o + 2] = photoRgb[o + 2];
        } else {
          const ink = PALETTE[INK];
          data[o] = ink[0];
          data[o + 1] = ink[1];
          data[o + 2] = ink[2];
          const s = Math.abs(Math.cos(Math.PI * t));
          pending.push({
            x: hero.x + i * td,
            y: hero.y + j * td,
            size,
            from: shade(wallIndex, s),
            to: rgbShade(photoRgb[o], photoRgb[o + 1], photoRgb[o + 2], s),
            t,
            back: INK_CSS,
          });
        }
      }
    }
    context2d(entryCanvas).putImageData(entryData, 0, 0);
    drawPortraitImage(entryCanvas, hero, pcols, prows, false);
    flips.push(...pending);
    drawFlips();
    if (elapsed >= ENTRY_TOTAL) finishEntry();
  }

  function clipCells(cell: number, radius: number, coarse: number): boolean {
    if (!hero) return false;
    const r2 = radius * radius;
    const i0 = Math.max(0, Math.floor((lens.x - radius - hero.x) / cell));
    const i1 = Math.min(pcols * coarse - 1, Math.floor((lens.x + radius - hero.x) / cell));
    const j0 = Math.max(0, Math.floor((lens.y - radius - hero.y) / cell));
    const j1 = Math.min(prows * coarse - 1, Math.floor((lens.y + radius - hero.y) / cell));
    let any = false;
    ctx.beginPath();
    for (let j = j0; j <= j1; j += 1) {
      for (let i = i0; i <= i1; i += 1) {
        if (!mask[Math.floor(j / coarse) * pcols + Math.floor(i / coarse)]) continue;
        const cx = hero.x + (i + 0.5) * cell - lens.x;
        const cy = hero.y + (j + 0.5) * cell - lens.y;
        if (cx * cx + cy * cy > r2) continue;
        ctx.rect(hero.x + i * cell, hero.y + j * cell, cell, cell);
        any = true;
      }
    }
    return any;
  }

  function drawLens() {
    if (!hero || !full || levels.length < 4 || !photoRgb) return;
    const R = lens.r;
    const steps: Array<{ cell: number; coarse: number; radius: number; image: HTMLCanvasElement; smooth: boolean; lines: number }> = [
      { cell: td, coarse: 1, radius: R, image: levels[1], smooth: false, lines: 2 },
      { cell: td / 2, coarse: 2, radius: R * 0.6, image: levels[3], smooth: false, lines: 0 },
      { cell: td / 4, coarse: 4, radius: R * 0.3, image: full, smooth: true, lines: 0 },
    ];
    for (const step of steps) {
      ctx.save();
      if (clipCells(step.cell, step.radius, step.coarse)) {
        ctx.clip();
        ctx.imageSmoothingEnabled = step.smooth;
        ctx.drawImage(step.image, hero.x, hero.y, hero.w, hero.h);
        if (step.lines) {
          const sub = td / step.lines;
          const line = Math.max(1, Math.round(gd / (step.lines / 1.5)));
          ctx.fillStyle = INK_CSS;
          const x0 = Math.max(hero.x, lens.x - step.radius - td);
          const x1 = Math.min(hero.x + hero.w, lens.x + step.radius + td);
          const y0 = Math.max(hero.y, lens.y - step.radius - td);
          const y1 = Math.min(hero.y + hero.h, lens.y + step.radius + td);
          for (let x = hero.x + Math.ceil((x0 - hero.x) / sub) * sub; x <= x1; x += sub) ctx.fillRect(Math.round(x) - line, y0, line, y1 - y0);
          for (let y = hero.y + Math.ceil((y0 - hero.y) / sub) * sub; y <= y1; y += sub) ctx.fillRect(x0, Math.round(y) - line, x1 - x0, line);
        }
        ctx.imageSmoothingEnabled = false;
      }
      ctx.restore();
    }

    // Tiles on the outer ring lift off the wall: scale 1.12 and a flat offset shadow.
    const ringOuter = R + td * 1.3;
    const i0 = Math.max(0, Math.floor((lens.x - ringOuter - hero.x) / td));
    const i1 = Math.min(pcols - 1, Math.floor((lens.x + ringOuter - hero.x) / td));
    const j0 = Math.max(0, Math.floor((lens.y - ringOuter - hero.y) / td));
    const j1 = Math.min(prows - 1, Math.floor((lens.y + ringOuter - hero.y) / td));
    const size = (td - gd) * 1.12;
    const offset = Math.max(1, Math.round(2 * dpr));
    for (let j = j0; j <= j1; j += 1) {
      for (let i = i0; i <= i1; i += 1) {
        const k = j * pcols + i;
        if (!mask[k]) continue;
        const cx = hero.x + (i + 0.5) * td;
        const cy = hero.y + (j + 0.5) * td;
        const d = Math.hypot(cx - lens.x, cy - lens.y);
        if (d <= R || d > ringOuter) continue;
        const x = cx - (td - gd) / 2 - size * 0.06;
        const y = cy - (td - gd) / 2 - size * 0.06;
        ctx.fillStyle = INK_CSS;
        ctx.fillRect(x + offset, y + offset, size, size);
        const o = k * 4;
        ctx.fillStyle = `rgb(${photoRgb[o]},${photoRgb[o + 1]},${photoRgb[o + 2]})`;
        ctx.fillRect(x, y, size, size);
      }
    }
  }

  function drawPhoto(p: number, now: number) {
    if (!hero || !levels.length || !full) return;
    if (mode === 'static') {
      drawPortraitImage(full, hero, 0, 0, true);
      return;
    }
    if (entry === 'running') {
      drawEntry(now);
      return;
    }
    if (entry !== 'done') return; // photo region still shows the wall it came from
    const m = about ? easeInOut(clamp01((p - MOVE_START) / MOVE_SPAN)) : 0;
    const to = about ?? hero;
    const rect: Rect = {
      x: hero.x + (to.x - hero.x) * m,
      y: hero.y + (to.y - hero.y) * m,
      w: hero.w + (to.w - hero.w) * m,
      h: hero.h + (to.h - hero.h) * m,
    };
    let step = 0;
    while (step < LEVEL_STEPS.length && p >= LEVEL_STEPS[step]) step += 1;
    if (step >= LEVELS.length) drawPortraitImage(full, rect, 0, 0, true);
    else drawPortraitImage(levels[step], rect, pcols * LEVELS[step], prows * LEVELS[step], false);
    if (step === 0 && lens.r > 2) drawLens();
  }

  function render(now: number) {
    if (!wallData || !paperData || !grout) return;
    const p = mode === 'story' ? progress : 0;
    fillWall(p, now);
    context2d(wallCanvas).putImageData(wallData, 0, 0);
    context2d(paperCanvas).putImageData(paperData, 0, 0);
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, widthD, heightD);
    ctx.drawImage(wallCanvas, 0, 0, cols * td, rows * td);
    ctx.fillStyle = grout;
    ctx.fillRect(0, 0, widthD, heightD);
    ctx.drawImage(paperCanvas, 0, 0, cols * td, rows * td);
    drawFlips();
    drawPhoto(p, now);
  }

  function pointerOnPortrait(): boolean {
    if (!pointer.active || !hero) return false;
    const margin = lensRadius * 0.5;
    return (
      pointer.x >= hero.x - margin &&
      pointer.x <= hero.x + hero.w + margin &&
      pointer.y >= hero.y - margin &&
      pointer.y <= hero.y + hero.h + margin
    );
  }

  function updateLens(dt: number): boolean {
    if (mode !== 'story' || !motion || !hero) return false;
    const following = pointerOnPortrait();
    const tx = following ? pointer.x : rest.x;
    const ty = following ? pointer.y : rest.y;
    const visible = progress < LENS_LIMIT && entry === 'done';
    const wanted = visible ? lensRadius * (following ? 1 : FACE.radius) : 0;
    const follow = 1 - Math.exp(-dt * (following ? 16 : 6));
    const grow = 1 - Math.exp(-dt * 7);
    lens.x += (tx - lens.x) * follow;
    lens.y += (ty - lens.y) * follow;
    lens.r += (wanted - lens.r) * grow;
    if (Math.abs(wanted - lens.r) < 0.5) lens.r = wanted;
    const moving = Math.abs(tx - lens.x) > 0.5 || Math.abs(ty - lens.y) > 0.5;
    if (!moving) {
      lens.x = tx;
      lens.y = ty;
    }
    return lens.r !== wanted || (lens.r > 0 && moving);
  }

  function frame(now: number) {
    raf = 0;
    if (destroyed) return;
    const dt = lastFrame ? Math.min(0.05, (now - lastFrame) / 1000) : 1 / 60;
    lastFrame = now;
    const lensBusy = updateLens(dt);
    const entryBusy = entry === 'running';
    const breathing = canBreathe(progress);
    let draw = dirty || lensBusy || entryBusy;
    if (breathing && now - lastBreath >= BREATH_INTERVAL) {
      tickBreath(now);
      lastBreath = now;
      draw = true;
    }
    if (draw) {
      render(now);
      dirty = false;
    }
    if (lensBusy || entry === 'running' || breathing) request();
    else lastFrame = 0;
  }

  return {
    setLayout,
    setPhoto,
    setProgress(next: number) {
      const p = clamp01(next);
      if (p === progress) return;
      progress = p;
      if (p > 0.01 && (entry === 'running' || entry === 'pending' || entry === 'idle')) finishEntry();
      dirty = true;
      request();
    },
    setPointer(x: number, y: number, isActive: boolean) {
      pointer.x = x * dpr;
      pointer.y = y * dpr;
      pointer.active = isActive;
      request();
    },
    setActive(isActive: boolean) {
      active = isActive;
      if (isActive) {
        dirty = true;
        request();
      }
    },
    startEntry() {
      if (mode !== 'story' || !motion || entry === 'done') return false;
      beginEntry();
      return true;
    },
    finishEntry,
    destroy() {
      destroyed = true;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    },
  };
}
