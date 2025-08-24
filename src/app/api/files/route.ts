import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const uploadsFile = path.join(process.cwd(), "src", "data", "uploads.json");
const queueFile = path.join(process.cwd(), "src", "data", "fileServiceQueue.json");

export async function GET() {
  let uploads = [];
  let queue = [];
  try {
    uploads = JSON.parse(fs.readFileSync(uploadsFile, "utf-8"));
  } catch {}
  try {
    queue = JSON.parse(fs.readFileSync(queueFile, "utf-8"));
  } catch {}

  // Merge by filename, prefer queue status if available
  const files = uploads.map((upload: { filename: string; uploaded: string; model?: string; vehicleType?: string; registration?: string }) => {
    const queueItem = queue.find((q: { filename: string; status: string; uploaded: string; id: string }) => q.filename === upload.filename);
    return {
      ...upload,
      status: queueItem ? queueItem.status : "Pending",
      lastUpdated: queueItem ? queueItem.uploaded : upload.uploaded,
      id: queueItem ? queueItem.id : upload.filename,
      vehicle: upload.model || upload.vehicleType || "",
      registration: upload.registration || "",
    };
  });

  return NextResponse.json(files);
}
