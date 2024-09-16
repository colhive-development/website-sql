"use client"
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutGridIcon, UsersIcon, BriefcaseIcon, PaperclipIcon, MessageSquareIcon, User, Menu, LucideIcon } from "lucide-react";
import { usePathname } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { sidebarState } from '@/lib/atoms';

export type MenuItemId = "dashboard" | "teams" | "projects" | "files" | "chat" | "profile";

const menuItems: Array<{ icon: LucideIcon; label: string; id: MenuItemId }> = [
  { icon: LayoutGridIcon, label: 'Dashboard', id: "dashboard" },
  { icon: UsersIcon, label: 'Teams', id: "teams" },
  { icon: BriefcaseIcon, label: 'Projects', id: "projects" },
  { icon: PaperclipIcon, label: 'Files', id: "files" },
  { icon: MessageSquareIcon, label: 'Chat', id: "chat" },
  { icon: User, label: 'Profile', id: "profile" },
];
export interface MenuItemProps {
  icon: LucideIcon;
  label: string;
  id: MenuItemId;
  isActive: boolean;
  onClick: () => void;
  isOpen: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon: Icon, label, id, isActive, onClick, isOpen }) => (
  <Link
    href={`/${id}`}
    className={`flex items-center gap-4 px-2.5 py-2 h-10 rounded-md transition-all duration-700 ease-in-out ${
      isActive ? 'bg-primary text-primary-foreground' : 'text-foreground/70 hover:bg-accent hover:text-accent-foreground'
    } ${isOpen ? 'justify-start' : 'justify-start'}`}
    onClick={onClick}
    prefetch={false}
  >
    <Icon className={`h-7 p-[2px] w-7 transition-transform duration-1000 ease-in-out`} />
    {isOpen && <span className="transition-opacity duration-300 ease-in-out">{label}</span>}
  </Link>
);

export const SideBar: React.FC = () => {
  const path = usePathname();
  const [isOpen, setIsOpen] = useRecoilState(sidebarState);
  const [selected, setSelected] = useState<MenuItemId>("dashboard");

  useEffect(() => {
    const currentPath = path.split('/')[1] as MenuItemId;
    setSelected(currentPath || "dashboard");
  }, [path]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');

    const handleScreenResize = () => {
      if (mediaQuery.matches) {
        setIsOpen(false);
      }
    };

    mediaQuery.addEventListener('change', handleScreenResize);

    return () => {
      mediaQuery.removeEventListener('change', handleScreenResize);
    };
  }, [setIsOpen]);

  const handleOpen = () => setIsOpen(!isOpen);


  return (
    <div className={`border-r mt-14 fixed bg-background h-screen hidden md:block transition-all duration-500 ease-in-out ${isOpen ? 'w-60' : 'w-16'}`}>
      <Button
        variant="ghost"
        className="w-[61px] p-2 m-[1px]"
        onClick={handleOpen}
      >
        <Menu className="h-6 w-6" />
      </Button>
      <nav className={`grid gap-2 p-2 ${isOpen ? '' : 'items-center'}`}>
        {menuItems.map((item) => (
          <MenuItem
            key={item.id}
            icon={item.icon}
            id={item.id}
            label={item.label}
            isActive={selected === item.id}
            onClick={() => setSelected(item.id)}
            isOpen={isOpen}
          />
        ))}
      </nav>
    </div>
  );
};

export default SideBar;