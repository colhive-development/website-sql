import { Activity } from "@/lib/types";

const ActivityFeed: React.FC<{ activities: Activity[] }> = ({ activities }) => {
    return (
      <div className="p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <ul className="space-y-2">
          {activities.map(activity => (
            <li key={activity.id} className="text-sm">
              <span className="font-semibold">{activity.user}</span> {activity.action} on {activity.timestamp.toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
    );
}

export default ActivityFeed;