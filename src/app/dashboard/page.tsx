"use client"
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, FileIcon, MessageSquareIcon, PlusIcon, UserPlusIcon } from "lucide-react"
import { File, IProjectAdmin, IProjectUser, UserWithRole } from '@/lib/types'

interface Comment {
  id: string
  user: UserWithRole
  project: IProjectAdmin | IProjectUser
  content: string
  createdAt: Date
}

type FileShare = IProjectAdmin["files"]

interface TodoMemo {
  id: string
  content: string
  completed: boolean
}

export default function Dashboard() {
  const projects = [{
    id: "1",
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
  }]
  const [recentComments, setRecentComments] = useState<Comment[]>([
    {
      id: "1",
      user: { id: "1", name: "John Doe", email: "john@example.com", image: "/placeholder.svg" , role: "member" , emailVerified : false , companyId : "223r2dads" },
      project: {
        id: "1",
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
      },
      content: "Great progress on the UI design!",
      createdAt: new Date("2023-06-20T10:30:00"),
    },
    {
      id: "2",
      user: { id: "2", name: "Jane Smith", email: "jane@example.com", image: "/placeholder.svg" , role: "member" , emailVerified : false , companyId : "223r2dads" },
      project: {
        id: "2",
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
      },
      content: "Can we schedule a meeting to discuss the API?",
      createdAt: new Date("2023-06-19T15:45:00"),
    },
    {
      id: "3",
      user: { id: "3", name: "Alice Johnson", email: "alice@example.com", image: "/placeholder.svg" , role: "member" , emailVerified : false , companyId : "223r2dads" },
      project: {
        id: "4",
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
      },
      content: "I've updated the documentation as requested.",
      createdAt: new Date("2023-06-18T09:15:00"),
    },
  ])

  const [recentFileShares, setRecentFileShares] = useState<File[]>([
    { id: "1", name: "Project_Proposal.pdf", url: "#", uploadedBy: "1", uploadedAt: new Date("2023-01-05") },
    { id: "2", name: "UI_Mockups.fig", url: "#", uploadedBy: "2", uploadedAt: new Date("2023-06-10") },
  ]);
  const [recentMembers, setRecentMembers] = useState<UserWithRole[]>([
    { id: "4", name: "John Doe", email: "john@example.com", image: "/placeholder.svg" , role: "member" , emailVerified : false , companyId : "223r2dads" },
    { id: "5", name: "John Doe", email: "john@example.com", image: "/placeholder.svg" , role: "member" , emailVerified : false , companyId : "223r2dads" },
    { id: "6", name: "John Doe", email: "john@example.com", image: "/placeholder.svg" , role: "member" , emailVerified : false , companyId : "223r2dads" },
  ])

  const [todoMemos, setTodoMemos] = useState<TodoMemo[]>([
    { id: "1", content: "Review project timelines", completed: false },
    { id: "2", content: "Prepare for client meeting", completed: false },
    { id: "3", content: "Update team on progress", completed: true },
  ])

  const [newTodoContent, setNewTodoContent] = useState("")

  const handleAddTodo = () => {
    if (newTodoContent.trim() !== "") {
      const newTodo: TodoMemo = {
        id: (todoMemos.length + 1).toString(),
        content: newTodoContent,
        completed: false,
      }
      setTodoMemos([...todoMemos, newTodo])
      setNewTodoContent("")
    }
  }

  const handleToggleTodo = (id: string) => {
    setTodoMemos(todoMemos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2 lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="comments">
              <TabsList className="mb-4">
                <TabsTrigger value="comments">Comments</TabsTrigger>
                <TabsTrigger value="files">File Shares</TabsTrigger>
              </TabsList>
              <TabsContent value="comments">
                <ScrollArea className="h-[300px]">
                  {recentComments.map(comment => (
                    <div key={comment.id} className="mb-4 p-4 bg-muted rounded-lg">
                      <div className="flex items-center mb-2">
                        <Avatar className="w-8 h-8 mr-2">
                          <AvatarImage src={comment.user.image ?? ""} alt={comment.user.name} />
                          <AvatarFallback>{comment.user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{comment.user.name}</p>
                          <p className="text-sm text-muted-foreground">{comment.project.name}</p>
                        </div>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                      <p className="text-xs text-muted-foreground mt-2">{comment.createdAt.toLocaleString()}</p>
                    </div>
                  ))}
                </ScrollArea>
              </TabsContent>
              <TabsContent value="files">
                <ScrollArea className="h-[300px]">
                  {recentFileShares?.map(file => (
                    <div key={file.id} className="mb-4 p-4 bg-muted rounded-lg">
                      <div className="flex items-center mb-2">
                        <FileIcon className="w-8 h-8 mr-2" />
                        <div>
                          <p className="font-semibold">{file.name}</p>
                          {/* <p className="text-sm text-muted-foreground">{project.name}</p> */}
                        </div>
                      </div>
                      <p className="text-sm">Shared by {file.uploadedBy}</p>
                      <p className="text-xs text-muted-foreground mt-2">{file.uploadedAt.toLocaleString()}</p>
                    </div>
                  ))}
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Todo Memos</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px] mb-4">
              {todoMemos.map(todo => (
                <div key={todo.id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`todo-${todo.id}`}
                    checked={todo.completed}
                    onChange={() => handleToggleTodo(todo.id)}
                    className="mr-2"
                  />
                  <label
                    htmlFor={`todo-${todo.id}`}
                    className={`text-sm ${todo.completed ? 'line-through text-muted-foreground' : ''}`}
                  >
                    {todo.content}
                  </label>
                </div>
              ))}
            </ScrollArea>
            <div className="flex items-center">
              <Input
                placeholder="New todo..."
                value={newTodoContent}
                onChange={(e) => setNewTodoContent(e.target.value)}
                className="mr-2"
              />
              <Button onClick={handleAddTodo}><PlusIcon className="w-4 h-4" /></Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMembers.map(member => (
                <div key={member.id} className="flex items-center">
                  <Avatar className="w-10 h-10 mr-3">
                    <AvatarImage src={member.image ?? ""} alt={member.name} />
                    <AvatarFallback>{member.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full"><UserPlusIcon className="w-4 h-4 mr-2" /> Invite Member</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2 text-muted-foreground" />
                <div>
                  <p className="font-semibold">Project Alpha Milestone</p>
                  <p className="text-sm text-muted-foreground">Due in 3 days</p>
                </div>
              </div>
              <div className="flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2 text-muted-foreground" />
                <div>
                  <p className="font-semibold">Project Beta Review</p>
                  <p className="text-sm text-muted-foreground">Due in 1 week</p>
                </div>
              </div>
              <div className="flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2 text-muted-foreground" />
                <div>
                  <p className="font-semibold">Quarterly Team Meeting</p>
                  <p className="text-sm text-muted-foreground">Due in 2 weeks</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="font-semibold">Active Projects</p>
                <p className="text-2xl font-bold">5</p>
              </div>
              <div>
                <p className="font-semibold">Tasks in Progress</p>
                <p className="text-2xl font-bold">23</p>
              </div>
              <div>
                <p className="font-semibold">Completed Tasks (This Week)</p>
                <p className="text-2xl font-bold">17</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}