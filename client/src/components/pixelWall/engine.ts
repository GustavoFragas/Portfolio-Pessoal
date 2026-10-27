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
  HALO,
  buildEntranceDelays,
  buildErosion,
  buildPortraitMask,
  buildRestLevels,
  buildThresholds,
  buildWall,
  hash2,
  silhouetteDistance,
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
  /** Tiles that stay wall until p 0.3 (behind the transparent topbar). */
  late?: readonly Rect[];
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
// Story resolution: rest composite, then T/4, T/6 and finally the photo itself.
const LEVEL_STEPS = [0.14, 0.3, 0.44] as const;
const FLIP_WINDOW = 0.045;
const MOVE_START = 0.16;
const TEXT_GONE = 0.18; // hero copy is fully transparent from here (index.css)
const TOPBAR_PAPER = 0.3; // the topbar turns to paper from here (Hero.tsx)
const MOVE_SPAN = 0.52;
const LENS_LIMIT = 0.06;
// Head and shoulders, relative to the crop: they rest at finer tiles than the body.
const HEAD = { x: 0.489, y: 0.21, rx: 0.3, ry: 0.2 } as const;
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
  let erosion: Float32Array = new Float32Array(0);
  let liveMask: HTMLCanvasElement | null = null;
  let liveMaskData: ImageData | null = null;
  let liveMaskAt = -1;
  let personMask: HTMLCanvasElement | null = null; // Gustavo's cells; the rest is panel
  const layer = makeCanvas(1, 1);
  const layerCtx = context2d(layer);
  let delays: Float32Array = new Float32Array(0);
  let levels: HTMLCanvasElement[] = [];
  let full: HTMLCanvasElement | null = null;
  let photoRgb: Uint8ClampedArray | null = null; // one pixel per T/2 cell, unmasked
  let restLevels: Uint8Array = new Uint8Array(0);
  let restCanvas: HTMLCanvasElement | null = null;
  let portraitKey = '';
  const scratch = makeCanvas(1, 1);
  const scratchCtx = context2d(scratch);

  // Motion state.
  let progress = 0;
  let entry: 'idle' | 'pending' | 'running' | 'done' = mode === 'story' && motion ? 'idle' : 'done';
  let entryStart = 0;
  const pointer = { x: 0, y: 0, active: false };
  const lens = { x: 0, y: 0, r: 0 };
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
    erosion = buildErosion(pcols, prows);
    liveMask = makeCanvas(pcols, prows);
    liveMaskData = context2d(liveMask).createImageData(pcols, prows);
    liveMaskAt = -1;

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
    photoRgb = context2d(levels[1]).getImageData(0, 0, pcols * 2, prows * 2).data;
    levels.forEach(applyMask);
    full = makeCanvas(CROP.w, CROP.h);
    context2d(full).drawImage(cropCanvas, 0, 0);
    applyMask(full);
    buildRest();
  }

  /**
   * The portrait at rest, in device pixels: T/2 tiles for the body and finer
   * tiles over the head and shoulders, never the full-resolution photo.
   */
  function buildRest() {
    if (!levels.length) return;
    restLevels = buildRestLevels(pcols, prows, HEAD);
    personMask = makeCanvas(pcols, prows);
    const personCtx = context2d(personMask);
    const personData = personCtx.createImageData(pcols, prows);
    for (let k = 0; k < restLevels.length; k += 1) personData.data[k * 4 + 3] = restLevels[k] > 0 ? 255 : 0;
    personCtx.putImageData(personData, 0, 0);
    const w = pcols * td;
    const h = prows * td;
    restCanvas = makeCanvas(w, h);
    const rctx = context2d(restCanvas);
    rctx.imageSmoothingEnabled = false;
    // Grout fades with the tile size: full at T, thin at T/2, faint at T/3, none at T/4.
    const grouts = [
      { sub: td, line: gd, alpha: 1 },
      { sub: td / 2, line: Math.max(1, Math.round(gd / 2)), alpha: 0.85 },
      { sub: td / 3, line: 1, alpha: 0.4 },
      null,
    ];
    for (const step of [0, 1, 2, 3]) {
      rctx.save();
      rctx.beginPath();
      let any = false;
      for (let k = 0; k < restLevels.length; k += 1) {
        if (restLevels[k] !== step || !mask[k]) continue;
        rctx.rect((k % pcols) * td, Math.floor(k / pcols) * td, td, td);
        any = true;
      }
      const grout = grouts[step];
      if (any) {
        rctx.clip();
        rctx.drawImage(levels[step], 0, 0, w, h);
        if (grout) {
          rctx.fillStyle = INK_CSS;
          rctx.globalAlpha = grout.alpha;
          for (let x = grout.sub; x <= w + 0.5; x += grout.sub) rctx.fillRect(Math.round(x) - grout.line, 0, grout.line, h);
          for (let y = grout.sub; y <= h + 0.5; y += grout.sub) rctx.fillRect(0, Math.round(y) - grout.line, w, grout.line);
          rctx.globalAlpha = 1;
        }
      }
      rctx.restore();
    }
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

    const zones: TileZone[] = layout.calm.map((rect) => ({ ...toZone(rect, dpr, td, cols, rows, 1), level: rect.level }));
    const early: TileZone[] = layout.early.map((rect) => ({ ...toZone(rect, dpr, td, cols, rows, 2), level: 2 }));
    const wall = buildWall(cols, rows, zones);
    colors = wall.colors;
    calm = wall.calm;
    thresholds = buildThresholds(cols, rows, early);
    // Tiles behind text stay until the text has faded; behind the topbar, until it turns to paper.
    for (let i = 0; i < calm.length; i += 1) {
      if (calm[i] === 2) thresholds[i] = Math.max(thresholds[i], TEXT_GONE + 0.1 * hash2(i % cols, Math.floor(i / cols), 71));
    }
    for (const rect of layout.late ?? []) {
      const z = toZone(rect, dpr, td, cols, rows, 1);
      for (let r = z.r0; r <= z.r1; r += 1) {
        for (let c = z.c0; c <= z.c1; c += 1) {
          const i = r * cols + c;
          thresholds[i] = Math.max(thresholds[i], TOPBAR_PAPER + 0.1 * hash2(c, r, 72));
        }
      }
    }

    const previous = portraitKey;
    hero = null;
    about = null;
    if (layout.hero && mode !== 'wall') {
      prows = Math.max(6, Math.round((layout.hero.h * dpr) / td));
      pcols = Math.max(5, Math.round(prows * PORTRAIT_RATIO));
      pr0 = Math.round((layout.hero.y * dpr) / td);
      pc0 = Math.round(((layout.hero.x + layout.hero.w / 2) * dpr) / td - pcols / 2);
      hero = { x: pc0 * td, y: pr0 * td, w: pcols * td, h: prows * td };
      if (layout.about && mode === 'story') {
        const h = Math.round(layout.about.h * dpr);
        const w = Math.round((h * pcols) / prows);
        about = {
          x: Math.round((layout.about.x + layout.about.w / 2) * dpr - w / 2),
          y: Math.round(layout.about.y * dpr),
          w,
          h,
        };
        // A few wall tiles survive around the eroded halo: the last pieces of the wall.
        const blocked = early;
        const c0 = Math.max(0, Math.floor(about.x / td) - 1);
        const c1 = Math.min(cols - 1, Math.floor((about.x + about.w) / td) + 1);
        const r0 = Math.max(0, Math.floor(about.y / td) - 1);
        const r1 = Math.min(rows - 1, Math.floor((about.y + about.h) / td) + 1);
        for (let r = r0; r <= r1; r += 1) {
          for (let c = c0; c <= c1; c += 1) {
            if (blocked.some((b) => c >= b.c0 && c <= b.c1 && r >= b.r0 && r <= b.r1)) continue;
            const u = ((c + 0.5) * td - about.x) / about.w;
            const v = ((r + 0.5) * td - about.y) / about.h;
            const d = silhouetteDistance(u, v);
            const chance = d < HALO ? 0 : d < HALO + 0.07 ? 0.45 : d < HALO + 0.15 ? 0.16 : 0;
            if (hash2(c, r, 40) < chance) thresholds[r * cols + c] = NEVER;
          }
        }
      }
      portraitKey = `${pcols}x${prows}@${td}/${gd}`;
      if (portraitKey !== previous || !maskCanvas || (photo && !levels.length)) rebuildPortrait();
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
  /** Mask with the eroded edge tiles removed for the current progress. */
  function currentMask(p: number): HTMLCanvasElement | null {
    if (!maskCanvas || !liveMask || !liveMaskData || p < 0.14) return maskCanvas;
    if (p !== liveMaskAt) {
      const data = liveMaskData.data;
      for (let k = 0; k < mask.length; k += 1) data[k * 4 + 3] = mask[k] && p < erosion[k] ? 255 : 0;
      context2d(liveMask).putImageData(liveMaskData, 0, 0);
      liveMaskAt = p;
    }
    return liveMask;
  }

  /** Draws a portrait image into rect with optional grout lines, masked to the ragged (and eroding) edge. */
  function drawPortraitImage(image: HTMLCanvasElement, rect: Rect, gridCols: number, gridRows: number, smooth: boolean, p = 0) {
    const w = Math.max(1, Math.round(rect.w));
    const h = Math.max(1, Math.round(rect.h));
    const tile = gridRows > 0 ? h / gridRows : 0;
    const lineAlpha = tile >= 5 ? clamp01((tile - 5) / 4) : 0;
    const edgeMask = currentMask(p);
    if (!edgeMask || (lineAlpha <= 0 && edgeMask === maskCanvas)) {
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
    if (lineAlpha > 0) {
      const line = Math.max(1, Math.round((gd * tile) / td));
      scratchCtx.globalAlpha = lineAlpha;
      scratchCtx.fillStyle = INK_CSS;
      for (let k = 1; k <= gridCols; k += 1) scratchCtx.fillRect(Math.round((k * w) / gridCols) - line, 0, line, h);
      for (let k = 1; k <= gridRows; k += 1) scratchCtx.fillRect(0, Math.round((k * h) / gridRows) - line, w, line);
      scratchCtx.globalAlpha = 1;
    }
    scratchCtx.globalCompositeOperation = 'destination-in';
    scratchCtx.imageSmoothingEnabled = false;
    scratchCtx.drawImage(edgeMask, 0, 0, w, h);
    scratchCtx.globalCompositeOperation = 'source-over';
    ctx.drawImage(scratch, 0, 0, w, h, Math.round(rect.x), Math.round(rect.y), w, h);
  }

  /**
   * The portrait while it travels to About: Gustavo sharpens step by step while
   * the panel behind him keeps the wall tile and erodes with the wall.
   */
  function drawTravelling(image: HTMLCanvasElement, rect: Rect, smooth: boolean, p: number) {
    const edgeMask = currentMask(p);
    if (!edgeMask || !personMask || !levels.length) return;
    const w = Math.max(1, Math.round(rect.w));
    const h = Math.max(1, Math.round(rect.h));
    for (const target of [scratch, layer]) {
      if (target.width < w || target.height < h) {
        target.width = Math.max(target.width, w);
        target.height = Math.max(target.height, h);
      }
    }
    // Panel: wall-sized tiles with grout.
    scratchCtx.globalCompositeOperation = 'source-over';
    scratchCtx.clearRect(0, 0, w, h);
    scratchCtx.imageSmoothingEnabled = false;
    scratchCtx.drawImage(levels[0], 0, 0, w, h);
    const line = Math.max(1, Math.round((gd * h) / (prows * td)));
    scratchCtx.fillStyle = INK_CSS;
    for (let k = 1; k <= pcols; k += 1) scratchCtx.fillRect(Math.round((k * w) / pcols) - line, 0, line, h);
    for (let k = 1; k <= prows; k += 1) scratchCtx.fillRect(0, Math.round((k * h) / prows) - line, w, line);
    // Gustavo: the finer level, cut to his cells.
    layerCtx.globalCompositeOperation = 'source-over';
    layerCtx.clearRect(0, 0, w, h);
    layerCtx.imageSmoothingEnabled = smooth;
    layerCtx.drawImage(image, 0, 0, w, h);
    layerCtx.globalCompositeOperation = 'destination-in';
    layerCtx.imageSmoothingEnabled = false;
    layerCtx.drawImage(personMask, 0, 0, w, h);
    layerCtx.globalCompositeOperation = 'source-over';
    scratchCtx.drawImage(layer, 0, 0, w, h, 0, 0, w, h);
    // Ragged edge plus erosion.
    scratchCtx.globalCompositeOperation = 'destination-in';
    scratchCtx.drawImage(edgeMask, 0, 0, w, h);
    scratchCtx.globalCompositeOperation = 'source-over';
    ctx.drawImage(scratch, 0, 0, w, h, Math.round(rect.x), Math.round(rect.y), w, h);
  }

  /** Coarse wall tiles flip over one by one and land showing the finer portrait. */
  function drawEntry(now: number) {
    if (!hero || !restCanvas) return;
    const elapsed = (now - entryStart) / 1000;
    const size = td - gd;
    const turning: Array<{ i: number; j: number; t: number }> = [];
    ctx.save();
    ctx.beginPath();
    let landed = false;
    for (let k = 0; k < mask.length; k += 1) {
      if (!mask[k]) continue;
      const t = (elapsed - delays[k]) / ENTRY_TILE;
      if (t <= 0) continue; // still wall: the wall underneath shows through
      const i = k % pcols;
      const j = Math.floor(k / pcols);
      if (t >= 1) {
        ctx.rect(hero.x + i * td, hero.y + j * td, td, td);
        landed = true;
      } else turning.push({ i, j, t });
    }
    if (landed) {
      ctx.clip();
      ctx.drawImage(restCanvas, hero.x, hero.y);
    }
    ctx.restore();
    for (const { i, j, t } of turning) {
      const x = hero.x + i * td;
      const y = hero.y + j * td;
      const s = Math.abs(Math.cos(Math.PI * t));
      const h = size * s;
      ctx.fillStyle = INK_CSS;
      ctx.fillRect(x, y, size, size);
      if (h < 0.5) continue;
      if (t < 0.5) {
        const c = pc0 + i;
        const r = pr0 + j;
        const wallIndex = c >= 0 && r >= 0 && c < cols && r < rows ? colors[r * cols + c] : INK;
        ctx.fillStyle = shade(wallIndex, s);
        ctx.fillRect(x, y + (size - h) / 2, size, h);
      } else {
        ctx.drawImage(restCanvas, i * td, j * td, size, size, x, y + (size - h) / 2, size, h);
        ctx.fillStyle = `rgba(22,15,41,${((1 - s) * 0.38).toFixed(3)})`;
        ctx.fillRect(x, y + (size - h) / 2, size, h);
      }
    }
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

  /** Pointer or finger only: the resolution climbs toward the centre, up to the photo itself. */
  function drawLens() {
    if (!hero || !full || levels.length < 5 || !photoRgb) return;
    const R = lens.r;
    const steps: Array<{ cell: number; coarse: number; radius: number; image: HTMLCanvasElement; smooth: boolean }> = [
      { cell: td / 2, coarse: 2, radius: R, image: levels[3], smooth: false },
      { cell: td / 4, coarse: 4, radius: R * 0.6, image: levels[4], smooth: false },
      { cell: td / 4, coarse: 4, radius: R * 0.3, image: full, smooth: true },
    ];
    for (const step of steps) {
      ctx.save();
      if (clipCells(step.cell, step.radius, step.coarse)) {
        ctx.clip();
        ctx.imageSmoothingEnabled = step.smooth;
        ctx.drawImage(step.image, hero.x, hero.y, hero.w, hero.h);
        ctx.imageSmoothingEnabled = false;
      }
      ctx.restore();
    }

    // T/2 tiles on the outer ring lift off: scale 1.12 and a flat offset shadow.
    const cell = td / 2;
    const ringOuter = R + td;
    const i0 = Math.max(0, Math.floor((lens.x - ringOuter - hero.x) / cell));
    const i1 = Math.min(pcols * 2 - 1, Math.floor((lens.x + ringOuter - hero.x) / cell));
    const j0 = Math.max(0, Math.floor((lens.y - ringOuter - hero.y) / cell));
    const j1 = Math.min(prows * 2 - 1, Math.floor((lens.y + ringOuter - hero.y) / cell));
    const inner = cell - Math.max(1, Math.round(gd / 2));
    const size = inner * 1.12;
    const offset = Math.max(1, Math.round(1.5 * dpr));
    const width = pcols * 2;
    for (let j = j0; j <= j1; j += 1) {
      for (let i = i0; i <= i1; i += 1) {
        if (!mask[Math.floor(j / 2) * pcols + Math.floor(i / 2)]) continue;
        const cx = hero.x + (i + 0.5) * cell;
        const cy = hero.y + (j + 0.5) * cell;
        const d = Math.hypot(cx - lens.x, cy - lens.y);
        if (d <= R || d > ringOuter) continue;
        const x = cx - size / 2;
        const y = cy - size / 2;
        ctx.fillStyle = INK_CSS;
        ctx.fillRect(x + offset, y + offset, size, size);
        const o = (j * width + i) * 4;
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
    if (step === 0 && restCanvas) {
      ctx.drawImage(restCanvas, Math.round(rect.x), Math.round(rect.y));
      if (lens.r > 2) drawLens();
    } else if (step === 1) drawTravelling(levels[3], rect, false, p);
    else if (step === 2) drawTravelling(levels[4], rect, false, p);
    else drawTravelling(full, rect, true, p);
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
    const following = pointerOnPortrait() && progress < LENS_LIMIT && entry === 'done';
    const wanted = following ? lensRadius : 0;
    if (following && lens.r < 1) {
      lens.x = pointer.x;
      lens.y = pointer.y;
    }
    const follow = 1 - Math.exp(-dt * 16);
    const grow = 1 - Math.exp(-dt * 9);
    if (following) {
      lens.x += (pointer.x - lens.x) * follow;
      lens.y += (pointer.y - lens.y) * follow;
    }
    lens.r += (wanted - lens.r) * grow;
    if (Math.abs(wanted - lens.r) < 0.5) lens.r = wanted;
    const moving = following && (Math.abs(pointer.x - lens.x) > 0.5 || Math.abs(pointer.y - lens.y) > 0.5);
    return lens.r !== wanted || moving;
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
