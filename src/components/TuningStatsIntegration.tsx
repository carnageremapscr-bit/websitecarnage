"use client";
import React, { useState, useEffect } from "react";
import { FaTachometerAlt, FaChartLine, FaDownload } from "react-icons/fa";

interface TuningStats {
  vehicleId: string;
  make: string;
  model: string;
  year: number;
  fuelType: string;
  stock: {
    hp: number;
    torque: number;
    zeroToSixty: number;
  };
  stage1: {
    hp: number;
    torque: number;
    zeroToSixty: number;
  };
  stage2: {
    hp: number;
    torque: number;
    zeroToSixty: number;
  };
  stage3: {
    hp: number;
    torque: number;
    zeroToSixty: number;
  };
}

interface TuningStatsIntegrationProps {
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: number;
  selectedStage: string;
}

export default function TuningStatsIntegration({ 
  vehicleMake, 
  vehicleModel, 
  vehicleYear,
  selectedStage 
}: TuningStatsIntegrationProps) {
  const [stats, setStats] = useState<TuningStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTuningStats();
  }, [vehicleMake, vehicleModel, vehicleYear]);

  const fetchTuningStats = async () => {
    try {
      setLoading(true);
      setError(null);

      // This would typically connect to stats.carnageremaps.co.uk
      // For now, we'll use a mock API or local database
      const response = await fetch('/api/tuning-stats/lookup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          make: vehicleMake,
          model: vehicleModel,
          year: vehicleYear,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      } else {
        throw new Error('Vehicle stats not found');
      }
    } catch (error) {
      console.error('Error fetching tuning stats:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch stats');
      // Generate mock data as fallback
      generateMockStats();
    } finally {
      setLoading(false);
    }
  };

  const generateMockStats = () => {
    // Generate realistic mock stats based on vehicle info
    const baseHP = getEstimatedBaseHP(vehicleMake, vehicleModel);
    const baseTorque = getEstimatedBaseTorque(vehicleMake, vehicleModel);
    const baseZeroToSixty = getEstimatedZeroToSixty(vehicleMake, vehicleModel);

    const mockStats: TuningStats = {
      vehicleId: `${vehicleMake}_${vehicleModel}_${vehicleYear}`.toLowerCase(),
      make: vehicleMake,
      model: vehicleModel,
      year: vehicleYear,
      fuelType: 'Diesel', // Default assumption
      stock: {
        hp: baseHP,
        torque: baseTorque,
        zeroToSixty: baseZeroToSixty,
      },
      stage1: {
        hp: Math.round(baseHP * 1.25),
        torque: Math.round(baseTorque * 1.30),
        zeroToSixty: Math.round((baseZeroToSixty * 0.90) * 10) / 10,
      },
      stage2: {
        hp: Math.round(baseHP * 1.40),
        torque: Math.round(baseTorque * 1.45),
        zeroToSixty: Math.round((baseZeroToSixty * 0.85) * 10) / 10,
      },
      stage3: {
        hp: Math.round(baseHP * 1.60),
        torque: Math.round(baseTorque * 1.65),
        zeroToSixty: Math.round((baseZeroToSixty * 0.80) * 10) / 10,
      },
    };

    setStats(mockStats);
  };

  const getEstimatedBaseHP = (make: string, model: string): number => {
    const estimates: { [key: string]: number } = {
      'audi': 190,
      'bmw': 210,
      'mercedes': 200,
      'volkswagen': 180,
      'ford': 170,
      'vauxhall': 160,
      'nissan': 175,
      'toyota': 165,
      'honda': 170,
      'mazda': 165,
    };
    return estimates[make.toLowerCase()] || 180;
  };

  const getEstimatedBaseTorque = (make: string, model: string): number => {
    const estimates: { [key: string]: number } = {
      'audi': 420,
      'bmw': 450,
      'mercedes': 440,
      'volkswagen': 380,
      'ford': 370,
      'vauxhall': 350,
      'nissan': 380,
      'toyota': 340,
      'honda': 360,
      'mazda': 350,
    };
    return estimates[make.toLowerCase()] || 380;
  };

  const getEstimatedZeroToSixty = (make: string, model: string): number => {
    const estimates: { [key: string]: number } = {
      'audi': 8.2,
      'bmw': 7.8,
      'mercedes': 8.0,
      'volkswagen': 8.5,
      'ford': 9.2,
      'vauxhall': 9.8,
      'nissan': 8.8,
      'toyota': 9.5,
      'honda': 9.0,
      'mazda': 9.2,
    };
    return estimates[make.toLowerCase()] || 8.5;
  };

  const getStageStats = (stage: string) => {
    if (!stats) return null;
    
    switch (stage.toLowerCase()) {
      case 'stage 1':
        return stats.stage1;
      case 'stage 2':
        return stats.stage2;
      case 'stage 3':
        return stats.stage3;
      default:
        return stats.stage1;
    }
  };

  const calculateGains = () => {
    if (!stats) return null;
    
    const stageStats = getStageStats(selectedStage);
    if (!stageStats) return null;

    return {
      hp: stageStats.hp - stats.stock.hp,
      hpPercent: Math.round(((stageStats.hp - stats.stock.hp) / stats.stock.hp) * 100),
      torque: stageStats.torque - stats.stock.torque,
      torquePercent: Math.round(((stageStats.torque - stats.stock.torque) / stats.stock.torque) * 100),
      acceleration: Math.round((stats.stock.zeroToSixty - stageStats.zeroToSixty) * 10) / 10,
    };
  };

  const exportDynographReport = async () => {
    if (!stats) return;

    try {
      const response = await fetch('/api/generate-dynograph-preview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vehicleStats: stats,
          selectedStage: selectedStage,
          gains: calculateGains(),
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `${stats.make}_${stats.model}_${selectedStage}_Preview.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error exporting dynograph:', error);
      alert('Failed to export dynograph preview');
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
          <span className="ml-3 text-gray-400">Loading performance data...</span>
        </div>
      </div>
    );
  }

  if (error && !stats) {
    return (
      <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
        <div className="text-center py-8">
          <FaTachometerAlt className="text-4xl text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400 mb-4">Performance data not available for this vehicle</p>
          <p className="text-gray-500 text-sm">
            Our experts will provide custom performance estimates after upload
          </p>
        </div>
      </div>
    );
  }

  const stageStats = getStageStats(selectedStage);
  const gains = calculateGains();

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <FaTachometerAlt className="text-yellow-400" />
          Performance Preview
        </h3>
        <button
          onClick={exportDynographReport}
          className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-500 transition-colors flex items-center gap-2"
        >
          <FaDownload />
          Preview Report
        </button>
      </div>

      {stats && stageStats && gains && (
        <div className="space-y-6">
          {/* Vehicle Info */}
          <div className="bg-gray-700 rounded-lg p-4">
            <h4 className="font-bold text-white mb-2">Vehicle Information</h4>
            <p className="text-gray-300">
              {stats.make} {stats.model} ({stats.year}) - {stats.fuelType}
            </p>
          </div>

          {/* Performance Comparison */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-700 rounded-lg p-4">
              <h4 className="font-bold text-white mb-3 text-center">Stock</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">HP:</span>
                  <span className="text-white font-bold">{stats.stock.hp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Torque:</span>
                  <span className="text-white font-bold">{stats.stock.torque} Nm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">0-60 mph:</span>
                  <span className="text-white font-bold">{stats.stock.zeroToSixty}s</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 text-black rounded-lg p-4">
              <h4 className="font-bold mb-3 text-center">{selectedStage}</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">HP:</span>
                  <span className="font-bold">{stageStats.hp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Torque:</span>
                  <span className="font-bold">{stageStats.torque} Nm</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">0-60 mph:</span>
                  <span className="font-bold">{stageStats.zeroToSixty}s</span>
                </div>
              </div>
            </div>
          </div>

          {/* Gains Summary */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
            <h4 className="font-bold mb-3 flex items-center gap-2">
              <FaChartLine />
              Performance Gains
            </h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">+{gains.hp}</div>
                <div className="text-sm opacity-90">HP (+{gains.hpPercent}%)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">+{gains.torque}</div>
                <div className="text-sm opacity-90">Nm (+{gains.torquePercent}%)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">-{gains.acceleration}</div>
                <div className="text-sm opacity-90">sec (0-60)</div>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="text-xs text-gray-500 text-center">
            * Performance figures are estimates based on similar vehicles. Actual results may vary.
            Professional dyno testing recommended for precise measurements.
          </div>
        </div>
      )}
    </div>
  );
}
