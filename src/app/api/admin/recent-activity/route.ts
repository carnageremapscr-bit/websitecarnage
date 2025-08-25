import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const DATA_DIR = join(process.cwd(), 'src', 'data');

export async function GET(request: NextRequest) {
  try {
    const activities: any[] = [];

    // Read uploads data
    const uploadsPath = join(DATA_DIR, 'uploads.json');
    if (existsSync(uploadsPath)) {
      const uploads = JSON.parse(readFileSync(uploadsPath, 'utf8'));
      uploads.slice(0, 5).forEach((upload: any) => {
        activities.push({
          description: `New file uploaded: ${upload.filename}`,
          timestamp: upload.uploadDate || upload.createdAt,
          type: 'upload'
        });
      });
    }

    // Read users data for new registrations
    const usersPath = join(DATA_DIR, 'users.json');
    if (existsSync(usersPath)) {
      const users = JSON.parse(readFileSync(usersPath, 'utf8'));
      users
        .filter((user: any) => user.role === 'customer')
        .slice(0, 3)
        .forEach((user: any) => {
          activities.push({
            description: `New customer registered: ${user.name}`,
            timestamp: user.createdAt || new Date().toISOString(),
            type: 'registration'
          });
        });
    }

    // Read queue data for completed jobs
    const queuePath = join(DATA_DIR, 'fileServiceQueue.json');
    if (existsSync(queuePath)) {
      const queue = JSON.parse(readFileSync(queuePath, 'utf8'));
      queue
        .filter((item: any) => item.status === 'completed')
        .slice(0, 5)
        .forEach((item: any) => {
          activities.push({
            description: `Job completed: ${item.filename || 'Unknown file'}`,
            timestamp: item.completedAt || item.updatedAt,
            type: 'completion'
          });
        });
    }

    // Read invoices for payments
    const invoicesPath = join(DATA_DIR, 'invoices.json');
    if (existsSync(invoicesPath)) {
      const invoices = JSON.parse(readFileSync(invoicesPath, 'utf8'));
      invoices
        .filter((invoice: any) => invoice.status === 'paid')
        .slice(0, 3)
        .forEach((invoice: any) => {
          activities.push({
            description: `Payment received: £${invoice.amount}`,
            timestamp: invoice.paidAt || invoice.createdAt,
            type: 'payment'
          });
        });
    }

    // Sort activities by timestamp (most recent first)
    activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    // Format timestamps for display
    const formattedActivities = activities.slice(0, 10).map(activity => ({
      ...activity,
      timestamp: new Date(activity.timestamp).toLocaleString()
    }));

    return NextResponse.json(formattedActivities);

  } catch (error) {
    console.error('Error fetching recent activity:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recent activity' },
      { status: 500 }
    );
  }
}
