import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { Comments } from '@/lib/types'
import { ScrollArea } from '../ui/scroll-area'

export const CommentsArea = ({comments}:{comments:Comments[]}) => {
    return <Card>
    <CardHeader>
    <CardTitle>Recent comments</CardTitle>
    </CardHeader>
    <CardContent>
    <ScrollArea className="h-[200px]">
        {comments.map(comment => (
            <div key={comment.id} className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium">{comment.text}</p>
                <p className="text-xs text-gray-500">by {comment.author.name} {`, ${comment.createdAt?.toLocaleDateString()}`}</p>
            </div>
        ))}
        </ScrollArea>
    </CardContent>
</Card>
}
