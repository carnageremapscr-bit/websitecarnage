import React, { useState, useEffect, useRef } from "react";
import { UploadFile, ChatMessage, Dynograph } from "../types";
import DashboardLayout from "./layout/DashboardLayout";
import { FaFile, FaPaperclip, FaUpload, FaDownload, FaHistory } from "react-icons/fa";
import { SidebarLink } from "./layout/Sidebar";
import "./FileDetailView.css";

// --- API functions ---
async function fetchFileChat(fileId: string | number): Promise<ChatMessage[]> {
  const res = await fetch(`/api/files/chat?fileId=${encodeURIComponent(String(fileId))}`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.messages || [];
}

async function sendFileChat(fileId: string | number, sender: string, text: string, files?: File[]) {
  const formData = new FormData();
  formData.append("fileId", String(fileId));
  formData.append("sender", sender);
  formData.append("text", text);
  files?.forEach((f, idx) => formData.append(`file${idx}`, f));
  const res = await fetch(`/api/files/chat-upload`, { method: "POST", body: formData });
  if (!res.ok) return null;
  const data = await res.json();
  return data.message as ChatMessage | null;
}

// --- Components ---
const ChatMessageList = ({ messages }: { messages: ChatMessage[] }) => {
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container bg-gray-900 p-3 rounded max-h-60 overflow-y-auto text-white">
      {messages.length === 0 && <div className="text-gray-400">No messages yet.</div>}
      {messages.map((msg, i) => (
        <div key={i} className={`chat-message mb-2 p-2 rounded ${msg.sender === "You" ? "bg-yellow-700 self-end" : "bg-gray-800 self-start"}`}>
          <div className="flex items-center justify-between">
            <span className="font-bold">{msg.sender}</span>
            <span className="text-xs text-gray-400" title={msg.time}>{new Date(msg.time).toLocaleString()}</span>
          </div>
          <div className="mt-1">{msg.text}</div>
          {msg.fileUrl && (
            <a href={msg.fileUrl} download className="text-blue-400 underline flex items-center mt-1">
              <FaDownload className="mr-1" /> Download
            </a>
          )}
        </div>
      ))}
      <div ref={chatEndRef} />
    </div>
  );
};

const FileActions = ({
  file,
  originalFileUrl,
  onFileUpload,
  uploading,
}: {
  file: UploadFile;
  originalFileUrl: string;
  onFileUpload: (files: File[]) => void;
  uploading: boolean;
}) => {
  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length) onFileUpload(files);
  };

  return (
    <div className="file-actions mb-6">
      {originalFileUrl && (
        <a href={originalFileUrl} download className="inline-flex items-center mb-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">
          <FaDownload className="mr-1" /> Download Original
        </a>
      )}
      <div className="mt-2 flex items-center gap-2">
        <label htmlFor="fileUpload" className="flex items-center gap-2 cursor-pointer bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-600">
          <FaUpload /> Re-upload
        </label>
        <input id="fileUpload" type="file" multiple onChange={handleFiles} className="hidden" disabled={uploading} />
        {uploading && <span className="ml-2 text-gray-400">Uploading...</span>}
      </div>
    </div>
  );
};

const UploadHistory = ({ history }: { history: { fileName: string; uploadedBy: string; time: string }[] }) => (
  <div className="bg-gray-900 text-white rounded p-3 mb-6">
    <div className="flex items-center font-bold mb-2"><FaHistory className="mr-1" /> Upload History</div>
    {history.length === 0 && <div className="text-gray-400">No history yet.</div>}
    {history.map((h, i) => (
      <div key={i} className="mb-1 flex justify-between items-center">
        <span>{h.fileName} ({h.uploadedBy})</span>
        <span className="text-xs text-gray-400">{new Date(h.time).toLocaleString()}</span>
      </div>
    ))}
  </div>
);

const DynographPreview = ({ dynographs }: { dynographs: Dynograph[] }) => (
  <div className="bg-gray-900 text-white rounded p-3 mb-6">
    <div className="font-bold mb-2">Dynograph Previews</div>
    {dynographs.length === 0 && <div className="text-gray-400">No dynographs available.</div>}
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {dynographs.map((d, i) => (
        <div key={i} className="bg-black p-1 rounded shadow">
          <img src={d.thumbnailUrl} alt={d.name} className="w-full h-32 object-cover rounded" />
          <div className="text-sm text-center mt-1">{d.name}</div>
        </div>
      ))}
    </div>
  </div>
);

