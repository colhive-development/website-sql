"use client"

import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/providers/theme-provider";
import {SessionProvider, useSession} from "next-auth/react"
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { toast, Toaster } from "sonner";

export default function Providers({ children}:{children : ReactNode}) {
  const {data:session , status} = useSession()
  if(status === "unauthenticated"){
      toast.error("Session not found. Try logging in again.")
  }
  const path = usePathname()
  if(session) return <SessionProvider>
        {/* <RecoilRoot> */}
          <Toaster expand position="top-right" offset={3} duration={3000}/>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
          >
          <Navbar session={true} path={path}/>
            {children}
          </ThemeProvider>
        {/* </RecoilRoot> */}
      </SessionProvider>
    }
   
   