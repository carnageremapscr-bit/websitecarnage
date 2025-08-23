import { NextRequest, NextResponse } from "next/server";

import { users } from "../usersStore";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ error: "Email and password required." }, { status: 400 });
  }
  // Demo admin
  if (email === "admin@carnage.com" && password === "admin123") {
    return NextResponse.json({ email, role: "admin" });
  }
  // Check registered users
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }
  return NextResponse.json({ email: user.email, role: user.role });
}
