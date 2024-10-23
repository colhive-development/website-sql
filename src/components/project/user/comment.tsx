import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Comment, UserWithRole } from "@/lib/types";
import { getTimeDifference } from "@/lib/utils";
import { useState } from "react";

const CommentSection: React.FC<{ comments: Comment[], currentUser: UserWithRole }> = ({ comments, currentUser }) => {
  const [commentsState, setComments] = useState([
    ...comments
  ]);
  const [newComment, setNewComment] = useState('');

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();

    const newCommentValue = {
      id: (comments.length + 1).toString(),
      text: newComment,
      author: currentUser,
      createdAt : new Date(),
      updatedAt : new Date(),
    };

    setComments([newCommentValue, ...commentsState]);

    console.log('New comment:', newComment);
    setNewComment('');
  };

  return (
    <div className="p-4 rounded-lg shadow border">
      <h2 className="text-xl font-bold mb-4">Comments</h2>
      <ScrollArea className="h-[250px] mb-4">
        <ul className="space-y-4 pr-4">
          {commentsState.map(comment => (
            <li key={comment.id} className="p-2 rounded flex justify-between">
              <section className="flex flex-col">
                <div className="font-semibold">{comment.author.name}</div>
                <div>{comment.text}</div>
              </section>
              {comment.createdAt && <div className="self-end">
                {getTimeDifference(new Date(comment.createdAt))}
              </div>}
            </li>
          ))}
        </ul>
      </ScrollArea>
      <form onSubmit={handleSubmitComment}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          placeholder="Add a comment..."
        />
        <Button 
          onClick={(e) => handleSubmitComment(e)}>
          Post Comment
        </Button>
      </form>
    </div>
  );
};

export default CommentSection;