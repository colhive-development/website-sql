'use client'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Plus, Trash } from "lucide-react";
import { Button } from "../../ui/button";

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'inProgress' | 'done';
  dueDate: Date;
}

export default function TaskManager({ tasks }: { tasks: Task[]}) {
  const [tasksList, setTasks] = useState<Task[]>(tasks);
  const [isHover, setIsHover] = useState(false);
  const [hoveredTaskId, setHoveredTaskId] = useState<string | null>(null);

  const onTaskStatusChange = (taskId: string, newStatus: 'todo' | 'inProgress' | 'done') => {
    setTasks(prevTasks => prevTasks.map(task => task.id === taskId ? { ...task, status: newStatus } : task));
  };

  const handleAddTask = (task: { title: string; description: string; dueDate: Date }) => {
    setTasks(prevTasks => [...prevTasks, { id: String(prevTasks.length + 1), ...task, status: 'todo', assignedTo: null }]);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const handleTaskStatusChange = (taskId: string, newStatus: 'todo' | 'inProgress' | 'done') => {
    setTasks(prevTasks => prevTasks.map(task => task.id === taskId ? { ...task, status: newStatus } : task));
  };

  const handleMemberChange = (taskId: string, newMemberId: string) => {
    setTasks(prevTasks => prevTasks.map(task => task.id === taskId ? { ...task, assignedTo: newMemberId } : task));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{"Task Management"}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="kanban">
          <TabsList>
            <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
          <TabsContent value="kanban">
            <div className="flex flex-col lg:flex-row gap-4">
              {(['todo', 'inProgress', 'done'] as const).map(status => (
                <div key={status} className="bg-foreground/5 p-4 rounded-lg w-full">
                  <h3 className="font-semibold mb-2">{status === 'todo' ? 'To Do' : status === 'inProgress' ? 'In Progress' : 'Done'}</h3>
                  {tasksList.filter(task => task.status === status).map(task => (
                    <Card
                      key={task.id}
                      className="mb-2 hover:scale-105 transition-all duration-200 ease-in-out"
                      onMouseEnter={() => {
                        setIsHover(true);
                        setHoveredTaskId(task.id);
                      }}
                      onMouseLeave={() => {
                        setIsHover(false);
                        setHoveredTaskId(null);
                      }}
                    >
                      <CardHeader>
                        <CardTitle className="text-md flex justify-between ">
                          {task.title}
                          {isHover && hoveredTaskId === task.id && <button 
                            className="hover:cursor-pointer hover:text-red-500 hover:scale-125 transition-all duration-300 ease-in-out"
                            onClick={() => handleDeleteTask(task.id)}><Trash width={16}/>
                          </button>}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs">{task.description}</p>
                        <p className="text-xs mt-1">Due: {task.dueDate.toLocaleDateString()}</p>
                      </CardContent>
                      <CardFooter>
                        <Select onValueChange={(value) => onTaskStatusChange(task.id, value as 'todo' | 'inProgress' | 'done')} >
                          <SelectTrigger className="w-fit">
                            <SelectValue placeholder={task.status} />
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
            <table className="w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-start">Title</th>
                  <th className="px-6 py-3 text-start">Description</th>
                  <th className="px-6 py-3 text-start">Due Date</th>
                  <th className="px-6 py-3 text-start">Status</th>
                </tr>
              </thead>
              <tbody>
                {tasksList.map(task => (
                  <tr key={task.id} className="hover:bg-foreground/5">
                    <td className="px-6 py-4">{task.title}</td>
                    <td className="px-6 py-4">{task.description}</td>
                    <td className="px-6 py-4">{task.dueDate.toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <Select value={task.status} onValueChange={(value) => onTaskStatusChange(task.id, value as 'todo' | 'inProgress' | 'done')}>
                        <SelectTrigger className="w-[100px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todo">To Do</SelectItem>
                          <SelectItem value="inProgress">In Progress</SelectItem>
                          <SelectItem value="done">Done</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
