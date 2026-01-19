import { useState } from 'react';
import type { Profile } from '../types';

interface AboutProps {
  profile: Profile | null;
}

export default function About({ profile }: AboutProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  if (!profile) return null;

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 2000);
  };

  const languages = [
    { name: 'Português', level: 'Nativo', flag: '🇧🇷', detail: 'Língua materna' },
    { name: 'Espanhol', level: 'Fluente', flag: '🇪🇸', detail: 'Aprendido durante 2 anos na Argentina' },
    { name: 'Inglês', level: 'B2 - Avançado', flag: '🇺🇸', detail: 'Certificado LingoPass' },
  ];

  return (
    <section id="about" className="py-16 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center">
          Sobre <span className="text-gradient">Mim</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div>
            <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Sobre Mim</h3>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-3 md:mb-4">
              {profile.bio}
            </p>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-3 md:mb-4">
              Minha experiência internacional na Argentina e atuação 
              como líder voluntário me ensinou gestão de equipes e análise de métricas.
            </p>
            <div className="relative inline-block">
              <button
                onClick={copyEmail}
                className="font-mono text-sm md:text-base text-blue-400 hover:text-blue-300 transition-colors cursor-pointer break-all"
              >
                {profile.email}
              </button>
              {showTooltip && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-700 text-white px-3 py-1 rounded text-sm whitespace-nowrap">
                  Copiado
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 mt-6 md:mt-0">Idiomas</h3>
            <div className="space-y-3 md:space-y-4">
              {languages.map((lang) => (
                <div
                  key={lang.name}
                  className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-gray-800 rounded-lg hover:bg-gray-750 transition-all duration-300 cursor-pointer group border border-gray-700"
                >
                  <span className="text-3xl md:text-4xl">{lang.flag}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm md:text-base group-hover:text-blue-400 transition-colors">{lang.name}</h4>
                    <p className="text-xs md:text-sm text-gray-400">{lang.level}</p>
                    <p className="text-xs text-gray-500 mt-0.5 md:mt-1 group-hover:text-gray-400 transition-colors truncate">{lang.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
