import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

const chatDir = path.join(process.cwd(), "src", "data", "fileChats");
const chatUploadsDir = path.join(process.cwd(), "uploads", "chat");
if (!fs.existsSync(chatDir)) fs.mkdirSync(chatDir, { recursive: true });
if (!fs.existsSync(chatUploadsDir)) fs.mkdirSync(chatUploadsDir, { recursive: true });

function getChatFilePath(fileId: string) {
  return path.join(chatDir, `${fileId}.json`);
}

import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  // Support both JSON and multipart/form-data
  const contentType = req.headers.get("content-type") || "";
  if (contentType.includes("multipart/form-data")) {
    // Parse multipart
    const boundary = contentType.split("boundary=")[1];
    const buffer = Buffer.from(await req.arrayBuffer());
    const parts = buffer.toString().split(`--${boundary}`);
    let fileId = "", sender = "", text = "", fileUrl = "";
    let fileName = "";
    for (const part of parts) {
      if (part.includes('name="fileId"')) fileId = part.split("\r\n\r\n")[1]?.split("\r\n")[0]?.trim();
      if (part.includes('name="sender"')) sender = part.split("\r\n\r\n")[1]?.split("\r\n")[0]?.trim();
      if (part.includes('name="text"')) text = part.split("\r\n\r\n")[1]?.split("\r\n")[0]?.trim();
      if (part.includes('name="file"')) {
        const match = part.match(/filename="([^"]+)"/);
        if (match) fileName = match[1];
        const fileData = part.split("\r\n\r\n")[1];
        if (fileData && fileName) {
          const filePath = path.join(chatUploadsDir, fileName);
          fs.writeFileSync(filePath, Buffer.from(fileData, 'binary'));
          fileUrl = `/uploads/chat/${fileName}`;
        }
      }
    }
    if (!fileId || !sender || (!text && !fileUrl)) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    const chatFile = getChatFilePath(fileId);
    let messages = [];
    try { messages = JSON.parse(fs.readFileSync(chatFile, "utf-8")); } catch {}
    const newMsg = { sender, text, fileUrl, time: new Date().toISOString() };
    messages.push(newMsg);
    fs.writeFileSync(chatFile, JSON.stringify(messages, null, 2), "utf-8");
    return NextResponse.json({ success: true, message: newMsg });
  } else {
    // Fallback to JSON (text only)
    const { fileId, sender, text } = await req.json();
    if (!fileId || !sender || !text) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    const chatFile = getChatFilePath(fileId);
    let messages = [];
    try { messages = JSON.parse(fs.readFileSync(chatFile, "utf-8")); } catch {}
    const newMsg = { sender, text, time: new Date().toISOString() };
    messages.push(newMsg);
    fs.writeFileSync(chatFile, JSON.stringify(messages, null, 2), "utf-8");
    return NextResponse.json({ success: true, message: newMsg });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const fileId = searchParams.get("fileId");
  if (!fileId) return NextResponse.json({ error: "Missing fileId" }, { status: 400 });
  const chatFile = getChatFilePath(fileId);
  let messages = [];
  try { messages = JSON.parse(fs.readFileSync(chatFile, "utf-8")); } catch {}
  return NextResponse.json({ messages });
}
