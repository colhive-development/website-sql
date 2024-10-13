import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserWithRole } from "@/lib/types";

const TeamMembers: React.FC<{ members: UserWithRole[] }> = ({ members }) => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {members.map(member => (
              <li key={member.id} className="flex items-center space-x-2">
                <img src={member.image ?? ""} alt={member.name} className="w-8 h-8 rounded-full" />
                <span>{member.name}</span>
                <span className="text-sm text-gray-500">({member.role})</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    );
};

export default TeamMembers
