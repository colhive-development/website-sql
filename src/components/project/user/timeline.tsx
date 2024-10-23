import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Task } from "@/lib/types";

const ProjectTimeline: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Other Tasks</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {tasks.map(task => (
            <div key={task.id} className="flex justify-between items-center">
              <span>{task.title}</span>
              <span>{task.dueDate.toLocaleDateString()}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    );
};

export default ProjectTimeline
