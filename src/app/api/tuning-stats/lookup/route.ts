import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const DATA_DIR = join(process.cwd(), 'src', 'data');

export async function POST(request: NextRequest) {
  try {
    const { make, model, year } = await request.json();

    if (!make || !model || !year) {
      return NextResponse.json(
        { error: 'Make, model, and year are required' },
        { status: 400 }
      );
    }

    // Read vehicle data
    const vehicleDataPath = join(DATA_DIR, 'vehicleData.json');
    const vehicleData = existsSync(vehicleDataPath) 
      ? JSON.parse(readFileSync(vehicleDataPath, 'utf8')) 
      : [];

    // Try to find exact match
    const exactMatch = vehicleData.find((vehicle: any) => 
      vehicle.make.toLowerCase() === make.toLowerCase() &&
      vehicle.model.toLowerCase() === model.toLowerCase() &&
      vehicle.year === year
    );

    if (exactMatch) {
      return NextResponse.json(exactMatch);
    }

    // Try to find similar model (same make and model, different year)
    const similarModel = vehicleData.find((vehicle: any) => 
      vehicle.make.toLowerCase() === make.toLowerCase() &&
      vehicle.model.toLowerCase() === model.toLowerCase()
    );

    if (similarModel) {
      // Adjust data for the specific year
      const adjustedData = {
        ...similarModel,
        year: year,
        vehicleId: `${make}_${model}_${year}`.toLowerCase().replace(/\s+/g, '_'),
      };
      return NextResponse.json(adjustedData);
    }

    // Generate estimated data based on make
    const estimatedData = generateEstimatedData(make, model, year);
    return NextResponse.json(estimatedData);

  } catch (error) {
    console.error('Error looking up tuning stats:', error);
    return NextResponse.json(
      { error: 'Failed to lookup tuning stats' },
      { status: 500 }
    );
  }
}

function generateEstimatedData(make: string, model: string, year: number) {
  // Base estimates by manufacturer
  const manufacturerData: { [key: string]: any } = {
    'audi': {
      baseHP: 190,
      baseTorque: 420,
      baseZeroToSixty: 8.2,
      fuelType: 'Diesel',
    },
    'bmw': {
      baseHP: 210,
      baseTorque: 450,
      baseZeroToSixty: 7.8,
      fuelType: 'Diesel',
    },
    'mercedes': {
      baseHP: 200,
      baseTorque: 440,
      baseZeroToSixty: 8.0,
      fuelType: 'Diesel',
    },
    'volkswagen': {
      baseHP: 180,
      baseTorque: 380,
      baseZeroToSixty: 8.5,
      fuelType: 'Diesel',
    },
    'ford': {
      baseHP: 170,
      baseTorque: 370,
      baseZeroToSixty: 9.2,
      fuelType: 'Diesel',
    },
    'vauxhall': {
      baseHP: 160,
      baseTorque: 350,
      baseZeroToSixty: 9.8,
      fuelType: 'Diesel',
    },
    'nissan': {
      baseHP: 175,
      baseTorque: 380,
      baseZeroToSixty: 8.8,
      fuelType: 'Diesel',
    },
    'toyota': {
      baseHP: 165,
      baseTorque: 340,
      baseZeroToSixty: 9.5,
      fuelType: 'Diesel',
    },
    'honda': {
      baseHP: 170,
      baseTorque: 360,
      baseZeroToSixty: 9.0,
      fuelType: 'Diesel',
    },
    'mazda': {
      baseHP: 165,
      baseTorque: 350,
      baseZeroToSixty: 9.2,
      fuelType: 'Diesel',
    },
  };

  const makeData = manufacturerData[make.toLowerCase()] || {
    baseHP: 180,
    baseTorque: 380,
    baseZeroToSixty: 8.5,
    fuelType: 'Diesel',
  };

  // Adjust for year (newer cars typically have more power)
  const yearAdjustment = (year - 2010) * 2; // +2 HP per year after 2010
  const adjustedHP = Math.max(120, makeData.baseHP + yearAdjustment);
  const adjustedTorque = Math.max(300, makeData.baseTorque + (yearAdjustment * 2));

  return {
    vehicleId: `${make}_${model}_${year}`.toLowerCase().replace(/\s+/g, '_'),
    make: make,
    model: model,
    year: year,
    fuelType: makeData.fuelType,
    stock: {
      hp: adjustedHP,
      torque: adjustedTorque,
      zeroToSixty: makeData.baseZeroToSixty,
    },
    stage1: {
      hp: Math.round(adjustedHP * 1.25),
      torque: Math.round(adjustedTorque * 1.30),
      zeroToSixty: Math.round((makeData.baseZeroToSixty * 0.90) * 10) / 10,
    },
    stage2: {
      hp: Math.round(adjustedHP * 1.40),
      torque: Math.round(adjustedTorque * 1.45),
      zeroToSixty: Math.round((makeData.baseZeroToSixty * 0.85) * 10) / 10,
    },
    stage3: {
      hp: Math.round(adjustedHP * 1.60),
      torque: Math.round(adjustedTorque * 1.65),
      zeroToSixty: Math.round((makeData.baseZeroToSixty * 0.80) * 10) / 10,
    },
    estimated: true, // Flag to indicate this is estimated data
    lastUpdated: new Date().toISOString(),
    notes: `Estimated performance data for ${make} ${model} (${year}). Actual results may vary based on specific engine variant and condition.`,
  };
}
