"use client";
import React, { useState, useEffect } from "react";
import { apiFetch } from "@/utils/apiFetch";



type User = { email: string; role: string; credit?: number };
type FileRow = { filename?: string; customer?: string; reviewed?: boolean; vehicle?: string; reg?: string; status?: string };
type Booking = { id: number; customer: string; service: string; date: string; status: string };
type Settings = { businessName: string; businessEmail: string; businessPhone: string; businessAddress: string; businessLogo: string; businessHours: string; maintenanceMode: boolean; homepageAnnouncement: string };


export default function AdminPage() {
  // Vehicle data state for editable dropdown
  const [vehicles, setVehicles] = useState([
    { make: 'VW', model: 'Golf', engine: '2.0 TSI', stockBhp: '245', stockNm: '370', stage1: '300/420', stage2: '340/480', stage3: '380/520' },
    { make: 'BMW', model: 'M140i', engine: '3.0 B58', stockBhp: '340', stockNm: '500', stage1: '410/600', stage2: '450/650', stage3: '500/700' },
  ]);
  const handleAddVehicle = (v) => setVehicles(vehicles => [...vehicles, v]);
  const handleUpdateVehicle = (idx, v) => setVehicles(vehicles => vehicles.map((veh, i) => i === idx ? v : veh));
  const handleDeleteVehicle = (idx) => setVehicles(vehicles => vehicles.filter((_, i) => i !== idx));
  const sidebarLinks = [
    { label: "Dashboard", icon: "🛡️" },
    { label: "Users", icon: "👥" },
    { label: "Files", icon: "📁" },
    { label: "Bookings", icon: "📅" },
    { label: "Settings", icon: "⚙️" },
    { label: "Upload", icon: "⬆️" },
    { label: "Vehicle Data", icon: "🚗" },
    { label: "Invoices", icon: "🧾" },
    { label: "Marketing Tools", icon: "📈" },
    { label: "Knowledge Base", icon: "📚" },
    { label: "DTC Search", icon: "🔍" },
    { label: "File Service", icon: "🛠️" },
  ];
  const [active, setActive] = useState("Dashboard");
  // Users
  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);
  // Files
  const [fileRows, setFileRows] = useState<FileRow[]>([]);
  const [fileLoading, setFileLoading] = useState(true);
  // Bookings
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  // Settings
  const [settings, setSettings] = useState<Settings | null>(null);
  const [settingsLoading, setSettingsLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      setUsersLoading(true);
      try {
        const res = await apiFetch("/api/admin/users");
        if (res.ok) setUsers(await res.json());
      } catch {}
      setUsersLoading(false);
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    async function fetchFiles() {
      setFileLoading(true);
      try {
        const res = await apiFetch("/api/admin/uploads");
        if (res.ok) setFileRows(await res.json());
      } catch {}
      setFileLoading(false);
    }
    fetchFiles();
    interval = setInterval(fetchFiles, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetchBookings() {
      setBookingsLoading(true);
      try {
        const res = await apiFetch("/api/admin/bookings");
        if (res.ok) setBookings(await res.json());
      } catch {}
      setBookingsLoading(false);
    }
    fetchBookings();
  }, []);

  useEffect(() => {
    async function fetchSettings() {
      setSettingsLoading(true);
      try {
        const res = await apiFetch("/api/admin/settings");
        if (res.ok) setSettings(await res.json());
      } catch {}
      setSettingsLoading(false);
    }
    fetchSettings();
  }, []);


  // --- Section: Users ---
  function UsersSection() {
    const [newUser, setNewUser] = useState({ email: '', role: 'client', credit: 0 });
    const [adding, setAdding] = useState(false);
    const [error, setError] = useState('');
    async function addUser(e: React.FormEvent) {
      e.preventDefault();
      setAdding(true);
      setError('');
      try {
        const res = await apiFetch('/api/admin/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser),
        });
        if (!res.ok) throw new Error('Failed to add user');
        setNewUser({ email: '', role: 'client', credit: 0 });
        // Refresh users
        const res2 = await apiFetch('/api/admin/users');
        if (res2.ok) setUsers(await res2.json());
      } catch (err) {
        setError('Could not add user');
      }
      setAdding(false);
    }
    async function updateCredit(email: string, credit: number) {
      await apiFetch('/api/admin/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, credit }),
      });
      const res = await apiFetch('/api/admin/users');
      if (res.ok) setUsers(await res.json());
    }
    async function deleteUser(email: string) {
      await apiFetch('/api/admin/users', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const res = await apiFetch('/api/admin/users');
      if (res.ok) setUsers(await res.json());
    }
    return (
      <section className="p-10">
        <h2 className="text-3xl font-bold text-yellow-700 mb-6">Users</h2>
        {usersLoading ? <div>Loading users...</div> : (
          <table className="min-w-full text-sm bg-white rounded-xl shadow border border-yellow-200 mb-4">
            <thead className="bg-yellow-100">
              <tr>
                <th className="py-2 px-3">Email</th>
                <th className="py-2 px-3">Role</th>
                <th className="py-2 px-3">Credit</th>
                <th className="py-2 px-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.email} className="border-b last:border-b-0">
                  <td className="py-2 px-3">{u.email}</td>
                  <td className="py-2 px-3">{u.role}</td>
                  <td className="py-2 px-3">
                    <input
                      type="number"
                      value={u.credit ?? 0}
                      min={0}
                      className="border rounded px-2 py-1 w-20"
                      onChange={e => updateCredit(u.email, Number(e.target.value))}
                    />
                  </td>
                  <td className="py-2 px-3">
                    <button className="text-xs text-red-600 hover:underline" onClick={() => deleteUser(u.email)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <form className="flex flex-col md:flex-row gap-2 mt-2" onSubmit={addUser}>
          <input type="email" placeholder="Email" value={newUser.email} onChange={e => setNewUser(u => ({ ...u, email: e.target.value }))} className="px-2 py-1 rounded border border-yellow-300 flex-1" required />
          <select value={newUser.role} onChange={e => setNewUser(u => ({ ...u, role: e.target.value }))} className="px-2 py-1 rounded border border-yellow-300 flex-1">
            <option value="client">Client</option>
            <option value="admin">Admin</option>
          </select>
          <input type="number" placeholder="Credit" value={newUser.credit} min={0} onChange={e => setNewUser(u => ({ ...u, credit: Number(e.target.value) }))} className="px-2 py-1 rounded border border-yellow-300 flex-1" />
          <button type="submit" className="bg-yellow-400 text-white rounded px-3 py-1 font-bold" disabled={adding}>Add User</button>
        </form>
        {error && <div className="text-red-600 mt-2">{error}</div>}
      </section>
    );
  }


    // --- Section: Files ---
    function FilesSection() {
      return (
        <section className="p-10">
          <h2 className="text-3xl font-bold text-yellow-700 mb-6">Files</h2>
          {fileLoading ? <div>Loading files...</div> : (
            <table className="min-w-full text-sm bg-white rounded-xl shadow border border-yellow-200">
              <thead className="bg-yellow-100">
                <tr>
                  <th className="py-2 px-3">Filename</th>
                  <th className="py-2 px-3">Customer</th>
                  <th className="py-2 px-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {fileRows.map((row) => (
                  <tr key={`${row.filename || "unknown"}${row.customer}`} className="border-b last:border-b-0">
                    <td className="py-2 px-3">{row.filename || row.vehicle || "-"}</td>
                    <td className="py-2 px-3">{row.customer || "-"}</td>
                    <td className={`py-2 px-3 font-bold ${row.reviewed ? "text-green-700" : "text-yellow-700"}`}>{row.reviewed ? "Reviewed" : "Pending"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      );
    }

    // --- Section: Bookings ---
    function BookingsSection() {
      const [newBooking, setNewBooking] = useState({ customer: "", service: "", date: "" });
      async function addBooking(e: React.FormEvent) {
        e.preventDefault();
        await apiFetch("/api/admin/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newBooking),
        });
        setNewBooking({ customer: "", service: "", date: "" });
        // Refresh bookings
        const res = await apiFetch("/api/admin/bookings");
        if (res.ok) setBookings(await res.json());
      }
      async function deleteBooking(id: number) {
        await apiFetch("/api/admin/bookings", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
        // Refresh bookings
        const res = await apiFetch("/api/admin/bookings");
        if (res.ok) setBookings(await res.json());
      }
      return (
        <section className="p-10">
          <h2 className="text-3xl font-bold text-yellow-700 mb-6">Bookings</h2>
          {bookingsLoading ? <div>Loading bookings...</div> : (
            <>
              <table className="min-w-full text-sm bg-white rounded-xl shadow border border-yellow-200 mb-4">
                <thead className="bg-yellow-100">
                  <tr>
                    <th className="py-2 px-3">ID</th>
                    <th className="py-2 px-3">Customer</th>
                    <th className="py-2 px-3">Service</th>
                    <th className="py-2 px-3">Date</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id} className="border-b last:border-b-0">
                      <td className="py-2 px-3">{b.id}</td>
                      <td className="py-2 px-3">{b.customer}</td>
                      <td className="py-2 px-3">{b.service}</td>
                      <td className="py-2 px-3">{b.date}</td>
                      <td className="py-2 px-3">{b.status}</td>
                      <td className="py-2 px-3">
                        <button onClick={() => deleteBooking(b.id)} className="text-xs text-red-600 hover:underline">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <form className="flex flex-col md:flex-row gap-2 mt-2" onSubmit={addBooking}>
                <input type="text" placeholder="Customer Email" value={newBooking.customer} onChange={e => setNewBooking(b => ({ ...b, customer: e.target.value }))} className="px-2 py-1 rounded border border-yellow-300 flex-1" required />
                <input type="text" placeholder="Service" value={newBooking.service} onChange={e => setNewBooking(b => ({ ...b, service: e.target.value }))} className="px-2 py-1 rounded border border-yellow-300 flex-1" required />
                <input type="date" placeholder="Date" value={newBooking.date} onChange={e => setNewBooking(b => ({ ...b, date: e.target.value }))} className="px-2 py-1 rounded border border-yellow-300 flex-1" required />
                <button type="submit" className="bg-yellow-400 text-white rounded px-3 py-1 font-bold">Add Booking</button>
              </form>
            </>
          )}
        </section>
      );
    }

    // --- Section: Settings ---
    function SettingsSection() {
      return (
        <section className="p-10">
          <h2 className="text-3xl font-bold text-yellow-700 mb-6">Settings</h2>
          {settingsLoading ? <div>Loading settings...</div> : settings && (
            <div className="bg-white rounded-xl shadow border border-yellow-200 p-6 max-w-xl">
              <div className="mb-2"><b>Business Name:</b> {settings.businessName}</div>
              <div className="mb-2"><b>Email:</b> {settings.businessEmail}</div>
              <div className="mb-2"><b>Phone:</b> {settings.businessPhone}</div>
              <div className="mb-2"><b>Address:</b> {settings.businessAddress}</div>
              <div className="mb-2"><b>Business Hours:</b> {settings.businessHours}</div>
              <div className="mb-2"><b>Maintenance Mode:</b> {settings.maintenanceMode ? "ON" : "OFF"}</div>
              <div className="mb-2"><b>Homepage Announcement:</b> {settings.homepageAnnouncement}</div>
            </div>
          )}
        </section>
      );
    }

    // --- Section: Upload ---
    function UploadSection() {
      return (
        <section className="p-10">
          <h2 className="text-3xl font-bold text-yellow-700 mb-6">Upload File</h2>
          <div className="text-gray-700">(File upload form coming soon)</div>
        </section>
      );
    }

    // --- Section: Invoices ---
    function InvoicesSection() {
      return (
        <section className="p-10">
          <h2 className="text-3xl font-bold text-yellow-700 mb-6">Invoices</h2>
          <div className="text-gray-700">(Invoices management coming soon)</div>
        </section>
      );
    }

    // --- Section: Marketing Tools ---
    function MarketingToolsSection() {
      return (
        <section className="p-10">
          <h2 className="text-3xl font-bold text-yellow-700 mb-6">Marketing Tools</h2>
          <div className="text-gray-700">(Marketing tools coming soon)</div>
        </section>
      );
    }

    // --- Section: Knowledge Base ---
    function KnowledgeBaseSection() {
      return (
        <section className="p-10">
          <h2 className="text-3xl font-bold text-yellow-700 mb-6">Knowledge Base</h2>
          <div className="text-gray-700">(Knowledge base coming soon)</div>
        </section>
      );
    }

    // --- Section: DTC Search ---
    function DTCSearchSection() {
      return (
        <section className="p-10">
          <h2 className="text-3xl font-bold text-yellow-700 mb-6">DTC Search</h2>
          <div className="text-gray-700">(DTC code search coming soon)</div>
        </section>
      );
    }

    // --- Section: File Service ---
    function FileServiceSection() {
      return (
        <section className="p-10">
          <h2 className="text-3xl font-bold text-yellow-700 mb-6">File Service</h2>
          <div className="text-gray-700">(File service status and queue coming soon)</div>
        </section>
      );
    }

    // --- Section: Dashboard Home ---
    function DashboardHome() {
      return (
        <section className="p-10">
          <h2 className="text-3xl font-bold text-yellow-700 mb-6">Dashboard</h2>
          <div className="text-gray-700">(Dashboard summary coming soon)</div>
        </section>
      );
    }

  // --- Section: Files ---
  function FilesSection() {
    return (
      <section className="p-10">
        <h2 className="text-3xl font-bold text-yellow-700 mb-6">Files</h2>
        {fileLoading ? <div>Loading files...</div> : (
          <table className="min-w-full text-sm bg-white rounded-xl shadow border border-yellow-200">
            <thead className="bg-yellow-100">
              <tr>
                <th className="py-2 px-3">Filename</th>
                <th className="py-2 px-3">Customer</th>
                <th className="py-2 px-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {fileRows.map((row) => (
                <tr key={`${row.filename || "unknown"}${row.customer}`} className="border-b last:border-b-0">
                  <td className="py-2 px-3">{row.filename || row.vehicle || "-"}</td>
                  <td className="py-2 px-3">{row.customer || "-"}</td>
                  <td className={`py-2 px-3 font-bold ${row.reviewed ? "text-green-700" : "text-yellow-700"}`}>{row.reviewed ? "Reviewed" : "Pending"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    );
  }

  // --- Section: Bookings ---
  function BookingsSection() {
    const [newBooking, setNewBooking] = useState({ customer: "", service: "", date: "" });
    async function addBooking(e: React.FormEvent) {
      e.preventDefault();
  await apiFetch("/api/admin/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBooking),
      });
      setNewBooking({ customer: "", service: "", date: "" });
      // Refresh bookings
  const res = await apiFetch("/api/admin/bookings");
      if (res.ok) setBookings(await res.json());
    }
    async function deleteBooking(id: number) {
  await apiFetch("/api/admin/bookings", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      // Refresh bookings
  const res = await apiFetch("/api/admin/bookings");
      if (res.ok) setBookings(await res.json());
    }
    return (
      <section className="p-10">
        <h2 className="text-3xl font-bold text-yellow-700 mb-6">Bookings</h2>
        {bookingsLoading ? <div>Loading bookings...</div> : (
          <>
            <table className="min-w-full text-sm bg-white rounded-xl shadow border border-yellow-200 mb-4">
              <thead className="bg-yellow-100">
                <tr>
                  <th className="py-2 px-3">ID</th>
                  <th className="py-2 px-3">Customer</th>
                  <th className="py-2 px-3">Service</th>
                  <th className="py-2 px-3">Date</th>
                  <th className="py-2 px-3">Status</th>
                  <th className="py-2 px-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-b last:border-b-0">
                    <td className="py-2 px-3">{b.id}</td>
                    <td className="py-2 px-3">{b.customer}</td>
                    <td className="py-2 px-3">{b.service}</td>
                    <td className="py-2 px-3">{b.date}</td>
                    <td className="py-2 px-3">{b.status}</td>
                    <td className="py-2 px-3">
                      <button onClick={() => deleteBooking(b.id)} className="text-xs text-red-600 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <form className="flex flex-col md:flex-row gap-2 mt-2" onSubmit={addBooking}>
              <input type="text" placeholder="Customer Email" value={newBooking.customer} onChange={e => setNewBooking(b => ({ ...b, customer: e.target.value }))} className="px-2 py-1 rounded border border-yellow-300 flex-1" required />
              <input type="text" placeholder="Service" value={newBooking.service} onChange={e => setNewBooking(b => ({ ...b, service: e.target.value }))} className="px-2 py-1 rounded border border-yellow-300 flex-1" required />
              <input type="date" placeholder="Date" value={newBooking.date} onChange={e => setNewBooking(b => ({ ...b, date: e.target.value }))} className="px-2 py-1 rounded border border-yellow-300 flex-1" required />
              <button type="submit" className="bg-yellow-400 text-white rounded px-3 py-1 font-bold">Add Booking</button>
            </form>
          </>
        )}
      </section>
    );
  }

  // --- Section: Settings ---
  function SettingsSection() {
    return (
      <section className="p-10">
        <h2 className="text-3xl font-bold text-yellow-700 mb-6">Settings</h2>
        {settingsLoading ? <div>Loading settings...</div> : settings && (
          <div className="bg-white rounded-xl shadow border border-yellow-200 p-6 max-w-xl">
            <div className="mb-2"><b>Business Name:</b> {settings.businessName}</div>
            <div className="mb-2"><b>Email:</b> {settings.businessEmail}</div>
            <div className="mb-2"><b>Phone:</b> {settings.businessPhone}</div>
            <div className="mb-2"><b>Address:</b> {settings.businessAddress}</div>
            <div className="mb-2"><b>Business Hours:</b> {settings.businessHours}</div>
            <div className="mb-2"><b>Maintenance Mode:</b> {settings.maintenanceMode ? "ON" : "OFF"}</div>
            <div className="mb-2"><b>Homepage Announcement:</b> {settings.homepageAnnouncement}</div>
          </div>
        )}
      </section>
    );
  }

  // --- Section: Upload ---
  function UploadSection() {
    return (
      <section className="p-10">
        <h2 className="text-3xl font-bold text-yellow-700 mb-6">Upload File</h2>
        <div className="text-gray-700">(File upload form coming soon)</div>
      </section>
    );
  }

  // --- Section: Vehicle Data ---
  function VehicleDataSection({ vehicles, onAdd, onUpdate, onDelete }) {
    const [editing, setEditing] = useState<number | null>(null);
    const [newVehicle, setNewVehicle] = useState({
      make: '', model: '', engine: '', stockBhp: '', stockNm: '', stage1: '', stage2: '', stage3: ''
    });
    const [editVehicle, setEditVehicle] = useState({ ...newVehicle });

    return (
      <section className="p-10">
        <h2 className="text-3xl font-bold text-yellow-700 mb-6">Vehicle Data</h2>
        <table className="min-w-full text-sm bg-white rounded-xl shadow border border-yellow-200 mb-4">
          <thead className="bg-yellow-100">
            <tr>
              <th className="py-2 px-3">Make</th>
              <th className="py-2 px-3">Model</th>
              <th className="py-2 px-3">Engine</th>
              <th className="py-2 px-3">Stock BHP</th>
              <th className="py-2 px-3">Stock Nm</th>
              <th className="py-2 px-3">Stage 1</th>
              <th className="py-2 px-3">Stage 2</th>
              <th className="py-2 px-3">Stage 3</th>
              <th className="py-2 px-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v, idx) => (
              <tr key={idx} className="border-b last:border-b-0">
                {editing === idx ? (
                  <>
                    <td><input value={editVehicle.make} onChange={e => setEditVehicle(ev => ({ ...ev, make: e.target.value }))} className="border rounded px-2 py-1 w-24" /></td>
                    <td><input value={editVehicle.model} onChange={e => setEditVehicle(ev => ({ ...ev, model: e.target.value }))} className="border rounded px-2 py-1 w-24" /></td>
                    <td><input value={editVehicle.engine} onChange={e => setEditVehicle(ev => ({ ...ev, engine: e.target.value }))} className="border rounded px-2 py-1 w-24" /></td>
                    <td><input value={editVehicle.stockBhp} onChange={e => setEditVehicle(ev => ({ ...ev, stockBhp: e.target.value }))} className="border rounded px-2 py-1 w-16" /></td>
                    <td><input value={editVehicle.stockNm} onChange={e => setEditVehicle(ev => ({ ...ev, stockNm: e.target.value }))} className="border rounded px-2 py-1 w-16" /></td>
                    <td><input value={editVehicle.stage1} onChange={e => setEditVehicle(ev => ({ ...ev, stage1: e.target.value }))} className="border rounded px-2 py-1 w-16" /></td>
                    <td><input value={editVehicle.stage2} onChange={e => setEditVehicle(ev => ({ ...ev, stage2: e.target.value }))} className="border rounded px-2 py-1 w-16" /></td>
                    <td><input value={editVehicle.stage3} onChange={e => setEditVehicle(ev => ({ ...ev, stage3: e.target.value }))} className="border rounded px-2 py-1 w-16" /></td>
                    <td>
                      <button className="bg-yellow-400 text-white rounded px-2 py-1 mr-2" onClick={() => { onUpdate(idx, editVehicle); setEditing(null); }}>Save</button>
                      <button className="bg-gray-300 rounded px-2 py-1" onClick={() => setEditing(null)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{v.make}</td>
                    <td>{v.model}</td>
                    <td>{v.engine}</td>
                    <td>{v.stockBhp}</td>
                    <td>{v.stockNm}</td>
                    <td>{v.stage1}</td>
                    <td>{v.stage2}</td>
                    <td>{v.stage3}</td>
                    <td>
                      <button className="bg-yellow-400 text-white rounded px-2 py-1 mr-2" onClick={() => { setEditing(idx); setEditVehicle(v); }}>Edit</button>
                      <button className="bg-red-400 text-white rounded px-2 py-1" onClick={() => onDelete(idx)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
            <tr>
              <td><input value={newVehicle.make} onChange={e => setNewVehicle(v => ({ ...v, make: e.target.value }))} className="border rounded px-2 py-1 w-24" placeholder="Make" /></td>
              <td><input value={newVehicle.model} onChange={e => setNewVehicle(v => ({ ...v, model: e.target.value }))} className="border rounded px-2 py-1 w-24" placeholder="Model" /></td>
              <td><input value={newVehicle.engine} onChange={e => setNewVehicle(v => ({ ...v, engine: e.target.value }))} className="border rounded px-2 py-1 w-24" placeholder="Engine" /></td>
              <td><input value={newVehicle.stockBhp} onChange={e => setNewVehicle(v => ({ ...v, stockBhp: e.target.value }))} className="border rounded px-2 py-1 w-16" placeholder="BHP" /></td>
              <td><input value={newVehicle.stockNm} onChange={e => setNewVehicle(v => ({ ...v, stockNm: e.target.value }))} className="border rounded px-2 py-1 w-16" placeholder="Nm" /></td>
              <td><input value={newVehicle.stage1} onChange={e => setNewVehicle(v => ({ ...v, stage1: e.target.value }))} className="border rounded px-2 py-1 w-16" placeholder="Stage 1" /></td>
              <td><input value={newVehicle.stage2} onChange={e => setNewVehicle(v => ({ ...v, stage2: e.target.value }))} className="border rounded px-2 py-1 w-16" placeholder="Stage 2" /></td>
              <td><input value={newVehicle.stage3} onChange={e => setNewVehicle(v => ({ ...v, stage3: e.target.value }))} className="border rounded px-2 py-1 w-16" placeholder="Stage 3" /></td>
              <td>
                <button className="bg-green-500 text-white rounded px-2 py-1" onClick={() => { onAdd(newVehicle); setNewVehicle({ make: '', model: '', engine: '', stockBhp: '', stockNm: '', stage1: '', stage2: '', stage3: '' }); }}>Add</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    );
  }

  // --- Section: Invoices ---
  function InvoicesSection() {
    return (
      <section className="p-10">
        <h2 className="text-3xl font-bold text-yellow-700 mb-6">Invoices</h2>
        <div className="text-gray-700">(Invoices management coming soon)</div>
      </section>
    );
  }

  // --- Section: Marketing Tools ---

  // --- Section: Knowledge Base ---
  function KnowledgeBaseSection() {
    return (
      <section className="p-10">
        <h2 className="text-3xl font-bold text-yellow-700 mb-6">Knowledge Base</h2>
        <div className="text-gray-700">(Knowledge base coming soon)</div>
      </section>
    );
  }

  // --- Section: DTC Search ---
  function DTCSearchSection() {
    return (
      <section className="p-10">
        <h2 className="text-3xl font-bold text-yellow-700 mb-6">DTC Search</h2>
        <div className="text-gray-700">(DTC code search coming soon)</div>
      </section>
    );
  }

  // --- Section: File Service ---
  function FileServiceSection() {
    return (
      <section className="p-10">
        <h2 className="text-3xl font-bold text-yellow-700 mb-6">File Service</h2>
        <div className="text-gray-700">(File service status and queue coming soon)</div>
      </section>
    );
  }

  // --- Main Render ---
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-black via-gray-900 to-yellow-100">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-yellow-400 flex flex-col py-8 px-6 min-h-screen shadow-xl border-r-2 border-yellow-400">
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
        <div className="mt-auto pt-8 text-xs text-yellow-300 text-center opacity-70">&copy; {new Date().getFullYear()} Carnage Remaps</div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gradient-to-br from-gray-100 via-yellow-50 to-yellow-200 min-h-screen p-0">
        <div className="max-w-7xl mx-auto">
          {active === "Dashboard" && <DashboardHome />}
          {active === "Users" && <UsersSection />}
          {active === "Files" && <FilesSection />}
          {active === "Bookings" && <BookingsSection />}
          {active === "Settings" && <SettingsSection />}
          {active === "Upload" && <UploadSection />}
          {active === "Vehicle Data" && (
            <VehicleDataSection
              vehicles={vehicles}
              onAdd={handleAddVehicle}
              onUpdate={handleUpdateVehicle}
              onDelete={handleDeleteVehicle}
            />
          )}
          {active === "Invoices" && <InvoicesSection />}
          {active === "Marketing Tools" && <MarketingToolsSection />}
          {active === "Knowledge Base" && <KnowledgeBaseSection />}
          {active === "DTC Search" && <DTCSearchSection />}
          {active === "File Service" && <FileServiceSection />}
        </div>
      </main>
    </div>
  );


