import { memo, useMemo } from 'react';
import { experiencesData } from '../data/portfolioData';
import type { Experience } from '../types';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });
};

function ExperienceSection() {
  // Dados estáticos - sem necessidade de fetch
  const experiences = experiencesData;

  return (
    <section id="experience" className="py-16 md:py-20 px-4 bg-gray-800/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center">
          Experiência <span className="text-gradient">Profissional</span>
        </h2>

        <div className="relative">
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600" />

          <div className="space-y-6 md:space-y-12">
            {experiences.map((exp, index) => (
              <div key={exp.id} className="relative pl-10 md:pl-20">
                <div className="absolute left-1.5 md:left-5 top-2 w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600" />
                {index < experiences.length - 1 && (
                  <div className="absolute left-3.5 md:left-7 top-10 w-0.5 h-full bg-gray-700" />
                )}
                
                <div className="bg-gray-800 rounded-lg p-4 md:p-6 border border-gray-700 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-1">
                    <h3 className="text-base md:text-xl font-bold">{exp.role}</h3>
                    <span className="text-xs md:text-sm text-gray-400">
                      {formatDate(exp.startDate)} - {exp.isCurrent ? 'Presente' : formatDate(exp.endDate!)}
                    </span>
                  </div>
                  <h4 className="text-sm md:text-lg text-blue-400 mb-2 md:mb-3">{exp.company}</h4>
                  <div className="text-xs md:text-base text-gray-400 leading-relaxed space-y-1 md:space-y-2">
                    {exp.description.split('\n').map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>
                  {exp.isCurrent && (
                    <span className="inline-block mt-2 md:mt-3 px-2 md:px-3 py-0.5 md:py-1 bg-green-500/20 text-green-400 rounded-full text-xs md:text-sm">
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

export default memo(ExperienceSection);
