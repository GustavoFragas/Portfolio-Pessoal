import {
  Component,
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react';
import { m, useReducedMotion } from 'motion/react';
import { usePortfolioContent } from '../LocaleContext';

const desktopNodePositions = [
  [47, 29],
  [63, 18],
  [82, 28],
  [58, 49],
  [76, 53],
  [92, 48],
] as const;

const compactNodePositions = [
  [47, 29],
  [63, 18],
  [82, 28],
  [58, 49],
  [81, 55],
  [86, 75],
] as const;

const desktopSystemRoute = 'M47 29 C53 29 56 18 63 18 S75 28 82 28 C77 34 67 43 58 49 S68 51 76 53 C82 54 88 50 92 48';
const compactSystemRoute = 'M47 29 C53 29 56 18 63 18 S75 28 82 28 C77 34 67 43 58 49 C66 49 75 55 81 55 C84 59 86 68 86 75';

function EmptyScene() {
  return <></>;
}

const HeroTelemetryScene = lazy(async () => {
  try {
    return await import('./HeroTelemetryScene');
  } catch {
    return { default: EmptyScene };
  }
});

class SceneErrorBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function canUseWebGL2() {
  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl2', {
      alpha: true,
      antialias: false,
      powerPreference: 'low-power',
    });
    if (!context) return false;
    context.getExtension('WEBGL_lose_context')?.loseContext();
    return true;
  } catch {
    return false;
  }
}

function useAtmosphereAllowed(reducedMotion: boolean | null) {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const reducedData = window.matchMedia('(prefers-reduced-data: reduce)');
    const compactViewport = window.matchMedia('(max-width: 639px)');
    const connection = navigator as Navigator & { connection?: { saveData?: boolean } };
    const webGL2Available = canUseWebGL2();

    const update = () => {
      setAllowed(
        webGL2Available &&
        !reducedMotion &&
        !reducedData.matches &&
        !compactViewport.matches &&
        !connection.connection?.saveData,
      );
    };

    const listen = (query: MediaQueryList) => {
      if (typeof query.addEventListener === 'function') {
        query.addEventListener('change', update);
        return () => query.removeEventListener('change', update);
      }

      query.addListener(update);
      return () => query.removeListener(update);
    };

    update();
    const removeListeners = [reducedData, compactViewport].map(listen);
    return () => removeListeners.forEach((remove) => remove());
  }, [reducedMotion]);

  return allowed;
}

