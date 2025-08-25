"use client";
import React, { ReactNode } from "react";
import Sidebar, { SidebarLink } from "./Sidebar";
import MobileNav from "./MobileNav";
import { FaUserCircle } from "react-icons/fa";

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
}) => {
  return (
    <div className="min-h-screen flex bg-gray-800 text-white relative overflow-hidden">
      {/* Background gradient + SVG watermark */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 opacity-50 pointer-events-none">
        {backgroundSvg && <div className="w-full h-full">{backgroundSvg}</div>}
      </div>

      {/* Desktop Sidebar */}
      <Sidebar
        links={links}
        active={active}
        setActive={setActive}
        title={title}
        subtitle={subtitle}
        footer={footer || (
          <div className="p-4 text-gray-400 text-sm flex flex-col gap-1">
            <span>Contact: 07546 371963</span>
            <span>Email: carnageremaps@gmail.com</span>
            <span>v1.0.0</span>
          </div>
        )}
      />

      {/* Main Content */}
      <main className="relative z-10 flex-1 bg-gray-900 p-8 overflow-y-auto pb-24 md:pb-8 transition-all duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-yellow-400">{title}</h1>
            <h2 className="text-lg text-gray-300">{subtitle}</h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded font-semibold shadow">
              New Upload
            </button>
            <FaUserCircle className="text-3xl text-gray-300 hover:text-yellow-400 cursor-pointer" title="User Profile" />
          </div>
        </div>

        {/* Page content */}
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>

      {/* Mobile Navigation */}
      <MobileNav links={links} active={active} setActive={setActive} />

      {/* Footer (optional) */}
      {footer && (
        <footer className="absolute bottom-0 w-full p-4 text-gray-400 text-sm hidden md:flex justify-center border-t border-gray-700">
          {footer}
        </footer>
      )}
    </div>
  );
};

export default DashboardLayout;
