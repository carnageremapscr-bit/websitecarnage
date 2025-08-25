import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

interface DTC {
  code: string;
  description: string;
  ecu?: string;
  severity?: string;
  recommended?: string;
  stage?: string; // Stage 1/2/3 relevance
}

const DTCSearchSection: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<DTC[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDTC, setSelectedDTC] = useState<DTC | null>(null);
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<keyof DTC>("code");
  const [sortAsc, setSortAsc] = useState(true);

  const pageSize = 10;

  // Fetch DTCs live
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim() === "") {
        setResults([]);
        setPage(1);
        return;
      }
      fetchDTCs(query);
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  const fetchDTCs = async (q: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/dtc-codes?q=${encodeURIComponent(q)}`);
      const data: DTC[] = res.ok ? await res.json() : [];
      setResults(data);
    } catch {
      setResults([]);
    }
    setLoading(false);
    setPage(1);
  };

  const sortedResults = [...results].sort((a, b) => {
    const valA = (a[sortKey] || "").toString().toLowerCase();
    const valB = (b[sortKey] || "").toString().toLowerCase();
    return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
  });

  const paginatedResults = sortedResults.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(sortedResults.length / pageSize);

  const toggleSort = (key: keyof DTC) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  return (
    <section className="p-8 bg-gray-900 text-white rounded-xl shadow-lg max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-yellow-400 mb-6">DTC Lookup</h2>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Enter DTC code, description or stage..."
          className="flex-1 px-4 py-2 rounded-lg border-2 border-yellow-500 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <button
          type="button"
          onClick={() => fetchDTCs(query)}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-lg flex items-center gap-2 font-bold shadow"
        >
          <FaSearch /> Search
        </button>
      </div>

      <div className="bg-gray-800 border border-yellow-500 rounded-xl overflow-x-auto">
        {loading ? (
          <div className="p-6 text-center text-yellow-400 font-bold">Searching...</div>
        ) : (
          <table className="min-w-full text-left text-sm">
            <thead className="bg-yellow-500 text-black">
              <tr>
                <th
                  className="py-2 px-3 cursor-pointer"
                  onClick={() => toggleSort("code")}
                >
                  Code {sortKey === "code" ? (sortAsc ? "↑" : "↓") : ""}
                </th>
                <th
                  className="py-2 px-3 cursor-pointer"
                  onClick={() => toggleSort("description")}
                >
                  Description {sortKey === "description" ? (sortAsc ? "↑" : "↓") : ""}
                </th>
                <th
                  className="py-2 px-3 cursor-pointer"
                  onClick={() => toggleSort("ecu")}
                >
                  ECU {sortKey === "ecu" ? (sortAsc ? "↑" : "↓") : ""}
                </th>
                <th
                  className="py-2 px-3 cursor-pointer"
                  onClick={() => toggleSort("severity")}
                >
                  Severity {sortKey === "severity" ? (sortAsc ? "↑" : "↓") : ""}
                </th>
                <th className="py-2 px-3">Stage</th>
              </tr>
            </thead>
            <tbody>
              {paginatedResults.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-gray-400">
                    No results found.
                  </td>
                </tr>
              ) : (
                paginatedResults.map(dtc => (
                  <tr
                    key={dtc.code}
                    className={`border-b last:border-b-0 hover:bg-gray-700 cursor-pointer ${
                      dtc.stage ? "bg-yellow-900/20" : ""
                    }`}
                    onClick={() => setSelectedDTC(dtc)}
                  >
                    <td className="py-2 px-3 font-mono text-yellow-400">{dtc.code}</td>
                    <td className="py-2 px-3">{dtc.description}</td>
                    <td className="py-2 px-3">{dtc.ecu || "-"}</td>
                    <td className="py-2 px-3">{dtc.severity || "-"}</td>
                    <td className="py-2 px-3">{dtc.stage || "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center items-center gap-2">
          <button
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            className="px-3 py-1 bg-yellow-500 rounded hover:bg-yellow-600"
          >
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(p + 1, totalPages))}
            className="px-3 py-1 bg-yellow-500 rounded hover:bg-yellow-600"
          >
            Next
          </button>
        </div>
      )}

      {/* DTC Detail Modal */}
      {selectedDTC && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-gray-900 text-white p-6 rounded-xl max-w-lg w-full relative shadow-lg">
            <button
              onClick={() => setSelectedDTC(null)}
              className="absolute top-3 right-3 text-yellow-400 hover:text-yellow-500 font-bold text-xl"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">{selectedDTC.code}</h3>
            <p className="mb-2"><strong>Description:</strong> {selectedDTC.description}</p>
            <p className="mb-2"><strong>ECU:</strong> {selectedDTC.ecu || "-"}</p>
            <p className="mb-2"><strong>Severity:</strong> {selectedDTC.severity || "-"}</p>
            <p className="mb-2"><strong>Recommended Action:</strong> {selectedDTC.recommended || "-"}</p>
            <p className="mb-2"><strong>Stage:</strong> {selectedDTC.stage || "-"}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default DTCSearchSection;

