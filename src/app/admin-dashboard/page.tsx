
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";



type User = {
  email: string;
  role: string;
};

type Booking = {
  id: number;
  customer: string;
  service: string;
  date: string;
};
interface SiteSettings {
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  businessAddress: string;
  businessLogo: string;
  businessHours: string;
  maintenanceMode: boolean;
  homepageAnnouncement: string;
}

import { useRouter } from "next/navigation";

export default function AdminDashboard() {
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
  // Debug: confirm component renders
  useEffect(() => {
    console.log("AdminDashboard component mounted");
  }, []);
  // Real API data for users and bookings
  const [users, setUsers] = useState<User[] | null>([]);
  const [bookings, setBookings] = useState<Booking[] | null>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("customer");
  const [bookingCustomer, setBookingCustomer] = useState("");
  const [bookingService, setBookingService] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    businessName: "Carnage Remaps",
    businessEmail: "info@carnageremaps.com",
    businessPhone: "+44 1234 567890",
    businessAddress: "123 Remap Lane, Tuning City, UK",
    businessLogo: "",
    businessHours: "Mon-Fri 9am-6pm",
    maintenanceMode: false,
    homepageAnnouncement: "",
  });
  const [settingsLoading, setSettingsLoading] = useState(true);
  const [settingsForm, setSettingsForm] = useState(siteSettings);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const usersRes = await fetch("/api/admin/users");
      const bookingsRes = await fetch("/api/admin/bookings");
      try {
        setUsers(await usersRes.json());
      } catch {
        setUsers(null);
      }
      try {
        setBookings(await bookingsRes.json());
      } catch {
        setBookings(null);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  // Fetch site settings
  useEffect(() => {
    let didCancel = false;
    async function fetchSettings() {
      setSettingsLoading(true);
      let timeout: NodeJS.Timeout | null = null;
      try {
        // Timeout after 7 seconds
        const controller = new AbortController();
        timeout = setTimeout(() => controller.abort(), 7000);
        const res = await fetch("/api/admin/settings", { signal: controller.signal });
        if (!didCancel) {
          if (res.ok) {
            const data = await res.json();
            setSiteSettings(data);
            setSettingsForm(data);
          } else {
            setSiteSettings(siteSettings);
          }
        }
      } catch {
        if (!didCancel) {
          setSiteSettings(siteSettings);
        }
      } finally {
        if (timeout) clearTimeout(timeout);
        if (!didCancel) setSettingsLoading(false);
      }
    }
    fetchSettings();
    return () => { didCancel = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function addUser(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userEmail, role: userRole }),
    });
    setUserEmail("");
    setUserRole("customer");
    // Refresh
    const usersRes = await fetch("/api/admin/users");
    setUsers(await usersRes.json());
  }

  async function deleteUser(email: string) {
    await fetch("/api/admin/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const usersRes = await fetch("/api/admin/users");
    setUsers(await usersRes.json());
  }

  async function addBooking(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/admin/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customer: bookingCustomer, service: bookingService, date: bookingDate }),
    });
    setBookingCustomer("");
    setBookingService("");
    setBookingDate("");
    // Refresh
    const bookingsRes = await fetch("/api/admin/bookings");
    setBookings(await bookingsRes.json());
  }

  async function deleteBooking(id: number) {
    await fetch("/api/admin/bookings", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const bookingsRes = await fetch("/api/admin/bookings");
    setBookings(await bookingsRes.json());
  }

  function handleSettingsChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    let fieldValue: string | boolean = value;
    if (type === "checkbox") {
      fieldValue = (e.target as HTMLInputElement).checked;
    }
    setSettingsForm(prev => ({
      ...prev,
      [name]: fieldValue,
    }));
  }

  async function updateSettings(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settingsForm),
    });
    // Refresh
    const res = await fetch("/api/admin/settings");
    if (res.ok) {
      const data = await res.json();
      setSiteSettings(data);
      setSettingsForm(data);
    }
  }
  // ...existing code...
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
