
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Head from "next/head";

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

export default function AdminDashboard() {
  // Real API data for users and bookings
  const [users, setUsers] = useState<User[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
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
      setUsers(await usersRes.json());
      setBookings(await bookingsRes.json());
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
      } catch (err) {
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
    <>
      <Head>
        <title>Admin Dashboard | Carnage Remaps</title>
      </Head>
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-yellow-100">
        <div className="bg-white/90 rounded-2xl shadow-xl border-2 border-yellow-400 p-8 w-full max-w-2xl">
          <h1 className="text-3xl font-extrabold mb-6 text-black text-center">Admin Dashboard</h1>
          <p className="text-lg text-gray-700 mb-4 text-center">Manage users, view bookings, and oversee remap operations.</p>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {/* User Management */}
            <div className="bg-yellow-100 rounded-xl p-6 shadow text-center">
              <h2 className="font-bold text-yellow-700 mb-2">User Management</h2>
              {loading ? <p>Loading...</p> : <>
                <ul className="text-gray-700 text-left text-sm max-h-32 overflow-y-auto mb-2">
                  {users.map((u, i) => (
                    <li key={i} className="mb-1 flex justify-between items-center">
                      <span>{u.email} <span className="text-xs text-gray-500">({u.role})</span></span>
                      <button onClick={() => deleteUser(u.email)} className="ml-2 text-xs text-red-600 hover:underline">Delete</button>
                    </li>
                  ))}
                </ul>
                <form className="flex flex-col gap-2 mt-2" onSubmit={addUser}>
                  <input type="email" placeholder="Email" value={userEmail} onChange={e => setUserEmail(e.target.value)} className="px-2 py-1 rounded border border-yellow-300" required />
                  <label className="sr-only" htmlFor="userRoleSelect">Role</label>
                  <select id="userRoleSelect" aria-label="User Role" value={userRole} onChange={e => setUserRole(e.target.value)} className="px-2 py-1 rounded border border-yellow-300">
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button type="submit" className="bg-yellow-400 text-white rounded px-3 py-1 font-bold mt-1">Add User</button>
                </form>
              </>}
            </div>
            {/* Bookings Overview */}
            <div className="bg-yellow-100 rounded-xl p-6 shadow text-center">
              <h2 className="font-bold text-yellow-700 mb-2">Bookings Overview</h2>
              {loading ? <p>Loading...</p> : <>
                <ul className="text-gray-700 text-left text-sm max-h-32 overflow-y-auto mb-2">
                  {bookings.map((b) => (
                    <li key={b.id} className="mb-1 flex justify-between items-center">
                      <span>{b.date}: {b.customer} - {b.service}</span>
                      <button onClick={() => deleteBooking(b.id)} className="ml-2 text-xs text-red-600 hover:underline">Delete</button>
                    </li>
                  ))}
                </ul>
                <form className="flex flex-col gap-2 mt-2" onSubmit={addBooking}>
                  <input type="text" placeholder="Customer Email" value={bookingCustomer} onChange={e => setBookingCustomer(e.target.value)} className="px-2 py-1 rounded border border-yellow-300" required />
                  <input type="text" placeholder="Service" value={bookingService} onChange={e => setBookingService(e.target.value)} className="px-2 py-1 rounded border border-yellow-300" required />
                  <input type="date" placeholder="Date" value={bookingDate} onChange={e => setBookingDate(e.target.value)} className="px-2 py-1 rounded border border-yellow-300" required />
                  <button type="submit" className="bg-yellow-400 text-white rounded px-3 py-1 font-bold mt-1">Add Booking</button>
                </form>
              </>}
            </div>
            {/* Remap Operations */}
            <div className="bg-yellow-100 rounded-xl p-6 shadow text-center">
              <h2 className="font-bold text-yellow-700 mb-2">Remap Operations</h2>
              <ul className="text-gray-700 text-left text-sm max-h-32 overflow-y-auto mb-2">
                {bookings.map((b) => (
                  <li key={b.id} className="mb-1">
                    {b.date}: {b.customer} - {b.service}
                  </li>
                ))}
                {bookings.length === 0 && <li className="text-gray-500">No remap jobs yet.</li>}
              </ul>
            </div>
            {/* Site Settings */}
            <div className="bg-yellow-100 rounded-xl p-6 shadow text-center">
              <h2 className="font-bold text-yellow-700 mb-2">Site Settings</h2>
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
          </div>
        </div>
      </main>
    </>
// ...existing code...
}
