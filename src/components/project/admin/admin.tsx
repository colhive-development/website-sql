import ProjectHeader from './header';
import ProjectMembers from './members';
import RecentActivity from './activities';
import TaskManager from './tasks';
import AddTaskModal from './addtask';
import Budget from './budget';
import RiskManager from './risk';
import FileManager from './files';
import CommentsSection from './commentbox';
import { Activity, IProjectAdmin, Task, UserWithRole, Risk, File, Comment } from '@/lib/types';
import { CommentsArea } from './comments';

export default function AdminProjectPage({ projectId }: { projectId: string }) {
  const project: IProjectAdmin = {
    id: projectId,
    name: "Project Alpha",
    description: "A groundbreaking project that will revolutionize the industry.",
    image: "/placeholder.svg?height=100&width=100",
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
      { id: "1", text: "Looks good, let's proceed!", author: { id: "1", name: "John Doe", email: "john@example.com", image: "/placeholder.svg", role: 'admin', emailVerified: false, companyId: "1" }, createdAt: new Date("2024-09-19"), updatedAt: new Date("2023-01-01") },
      { id: "2", text: "I have some concerns about the budget.", author: { id: "1", name: "John Doe", email: "john@example.com", image: "/placeholder.svg", role: 'admin', emailVerified: false, companyId: "1" }, createdAt: new Date("2024-09-19"), updatedAt: new Date("2023-01-15") }
    ]
  }
  const { tasks, activities, members, files, risks, comments } = project;

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
      <ProjectMembers members={members}/>
      <div className='flex flex-wrap gap-10 md:flex-nowrap'>
        <div className='w-full md:w-1/2'>
          <RecentActivity activities={activities} />
        </div>
        <div className='w-full md:w-1/2'>
          <CommentsArea comments={comments}/>
        </div>
      </div>
      <TaskManager tasks={tasks}  />
      <AddTaskModal  />
      <Budget
        budget={project.budget.total}
        expenses={project.budget.spent}
      />
      <div className='flex flex-wrap gap-10 md:flex-nowrap'>
        <div className='w-full md:w-1/2'>
          <RiskManager
            risks={risks}
          />
        </div>
        <div className='w-full md:w-1/2'>
          <FileManager
            files={files}
          />
        </div>
      </div>
      <CommentsSection/>
    </div>
  );
}
