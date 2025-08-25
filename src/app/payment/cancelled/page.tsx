"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { FaTimesCircle, FaRedo, FaHome, FaPhone } from "react-icons/fa";

export default function PaymentCancelled() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Cancelled Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-red-500 rounded-full mb-4">
            <FaTimesCircle className="text-4xl text-white" />
          </div>
          <h1 className="text-4xl font-black text-white mb-2">Payment Cancelled</h1>
          <p className="text-xl text-gray-400">
            Your payment was cancelled and no charges were made
          </p>
        </div>

        {/* Information Card */}
        <div className="bg-gray-800 rounded-xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">What Happened?</h2>
          <div className="text-gray-300 space-y-4">
            <p>
              Your payment was cancelled before completion. This could happen for several reasons:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>You clicked the back button or closed the payment window</li>
              <li>Your payment session timed out</li>
              <li>There was an issue with your payment method</li>
              <li>You decided not to proceed with the purchase</li>
            </ul>
            <p className="text-yellow-400 font-medium">
              ⚠️ No charges have been made to your account
            </p>
          </div>
        </div>

        {/* Options */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-8 text-white mb-8">
          <h3 className="text-2xl font-bold mb-4">What Would You Like to Do?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold mb-2 flex items-center gap-2">
                <FaRedo />
                Try Payment Again
              </h4>
              <p className="text-sm mb-4">
                Go back to your order and complete the payment process
              </p>
              <button
                onClick={() => router.push('/dashboard')}
                className="bg-white text-blue-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition-colors"
              >
                Return to Dashboard
              </button>
            </div>
            <div>
              <h4 className="font-bold mb-2 flex items-center gap-2">
                <FaPhone />
                Need Help?
              </h4>
              <p className="text-sm mb-4">
                Contact our support team if you're experiencing payment issues
              </p>
              <a
                href="mailto:support@carnageremaps.co.uk"
                className="bg-white text-blue-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition-colors inline-block"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>

        {/* Alternative Payment Methods */}
        <div className="bg-gray-800 rounded-xl p-8 shadow-lg mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Alternative Payment Options</h3>
          <div className="text-gray-300 space-y-4">
            <p>If you're having trouble with card payments, we offer several alternatives:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="font-bold text-white mb-2">Bank Transfer</h4>
                <p className="text-sm">Direct bank transfer for larger orders</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="font-bold text-white mb-2">PayPal</h4>
                <p className="text-sm">Pay securely with your PayPal account</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="font-bold text-white mb-2">Phone Payment</h4>
                <p className="text-sm">Call us to process payment over the phone</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-bold hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2"
          >
            <FaRedo />
            Try Again
          </button>
          <button
            onClick={() => router.push('/')}
            className="bg-gray-700 text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
          >
            <FaHome />
            Back to Home
          </button>
        </div>

        {/* Contact Information */}
        <div className="mt-12 text-center">
          <h4 className="text-lg font-bold text-white mb-2">Still Need Help?</h4>
          <p className="text-gray-400 mb-4">
            Our support team is here to help with any payment issues
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
            <a href="mailto:support@carnageremaps.co.uk" className="text-yellow-400 hover:text-yellow-300">
              📧 support@carnageremaps.co.uk
            </a>
            <a href="tel:+441234567890" className="text-yellow-400 hover:text-yellow-300">
              📞 +44 (0) 1234 567890
            </a>
            <a href="https://wa.me/441234567890" className="text-yellow-400 hover:text-yellow-300">
              💬 WhatsApp Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
