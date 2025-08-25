"use client";

import React, { useState, useEffect } from "react";
import DashboardHome from "../../components/DashboardHome";
import FilesSection from "../../components/FilesSection";
import UploadSection from "../../components/UploadSection";
import KnowledgeBaseSection from "../../components/KnowledgeBaseSection";
import VehicleDataSection from "../../components/VehicleDataSection";
import DTCSearchSection from "../../components/DTCSearchSection";
import OrderTrackingSection from "../../components/OrderTrackingSection";
import { useRouter } from "next/navigation";
import { FaHome, FaUpload, FaShoppingCart, FaBook, FaCar, FaSearch, FaFile } from "react-icons/fa";
// Ensure Icon components accept className prop
type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement> & { className?: string }>;

interface SidebarLink {
  label: string;
  icon: IconComponent;
  color?: string;
}

const sidebarLinks: SidebarLink[] = [
  { label: "Dashboard", icon: FaHome as IconComponent, color: "text-yellow-400" },
  { label: "Upload File", icon: FaUpload as IconComponent, color: "text-yellow-400" },
  { label: "My Orders", icon: FaShoppingCart as IconComponent, color: "text-yellow-400" },
  { label: "Files", icon: FaFile as IconComponent, color: "text-yellow-400" },
  { label: "Knowledge Base", icon: FaBook as IconComponent, color: "text-yellow-400" },
  { label: "Vehicle Data", icon: FaCar as IconComponent, color: "text-yellow-400" },
  { label: "DTC Search", icon: FaSearch as IconComponent, color: "text-yellow-400" },
];

function Dashboard() {
  const [active, setActive] = useState("Dashboard");
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("carnage_user");
      if (!user) {
        router.replace("/login");
        return;
      }
      try {
        const parsed = JSON.parse(user);
        if (parsed.role === "admin") {
          router.replace("/admin-dashboard");
        }
      } catch (error) {
        console.error("Error parsing user:", error);
        router.replace("/login");
      }
    }
  }, [router]);

  return (
    <div className="min-h-screen flex bg-gray-800 text-white relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 opacity-50 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5">
          <svg width="600" height="400" viewBox="0 0 600 400" className="text-yellow-400 fill-current">
            <path d="M50 300 Q 150 150, 250 200 T 550 180" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.3"/>
            <path d="M50 320 Q 150 170, 250 220 T 550 200" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.2"/>
            <text x="300" y="350" textAnchor="middle" className="text-4xl font-bold opacity-10">CARNAGE</text>
          </svg>
        </div>
      </div>

      {/* Sidebar */}
      <aside className="relative z-10 hidden md:flex w-72 bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600 text-black flex-col py-8 px-6 shadow-2xl">
        <div className="text-center mb-8">
          <div className="text-3xl font-black tracking-wider text-black mb-2">CARNAGE</div>
          <div className="text-lg font-bold text-gray-800 mb-4">CUSTOMER PORTAL</div>
          <div className="text-sm font-medium text-gray-700 italic border-t border-black/20 pt-2">
            &quot;Same car, only better.&quot;
          </div>
        </div>
        
        <nav className="flex flex-col gap-2 text-lg font-bold">
          {sidebarLinks.map(link => {
            const Icon = link.icon;
            return (
              <div
                key={link.label}
                className={`flex items-center gap-4 p-2 rounded-lg cursor-pointer transition-all duration-300 text-left group ${
                  active === link.label 
                    ? "bg-black text-yellow-400 shadow-lg transform scale-105" 
                    : "hover:bg-black/10 hover:shadow-md hover:transform hover:scale-102"
                }`}
                onClick={() => setActive(link.label)}
              >
                <Icon className={`text-2xl ${active === link.label ? 'text-yellow-400' : 'text-black'} group-hover:text-yellow-600`} />
                <span className={active === link.label ? 'text-yellow-400' : 'text-black'}>{link.label}</span>
              </div>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 border-t border-black/20">
          <div className="text-xs text-gray-700 text-center">
            <div className="font-bold">Customer Portal v2.0</div>
            <div>Carnage Remaps</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="relative z-10 flex-1 bg-gray-900 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {active === "Dashboard" && <DashboardHome />}
          {active === "Upload File" && <UploadSection />}
          {active === "My Orders" && <OrderTrackingSection />}
          {active === "Files" && <FilesSection />}
          {active === "Knowledge Base" && <KnowledgeBaseSection isAdmin={false} />}
          {active === "Vehicle Data" && <VehicleDataSection />}
          {active === "DTC Search" && <DTCSearchSection />}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
