import React from 'react';
import { Link } from 'react-router-dom';
import ParallaxImage from './ParallaxImage';
import { Project } from '../types';
import { ArrowRightIcon } from './icons';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Link to={`/project/${project.id}`} className="block group relative h-96 md:h-[500px] w-full overflow-hidden rounded-3xl shadow-lg transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-accent-gold/20 hover:-translate-y-2">
      <div className="absolute inset-0">
        <ParallaxImage src={project.image} alt={project.title} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
        <p className="text-sm font-semibold text-accent-gold uppercase tracking-wider">{project.category}</p>
        <h3 className="text-3xl font-bold font-display mt-2 flex items-center gap-3">
          {project.title}
          <ArrowRightIcon className="w-6 h-6 transition-transform duration-300 ease-out transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
        </h3>
      </div>
    </Link>
  );
};

export default ProjectCard;