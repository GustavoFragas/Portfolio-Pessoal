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

function App() {
  const currentYear = new Date().getFullYear();
  const { content } = usePortfolioContent();
  const { profile, ui } = content;

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
      <footer className="site-footer on-wall">
        <p>© {currentYear} {profile.name}. {ui.footer.disclaimer} {ui.footer.builtWith}</p>
        <a className="text-link" href="#home">{ui.footer.backToTop}</a>
      </footer>
    </div>
  );
}

export default App;
