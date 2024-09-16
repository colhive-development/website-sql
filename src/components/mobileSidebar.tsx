import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "./ui/button"
import { BriefcaseIcon, CloverIcon, LayoutGridIcon, Menu, MenuIcon, MessageSquareIcon, PaperclipIcon, SettingsIcon, UsersIcon } from "lucide-react"
import Link from "next/link"

export const MobileSideBar = () => {
    return <Sheet>
    <SheetTrigger asChild>
      <Button variant="ghost" className="border">
        <Menu/>
        {/* <span className="">Toggle Menu</span> */}
      </Button>
    </SheetTrigger>
    <SheetContent side="right" className="w-[85%]">
      <nav className="grid gap-6 text-lg font-medium">
        <Link href="/dashboard" className="flex items-center gap-4 px-2.5 text-foreground" prefetch={false}>
          <LayoutGridIcon className="h-5 w-5" />
          Dashboard
        </Link>
        <Link
          href="#"
          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          prefetch={false}
        >
          <UsersIcon className="h-5 w-5" />
          Teams
        </Link>
        <Link
          href="/projects"
          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          prefetch={false}
        >
          <BriefcaseIcon className="h-5 w-5" />
          Projects
        </Link>
        <Link
          href="/files"
          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          prefetch={false}
        >
          <PaperclipIcon className="h-5 w-5" />
          Files
        </Link>
        <Link
          href="/chat"
          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          prefetch={false}
        >
          <MessageSquareIcon className="h-5 w-5" />
          Chat
        </Link>
        <Link
          href="/profile"
          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          prefetch={false}
        >
          <SettingsIcon className="h-5 w-5" />
          Profile
        </Link>
      </nav>
    </SheetContent>
  </Sheet>
}