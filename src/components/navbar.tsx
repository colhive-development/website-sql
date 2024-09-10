import { LogoHeader } from "./headers"
import { NavbarButtons } from "./buttons"
import { getSession } from "next-auth/react"
import { ProfileMenu } from "./profileMenu"
import { SideBar } from "./sidebar"
import { usePathname } from "next/navigation"
import { ModeToggle } from "./global/mode-toggle"
import { Session } from "next-auth"
import { toast } from "sonner"
export const Navbar =  ({session , path}:{session : Session | null | true , path : string}) => {

    return (
        <nav className=" max-h-20 xl:px-60 lg:px-48 md:px-28 sm:px-12 px-4  md:py-2 py-1 
            flex items-center justify-between bg-background w-full border">
            <section>
                <LogoHeader/>
            </section>
            <section className="md:flex hidden items-center self-end gap-4">
                <NavbarButtons text="Dashboard" href="/dashboard"/>
                {session && <><NavbarButtons text="Projects" href="/projects"/>
                <NavbarButtons text="Library" href="/library"/>
                <NavbarButtons text="Teams" href="/teams"/></>}
                {path === "/signup/company" && <NavbarButtons text="Signup as user" href="/signup/user"/>}
                {path === "/signup/user" && <NavbarButtons text="Signup as Organization" href="/signup/company"/>}
                <ProfileMenu session={null}/>
                <ModeToggle/>
            </section>
            <section className="md:hidden flex items-center gap-4">
                <ProfileMenu session={null}/>
                <SideBar/>
            </section>
        </nav>
    )
}