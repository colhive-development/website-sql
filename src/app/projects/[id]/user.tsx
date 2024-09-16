"use client"
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { CalendarIcon, CheckCircleIcon, MessageCircleIcon, PlusIcon, ClipboardListIcon, FileIcon, AlertTriangleIcon, UsersIcon } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  avatar: string
  role: 'admin' | 'member'
}

interface Task {
  id: string
  title: string
  description: string
  assignedTo: string | null
  status: 'todo' | 'inProgress' | 'done'
  dueDate: Date
}

interface File {
  id: string
  name: string
  url: string
  uploadedBy: string
  uploadedAt: Date
}

interface Risk {
  id: string
  description: string
  severity: 'low' | 'medium' | 'high'
  mitigationPlan: string
}

interface Activity {
  id: string
  user: string
  action: string
  timestamp: Date
}

interface IProject {
  id: string
  name: string
  description: string
  image: string
  members: User[]
  created_at: Date
  updated_at: Date
  admin: User
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
}

export default function UserProjectPage() {
  const [project, setProject] = useState<IProject>({
    id: "1",
    name: "Project Alpha",
    description: "A groundbreaking project that will revolutionize the industry.",
    image: "/placeholder.svg?height=100&width=100",
    members: [
      { id: "1", name: "John Doe", email: "john@example.com", avatar: "/placeholder.svg", role: 'admin' },
      { id: "2", name: "Jane Smith", email: "jane@example.com", avatar: "/placeholder.svg", role: 'member' },
      { id: "3", name: "Alice Johnson", email: "alice@example.com", avatar: "/placeholder.svg", role: 'member' },
    ],
    created_at: new Date("2023-01-01"),
    updated_at: new Date("2023-06-15"),
    admin: { id: "1", name: "John Doe", email: "john@example.com", avatar: "/placeholder.svg", role: 'admin' },
    deadline: new Date("2023-12-31"),
    completed: false,
    completed_at: null,
    tasks: [
      { id: "1", title: "Design UI", description: "Create wireframes and mockups", assignedTo: "1", status: "inProgress", dueDate: new Date("2023-07-15") },
      { id: "2", title: "Implement backend", description: "Set up database and API", assignedTo: "2", status: "todo", dueDate: new Date("2023-08-01") },
      { id: "3", title: "Write documentation", description: "Prepare user guide and API docs", assignedTo: "3", status: "todo", dueDate: new Date("2023-08-15") },
      { id: "4", title: "User testing", description: "Conduct user testing sessions", assignedTo: "2", status: "todo", dueDate: new Date("2023-09-01") },
      { id: "5", title: "Performance optimization", description: "Optimize app performance", assignedTo: "1", status: "todo", dueDate: new Date("2023-09-15") },
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
  })

  const [newComment, setNewComment] = useState("")
  const [currentUser] = useState<User>(project.members[1]) // Assuming the current user is Jane Smith

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      const newActivity = {
        id: (project.activities.length + 1).toString(),
        user: currentUser.name,
        action: `commented: "${newComment}"`,
        timestamp: new Date(),
      }
      setProject(prev => ({
        ...prev,
        activities: [newActivity, ...prev.activities]
      }))
      setNewComment("")
    }
  }

  const handleTaskStatusChange = (taskId: string, newStatus: 'todo' | 'inProgress' | 'done') => {
    setProject(prev => ({
      ...prev,
      tasks: prev.tasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    }))
  }

  const calculateProgress = () => {
    const completedTasks = project.tasks.filter(task => task.status === 'done').length
    return (completedTasks / project.tasks.length) * 100
  }

  return (
    <div className="flex h-screen bg-foreground/5">
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>{project.name}</CardTitle>
                  <CardDescription>Created on {project.created_at.toLocaleDateString()}</CardDescription>
                </div>
                <Avatar>
                  <AvatarImage src={project.image} alt={project.name} />
                  <AvatarFallback>{project.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              </div>
            </CardHeader>
            <CardContent>
              <p>{project.description}</p>
              <div className="mt-4">
                <h3 className="font-semibold">Project Details:</h3>
                <p>Admin: {project.admin.name}</p>
                <p>Deadline: {project.deadline.toLocaleDateString()}</p>
                <p>Status: {project.completed ? 'Completed' : 'In Progress'}</p>
                {project.completed_at && <p>Completed on: {project.completed_at.toLocaleDateString()}</p>}
              </div>
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Project Progress:</h3>
                <Progress value={calculateProgress()} className="w-full" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>My Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="todo">
                <TabsList>
                  <TabsTrigger value="todo">To Do</TabsTrigger>
                  <TabsTrigger value="inProgress">In Progress</TabsTrigger>
                  <TabsTrigger value="done">Done</TabsTrigger>
                </TabsList>
                <TabsContent value="todo">
                  <ScrollArea className="h-[300px]">
                    {project.tasks.filter(task => task.status === 'todo' && task.assignedTo === currentUser.id).map(task => (
                      <Card key={task.id} className="mb-4">
                        <CardHeader>
                          <CardTitle className="text-lg">{task.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>{task.description}</p>
                          <p className="text-sm text-gray-500 mt-2">Due: {task.dueDate.toLocaleDateString()}</p>
                        </CardContent>
                        <CardFooter>
                          <Select onValueChange={(value) => handleTaskStatusChange(task.id, value as 'todo' | 'inProgress' | 'done')}>
                            <SelectTrigger>
                              <SelectValue placeholder="Change status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="todo">To Do</SelectItem>
                              <SelectItem value="inProgress">In Progress</SelectItem>
                              <SelectItem value="done">Done</SelectItem>
                            </SelectContent>
                          </Select>
                        </CardFooter>
                      </Card>
                    ))}
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="inProgress">
                  <ScrollArea className="h-[300px]">
                    {project.tasks.filter(task => task.status === 'inProgress' && task.assignedTo === currentUser.id).map(task => (
                      <Card key={task.id} className="mb-4">
                        <CardHeader>
                          <CardTitle className="text-lg">{task.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>{task.description}</p>
                          <p className="text-sm text-gray-500 mt-2">Due: {task.dueDate.toLocaleDateString()}</p>
                        </CardContent>
                        <CardFooter>
                          <Select onValueChange={(value) => handleTaskStatusChange(task.id, value as 'todo' | 'inProgress' | 'done')}>
                            <SelectTrigger>
                              <SelectValue placeholder="Change status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="todo">To Do</SelectItem>
                              <SelectItem value="inProgress">In Progress</SelectItem>
                              <SelectItem value="done">Done</SelectItem>
                            </SelectContent>
                          </Select>
                        </CardFooter>
                      </Card>
                    ))}
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="done">
                  <ScrollArea className="h-[300px]">
                    {project.tasks.filter(task => task.status === 'done' && task.assignedTo === currentUser.id).map(task => (
                      <Card key={task.id} className="mb-4">
                        <CardHeader>
                          <CardTitle className="text-lg">{task.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>{task.description}</p>
                          <p className="text-sm text-gray-500 mt-2">Due: {task.dueDate.toLocaleDateString()}</p>
                        </CardContent>
                        <CardFooter>
                          <Select onValueChange={(value) => handleTaskStatusChange(task.id, value as 'todo' | 'inProgress' | 'done')}>
                            <SelectTrigger>
                              <SelectValue placeholder="Change status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="todo">To Do</SelectItem>
                              <SelectItem value="inProgress">In Progress</SelectItem>
                              <SelectItem value="done">Done</SelectItem>
                            </SelectContent>
                          </Select>
                        </CardFooter>
                      </Card>
                    ))}
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                {project.members.filter(member => member.id !== currentUser.id).map(member => (
                  <div key={member.id} className="mb-6">
                    <h3 className="text-lg font-semibold mb-2 flex items-center">
                      <Avatar className="w-6 h-6 mr-2">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      {member.name}'s Tasks
                    </h3>
                    {project.tasks.filter(task => task.assignedTo === member.id).map(task => (
                      <Card key={task.id} className="mb-2">
                        <CardHeader>
                          <CardTitle className="text-md">{task.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">{task.description}</p>
                          <p className="text-xs text-gray-500 mt-1">Due: {task.dueDate.toLocaleDateString()}</p>
                          <p className="text-xs text-gray-500">Status: {task.status}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project Files</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                {project.files.map(file => (
                  <div key={file.id} className="flex justify-between items-center mb-2">
                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-gray-500">Uploaded by {file.uploadedBy} on {file.uploadedAt.toLocaleDateString()}</p>
                    </div>
                    <Button variant="outline" size="sm">Download</Button>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project Risks</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                {project.risks.map(risk => (
                  <Card key={risk.id} className="mb-2">
                    <CardHeader>
                      <CardTitle className="text-sm">{risk.description}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs">Severity: <span className={`font-semibold ${risk.severity === 'high' ? 'text-red-500' : risk.severity === 'medium' ? 'text-yellow-500' : 'text-green-500'}`}>{risk.severity}</span></p>
                      <p className="text-xs mt-1">Mitigation: {risk.mitigationPlan}</p>
                    </CardContent>
                  </Card>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                {project.activities.map(activity => (
                  <div key={activity.id} className="mb-2">
                    <p className="text-sm">
                      <strong>{activity.user}</strong> {activity.action}
                    </p>
                    <p className="text-xs text-gray-500">{activity.timestamp.toLocaleString()}</p>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project Discussion</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </CardContent>
            <CardFooter>
              <Button onClick={handleAddComment}><MessageCircleIcon className="mr-2" /> Add Comment</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}