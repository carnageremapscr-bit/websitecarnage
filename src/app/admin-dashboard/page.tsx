"use client";
import React, { useState, useEffect } from "react";
import FilesSection from "../../components/FilesSection";
import KnowledgeBaseSection from "../../components/KnowledgeBaseSection";
import DTCSearchSection from "../../components/DTCSearchSection";
import SettingsSection from "../../components/SettingsSection";
import AdminUserManagement from "../../components/AdminUserManagement";
import { useRouter } from "next/navigation";

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
    { label: "Files", icon: "📁" },
    { label: "Users", icon: "👥" },
    { label: "Knowledge Base", icon: "📚" },
    { label: "DTC Codes", icon: "🔍" },
    { label: "Settings", icon: "⚙️" },
  ];
  const [active, setActive] = useState("Files");

  console.log("Rendering AdminDashboard...");
  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      <aside className="hidden md:flex w-64 bg-gray-800 text-yellow-400 flex-col py-8 px-6 shadow-xl border-r border-yellow-400">
        <div className="text-2xl font-extrabold mb-8 tracking-widest text-yellow-400 text-center">Carnage Admin</div>
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
      <main className="flex-1 bg-gray-100 p-6">
        {active === "Files" && <FilesSection isAdmin={true} />}
        {active === "Users" && <AdminUserManagement />}
        {active === "Knowledge Base" && <KnowledgeBaseSection isAdmin={true} />}
        {active === "DTC Codes" && <DTCSearchSection />}
        {active === "Settings" && <SettingsSection isAdmin={true} />}
      </main>
    </div>
  );
}
