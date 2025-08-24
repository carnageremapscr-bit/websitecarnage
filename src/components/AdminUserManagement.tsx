"use client";
import React, { useEffect, useState } from "react";
import UserEditModal from "./UserEditModal";

interface User { email: string; role: string; credit?: number }

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
    console.log("Fetching users...");
    fetchUsers();
  }, []);

  const fetchUsers = async (): Promise<void> => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/users");
      if (!res.ok) throw new Error("Failed to load users");
  let data: User[] = await res.json();
  console.log("Fetched users:", data);
  // Normalize roles for display
  data = data.map(u => ({ ...u, role: u.role === "user" ? "customer" : u.role }));
  setUsers(data || []);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Could not load users.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role: role === "customer" ? "customer" : "admin", credit }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || data.message || "Failed to add user.");
        return;
      }
      setSuccess(data.message || "User added.");
      setEmail("");
      setRole("customer");
      setCredit(0);
      await fetchUsers();
    } catch (err) {
      console.error(err);
      setError("Could not add user. Check console for details.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteUser = async (userEmail: string): Promise<void> => {
    if (!window.confirm("Delete this user?")) return;
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/admin/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || data.message || "Failed to delete user.");
        return;
      }
      setSuccess(data.message || "User deleted.");
      await fetchUsers();
    } catch (err) {
      console.error(err);
      setError("Could not delete user. Check console for details.");
    } finally {
      setSaving(false);
    }
  };

  const handleEditUser = (user: { id: number; name: string; email: string }) => {
    setEditUser(user);
  };

  const handleSaveEdit = async (updatedUser: { id: number; name: string; email: string }): Promise<void> => {
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: updatedUser.email, credit: updatedUser.credit, role: updatedUser.role }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || data.message || "Failed to update user.");
        return;
      }
      setSuccess(data.message || "User updated.");
      await fetchUsers();
    } catch (err) {
      console.error(err);
      setError("Could not update user. Check console for details.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 text-black">
  <h2 className="text-2xl font-bold mb-6 text-yellow-700">Admin User Management</h2>
  <button onClick={fetchUsers} className="mb-4 bg-yellow-400 text-white px-3 py-1 rounded font-bold hover:bg-yellow-500">Refresh</button>
      {loading ? (
        <div className="text-yellow-400 text-center">Loading users...</div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <>
          <table className="w-full border-collapse border border-yellow-400 mb-6">
            <thead>
              <tr className="bg-yellow-400 text-black">
                <th className="p-2 border border-yellow-400">Email</th>
                <th className="p-2 border border-yellow-400">Role</th>
                <th className="p-2 border border-yellow-400">Credit</th>
                <th className="p-2 border border-yellow-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u: User) => (
                <tr key={u.email}>
                  <td className="p-2 border border-yellow-400">{u.email}</td>
                  <td className="p-2 border border-yellow-400 capitalize">{u.role}</td>
                  <td className="p-2 border border-yellow-400">{u.credit ?? 0}</td>
                  <td className="p-2 border border-yellow-400 flex gap-2">
                    <button
                      className="text-xs text-blue-600 hover:underline"
                      onClick={() => handleEditUser(u)}
                      disabled={saving}
                    >
                      Edit
                    </button>
                    <button
                      className="text-xs text-red-600 hover:underline"
                      onClick={() => handleDeleteUser(u.email)}
                      disabled={saving}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <form className="flex flex-col md:flex-row gap-2 mt-2" onSubmit={handleAddUser}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="px-2 py-1 rounded border border-yellow-300 flex-1"
              required
            />
            <select
              value={role}
              onChange={e => setRole((e.target as HTMLSelectElement).value)}
              className="px-2 py-1 rounded border border-yellow-300"
              aria-label="Role"
              title="Role"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
            <input
              type="number"
              placeholder="Credit"
              value={credit}
              onChange={e => setCredit(Number(e.target.value))}
              className="px-2 py-1 rounded border border-yellow-300 w-24"
              min={0}
            />
            <button
              type="submit"
              className="bg-yellow-400 text-white rounded px-3 py-1 font-bold"
              disabled={saving}
            >
              {saving ? "Saving..." : "Add User"}
            </button>
          </form>
          {success && <div className="text-green-600 font-semibold text-center mt-2">{success}</div>}
          {error && <div className="text-red-600 font-semibold text-center mt-2">{error}</div>}
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
