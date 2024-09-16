import React from 'react';
import { IProject } from "@/lib/types";
import ProjectCard from '@/components/projectCard';
import { Button } from '@/components/ui/button';
import { AddNewProjectButton } from '@/components/newProject';


export default function Page() {
  const projects: IProject[] = [{
    id: "1",
    name: "Project Alpha",
    description: "A groundbreaking project that will revolutionize the industry.",
    image: "https://picsum.photos/seed/project1/800/600",
    members: [
      { id: "1", name: "John Doe", email: "john@example.com", image: "/placeholder.svg", role: 'admin', emailVerified: false, companyId: "1" },
      { id: "2", name: "Jane Smith", email: "jane@example.com", image: "/placeholder.svg", role: 'member', emailVerified: false, companyId: "1" },
    ],
    created_at: new Date("2023-01-01"),
    updated_at: new Date("2023-06-15"),
    admin: { id: "1", name: "John Doe", email: "john@example.com", image: "/placeholder.svg", role: 'admin', emailVerified: false, companyId: "1" },
    deadline: new Date("2023-12-31"),
    completed: false,
    completed_at: null,
    tasks: [
      { id: "1", title: "Design UI", description: "Create wireframes and mockups", assignedTo: "1", status: "inProgress", dueDate: new Date("2023-07-15") },
      { id: "2", title: "Implement backend", description: "Set up database and API", assignedTo: "2", status: "todo", dueDate: new Date("2023-08-01") },
      { id: "3", title: "Write documentation", description: "Prepare user guide and API docs", assignedTo: null, status: "todo", dueDate: new Date("2023-08-15") },
    ],
    files: [
      { id: "1", name: "Project_Proposal.pdf", url: "#", uploadedBy: "1", uploadedAt: new Date("2023-01-05") },
      { id: "2", name: "UI_Mockups.fig", url: "#", uploadedBy: "2", uploadedAt: new Date("2023-06-10") },
    ],
    risks: [
      { id: "1", description: "Budget overrun", severity: "high", mitigationPlan: "Weekly budget reviews" },
      { id: "2", description: "Missed deadline", severity: "medium", mitigationPlan: "Bi-weekly progress checks" },
    ],
    activities: [
      { id: "1", user: "John Doe", action: "created the project", timestamp: new Date("2023-01-01") },
      { id: "2", user: "Jane Smith", action: "uploaded UI_Mockups.fig", timestamp: new Date("2023-06-10") },
    ],
    budget: {
      total: 100000,
      spent: 35000,
    },
    settings: {
      isPublic: false,
      allowGuestComments: false,
      requireApprovalForTasks: true,
    },
    comments: [
      { id: "1", text: "Looks good, let's proceed!", author: { id: "1", name: "John Doe", email: "john@example.com", image: "/placeholder.svg", role: 'admin', emailVerified: false, companyId: "1" } }
    ]
  }]

  return (
    <main className="container px-4 py-8 min-h-screen w-full">
      <section className="mb-8 space-y-4">
        <div className='flex justify-between items-center'>
          <h1 className="text-4xl font-semibold mb-41">Projects</h1>
          <AddNewProjectButton/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </main>
  );
}