import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-18.acacia',
});

export async function POST(request: NextRequest) {
  try {
    const { orderId, amount, description, customerEmail } = await request.json();

    if (!orderId || !amount || !description || !customerEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: description,
              description: `Order #${orderId} - Carnage Remaps ECU Tuning`,
              images: ['https://carnageremaps.co.uk/logo.png'], // Add your logo URL
            },
            unit_amount: amount, // Amount in pence
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/payment/cancelled`,
      customer_email: customerEmail,
      metadata: {
        orderId: orderId,
        service: 'ECU Tuning',
      },
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['GB', 'IE'], // UK and Ireland
      },
    });

    return NextResponse.json({ id: session.id, url: session.url });

  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
