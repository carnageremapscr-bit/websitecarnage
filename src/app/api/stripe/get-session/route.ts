import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-02-24.acacia',
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'payment_intent']
    });

    return NextResponse.json({
      id: session.id,
      orderId: session.metadata?.orderId,
      amount_total: session.amount_total,
      currency: session.currency,
      customer_email: session.customer_email,
      payment_status: session.payment_status,
      payment_method_types: session.payment_method_types,
      status: session.status,
      created: session.created,
      line_items: session.line_items?.data,
    });

  } catch (error) {
    console.error('Error retrieving Stripe session:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve session' },
      { status: 500 }
    );
  }
}
