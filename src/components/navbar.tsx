import { LogoHeader } from "./headers"
import { NavbarButtons } from "./buttons"
import { getSession } from "next-auth/react"
import { ProfileMenu } from "./profileMenu"
import { SideBar } from "./sidebar"
export const Navbar = async () => {
    // const session = await getSession()
    // if(!session){
    //     toast.error("Session not found. Try logging in again.")
    //     return <></>
    // }

    // else 
    return (
        <nav className=" max-h-20 xl:px-60 lg:px-48 md:px-28 sm:px-12 px-4  md:py-2 py-1 
            flex items-center justify-between bg-white w-screen border">
            <section>
                <LogoHeader/>
            </section>'
            <section className="md:flex hidden items-center self-end gap-4">
                <NavbarButtons text="Dashboard" href="/dashboard"/>
                <NavbarButtons text="Projects" href="/projects"/>
                <NavbarButtons text="Library" href="/library"/>
                <NavbarButtons text="Teams" href="/teams"/>
                <ProfileMenu session={null}/>
            </section>
            <section className="md:hidden flex items-center gap-4">
                <ProfileMenu session={null}/>
                <SideBar/>
            </section>
        </nav>
    )
}