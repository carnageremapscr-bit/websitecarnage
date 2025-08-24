import React from "react";

const DashboardHome = () => {
  return (
    <section className="p-10">
      <h1 className="text-4xl font-extrabold mb-4 text-black">Welcome to Your Dashboard</h1>
      <p className="text-lg text-gray-700 mb-8">Manage your files, vehicles, and services all in one place.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white rounded-xl shadow border-l-8 border-yellow-400 p-6 flex flex-col items-center">
          <span className="text-2xl font-bold text-yellow-700 mb-2">Files</span>
          <span className="text-gray-700">View and manage your uploaded files</span>
        </div>
        <div className="bg-white rounded-xl shadow border-l-8 border-yellow-400 p-6 flex flex-col items-center">
          <span className="text-2xl font-bold text-yellow-700 mb-2">DTC Search</span>
          <span className="text-gray-700">Look up diagnostic trouble codes</span>
        </div>
      </div>
      <div className="text-gray-600">Use the sidebar to navigate between features.</div>
    </section>
  );
};

export default DashboardHome;
