import { NextResponse } from 'next/server';

// In-memory settings (replace with DB in production)

type Settings = {
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  businessAddress: string;
  businessLogo: string;
  businessHours: string;
  maintenanceMode: boolean;
  homepageAnnouncement: string;
};

const settings: Settings = {
  businessName: 'Carnage Remaps',
  businessEmail: 'info@carnageremaps.com',
  businessPhone: '+44 1234 567890',
  businessAddress: '123 Remap Lane, Tuning City, UK',
  businessLogo: '', // URL or base64 string
  businessHours: 'Mon-Fri 9am-6pm',
  maintenanceMode: false,
  homepageAnnouncement: '',
};

export async function POST(req: Request) {
  const data: Partial<Settings> = await req.json();
  // Update only provided fields
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(settings, key)) {
      const typedKey = key as keyof Settings;
      // TypeScript fix: ensure value matches the type of the field
      (settings[typedKey] as unknown) = data[typedKey];
    }
  }
  return NextResponse.json(settings);
}
export async function GET() {
  return NextResponse.json(settings);
}
