import { ArrowLeftRight, LogOut, MapPin, ShoppingCart, UserRoundPen, Users } from "lucide-react"
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { LogoutButton } from "./buttons";

export function ProfileMenu({session, }:{session : Session | null }) {
  // const img = useUserImage();

  return (
    <div className="flex items-center self-end">
      <DropdownMenu >
        <DropdownMenuTrigger asChild>
          <Avatar className="border">
            {/* {img && <AvatarImage src={img} alt="user" />} */}
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 self-start flex flex-col">
          <DropdownMenuItem className="p-0"
           >
            <Button variant="ghost" href="/profile" className="w-full h-full flex gap-3 justify-start">
              <UserRoundPen size={22} />Profile
            </Button>
          </DropdownMenuItem>

          <DropdownMenuSeparator className=""/>
          <DropdownMenuItem className="p-0 " 
          >
            <Button variant="ghost" className="w-full h-full flex gap-3 justify-start">
              <Users size={22} />Any
            </Button>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem className="p-0">
              <LogoutButton/>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
