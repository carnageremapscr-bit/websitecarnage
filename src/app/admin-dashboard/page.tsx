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
import DashboardLayout from "../../components/layout/DashboardLayout";
import { SidebarLink } from "../../components/layout/Sidebar";

const sidebarLinks: SidebarLink[] = [
  { label: "Dashboard", icon: FaChartBar, color: "text-yellow-400" },
  { label: "Files", icon: FaFile, color: "text-yellow-400" },
  { label: "Orders", icon: FaShoppingCart, color: "text-yellow-400" },
  { label: "Users", icon: FaUsers, color: "text-yellow-400" },
  { label: "Payments", icon: FaCreditCard, color: "text-yellow-400" },
  { label: "Knowledge Base", icon: FaBook, color: "text-yellow-400" },
  { label: "DTC Codes", icon: FaSearch, color: "text-yellow-400" },
  { label: "Settings", icon: FaCog, color: "text-yellow-400" },
];

export default function AdminDashboard() {
  const [active, setActive] = useState("Dashboard");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("carnage_user");
      if (!user) {
        router.replace("/login");
        return;
      }
      try {
        const parsed = JSON.parse(user);
        if (parsed.role !== "admin") {
          router.replace("/login");
        }
      } catch (error) {
        router.replace("/login");
      }
    }
  }, [router]);

  const footer = (
    <div className="text-xs text-gray-700 text-center">
      <div className="font-bold">Performance Pro Theme</div>
      <div>Admin Dashboard v2.0</div>
    </div>
  );

  const backgroundSvg = (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5">
      <svg width="800" height="600" viewBox="0 0 800 600" className="text-yellow-400 fill-current">
        <path d="M50 400 Q 200 200, 350 300 T 750 250" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.3"/>
        <path d="M50 450 Q 200 250, 350 350 T 750 300" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.2"/>
        <text x="400" y="500" textAnchor="middle" className="text-6xl font-bold opacity-10">CARNAGE REMAPS</text>
      </svg>
    </div>
  );

  return (
    <DashboardLayout
      links={sidebarLinks}
      active={active}
      setActive={setActive}
      title="CARNAGE"
      subtitle="REMAPS"
      footer={footer}
      backgroundSvg={backgroundSvg}
    >
      {active === "Dashboard" && <AdminStatsPanel />}
      {active === "Files" && <FilesSection isAdmin={true} />}
      {active === "Orders" && <AdminOrderManagement />}
      {active === "Users" && <AdminUserManagement />}
      {active === "Payments" && <AdminStripeTransactions />}
      {active === "Knowledge Base" && <KnowledgeBaseSection isAdmin={true} />}
      {active === "DTC Codes" && <DTCSearchSection />}
      {active === "Settings" && <SettingsSection isAdmin={true} />}
    </DashboardLayout>
  );
}
