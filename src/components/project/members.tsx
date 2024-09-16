'use client'
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlusIcon } from "lucide-react";
import { UserWithRole } from '@/lib/types';
import AddMemberModal from './addmember';

export interface ProjectMembersProps {
  members: UserWithRole[];
//   onMemberRoleChange: (memberId: string, newRole: 'admin' | 'member') => void;
//   onAddMember: (email: string) => void;
}

export default function ProjectMembers({ members }: ProjectMembersProps) {
  const [newMemberEmail, setNewMemberEmail] = useState("");

  const handleAddMember = () => {
    // if (newMemberEmail.trim()) {
    //   onAddMember(newMemberEmail);
    //   setNewMemberEmail("");
    // }
  };

  const onMemberRoleChange = (memberId: string, newRole: 'admin' | 'member') => {
    onMemberRoleChange(memberId, newRole);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex justify-between items-center'>
            {"Project Members"}
            <AddMemberModal onAddMember={handleAddMember}/>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px]">
          {members.map(member => (
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
                onValueChange={(value) => onMemberRoleChange(member.id, value as 'admin' | 'member')}
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
    </Card>
  );
}
