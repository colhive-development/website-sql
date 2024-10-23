import { LogoHeader } from "./headers"
import { NavbarButtons } from "./buttons"
import { ProfileMenu } from "./profileMenu"
import { MobileSideBar } from "./mobileSidebar"
import { ModeToggle } from "./global/mode-toggle"
import { Session } from "next-auth"
export const Navbar =  ({session , path}:{session : Session | null | true , path : string}) => {

    return (
        <nav className="z-10 h-14 fixed xl:px-60 lg:px-48 md:px-28 sm:px-12 px-4  md:py-2 py-1 flex items-center justify-between bg-background w-full border-b">
            <section>
                <LogoHeader/>
            </section>
            <section className="md:flex hidden items-center self-end gap-4">
                {session && !path.startsWith("/signin") && !path.startsWith("/signup") && <> <NavbarButtons text="Dashboard" href="/dashboard"/>
                <NavbarButtons text="Projects" href="/projects"/>
                <NavbarButtons text="Library" href="/library"/>
                <NavbarButtons text="Teams" href="/teams"/></>}
                {path === "/signup/company" && <NavbarButtons text="Signup as user" href="/signup/user"/>}
                {path === "/signup/user" && <NavbarButtons text="Signup as Organization" href="/signup/company"/>}
                <ProfileMenu session={null}/>
                <ModeToggle/>
            </section>
            <section className="md:hidden flex items-center gap-4">
                <ProfileMenu session={null}/>
                <MobileSideBar/>
            </section>
        </nav>
    )
}