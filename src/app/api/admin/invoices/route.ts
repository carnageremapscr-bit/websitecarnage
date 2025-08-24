$filePath = "C:\Users\carna\OneDrive\Desktop\websitecarnage\testfile.txt"
$customer = "TestCustomer"
$form = @{
    file = Get-Content $filePath -Raw
    customer = $customer
}
Invoke-RestMethod -Uri "http://localhost:3000/api/admin/uploads" -Method Post -Body $form -ContentType "multipart/form-data"import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFile = path.join(process.cwd(), "src", "data", "invoices.json");

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

export async function GET() {
  return NextResponse.json(readData());
}

export async function POST(req) {
  const data = readData();
  const newInvoice = await req.json();
  newInvoice.id = data.length ? Math.max(...data.map(i => i.id)) + 1 : 1;
  data.push(newInvoice);
  writeData(data);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req) {
  const { id } = await req.json();
  let data = readData();
  data = data.filter(i => i.id !== id);
  writeData(data);
  return NextResponse.json({ ok: true });
}

export async function PATCH(req) {
  const { id, ...update } = await req.json();
  const data = readData();
  const idx = data.findIndex(i => i.id === id);
  if (idx !== -1) {
    data[idx] = { ...data[idx], ...update };
    writeData(data);
  }
  return NextResponse.json({ ok: true });
}
