"use client";
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

interface StripeCheckoutProps {
  orderId: string;
  amount: number;
  description: string;
  customerEmail: string;
  onSuccess: (paymentIntent: unknown) => void;
  onError: (error: string) => void;
}

export default function StripeCheckout({ 
  orderId, 
  amount, 
  description, 
  customerEmail, 
  onError 
}: StripeCheckoutProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const stripe = await stripePromise;
      
      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      // Create checkout session
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          amount,
          description,
          customerEmail,
        }),
      });

      const session = await response.json();

      if (!response.ok) {
        throw new Error(session.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

    } catch (error) {
      console.error('Payment error:', error);
      onError(error instanceof Error ? error.message : 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-white mb-4">Payment Details</h3>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-400">Order ID:</span>
          <span className="text-white font-mono">#{orderId}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Description:</span>
          <span className="text-white">{description}</span>
        </div>
        <div className="flex justify-between text-lg font-bold">
          <span className="text-gray-400">Total:</span>
          <span className="text-yellow-400">£{(amount / 100).toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={handlePayment}
        disabled={loading}
        className={`w-full py-3 px-6 rounded-lg font-bold text-lg transition-all duration-300 ${
          loading
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 hover:shadow-lg hover:scale-105'
        }`}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-400"></div>
            Processing...
          </div>
        ) : (
          'Pay Now with Stripe'
        )}
      </button>

      <div className="mt-4 text-center">
        <p className="text-gray-400 text-sm">
          Secure payment powered by Stripe
        </p>
        <div className="flex justify-center items-center gap-2 mt-2">
          <span className="text-xs text-gray-500">🔒 SSL Encrypted</span>
          <span className="text-xs text-gray-500">•</span>
          <span className="text-xs text-gray-500">💳 All Cards Accepted</span>
        </div>
      </div>
    </div>
  );
}
