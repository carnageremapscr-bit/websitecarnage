import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-02-24.acacia',
});

const DATA_DIR = join(process.cwd(), 'src', 'data');
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const sig = request.headers.get('stripe-signature');

    if (!sig || !endpointSecret) {
      return NextResponse.json(
        { error: 'Missing signature or webhook secret' },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 400 }
      );
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;
      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent);
        break;
      case 'charge.dispute.created':
        await handleChargeDisputeCreated(event.data.object as Stripe.Dispute);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  try {
    const orderId = session.metadata?.orderId;
    if (!orderId) {
      console.error('No orderId in session metadata');
      return;
    }

    // Update invoice status
    const invoicesPath = join(DATA_DIR, 'invoices.json');
    const invoices = existsSync(invoicesPath) ? JSON.parse(readFileSync(invoicesPath, 'utf8')) : [];
    
    const invoiceIndex = invoices.findIndex((invoice: any) => invoice.orderId === orderId);
    if (invoiceIndex !== -1) {
      invoices[invoiceIndex].status = 'paid';
      invoices[invoiceIndex].paidAt = new Date().toISOString();
      invoices[invoiceIndex].stripeSessionId = session.id;
      invoices[invoiceIndex].paymentMethod = session.payment_method_types?.[0] || 'card';
    } else {
      // Create new invoice record
      invoices.push({
        id: `inv_${Date.now()}`,
        orderId: orderId,
        amount: session.amount_total ? session.amount_total / 100 : 0,
        currency: session.currency || 'gbp',
        status: 'paid',
        createdAt: new Date().toISOString(),
        paidAt: new Date().toISOString(),
        stripeSessionId: session.id,
        customerEmail: session.customer_email,
        paymentMethod: session.payment_method_types?.[0] || 'card',
      });
    }

    writeFileSync(invoicesPath, JSON.stringify(invoices, null, 2));

    // Update order status to in-progress
    const queuePath = join(DATA_DIR, 'fileServiceQueue.json');
    const queue = existsSync(queuePath) ? JSON.parse(readFileSync(queuePath, 'utf8')) : [];
    
    const orderIndex = queue.findIndex((item: any) => item.id === orderId);
    if (orderIndex !== -1) {
      queue[orderIndex].status = 'in-progress';
      queue[orderIndex].paymentStatus = 'paid';
      queue[orderIndex].updatedAt = new Date().toISOString();
      writeFileSync(queuePath, JSON.stringify(queue, null, 2));
    }

    console.log(`Payment completed for order ${orderId}`);
    
    // Send WhatsApp notification
    await sendWhatsAppNotification(orderId, 'payment_completed');

  } catch (error) {
    console.error('Error handling checkout session completed:', error);
  }
}

async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  console.log(`Payment intent ${paymentIntent.id} succeeded`);
  // Additional processing if needed
}

async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  console.log(`Payment intent ${paymentIntent.id} failed`);
  
  // Update order status to payment failed
  const orderId = paymentIntent.metadata?.orderId;
  if (orderId) {
    const queuePath = join(DATA_DIR, 'fileServiceQueue.json');
    const queue = existsSync(queuePath) ? JSON.parse(readFileSync(queuePath, 'utf8')) : [];
    
    const orderIndex = queue.findIndex((item: any) => item.id === orderId);
    if (orderIndex !== -1) {
      queue[orderIndex].paymentStatus = 'failed';
      queue[orderIndex].updatedAt = new Date().toISOString();
      writeFileSync(queuePath, JSON.stringify(queue, null, 2));
    }

    // Send notification about failed payment
    await sendWhatsAppNotification(orderId, 'payment_failed');
  }
}

async function handleChargeDisputeCreated(dispute: Stripe.Dispute) {
  console.log(`Charge dispute created: ${dispute.id}`);
  
  // Log dispute for admin review
  // In a real application, you might want to:
  // 1. Send email notification to admin
  // 2. Create a task in admin dashboard
  // 3. Update order status
  
  // Send admin notification
  await fetch('/api/admin/notifications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'dispute_created',
      disputeId: dispute.id,
      chargeId: dispute.charge,
      amount: dispute.amount / 100,
      reason: dispute.reason,
    })
  }).catch(error => console.error('Failed to send admin notification:', error));
}

async function sendWhatsAppNotification(orderId: string, eventType: string) {
  try {
    await fetch('/api/admin/whatsapp-notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId,
        eventType,
      })
    });
  } catch (error) {
    console.error('Failed to send WhatsApp notification:', error);
  }
}
