import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type QueueItem = { id: string; status: string; [key: string]: string | number | boolean | null | undefined };

const dataFile = path.join(process.cwd(), "src", "data", "fileServiceQueue.json");

function readData(): QueueItem[] {
  try {
    const raw = fs.readFileSync(dataFile, "utf-8");
    return JSON.parse(raw) as QueueItem[];
  } catch {
    return [];
  }
}

function writeData(data: QueueItem[]) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET() {
  return NextResponse.json(readData());
}

export async function PATCH(req: NextRequest) {
  const { id, status } = await req.json();
  const data = readData();
  const idx = data.findIndex((q: QueueItem) => q.id === id);
  if (idx !== -1) {
    data[idx].status = status;
    writeData(data);
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  let data = readData();
  data = data.filter((q: QueueItem) => q.id !== id);
  writeData(data);
  return NextResponse.json({ ok: true });
}
