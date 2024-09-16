"use client"
import { FormEvent, useState } from "react"
import { Form } from "./form"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Tooltip, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import { TooltipContent } from "@radix-ui/react-tooltip"
import { Plus, Trash } from "lucide-react"
import { toast } from "sonner"

export const AddNewProjectButton = () => {
    const [members , setMembers] = useState<string[]>([])
    const [membermail , setMemberMail] = useState("")

    const handleAddMember = (e:FormEvent) => {
      e.preventDefault()
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
      if (emailPattern.test(membermail)) {
        setMembers([...members, membermail]);
        setMemberMail(''); 
      } else {
        toast.error('Please enter a valid email address');
        setMemberMail("")
      }
    };
    
    const handleSubmit = async (data:any) => {
        try {
            //@ts-ignore
            await createNewProject(data) //TODO create a server action for creating new project 
        } catch {
            toast.error("Failed to create new project")
        }
    }

    return <Dialog >
        <DialogTrigger asChild>
            <Button>Add new Project</Button>
        </DialogTrigger>
        <DialogContent className="max-w-[85vw] sm:max-w-[70vw] md:w-auto ">
            <DialogTitle>
                Enter the details of new project
            </DialogTitle>
            <DialogDescription >
                <p className="text-sm"></p>
            </DialogDescription>
                <Form inputs={[
                    { label : "Project Name", name : "name" , type : "text"},
                    { label : "Project Description", name : "description" , type : "text"},
                    { label : "Deadline", name : "deadline" , type : "date"},
                    { label : "Image", name : "image" , type : "file"}
                ]} 
                submitText="Create Project" 
                onSubmit={handleSubmit}>
                    <form onSubmit={handleAddMember}>
                        <section className="flex justify-between items-center w-full">
                            <Label className="block w-full font-medium">Members</Label>
                            {members.length > 0 && <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                    <div className="w-full text-right hover:cursor-pointer">selected members</div>
                                    </TooltipTrigger>
                                    <TooltipContent >
                                        <div className="p-2 flex flex-col bg-foreground/50 rounded-lg text-background">
                                            {members.map((m)=>{
                                                return <p>{m}</p>
                                            })}
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>}
                        </section>
                        {/* extending the form to include a new field */}
                        <section className="flex gap-2 items-center">
                        <Input
                            onChange={(e)=>setMemberMail(e.target.value)}
                            className="mt-1 p-1 px-2 submitHandlerblock w-full rounded-2xl border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 "
                            type="email" value={membermail}
                        />
                        <button 
                            type="submit"
                            className="border bg-green-500 rounded-full p-1 font-medium"
                            onClick={handleAddMember}
                        ><Plus/>
                        </button>
                        <button 
                            className="border bg-red-500 rounded-full p-1 font-medium"
                            onClick={(e)=>{
                                e.preventDefault()
                                setMembers([])
                            }}
                        ><Trash/>
                        </button>
                        </section>
                    </form>
                </Form>
            </DialogContent>
    </Dialog>
}