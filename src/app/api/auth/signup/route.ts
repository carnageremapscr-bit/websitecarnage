import { NextRequest, NextResponse } from "next/server";

import { users } from "../usersStore";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ error: "Email and password required." }, { status: 400 });
  }
  if (users.find(u => u.email === email)) {
    return NextResponse.json({ error: "User already exists." }, { status: 400 });
  }
  users.push({ email, password, role: "customer" });
  return NextResponse.json({ success: true });
}
