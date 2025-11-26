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
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">
          Sobre <span className="text-gradient">Mim</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Sobre Mim</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              {profile.bio}
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              Minha experiência internacional na Argentina e atuação 
              como líder voluntário me ensinou gestão de equipes e análise de métricas.
            </p>
            <div className="relative inline-block">
              <button
                onClick={copyEmail}
                className="font-mono text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
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
            <h3 className="text-2xl font-semibold mb-4">Idiomas</h3>
            <div className="space-y-4">
              {languages.map((lang) => (
                <div
                  key={lang.name}
                  className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg hover:scale-105 hover:bg-gray-750 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer group"
                >
                  <span className="text-4xl group-hover:scale-110 transition-transform">{lang.flag}</span>
                  <div className="flex-1">
                    <h4 className="font-semibold group-hover:text-blue-400 transition-colors">{lang.name}</h4>
                    <p className="text-sm text-gray-400">{lang.level}</p>
                    <p className="text-xs text-gray-500 mt-1 group-hover:text-gray-400 transition-colors">{lang.detail}</p>
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
