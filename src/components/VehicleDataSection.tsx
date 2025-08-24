import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const generateDynoChartData = (vehicle, stage) => {
  const stageMultiplier = {
    stock: 1,
    stage1: 1.2,
    stage2: 1.4,
  };

  const multiplier = stageMultiplier[stage] || 1;

  return {
    labels: ["RPM 1000", "RPM 2000", "RPM 3000", "RPM 4000", "RPM 5000", "RPM 6000"],
    datasets: [
      {
        label: `Power (hp) - ${stage}`,
        data: [
          vehicle.stockBhp * 0.2 * multiplier,
          vehicle.stockBhp * 0.4 * multiplier,
          vehicle.stockBhp * 0.6 * multiplier,
          vehicle.stockBhp * 0.8 * multiplier,
          vehicle.stockBhp * multiplier,
          (vehicle.stockBhp + 60) * multiplier
        ],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
        pointStyle: "circle",
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: `Torque (nm) - ${stage}`,
        data: [
          vehicle.stockNm * 0.2 * multiplier,
          vehicle.stockNm * 0.4 * multiplier,
          vehicle.stockNm * 0.6 * multiplier,
          vehicle.stockNm * 0.8 * multiplier,
          vehicle.stockNm * multiplier,
          (vehicle.stockNm + 150) * multiplier
        ],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4,
        pointStyle: "circle",
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: "Stock Power (hp)",
        data: [
          vehicle.stockBhp * 0.2,
          vehicle.stockBhp * 0.4,
          vehicle.stockBhp * 0.6,
          vehicle.stockBhp * 0.8,
          vehicle.stockBhp,
          vehicle.stockBhp + 60
        ],
        borderColor: "rgba(75, 192, 192, 1)",
        borderDash: [5, 5],
        fill: false,
        pointStyle: "rectRot",
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: "Stock Torque (nm)",
        data: [
          vehicle.stockNm * 0.2,
          vehicle.stockNm * 0.4,
          vehicle.stockNm * 0.6,
          vehicle.stockNm * 0.8,
          vehicle.stockNm,
          vehicle.stockNm + 150
        ],
        borderColor: "rgba(153, 102, 255, 1)",
        borderDash: [5, 5],
        fill: false,
        pointStyle: "rectRot",
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "#fff",
        font: {
          size: 14,
        },
      },
    },
    title: {
      display: true,
      text: "Dyno Performance Chart",
      color: "#fff",
      font: {
        size: 18,
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: "#fff",
        font: {
          size: 12,
        },
      },
      grid: {
        color: "rgba(255, 255, 255, 0.1)",
      },
    },
    y: {
      ticks: {
        color: "#fff",
        font: {
          size: 12,
        },
      },
      grid: {
        color: "rgba(255, 255, 255, 0.1)",
      },
    },
  },
};

const VehicleDataSection = () => {
  const [vehicleData, setVehicleData] = useState<Array<{ make: string; model: string; year: number; engine: string; stockBhp: number; stockNm: number }>>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<Array<{ make: string; model: string; year: number; engine: string; stockBhp: number; stockNm: number }>>([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedStage, setSelectedStage] = useState("stock");

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const response = await fetch("/api/admin/vehicleData");
        if (!response.ok) {
          throw new Error("Failed to fetch vehicle data");
        }
        const data = await response.json();
        setVehicleData(data);
        setFilteredData(data);
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleData();
  }, []);

  const handleSearch = () => {
    const results = vehicleData.filter(vehicle =>
      vehicle.make.toLowerCase().includes(search.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(search.toLowerCase()) ||
      vehicle.year.toString().includes(search)
    );
    setFilteredData(results);
  };

  const handleFilter = (criteria: string) => {
    const results = vehicleData.filter(vehicle => vehicle.make === criteria);
    setFilteredData(results);
  };

  const handleRowClick = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  if (loading) {
    return <div className="text-center text-yellow-400">Loading vehicle data...</div>;
  }

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Vehicle Data</h2>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by make, model, or year"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-yellow-400"
        />
        <button
          onClick={handleSearch}
          className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
        >
          Search
        </button>
        <button
          onClick={() => handleFilter("BMW")}
          className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
        >
          Filter BMW
        </button>
      </div>
      <div className="flex gap-4 mb-4">
        <label className="text-yellow-400">Select Stage:</label>
        <select
          value={selectedStage}
          onChange={(e) => setSelectedStage(e.target.value)}
          className="p-2 rounded bg-gray-700 text-yellow-400"
        >
          <option value="stock">Stock</option>
          <option value="stage1">Stage 1</option>
          <option value="stage2">Stage 2</option>
        </select>
      </div>
      <table className="w-full border-collapse border border-yellow-400">
        <thead>
          <tr className="bg-yellow-400 text-black">
            <th className="p-2 border border-yellow-400">Make</th>
            <th className="p-2 border border-yellow-400">Model</th>
            <th className="p-2 border border-yellow-400">Year</th>
            <th className="p-2 border border-yellow-400">Engine</th>
            <th className="p-2 border border-yellow-400">Stock Power</th>
            <th className="p-2 border border-yellow-400">Tuned Power</th>
            <th className="p-2 border border-yellow-400">Stock Torque</th>
            <th className="p-2 border border-yellow-400">Tuned Torque</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((vehicle, index) => (
            <tr
              key={index}
              className="hover:bg-yellow-100 cursor-pointer"
              onClick={() => handleRowClick(vehicle)}
            >
              <td className="p-2 border border-yellow-400 text-center">{vehicle.make}</td>
              <td className="p-2 border border-yellow-400 text-center">{vehicle.model}</td>
              <td className="p-2 border border-yellow-400 text-center">{vehicle.year}</td>
              <td className="p-2 border border-yellow-400 text-center">{vehicle.engine}</td>
              <td className="p-2 border border-yellow-400 text-center">{vehicle.stockBhp} hp</td>
              <td className="p-2 border border-yellow-400 text-center">{vehicle.stockBhp + 60} hp</td>
              <td className="p-2 border border-yellow-400 text-center">{vehicle.stockNm} nm</td>
              <td className="p-2 border border-yellow-400 text-center">{vehicle.stockNm + 150} nm</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedVehicle && (
        <div className="mt-4 bg-gray-900 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4 text-yellow-400">Dyno Chart for {selectedVehicle.make} {selectedVehicle.model} ({selectedStage})</h3>
          <Line
            data={generateDynoChartData(selectedVehicle, selectedStage)}
            options={chartOptions}
          />
        </div>
      )}
    </div>
  );
};

export default VehicleDataSection;
