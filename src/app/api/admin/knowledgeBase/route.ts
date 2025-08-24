import { NextResponse, NextRequest } from "next/server";
import fs from "fs";
import path from "path";

const dataFile = path.join(process.cwd(), "src", "data", "knowledgeBase.json");

function readData() {
  try {
    const raw = fs.readFileSync(dataFile, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeData(data: Record<string, unknown>) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET() {
  return NextResponse.json(readData());
}

export async function POST(req: NextRequest) {
  const data = readData();
  const newArticle = await req.json();
  newArticle.id = data.length ? Math.max(...data.map((i: { id?: number }) => i.id ?? 0)) + 1 : 1;
  data.push(newArticle);
  writeData(data);
  return NextResponse.json({ ok: true, article: newArticle });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  let data = readData();
  data = data.filter((i: { id: number }) => i.id !== id);
  writeData(data);
  return NextResponse.json({ ok: true });
}

export async function PATCH(req: NextRequest) {
  const { id, ...update } = await req.json();
  const data = readData();
  const idx = data.findIndex((i: { id: number }) => i.id === id);
  if (idx !== -1) {
    data[idx] = { ...data[idx], ...update };
    writeData(data);
  }
  return NextResponse.json({ ok: true });
}
