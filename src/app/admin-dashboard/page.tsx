"use client";
import React, { useState, useEffect } from "react";
import FilesSection from "../../components/FilesSection";
import KnowledgeBaseSection from "../../components/KnowledgeBaseSection";
import DTCSearchSection from "../../components/DTCSearchSection";
import SettingsSection from "../../components/SettingsSection";
import AdminUserManagement from "../../components/AdminUserManagement";
import AdminStatsPanel from "../../components/AdminStatsPanel";
import AdminOrderManagement from "../../components/AdminOrderManagement";
import AdminStripeTransactions from "../../components/AdminStripeTransactions";
import { useRouter } from "next/navigation";
import { FaFile, FaUsers, FaBook, FaSearch, FaCog, FaChartBar, FaShoppingCart, FaCreditCard } from "react-icons/fa";

export default function AdminDashboard() {
  const router = useRouter();
  useEffect(() => {
    console.log("Checking user authentication...");
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("carnage_user");
      console.log("User from localStorage:", user);
      if (!user) {
        console.log("No user found, redirecting to login...");
        router.replace("/login");
        return;
      }
      try {
        const parsed = JSON.parse(user);
        console.log("Parsed user:", parsed);
        if (parsed.role !== "admin") {
          console.log("User is not admin, redirecting to login...");
          router.replace("/login");
        }
      } catch (error) {
        console.error("Error parsing user:", error);
        router.replace("/login");
      }
    }
  }, [router]);

  const sidebarLinks = [
    { label: "Dashboard", icon: FaChartBar, color: "text-yellow-400" },
    { label: "Files", icon: FaFile, color: "text-yellow-400" },
    { label: "Orders", icon: FaShoppingCart, color: "text-yellow-400" },
    { label: "Users", icon: FaUsers, color: "text-yellow-400" },
    { label: "Payments", icon: FaCreditCard, color: "text-yellow-400" },
    { label: "Knowledge Base", icon: FaBook, color: "text-yellow-400" },
    { label: "DTC Codes", icon: FaSearch, color: "text-yellow-400" },
    { label: "Settings", icon: FaCog, color: "text-yellow-400" },
  ];
  const [active, setActive] = useState("Dashboard");

  console.log("Rendering AdminDashboard...");
  return (
    <div className="min-h-screen flex bg-gray-800 text-white relative overflow-hidden">
      {/* Dynograph watermark */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 opacity-50 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5">
          <svg width="800" height="600" viewBox="0 0 800 600" className="text-yellow-400 fill-current">
            <path d="M50 400 Q 200 200, 350 300 T 750 250" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.3"/>
            <path d="M50 450 Q 200 250, 350 350 T 750 300" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.2"/>
            <text x="400" y="500" textAnchor="middle" className="text-6xl font-bold opacity-10">CARNAGE REMAPS</text>
          </svg>
        </div>
      </div>

      <aside className="relative z-10 hidden md:flex w-72 bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600 text-black flex-col py-8 px-6 shadow-2xl">
        <div className="text-center mb-8">
          <div className="text-3xl font-black tracking-wider text-black mb-2">CARNAGE</div>
          <div className="text-lg font-bold text-gray-800 mb-4">REMAPS</div>
          <div className="text-sm font-medium text-gray-700 italic border-t border-black/20 pt-2">
            &quot;Same car, only better.&quot;
          </div>
        </div>
        
        <nav className="flex flex-col gap-2 text-lg font-bold">
          {sidebarLinks.map(link => {
            const Icon = link.icon;
            return (
              <button
                key={link.label}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 text-left group ${
                  active === link.label 
                    ? "bg-black text-yellow-400 shadow-lg transform scale-105 glow-effect" 
                    : "hover:bg-black/10 hover:shadow-md hover:transform hover:scale-102"
                }`}
                onClick={() => setActive(link.label)}
              >
                <Icon className={`text-xl ${active === link.label ? 'text-yellow-400' : 'text-black'} group-hover:text-yellow-600`} />
                <span className={active === link.label ? 'text-yellow-400' : 'text-black'}>{link.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 border-t border-black/20">
          <div className="text-xs text-gray-700 text-center">
            <div className="font-bold">Performance Pro Theme</div>
            <div>Admin Dashboard v2.0</div>
          </div>
        </div>
      </aside>

      <main className="relative z-10 flex-1 bg-gray-900 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {active === "Dashboard" && <AdminStatsPanel />}
          {active === "Files" && <FilesSection isAdmin={true} />}
          {active === "Orders" && <AdminOrderManagement />}
          {active === "Users" && <AdminUserManagement />}
          {active === "Payments" && <AdminStripeTransactions />}
          {active === "Knowledge Base" && <KnowledgeBaseSection isAdmin={true} />}
          {active === "DTC Codes" && <DTCSearchSection />}
          {active === "Settings" && <SettingsSection isAdmin={true} />}
        </div>
      </main>

      <style jsx>{`
        .glow-effect {
          box-shadow: 0 0 20px rgba(250, 204, 21, 0.5);
        }
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
}
