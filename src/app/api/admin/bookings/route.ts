import { NextResponse } from 'next/server';

// In-memory demo data (replace with DB in production)
let bookings = [
  { id: 1, customer: 'customer1@email.com', service: 'Stage 1 Remap', date: '2025-09-01', status: 'Pending' },
  { id: 2, customer: 'customer2@email.com', service: 'DPF Solution', date: '2025-09-03', status: 'Pending' },
];
export async function PATCH(req: Request) {
  const { id, status } = await req.json();
  const booking = bookings.find(b => b.id === id);
  if (booking) {
    booking.status = status;
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}

export async function GET() {
  return NextResponse.json(bookings);
}

export async function POST(req: Request) {
  const data = await req.json();
  data.id = bookings.length ? bookings[bookings.length - 1].id + 1 : 1;
  bookings.push(data);
  return NextResponse.json({ success: true, booking: data });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  bookings = bookings.filter(b => b.id !== id);
  return NextResponse.json({ success: true });
}
