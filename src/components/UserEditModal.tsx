"use client";
import React, { useState } from "react";

import { User } from "../types";

interface UserEditModalProps {
  user: User;
  onClose: () => void;
  onSave: (updated: User) => Promise<void> | void;
}

const UserEditModal: React.FC<UserEditModalProps> = ({ user, onClose, onSave }) => {
  const [role, setRole] = useState<string>(user.role);
  const [credit, setCredit] = useState<number>(user.credit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
  await onSave({ ...user, role, credit });
      onClose();
    } catch (err) {
      console.error(err); // Log the error for debugging purposes
      setError("Failed to save user changes.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-black relative">
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>&times;</button>
        <h3 className="text-xl font-bold mb-4 text-yellow-700">Edit User</h3>
        <form className="flex flex-col gap-4" onSubmit={handleSave}>
          <div>
            <label htmlFor="uem-email" className="font-semibold">Email</label>
            <input id="uem-email" type="email" value={user.email} disabled aria-label="User email" className="px-2 py-1 rounded border border-yellow-300 w-full bg-gray-100" />
          </div>
          <div>
            <label htmlFor="uem-role" className="font-semibold">Role</label>
            <select id="uem-role" value={role} onChange={e => setRole((e.target as HTMLSelectElement).value)} aria-label="User role" title="Role" className="px-2 py-1 rounded border border-yellow-300 w-full">
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <label htmlFor="uem-credit" className="font-semibold">Credit</label>
            <input id="uem-credit" type="number" value={credit} min={0} onChange={e => setCredit(Number((e.target as HTMLInputElement).value))} aria-label="User credit" title="Credit" className="px-2 py-1 rounded border border-yellow-300 w-full" />
          </div>
          <button type="submit" className="bg-yellow-400 text-white rounded px-3 py-2 font-bold mt-2" disabled={saving}>{saving ? "Saving..." : "Save Changes"}</button>
          {error && <div className="text-red-600 font-semibold text-center">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default UserEditModal;
