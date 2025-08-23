

  "use client";
  import React, { useState, useEffect } from "react";
  import { apiFetch } from "@/utils/apiFetch";

  // --- Section: Dashboard Home ---
  function DashboardHome() {
    return (
      <section className="p-10">
        <h2 className="text-3xl font-bold text-yellow-700 mb-6">Dashboard</h2>
        <div className="text-gray-700">(Dashboard summary coming soon)</div>
      </section>
    );
  }



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
  // Removed duplicate Vehicle type declaration
  const handleAddVehicle = (v: Vehicle) => setVehicles((vehicles: Vehicle[]) => [...vehicles, v]);
  const handleUpdateVehicle = (idx: number, v: Vehicle) => setVehicles((vehicles: Vehicle[]) => vehicles.map((veh, i) => i === idx ? v : veh));
  const handleDeleteVehicle = (idx: number) => setVehicles((vehicles: Vehicle[]) => vehicles.filter((_, i) => i !== idx));
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
  interface Vehicle {
    make: string;
    model: string;
    engine: string;
    stockBhp: string;
    stockNm: string;
    stage1: string;
    stage2: string;
    stage3: string;
  }
  interface VehicleDataSectionProps {
    vehicles: Vehicle[];
    onAdd: (v: Vehicle) => void;
    onUpdate: (idx: number, v: Vehicle) => void;
    onDelete: (idx: number) => void;
  }
  function VehicleDataSection({ vehicles, onAdd, onUpdate, onDelete }: VehicleDataSectionProps) {
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
            {vehicles.map((v: Vehicle, idx: number) => (
              <tr key={idx} className="border-b last:border-b-0">
                {editing === idx ? (
                  <>
                    <td><input value={editVehicle.make} onChange={e => setEditVehicle(ev => ({ ...ev, make: e.target.value }))} className="border rounded px-2 py-1 w-24" placeholder="Make" title="Make" /></td>
                    <td><input value={editVehicle.model} onChange={e => setEditVehicle(ev => ({ ...ev, model: e.target.value }))} className="border rounded px-2 py-1 w-24" placeholder="Model" title="Model" /></td>
                    <td><input value={editVehicle.engine} onChange={e => setEditVehicle(ev => ({ ...ev, engine: e.target.value }))} className="border rounded px-2 py-1 w-24" placeholder="Engine" title="Engine" /></td>
                    <td><input value={editVehicle.stockBhp} onChange={e => setEditVehicle(ev => ({ ...ev, stockBhp: e.target.value }))} className="border rounded px-2 py-1 w-16" placeholder="BHP" title="Stock BHP" /></td>
                    <td><input value={editVehicle.stockNm} onChange={e => setEditVehicle(ev => ({ ...ev, stockNm: e.target.value }))} className="border rounded px-2 py-1 w-16" placeholder="Nm" title="Stock Nm" /></td>
                    <td><input value={editVehicle.stage1} onChange={e => setEditVehicle(ev => ({ ...ev, stage1: e.target.value }))} className="border rounded px-2 py-1 w-16" placeholder="Stage 1" title="Stage 1" /></td>
                    <td><input value={editVehicle.stage2} onChange={e => setEditVehicle(ev => ({ ...ev, stage2: e.target.value }))} className="border rounded px-2 py-1 w-16" placeholder="Stage 2" title="Stage 2" /></td>
                    <td><input value={editVehicle.stage3} onChange={e => setEditVehicle(ev => ({ ...ev, stage3: e.target.value }))} className="border rounded px-2 py-1 w-16" placeholder="Stage 3" title="Stage 3" /></td>      <td><input value={editVehicle.stockBhp} onChange={e => setEditVehicle(ev => ({ ...ev, stockBhp: e.target.value }))} className="border rounded px-2 py-1 w-16" /></td>
                    <td><input value={editVehicle.stockNm} onChange={e => setEditVehicle(ev => ({ ...ev, stockNm: e.target.value }))} className="border rounded px-2 py-1 w-16" /></td>
                    <td><input value={editVehicle.stage1} onChange={e => setEditVehicle(ev => ({ ...ev, stage1: e.target.value }))} className="border rounded px-2 py-1 w-16" /></td>
                    <td><input value={editVehicle.stage2} onChange={e => setEditVehicle(ev => ({ ...ev, stage2: e.target.value }))} className="border rounded px-2 py-1 w-16" /></td>
                    <td><input value={editVehicle.stage3} onChange={e => setEditVehicle(ev => ({ ...ev, stage3: e.target.value }))} className="border rounded px-2 py-1 w-16" /></td>
                    <td>
                      <button className="bg-yellow-400 text-white rounded px-2 py-1 mr-2" onClick={() => { onUpdate(idx, editVehicle); setEditing(null); }}>Save</button>
                      <button className="bg-gray-300 rounded px-2 py-1" type="button" onClick={() => setEditing(null)}>Cancel</button>
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
                      <button className="bg-red-400 text-white rounded px-2 py-1" type="button" onClick={() => onDelete(idx)}>Delete</button>
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


  // --- Section: Users ---
  function UsersSection() {
    return (
      <section className="p-10">
        <h2 className="text-3xl font-bold text-yellow-700 mb-6">Users</h2>
        <div className="text-gray-700">(Users management coming soon)</div>
      </section>
    );
  }

  // --- Section: Files ---
  function FilesSection() {
    return (
      <section className="p-10">
        <h2 className="text-3xl font-bold text-yellow-700 mb-6">Files</h2>
        <div className="text-gray-700">(Files management coming soon)</div>
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

  // --- Main Render ---
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-black via-gray-900 to-yellow-100">
      {/* Sidebar */}
      {/* Sidebar for desktop, dropdown for mobile */}
      <aside className="hidden md:flex w-64 bg-black text-yellow-400 flex-col py-8 px-6 min-h-screen shadow-xl border-r-2 border-yellow-400">
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

      {/* Dropdown for mobile */}
      <div className="md:hidden w-full bg-black text-yellow-400 p-4 flex flex-col gap-2">
        <label htmlFor="admin-nav" className="font-bold mb-1">Menu</label>
        <select
          id="admin-nav"
          className="bg-yellow-400 text-black rounded px-3 py-2 font-bold"
          value={active}
          onChange={e => setActive(e.target.value)}
        >
          {sidebarLinks.map(link => (
            <option key={link.label} value={link.label}>{link.icon} {link.label}</option>
          ))}
        </select>
      </div>

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
}


