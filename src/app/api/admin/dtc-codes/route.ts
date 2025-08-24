import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFile = path.join(process.cwd(), "src", "data", "dtc-codes.json");

interface DtcCode {
  code: string;
  desc: string;
}

function readData(): DtcCode[] {
  try {
    const raw = fs.readFileSync(dataFile, "utf-8");
    return JSON.parse(raw) as DtcCode[];
  } catch {
    return [];
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").toLowerCase();
  const data = readData();
  if (!q) return NextResponse.json(data);
  const filtered = data.filter(dtc =>
    dtc.code.toLowerCase().includes(q) ||
    dtc.desc.toLowerCase().includes(q)
  );
  return NextResponse.json(filtered);
}
