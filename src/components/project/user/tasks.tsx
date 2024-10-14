import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Task } from "@/lib/types";
import { useState } from "react";

const MyTasks: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
  const [tasksList, setTasks] = useState<Task[]>(tasks);
  const handleStatusChange = (taskId: string, newStatus: 'todo' | 'inProgress' | 'done') => {
    setTasks(prevTasks => prevTasks.map(task => task.id === taskId ? { ...task, status: newStatus } : task));
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {tasksList.map(task => (
            <li key={task.id} className="flex justify-between items-center">
              <span>{task.title}</span>
              <Select value={task.status} onValueChange={(value) => handleStatusChange(task.id, value as 'todo' | 'inProgress' | 'done')}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="inProgress">In Progress</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
export default MyTasks
