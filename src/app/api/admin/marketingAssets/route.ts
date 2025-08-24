import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const uploadDir = path.join(process.cwd(), "public", "marketing-assets");
const dataFile = path.join(process.cwd(), "src", "data", "marketingAssets.json");

if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

function readData() {
  try {
    const raw = fs.readFileSync(dataFile, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeData(data: { filename: string; originalName: string; uploaded: string }[]) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET() {
  return NextResponse.json(readData());
}

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");
  if (!file || typeof file === "string") return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  const filename = Date.now() + "-" + file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
  const filepath = path.join(uploadDir, filename);
  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(filepath, buffer);
  const data = readData();
  data.push({ filename, originalName: file.name, uploaded: new Date().toISOString() });
  writeData(data);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req) {
  const { filename } = await req.json();
  let data = readData();
  data = data.filter(a => a.filename !== filename);
  writeData(data);
  const filepath = path.join(uploadDir, filename);
  if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
  return NextResponse.json({ ok: true });
}
