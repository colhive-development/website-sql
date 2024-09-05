"use client"

import { ThemeProvider } from "@/components/providers/theme-provider";
import {SessionProvider} from "next-auth/react"
import { ReactNode } from "react";
import { Toaster } from "sonner";

export default function Providers({ children}:{children : ReactNode}) {

  return <SessionProvider>
        {/* <RecoilRoot> */}
          <Toaster expand position="top-right" offset={3} duration={3000}/>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        {/* </RecoilRoot> */}
      </SessionProvider>
    }
   
   