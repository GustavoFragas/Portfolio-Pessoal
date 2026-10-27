import { useLayoutEffect, useRef } from 'react';
import { usePortfolioContent } from '../LocaleContext';
import ChannelIcon from './ChannelIcon';
import { createPixelWall, type CalmRect } from './pixelWall/engine';
import { useReducedMotion } from './pixelWall/useReducedMotion';

export default function Contact() {
  const { content } = usePortfolioContent();
  const { profile, ui } = content;
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // The wall comes back as the closing bookend: same tiles, no photo.
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    const wall = createPixelWall(canvas, { mode: 'wall', motion: !reduced });
    if (!wall) {
      section.dataset.wall = 'off';
      return;
    }
    section.dataset.wall = 'on';

    let raf = 0;
    const relayout = () => {
      raf = 0;
      const base = canvas.getBoundingClientRect();
      const calm: CalmRect[] = [];
      section.querySelectorAll<HTMLElement>('[data-calm]').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width > 0) {
          calm.push({ x: r.left - base.left, y: r.top - base.top, w: r.width, h: r.height, level: el.dataset.calm === '1' ? 1 : 2 });
        }
      });
      wall.setLayout({ width: base.width, height: base.height, tile: base.width < 760 ? 9 : 12, calm, early: [] });
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(relayout);
    };
    relayout();

    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(section);
    section.querySelectorAll('[data-calm]').forEach((el) => resizeObserver.observe(el));
    let visible = false;
    const syncActive = () => wall.setActive(visible && !document.hidden);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncActive();
    });
    intersection.observe(section);
    document.addEventListener('visibilitychange', syncActive);
    document.fonts?.ready.then(schedule);

    return () => {
      cancelAnimationFrame(raf);
      wall.destroy();
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener('visibilitychange', syncActive);
    };
  }, [reduced]);

  const channels = [
    { key: 'email', label: ui.contact.email, value: profile.email, href: `mailto:${profile.email}`, external: false },
    { key: 'whatsapp', label: ui.contact.whatsapp, value: profile.phoneDisplay, href: profile.phoneLink, external: true },
    { key: 'linkedin', label: ui.contact.linkedin, value: profile.linkedInDisplay, href: profile.linkedIn, external: true },
    { key: 'github', label: ui.contact.github, value: profile.gitHubDisplay, href: profile.gitHub, external: true },
  ] as const;

  return (
    <section id="contato" className="contact on-wall" ref={sectionRef} aria-labelledby="contact-title">
      <canvas className="contact__canvas" ref={canvasRef} aria-hidden="true" />
      <div className="contact__inner">
        <div className="contact__copy">
          <p className="kicker kicker--wall" data-calm="2">{ui.contact.kicker}</p>
          <h2 id="contact-title" data-calm="1">{ui.contact.title}</h2>
          <p className="contact__lead" data-calm="2">{ui.contact.description}</p>
        </div>
        <ul className="contact__channels">
          {channels.map((channel) => (
            <li key={channel.key} data-calm="2">
              <a
                href={channel.href}
                {...(channel.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <span className="contact__label">
                  <ChannelIcon channel={channel.key} /> {channel.label}
                </span>
                <span className="contact__value">{channel.value}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
