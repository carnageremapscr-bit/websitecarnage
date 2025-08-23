import { NextResponse } from 'next/server';

// In-memory demo data (replace with DB in production)
let users = [
  { email: 'admin@carnage.com', role: 'admin' },
  { email: 'customer1@email.com', role: 'customer' },
  { email: 'customer2@email.com', role: 'customer' },
];

export async function GET() {
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const data = await req.json();
  users.push(data);
  return NextResponse.json({ success: true, user: data });
}

export async function DELETE(req: Request) {
  const { email } = await req.json();
  users = users.filter(u => u.email !== email);
  return NextResponse.json({ success: true });
}
