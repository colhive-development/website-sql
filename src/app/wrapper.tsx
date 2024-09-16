"use client"
import React from "react";
import SideBar from "@/components/sidebar";
import { usePathname } from "next/navigation";
import { sidebarState } from "@/lib/atoms";
import { useRecoilValue } from "recoil";
import { Navbar } from "@/components/navbar";

export const ClientWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const path = usePathname()
  const isSidebarOpen = useRecoilValue(sidebarState)

  return (
    <>
      <div className="flex">
        {<Navbar session={true} path={path}/>}
        {path !== "/" && !path.startsWith("/signin") && !path.startsWith("/signup")  && <SideBar/>}
      </div>
      <div className={`${path !== "/" && "flex"}`}>
        <div 
          className={`min-h-[screen-14] pt-14 w-screen transition-all duration-500 ease-in-out ${path !== "/" ? (isSidebarOpen ? "pl-60" : "md:pl-16" ) : "md:pl-16"}`}
        >
          {children}
        </div>
      </div>
    </>
  );
};