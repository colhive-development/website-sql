'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Activity {
  id: string;
  user: string;
  action: string;
  timestamp: Date;
}

interface RecentActivityProps {
  activities: Activity[];
}

export default function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px]">
          {activities.map(activity => (
            <div key={activity.id} className="mb-2">
              <p className="text-sm">
                <strong>{activity.user}</strong> {activity.action}
              </p>
              <p className="text-xs text-gray-500">{activity.timestamp.toLocaleString()}</p>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
