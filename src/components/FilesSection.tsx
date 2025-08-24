import React, { useEffect, useState } from "react";

// import dynamic from "next/dynamic";
// const FileAdminSection = dynamic(() => import("./FileAdminSection"), { ssr: false });
import FileDetailView from "./FileDetailView";


const FilesSection = ({ isAdmin = false }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch("/api/files");
        let data = await response.json();
        if (!isAdmin) {
          // Only show files belonging to the logged-in user
          const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("carnage_user") || '{}') : {};
          data = data.filter(file => {
            if (!file || !file.customer) return false;
            if (file.filename && (
              file.filename.toLowerCase().includes("admin") ||
              file.filename.toLowerCase().includes("service") ||
              file.filename.toLowerCase().includes("hardcut")
            )) return false;
            if (user && user.email && file.customer && file.customer !== user.email) return false;
            return true;
          });
        }
        setFiles(data);
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFiles();
  }, [isAdmin]);

  if (loading) {
    return <div className="text-center text-yellow-400">Loading files...</div>;
  }

  if (selectedFile) {
    return <FileDetailView file={selectedFile} onBack={() => setSelectedFile(null)} isAdmin={isAdmin} />;
  }

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{isAdmin ? "All Uploaded Files" : "Your Uploaded Files"}</h2>
      <table className="w-full border-collapse border border-yellow-400 mb-6">
        <thead>
          <tr className="bg-yellow-400 text-black">
            <th className="p-2 border border-yellow-400">#</th>
            <th className="p-2 border border-yellow-400">Last Updated</th>
            <th className="p-2 border border-yellow-400">Vehicle</th>
            <th className="p-2 border border-yellow-400">Registration</th>
            {isAdmin && <th className="p-2 border border-yellow-400">Customer</th>}
            <th className="p-2 border border-yellow-400">Status</th>
            <th className="p-2 border border-yellow-400">Download</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, index) => (
            <tr key={file.id} className="hover:bg-yellow-100 cursor-pointer" onClick={() => setSelectedFile(file)}>
              <td className="p-2 border border-yellow-400 text-center">{index + 1}</td>
              <td className="p-2 border border-yellow-400 text-center">{file.lastUpdated}</td>
              <td className="p-2 border border-yellow-400 text-center">{file.vehicle}</td>
              <td className="p-2 border border-yellow-400 text-center">{file.registration}</td>
              {isAdmin && <td className="p-2 border border-yellow-400 text-center">{file.customer}</td>}
              <td className="p-2 border border-yellow-400 text-center">{file.status}</td>
              <td className="p-2 border border-yellow-400 text-center">
                <a href={`/uploads/${file.filename}`} download className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700" onClick={e => e.stopPropagation()}>Download</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FilesSection;
