
"use client";
// (removed duplicate import)
import Image from "next/image";





import React, { useState, useEffect } from "react";
import FilesSection from "../../components/FilesSection";
import KnowledgeBaseSection from "../../components/KnowledgeBaseSection";
import DTCSearchSection from "../../components/DTCSearchSection";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  // Only allow access for admin (redirect logic can be kept)
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
      } catch {
        router.replace("/login");
      }
    }
  }, [router]);

  // Sidebar links for admin
  const sidebarLinks = [
    { label: "Files", icon: "📁" },
    { label: "Knowledge Base", icon: "📚" },
    { label: "DTC Codes", icon: "🔍" },
  ];
  const [active, setActive] = useState("Files");

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
  {active === "Knowledge Base" && <KnowledgeBaseSection />}
  {active === "DTC Codes" && <DTCSearchSection />}
      </main>
    </div>
  );
// End of component
  return (
    <main className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-yellow-400 flex flex-col py-8 px-6 min-h-screen shadow-xl">
        <div className="text-2xl font-extrabold mb-8 tracking-widest text-yellow-400 text-center">Carnage Admin</div>
        <nav className="flex flex-col gap-4 text-lg font-bold">
          <a href="#overview" className="hover:text-yellow-300 transition">Overview</a>
          <a href="#users" className="hover:text-yellow-300 transition">Users</a>
          <a href="#bookings" className="hover:text-yellow-300 transition">Bookings</a>
          <a href="#settings" className="hover:text-yellow-300 transition">Settings</a>
        </nav>
        <div className="mt-auto pt-8 text-xs text-yellow-300 text-center opacity-70">&copy; {new Date().getFullYear()} Carnage Remaps</div>
      </aside>
      {/* Main Content */}
      <section className="flex-1 p-10">
        <h1 className="text-4xl font-extrabold mb-2 text-black">Admin Dashboard</h1>
        <p className="text-lg text-gray-700 mb-8">Manage users, bookings, and site settings.</p>
        {/* Summary Cards */}
        <div id="overview" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow border-l-8 border-yellow-400 p-6 flex flex-col items-center">
            <span className="text-2xl font-bold text-yellow-700 mb-2">{users?.length ?? 0}</span>
            <span className="text-gray-700">Total Users</span>
          </div>
          <div className="bg-white rounded-xl shadow border-l-8 border-yellow-400 p-6 flex flex-col items-center">
            <span className="text-2xl font-bold text-yellow-700 mb-2">{bookings?.length ?? 0}</span>
            <span className="text-gray-700">Total Bookings</span>
          </div>
          <div className="bg-white rounded-xl shadow border-l-8 border-yellow-400 p-6 flex flex-col items-center">
            <span className="text-2xl font-bold text-yellow-700 mb-2">{siteSettings.maintenanceMode ? "ON" : "OFF"}</span>
            <span className="text-gray-700">Maintenance Mode</span>
          </div>
        </div>
        {/* User Management */}
        <div id="users" className="bg-white rounded-2xl shadow-xl border-2 border-yellow-200 p-8 mb-10">
          <h2 className="text-2xl font-bold text-yellow-700 mb-4 flex items-center gap-2">Users</h2>
          {loading ? <p>Loading...</p>
            : users === null ? <p className="text-red-600">Failed to load users.</p>
            : <>
              <table className="w-full text-left mb-4">
                <thead>
                  <tr className="bg-yellow-100">
                    <th className="py-2 px-3">Email</th>
                    <th className="py-2 px-3">Role</th>
                    <th className="py-2 px-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.email} className="border-b last:border-b-0">
                      <td className="py-2 px-3">{u.email}</td>
                      <td className="py-2 px-3 capitalize">{u.role}</td>
                      <td className="py-2 px-3">
                        <button type="button" onClick={() => deleteUser(u.email)} className="text-xs text-red-600 hover:underline">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <form className="flex flex-col md:flex-row gap-2 mt-2" onSubmit={addUser}>
                <input type="email" placeholder="Email" value={userEmail} onChange={e => setUserEmail(e.target.value)} className="px-2 py-1 rounded border border-yellow-300 flex-1" required />
                <select aria-label="User Role" value={userRole} onChange={e => setUserRole(e.target.value)} className="px-2 py-1 rounded border border-yellow-300">
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </select>
                <button type="submit" className="bg-yellow-400 text-white rounded px-3 py-1 font-bold">Add User</button>
              </form>
            </>
          }
        </div>
        {/* Bookings Management */}
        <div id="bookings" className="bg-white rounded-2xl shadow-xl border-2 border-yellow-200 p-8 mb-10">
          <h2 className="text-2xl font-bold text-yellow-700 mb-4 flex items-center gap-2">Bookings</h2>
          {loading ? <p>Loading...</p>
            : bookings === null ? <p className="text-red-600">Failed to load bookings.</p>
            : <>
              <table className="w-full text-left mb-4">
                <thead>
                  <tr className="bg-yellow-100">
                    <th className="py-2 px-3">Date</th>
                    <th className="py-2 px-3">Customer</th>
                    <th className="py-2 px-3">Service</th>
                    <th className="py-2 px-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id} className="border-b last:border-b-0">
                      <td className="py-2 px-3">{b.date}</td>
                      <td className="py-2 px-3">{b.customer}</td>
                      <td className="py-2 px-3">{b.service}</td>
                      <td className="py-2 px-3">
                        <button type="button" onClick={() => deleteBooking(b.id)} className="text-xs text-red-600 hover:underline">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <form className="flex flex-col md:flex-row gap-2 mt-2" onSubmit={addBooking}>
                <input type="text" placeholder="Customer Email" value={bookingCustomer} onChange={e => setBookingCustomer(e.target.value)} className="px-2 py-1 rounded border border-yellow-300 flex-1" required />
                <input type="text" placeholder="Service" value={bookingService} onChange={e => setBookingService(e.target.value)} className="px-2 py-1 rounded border border-yellow-300 flex-1" required />
                <input type="date" placeholder="Date" value={bookingDate} onChange={e => setBookingDate(e.target.value)} className="px-2 py-1 rounded border border-yellow-300 flex-1" required />
                <button type="submit" className="bg-yellow-400 text-white rounded px-3 py-1 font-bold">Add Booking</button>
              </form>
            </>
          }
        </div>
        {/* Site Settings */}
        <div id="settings" className="bg-white rounded-2xl shadow-xl border-2 border-yellow-200 p-8 mb-10">
          <h2 className="text-2xl font-bold text-yellow-700 mb-4 flex items-center gap-2">Site Settings</h2>
          {settingsLoading ? <p>Loading site settings...</p> : !siteSettings ? (
            <p className="text-red-600">Failed to load site settings. Please try again later.</p>
          ) : <>
            <form className="flex flex-col gap-2 mt-2 text-left" onSubmit={updateSettings}>
              <label className="font-semibold">Business Name
                <input type="text" name="businessName" value={settingsForm.businessName} onChange={handleSettingsChange} className="px-2 py-1 rounded border border-yellow-300 w-full" required />
              </label>
              <label className="font-semibold">Email
                <input type="email" name="businessEmail" value={settingsForm.businessEmail} onChange={handleSettingsChange} className="px-2 py-1 rounded border border-yellow-300 w-full" required />
              </label>
              <label className="font-semibold">Phone
                <input type="text" name="businessPhone" value={settingsForm.businessPhone} onChange={handleSettingsChange} className="px-2 py-1 rounded border border-yellow-300 w-full" required />
              </label>
              <label className="font-semibold">Address
                <input type="text" name="businessAddress" value={settingsForm.businessAddress} onChange={handleSettingsChange} className="px-2 py-1 rounded border border-yellow-300 w-full" required />
              </label>
              <label className="font-semibold">Business Hours
                <input type="text" name="businessHours" value={settingsForm.businessHours} onChange={handleSettingsChange} className="px-2 py-1 rounded border border-yellow-300 w-full" required />
              </label>
              <label className="font-semibold">Homepage Announcement
                <textarea name="homepageAnnouncement" value={settingsForm.homepageAnnouncement} onChange={handleSettingsChange} className="px-2 py-1 rounded border border-yellow-300 w-full" rows={2} />
              </label>
              <label className="font-semibold flex items-center gap-2">Maintenance Mode
                <input type="checkbox" name="maintenanceMode" checked={settingsForm.maintenanceMode} onChange={handleSettingsChange} />
              </label>
              <label className="font-semibold">Business Logo URL
                <input type="text" name="businessLogo" value={settingsForm.businessLogo} onChange={handleSettingsChange} className="px-2 py-1 rounded border border-yellow-300 w-full" />
              </label>
              {settingsForm.businessLogo && (
                <div className="h-16 w-auto mx-auto my-2 relative max-w-32">
                  <Image src={settingsForm.businessLogo} alt="Business Logo" fill style={{ objectFit: "contain" }} />
                </div>
              )}
              <button type="submit" className="bg-yellow-400 text-white rounded px-3 py-1 font-bold mt-1">Save Settings</button>
            </form>
          </>}
        </div>
      </section>
    </main>
  );
}
