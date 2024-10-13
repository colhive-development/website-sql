import { Individuals } from "@/database/schema/users";

export interface IProjectAdmin {
  id: string
  name: string
  description: string
  image: string
  members: UserWithRole[]
  created_at: Date
  updated_at: Date
  admin: UserWithRole
  deadline: Date
  completed: boolean
  completed_at: Date | null
  tasks: Task[] | []
  files: File[] | []
  activities: Activity[] | []
  comments : Comment[] | []
  risks: Risk[] | []
  budget: {
    total: number
    spent: number
  }
  settings?: {
    isPublic: boolean
    allowGuestComments: boolean
    requireApprovalForTasks: boolean
  }
}
export interface IProjectUser extends Omit<IProjectAdmin, "risks" | "budget" | "settings" | "updated_at"> {}
export interface UserWithRole extends Omit<Individuals , "password"> {
  role: 'admin' | 'member'
}

export interface Task {
  id: string
  title: string
  description: string
  assignedTo: string | null
  status: 'todo' | 'inProgress' | 'done'
  dueDate: Date
}

export interface File {
  id: string
  name: string
  url: string
  uploadedBy: string
  uploadedAt: Date
}
export interface Risk {
  id: string
  description: string
  severity: 'low' | 'medium' | 'high'
  mitigationPlan: string
}

export interface Activity {
  id: string
  user: string
  action: string
  timestamp: Date
}
export interface Comment {
  id: string
  text: string
  author: UserWithRole
  createdAt?: Date | null,
  updatedAt?: Date | null
}