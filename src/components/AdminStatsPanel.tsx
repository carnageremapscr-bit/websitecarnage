"use client";
import React, { useState, useEffect } from "react";
import { FaUsers, FaFileUpload, FaClock, FaPoundSign, FaChartLine, FaTachometerAlt } from "react-icons/fa";

interface StatsData {
  totalUsers: number;
  activeUsers: number;
  totalUploads: number;
  pendingFiles: number;
  completedFiles: number;
  monthlyRevenue: number;
  todayUploads: number;
  averageProcessingTime: number;
}

export default function AdminStatsPanel() {
  const [stats, setStats] = useState<StatsData>({
    totalUsers: 0,
    activeUsers: 0,
    totalUploads: 0,
    pendingFiles: 0,
    completedFiles: 0,
    monthlyRevenue: 0,
    todayUploads: 0,
    averageProcessingTime: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState<Array<{
    description: string;
    timestamp: string;
    type: string;
  }>>([]);

  useEffect(() => {
    fetchStats();
    fetchRecentActivity();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentActivity = async () => {
    try {
      const response = await fetch('/api/admin/recent-activity');
      if (response.ok) {
        const data = await response.json();
        setRecentActivity(data);
      }
    } catch (error) {
      console.error('Error fetching recent activity:', error);
    }
  };

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: FaUsers,
      color: "from-blue-500 to-blue-600",
      change: "+12%",
      changeType: "positive"
    },
    {
      title: "Active Clients",
      value: stats.activeUsers,
      icon: FaUsers,
      color: "from-green-500 to-green-600",
      change: "+8%",
      changeType: "positive"
    },
    {
      title: "Total Files Uploaded",
      value: stats.totalUploads,
      icon: FaFileUpload,
      color: "from-purple-500 to-purple-600",
      change: "+23%",
      changeType: "positive"
    },
    {
      title: "Pending Requests",
      value: stats.pendingFiles,
      icon: FaClock,
      color: "from-yellow-500 to-yellow-600",
      change: stats.pendingFiles > 5 ? "High" : "Normal",
      changeType: stats.pendingFiles > 5 ? "warning" : "neutral"
    },
    {
      title: "Completed This Month",
      value: stats.completedFiles,
      icon: FaChartLine,
      color: "from-indigo-500 to-indigo-600",
      change: "+15%",
      changeType: "positive"
    },
    {
      title: "Monthly Revenue",
      value: `£${stats.monthlyRevenue.toLocaleString()}`,
      icon: FaPoundSign,
      color: "from-emerald-500 to-emerald-600",
      change: "+18%",
      changeType: "positive"
    },
    {
      title: "Today's Uploads",
      value: stats.todayUploads,
      icon: FaTachometerAlt,
      color: "from-orange-500 to-orange-600",
      change: stats.todayUploads > 3 ? "Busy Day" : "Normal",
      changeType: "neutral"
    },
    {
      title: "Avg. Processing Time",
      value: `${stats.averageProcessingTime}h`,
      icon: FaClock,
      color: "from-pink-500 to-pink-600",
      change: "-2h",
      changeType: "positive"
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black text-white mb-2">Admin Dashboard</h1>
        <p className="text-yellow-400 text-xl italic">"Same car, only better."</p>
        <div className="text-gray-400 text-sm mt-2">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className={`bg-gradient-to-r ${card.color} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm font-medium">{card.title}</p>
                  <p className="text-3xl font-bold mt-2">{card.value}</p>
                  <div className="flex items-center mt-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        card.changeType === 'positive'
                          ? 'bg-green-100 text-green-800'
                          : card.changeType === 'warning'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {card.change}
                    </span>
                  </div>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <Icon className="text-2xl" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <FaClock className="text-yellow-400" />
          Recent Activity
        </h2>
        <div className="space-y-3">
          {recentActivity.length > 0 ? (
            recentActivity.slice(0, 10).map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-white">{activity.description}</span>
                </div>
                <span className="text-gray-400 text-sm">{activity.timestamp}</span>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400">No recent activity to display</p>
            </div>
          )}
        </div>
      </div>

      {/* Performance Chart Placeholder */}
      <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <FaChartLine className="text-yellow-400" />
          Performance Overview
        </h2>
        <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
          <p className="text-gray-400">Chart component will be implemented here</p>
        </div>
      </div>
    </div>
  );
}
