import { NextRequest, NextResponse } from "next/server";
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
  const data = readData();
  if (email) {
    const user = data.find(u => u.email === email);
    return NextResponse.json(user || null);
  }
  return NextResponse.json(data);
}

export async function PATCH(req) {
  const { email, credit } = await req.json();
  const data = readData();
  const idx = data.findIndex(u => u.email === email);
  if (idx !== -1 && typeof credit === "number") {
    data[idx].credit = credit;
    writeData(data);
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: "User not found or invalid credit" }, { status: 400 });
}

export async function POST(req) {
  const data = readData();
  const newUser = await req.json();
  data.push(newUser);
  writeData(data);
  return NextResponse.json({ ok: true, user: newUser });
}

export async function DELETE(req) {
  const { email } = await req.json();
  let data = readData();
  data = data.filter(u => u.email !== email);
  writeData(data);
  return NextResponse.json({ ok: true });
}
