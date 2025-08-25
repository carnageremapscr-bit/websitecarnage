import { NextRequest, NextResponse } from 'next/server';

// This would typically integrate with Stripe API
// For now, we'll create a mock implementation
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get('filter') || 'all';
    const dateRange = searchParams.get('dateRange') || 'month';

    // Mock Stripe transactions data
    // In production, you would use Stripe SDK:
    // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    // const charges = await stripe.charges.list({ limit: 100 });

    const mockTransactions = [
      {
        id: 'ch_1234567890abcdef',
        orderId: 'order_001',
        customerName: 'John Smith',
        customerEmail: 'john@example.com',
        amount: 15000, // Amount in pence
        currency: 'gbp',
        status: 'succeeded',
        created: Math.floor(Date.now() / 1000) - 86400, // 1 day ago
        description: 'Stage 1 ECU Remap',
        paymentMethod: 'card',
        receiptUrl: 'https://pay.stripe.com/receipts/...',
        refunded: false,
      },
      {
        id: 'ch_0987654321fedcba',
        orderId: 'order_002',
        customerName: 'Sarah Johnson',
        customerEmail: 'sarah@example.com',
        amount: 20000,
        currency: 'gbp',
        status: 'succeeded',
        created: Math.floor(Date.now() / 1000) - 172800, // 2 days ago
        description: 'Stage 2 ECU Remap + Dynograph',
        paymentMethod: 'card',
        receiptUrl: 'https://pay.stripe.com/receipts/...',
        refunded: false,
      },
      {
        id: 'ch_abcdef1234567890',
        orderId: 'order_003',
        customerName: 'Mike Wilson',
        customerEmail: 'mike@example.com',
        amount: 4500,
        currency: 'gbp',
        status: 'succeeded',
        created: Math.floor(Date.now() / 1000) - 259200, // 3 days ago
        description: 'Dynograph Add-on',
        paymentMethod: 'card',
        receiptUrl: 'https://pay.stripe.com/receipts/...',
        refunded: true,
        refundAmount: 4500,
      },
      {
        id: 'ch_fedcba0987654321',
        orderId: 'order_004',
        customerName: 'Emma Davis',
        customerEmail: 'emma@example.com',
        amount: 18000,
        currency: 'gbp',
        status: 'pending',
        created: Math.floor(Date.now() / 1000) - 3600, // 1 hour ago
        description: 'Stage 1 ECU Remap + Gearbox Tuning',
        paymentMethod: 'card',
        receiptUrl: null,
        refunded: false,
      },
      {
        id: 'ch_1111222233334444',
        orderId: 'order_005',
        customerName: 'David Brown',
        customerEmail: 'david@example.com',
        amount: 25000,
        currency: 'gbp',
        status: 'failed',
        created: Math.floor(Date.now() / 1000) - 7200, // 2 hours ago
        description: 'Stage 3 ECU Remap',
        paymentMethod: 'card',
        receiptUrl: null,
        refunded: false,
      },
    ];

    // Apply filters
    let filteredTransactions = mockTransactions;
    
    if (filter !== 'all') {
      filteredTransactions = filteredTransactions.filter(t => t.status === filter);
    }

    // Apply date range filter
    const now = new Date();
    let startDate = new Date(0); // Default to beginning of time

    switch (dateRange) {
      case 'today':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'all':
      default:
        startDate = new Date(0);
        break;
    }

    filteredTransactions = filteredTransactions.filter(t => 
      new Date(t.created * 1000) >= startDate
    );

    // Calculate totals
    const totalRevenue = filteredTransactions
      .filter(t => t.status === 'succeeded')
      .reduce((sum, t) => sum + t.amount, 0) / 100; // Convert from pence to pounds

    const totalTransactions = filteredTransactions.length;

    return NextResponse.json({
      transactions: filteredTransactions,
      totalRevenue,
      totalTransactions,
    });

  } catch (error) {
    console.error('Error fetching Stripe transactions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
}
