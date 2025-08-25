"use client";
import React, { ReactNode } from "react";
import Sidebar, { SidebarLink } from "./Sidebar";
import MobileNav from "./MobileNav";

interface DashboardLayoutProps {
  links: SidebarLink[];
  active: string;
  setActive: (label: string) => void;
  title: string;
  subtitle: string;
  footer?: ReactNode;
  children: ReactNode;
  backgroundSvg?: ReactNode;
}


const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  links,
  active,
  setActive,
  title,
  subtitle,
  footer,
  children,
  backgroundSvg,
}) => (
  <div className="min-h-screen flex bg-gray-800 text-white relative overflow-hidden">
    {/* Background gradient and SVG watermark */}
    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 opacity-50 pointer-events-none">
      {backgroundSvg}
    </div>
    {/* Desktop Sidebar */}
    <Sidebar links={links} active={active} setActive={setActive} title={title} subtitle={subtitle} footer={footer} />
    {/* Main Content */}
    <main className="relative z-10 flex-1 bg-gray-900 p-8 overflow-y-auto pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto">{children}</div>
    </main>
    {/* Mobile Nav */}
    <MobileNav links={links} active={active} setActive={setActive} />
  </div>
);

export default DashboardLayout;