// --- Main Component ---
const FileDetailView = ({ file, onBack }: { file: UploadFile; onBack: () => void }) => {
  const [originalFileUrl, setOriginalFileUrl] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatFiles, setChatFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState("");
  const [active, setActive] = useState("Files");

  const sidebarLinks: SidebarLink[] = [{ label: "Files", icon: FaFile, color: "text-yellow-400" }];

  useEffect(() => {
    const load = async () => {
      setChatLoading(true);
      setChatError("");
      try {
        const msgs = await fetchFileChat(file.id);
        setChatMessages(msgs);
      } catch (err) {
        console.error(err);
        setChatError("Failed to load chat");
      }
      setChatLoading(false);
      setOriginalFileUrl(`/uploads/${file.filename}`);
    };
    load();
  }, [file.id, file.filename]);

  const handleFileUpload = async (files: File[]) => {
    setUploading(true);
    setTimeout(() => setUploading(false), 1200); // mock upload
    files.forEach(f =>
      setChatMessages(msgs => [
        ...msgs,
        { sender: "You", time: new Date().toISOString(), text: `Re-uploaded file: ${f.name}` },
      ])
    );
  };

  const handleChatSend = async () => {
    if (!chatInput.trim() && chatFiles.length === 0) return;
    setChatLoading(true);
    setChatError("");
    try {
      const msg = await sendFileChat(file.id, "You", chatInput, chatFiles);
      if (msg) setChatMessages(msgs => [...msgs, msg]);
      setChatInput("");
      setChatFiles([]);
    } catch (err) {
      console.error(err);
      setChatError("Failed to send message");
    }
    setChatLoading(false);
  };

  return (
    <DashboardLayout links={sidebarLinks} active={active} setActive={setActive} title="CARNAGE REMAPS" subtitle="FILES" footer={null} backgroundSvg={null}>
      <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto relative">
        <button className="absolute top-4 left-4 px-3 py-1 rounded bg-red-600 hover:bg-red-700" onClick={onBack}>
          &larr; Back
        </button>

        {/* Vehicle & Tuning Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div><span className="font-bold">Vehicle:</span> {file.vehicle}</div>
          <div><span className="font-bold">Registration:</span> <span className="font-mono bg-gray-700 px-1 rounded">{file.registration}</span></div>
          <div><span className="font-bold">ECU:</span> {file.ecu || "-"}</div>
          <div><span className="font-bold">Manufacturer:</span> {file.manufacturer || "-"}</div>
          <div><span className="font-bold">Model:</span> {file.model || "-"}</div>
          <div><span className="font-bold">Build Year:</span> {file.buildYear || "-"}</div>
          <div><span className="font-bold">Engine:</span> {file.engine || "-"}</div>
          <div><span className="font-bold">Transmission:</span> {file.transmission || "-"}</div>
          <div><span className="font-bold">Stage:</span> <span className="px-2 py-1 bg-yellow-600 text-black rounded">{file.tuningStage ? String(file.tuningStage) : "N/A"}</span></div>
          <div><span className="font-bold">Status:</span> <span className="px-2 py-1 bg-green-600 rounded">{file.status || "-"}</span></div>
        </div>

        {/* File Actions */}
        <FileActions file={file} originalFileUrl={originalFileUrl} onFileUpload={handleFileUpload} uploading={uploading} />

        {/* Dynograph Previews */}
  {file.dynographs && <DynographPreview dynographs={file.dynographs} />}

        {/* Upload History */}
  {file.uploadHistory && <UploadHistory history={file.uploadHistory} />}

        {/* Chat */}
        <div className="mb-6">
          <div className="font-bold mb-2">Chat with Support</div>
          <ChatMessageList messages={chatMessages} />
          <div className="flex gap-2 items-center mt-2">
            <input type="text" value={chatInput} onChange={e => setChatInput(e.target.value)} placeholder="Type a message..." className="flex-1 border px-2 py-1 rounded text-black" disabled={chatLoading} />
            <input type="file" multiple onChange={e => setChatFiles(e.target.files ? Array.from(e.target.files) : [])} className="hidden" id="chatFileInput" />
            <label htmlFor="chatFileInput" className="bg-gray-700 px-2 py-1 rounded cursor-pointer text-white"><FaPaperclip /></label>
            <button onClick={handleChatSend} disabled={chatLoading || (!chatInput.trim() && chatFiles.length === 0)} className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-600">Send</button>
          </div>
          {chatError && <div className="text-red-500 mt-1">{chatError}</div>}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FileDetailView;
