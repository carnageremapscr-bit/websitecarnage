import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get('filter') || 'all';
    const dateRange = searchParams.get('dateRange') || 'month';

    // This would typically fetch from Stripe API
    // For now, using the same mock data structure
    const mockTransactions = [
      {
        id: 'ch_1234567890abcdef',
        orderId: 'order_001',
        customerName: 'John Smith',
        customerEmail: 'john@example.com',
        amount: 15000,
        currency: 'gbp',
        status: 'succeeded',
        created: Math.floor(Date.now() / 1000) - 86400,
        description: 'Stage 1 ECU Remap',
        paymentMethod: 'card',
        refunded: false,
      },
      // Add more mock data as needed
    ];

    // Apply the same filtering logic as the main endpoint
    let filteredTransactions = mockTransactions;
    
    if (filter !== 'all') {
      filteredTransactions = filteredTransactions.filter(t => t.status === filter);
    }

    // Generate CSV content
    const csvHeaders = [
      'Transaction ID',
      'Order ID',
      'Customer Name',
      'Customer Email',
      'Amount (£)',
      'Currency',
      'Status',
      'Payment Method',
      'Description',
      'Date',
      'Refunded'
    ];

    const csvRows = filteredTransactions.map(transaction => [
      transaction.id,
      transaction.orderId || '',
      transaction.customerName,
      transaction.customerEmail,
      (transaction.amount / 100).toFixed(2),
      transaction.currency.toUpperCase(),
      transaction.status,
      transaction.paymentMethod,
      transaction.description,
      new Date(transaction.created * 1000).toISOString().split('T')[0],
      transaction.refunded ? 'Yes' : 'No'
    ]);

    const csvContent = [
      csvHeaders.join(','),
      ...csvRows.map(row => row.map(field => `"${field}"`).join(','))
    ].join('\n');

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="stripe-transactions-${new Date().toISOString().split('T')[0]}.csv"`
      }
    });

  } catch (error) {
    console.error('Error exporting transactions:', error);
    return NextResponse.json(
      { error: 'Failed to export transactions' },
      { status: 500 }
    );
  }
}
