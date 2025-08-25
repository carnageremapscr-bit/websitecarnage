import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { vehicleStats, selectedStage, gains } = await request.json();

    // In a real implementation, you would use jsPDF to create a proper PDF
    // For now, we'll create a mock PDF content
    
    const mockPdfContent = generateMockPDFContent(vehicleStats, selectedStage, gains);

    // Create a blob with the PDF content
    const pdfBlob = new Blob([mockPdfContent], { type: 'application/pdf' });
    
    // Convert to buffer for NextResponse
    const buffer = Buffer.from(await pdfBlob.arrayBuffer());

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${vehicleStats.make}_${vehicleStats.model}_${selectedStage}_Preview.pdf"`,
        'Content-Length': buffer.length.toString(),
      },
    });

  } catch (error) {
    console.error('Error generating dynograph preview:', error);
    return NextResponse.json(
      { error: 'Failed to generate dynograph preview' },
      { status: 500 }
    );
  }
}

function generateMockPDFContent(vehicleStats: any, selectedStage: string, gains: any): string {
  // This is a mock implementation
  // In production, you would use jsPDF to create a proper PDF with charts
  
  const content = `
CARNAGE REMAPS - PERFORMANCE PREVIEW REPORT
===============================================

Vehicle Information:
- Make: ${vehicleStats.make}
- Model: ${vehicleStats.model}
- Year: ${vehicleStats.year}
- Fuel Type: ${vehicleStats.fuelType}

Performance Data:
================

STOCK PERFORMANCE:
- Power: ${vehicleStats.stock.hp} HP
- Torque: ${vehicleStats.stock.torque} Nm
- 0-60 mph: ${vehicleStats.stock.zeroToSixty} seconds

${selectedStage.toUpperCase()} PERFORMANCE:
- Power: ${vehicleStats[selectedStage.toLowerCase().replace(' ', '')].hp} HP
- Torque: ${vehicleStats[selectedStage.toLowerCase().replace(' ', '')].torque} Nm
- 0-60 mph: ${vehicleStats[selectedStage.toLowerCase().replace(' ', '')].zeroToSixty} seconds

PERFORMANCE GAINS:
- Power Increase: +${gains.hp} HP (+${gains.hpPercent}%)
- Torque Increase: +${gains.torque} Nm (+${gains.torquePercent}%)
- Acceleration Improvement: -${gains.acceleration} seconds

IMPORTANT NOTES:
================
- These are estimated performance figures based on similar vehicles
- Actual results may vary depending on vehicle condition and specific engine variant
- Professional dyno testing recommended for precise measurements
- This is a preview report - actual dynograph will include detailed performance curves

Contact Information:
====================
Carnage Remaps
Canterbury, Kent
Email: info@carnageremaps.co.uk
Phone: +44 (0) 1234 567890
Website: https://carnageremaps.co.uk

"Same car, only better."

Generated: ${new Date().toLocaleString()}
Report ID: PREVIEW_${Date.now()}
`;

  return content;
}
