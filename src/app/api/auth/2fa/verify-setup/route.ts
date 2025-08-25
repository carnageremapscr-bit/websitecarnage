import { NextRequest, NextResponse } from 'next/server';
import speakeasy from 'speakeasy';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import bcrypt from 'bcryptjs';

const DATA_DIR = join(process.cwd(), 'src', 'data');

export async function POST(request: NextRequest) {
  try {
    const { userId, code, secret } = await request.json();

    if (!userId || !code || !secret) {
      return NextResponse.json(
        { error: 'User ID, code, and secret are required' },
        { status: 400 }
      );
    }

    // Verify the code
    const verified = speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token: code,
      window: 2, // Allow 2 time steps before/after current time
    });

    if (!verified) {
      return NextResponse.json(
        { error: 'Invalid verification code' },
        { status: 400 }
      );
    }

    // Get temp data
    const twoFAPath = join(DATA_DIR, '2fa-temp.json');
    const tempData = existsSync(twoFAPath) ? JSON.parse(readFileSync(twoFAPath, 'utf8')) : {};
    
    const userTempData = tempData[userId];
    if (!userTempData) {
      return NextResponse.json(
        { error: '2FA setup not found' },
        { status: 404 }
      );
    }

    // Move to permanent storage
    const permanentTwoFAPath = join(DATA_DIR, '2fa-settings.json');
    const permanentData = existsSync(permanentTwoFAPath) 
      ? JSON.parse(readFileSync(permanentTwoFAPath, 'utf8')) 
      : {};

    // Hash backup codes
    const hashedBackupCodes = userTempData.backupCodes.map((code: string) => 
      bcrypt.hashSync(code, 10)
    );

    permanentData[userId] = {
      secret,
      backupCodes: hashedBackupCodes,
      enabled: true,
      enabledAt: new Date().toISOString(),
      lastUsed: null,
    };

    writeFileSync(permanentTwoFAPath, JSON.stringify(permanentData, null, 2));

    // Clean up temp data
    delete tempData[userId];
    writeFileSync(twoFAPath, JSON.stringify(tempData, null, 2));

    // Update user record to indicate 2FA is enabled
    const usersPath = join(DATA_DIR, 'users.json');
    const users = existsSync(usersPath) ? JSON.parse(readFileSync(usersPath, 'utf8')) : [];
    
    const userIndex = users.findIndex((user: any) => user.id === userId);
    if (userIndex !== -1) {
      users[userIndex].twoFactorEnabled = true;
      users[userIndex].updatedAt = new Date().toISOString();
      writeFileSync(usersPath, JSON.stringify(users, null, 2));
    }

    return NextResponse.json({
      success: true,
      message: '2FA setup completed successfully',
    });

  } catch (error) {
    console.error('Error verifying 2FA setup:', error);
    return NextResponse.json(
      { error: 'Failed to verify 2FA setup' },
      { status: 500 }
    );
  }
}
