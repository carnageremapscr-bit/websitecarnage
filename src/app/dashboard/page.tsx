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
import DashboardLayout from "../../components/layout/DashboardLayout";
import { SidebarLink } from "../../components/layout/Sidebar";

const sidebarLinks: SidebarLink[] = [
  { label: "Dashboard", icon: FaHome, color: "text-yellow-400" },
  { label: "Upload File", icon: FaUpload, color: "text-yellow-400" },
  { label: "My Orders", icon: FaShoppingCart, color: "text-yellow-400" },
  { label: "Files", icon: FaFile, color: "text-yellow-400" },
  { label: "Knowledge Base", icon: FaBook, color: "text-yellow-400" },
  { label: "Vehicle Data", icon: FaCar, color: "text-yellow-400" },
  { label: "DTC Search", icon: FaSearch, color: "text-yellow-400" },
];

function Dashboard() {
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
        if (parsed.role === "admin") {
          router.replace("/admin-dashboard");
        }
      } catch (error) {
        console.error("Error parsing user:", error);
        router.replace("/login");
      }
    }
  }, [router]);

  const footer = (
    <div className="text-xs text-gray-700 text-center">
      <div className="font-bold">Customer Portal v2.0</div>
      <div>Carnage Remaps</div>
    </div>
  );

  const backgroundSvg = (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5">
      <svg width="600" height="400" viewBox="0 0 600 400" className="text-yellow-400 fill-current">
        <path d="M50 300 Q 150 150, 250 200 T 550 180" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.3"/>
        <path d="M50 320 Q 150 170, 250 220 T 550 200" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.2"/>
        <text x="300" y="350" textAnchor="middle" className="text-4xl font-bold opacity-10">CARNAGE</text>
      </svg>
    </div>
  );

  return (
    <DashboardLayout
      links={sidebarLinks}
      active={active}
      setActive={setActive}
      title="CARNAGE"
      subtitle="CUSTOMER PORTAL"
      footer={footer}
      backgroundSvg={backgroundSvg}
    >
      {active === "Dashboard" && <DashboardHome />}
      {active === "Upload File" && <UploadSection />}
      {active === "My Orders" && <OrderTrackingSection />}
      {active === "Files" && <FilesSection />}
      {active === "Knowledge Base" && <KnowledgeBaseSection isAdmin={false} />}
      {active === "Vehicle Data" && <VehicleDataSection />}
      {active === "DTC Search" && <DTCSearchSection />}
    </DashboardLayout>
  );
}

export default Dashboard;
