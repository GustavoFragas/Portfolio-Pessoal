import { LazyMotion, domAnimation } from 'motion/react';
import { usePortfolioContent } from './LocaleContext';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ExperienceSection from './components/Experience';
import EducationSection from './components/Education';
import Certificates from './components/Certificates';
import Contact from './components/Contact';

function App() {
  const currentYear = new Date().getFullYear();
  const { content } = usePortfolioContent();
  const { profile, ui } = content;

  return (
    <LazyMotion features={domAnimation}>
      <div className="site-shell">
        <a className="skip-link" href="#main-content">{ui.skipLink}</a>
        <Sidebar />
        <main id="main-content">
          <Hero />
          <About />
          <Projects />
          <Skills />
          <ExperienceSection />
          <EducationSection />
          <Certificates />
          <Contact />
          <footer className="site-footer">
            <p>© {currentYear} {profile.name}. {ui.footer.disclaimer}</p>
            <p>{ui.footer.builtWith}</p>
          </footer>
        </main>
      </div>
    </LazyMotion>
  );
}

export default App;
