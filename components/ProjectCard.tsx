import React from 'react';
import type { Project } from '../types';
import { ProgressBar } from './ProgressBar';

interface ProjectCardProps {
  project: Project;
  onDonateClick: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onDonateClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform transform hover:-translate-y-1">
      <img className="w-full h-48 object-cover" src={project.imageUrl} alt={project.title} />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
        <p className="text-gray-600 text-base flex-grow mb-4">{project.description}</p>
        <div className="mt-auto">
          <ProgressBar current={project.currentAmount} goal={project.goal} />
          <button
            onClick={onDonateClick}
            className="w-full mt-6 bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            تبرع الآن
          </button>
        </div>
      </div>
    </div>
  );
};