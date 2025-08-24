"use client";

// Correct import paths and move useState inside the component
import React, { useState } from "react";
import DashboardHome from "../../components/DashboardHome";
import FilesSection from "../../components/FilesSection";
import UploadSection from "../../components/UploadSection";
import KnowledgeBaseSection from "../../components/KnowledgeBaseSection";
import VehicleDataSection from "../../components/VehicleDataSection";

import DTCSearchSection from "../../components/DTCSearchSection";
// Define sidebarLinks and fix implicit any type
const sidebarLinks: { label: string; icon: string }[] = [
  { label: "Dashboard", icon: "🏠" },
  { label: "Files", icon: "📁" },
  { label: "Upload", icon: "⬆️" },
  { label: "Knowledge Base", icon: "📚" },
  { label: "Vehicle Data", icon: "🚗" },
  { label: "DTC Search", icon: "🔍" },
];

function Dashboard() {
  const [active, setActive] = useState("Dashboard");

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      {/* Sidebar for desktop, dropdown for mobile */}
      <aside className="hidden md:flex w-64 bg-gray-800 text-yellow-400 flex-col py-8 px-6 shadow-xl border-r border-yellow-400">
        <div className="text-2xl font-extrabold mb-8 tracking-widest text-yellow-400 text-center">Carnage Dashboard</div>
        <nav className="flex flex-col gap-2 text-lg font-bold">
          {sidebarLinks.map(link => (
            <button
              key={link.label}
              className={`flex items-center gap-3 px-4 py-2 rounded transition text-left ${active === link.label ? "bg-yellow-400 text-black" : "hover:bg-yellow-400 hover:text-black"}`}
              onClick={() => setActive(link.label)}
            >
              <span>{link.icon}</span> {link.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">
        {active === "Dashboard" && <DashboardHome />}
        {active === "Files" && <FilesSection />}
        {active === "Upload" && <UploadSection />}
  {/* FileServiceSection removed */}
        {active === "Knowledge Base" && <KnowledgeBaseSection isAdmin={true} />}
        {active === "Vehicle Data" && <VehicleDataSection />}
        {active === "DTC Search" && <DTCSearchSection />}
      </main>
    </div>
  );
}

export default Dashboard;
