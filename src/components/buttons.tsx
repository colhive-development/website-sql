"use client"

import { signOut } from "@/lib/auth"
import { Button } from "./ui/button"
import { LogOut } from "lucide-react"

export const NavbarButtons = ({text, fn , href}:{text:string ,fn? : () => void , href?:string}) =>{
    return (
        <div>
            <Button 
                onClick={()=>{
                    fn ? fn() : href ? window.location.href = href : null
                }}
                variant={"ghost"}
            >{text}
            </Button>
        </div>
    )
}
export const LogoutButton = () => {
    return <Button variant="ghost" onClick={async()=>{await signOut(); }} className="w-full h-full flex gap-3 justify-start">
        <LogOut size={22} />
        Logout
    </Button>
}