import { useEffect } from 'react';
import { usePortfolioContent } from './LocaleContext';
import Topbar from './components/Topbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import ExperienceSection from './components/Experience';
import Skills from './components/Skills';
import EducationSection from './components/Education';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import TileRule from './components/TileRule';
import RetroFooter from './components/RetroFooter';
import './styles/anchors.css';

/** The sections after Projetos skip their rendering until they come near the viewport (anchors.css),
    with an estimated height until then. Renders them for good, once, with a layout right away, so the
    jump that follows is computed on the real page. */
function renderSkippedSections(): boolean {
  const root = document.documentElement;
  if (root.classList.contains('cv-off')) return false;
  root.classList.add('cv-off');
  document.body.getBoundingClientRect();
  return true;
}

/** Contato's stop (anchors.css): the end of the page, so the contact, the footer's "Navegar" and "▲ START"
    show together, unless the end leaves the title less than ~16 px under the top bar (or under it,
    e.g. 1024×600 and phones); then the title stops ~24 px under the bar. Measured on the real layout
    right before each jump, so it holds for every width, locale and font. */
const CONTACT_MIN_GAP = 16;
const CONTACT_GAP = 24;

function fitContactStop() {
  const root = document.documentElement;
  const contact = document.getElementById('contato');
  const title = document.getElementById('contact-title');
  const bar = document.querySelector('.topbar__inner') ?? document.querySelector('.topbar');
  if (!contact || !title || !bar) return;
  const barBottom = bar.getBoundingClientRect().bottom;
  const titleTop = title.getBoundingClientRect().top + window.scrollY;
  const endGap = titleTop - (root.scrollHeight - window.innerHeight) - barBottom;
  if (endGap >= CONTACT_MIN_GAP) {
    root.style.removeProperty('--contact-stop');
    return;
  }
  // scrollIntoView lands at contact top − scroll-padding-top − scroll-margin-top; solve for the margin.
  const contactTop = contact.getBoundingClientRect().top + window.scrollY;
  const padding = parseFloat(getComputedStyle(root).scrollPaddingTop) || 0;
  root.style.setProperty('--contact-stop', `${Math.round(contactTop - padding - (titleTop - barBottom - CONTACT_GAP))}px`);
}

const hashTarget = () => (window.location.hash ? document.getElementById(decodeURIComponent(window.location.hash.slice(1))) : null);

function App() {
  const { content } = usePortfolioContent();
  const { ui } = content;

  // A shared link with a #section opens before React has drawn the page, so the browser's own jump
  // finds nothing: go there once the content exists. A reload or back/forward restores the old scroll
  // position, which needs the real layout too.
  useEffect(() => {
    const target = hashTarget();
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    if (target || navigation?.type === 'reload' || navigation?.type === 'back_forward') renderSkippedSections();
    if (target) {
      requestAnimationFrame(() => {
        if (target.id === 'contato') fitContactStop();
        target.scrollIntoView({ behavior: 'instant', block: 'start' });
      });
    }
  }, []);

  // Every jump inside the page lands on the real layout: before a #link's own scroll (capture phase,
  // ahead of the default action), before Tab moves the focus or End goes to the bottom, and when the
  // #hash changes some other way (typed in the address bar), going to the target again once rendered.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a[href^="#"]');
      if (!link) return;
      renderSkippedSections();
      if (link.getAttribute('href') === '#contato') fitContactStop();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab' || event.key === 'End') renderSkippedSections();
    };
    const onHashChange = () => {
      if (!renderSkippedSections()) return;
      const target = hashTarget();
      if (target?.id === 'contato') fitContactStop();
      target?.scrollIntoView({ behavior: 'instant', block: 'start' });
    };
    document.addEventListener('click', onClick, true);
    window.addEventListener('keydown', onKeyDown, true);
    window.addEventListener('hashchange', onHashChange);
    return () => {
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('keydown', onKeyDown, true);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);

  return (
    <div className="site">
      <a className="skip-link" href="#main-content">{ui.skipLink}</a>
      <Topbar />
      <main id="main-content">
        <Hero />
        <TileRule seed={3} />
        <Projects />
        <TileRule seed={5} />
        <ExperienceSection />
        <TileRule seed={8} />
        <Skills />
        <TileRule seed={13} />
        <EducationSection />
        <TileRule seed={21} />
        <Certificates />
        <Contact />
      </main>
      <RetroFooter />
    </div>
  );
}

export default App;
