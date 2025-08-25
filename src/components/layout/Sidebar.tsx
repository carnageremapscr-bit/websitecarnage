"use client";
import React from "react";

export interface SidebarLink {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color?: string;
  onClick?: () => void;
}

interface SidebarProps {
  links: SidebarLink[];
  active: string;
  setActive: (label: string) => void;
  title: string;
  subtitle: string;
  footer?: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ links, active, setActive, title, subtitle, footer }) => (
  <aside className="relative z-10 hidden md:flex w-72 bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600 text-black flex-col py-8 px-6 shadow-2xl">
    <div className="text-center mb-8">
      <div className="text-3xl font-black tracking-wider text-black mb-2">{title}</div>
      <div className="text-lg font-bold text-gray-800 mb-4">{subtitle}</div>
      <div className="text-sm font-medium text-gray-700 italic border-t border-black/20 pt-2">&quot;Same car, only better.&quot;</div>
    </div>
    <nav className="flex flex-col gap-2 text-lg font-bold">
      {links.map(link => {
        const Icon = link.icon;
        return (
          <button
            key={link.label}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 text-left group ${active === link.label ? "bg-black text-yellow-400 shadow-lg transform scale-105 glow-effect" : "hover:bg-black/10 hover:shadow-md hover:transform hover:scale-102"}`}
            onClick={() => setActive(link.label)}
          >
            <Icon className={`text-xl ${active === link.label ? 'text-yellow-400' : 'text-black'} group-hover:text-yellow-600`} />
            <span className={active === link.label ? 'text-yellow-400' : 'text-black'}>{link.label}</span>
          </button>
        );
      })}
    </nav>
    <div className="mt-auto pt-6 border-t border-black/20">
      {footer}
    </div>
    <style jsx>{`
      .glow-effect {
        box-shadow: 0 0 20px rgba(250, 204, 21, 0.5);
      }
      .hover\\:scale-102:hover {
        transform: scale(1.02);
      }
    `}</style>
  </aside>
);

export default Sidebar;
