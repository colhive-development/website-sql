'use client'
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CalendarIcon, PlusIcon } from "lucide-react";


export default function AddTaskModal() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState<Date | null>(null);

  const handleAddTask = () => {
    if (title && description && dueDate) {
      // handle task creation
      setTitle('');
      setDescription('');
      setDueDate(null);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="mr-2" /> Add Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogDescription>Fill in the details for the new task.</DialogDescription>
        </DialogHeader>
        <Input
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-4"
        />
        <Textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-4"
        />
        <Input
          type="date"
          placeholder="Due Date"
          onChange={(e) => setDueDate(new Date(e.target.value))}
          className="mb-4"
          // icon={<CalendarIcon />}
        />
        <DialogFooter >
            <DialogClose>
            <Button  onClick={handleAddTask}>Add Task</Button>
            </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
