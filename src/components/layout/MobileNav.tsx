"use client";
import React from "react";
import { SidebarLink } from "./Sidebar";

interface MobileNavProps {
  links: SidebarLink[];
  active: string;
  setActive: (label: string) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ links, active, setActive }) => (
  <nav className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 shadow-2xl border-t border-yellow-300">
    {links.map(link => {
      const Icon = link.icon;
      return (
        <button
          key={link.label}
          className={`flex-1 flex flex-col items-center justify-center py-2 px-1 transition-all duration-200 ${active === link.label ? "bg-black/20 text-yellow-900 font-bold" : "text-black/80"}`}
          onClick={() => setActive(link.label)}
        >
          <Icon className={`text-xl mb-1 ${active === link.label ? 'text-yellow-900' : 'text-black/80'}`} />
          <span className="text-xs leading-tight">{link.label}</span>
        </button>
      );
    })}
  </nav>
);

export default MobileNav;
