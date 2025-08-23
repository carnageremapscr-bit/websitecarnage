"use client";
import React from "react";
type Booking = {
  id: number;
  customer: string;
  service: string;
  date: string;
  status?: string;
};

export default function BookingStatusActions({ booking }: { booking: Booking }) {
  const [updating, setUpdating] = React.useState(false);
  async function updateStatus(status: string) {
    setUpdating(true);
    await fetch('/api/admin/bookings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: booking.id, status }),
    });
    setUpdating(false);
  }
  return (
    <span>
      <select
        aria-label="Booking status"
        className="text-xs border rounded px-1 py-0.5"
        value={booking.status || 'Pending'}
        onChange={e => updateStatus(e.target.value)}
        disabled={updating}
      >
        <option value="Pending">Pending</option>
        <option value="Confirmed">Confirmed</option>
        <option value="Completed">Completed</option>
        <option value="Cancelled">Cancelled</option>
      </select>
    </span>
  );
}
