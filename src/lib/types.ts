import { User } from "@/database/schema/users";

export interface IProject {
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
  tasks: Task[]
  files: File[]
  risks: Risk[]
  activities: Activity[]
  budget: {
    total: number
    spent: number
  }
  settings: {
    isPublic: boolean
    allowGuestComments: boolean
    requireApprovalForTasks: boolean
  }
  comments : Comments[]
}
export interface UserWithRole extends Omit<User , "password"> {
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
export interface Comments {
  id: string
  text: string
  author: UserWithRole
  createdAt?: Date,
  updatedAt?: Date
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
  createdAt?: Date,
  updatedAt?: Date
}