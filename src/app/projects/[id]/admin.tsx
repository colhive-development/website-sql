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
import { Switch } from "@/components/ui/switch"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, CheckCircleIcon, MessageCircleIcon, PlusIcon, UserPlusIcon, LayoutDashboardIcon, UsersIcon, ClipboardListIcon, SettingsIcon, FileIcon, AlertTriangleIcon, DollarSignIcon, ShieldIcon, LockIcon, UnlockIcon } from "lucide-react"
import { IProject, Task } from '@/lib/types'

export default function AdminProjectPage() {
  const [project, setProject] = useState<IProject>({
    id: "1",
    name: "Project Alpha",
    description: "A groundbreaking project that will revolutionize the industry.",
    image: "/placeholder.svg?height=100&width=100",
    members: [
      { id: "1", name: "John Doe", email: "john@example.com", image: "/placeholder.svg", role: 'admin' , emailVerified : false , companyId : "1" },
      { id: "2", name: "Jane Smith", email: "jane@example.com", image: "/placeholder.svg", role: 'member', emailVerified : false , companyId : "1"  },
    ],
    created_at: new Date("2023-01-01"),
    updated_at: new Date("2023-06-15"),
    admin: { id: "1", name: "John Doe", email: "john@example.com", image: "/placeholder.svg", role: 'admin' , emailVerified : false , companyId : "1"  },
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
  })

  const [newMemberEmail, setNewMemberEmail] = useState("")
  const [newComment, setNewComment] = useState("")
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [newTaskAssignee, setNewTaskAssignee] = useState("")

  const handleAddMember = () => {
    console.log("Adding member:", newMemberEmail)
    setNewMemberEmail("")
  }

  const handleStatusUpdate = () => {
    setProject(prev => ({
      ...prev,
      completed: !prev.completed,
      completed_at: !prev.completed ? new Date() : null
    }))
  }

  const handleAddComment = () => {
    console.log("Adding comment:", newComment)
    setNewComment("")
  }

  const handleAddTask = () => {
    if (newTaskTitle.trim() !== "") {
      const newTask: Task = {
        id: (project.tasks.length + 1).toString(),
        title: newTaskTitle,
        description: "",
        assignedTo: newTaskAssignee || null,
        status: "todo",
        dueDate: new Date(),
      }
      setProject(prev => ({
        ...prev,
        tasks: [...prev.tasks, newTask]
      }))
      setNewTaskTitle("")
      setNewTaskAssignee("")
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

  const handleSettingChange = (setting: keyof IProject['settings'], value: boolean) => {
    setProject(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        [setting]: value
      }
    }))
  }

  const handleMemberRoleChange = (memberId: string, newRole: 'admin' | 'member') => {
    setProject(prev => ({
      ...prev,
      members: prev.members.map(member =>
        member.id === memberId ? { ...member, role: newRole } : member
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
        <div className="max-w-6xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>{project.name}</CardTitle>
                  <CardDescription>Created on {project.created_at.toLocaleDateString()}</CardDescription>
                </div>
                <Avatar>
                  <AvatarImage src={project.image} alt={project.name} />
                  <AvatarFallback>{project.name.split(" ").map((word) => word[0].toUpperCase()).join("")}</AvatarFallback>
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
            <CardFooter>
              <Button onClick={handleStatusUpdate}>
                {project.completed ? <CheckCircleIcon className="mr-2" /> : null}
                {project.completed ? 'Mark as In Progress' : 'Mark as Completed'}
              </Button>
            </CardFooter>
          </Card>

          <div className="grid grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Project Members</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px]">
                  {project.members.map(member => (
                    <div key={member.id} className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Avatar className="mr-2">
                          <AvatarImage src={member.image ?? ""} alt={member.name} />
                          <AvatarFallback>{member.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-gray-500">{member.email}</p>
                        </div>
                      </div>
                      <Select
                        value={member.role}
                        onValueChange={(value) => handleMemberRoleChange(member.id, value as 'admin' | 'member')}
                      >
                        <SelectTrigger className="w-[100px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="member">Member</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
              <CardFooter className="flex gap-4">
                <Input
                  placeholder="New member's email"
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                />
                <Button onClick={handleAddMember}><UserPlusIcon className="mr-2" /> Add Member</Button>
              </CardFooter>
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
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Task Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="kanban">
                <TabsList>
                  <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
                  <TabsTrigger value="list">List View</TabsTrigger>
                </TabsList>
                <TabsContent value="kanban">
                  <div className="grid grid-cols-3 gap-4">
                    {(['todo', 'inProgress', 'done'] as const).map(status => (
                      <div key={status} className="bg-gray-100 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">{status === 'todo' ? 'To Do' : status === 'inProgress' ? 'In Progress' : 'Done'}</h3>
                        {project.tasks.filter(task => task.status === status).map(task => (
                          <Card key={task.id} className="mb-2">
                            <CardHeader>
                              <CardTitle className="text-sm">{task.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-xs">{task.description}</p>
                              <p className="text-xs mt-1">Due: {task.dueDate.toLocaleDateString()}</p>
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
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="list">
                  <ScrollArea className="h-[400px]">
                    {project.tasks.map(task => (
                      <Card key={task.id} className="mb-2">
                        <CardHeader>
                          <CardTitle className="text-sm">{task.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-xs">{task.description}</p>
                          <p className="text-xs mt-1">Due: {task.dueDate.toLocaleDateString()}</p>
                          <p className="text-xs">Status: {task.status}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </ScrollArea>
                </TabsContent>
              </Tabs>
              <div className="mt-4 flex gap-4">
                <Input
                  placeholder="New task title"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                />
                <Select value={newTaskAssignee} onValueChange={setNewTaskAssignee}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Assign to" />
                  </SelectTrigger>
                  <SelectContent>
                    {project.members.map(member => (
                      <SelectItem key={member.id} value={member.id}>{member.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={handleAddTask}><PlusIcon className="mr-2" /> Add Task</Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Files</CardTitle>
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
              <CardFooter>
                <Button><PlusIcon className="mr-2" /> Upload File</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Management</CardTitle>
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
              <CardFooter>
                <Button><PlusIcon className="mr-2" /> Add Risk</Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Budget Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">Total Budget</p>
                  <p className="text-2xl font-bold">${project.budget.total.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Spent</p>
                  <p className="text-2xl font-bold">${project.budget.spent.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Remaining</p>
                  <p className="text-2xl font-bold">${(project.budget.total - project.budget.spent).toLocaleString()}</p>
                </div>
              </div>
              <Progress value={(project.budget.spent / project.budget.total) * 100} className="mt-4" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project Settings (Admin Only)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="public-project">Public Project</Label>
                  <Switch
                    id="public-project"
                    checked={project.settings.isPublic}
                    onCheckedChange={(checked) => handleSettingChange('isPublic', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="guest-comments">Allow Guest Comments</Label>
                  <Switch
                    id="guest-comments"
                    checked={project.settings.allowGuestComments}
                    onCheckedChange={(checked) => handleSettingChange('allowGuestComments', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="task-approval">Require Approval for Tasks</Label>
                  <Switch
                    id="task-approval"
                    checked={project.settings.requireApprovalForTasks}
                    onCheckedChange={(checked) => handleSettingChange('requireApprovalForTasks', checked)}
                  />
                </div>
              </div>
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