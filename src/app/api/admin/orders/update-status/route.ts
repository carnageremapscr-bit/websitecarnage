import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const DATA_DIR = join(process.cwd(), 'src', 'data');

export async function POST(request: NextRequest) {
  try {
    const { orderId, status } = await request.json();

    if (!orderId || !status) {
      return NextResponse.json(
        { error: 'Order ID and status are required' },
        { status: 400 }
      );
    }

    // Read current queue data
    const queuePath = join(DATA_DIR, 'fileServiceQueue.json');
    const queue = existsSync(queuePath) ? JSON.parse(readFileSync(queuePath, 'utf8')) : [];

    // Find and update the order
    const orderIndex = queue.findIndex((item: any) => item.id === orderId);
    if (orderIndex === -1) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Update the order status
    queue[orderIndex].status = status;
    queue[orderIndex].updatedAt = new Date().toISOString();
    
    if (status === 'completed') {
      queue[orderIndex].completedAt = new Date().toISOString();
    }

    // Write updated data back to file
    writeFileSync(queuePath, JSON.stringify(queue, null, 2));

    return NextResponse.json({ 
      success: true, 
      message: 'Order status updated successfully' 
    });

  } catch (error) {
    console.error('Error updating order status:', error);
    return NextResponse.json(
      { error: 'Failed to update order status' },
      { status: 500 }
    );
  }
}
