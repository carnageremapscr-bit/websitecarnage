import React, { useEffect, useState } from "react";

interface File {
  id: string;
  filename: string;
  status: string;
}

const FileAdminSection = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [chatOpen, setChatOpen] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<Record<string, { sender: string; text: string; time: string }[]>>({});
  const [chatInput, setChatInput] = useState("");

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch("/api/files");
        const data = await response.json();
        setFiles(data);
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFiles();
  }, []);

  const handleReturnTuned = (file: File) => {
    // TODO: Implement file return/upload logic
    alert(`Return tuned file for ${file.filename}`);
  };

  const handleChatOpen = (id: string) => {
    setChatOpen(id);
    if (!chatMessages[id]) setChatMessages((msgs) => ({ ...msgs, [id]: [] }));
  };

  const handleChatSend = (id: string) => {
    if (!chatInput.trim()) return;
    setChatMessages((msgs) => ({
      ...msgs,
      [id]: [...(msgs[id] || []), { sender: "admin", text: chatInput, time: new Date().toLocaleTimeString() }],
    }));
    setChatInput("");
  };

  if (loading) {
    return <div className="text-center text-yellow-400">Loading files...</div>;
  }

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Admin File Management</h2>
      <table className="w-full border-collapse border border-yellow-400 mb-6">
        <thead>
          <tr className="bg-yellow-400 text-black">
            <th className="p-2 border border-yellow-400">#</th>
            <th className="p-2 border border-yellow-400">File Name</th>
            <th className="p-2 border border-yellow-400">Status</th>
            <th className="p-2 border border-yellow-400">Download</th>
            <th className="p-2 border border-yellow-400">Return Tuned</th>
            <th className="p-2 border border-yellow-400">Chat</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, index) => (
            <tr key={file.id} className="hover:bg-yellow-100">
              <td className="p-2 border border-yellow-400 text-center">{index + 1}</td>
              <td className="p-2 border border-yellow-400 text-center cursor-pointer text-blue-500 underline" onClick={() => setSelectedFile(file)}>{file.filename}</td>
              <td className="p-2 border border-yellow-400 text-center">{file.status}</td>
              <td className="p-2 border border-yellow-400 text-center">
                <a href={`/uploads/${file.filename}`} download className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700">Download</a>
              </td>
              <td className="p-2 border border-yellow-400 text-center">
                <button className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500" onClick={() => handleReturnTuned(file)}>Return Tuned</button>
              </td>
              <td className="p-2 border border-yellow-400 text-center">
                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700" onClick={() => handleChatOpen(file.id)}>Chat</button>
                {chatOpen === file.id && (
                  <div className="bg-white text-black rounded p-2 w-64 shadow-lg z-10 mt-2">
                    <div className="max-h-32 overflow-y-auto mb-2">
                      {(chatMessages[file.id] || []).map((msg, i) => (
                        <div key={i} className={msg.sender === "admin" ? "text-right" : "text-left"}>
                          <span className="font-bold">{msg.sender}:</span> {msg.text} <span className="text-xs text-gray-400">{msg.time}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-1">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={e => setChatInput(e.target.value)}
                        className="flex-1 border rounded px-2 py-1"
                        placeholder="Type a message..."
                      />
                      <button
                        className="bg-yellow-400 text-black px-2 py-1 rounded"
                        onClick={() => handleChatSend(file.id)}
                      >Send</button>
                    </div>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedFile && (
        <div className="bg-white text-black rounded p-4 shadow-lg z-20">
          <h3 className="text-xl font-bold mb-2">File Details</h3>
          <pre className="bg-gray-100 p-2 rounded overflow-x-auto text-xs">{JSON.stringify(selectedFile, null, 2)}</pre>
          <button className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700" onClick={() => setSelectedFile(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default FileAdminSection;
