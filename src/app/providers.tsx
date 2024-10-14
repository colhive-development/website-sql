"use client"

import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/providers/theme-provider";
import {SessionProvider, useSession} from "next-auth/react"
import { ReactNode } from "react";
import { toast, Toaster } from "sonner";
import {RecoilRoot, useRecoilValue} from "recoil"
import { ClientWrapper } from "./wrapper";

export default function Providers({ children }:{children : ReactNode}) {

  return <SessionProvider>
        <RecoilRoot>
          <Toaster expand position="top-right" offset={3} duration={5000}/>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
          >
            <ClientWrapper>
              {children}
            </ClientWrapper>
          </ThemeProvider>
        </RecoilRoot>
      </SessionProvider>
    }
   
   