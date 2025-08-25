"use client";
import React, { useState, useEffect } from "react";
import { FaCreditCard, FaDownload, FaEye, FaFilter } from "react-icons/fa";

interface StripeTransaction {
  id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'pending' | 'failed' | 'canceled' | 'refunded';
  created: number;
  description: string;
  paymentMethod: string;
  receiptUrl?: string;
  refunded: boolean;
  refundAmount?: number;
}

export default function AdminStripeTransactions() {
  const [transactions, setTransactions] = useState<StripeTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'succeeded' | 'pending' | 'failed' | 'refunded'>('all');
  const [dateRange, setDateRange] = useState<'all' | 'today' | 'week' | 'month'>('month');
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);

  useEffect(() => {
    fetchTransactions();
  }, [filter, dateRange]);

  const fetchTransactions = async () => {
    try {
      const response = await fetch(`/api/admin/stripe-transactions?filter=${filter}&dateRange=${dateRange}`);
      if (response.ok) {
        const data = await response.json();
        setTransactions(data.transactions);
        setTotalRevenue(data.totalRevenue);
        setTotalTransactions(data.totalTransactions);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportTransactions = async () => {
    try {
      const response = await fetch(`/api/admin/stripe-transactions/export?filter=${filter}&dateRange=${dateRange}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `stripe-transactions-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error exporting transactions:', error);
    }
  };

  const processRefund = async (transactionId: string, amount?: number) => {
    if (!confirm('Are you sure you want to process this refund?')) return;

    try {
      const response = await fetch('/api/admin/stripe-refund', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transactionId, amount }),
      });

      if (response.ok) {
        fetchTransactions();
        alert('Refund processed successfully!');
      } else {
        const error = await response.json();
        alert(`Refund failed: ${error.message}`);
      }
    } catch (error) {
      console.error('Error processing refund:', error);
      alert('Error processing refund. Please try again.');
    }
  };

  const getStatusColor = (status: StripeTransaction['status']) => {
    switch (status) {
      case 'succeeded': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'failed': return 'bg-red-500';
      case 'canceled': return 'bg-gray-500';
      case 'refunded': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredTransactions = transactions.filter(transaction => 
    filter === 'all' ? true : transaction.status === filter
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Stripe Transactions</h1>
        <button
          onClick={exportTransactions}
          className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors flex items-center gap-2"
        >
          <FaDownload />
          Export CSV
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm font-medium">Total Revenue</p>
              <p className="text-3xl font-bold">£{totalRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <FaCreditCard className="text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm font-medium">Total Transactions</p>
              <p className="text-3xl font-bold">{totalTransactions}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <FaCreditCard className="text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm font-medium">Average Transaction</p>
              <p className="text-3xl font-bold">
                £{totalTransactions > 0 ? Math.round(totalRevenue / totalTransactions) : 0}
              </p>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <FaCreditCard className="text-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center bg-gray-800 p-4 rounded-xl">
        <div className="flex items-center gap-2">
          <FaFilter className="text-yellow-400" />
          <span className="text-white font-medium">Status:</span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="bg-gray-700 text-white px-3 py-2 rounded-lg"
          >
            <option value="all">All Statuses</option>
            <option value="succeeded">Succeeded</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-white font-medium">Period:</span>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as any)}
            className="bg-gray-700 text-white px-3 py-2 rounded-lg"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-white font-medium">Transaction ID</th>
                <th className="px-6 py-4 text-left text-white font-medium">Customer</th>
                <th className="px-6 py-4 text-left text-white font-medium">Order ID</th>
                <th className="px-6 py-4 text-left text-white font-medium">Amount</th>
                <th className="px-6 py-4 text-left text-white font-medium">Status</th>
                <th className="px-6 py-4 text-left text-white font-medium">Payment Method</th>
                <th className="px-6 py-4 text-left text-white font-medium">Date</th>
                <th className="px-6 py-4 text-left text-white font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 text-white font-mono text-sm">
                    {transaction.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-white font-medium">{transaction.customerName}</div>
                    <div className="text-gray-400 text-sm">{transaction.customerEmail}</div>
                  </td>
                  <td className="px-6 py-4 text-white font-mono text-sm">
                    #{transaction.orderId?.substring(0, 8) || 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-white font-bold">
                      £{(transaction.amount / 100).toFixed(2)}
                    </div>
                    {transaction.refunded && transaction.refundAmount && (
                      <div className="text-red-400 text-sm">
                        -£{(transaction.refundAmount / 100).toFixed(2)} refunded
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`${getStatusColor(transaction.status)} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-300 capitalize">
                    {transaction.paymentMethod}
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">
                    {new Date(transaction.created * 1000).toLocaleDateString()} <br />
                    {new Date(transaction.created * 1000).toLocaleTimeString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {transaction.receiptUrl && (
                        <a
                          href={transaction.receiptUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                          title="View Receipt"
                        >
                          <FaEye />
                        </a>
                      )}
                      
                      {transaction.status === 'succeeded' && !transaction.refunded && (
                        <button
                          onClick={() => processRefund(transaction.id)}
                          className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                          title="Process Refund"
                        >
                          Refund
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredTransactions.length === 0 && (
        <div className="text-center py-12 bg-gray-800 rounded-xl">
          <p className="text-gray-400 text-lg">No transactions found for the selected filters.</p>
        </div>
      )}
    </div>
  );
}
