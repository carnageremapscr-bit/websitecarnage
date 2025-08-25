"use client";
import React, { useState, useEffect } from "react";
import { FaDownload, FaClock, FaCheck, FaTimes, FaEye, FaWhatsapp } from "react-icons/fa";

interface Order {
  id: string;
  clientName: string;
  clientEmail: string;
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
  uploadDate: string;
  completedDate?: string;
  originalFile?: string;
  tunedFile?: string;
  dynographFile?: string;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  amount: number;
}

export default function AdminOrderManagement() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed' | 'cancelled'>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/admin/orders');
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

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    try {
      const response = await fetch('/api/admin/orders/update-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId, status }),
      });

      if (response.ok) {
        fetchOrders();
        // Send WhatsApp notification
        await sendWhatsAppNotification(orderId, status);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const sendWhatsAppNotification = async (orderId: string, status: string) => {
    try {
      await fetch('/api/admin/whatsapp-notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId, status }),
      });
    } catch (error) {
      console.error('Error sending WhatsApp notification:', error);
    }
  };

  const uploadTunedFile = async (orderId: string, file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('orderId', orderId);

      const response = await fetch('/api/admin/upload-tuned-file', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        fetchOrders();
        alert('Tuned file uploaded successfully!');
      }
    } catch (error) {
      console.error('Error uploading tuned file:', error);
    }
  };

  const generateDynograph = async (orderId: string) => {
    try {
      const response = await fetch('/api/admin/generate-dynograph', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId }),
      });

      if (response.ok) {
        fetchOrders();
        alert('Dynograph generated successfully!');
      }
    } catch (error) {
      console.error('Error generating dynograph:', error);
    }
  };

  const filteredOrders = orders.filter(order => 
    filter === 'all' ? true : order.status === filter
  );

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
        <h1 className="text-3xl font-bold text-white">Order Management</h1>
        
        {/* Filter Buttons */}
        <div className="flex gap-2">
          {['all', 'pending', 'in-progress', 'completed', 'cancelled'].map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption as any)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === filterOption
                  ? 'bg-yellow-400 text-black'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
              {filterOption !== 'all' && (
                <span className="ml-2 bg-black/20 px-2 py-1 rounded-full text-xs">
                  {orders.filter(o => o.status === filterOption).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-white font-medium">Order ID</th>
                <th className="px-6 py-4 text-left text-white font-medium">Client</th>
                <th className="px-6 py-4 text-left text-white font-medium">Vehicle</th>
                <th className="px-6 py-4 text-left text-white font-medium">Stage</th>
                <th className="px-6 py-4 text-left text-white font-medium">Status</th>
                <th className="px-6 py-4 text-left text-white font-medium">Payment</th>
                <th className="px-6 py-4 text-left text-white font-medium">Date</th>
                <th className="px-6 py-4 text-left text-white font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 text-white font-mono text-sm">
                    #{order.id.substring(0, 8)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-white font-medium">{order.clientName}</div>
                    <div className="text-gray-400 text-sm">{order.clientEmail}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-white">
                      {order.vehicle.make} {order.vehicle.model}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {order.vehicle.year} • {order.vehicle.fuelType} • {order.vehicle.ecuType}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-medium">
                      {order.stage}
                    </span>
                    {order.gearboxTuning && (
                      <span className="ml-1 bg-purple-500 text-white px-2 py-1 rounded text-xs">
                        Gearbox
                      </span>
                    )}
                    {order.dynograph && (
                      <span className="ml-1 bg-green-500 text-white px-2 py-1 rounded text-xs">
                        Dyno
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`${getStatusColor(order.status)} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                      £{order.amount}
                    </div>
                    <div className="text-gray-400 text-sm capitalize">
                      {order.paymentStatus}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">
                    {new Date(order.uploadDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {setSelectedOrder(order); setShowModal(true);}}
                        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      
                      {order.status === 'pending' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'in-progress')}
                          className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                          title="Start Processing"
                        >
                          <FaClock />
                        </button>
                      )}
                      
                      {order.status === 'in-progress' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'completed')}
                          className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                          title="Mark Complete"
                        >
                          <FaCheck />
                        </button>
                      )}
                      
                      <button
                        onClick={() => sendWhatsAppNotification(order.id, order.status)}
                        className="p-2 bg-green-400 text-white rounded hover:bg-green-500 transition-colors"
                        title="Send WhatsApp Update"
                      >
                        <FaWhatsapp />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12 bg-gray-800 rounded-xl">
          <p className="text-gray-400 text-lg">No orders found for the selected filter.</p>
        </div>
      )}

      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">Order Details</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-sm">Order ID</label>
                  <p className="text-white font-mono">#{selectedOrder.id}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Status</label>
                  <p className={`${getStatusColor(selectedOrder.status)} text-white px-3 py-1 rounded-full text-sm font-medium inline-block`}>
                    {selectedOrder.status}
                  </p>
                </div>
              </div>
              
              {/* File Upload Section */}
              <div className="border-t border-gray-700 pt-4">
                <h3 className="text-lg font-semibold text-white mb-2">File Management</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <label className="text-gray-400 text-sm">Original File</label>
                    {selectedOrder.originalFile ? (
                      <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 w-full">
                        <FaDownload className="inline mr-2" />
                        Download
                      </button>
                    ) : (
                      <p className="text-gray-500 text-sm mt-2">Not available</p>
                    )}
                  </div>
                  
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <label className="text-gray-400 text-sm">Tuned File</label>
                    {selectedOrder.tunedFile ? (
                      <button className="mt-2 bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 w-full">
                        <FaDownload className="inline mr-2" />
                        Download
                      </button>
                    ) : (
                      <input
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) uploadTunedFile(selectedOrder.id, file);
                        }}
                        className="mt-2 w-full text-xs text-gray-400"
                        accept=".bin,.ori,.kess,.mpps"
                      />
                    )}
                  </div>
                  
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <label className="text-gray-400 text-sm">Dynograph</label>
                    {selectedOrder.dynograph ? (
                      selectedOrder.dynographFile ? (
                        <button className="mt-2 bg-purple-500 text-white px-3 py-1 rounded text-sm hover:bg-purple-600 w-full">
                          <FaDownload className="inline mr-2" />
                          Download PDF
                        </button>
                      ) : (
                        <button
                          onClick={() => generateDynograph(selectedOrder.id)}
                          className="mt-2 bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 w-full"
                        >
                          Generate Dyno
                        </button>
                      )
                    ) : (
                      <p className="text-gray-500 text-sm mt-2">Not requested</p>
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
