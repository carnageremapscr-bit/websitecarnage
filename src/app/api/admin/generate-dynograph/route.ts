import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

const DATA_DIR = join(process.cwd(), 'src', 'data');

export async function POST(request: NextRequest) {
  try {
    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    // Read queue data to find the order
    const queuePath = join(DATA_DIR, 'fileServiceQueue.json');
    const queue = existsSync(queuePath) ? JSON.parse(readFileSync(queuePath, 'utf8')) : [];
    
    const orderIndex = queue.findIndex((item: any) => item.id === orderId);
    if (orderIndex === -1) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    const order = queue[orderIndex];

    // Check if dynograph was requested
    if (!order.dynograph) {
      return NextResponse.json(
        { error: 'Dynograph was not requested for this order' },
        { status: 400 }
      );
    }

    // Generate mock dynograph data
    const mockDynographData = generateMockDynographData(order);

    // In a real implementation, you would:
    // 1. Use jsPDF to create a professional PDF
    // 2. Add charts using Chart.js
    // 3. Include customer and vehicle details
    // 4. Add QR code with order reference
    // 5. Include Carnage Remaps branding and contact details

    const dynographFilename = `dynograph_${orderId}_${Date.now()}.pdf`;
    const dynographPath = join(process.cwd(), 'uploads', dynographFilename);

    // Mock PDF generation (in production, use jsPDF)
    const mockPdfContent = JSON.stringify({
      type: 'dynograph',
      orderId: orderId,
      generated: new Date().toISOString(),
      data: mockDynographData,
      watermark: 'CARNAGE REMAPS',
      qrCode: `https://carnageremaps.co.uk/order/${orderId}`,
    });

    writeFileSync(dynographPath, mockPdfContent);

    // Update order with dynograph filename
    queue[orderIndex].dynographFilename = dynographFilename;
    queue[orderIndex].updatedAt = new Date().toISOString();

    // Write updated queue back to file
    writeFileSync(queuePath, JSON.stringify(queue, null, 2));

    return NextResponse.json({
      success: true,
      filename: dynographFilename,
      message: 'Dynograph generated successfully',
      data: mockDynographData
    });

  } catch (error) {
    console.error('Error generating dynograph:', error);
    return NextResponse.json(
      { error: 'Failed to generate dynograph' },
      { status: 500 }
    );
  }
}

function generateMockDynographData(order: any) {
  // Mock before/after performance data
  const baseHP = getBaseHP(order.vehicleMake, order.vehicleModel);
  const baseTorque = getBaseTorque(order.vehicleMake, order.vehicleModel);
  
  // Calculate gains based on stage
  const gains = getStageGains(order.stage);
  
  const beforeData = {
    hp: baseHP,
    torque: baseTorque,
    zeroToSixty: getEstimatedZeroToSixty(baseHP, order.vehicleMake),
  };

  const afterData = {
    hp: Math.round(baseHP * gains.hpMultiplier),
    torque: Math.round(baseTorque * gains.torqueMultiplier),
    zeroToSixty: Math.max(3.0, beforeData.zeroToSixty * gains.accelerationMultiplier),
  };

  return {
    vehicle: {
      make: order.vehicleMake || 'Unknown',
      model: order.vehicleModel || 'Unknown',
      year: order.vehicleYear || new Date().getFullYear(),
      fuelType: order.fuelType || 'Unknown',
      ecuType: order.ecuType || 'Unknown',
    },
    stage: order.stage,
    before: beforeData,
    after: afterData,
    gains: {
      hp: afterData.hp - beforeData.hp,
      hpPercent: Math.round(((afterData.hp - beforeData.hp) / beforeData.hp) * 100),
      torque: afterData.torque - beforeData.torque,
      torquePercent: Math.round(((afterData.torque - beforeData.torque) / baseTorque) * 100),
      accelerationImprovement: beforeData.zeroToSixty - afterData.zeroToSixty,
    },
    chartData: generateChartData(beforeData, afterData),
    testDate: new Date().toISOString(),
    technician: 'Carnage Remaps Team',
    notes: `Professional ${order.stage} remap completed with significant performance improvements.`,
  };
}

function getBaseHP(make: string, model: string): number {
  // Mock base HP values - in production, this would come from a vehicle database
  const mockValues: { [key: string]: number } = {
    'audi': 200,
    'bmw': 220,
    'mercedes': 210,
    'volkswagen': 190,
    'ford': 180,
    'vauxhall': 170,
    'default': 180,
  };
  
  return mockValues[make?.toLowerCase()] || mockValues['default'];
}

function getBaseTorque(make: string, model: string): number {
  // Mock base torque values
  const mockValues: { [key: string]: number } = {
    'audi': 350,
    'bmw': 380,
    'mercedes': 370,
    'volkswagen': 340,
    'ford': 320,
    'vauxhall': 300,
    'default': 320,
  };
  
  return mockValues[make?.toLowerCase()] || mockValues['default'];
}

function getStageGains(stage: string): { hpMultiplier: number; torqueMultiplier: number; accelerationMultiplier: number } {
  switch (stage?.toLowerCase()) {
    case 'stage 1':
      return { hpMultiplier: 1.25, torqueMultiplier: 1.30, accelerationMultiplier: 0.90 };
    case 'stage 2':
      return { hpMultiplier: 1.40, torqueMultiplier: 1.45, accelerationMultiplier: 0.85 };
    case 'stage 3':
      return { hpMultiplier: 1.60, torqueMultiplier: 1.65, accelerationMultiplier: 0.80 };
    default:
      return { hpMultiplier: 1.25, torqueMultiplier: 1.30, accelerationMultiplier: 0.90 };
  }
}

function getEstimatedZeroToSixty(baseHP: number, make: string): number {
  // Mock 0-60 estimates based on HP and make
  const baseTimes: { [key: string]: number } = {
    'audi': 7.5,
    'bmw': 7.2,
    'mercedes': 7.8,
    'volkswagen': 8.0,
    'ford': 8.5,
    'vauxhall': 9.0,
    'default': 8.0,
  };
  
  const baseTime = baseTimes[make?.toLowerCase()] || baseTimes['default'];
  return Math.round((baseTime + Math.random() * 1.0) * 10) / 10; // Add some variation
}

function generateChartData(before: any, after: any) {
  // Generate mock dyno chart data points
  const rpmRange = Array.from({ length: 50 }, (_, i) => 2000 + (i * 100)); // 2000-7000 RPM
  
  const beforeCurve = rpmRange.map(rpm => ({
    rpm,
    hp: before.hp * (0.4 + 0.6 * Math.sin((rpm - 2000) / 2500 * Math.PI)),
    torque: before.torque * (0.8 + 0.2 * Math.sin((rpm - 2000) / 1500 * Math.PI))
  }));

  const afterCurve = rpmRange.map(rpm => ({
    rpm,
    hp: after.hp * (0.4 + 0.6 * Math.sin((rpm - 2000) / 2500 * Math.PI)),
    torque: after.torque * (0.8 + 0.2 * Math.sin((rpm - 2000) / 1500 * Math.PI))
  }));

  return {
    beforeCurve,
    afterCurve,
    rpmRange,
  };
}
