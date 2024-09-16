'use client'

import { Comment } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useState } from "react";
import { MessageCircleIcon } from "lucide-react";

export default function CommentsSection() {
    const [newComment, setNewComment] = useState('');
    const handleAddComment = () => {
      console.log("Adding comment:", newComment)
      setNewComment("")
    }
    return <Card>
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
}
