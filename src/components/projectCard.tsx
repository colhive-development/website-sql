"use client"
import { IProject } from '@/lib/types';
import { CalendarIcon, CheckCircleIcon, ClockIcon , GroupIcon } from 'lucide-react';

const ProjectCard: React.FC<{ project: IProject }> = ({ project }) => {
    const formatDate = (date: Date) => {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    };
  
    return (
      <div 
        className="bg-background max-w-96 h-fit rounded-lg overflow-hidden border border-foreground transition-all duration-300 hover:scale-105 hover:cursor-pointer"
        key={project.id}
        onClick={() => window.location.href = `/projects/${project.id}`}
      >
        <img src={project.image} alt={project.name} className="w-full h-48 object-cover" />
        <div className="p-4 text-foreground/70">
          <h2 className="text-xl font-semibold mb-2 text-foreground">{project.name}</h2>
          <p className=" mb-4 text-sm">{project.description}</p>
          <div className="flex items-center mb-2">
            <GroupIcon className="w-5 h-5 mr-2 text-gray-500" />
            <span className="text-sm ">{project.members.length} members</span>
          </div>
          <div className="flex items-center mb-2">
            <CalendarIcon className="w-5 h-5 mr-2 text-gray-500" />
            <span className="text-sm ">Deadline: {formatDate(project.deadline)}</span>
          </div>
          <div className="flex items-center">
            {project.completed ? (
              <CheckCircleIcon className="w-5 h-5 mr-2 text-green-500" />
            ) : (
              <ClockIcon className="w-5 h-5 mr-2 text-yellow-500" />
            )}
            {project.completed_at && <span className="text-sm ">
              {project.completed ? `Completed on ${formatDate(project.completed_at)}` : 'In Progress'}
            </span>}
          </div>
        </div>
      </div>
    );
}

export default ProjectCard