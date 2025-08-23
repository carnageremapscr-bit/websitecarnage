// Settings type for dashboard
type Settings = {
  businessName?: string;
  businessEmail?: string;
  businessPhone?: string;
  businessAddress?: string;
  businessLogo?: string;
  businessHours?: string;
  maintenanceMode?: boolean;
  homepageAnnouncement?: string;
};

"use client";
import React, { useState, useEffect } from "react";

const sidebarLinks = [
  { label: "Dashboard", icon: "🏠" },
  { label: "Files", icon: "📁" },
  { label: "Upload", icon: "⬆️" },
  { label: "Vehicle Data", icon: "🚗" },
  { label: "Invoices", icon: "🧾" },
  { label: "Marketing Tools", icon: "📈" },
  { label: "Knowledge Base", icon: "📚" },
  { label: "DTC Search", icon: "🔍" },
  { label: "File Service", icon: "🛠️" },
  { label: "Bookings", icon: "📅" },
  { label: "Settings", icon: "⚙️" },
];

export default function Dashboard() {
  const [active, setActive] = useState("Dashboard");
  // Live data for processed files
  const [fileSearch, setFileSearch] = useState("");
  const [filePage, setFilePage] = useState(1);
  const filesPerPage = 10;
  type FileRow = { filename?: string; customer?: string; reviewed?: boolean; vehicle?: string; reg?: string; status?: string };
  const [fileRows, setFileRows] = useState<FileRow[]>([]);
  const [fileLoading, setFileLoading] = useState(true);
  useEffect(() => {
    const interval = setInterval(fetchFiles, 5000);
    async function fetchFiles() {
      setFileLoading(true);
      try {
        const res = await fetch("/api/admin/uploads");
        if (res.ok) {
          const data = await res.json();
          setFileRows(Array.isArray(data) ? data : []);
        }
      } catch {}
      setFileLoading(false);
    }
    fetchFiles();
    return () => clearInterval(interval);
  }, []);
  const filteredFiles = fileRows.filter((row: FileRow) =>
    (row.vehicle?.toLowerCase?.().includes(fileSearch.toLowerCase()) || "") ||
    (row.reg?.toLowerCase?.().includes(fileSearch.toLowerCase()) || "") ||
    (row.status?.toLowerCase?.().includes(fileSearch.toLowerCase()) || "") ||
    (row.filename?.toLowerCase?.().includes(fileSearch.toLowerCase()) || "") ||
    (row.customer?.toLowerCase?.().includes(fileSearch.toLowerCase()) || "")
  );
  const totalPages = Math.ceil(filteredFiles.length / filesPerPage);
  const pagedFiles = filteredFiles.slice((filePage - 1) * filesPerPage, filePage * filesPerPage);
  const [credit] = useState(10);
  const [fileServiceStatus] = useState({
    online: false,
    nextOnline: "Tuesday 09:00 BST",
    now: "17:18:06",
  });


  // --- Section: Dashboard Home ---
  function DashboardHome() {
    // TODO: Fetch and display summary cards, notifications, and quick links
    return (
      <section className="p-10">
        <h1 className="text-4xl font-extrabold mb-4 text-black">Welcome to Your Dashboard</h1>
        <p className="text-lg text-gray-700 mb-8">Manage your files, vehicles, and services all in one place.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow border-l-8 border-yellow-400 p-6 flex flex-col items-center">
            <span className="text-2xl font-bold text-yellow-700 mb-2">{fileRows.length}</span>
            <span className="text-gray-700">Files Submitted</span>
          </div>
          <div className="bg-white rounded-xl shadow border-l-8 border-yellow-400 p-6 flex flex-col items-center">
            <span className="text-2xl font-bold text-yellow-700 mb-2">£{credit}</span>
            <span className="text-gray-700">Credit Balance</span>
          </div>
          <div className="bg-white rounded-xl shadow border-l-8 border-yellow-400 p-6 flex flex-col items-center">
            <span className="text-2xl font-bold text-yellow-700 mb-2">{fileServiceStatus.online ? "Online" : "Offline"}</span>
            <span className="text-gray-700">File Service</span>
          </div>
        </div>
        <div className="text-gray-600">(Notifications and quick links coming soon)</div>
      </section>
    );
  }

  // --- Section: Files ---
  // FilesSection already handled by fileRows above, so no duplicate needed

  // --- Section: Upload ---
  function UploadSection() {
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState("");
    const [customer, setCustomer] = useState("");

    async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      if (!file || !customer) {
        setStatus("Please select a file and enter your email.");
        return;
      }
      setStatus("Uploading...");
      const formData = new FormData();
      formData.append("file", file);
      formData.append("customer", customer);
      const res = await fetch("/api/admin/uploads", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setStatus("Upload successful!");
        setFile(null);
        setCustomer("");
      } else {
        setStatus("Upload failed.");
      }
    }

    return (
      <section className="p-10">
        <h2 className="text-3xl font-bold text-yellow-700 mb-6">Upload File</h2>
        <form className="flex flex-col gap-4 max-w-md" onSubmit={handleUpload}>
          <label htmlFor="upload-email" className="font-bold">Your Email</label>
          <input
            id="upload-email"
            type="email"
            placeholder="Your Email"
            value={customer}
            onChange={e => setCustomer(e.target.value)}
            className="px-2 py-1 rounded border border-yellow-300"
            required
          />
          <label htmlFor="upload-file" className="font-bold">File</label>
          <input
            id="upload-file"
            type="file"
            title="Select file to upload"
            onChange={e => setFile(e.target.files && e.target.files[0] ? e.target.files[0] : null)}
            className="px-2 py-1 rounded border border-yellow-300"
            required
          />
          <button type="submit" className="bg-yellow-400 text-white rounded px-3 py-1 font-bold">Upload</button>
        </form>
        {status && <div className="mt-4 text-yellow-700 font-bold">{status}</div>}
      </section>
    );
  }

  // --- Section: Vehicle Data ---
  function VehicleDataSection() {
    const [search, setSearch] = useState("");
    const vehicles = [
      { reg: "AB12CDE", make: "VW", model: "Golf", year: 2020, vin: "WVWZZZ1KZAW000001" },
      { reg: "XY34FGH", make: "BMW", model: "320d", year: 2019, vin: "WBA8E12030A000002" },
      { reg: "JK56LMN", make: "Ford", model: "Focus", year: 2021, vin: "WF0AXXWPMAR000003" },
    ];
    const filtered = vehicles.filter(v =>
      v.reg.toLowerCase().includes(search.toLowerCase()) ||
      v.make.toLowerCase().includes(search.toLowerCase()) ||
      v.model.toLowerCase().includes(search.toLowerCase()) ||
      v.vin.toLowerCase().includes(search.toLowerCase())
    );
    return (
      <section className="p-10">
        <h2 className="text-3xl font-bold text-yellow-700 mb-6">Vehicle Data</h2>
        <input
          type="text"
          placeholder="Search by reg, make, model, or VIN..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="mb-4 px-2 py-1 rounded border border-yellow-300 w-full max-w-md"
        />
        <table className="min-w-full text-sm bg-white rounded-xl shadow border border-yellow-200">
          <thead className="bg-yellow-100">
            <tr>
              <th className="py-2 px-3">Reg</th>
              <th className="py-2 px-3">Make</th>
              <th className="py-2 px-3">Model</th>
              <th className="py-2 px-3">Year</th>
              <th className="py-2 px-3">VIN</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-4 text-gray-500">No vehicles found.</td></tr>
            ) : filtered.map(v => (
              <tr key={v.vin} className="border-b last:border-b-0">
                <td className="py-2 px-3">{v.reg}</td>
                <td className="py-2 px-3">{v.make}</td>
                <td className="py-2 px-3">{v.model}</td>
                <td className="py-2 px-3">{v.year}</td>
                <td className="py-2 px-3">{v.vin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }

  // --- Section: Invoices ---
  function InvoicesSection() {
    const invoices = [
      { id: 1, date: "2025-08-01", amount: 120, status: "Paid" },
      { id: 2, date: "2025-08-15", amount: 80, status: "Unpaid" },
    ];
    return (
      <section className="p-10">
        <h2 className="text-3xl font-bold text-yellow-700 mb-6">Invoices</h2>
        <table className="min-w-full text-sm bg-white rounded-xl shadow border border-yellow-200">
          <thead className="bg-yellow-100">
            <tr>
              <th className="py-2 px-3">ID</th>
              <th className="py-2 px-3">Date</th>
              <th className="py-2 px-3">Amount (£)</th>
              <th className="py-2 px-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map(inv => (
              <tr key={inv.id} className="border-b last:border-b-0">
                <td className="py-2 px-3">{inv.id}</td>
                <td className="py-2 px-3">{inv.date}</td>
                <td className="py-2 px-3">£{inv.amount}</td>
                <td className={`py-2 px-3 font-bold ${inv.status === "Paid" ? "text-green-700" : "text-yellow-700"}`}>{inv.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }

  // --- Section: Marketing Tools ---
  function MarketingToolsSection() {
    return (
      <section className="p-10">
        <h2 className="text-3xl font-bold text-yellow-700 mb-6">Marketing Tools</h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Download branded social media graphics</li>
          <li>Access email templates for customer outreach</li>
          <li>View marketing performance stats (coming soon)</li>
        </ul>
      </section>
    );
  }

  // --- Section: Knowledge Base ---
  function KnowledgeBaseSection() {
    const articles = [
      { id: 1, title: "How to upload a file", summary: "Step-by-step guide for uploading files to the portal." },
      { id: 2, title: "What is a remap?", summary: "Explanation of remapping and its benefits." },
    ];
    return (
      <section className="p-10">
        <h2 className="text-3xl font-bold text-yellow-700 mb-6">Knowledge Base</h2>
        <ul className="space-y-4">
          {articles.map(a => (
            <li key={a.id} className="bg-white rounded-xl shadow border border-yellow-200 p-4">
              <div className="font-bold text-lg text-yellow-700">{a.title}</div>
              <div className="text-gray-700">{a.summary}</div>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  // --- Section: DTC Search ---
  function DTCSearchSection() {
    const [query, setQuery] = useState("");
    const dtcList = [
      { code: "P0101", desc: "Mass or Volume Air Flow Circuit Range/Performance Problem" },
      { code: "P0401", desc: "Exhaust Gas Recirculation Flow Insufficient Detected" },
      { code: "P2002", desc: "Diesel Particulate Filter Efficiency Below Threshold" },
    ];
    const filtered = dtcList.filter(dtc =>
      dtc.code.toLowerCase().includes(query.toLowerCase()) ||
      dtc.desc.toLowerCase().includes(query.toLowerCase())
    );
    return (
      <section className="p-10">
        <h2 className="text-3xl font-bold text-yellow-700 mb-6">DTC Search</h2>
        <input
          type="text"
          placeholder="Enter DTC code or description..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="mb-4 px-2 py-1 rounded border border-yellow-300 w-full max-w-md"
        />
        <table className="min-w-full text-sm bg-white rounded-xl shadow border border-yellow-200">
          <thead className="bg-yellow-100">
            <tr>
              <th className="py-2 px-3">Code</th>
              <th className="py-2 px-3">Description</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={2} className="text-center py-4 text-gray-500">No results found.</td></tr>
            ) : filtered.map(dtc => (
              <tr key={dtc.code} className="border-b last:border-b-0">
                <td className="py-2 px-3">{dtc.code}</td>
                <td className="py-2 px-3">{dtc.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }

  // --- Section: File Service ---
  function FileServiceSection() {
    const [status, setStatus] = useState("Online");
    const [queue, setQueue] = useState([
      { id: 1, filename: "file1.bin", customer: "customer1@email.com", status: "Pending" },
      { id: 2, filename: "file2.bin", customer: "customer2@email.com", status: "Reviewed" },
    ]);
    return (
      <section className="p-10">
        <h2 className="text-3xl font-bold text-yellow-700 mb-6">File Service</h2>
        <div className="mb-4">
          <span className="font-bold">Status:</span>
          <select className="ml-2 border rounded px-2 py-1" value={status} onChange={e => setStatus(e.target.value)} title="File status">
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
        </div>
        <table className="min-w-full text-sm bg-white rounded-xl shadow border border-yellow-200">
          <thead className="bg-yellow-100">
            <tr>
              <th className="py-2 px-3">ID</th>
              <th className="py-2 px-3">Filename</th>
              <th className="py-2 px-3">Customer</th>
              <th className="py-2 px-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {queue.map(q => (
              <tr key={q.id} className="border-b last:border-b-0">
                <td className="py-2 px-3">{q.id}</td>
                <td className="py-2 px-3">{q.filename}</td>
                <td className="py-2 px-3">{q.customer}</td>
                <td className={`py-2 px-3 font-bold ${q.status === "Reviewed" ? "text-green-700" : "text-yellow-700"}`}>{q.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }

  // --- Section: Bookings ---
  type Booking = { id: number; customer: string; service: string; date: string; status: string };
  function BookingsSection() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [bookingsLoading, setBookingsLoading] = useState(true);
    const [newBooking, setNewBooking] = useState<{ customer: string; service: string; date: string }>({ customer: "", service: "", date: "" });

    useEffect(() => {
      async function fetchBookings() {
        setBookingsLoading(true);
        try {
          const res = await fetch("/api/admin/bookings");
          if (res.ok) setBookings(await res.json());
        } catch {}
        setBookingsLoading(false);
      }
      fetchBookings();
    }, []);

    async function addBooking(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      await fetch("/api/admin/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBooking),
      });
      setNewBooking({ customer: "", service: "", date: "" });
      // Refresh bookings
      const res = await fetch("/api/admin/bookings");
      if (res.ok) setBookings(await res.json());
    }

    async function deleteBooking(id: number) {
      await fetch("/api/admin/bookings", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      // Refresh bookings
      const res = await fetch("/api/admin/bookings");
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
    const [settings, setSettings] = useState<Settings | null>(null);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState<Settings>({});

    useEffect(() => {
      async function fetchSettings() {
        setLoading(true);
        try {
          const res = await fetch("/api/admin/settings");
          if (res.ok) {
            const data = await res.json();
            setSettings(data);
            setForm(data);
          }
        } catch {}
        setLoading(false);
      }
      fetchSettings();
    }, []);

    async function saveSettings(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSettings(form);
    }

    if (loading) return <div className="p-10">Loading settings...</div>;

    return (
      <section className="p-10">
        <h2 className="text-3xl font-bold text-yellow-700 mb-6">Settings</h2>
        <form className="space-y-4 max-w-xl" onSubmit={saveSettings}>
          <div>
            <label className="block font-bold mb-1">Business Name</label>
            <input type="text" className="w-full border rounded px-2 py-1" placeholder="Business Name" value={form.businessName || ""} onChange={e => setForm((f) => ({ ...f, businessName: e.target.value }))} />
          </div>
          <div>
            <label className="block font-bold mb-1">Email</label>
            <input type="email" className="w-full border rounded px-2 py-1" placeholder="Business Email" value={form.businessEmail || ""} onChange={e => setForm((f) => ({ ...f, businessEmail: e.target.value }))} />
          </div>
          <div>
            <label className="block font-bold mb-1">Phone</label>
            <input type="text" className="w-full border rounded px-2 py-1" placeholder="Business Phone" value={form.businessPhone || ""} onChange={e => setForm((f) => ({ ...f, businessPhone: e.target.value }))} />
          </div>
          <div>
            <label className="block font-bold mb-1">Address</label>
            <input type="text" className="w-full border rounded px-2 py-1" placeholder="Business Address" value={form.businessAddress || ""} onChange={e => setForm((f) => ({ ...f, businessAddress: e.target.value }))} />
          </div>
          <div>
            <label className="block font-bold mb-1">Business Hours</label>
            <input type="text" className="w-full border rounded px-2 py-1" placeholder="Business Hours" value={form.businessHours || ""} onChange={e => setForm((f) => ({ ...f, businessHours: e.target.value }))} />
          </div>
          <div>
            <label className="block font-bold mb-1">Homepage Announcement</label>
            <textarea className="w-full border rounded px-2 py-1" placeholder="Homepage Announcement" value={form.homepageAnnouncement || ""} onChange={e => setForm((f) => ({ ...f, homepageAnnouncement: e.target.value }))} />
          </div>
          <div>
            <label className="block font-bold mb-1">Maintenance Mode</label>
            <label htmlFor="maintenance-mode" className="font-bold">Maintenance Mode</label>
            <select id="maintenance-mode" className="w-full border rounded px-2 py-1" value={form.maintenanceMode ? "true" : "false"} onChange={e => setForm((f) => ({ ...f, maintenanceMode: e.target.value === "true" }))}>
              <option value="false">OFF</option>
              <option value="true">ON</option>
            </select>
          </div>
          <button type="submit" className="bg-yellow-400 text-white rounded px-3 py-1 font-bold">Save Settings</button>
        </form>
      </section>
    );
  }

  // --- Main Render ---
  return (
    <div className="min-h-screen flex bg-black">
      {/* Sidebar for desktop, dropdown for mobile */}
      <aside className="hidden md:flex w-64 bg-black text-yellow-400 flex-col py-8 px-6 min-h-screen shadow-xl border-r-2 border-yellow-400">
        <div className="text-2xl font-extrabold mb-8 tracking-widest text-yellow-400 text-center">Carnage Dashboard</div>
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
        <div className="mt-10 text-center">
          <div className="text-xs text-yellow-300 opacity-80">File service:</div>
          <div className="font-bold text-lg text-yellow-400 mt-1">{fileServiceStatus.online ? "ONLINE" : "OFFLINE"}</div>
          {!fileServiceStatus.online && (
            <div className="text-xs text-yellow-300 mt-1">until<br />{fileServiceStatus.nextOnline}</div>
          )}
          <div className="text-xs text-yellow-300 mt-2">{fileServiceStatus.now}</div>
        </div>
        <div className="mt-10 text-center">
          <div className="text-xs text-yellow-300 opacity-80">Credit Balance:</div>
          <div className="font-bold text-2xl text-yellow-400 mt-1">£{credit}</div>
        </div>
        <div className="mt-auto pt-8 text-xs text-yellow-300 text-center opacity-70">&copy; {new Date().getFullYear()} Carnage Remaps</div>
      </aside>

      {/* Dropdown for mobile */}
      <div className="md:hidden w-full bg-black text-yellow-400 p-4 flex flex-col gap-2">
        <label htmlFor="dashboard-nav" className="font-bold mb-1">Menu</label>
        <select
          id="dashboard-nav"
          className="bg-yellow-400 text-black rounded px-3 py-2 font-bold"
          value={active}
          onChange={e => setActive(e.target.value)}
        >
          {sidebarLinks.map(link => (
            <option key={link.label} value={link.label}>{link.icon} {link.label}</option>
          ))}
        </select>
        <div className="flex justify-between mt-2 text-xs">
          <span>Credit: <span className="font-bold">£{credit}</span></span>
          <span>File Service: <span className="font-bold">{fileServiceStatus.online ? "ONLINE" : "OFFLINE"}</span></span>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 min-h-screen p-0">
        {active === "Dashboard" && <DashboardHome />}
        {active === "Files" && (
          <section className="p-10">
            <h2 className="text-3xl font-bold text-yellow-700 mb-6">File Processing</h2>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
              <div>
                Show
                <span className="mx-2 font-bold">10</span>
                entries
              </div>
              <div>
                <input
                  type="text"
                  className="border rounded px-3 py-1"
                  placeholder="Search..."
                  value={fileSearch}
                  onChange={e => { setFileSearch(e.target.value); setFilePage(1); }}
                />
              </div>
            </div>
            <div className="overflow-x-auto rounded-lg shadow border border-yellow-200">
              <table className="min-w-full text-sm">
                <thead className="bg-yellow-100">
                  <tr>
                    <th className="py-2 px-3">#</th>
                    <th className="py-2 px-3">Filename</th>
                    <th className="py-2 px-3">Customer</th>
                    <th className="py-2 px-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {fileLoading ? (
                    <tr><td colSpan={4} className="text-center py-4 text-gray-500">Loading...</td></tr>
                  ) : pagedFiles.length === 0 ? (
                    <tr><td colSpan={4} className="text-center py-4 text-gray-500">No files found.</td></tr>
                  ) : pagedFiles.map((row, i) => (
                    <tr key={row.filename + row.customer} className="border-b last:border-b-0">
                      <td className="py-2 px-3">{i + 1 + (filePage - 1) * filesPerPage}</td>
                      <td className="py-2 px-3">{row.filename || row.vehicle || "-"}</td>
                      <td className="py-2 px-3">{row.customer || "-"}</td>
                      <td className={`py-2 px-3 font-bold ${row.reviewed ? "text-green-700" : "text-yellow-700"}`}>{row.reviewed ? "Reviewed" : "Pending"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-600">
                Showing page {filePage} of {totalPages || 1}
              </div>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 rounded bg-yellow-400 text-black font-bold disabled:opacity-50"
                  disabled={filePage === 1}
                  onClick={() => setFilePage(p => Math.max(1, p - 1))}
                >Previous</button>
                <button
                  className="px-3 py-1 rounded bg-yellow-400 text-black font-bold disabled:opacity-50"
                  disabled={filePage === totalPages || totalPages === 0}
                  onClick={() => setFilePage(p => Math.min(totalPages, p + 1))}
                >Next</button>
              </div>
            </div>
          </section>
        )}
        {active === "Upload" && <UploadSection />}
        {active === "Vehicle Data" && <VehicleDataSection />}
        {active === "Invoices" && <InvoicesSection />}
        {active === "Marketing Tools" && <MarketingToolsSection />}
        {active === "Knowledge Base" && <KnowledgeBaseSection />}
        {active === "DTC Search" && <DTCSearchSection />}
        {active === "File Service" && <FileServiceSection />}
        {active === "Bookings" && <BookingsSection />}
        {active === "Settings" && <SettingsSection />}
      </main>
    </div>
  );
}
