$filePath = "C:\Users\carna\OneDrive\Desktop\websitecarnage\testfile.txt"
$customer = "TestCustomer"
$form = @{
    file = Get-Content $filePath -Raw
    customer = $customer
}
Invoke-RestMethod -Uri "http://localhost:3000/api/admin/uploads" -Method Post -Body $form -ContentType "multipart/form-data"import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFile = path.join(process.cwd(), "src", "data", "invoices.json");

type Invoice = { id?: number; [key: string]: any };

function readData(): Invoice[] {
  try {
    const raw = fs.readFileSync(dataFile, "utf-8");
    return JSON.parse(raw) as Invoice[];
  } catch {
    return [];
  }
}

function writeData(data: Invoice[]) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET(_req: NextRequest) {
  return NextResponse.json(readData());
}

export async function POST(req: NextRequest) {
  const data = readData();
  const newInvoice = (await req.json()) as Invoice;
  const maxId = data.length ? Math.max(...data.map((i) => i.id || 0)) : 0;
  newInvoice.id = (maxId || 0) + 1;
  data.push(newInvoice);
  writeData(data);
  return NextResponse.json({ ok: true, invoice: newInvoice });
}

export async function DELETE(req: NextRequest) {
  const body = (await req.json()) as { id?: number };
  if (!body?.id) return NextResponse.json({ ok: false, error: "missing id" }, { status: 400 });
  let data = readData();
  const before = data.length;
  data = data.filter((i) => i.id !== body.id);
  writeData(data);
  return NextResponse.json({ ok: true, deleted: before - data.length });
}

export async function PATCH(req: NextRequest) {
  const { id, ...update } = (await req.json()) as Invoice;
  if (!id) return NextResponse.json({ ok: false, error: "missing id" }, { status: 400 });
  const data = readData();
  const idx = data.findIndex((i) => i.id === id);
  if (idx !== -1) {
    data[idx] = { ...data[idx], ...update };
    writeData(data);
    return NextResponse.json({ ok: true, invoice: data[idx] });
  }
  return NextResponse.json({ ok: false, error: "not found" }, { status: 404 });
}
