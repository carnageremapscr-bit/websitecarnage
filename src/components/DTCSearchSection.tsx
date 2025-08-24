
import React, { useState } from "react";

const DTCSearchSection: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/dtc-codes?q=${encodeURIComponent(query)}`);
      if (res.ok) {
        setResults(await res.json());
      } else {
        setResults([]);
      }
    } catch {
      setResults([]);
    }
    setLoading(false);
  };

  return (
    <section className="p-10">
      <h2 className="text-3xl font-bold text-yellow-700 mb-6">DTC Search</h2>
      <form onSubmit={handleSearch} className="mb-6 flex gap-2 items-center">
        <input
          type="text"
          placeholder="Enter DTC code or description..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="px-4 py-2 rounded border-2 border-yellow-400 bg-gray-100 text-black w-full max-w-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button type="submit" className="bg-yellow-400 text-black px-6 py-2 rounded font-bold shadow hover:bg-yellow-500 transition">Search</button>
      </form>
      <div className="bg-white rounded-xl shadow border border-yellow-200 overflow-x-auto">
        {loading ? (
          <div className="p-6 text-center text-yellow-700 font-bold">Searching...</div>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="bg-yellow-100">
              <tr>
                <th className="py-2 px-3">Code</th>
                <th className="py-2 px-3">Description</th>
              </tr>
            </thead>
            <tbody>
              {results.length === 0 ? (
                <tr><td colSpan={2} className="text-center py-4 text-gray-500">No results found.</td></tr>
              ) : results.map(dtc => (
                <tr key={dtc.code} className="border-b last:border-b-0">
                  <td className="py-2 px-3 font-mono text-yellow-700">{dtc.code}</td>
                  <td className="py-2 px-3">{dtc.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default DTCSearchSection;
