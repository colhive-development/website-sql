'use client'
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UserPlusIcon } from "lucide-react";

interface AddMemberModalProps {
  onAddMember: (email: string) => void;
}

export default function AddMemberModal({ onAddMember }: AddMemberModalProps) {
  const [email, setEmail] = useState('');

  const handleAddMember = () => {
    if (email.trim()) {
      onAddMember(email);
      setEmail('');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <UserPlusIcon className="mr-2" /> Add Member
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Member</DialogTitle>
          <DialogDescription>Enter the email address of the member you want to add.</DialogDescription>
        </DialogHeader>
        <Input
          placeholder="Member's Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4"
        />
        <DialogFooter>
            <DialogClose>
                <Button onClick={handleAddMember}>Add Member</Button>
            </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
