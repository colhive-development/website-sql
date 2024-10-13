'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CheckCircleIcon } from "lucide-react";
import { useState } from "react";

interface ProjectHeaderProps {
  name: string;
  description: string;
  image: string;
  adminName: string;
  createdAt: Date;
  deadline: Date;
  completed: boolean;
  completedAt: Date | null;
}

export default function ProjectHeader({
  name,
  description,
  image,
  adminName,
  createdAt,
  deadline,
  completed,
  completedAt,
}: ProjectHeaderProps) {
  const [status, setStatus] = useState('In Progress');
  const onStatusUpdate = () => {
    // handle status update
  }
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{name}</CardTitle>
            <CardDescription>Created on {createdAt.toLocaleDateString()}</CardDescription>
          </div>
          <Avatar>
            <AvatarImage src={image} alt={name} />
            <AvatarFallback>{name.split(" ").map((word) => word[0].toUpperCase()).join("")}</AvatarFallback>
          </Avatar>
        </div>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
        <div className="mt-4">
          <h3 className="font-semibold">Project Details:</h3>
          <p>Admin: {adminName}</p>
          <p>Deadline: {deadline.toLocaleDateString()}</p>
          <p>Status: {completed ? 'Completed' : 'In Progress'}</p>
          {completedAt && <p>Completed on: {completedAt.toLocaleDateString()}</p>}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onStatusUpdate}>
          {completed ? <CheckCircleIcon className="mr-2" /> : null}
          {completed ? 'Mark as In Progress' : 'Mark as Completed'}
        </Button>
      </CardFooter>
    </Card>
  );
}
