import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFile = path.join(process.cwd(), "src", "data", "users.json");

function readData() {
  try {
    const raw = fs.readFileSync(dataFile, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeData(data) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  console.log("[api/admin/users] GET - email=", email);
  const data = readData();
  if (email) {
    const user = data.find(u => u.email === email);
    console.log("[api/admin/users] GET result:", user);
    return NextResponse.json(user || null);
  }
  console.log("[api/admin/users] GET all, count=", data.length);
  return NextResponse.json(data);
}

export async function PATCH(req) {
  try {
  console.log("[api/admin/users] PATCH received");
    const body = await req.json();
  console.log("[api/admin/users] PATCH body:", body);
    const { email, credit, role } = body;
    if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });
    const data = readData();
    const idx = data.findIndex(u => u.email === email);
    if (idx === -1) return NextResponse.json({ error: "User not found" }, { status: 404 });
    if (credit !== undefined) {
      const c = Number(credit);
      if (Number.isNaN(c) || c < 0) return NextResponse.json({ error: "Invalid credit" }, { status: 400 });
      data[idx].credit = c;
    }
    if (role !== undefined) {
      if (role !== "admin" && role !== "customer") return NextResponse.json({ error: "Invalid role" }, { status: 400 });
      data[idx].role = role;
    }
    writeData(data);
  console.log("[api/admin/users] PATCH updated:", data[idx]);
  return NextResponse.json({ ok: true, user: data[idx] });
  } catch (err) {
  console.error("[api/admin/users] PATCH error:", err);
  return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}

export async function POST(req) {
  try {
  console.log("[api/admin/users] POST received");
    const payload = await req.json();
  console.log("[api/admin/users] POST body:", payload);
    const { email, role = "customer", credit = 0 } = payload;
    if (!email || typeof email !== "string") return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    if (role !== "admin" && role !== "customer") return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    const data = readData();
    if (data.find(u => u.email === email)) return NextResponse.json({ error: "User already exists" }, { status: 409 });
    const newUser = { email, role, credit: Number(credit) || 0 };
    data.push(newUser);
    writeData(data);
  console.log("[api/admin/users] POST created:", newUser);
  return NextResponse.json({ ok: true, user: newUser });
  } catch (err) {
  console.error("[api/admin/users] POST error:", err);
  return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}

export async function DELETE(req) {
  try {
  console.log("[api/admin/users] DELETE received");
    const { email } = await req.json();
  console.log("[api/admin/users] DELETE email:", email);
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });
    let data = readData();
    const exists = data.some(u => u.email === email);
    if (!exists) return NextResponse.json({ error: "User not found" }, { status: 404 });
    data = data.filter(u => u.email !== email);
    writeData(data);
  console.log("[api/admin/users] DELETE success for:", email);
  return NextResponse.json({ ok: true });
  } catch (err) {
  console.error("[api/admin/users] DELETE error:", err);
  return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
