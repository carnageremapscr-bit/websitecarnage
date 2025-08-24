import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Chat will be stored per file by fileId
const chatDir = path.join(process.cwd(), "src", "data", "fileChats");
if (!fs.existsSync(chatDir)) {
  fs.mkdirSync(chatDir, { recursive: true });
}

function getChatFilePath(fileId: string) {
  return path.join(chatDir, `${fileId}.json`);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const fileId = searchParams.get("fileId");
  if (!fileId) return NextResponse.json({ error: "Missing fileId" }, { status: 400 });
  const chatFile = getChatFilePath(fileId);
  let messages = [];
  try {
    messages = JSON.parse(fs.readFileSync(chatFile, "utf-8"));
  } catch {}
  return NextResponse.json({ messages });
}

export async function POST(req: NextRequest) {
  const { fileId, sender, text } = await req.json();
  if (!fileId || !sender || !text) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  const chatFile = getChatFilePath(fileId);
  let messages = [];
  try {
    messages = JSON.parse(fs.readFileSync(chatFile, "utf-8"));
  } catch {}
  const newMsg = { sender, text, time: new Date().toISOString() };
  messages.push(newMsg);
  fs.writeFileSync(chatFile, JSON.stringify(messages, null, 2), "utf-8");
  return NextResponse.json({ success: true, message: newMsg });
}
