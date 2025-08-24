
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import sanitize from "sanitize-filename";

// Ensure the uploads directory exists
const uploadsDir = path.resolve("./uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// File paths for persistent storage
const uploadsDataFile = path.join(process.cwd(), "src", "data", "uploads.json");
const queueDataFile = path.join(process.cwd(), "src", "data", "fileServiceQueue.json");

type UploadRecord = { filename: string; customer: string; uploaded: string; reviewed: boolean; complete: boolean };
type QueueItem = { id: string; filename: string; customer: string; status: string; uploaded: string };

function readUploads(): UploadRecord[] {
  try {
    const raw = fs.readFileSync(uploadsDataFile, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}
function writeUploads(data: UploadRecord[]): void {
  fs.writeFileSync(uploadsDataFile, JSON.stringify(data, null, 2), "utf-8");
}
function readQueue(): QueueItem[] {
  try {
    const raw = fs.readFileSync(queueDataFile, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}
function writeQueue(data: QueueItem[]): void {
  fs.writeFileSync(queueDataFile, JSON.stringify(data, null, 2), "utf-8");
}

// PATCH: Mark upload as reviewed or complete
export async function PATCH(req: NextRequest) {
  const { filename, reviewed, complete } = await req.json();
  let uploads = readUploads();
  let changed = false;
  uploads = uploads.map((u: UploadRecord) => {
    if (u.filename === filename) {
      changed = true;
      return { ...u, reviewed: reviewed ?? u.reviewed, complete: complete ?? u.complete };
    }
    return u;
  });
  if (changed) {
    writeUploads(uploads);
    // If marked complete, update queue
    if (complete) {
      let queue = readQueue();
      queue = queue.map((q: QueueItem) => q.filename === filename ? { ...q, status: "Complete" } : q);
      writeQueue(queue);
    }
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    // Accept all vehicle details
    const details: Record<string, string> = {};
    for (const [key, value] of formData.entries()) {
      if (typeof value === "string" && key !== "file") {
        details[key] = value;
      }
    }
    const customer = details["customer"] || details["registration"] || details["manufacturer"] || "unknown";

    if (!file || !customer) {
      return NextResponse.json({ error: "Missing file or customer" }, { status: 400 });
    }

    // Sanitize file name to prevent security issues
    const sanitizedFileName = sanitize(file.name);
    const filePath = path.join(uploadsDir, sanitizedFileName);

    // Save file to disk
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(filePath, buffer);

    // Save upload metadata (store all details)
    const uploads = readUploads();
    const uploadRecord = { filename: sanitizedFileName, customer, uploaded: new Date().toISOString(), reviewed: false, complete: false, ...details };
    uploads.push(uploadRecord);
    writeUploads(uploads);

    // Add to file service queue
    const queue = readQueue();
    const queueItem = {
      id: Date.now().toString() + Math.floor(Math.random()*1000),
      filename: sanitizedFileName,
      customer,
      status: "Pending",
      uploaded: new Date().toISOString(),
      ...details
    };
    queue.push(queueItem);
    writeQueue(queue);

    // Optionally, notify admin or trigger further processing here

    return NextResponse.json({ success: true, message: "File uploaded and queued for admin." });
  } catch (error) {
    console.error("Error in file upload:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  // Admin: list all uploads
  return NextResponse.json(readUploads());
}
