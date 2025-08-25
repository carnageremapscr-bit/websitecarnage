"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FaCheckCircle, FaDownload, FaHome } from "react-icons/fa";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get('session_id');
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      fetchOrderDetails();
    }
  }, [sessionId]);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`/api/stripe/get-session?session_id=${sessionId}`);
      if (response.ok) {
        const data = await response.json();
        setOrderDetails(data);
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-500 rounded-full mb-4">
            <FaCheckCircle className="text-4xl text-white" />
          </div>
          <h1 className="text-4xl font-black text-white mb-2">Payment Successful!</h1>
          <p className="text-xl text-gray-400">
            Your order has been received and payment processed
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-gray-800 rounded-xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Order Details</h2>
          
          {orderDetails && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm">Order ID</label>
                  <p className="text-white font-mono text-lg">#{orderDetails.orderId || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Amount Paid</label>
                  <p className="text-green-400 font-bold text-xl">
                    £{((orderDetails.amount_total || 0) / 100).toFixed(2)}
                  </p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Payment Method</label>
                  <p className="text-white capitalize">
                    {orderDetails.payment_method_types?.[0] || 'Card'}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm">Email</label>
                  <p className="text-white">{orderDetails.customer_email || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Transaction ID</label>
                  <p className="text-white font-mono text-sm">{sessionId}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Status</label>
                  <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Paid
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-8 text-black mb-8">
          <h3 className="text-2xl font-bold mb-4">What Happens Next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-yellow-400 font-bold text-xl">1</span>
              </div>
              <h4 className="font-bold mb-2">Processing</h4>
              <p className="text-sm">Our experts will begin processing your ECU file within 24 hours</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-yellow-400 font-bold text-xl">2</span>
              </div>
              <h4 className="font-bold mb-2">Tuning</h4>
              <p className="text-sm">Your file will be professionally remapped for optimal performance</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-yellow-400 font-bold text-xl">3</span>
              </div>
              <h4 className="font-bold mb-2">Delivery</h4>
              <p className="text-sm">You'll receive your tuned file and dynograph via your dashboard</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-blue-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
          >
            <FaDownload />
            Go to Dashboard
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
          <h4 className="text-lg font-bold text-white mb-2">Need Help?</h4>
          <p className="text-gray-400 mb-4">
            Contact our support team if you have any questions about your order
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

export default function PaymentSuccess() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400"></div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}
