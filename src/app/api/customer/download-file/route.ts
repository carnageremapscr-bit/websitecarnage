import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const DATA_DIR = join(process.cwd(), 'src', 'data');
const UPLOADS_DIR = join(process.cwd(), 'uploads');

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');
    const fileType = searchParams.get('fileType');

    if (!orderId || !fileType) {
      return NextResponse.json(
        { error: 'Order ID and file type are required' },
        { status: 400 }
      );
    }

    // Read queue data to find the order
    const queuePath = join(DATA_DIR, 'fileServiceQueue.json');
    const queue = existsSync(queuePath) ? JSON.parse(readFileSync(queuePath, 'utf8')) : [];
    
    const order = queue.find((item: any) => item.id === orderId);
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Check if order is completed (for tuned files)
    if (fileType === 'tuned' && order.status !== 'completed') {
      return NextResponse.json(
        { error: 'File not yet available - order not completed' },
        { status: 400 }
      );
    }

    // Get filename based on file type
    let filename: string;
    switch (fileType) {
      case 'original':
        filename = order.filename;
        break;
      case 'tuned':
        filename = order.tunedFilename;
        break;
      case 'dynograph':
        filename = order.dynographFilename;
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid file type' },
          { status: 400 }
        );
    }

    if (!filename) {
      return NextResponse.json(
        { error: `${fileType} file not available` },
        { status: 404 }
      );
    }

    const filePath = join(UPLOADS_DIR, filename);
    if (!existsSync(filePath)) {
      return NextResponse.json(
        { error: 'File not found on server' },
        { status: 404 }
      );
    }

    // Read file and return as blob
    const fileBuffer = readFileSync(filePath);
    
    // Determine content type based on file extension
    const getContentType = (filename: string) => {
      const ext = filename.toLowerCase().split('.').pop();
      switch (ext) {
        case 'pdf':
          return 'application/pdf';
        case 'bin':
        case 'ori':
        case 'kess':
        case 'mpps':
          return 'application/octet-stream';
        default:
          return 'application/octet-stream';
      }
    };

    const contentType = getContentType(filename);
    
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': fileBuffer.length.toString(),
      },
    });

  } catch (error) {
    console.error('Error downloading file:', error);
    return NextResponse.json(
      { error: 'Failed to download file' },
      { status: 500 }
    );
  }
}