function useCompactFlowLayout() {
  const [compact, setCompact] = useState(() => (
    typeof window !== 'undefined' && window.matchMedia('(max-width: 639px)').matches
  ));

  useEffect(() => {
    const query = window.matchMedia('(max-width: 639px)');
    const update = () => setCompact(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return compact;
}

export default function HeroEvidenceStage() {
  const { content } = usePortfolioContent();
  const { profile, ui } = content;
  const reducedMotion = useReducedMotion();
  const compactFlowLayout = useCompactFlowLayout();
  const atmosphereAllowed = useAtmosphereAllowed(reducedMotion);
  const [sceneUnavailable, setSceneUnavailable] = useState(false);
  const [activeStage, setActiveStage] = useState(0);
  const [isInspecting, setIsInspecting] = useState(false);
  const stageRef = useRef<HTMLElement | null>(null);
  const stages = ui.hero.flowStages;
  const nodePositions = compactFlowLayout ? compactNodePositions : desktopNodePositions;
  const systemRoute = compactFlowLayout ? compactSystemRoute : desktopSystemRoute;
  const activePosition = nodePositions[activeStage];
  const activeContent = stages[activeStage];
  const markSceneUnavailable = useCallback(() => setSceneUnavailable(true), []);

  useEffect(() => {
    if (reducedMotion || isInspecting) return;
    const interval = window.setInterval(() => {
      setActiveStage((current) => (current + 1) % stages.length);
    }, 1550);
    return () => window.clearInterval(interval);
  }, [isInspecting, reducedMotion, stages.length]);

  const moveStage = (event: ReactPointerEvent<HTMLElement>) => {
    if (reducedMotion || event.pointerType === 'touch') return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    event.currentTarget.style.setProperty('--portrait-x', `${x * -5}px`);
    event.currentTarget.style.setProperty('--portrait-y', `${y * -4}px`);
    event.currentTarget.style.setProperty('--system-x', `${x * 7}px`);
    event.currentTarget.style.setProperty('--system-y', `${y * 5}px`);
  };

  const resetStage = () => {
    const stage = stageRef.current;
    stage?.style.setProperty('--portrait-x', '0px');
    stage?.style.setProperty('--portrait-y', '0px');
    stage?.style.setProperty('--system-x', '0px');
    stage?.style.setProperty('--system-y', '0px');
    setIsInspecting(false);
  };

  return (
    <section
      className="hero-evidence-stage"
      ref={stageRef}
      onPointerMove={moveStage}
      onPointerLeave={resetStage}
      aria-label={ui.hero.flowLabel}
    >
      <div className="hero-stage__atmosphere" aria-hidden="true">
        {atmosphereAllowed && !sceneUnavailable && (
          <SceneErrorBoundary onError={markSceneUnavailable}>
            <Suspense fallback={null}>
              <HeroTelemetryScene onUnavailable={markSceneUnavailable} />
            </Suspense>
          </SceneErrorBoundary>
        )}
      </div>

      <header className="hero-stage__header">
        <span>{ui.hero.systemKicker}</span>
        <p><i aria-hidden="true" /> {ui.hero.liveLabel}</p>
      </header>

      <figure className="evidence-portrait">
        <div className="evidence-portrait__frame">
          <img src={profile.image} alt={ui.hero.portraitAlt} width="1200" height="1600" decoding="async" fetchPriority="high" />
          <span className="evidence-portrait__scan" aria-hidden="true" />
          <span className="evidence-portrait__corner evidence-portrait__corner--top" aria-hidden="true" />
          <span className="evidence-portrait__corner evidence-portrait__corner--bottom" aria-hidden="true" />
        </div>
        <figcaption>
          <span>GFC / HUMAN IN THE LOOP</span>
          <strong>{profile.name}</strong>
          <small>{ui.hero.portraitMeta}</small>
        </figcaption>
      </figure>

      <div className="hero-system-map">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path className="system-route system-route--base" d={systemRoute} />
          <m.path
            className="system-route system-route--signal"
            d={systemRoute}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: reducedMotion ? 0 : 1.25, ease: [0.22, 1, 0.36, 1] }}
          />
          <m.circle
            className="system-route__pulse"
            animate={{ cx: activePosition[0], cy: activePosition[1] }}
            transition={{ duration: reducedMotion ? 0 : 0.68, ease: [0.22, 1, 0.36, 1] }}
            r="1.15"
          />
        </svg>

        <div className="system-nodes" role="group" aria-label={ui.hero.flowLabel}>
          {stages.map(([label, title, detail], index) => (
            <button
              type="button"
              className={`system-node ${activeStage === index ? 'system-node--active' : ''}`}
              style={{ left: `${nodePositions[index][0]}%`, top: `${nodePositions[index][1]}%` }}
              key={label}
              aria-label={`${label}: ${title}. ${detail}`}
              aria-pressed={activeStage === index}
              onFocus={() => {
                setActiveStage(index);
                setIsInspecting(true);
              }}
              onBlur={() => setIsInspecting(false)}
              onPointerEnter={() => {
                setActiveStage(index);
                setIsInspecting(true);
              }}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{label}</strong>
            </button>
          ))}
        </div>
      </div>

      <div className="hero-system-status">
        <div>
          <span>{ui.hero.stageLabel} · {String(activeStage + 1).padStart(2, '0')}</span>
          <strong>{activeContent[1]}</strong>
        </div>
        <p>{activeContent[2]}</p>
      </div>

      <footer className="hero-stage__footer">
        <strong>{ui.hero.systemTitle}</strong>
        <span>{ui.hero.systemLegend}</span>
        <small>{ui.hero.systemHint}</small>
      </footer>
    </section>
  );
}
