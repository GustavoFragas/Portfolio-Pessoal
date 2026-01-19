import { useEffect, useState, lazy, Suspense } from 'react';
import { profileApi } from './services/api';
import type { Profile } from './types';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import About from './components/About';

// Lazy loading para componentes abaixo da dobra
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const ExperienceSection = lazy(() => import('./components/Experience'));
const EducationSection = lazy(() => import('./components/Education'));
const Certificates = lazy(() => import('./components/Certificates'));
const Contact = lazy(() => import('./components/Contact'));

function App() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Garantir smooth scroll no documento
    document.documentElement.style.scrollBehavior = 'smooth';
    
    const fetchProfile = async () => {
      try {
        const response = await profileApi.getAll();
        if (response.data && response.data.length > 0) {
          setProfile(response.data[0]);
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Carregando portfólio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 lg:ml-64">
        <Hero profile={profile} />
        <About profile={profile} />
        <Suspense fallback={<div className="py-20 text-center text-gray-400">Carregando...</div>}>
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
