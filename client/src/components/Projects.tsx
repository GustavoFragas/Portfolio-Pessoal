import { memo } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { projectsData } from '../data/portfolioData';
import type { Project } from '../types';

// Card de projeto memoizado
const ProjectCard = memo(({ project }: { project: Project }) => (
  <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 transition-all duration-300">
    <div className="h-32 md:h-48 bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
      <div className="text-4xl md:text-6xl">💻</div>
    </div>
    <div className="p-4 md:p-6">
      <h3 className="text-lg md:text-2xl font-bold mb-2">{project.title}</h3>
      <p className="text-xs md:text-base text-gray-400 mb-3 md:mb-4">{project.description}</p>
      
      <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
        {project.techStack.split(',').map((tech, index) => (
          <span
            key={index}
            className="px-2 md:px-3 py-0.5 md:py-1 bg-gray-700 rounded-full text-xs md:text-sm"
          >
            {tech.trim()}
          </span>
        ))}
      </div>

      <div className="flex gap-3 md:gap-4 text-sm md:text-base">
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 md:gap-2 text-blue-400 hover:text-blue-300 transition-colors"
        >
          <FaGithub /> Repositório
        </a>
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 md:gap-2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            <FaExternalLinkAlt /> Demo
          </a>
        )}
      </div>
    </div>
  </div>
));
ProjectCard.displayName = 'ProjectCard';

function Projects() {
  // Dados estáticos - sem necessidade de fetch
  const projects = projectsData;

  return (
    <section id="projects" className="py-16 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center">
          Meus <span className="text-gradient">Projetos</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(Projects);
