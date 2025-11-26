import { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { skillsApi } from '../services/api';
import type { Skill } from '../types';

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await skillsApi.getAll();
        setSkills(response.data);
      } catch (error) {
        console.error('Error fetching skills:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const categories = ['Backend', 'Frontend', 'Database', 'Tools', 'Soft Skills', 'Languages'];

  const getSkillsByCategory = (category: string) => {
    return skills.filter((skill) => skill.category === category);
  };

  const nextSlide = () => {
    if (currentIndex < categories.length - 3) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  if (loading) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">Carregando habilidades...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-20 px-4 bg-gray-800/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">
          Minhas <span className="text-gradient">Habilidades</span>
        </h2>

        <div className="relative">
          {/* Navigation Buttons */}
          {categories.length > 3 && (
            <>
              <button
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={nextSlide}
                disabled={currentIndex >= categories.length - 3}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next"
              >
                <FaChevronRight />
              </button>
            </>
          )}

          {/* Skills Horizontal Scroll */}
          <div className="overflow-hidden">
            <div
              className="flex gap-8 transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}
            >
              {categories.map((category) => {
                const categorySkills = getSkillsByCategory(category);
                if (categorySkills.length === 0) return null;

                return (
                  <div
                    key={category}
                    className="min-w-[calc(33.33%-1.5rem)] bg-gray-800 rounded-lg p-6 hover:scale-105 hover:bg-gray-750 transition-all duration-300 cursor-pointer"
                  >
                    <h3 className="text-xl font-semibold mb-4 text-blue-400">
                      {category}
                    </h3>
                    <div className="space-y-3">
                      {categorySkills.map((skill) => (
                        <div key={skill.id} className="group">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium group-hover:text-blue-400 transition-colors">
                              {skill.name}
                            </span>
                            <span className="text-sm text-gray-400">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500 group-hover:animate-pulse"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
