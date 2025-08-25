import { NextRequest, NextResponse } from 'next/server';
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const DATA_DIR = join(process.cwd(), 'src', 'data');

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Generate secret
    const secret = speakeasy.generateSecret({
      name: `Carnage Remaps (${userId})`,
      issuer: 'Carnage Remaps',
      length: 32,
    });

    // Generate QR code
    const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url || '');

    // Generate backup codes
    const backupCodes = generateBackupCodes();

    // Store temporary 2FA data (in production, use a secure temporary storage)
    const twoFAPath = join(DATA_DIR, '2fa-temp.json');
    const tempData = existsSync(twoFAPath) ? JSON.parse(readFileSync(twoFAPath, 'utf8')) : {};
    
    tempData[userId] = {
      secret: secret.base32,
      backupCodes,
      verified: false,
      createdAt: new Date().toISOString(),
    };

    writeFileSync(twoFAPath, JSON.stringify(tempData, null, 2));

    return NextResponse.json({
      qrCode: qrCodeUrl,
      secret: secret.base32,
      backupCodes,
    });

  } catch (error) {
    console.error('Error setting up 2FA:', error);
    return NextResponse.json(
      { error: 'Failed to setup 2FA' },
      { status: 500 }
    );
  }
}

function generateBackupCodes(): string[] {
  const codes = [];
  for (let i = 0; i < 8; i++) {
    // Generate 8-digit backup code
    const code = Math.random().toString(36).substr(2, 4).toUpperCase() + 
                  Math.random().toString(36).substr(2, 4).toUpperCase();
    codes.push(code);
  }
  return codes;
}
