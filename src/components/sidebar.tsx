import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "./ui/button"
import { BriefcaseIcon, CloverIcon, LayoutGridIcon, MenuIcon, MessageSquareIcon, PaperclipIcon, SettingsIcon, UsersIcon } from "lucide-react"
import Link from "next/link"

export const SideBar = () => {
    return <Sheet>
    <SheetTrigger asChild>
      <Button size="icon" variant="outline" className="sm:hidden">
        <MenuIcon className="h-5 w-5" />
        <span className="">Toggle Menu</span>
      </Button>
    </SheetTrigger>
    <SheetContent side="right" className="w-[85%]">
      <nav className="grid gap-6 text-lg font-medium">
        <Link
          href="#"
        //   className="group flex h-12 w-12 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
          prefetch={false}
        >
          {/* <CloverIcon className="h-5 w-5 transition-all group-hover:scale-110" /> */}
          <span className="text-2xl">Colhive</span>
        </Link>
        <Link href="#" className="flex items-center gap-4 px-2.5 text-foreground" prefetch={false}>
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
          href="#"
          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          prefetch={false}
        >
          <BriefcaseIcon className="h-5 w-5" />
          Projects
        </Link>
        <Link
          href="#"
          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          prefetch={false}
        >
          <PaperclipIcon className="h-5 w-5" />
          Files
        </Link>
        <Link
          href="#"
          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          prefetch={false}
        >
          <MessageSquareIcon className="h-5 w-5" />
          Chat
        </Link>
        <Link
          href="#"
          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          prefetch={false}
        >
          <SettingsIcon className="h-5 w-5" />
          Settings
        </Link>
      </nav>
    </SheetContent>
  </Sheet>
}