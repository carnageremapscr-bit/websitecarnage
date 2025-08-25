"use client";
import React, { useEffect, useState } from "react";
import UserEditModal from "./UserEditModal";

interface User {
  email: string;
  role: string;
  credit: number;
}

const AdminUserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("customer");
  const [credit, setCredit] = useState(0);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [editUser, setEditUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/users");
      if (!res.ok) throw new Error("Failed to load users");
      const data: User[] = await res.json();
      setUsers(data || []);
    } catch (err) {
      console.error(err);
      setError("Could not load users.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role, credit }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add user.");
      setSuccess("User added successfully!");
      setEmail("");
      setRole("customer");
      setCredit(0);
      fetchUsers();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Could not add user.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteUser = async (userEmail: string) => {
    if (!window.confirm(`Are you sure you want to delete ${userEmail}?`)) return;
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/admin/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete user.");
      setSuccess("User deleted successfully!");
      fetchUsers();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Could not delete user.");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveEdit = async (updatedUser: User) => {
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update user.");
      setSuccess("User updated successfully!");
      setEditUser(null);
      fetchUsers();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Could not update user.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-gray-900 text-white rounded-xl shadow-lg p-8">
      <h2 className="text-3xl font-bold mb-6 text-yellow-400">Admin User Management</h2>

      <button
        onClick={fetchUsers}
        className="mb-4 bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded font-bold"
      >
        Refresh Users
      </button>

      {loading ? (
        <div className="text-yellow-400 text-center mb-4">Loading users...</div>
      ) : error ? (
        <div className="text-red-500 text-center mb-4">{error}</div>
      ) : (
        <>
          <table className="w-full border-collapse border border-yellow-400 mb-6">
            <thead>
              <tr className="bg-yellow-500 text-black">
                <th className="p-2 border border-yellow-400">Email</th>
                <th className="p-2 border border-yellow-400">Role</th>
                <th className="p-2 border border-yellow-400">Credit</th>
                <th className="p-2 border border-yellow-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.email} className="hover:bg-gray-800">
                  <td className="p-2 border border-yellow-400">{user.email}</td>
                  <td className="p-2 border border-yellow-400 capitalize">{user.role}</td>
                  <td className="p-2 border border-yellow-400">{user.credit}</td>
                  <td className="p-2 border border-yellow-400 flex gap-2">
                    <button
                      className="text-blue-400 hover:underline text-sm"
                      onClick={() => setEditUser(user)}
                      disabled={saving}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-400 hover:underline text-sm"
                      onClick={() => handleDeleteUser(user.email)}
                      disabled={saving}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Add New User Form */}
          <form
            className="flex flex-col md:flex-row gap-2 mb-4"
            onSubmit={handleAddUser}
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="px-3 py-2 rounded border border-yellow-500 flex-1 text-black"
              required
            />
            <select
              value={role}
              onChange={e => setRole(e.target.value)}
              className="px-3 py-2 rounded border border-yellow-500 text-black"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
            <input
              type="number"
              placeholder="Credit"
              value={credit}
              onChange={e => setCredit(Number(e.target.value))}
              className="px-3 py-2 rounded border border-yellow-500 w-24 text-black"
              min={0}
            />
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded font-bold"
              disabled={saving}
            >
              {saving ? "Saving..." : "Add User"}
            </button>
          </form>

          {success && <div className="text-green-400 font-semibold text-center mb-2">{success}</div>}
          {error && <div className="text-red-400 font-semibold text-center mb-2">{error}</div>}

          {editUser && (
            <UserEditModal
              user={editUser}
              onClose={() => setEditUser(null)}
              onSave={handleSaveEdit}
            />
          )}
        </>
      )}
    </div>
  );
};

export default AdminUserManagement;
