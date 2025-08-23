import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

// In-memory store for reviewed status (for demo; use a DB in production)
const uploads: { filename: string; customer: string; reviewed?: boolean }[] = [];
export async function PATCH(req: NextRequest) {
  // Mark upload as reviewed
  const { filename, reviewed } = await req.json();
  const upload = uploads.find(u => u.filename === filename);
  if (upload) {
    upload.reviewed = reviewed;
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const customer = formData.get("customer") as string | null;
  if (!file || !customer) {
    return NextResponse.json({ error: "Missing file or customer" }, { status: 400 });
  }

  // Read file buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  uploads.push({ filename: file.name, customer });

  // Send file as attachment to admin via SendGrid
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
    await sgMail.send({
      to: process.env.ADMIN_EMAIL || 'info@carnageremaps.com',
      from: 'Carnage Remaps <noreply@carnageremaps.co.uk>',
      subject: `New file upload from ${customer}`,
      text: `A new file was uploaded by ${customer}. Filename: ${file.name}`,
      attachments: [
        {
          content: buffer.toString('base64'),
          filename: file.name,
          type: file.type,
          disposition: 'attachment',
        },
      ],
    });
  } catch (e) {
    console.error("SendGrid email send failed", e);
  }

  return NextResponse.json({ success: true });
}

export async function GET() {
  // Admin: list all uploads
  return NextResponse.json(uploads);
}
