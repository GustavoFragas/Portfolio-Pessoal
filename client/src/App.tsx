import { useEffect, lazy, Suspense, memo } from 'react';
import { profileData } from './data/portfolioData';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import About from './components/About';

// Lazy loading para componentes abaixo da dobra com preload
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const ExperienceSection = lazy(() => import('./components/Experience'));
const EducationSection = lazy(() => import('./components/Education'));
const Certificates = lazy(() => import('./components/Certificates'));
const Contact = lazy(() => import('./components/Contact'));

// Loading component memoizado
const LoadingFallback = memo(() => (
  <div className="py-20 text-center text-gray-400">
    <div className="animate-pulse">Carregando...</div>
  </div>
));
LoadingFallback.displayName = 'LoadingFallback';

function App() {
  // Dados estáticos - sem necessidade de fetch
  const profile = profileData;

  useEffect(() => {
    // Garantir smooth scroll no documento
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 lg:ml-64">
        <Hero profile={profile} />
        <About profile={profile} />
        <Suspense fallback={<LoadingFallback />}>
          <Skills />
          <Projects />
          <ExperienceSection />
          <EducationSection />
          <Certificates />
          <Contact profile={profile} />
        </Suspense>
        
        <footer className="py-6 md:py-8 text-center text-gray-400 border-t border-gray-800 px-4">
          <p className="text-sm md:text-base">© 2025 Gustavo Fragas Cunha. Todos os direitos reservados.</p>
          <p className="text-xs md:text-sm mt-2">Desenvolvido com React + TypeScript + TailwindCSS</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
