// Hero → About is one gesture: leaving the hero (wheel, trackpad, swipe or a scroll key)
// plays the whole transition by time and lands exactly on About; a clear push upwards
// from that landing plays it back. Everywhere else the page scrolls natively: no
// interception at all. Anchors, Tab focus and the scrollbar are never touched.
// Only used when motion is allowed.

const DURATION = 1300;
const SAFETY_MS = 2600; // a transition always releases the scroll after this
const HERO_ZONE = 0.05; // down-glide only from the first 5 % of the story
const LANDING_TOLERANCE = 4; // px around the About landing point
const UP_INTENT_PX = 90; // accumulated upward scroll that means "back to the hero"
const DOWN_INTENT_PX = 10; // accumulated downward wheel that means "leave the hero" (ignores jitter)
const INTENT_GAP_MS = 120; // a pause longer than this restarts the downward accumulation (event cadence varies)
const UP_START_ZONE = 60; // an up gesture may start this far above the landing (after a small nudge)
const UP_WINDOW_MS = 300;
const GESTURE_GAP_MS = 120; // wheel events closer than this belong to one gesture
const ABSORB_MAX_MS = 600; // inertia swallowed after landing, at most
const ABSORB_GAP_MS = 60; // a pause longer than this ends the absorption
const SETTLE_MS = 140; // touch: how long the page must be still before snapping to an edge

const SCROLL_KEYS: Record<string, 1 | -1> = { PageDown: 1, ArrowDown: 1, PageUp: -1, ArrowUp: -1 };

function ease(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

function isEditable(el: Element | null): boolean {
  return el instanceof HTMLElement && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));
}

function isActivatable(el: Element | null): boolean {
  return !!el?.closest?.('button, a[href], summary, [role="button"], input, select, textarea');
}

/** Elements that scroll on their own or own the page while open. */
function insideOwnScroller(el: Element | null): boolean {
  return !!el?.closest?.('dialog, .kmenu');
}

