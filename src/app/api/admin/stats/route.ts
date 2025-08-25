import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const DATA_DIR = join(process.cwd(), 'src', 'data');

export async function GET(request: NextRequest) {
  try {
    // Read users data
    const usersPath = join(DATA_DIR, 'users.json');
    const users = existsSync(usersPath) ? JSON.parse(readFileSync(usersPath, 'utf8')) : [];
    
    // Read uploads data
    const uploadsPath = join(DATA_DIR, 'uploads.json');
    const uploads = existsSync(uploadsPath) ? JSON.parse(readFileSync(uploadsPath, 'utf8')) : [];
    
    // Read file service queue data
    const queuePath = join(DATA_DIR, 'fileServiceQueue.json');
    const queue = existsSync(queuePath) ? JSON.parse(readFileSync(queuePath, 'utf8')) : [];
    
    // Read invoices data for revenue calculation
    const invoicesPath = join(DATA_DIR, 'invoices.json');
    const invoices = existsSync(invoicesPath) ? JSON.parse(readFileSync(invoicesPath, 'utf8')) : [];

    // Calculate current month start
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Calculate stats
    const totalUsers = users.length;
    const activeUsers = users.filter((user: any) => user.role === 'customer').length;
    const totalUploads = uploads.length;
    const pendingFiles = queue.filter((item: any) => item.status === 'pending').length;
    const completedFiles = queue.filter((item: any) => 
      item.status === 'completed' && 
      new Date(item.completedAt || item.createdAt) >= monthStart
    ).length;
    
    const todayUploads = uploads.filter((upload: any) => 
      new Date(upload.uploadDate || upload.createdAt) >= todayStart
    ).length;

    // Calculate monthly revenue from completed invoices
    const monthlyRevenue = invoices
      .filter((invoice: any) => 
        invoice.status === 'paid' && 
        new Date(invoice.paidAt || invoice.createdAt) >= monthStart
      )
      .reduce((total: number, invoice: any) => total + (invoice.amount || 0), 0);

    // Calculate average processing time (in hours)
    const completedItems = queue.filter((item: any) => item.status === 'completed' && item.completedAt);
    const averageProcessingTime = completedItems.length > 0 
      ? completedItems.reduce((total: number, item: any) => {
          const start = new Date(item.createdAt);
          const end = new Date(item.completedAt);
          return total + (end.getTime() - start.getTime()) / (1000 * 60 * 60); // Convert to hours
        }, 0) / completedItems.length
      : 0;

    const stats = {
      totalUsers,
      activeUsers,
      totalUploads,
      pendingFiles,
      completedFiles,
      monthlyRevenue,
      todayUploads,
      averageProcessingTime: Math.round(averageProcessingTime * 10) / 10, // Round to 1 decimal place
    };

    return NextResponse.json(stats);

  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}
