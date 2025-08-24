// src/utils/vehicleData.ts
// Vehicle data utility for admin-editable vehicle lookup

import fs from "fs";
import path from "path";


export type Vehicle = {
  id: string;
  make: string;
  model: string;
  engine: string;
  stockBhp: number;
  stockNm: number;
  stages: {
    stage: string;
    bhp: number;
    nm: number;
  }[];
};

const dataFile = path.join(process.cwd(), "src", "data", "vehicleData.json");

function readData(): Vehicle[] {
  try {
    const raw = fs.readFileSync(dataFile, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeData(data: Vehicle[]) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), "utf-8");
}

// Demo data, should be replaced with persistent storage in production

export function getVehicles(): Vehicle[] {
  return readData();
}

export function addVehicle(vehicle: Vehicle) {
  const data = readData();
  data.push(vehicle);
  writeData(data);
}

export function updateVehicle(id: string, update: Partial<Vehicle>) {
  const data = readData();
  const idx = data.findIndex(v => v.id === id);
  if (idx !== -1) {
    data[idx] = { ...data[idx], ...update };
    writeData(data);
  }
}

export function deleteVehicle(id: string) {
  const data = readData();
  const filtered = data.filter(v => v.id !== id);
  writeData(filtered);
}