export function createStoryGlide(story: HTMLElement, stage: HTMLElement): () => void {
  let tween: { from: number; to: number; start: number } | null = null;
  let raf = 0;
  let safety = 0;
  // Wheel gesture bookkeeping.
  let lastWheelAt = -Infinity;
  let lastWheelAbs = 0;
  let gesture = 0;
  let glideGesture = -1;
  let upGesture = { id: -1, startedAtLanding: false, sum: 0, since: 0 };
  let downSum = 0;
  let lastDir = 0;
  // Post-landing inertia absorption.
  let absorb: { until: number; lastAt: number; lastAbs: number; dir: number } | null = null;
  let touch: { x: number; y: number; startY: number; decided: boolean; swallow: boolean; upSum: number } | null = null;
  let settleTimer = 0;
  let touchSettling = false;

  const root = document.documentElement;
  const blocked = () => root.classList.contains('menu-open') || root.classList.contains('dialog-open');
  const bounds = () => {
    const top = story.getBoundingClientRect().top + window.scrollY;
    const range = Math.max(0, story.offsetHeight - stage.offsetHeight);
    return { top, end: top + range, range };
  };
  const inHero = () => {
    const { top, range } = bounds();
    const y = window.scrollY;
    return range > 50 && y >= top - 2 && y <= top + range * HERO_ZONE;
  };
  const atLanding = () => {
    const { end, range } = bounds();
    return range > 50 && Math.abs(window.scrollY - end) <= LANDING_TOLERANCE;
  };
  const nearLanding = () => {
    const { end, range } = bounds();
    const y = window.scrollY;
    return range > 50 && y >= end - UP_START_ZONE && y <= end + LANDING_TOLERANCE;
  };

  const stop = () => {
    tween = null;
    cancelAnimationFrame(raf);
    window.clearTimeout(safety);
  };
  const land = () => {
    if (!tween) return;
    const to = tween.to;
    const dir = Math.sign(tween.to - tween.from);
    stop();
    window.scrollTo({ top: to, behavior: 'instant' });
    const now = performance.now();
    // Only the tail of the gesture that is still decaying may be swallowed, briefly.
    absorb = { until: now + ABSORB_MAX_MS, lastAt: lastWheelAt, lastAbs: lastWheelAbs, dir };
  };
  const frame = (now: number) => {
    if (!tween) return;
    const t = Math.min(1, (now - tween.start) / DURATION);
    window.scrollTo({ top: tween.from + (tween.to - tween.from) * ease(t), behavior: 'instant' });
    if (t < 1) raf = requestAnimationFrame(frame);
    else land();
  };
  const glide = (to: number) => {
    const from = window.scrollY;
    if (Math.abs(to - from) < 2) return false;
    absorb = null;
    tween = { from, to, start: performance.now() };
    safety = window.setTimeout(land, SAFETY_MS);
    raf = requestAnimationFrame(frame);
    return true;
  };

  /**
   * Momentum tail right after landing: same direction, no pause, strictly decaying
   * (ties only for the last 1–2 px). Constant deltas are a person still scrolling: let them go.
   */
  const absorbs = (now: number, abs: number, dir: number) => {
    if (!absorb) return false;
    const decaying = abs < absorb.lastAbs || (abs === absorb.lastAbs && abs <= 2);
    const ok = now < absorb.until && now - absorb.lastAt <= ABSORB_GAP_MS && dir === absorb.dir && decaying;
    if (!ok) {
      absorb = null;
      return false;
    }
    absorb.lastAt = now;
    absorb.lastAbs = abs;
    return true;
  };

  const onWheel = (event: WheelEvent) => {
    if (event.ctrlKey || insideOwnScroller(event.target as Element | null)) return;
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
    const dy = event.deltaY * unit;
    if (Math.abs(dy) < 0.5 || Math.abs(event.deltaX * unit) > Math.abs(dy)) return;
    const now = performance.now();
    const abs = Math.abs(dy);
    const dir = dy > 0 ? 1 : -1;
    const gap = now - lastWheelAt;
    if (gap > GESTURE_GAP_MS) gesture += 1;
    if (gap > INTENT_GAP_MS || dir !== lastDir) downSum = 0;
    lastWheelAt = now;
    lastWheelAbs = abs;
    lastDir = dir;

    if (tween) return event.preventDefault(); // the transition owns the scroll while it plays
    if (absorbs(now, abs, dir)) return event.preventDefault();
    if (blocked()) return;

    if (dir > 0) {
      upGesture.sum = 0;
      if (glideGesture !== gesture && inHero()) {
        downSum += abs;
        if (downSum >= DOWN_INTENT_PX) {
          downSum = 0;
          glideGesture = gesture;
          if (glide(bounds().end)) event.preventDefault();
        }
      }
      return; // anywhere else (and tiny jitter in the hero): native
    }

    // Upwards: only a clear push that started on the About landing goes back to the hero.
    if (upGesture.id !== gesture || now - upGesture.since > UP_WINDOW_MS) {
      upGesture = { id: gesture, startedAtLanding: nearLanding(), sum: 0, since: now };
    }
    if (!upGesture.startedAtLanding || glideGesture === gesture) return;
    upGesture.sum += abs;
    if (upGesture.sum >= UP_INTENT_PX) {
      glideGesture = gesture;
      if (glide(bounds().top)) event.preventDefault();
    }
  };

  const onKeyDown = (event: KeyboardEvent) => {
    absorb = null; // keys are never absorbed
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
    const target = event.target as Element | null;
    if (isEditable(target) || insideOwnScroller(target)) return;
    let dir = SCROLL_KEYS[event.key];
    if (event.key === ' ' || event.key === 'Spacebar') {
      if (isActivatable(target)) return;
      dir = event.shiftKey ? -1 : 1;
    }
    if (!dir) return;
    if (tween) return event.preventDefault();
    if (blocked()) return;
    // Up from About only on a big step (PageUp, Shift+Space); ArrowUp stays a small native nudge.
    const bigUp = event.key === 'PageUp' || event.key === ' ' || event.key === 'Spacebar';
    if (dir > 0 && inHero() && glide(bounds().end)) event.preventDefault();
    else if (dir < 0 && bigUp && atLanding() && glide(bounds().top)) event.preventDefault();
  };

  const onTouchStart = (event: TouchEvent) => {
    absorb = null;
    touchSettling = false;
    window.clearTimeout(settleTimer);
    const point = event.touches[0];
    touch = point && event.touches.length === 1 ? { x: point.clientX, y: point.clientY, startY: window.scrollY, decided: false, swallow: false, upSum: 0 } : null;
  };
  const onTouchMove = (event: TouchEvent) => {
    if (tween) {
      if (event.cancelable) event.preventDefault();
      return;
    }
    if (!touch || event.touches.length !== 1 || insideOwnScroller(event.target as Element | null) || blocked()) return;
    const point = event.touches[0];
    const dy = touch.y - point.clientY; // > 0: content scrolls down
    const dx = touch.x - point.clientX;
    if (!touch.decided) {
      if (Math.abs(dy) < 6 && Math.abs(dx) < 6) return;
      touch.decided = true;
      if (Math.abs(dy) <= Math.abs(dx)) return; // sideways: carousels, never ours
      if (dy > 0 && inHero()) touch.swallow = glide(bounds().end);
    }
    if (touch.swallow) {
      if (event.cancelable) event.preventDefault();
      return;
    }
    // Back to the hero: a clear pull down that started on the About landing.
    const { end } = bounds();
    if (dy < 0 && Math.abs(touch.startY - end) <= LANDING_TOLERANCE && -dy >= UP_INTENT_PX) {
      touch.swallow = glide(bounds().top);
      if (touch.swallow && event.cancelable) event.preventDefault();
    }
  };
  // A touch gesture (with its native momentum) never leaves the page halfway through the
  // story: once it settles inside, glide to the nearest edge (hero or About).
  const settle = () => {
    touchSettling = false;
    if (tween || blocked()) return;
    const { top, end, range } = bounds();
    const y = window.scrollY;
    if (range < 50 || y <= top + LANDING_TOLERANCE || y >= end - LANDING_TOLERANCE) return;
    glide(y - top < end - y ? top : end);
  };
  const onTouchEnd = () => {
    touch = null;
    if (tween) return;
    touchSettling = true;
    window.clearTimeout(settleTimer);
    settleTimer = window.setTimeout(settle, SETTLE_MS);
  };
  const onScroll = () => {
    if (!touchSettling) return;
    window.clearTimeout(settleTimer);
    settleTimer = window.setTimeout(settle, SETTLE_MS);
  };

  // Anchors and keyboard focus jump straight to their target: never fight them.
  const onAnchorClick = (event: MouseEvent) => {
    if ((event.target as Element | null)?.closest?.('a[href^="#"]')) {
      stop();
      absorb = null;
    }
  };
  const onFocusIn = (event: FocusEvent) => {
    if (tween && !story.contains(event.target as Node)) stop();
  };
  const onHashChange = () => {
    stop();
    absorb = null;
    touchSettling = false;
    window.clearTimeout(settleTimer);
  };

  window.addEventListener('wheel', onWheel, { passive: false });
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('touchstart', onTouchStart, { passive: true });
  window.addEventListener('touchmove', onTouchMove, { passive: false });
  window.addEventListener('touchend', onTouchEnd, { passive: true });
  window.addEventListener('touchcancel', onTouchEnd, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('hashchange', onHashChange);
  document.addEventListener('click', onAnchorClick, true);
  document.addEventListener('focusin', onFocusIn);

  return () => {
    stop();
    window.clearTimeout(settleTimer);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('wheel', onWheel);
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('touchstart', onTouchStart);
    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('touchend', onTouchEnd);
    window.removeEventListener('touchcancel', onTouchEnd);
    window.removeEventListener('hashchange', onHashChange);
    document.removeEventListener('click', onAnchorClick, true);
    document.removeEventListener('focusin', onFocusIn);
  };
}
