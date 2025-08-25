"use client";
import React, { useState, useEffect } from "react";
import { FaDownload, FaClock, FaCheck, FaTimes, FaCreditCard, FaEye, FaFilePdf } from "react-icons/fa";
import StripeCheckout from "./StripeCheckout";

interface Order {
  id: string;
  vehicle: {
    make: string;
    model: string;
    year: number;
    fuelType: string;
    ecuType: string;
  };
  stage: string;
  gearboxTuning: boolean;
  dynograph: boolean;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  uploadDate: string;
  completedDate?: string;
  originalFile?: string;
  tunedFile?: string;
  dynographFile?: string;
  amount: number;
  description: string;
}

export default function OrderTrackingSection() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      // Get current user
      const user = localStorage.getItem('carnage_user');
      if (!user) return;
      
      const parsedUser = JSON.parse(user);
      
      const response = await fetch(`/api/customer/orders?userId=${parsedUser.id}`);
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = async (orderId: string, fileType: 'original' | 'tuned' | 'dynograph') => {
    try {
      const response = await fetch(`/api/customer/download-file?orderId=${orderId}&fileType=${fileType}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `${fileType}_file_${orderId}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    fetchOrders(); // Refresh orders
    alert('Payment successful! Your order is now being processed.');
  };

  const handlePaymentError = (error: string) => {
    alert(`Payment failed: ${error}`);
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'in-progress': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getPaymentStatusColor = (status: Order['paymentStatus']) => {
    switch (status) {
      case 'paid': return 'text-green-400';
      case 'pending': return 'text-yellow-400';
      case 'refunded': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending': return <FaClock />;
      case 'in-progress': return <FaClock className="animate-spin" />;
      case 'completed': return <FaCheck />;
      case 'cancelled': return <FaTimes />;
      default: return <FaClock />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">My Orders</h1>
          <p className="text-gray-400 mt-2">Track your ECU tuning orders and download completed files</p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12 bg-gray-800 rounded-xl">
          <div className="text-6xl mb-4">🚗</div>
          <h3 className="text-xl font-bold text-white mb-2">No Orders Yet</h3>
          <p className="text-gray-400 mb-6">
            You haven&apos;t placed any orders yet. Upload your first ECU file to get started!
          </p>
          <button className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-500 transition-colors">
            Upload ECU File
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              {/* Order Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {order.vehicle.make} {order.vehicle.model}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Order #{order.id.substring(0, 8)}
                  </p>
                </div>
                <div className={`${getStatusColor(order.status)} text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2`}>
                  {getStatusIcon(order.status)}
                  {order.status}
                </div>
              </div>

              {/* Vehicle Details */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Year:</span>
                  <span className="text-white">{order.vehicle.year}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Fuel:</span>
                  <span className="text-white">{order.vehicle.fuelType}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">ECU:</span>
                  <span className="text-white">{order.vehicle.ecuType}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Stage:</span>
                  <span className="text-yellow-400 font-medium">{order.stage}</span>
                </div>
              </div>

              {/* Services */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs">
                  {order.stage}
                </span>
                {order.gearboxTuning && (
                  <span className="bg-purple-500 text-white px-2 py-1 rounded text-xs">
                    Gearbox
                  </span>
                )}
                {order.dynograph && (
                  <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                    Dynograph
                  </span>
                )}
              </div>

              {/* Payment Status */}
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-700">
                <div>
                  <span className="text-gray-400 text-sm">Amount:</span>
                  <span className="text-white font-bold ml-2">£{order.amount}</span>
                </div>
                <div className={`${getPaymentStatusColor(order.paymentStatus)} font-medium capitalize`}>
                  {order.paymentStatus}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                {order.paymentStatus === 'pending' && (
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowPaymentModal(true);
                    }}
                    className="w-full bg-yellow-400 text-black py-2 px-4 rounded-lg font-bold hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2"
                  >
                    <FaCreditCard />
                    Pay Now
                  </button>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowDetailsModal(true);
                    }}
                    className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <FaEye />
                    Details
                  </button>

                  {order.status === 'completed' && (
                    <div className="flex gap-1 flex-1">
                      {order.tunedFile && (
                        <button
                          onClick={() => downloadFile(order.id, 'tuned')}
                          className="flex-1 bg-green-500 text-white py-2 px-2 rounded-lg hover:bg-green-600 transition-colors text-sm"
                          title="Download Tuned File"
                        >
                          <FaDownload />
                        </button>
                      )}
                      {order.dynographFile && (
                        <button
                          onClick={() => downloadFile(order.id, 'dynograph')}
                          className="flex-1 bg-purple-500 text-white py-2 px-2 rounded-lg hover:bg-purple-600 transition-colors text-sm"
                          title="Download Dynograph PDF"
                        >
                          <FaFilePdf />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Order Date */}
              <div className="mt-4 text-xs text-gray-500 text-center">
                Ordered: {new Date(order.uploadDate).toLocaleDateString()}
                {order.completedDate && (
                  <span className="ml-2">
                    • Completed: {new Date(order.completedDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">Complete Payment</h2>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <FaTimes />
              </button>
            </div>
            
            <StripeCheckout
              orderId={selectedOrder.id}
              amount={selectedOrder.amount * 100} // Convert to pence
              description={selectedOrder.description}
              customerEmail={JSON.parse(localStorage.getItem('carnage_user') || '{}').email || ''}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">Order Details</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Order Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-sm">Order ID</label>
                  <p className="text-white font-mono">#{selectedOrder.id}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Status</label>
                  <p className={`${getStatusColor(selectedOrder.status)} text-white px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-2`}>
                    {getStatusIcon(selectedOrder.status)}
                    {selectedOrder.status}
                  </p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Payment Status</label>
                  <p className={`${getPaymentStatusColor(selectedOrder.paymentStatus)} font-medium capitalize`}>
                    {selectedOrder.paymentStatus}
                  </p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Amount</label>
                  <p className="text-white font-bold">£{selectedOrder.amount}</p>
                </div>
              </div>

              {/* Vehicle Details */}
              <div className="border-t border-gray-700 pt-4">
                <h3 className="text-lg font-bold text-white mb-3">Vehicle Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm">Make & Model</label>
                    <p className="text-white">{selectedOrder.vehicle.make} {selectedOrder.vehicle.model}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Year</label>
                    <p className="text-white">{selectedOrder.vehicle.year}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Fuel Type</label>
                    <p className="text-white">{selectedOrder.vehicle.fuelType}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">ECU Type</label>
                    <p className="text-white">{selectedOrder.vehicle.ecuType}</p>
                  </div>
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="border-t border-gray-700 pt-4">
                <h3 className="text-lg font-bold text-white mb-3">Order Progress</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-white">Order placed</span>
                    <span className="text-gray-400 text-sm ml-auto">
                      {new Date(selectedOrder.uploadDate).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      selectedOrder.paymentStatus === 'paid' ? 'bg-green-500' : 'bg-gray-500'
                    }`}></div>
                    <span className="text-white">Payment confirmed</span>
                    {selectedOrder.paymentStatus === 'paid' && (
                      <span className="text-green-400 text-sm ml-auto">✓ Paid</span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      selectedOrder.status === 'in-progress' || selectedOrder.status === 'completed' 
                        ? 'bg-green-500' : 'bg-gray-500'
                    }`}></div>
                    <span className="text-white">Processing started</span>
                    {(selectedOrder.status === 'in-progress' || selectedOrder.status === 'completed') && (
                      <span className="text-blue-400 text-sm ml-auto">✓ In progress</span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      selectedOrder.status === 'completed' ? 'bg-green-500' : 'bg-gray-500'
                    }`}></div>
                    <span className="text-white">Files ready for download</span>
                    {selectedOrder.status === 'completed' && selectedOrder.completedDate && (
                      <span className="text-green-400 text-sm ml-auto">
                        ✓ {new Date(selectedOrder.completedDate).toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
