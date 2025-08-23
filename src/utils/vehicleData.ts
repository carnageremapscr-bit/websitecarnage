// src/utils/vehicleData.ts
// Vehicle data utility for admin-editable vehicle lookup

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

// Demo data, should be replaced with persistent storage in production
export let vehicleData: Vehicle[] = [
  {
    id: "1",
    make: "Volkswagen",
    model: "Golf GTI",
    engine: "2.0 TSI",
    stockBhp: 245,
    stockNm: 370,
    stages: [
      { stage: "Stage 1", bhp: 300, nm: 430 },
      { stage: "Stage 2", bhp: 340, nm: 480 },
      { stage: "Stage 3", bhp: 380, nm: 520 },
    ],
  },
  {
    id: "2",
    make: "BMW",
    model: "M140i",
    engine: "3.0 B58",
    stockBhp: 340,
    stockNm: 500,
    stages: [
      { stage: "Stage 1", bhp: 400, nm: 600 },
      { stage: "Stage 2", bhp: 450, nm: 650 },
      { stage: "Stage 3", bhp: 500, nm: 700 },
    ],
  },
];

export function getVehicles() {
  return vehicleData;
}

export function addVehicle(vehicle: Vehicle) {
  vehicleData.push(vehicle);
}

export function updateVehicle(id: string, update: Partial<Vehicle>) {
  const idx = vehicleData.findIndex(v => v.id === id);
  if (idx !== -1) {
    vehicleData[idx] = { ...vehicleData[idx], ...update };
  }
}

export function deleteVehicle(id: string) {
  vehicleData = vehicleData.filter(v => v.id !== id);
}
