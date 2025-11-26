import { useEffect, useState } from 'react';
import { profileApi } from './services/api';
import type { Profile } from './types';
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
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        setError('Erro ao carregar dados. Verifique se o backend está rodando.');
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

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">Erro de Conexão</h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <p className="text-sm text-gray-500">
            Certifique-se de que o backend está rodando em http://localhost:5167
          </p>
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
        <Skills />
        <Projects />
        <ExperienceSection />
        <EducationSection />
        <Certificates />
        <Contact profile={profile} />
        
        <footer className="py-8 text-center text-gray-400 border-t border-gray-800">
          <p>© 2025 Gustavo Fragas Cunha. Todos os direitos reservados.</p>
          <p className="text-sm mt-2">Desenvolvido com .NET 9 + React + TypeScript</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
