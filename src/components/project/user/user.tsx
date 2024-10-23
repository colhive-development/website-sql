"use client"
import React from 'react';
import { IProjectAdmin, Task, UserWithRole, Activity, File, Comment, IProjectUser } from '@/lib/types';
import MyTasks from './tasks';
import ProjectTimeline from './timeline';
import TeamMembers from './members';
import FileViewer from './files';
import ActivityFeed from './activity';
import CommentSection from './comment';
import ProjectHeader from './header';

export default function UserProjectPage({ projectId }: { projectId: string }) {
  // Mock data for the user view
  const project: IProjectUser= {
    id: projectId,
    name: "Project Alpha",
    description: "A groundbreaking project that will revolutionize the industry.",
    image: "/placeholder.svg?height=100&width=100",
    members: [
      { id: "1", name: "John Doe", email: "john@example.com", image: "/placeholder.svg", role: 'admin', emailVerified: false, companyId: "1" },
      { id: "2", name: "Jane Smith", email: "jane@example.com", image: "/placeholder.svg", role: 'member', emailVerified: false, companyId: "1" },
    ],
    created_at: new Date("2023-01-01"),
    admin: { id: "1", name: "John Doe", email: "john@example.com", image: "/placeholder.svg", role: 'admin', emailVerified: false, companyId: "1" },
    deadline: new Date("2023-12-31"),
    completed: false,
    completed_at : null,
    tasks: [
      { id: "1", title: "Design UI", description: "Create wireframes and mockups", assignedTo: "1", status: "inProgress", dueDate: new Date("2023-07-15") },
      { id: "2", title: "Implement backend", description: "Set up database and API", assignedTo: "2", status: "todo", dueDate: new Date("2023-08-01") },
      { id: "3", title: "Write documentation", description: "Prepare user guide and API docs", assignedTo: null, status: "todo", dueDate: new Date("2023-08-15") },
    ],
    files: [
      { id: "1", name: "Project_Proposal.pdf", url: "#", uploadedBy: "1", uploadedAt: new Date("2023-01-05") },
      { id: "2", name: "UI_Mockups.fig", url: "#", uploadedBy: "2", uploadedAt: new Date("2023-06-10") },
    ],
    activities: [
      { id: "1", user: "John Doe", action: "created the project", timestamp: new Date("2023-01-01") },
      { id: "2", user: "Jane Smith", action: "uploaded UI_Mockups.fig", timestamp: new Date("2023-06-10") },
    ],
    comments: [
      { id: "1", text: "Looks good, let's proceed!", author: { id: "1", name: "John Doe", email: "john@example.com", image: "/placeholder.svg", role: 'admin', emailVerified: false, companyId: "1" }, createdAt: new Date("2024-09-19"), updatedAt: new Date("2023-01-01") },
      { id: "2", text: "I have some concerns about the budget.", author: { id: "1", name: "John Doe", email: "john@example.com", image: "/placeholder.svg", role: 'admin', emailVerified: false, companyId: "1" }, createdAt: new Date("2024-09-19"), updatedAt: new Date("2023-01-15") }
    ]
  }

  // Assume the current user is Jane Smith
  const currentUser: UserWithRole = {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    image: "/placeholder.svg",
    role: 'member',
    emailVerified: false,
    companyId: "1"
  }

  const myTasks = project.tasks.filter(task => task.assignedTo === currentUser.id);

  return (
    <div className="space-y-6 container lg:py-10 md:py-6 sm:py-4 py-2">
      <ProjectHeader
        name={project.name}
        description={project.description}
        image={project.image}
        adminName={project.admin.name}
        createdAt={project.created_at}
        deadline={project.deadline}
        completed={project.completed}
        completedAt={project.completed_at}
      />
      <div className='flex flex-wrap gap-10 md:flex-nowrap'>
        <div className='w-full md:w-1/2'>
          <MyTasks tasks={myTasks} />
        </div>
        <div className='w-full md:w-1/2'>
          <ProjectTimeline tasks={project.tasks} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TeamMembers members={project.members} />
        <FileViewer files={project.files} />
      </div>
      <ActivityFeed activities={project.activities} />
      <CommentSection comments={project.comments} currentUser={currentUser} />
    </div>
  );
}
