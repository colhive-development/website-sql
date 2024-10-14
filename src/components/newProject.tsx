"use client"

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Plus, Trash, X } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { useRecoilState } from "recoil";
import { ProjectsState } from "@/lib/atoms";
import { IProjectAdmin, IProjectUser, UserWithRole } from "@/lib/types";
import { ProjectMembersProps } from "./project/admin/members";

type FormInputs = {
  name: string;
  description: string;
  deadline: string;
  image: File | null | string;
};

export const AddNewProjectButton = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormInputs>({
    defaultValues: {
      name: "",
      description: "",
      deadline: "",
      image: "",
    },
  });
  const [projects , setProjects] = useRecoilState(ProjectsState);
  const [members, setMembers] = useState<string[]>([]);
  const [memberEmail, setMemberEmail] = useState("");

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      console.log("Form data:", { ...data, members, image: data.image });
// server action to create project , only admin can create a project , user can only view the projects of the organiztions he belongs
      toast.success("Project created successfully!");
  
      reset();
      setMembers([]);
      setMemberEmail("");
    } catch (error) {
      toast.error("Failed to create new project");
    }
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailPattern.test(memberEmail)) {
      setMembers([...members, memberEmail]);
      setMemberEmail("");
    } else {
      toast.error("Please enter a valid email address");
    }
  };

  const handleRemoveMember = (email: string) => {
    setMembers(members.filter((m) => m !== email));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="">
          Add new Project
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[85vw] sm:max-w-[70vw] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Create New Project
          </DialogTitle>
          <DialogDescription>
            Enter the details of your new project below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              {...register("name", { required: "Project name is required" })}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="description">Project Description</Label>
            <Textarea
              id="description"
              {...register("description", { required: "Description is required" })}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>
          <div>
            <Label htmlFor="deadline">Deadline</Label>
            <Input
              id="deadline"
              type="date"
              {...register("deadline", { required: "Deadline is required" })}
            />
            {errors.deadline && <p className="text-red-500 text-sm mt-1">{errors.deadline.message}</p>}
          </div>
          <div>
            <Label htmlFor="image">Project Image</Label>
            <Input
              id="image"
              type="file"
              {...register("image")}
              accept="image/*"
            />
          </div>
          <Separator className="my-4" />
          <div>
            <Label className="text-lg font-semibold">Project Members</Label>
            <div className="flex items-center space-x-2 mt-2">
              <Input
                placeholder="Enter member's email"
                value={memberEmail}
                onChange={(e) => setMemberEmail(e.target.value)}
                className="flex-grow"
              />
              <Button
                type="button"
                onClick={handleAddMember}
                size="icon"
                variant="outline"
                className="bg-green-500 hover:bg-green-600"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <ScrollArea className="h-[150px]">
            <Card>
              <CardContent className="p-4">
                {members.length > 0 ? (
                  members.map((m) => (
                    <div key={m} className="flex items-center justify-between py-2">
                      <span>{m}</span>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleRemoveMember(m)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No members added yet.</p>
                )}
              </CardContent>
            </Card>
          </ScrollArea>
          {members.length > 0 && (
            <Button
              type="button"
              variant="destructive"
              onClick={() => setMembers([])}
              className="mt-4"
            >
              <Trash className="h-4 w-4 mr-2" />
              Clear All Members
            </Button>
          )}
          <Button type="submit" className="w-full">
            Create Project
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
