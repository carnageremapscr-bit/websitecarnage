
import React, { useState, useEffect } from "react";

const SettingsSection = ({ isAdmin = false }) => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/admin/settings");
        if (!res.ok) throw new Error("Failed to load settings");
        const data = await res.json();
        setSettings(data);
      } catch (err) {
        setError("Could not load settings.");
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error("Failed to save settings");
      setSuccess("Settings saved successfully.");
    } catch (err) {
      setError("Could not save settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center text-yellow-400">Loading settings...</div>;
  }
  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }
  if (!settings) {
    return null;
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8 text-black">
      <h2 className="text-2xl font-bold mb-6 text-yellow-700">Professional Settings</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="font-semibold">Business Name
          <input type="text" name="businessName" value={settings.businessName} onChange={handleChange} className="px-2 py-1 rounded border border-yellow-300 w-full" required />
        </label>
        <label className="font-semibold">Email
          <input type="email" name="businessEmail" value={settings.businessEmail} onChange={handleChange} className="px-2 py-1 rounded border border-yellow-300 w-full" required />
        </label>
        <label className="font-semibold">Phone
          <input type="text" name="businessPhone" value={settings.businessPhone} onChange={handleChange} className="px-2 py-1 rounded border border-yellow-300 w-full" required />
        </label>
        <label className="font-semibold">Address
          <input type="text" name="businessAddress" value={settings.businessAddress} onChange={handleChange} className="px-2 py-1 rounded border border-yellow-300 w-full" required />
        </label>
        <label className="font-semibold">Business Hours
          <input type="text" name="businessHours" value={settings.businessHours} onChange={handleChange} className="px-2 py-1 rounded border border-yellow-300 w-full" required />
        </label>
        <label className="font-semibold">Homepage Announcement
          <textarea name="homepageAnnouncement" value={settings.homepageAnnouncement} onChange={handleChange} className="px-2 py-1 rounded border border-yellow-300 w-full" rows={2} />
        </label>
        <label className="font-semibold flex items-center gap-2">Maintenance Mode
          <input type="checkbox" name="maintenanceMode" checked={settings.maintenanceMode} onChange={handleChange} />
        </label>
        <button type="submit" className="bg-yellow-400 text-white rounded px-3 py-2 font-bold mt-2" disabled={saving}>{saving ? "Saving..." : "Save Settings"}</button>
        {success && <div className="text-green-600 font-semibold text-center">{success}</div>}
        {error && <div className="text-red-600 font-semibold text-center">{error}</div>}
      </form>
    </div>
  );
};

export default SettingsSection;
