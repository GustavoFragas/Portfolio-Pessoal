import { m, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { useRef, type ReactNode } from 'react';

type RevealDirection = 'left' | 'right' | 'up';

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  direction?: RevealDirection;
};

const presenceStops = [0, 1 / 3, 2 / 3, 1];
const opacityStops = [0, 1 / 6, 1 / 3, 2 / 3, 5 / 6, 1];

const horizontalPresence: Record<RevealDirection, string[]> = {
  left: ['-18vw', '0vw', '0vw', '-4vw'],
  right: ['18vw', '0vw', '0vw', '4vw'],
  up: ['0vw', '0vw', '0vw', '0vw'],
};

const verticalPresence: Record<RevealDirection, string[]> = {
  left: ['24px', '0px', '0px', '-24px'],
  right: ['24px', '0px', '0px', '-24px'],
  up: ['64px', '0px', '0px', '-32px'],
};

export default function ScrollReveal({ children, className, direction = 'up' }: ScrollRevealProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start 92%', 'start 58%', 'end 42%', 'end 8%'],
    trackContentSize: true,
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 34,
    mass: 1,
    restDelta: 0.0008,
    restSpeed: 0.01,
  });

  const opacity = useTransform(smoothProgress, opacityStops, [0, 0.14, 1, 1, 0.14, 0]);
  const x = useTransform(smoothProgress, presenceStops, horizontalPresence[direction]);
  const y = useTransform(smoothProgress, presenceStops, verticalPresence[direction]);
  const scale = useTransform(smoothProgress, presenceStops, [0.985, 1, 1, 0.992]);

  return (
    <m.div
      ref={targetRef}
      className={className}
      data-reveal-direction={direction}
      data-scroll-presence="spring-linked"
      style={{
        opacity: reducedMotion ? 1 : opacity,
        x: reducedMotion ? '0vw' : x,
        y: reducedMotion ? '0px' : y,
        scale: reducedMotion ? 1 : scale,
      }}
    >
      {children}
    </m.div>
  );
}
