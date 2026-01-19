import { useEffect, useState } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import type { Education } from '../types';
import { educationApi } from '../services/api';

export default function EducationSection() {
  const [educations, setEducations] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEducations = async () => {
      try {
        const response = await educationApi.getAll();
        // Ordenar: BYU primeiro, depois os em andamento, depois os concluídos por data
        const sorted = response.data.sort((a, b) => {
          // BYU sempre primeiro
          if (a.institution.includes('BYU')) return -1;
          if (b.institution.includes('BYU')) return 1;
          
          // Depois por status (em andamento primeiro)
          if (a.isCurrent && !b.isCurrent) return -1;
          if (!a.isCurrent && b.isCurrent) return 1;
          
          // Depois por data de início (mais recente primeiro)
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        });
        setEducations(sorted);
      } catch (error) {
        console.error('Error fetching educations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEducations();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });
  };

  if (loading) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">Carregando educação...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="education" className="py-16 md:py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center">
          Educação & <span className="text-gradient">Estudos</span>
        </h2>

        <div className="relative">
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 to-blue-600" />

          <div className="space-y-6 md:space-y-12">
            {educations.map((edu) => (
              <div key={edu.id} className="relative pl-10 md:pl-20 group">
                <div className={`absolute left-1.5 md:left-5 top-2 w-5 h-5 md:w-6 md:h-6 rounded-full ${
                  edu.isCurrent 
                    ? 'bg-gradient-to-r from-green-500 to-blue-600 animate-pulse' 
                    : 'bg-gray-600'
                }`} />
                
                <div className="bg-gray-800 rounded-lg p-4 md:p-6 border border-gray-700 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-1">
                    <div>
                      <h3 className="text-base md:text-xl font-bold group-hover:text-green-400 transition-colors">
                        {edu.field}
                      </h3>
                      <h4 className="text-sm md:text-lg text-blue-400">{edu.institution}</h4>
                      <p className="text-xs md:text-sm text-gray-500">{edu.degree}</p>
                    </div>
                    <span className="text-xs md:text-sm text-gray-400 mt-1 md:mt-0">
                      {formatDate(edu.startDate)} - {edu.isCurrent ? 'Presente' : formatDate(edu.endDate!)}
                    </span>
                  </div>
                  <p className="text-xs md:text-base text-gray-400 leading-relaxed mb-3">{edu.description}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    {edu.isCurrent && (
                      <span className="inline-block px-2 md:px-3 py-0.5 md:py-1 bg-green-500/20 text-green-400 rounded-full text-xs md:text-sm">
                        Em Andamento
                      </span>
                    )}
                    <a
                      href={edu.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 md:gap-2 text-purple-400 hover:text-purple-300 transition-colors text-xs md:text-sm"
                    >
                      <FaExternalLinkAlt /> Visitar Site
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
