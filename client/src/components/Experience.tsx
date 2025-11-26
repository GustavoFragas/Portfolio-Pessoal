import { useEffect, useState } from 'react';
import { experiencesApi } from '../services/api';
import type { Experience } from '../types';

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await experiencesApi.getAll();
        setExperiences(response.data);
      } catch (error) {
        console.error('Error fetching experiences:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });
  };

  if (loading) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">Carregando experiências...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-20 px-4 bg-gray-800/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">
          Experiência <span className="text-gradient">Profissional</span>
        </h2>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={exp.id} className="relative pl-20">
                <div className="absolute left-5 top-2 w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600" />
                {index < experiences.length - 1 && (
                  <div className="absolute left-7 top-10 w-0.5 h-full bg-gray-700" />
                )}
                
                <div className="bg-gray-800 rounded-lg p-6 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
                  <div className="flex flex-wrap justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{exp.role}</h3>
                    <span className="text-sm text-gray-400">
                      {formatDate(exp.startDate)} - {exp.isCurrent ? 'Presente' : formatDate(exp.endDate!)}
                    </span>
                  </div>
                  <h4 className="text-lg text-blue-400 mb-3">{exp.company}</h4>
                  <div className="text-gray-400 leading-relaxed space-y-2">
                    {exp.description.split('\n').map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>
                  {exp.isCurrent && (
                    <span className="inline-block mt-3 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                      Atual
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
