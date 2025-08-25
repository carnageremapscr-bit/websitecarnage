import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const DATA_DIR = join(process.cwd(), 'src', 'data');

export async function GET(request: NextRequest) {
  try {
    // Read file service queue data
    const queuePath = join(DATA_DIR, 'fileServiceQueue.json');
    const uploads = existsSync(queuePath) ? JSON.parse(readFileSync(queuePath, 'utf8')) : [];
    
    // Read users data to get customer details
    const usersPath = join(DATA_DIR, 'users.json');
    const users = existsSync(usersPath) ? JSON.parse(readFileSync(usersPath, 'utf8')) : [];
    const userMap = new Map(users.map((user: any) => [user.id, user]));

    // Read invoices data for payment information
    const invoicesPath = join(DATA_DIR, 'invoices.json');
    const invoices = existsSync(invoicesPath) ? JSON.parse(readFileSync(invoicesPath, 'utf8')) : [];
    const invoiceMap = new Map(invoices.map((invoice: any) => [invoice.orderId, invoice]));

    // Transform uploads to order format
    const orders = uploads.map((upload: any) => {
      const user: any = userMap.get(upload.userId) || {};
      const invoice: any = invoiceMap.get(upload.id) || {};
      
      return {
        id: upload.id,
        clientName: user.name || 'Unknown',
        clientEmail: user.email || 'unknown@example.com',
        vehicle: {
          make: upload.vehicleMake || 'Unknown',
          model: upload.vehicleModel || 'Unknown',
          year: upload.vehicleYear || new Date().getFullYear(),
          fuelType: upload.fuelType || 'Unknown',
          ecuType: upload.ecuType || 'Unknown',
        },
        stage: upload.stage || 'Stage 1',
        gearboxTuning: upload.gearboxTuning || false,
        dynograph: upload.dynograph || false,
        status: upload.status || 'pending',
        uploadDate: upload.createdAt || upload.uploadDate || new Date().toISOString(),
        completedDate: upload.completedAt,
        originalFile: upload.filename,
        tunedFile: upload.tunedFilename,
        dynographFile: upload.dynographFilename,
        paymentStatus: invoice.status || 'pending',
        amount: invoice.amount || 0,
      };
    });

    // Sort by upload date (most recent first)
    orders.sort((a: any, b: any) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());

    return NextResponse.json(orders);

  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
