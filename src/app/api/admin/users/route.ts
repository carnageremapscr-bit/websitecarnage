import { NextResponse } from 'next/server';

// In-memory demo data (replace with DB in production)
let users = [
  { email: 'admin@carnage.com', role: 'admin', credit: 0 },
  { email: 'customer1@email.com', role: 'customer', credit: 0 },
  { email: 'customer2@email.com', role: 'customer', credit: 0 },
];

export async function PATCH(req: Request) {
  const { email, credit } = await req.json();
  let updated = false;
  users = users.map(u => {
    if (u.email === email) {
      updated = true;
      return { ...u, credit: (typeof u.credit === 'number' ? u.credit : 0) + Number(credit) };
    }
    return u;
  });
  if (!updated) {
    return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}

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
