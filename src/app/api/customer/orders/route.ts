import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import type { Invoice } from '../../../../types';

const DATA_DIR = join(process.cwd(), 'src', 'data');

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Read file service queue data
    const queuePath = join(DATA_DIR, 'fileServiceQueue.json');
    const uploads = existsSync(queuePath) ? JSON.parse(readFileSync(queuePath, 'utf8')) : [];
    
    // Read invoices data for payment information
    const invoicesPath = join(DATA_DIR, 'invoices.json');
    const invoices = existsSync(invoicesPath) ? JSON.parse(readFileSync(invoicesPath, 'utf8')) : [];
  const invoiceMap = new Map((invoices as Invoice[]).map((invoice) => [invoice.orderId, invoice]));

    // Filter uploads for the specific user
  const userUploads = uploads.filter((upload: any) => upload.userId === userId);

    // Transform uploads to order format
    const orders = userUploads.map((upload: any) => {
      const invoice: Invoice = invoiceMap.get(upload.id) || {};
      // Calculate amount based on services
      let baseAmount = 150; // Base Stage 1 price
      if (upload.stage === 'Stage 2') baseAmount = 200;
      if (upload.stage === 'Stage 3') baseAmount = 300;
      if (upload.gearboxTuning) baseAmount += 50;
      if (upload.dynograph) baseAmount += 45;

      return {
        id: upload.id,
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
        amount: invoice.amount || baseAmount,
        description: `${upload.stage || 'Stage 1'} ECU Remap${upload.gearboxTuning ? ' + Gearbox Tuning' : ''}${upload.dynograph ? ' + Dynograph' : ''}`,
      };
    });

    // Sort by upload date (most recent first)
    orders.sort((a: { uploadDate: string }, b: { uploadDate: string }) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());

    return NextResponse.json(orders);

  } catch (error) {
    console.error('Error fetching customer orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
