"use client";
import { useEffect, useState } from "react";

type Booking = {
  id: number;
  customer: string;
  service: string;
  date: string;
};

export default function CustomerDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Get user email from localStorage
    if (typeof window !== "undefined") {
      const email = localStorage.getItem("carnage_user_email") || "";
      setUserEmail(email);
      fetchBookings(email);
    }
  }, []);

  async function fetchBookings(email: string) {
    setLoading(true);
    const res = await fetch("/api/admin/bookings");
    const all = await res.json();
    setBookings(all.filter((b: Booking) => b.customer === email));
    setLoading(false);
  }

  async function addBooking(e: React.FormEvent) {
    e.preventDefault();
    if (!userEmail) return;
    await fetch("/api/admin/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customer: userEmail, service, date }),
    });
    setService("");
    setDate("");
    fetchBookings(userEmail);
  }

  async function deleteBooking(id: number) {
    await fetch("/api/admin/bookings", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchBookings(userEmail);
  }

  return (
    <>
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 via-white to-gray-100">
        <div className="bg-white/90 rounded-2xl shadow-xl border-2 border-yellow-200 p-8 w-full max-w-2xl">
          <h1 className="text-3xl font-extrabold mb-6 text-yellow-700 text-center">Welcome to Your Dashboard</h1>
          <p className="text-lg text-gray-700 mb-4 text-center">Here you can view your remap history, manage bookings, and contact support.</p>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {/* Remap History (placeholder) */}
            <div className="bg-yellow-100 rounded-xl p-6 shadow text-center">
              <h2 className="font-bold text-yellow-700 mb-2">Remap History</h2>
              <p className="text-gray-700">(Feature coming soon)</p>
            </div>
            {/* Manage Bookings */}
            <div className="bg-yellow-100 rounded-xl p-6 shadow text-center">
              <h2 className="font-bold text-yellow-700 mb-2">Manage Bookings</h2>
              {loading ? <p>Loading...</p> : <>
                <ul className="text-gray-700 text-left text-sm max-h-32 overflow-y-auto mb-2">
                  {bookings.map((b) => (
                    <li key={b.id} className="mb-1 flex justify-between items-center">
                      <span>{b.date}: {b.service}</span>
                      <button onClick={() => deleteBooking(b.id)} className="ml-2 text-xs text-red-600 hover:underline">Cancel</button>
                    </li>
                  ))}
                  {bookings.length === 0 && <li className="text-gray-500">No bookings yet.</li>}
                </ul>
                <form className="flex flex-col gap-2 mt-2" onSubmit={addBooking}>
                  <input type="text" placeholder="Service" value={service} onChange={e => setService(e.target.value)} className="px-2 py-1 rounded border border-yellow-300" required />
                  <input type="date" placeholder="Date" value={date} onChange={e => setDate(e.target.value)} className="px-2 py-1 rounded border border-yellow-300" required />
                  <button type="submit" className="bg-yellow-400 text-white rounded px-3 py-1 font-bold mt-1">Book Service</button>
                </form>
              </>}
            </div>
            {/* Contact Support (placeholder) */}
            <div className="bg-yellow-100 rounded-xl p-6 shadow text-center">
              <h2 className="font-bold text-yellow-700 mb-2">Contact Support</h2>
              <p className="text-gray-700">(Feature coming soon)</p>
            </div>
            {/* Account Settings (placeholder) */}
            <div className="bg-yellow-100 rounded-xl p-6 shadow text-center">
              <h2 className="font-bold text-yellow-700 mb-2">Account Settings</h2>
              <p className="text-gray-700">(Feature coming soon)</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
