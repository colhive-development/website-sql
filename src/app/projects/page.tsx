"use client" //client side for now for testing , change later to server side and rmeove state aand fetch projects and pass
import React from 'react';
import { IProjectAdmin } from "@/lib/types";
import ProjectCard from '@/components/projectCard';
import { AddNewProjectButton } from '@/components/newProject';
import { useRecoilValue } from 'recoil';
import { ProjectsState } from '@/lib/atoms';

export default function Projects() {
  const projects = useRecoilValue(ProjectsState)

  return (
    <main className="container px-4 py-8 min-h-screen w-full">
      <section className="mb-8 space-y-4">
        <div className='flex justify-between items-center'>
          <h1 className="text-4xl font-semibold mb-41">Projects</h1>
          <AddNewProjectButton/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project as IProjectAdmin} />
          ))}
        </div>
      </section>
    </main>
  );
}