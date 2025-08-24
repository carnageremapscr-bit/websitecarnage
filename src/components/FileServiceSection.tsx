

import React, { useEffect, useState } from "react";

const statusOptions = ["Pending", "In Progress", "Completed"];

interface FileServiceSectionProps {
  isAdmin?: boolean;
}

// Admin-only: Manage file status and deletion
const FileServiceSection: React.FC<FileServiceSectionProps> = ({ isAdmin = false }) => {
  interface QueueItem {
    id: string;
    filename: string;
    status: string;
  }

  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQueue = async () => {
      try {
        const response = await fetch("/api/admin/fileServiceQueue");
        const data = await response.json();
        setQueue(data);
      } catch (error) {
        console.error("Error fetching file service queue:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQueue();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    if (!isAdmin) return;
    try {
      const response = await fetch("/api/admin/fileServiceQueue", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (response.ok) {
        setQueue(queue => queue.map(item => item.id === id ? { ...item, status: newStatus } : item));
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!isAdmin) return;
    if (!window.confirm("Are you sure you want to delete/void this file?")) return;
    try {
      const response = await fetch(`/api/admin/fileServiceQueue`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        setQueue(queue => queue.filter(item => item.id !== id));
      }
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  if (loading) {
    return (
      <div className="text-center text-yellow-400">
        Loading file service queue...
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Admin File Status Management</h2>
      <table className="w-full border-collapse border border-yellow-400">
        <thead>
          <tr className="bg-yellow-400 text-black">
            <th className="p-2 border border-yellow-400">#</th>
            <th className="p-2 border border-yellow-400">File Name</th>
            <th className="p-2 border border-yellow-400">Status</th>
            <th className="p-2 border border-yellow-400">Actions</th>
          </tr>
        </thead>
        <tbody>
          {queue.map((item, index) => (
            <tr key={item.id} className="hover:bg-yellow-100">
              <td className="p-2 border border-yellow-400 text-center">{index + 1}</td>
              <td className="p-2 border border-yellow-400 text-center">{item.filename}</td>
              <td className="p-2 border border-yellow-400 text-center">
                <select
                  aria-label={`Status for file ${item.filename}`}
                  value={item.status}
                  onChange={e => handleStatusChange(item.id, e.target.value)}
                  className="bg-gray-700 text-yellow-400 rounded px-2 py-1"
                >
                  {statusOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </td>
              <td className="p-2 border border-yellow-400 text-center">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete/VoID
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileServiceSection;
