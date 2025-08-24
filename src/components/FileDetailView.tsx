
import React, { useState, useEffect } from "react";

// Fetch chat messages for a file
async function fetchFileChat(fileId) {
  const res = await fetch(`/api/files/chat?fileId=${encodeURIComponent(fileId)}`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.messages || [];
}

// Send a chat message for a file (optionally with file)
async function sendFileChat(fileId, sender, text, file) {
  if (file) {
    const formData = new FormData();
    formData.append("fileId", fileId);
    formData.append("sender", sender);
    formData.append("text", text);
    formData.append("file", file);
    const res = await fetch(`/api/files/chat-upload`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.message;
  } else {
    const res = await fetch(`/api/files/chat-upload`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileId, sender, text }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.message;
  }
}


// Business branding colors
const brandYellow = "#FFD600";
const brandBlack = "#111";
const brandRed = "#E53935";

const openingHours = { open: 9, close: 21 }; // 9:00 to 21:00

const FileDetailView = ({ file, onBack }) => {
  // Chat and admin return not needed
  const [originalFileUrl, setOriginalFileUrl] = useState("");
  const [now, setNow] = useState(new Date());
  const [uploading, setUploading] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState("");
  const [chatFile, setChatFile] = useState(null);

  useEffect(() => {
    // Fetch chat and set download URL
    const load = async () => {
      setChatLoading(true);
      setChatError("");
      try {
        const msgs = await fetchFileChat(file.id);
        setChatMessages(msgs);
      } catch (e) {
        setChatError("Failed to load chat");
      }
      setChatLoading(false);
      // Download URL: always allow download for user/admin
      setOriginalFileUrl(`/uploads/${file.filename}`);
    };
    load();
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, [file.id, file.filename]);

  // No chat or admin return logic

  const handleFileUpload = async (e) => {
    const fileToUpload = e.target.files[0];
    if (!fileToUpload) return;
    setUploading(true);
    // TODO: Implement upload logic to backend
    setTimeout(() => setUploading(false), 1200); // Simulate upload
    setChatMessages(msgs => ([...msgs, { sender: "You", time: new Date().toLocaleString(), text: `Re-uploaded file: ${fileToUpload.name}` }]));
  };

  const handleChatSend = async () => {
    if (!chatInput.trim() && !chatFile) return;
    setChatLoading(true);
    setChatError("");
    try {
      const msg = await sendFileChat(file.id, "You", chatInput, chatFile);
      if (msg) setChatMessages(msgs => ([...msgs, msg]));
      setChatInput("");
      setChatFile(null);
    } catch (e) {
      setChatError("Failed to send message");
    }
    setChatLoading(false);
  };

  return (
    <div style={{ background: "#fff", color: brandBlack }} className="rounded-lg shadow-lg p-6 max-w-2xl mx-auto relative">
      <button style={{ background: brandRed, color: "#fff" }} className="absolute top-4 left-4 px-3 py-1 rounded hover:opacity-80" onClick={onBack}>
        &larr; Back to files
      </button>
      <div className="mb-4">
        <span style={{ background: "#43a047", color: "#fff" }} className="inline-block px-3 py-1 rounded font-bold mr-2">Returned</span>
        <span className="font-bold">File #{file.id}</span>
      </div>
      <div className="mb-2">
        <span className="font-bold text-lg">{file.vehicle}</span>
      </div>
      <div className="mb-4 text-sm grid grid-cols-2 gap-2">
        <div>Registration: <span style={{ background: brandYellow, color: brandBlack }} className="px-2 py-1 rounded font-mono">{file.registration}</span></div>
        <div>ECU: <span className="font-bold text-red-600">{file.ecu || file.ecuType || "-"}</span></div>
        <div>Options: <span className="text-cyan-600 font-bold">{file.options || "-"}</span></div>
        <div>Manufacturer: <span className="font-bold">{file.manufacturer || "-"}</span></div>
        <div>Model: <span className="font-bold">{file.model || "-"}</span></div>
        <div>Build Year: <span className="font-bold">{file.buildYear || "-"}</span></div>
        <div>Engine: <span className="font-bold">{file.engine || "-"}</span></div>
        <div>Transmission: <span className="font-bold">{file.transmission || "-"}</span></div>
        <div>Tool Used: <span className="font-bold">{file.toolUsed || "-"}</span></div>
        <div>Status: <span className="font-bold">{file.status || "-"}</span></div>
        <div>Last Updated: <span className="font-bold">{file.lastUpdated || "-"}</span></div>
      </div>
      <div className="mb-6">
        <div className="font-bold mb-2">Download Uploaded File</div>
        {originalFileUrl && (
          <a href={originalFileUrl} download className="inline-flex items-center" style={{ background: '#00bfae', color: '#fff', padding: '0.5rem 1rem', borderRadius: 6, fontWeight: 600, marginBottom: 16 }}>
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ marginRight: 6 }}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" /></svg>
            Download file
          </a>
        )}
        <div className="mt-2">
          <label htmlFor="reupload" className="block mb-1 font-semibold">Re-upload file:</label>
          <input id="reupload" type="file" onChange={handleFileUpload} className="block" style={{ color: brandBlack }} disabled={uploading} />
          {uploading && <span className="ml-2 text-xs text-gray-600">Uploading...</span>}
        </div>
      </div>
      <div className="mb-6">
        <div className="font-bold mb-2">Chat with Support</div>
        <div className="bg-gray-100 rounded p-2 mb-2 max-h-40 overflow-y-auto text-black">
          {chatLoading && <div className="text-gray-500">Loading...</div>}
          {chatError && <div className="text-red-500">{chatError}</div>}
          {!chatLoading && chatMessages.length === 0 && <div className="text-gray-500">No messages yet.</div>}
          {chatMessages.map((msg, i) => (
            <div key={i} className="mb-1 flex flex-col">
              <span className="font-bold">{msg.sender}:</span> {msg.text} {msg.fileUrl && (
                <a href={msg.fileUrl} download className="text-blue-600 underline ml-2" target="_blank" rel="noopener noreferrer">Download file</a>
              )}
              <span className="text-xs text-gray-400">{msg.time ? new Date(msg.time).toLocaleString() : ""}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            className="flex-1 border rounded px-2 py-1 text-black"
            placeholder="Type a message..."
            disabled={chatLoading}
          />
          <input
            type="file"
            onChange={e => setChatFile(e.target.files[0])}
            className="border rounded px-2 py-1 text-black"
            disabled={chatLoading}
          />
          <button
            className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500"
            onClick={handleChatSend}
            type="button"
            disabled={chatLoading || (!chatInput.trim() && !chatFile)}
          >Send</button>
        </div>
      </div>

    </div>
  );
};

export default FileDetailView;
