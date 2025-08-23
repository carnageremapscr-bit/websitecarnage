// src/app/api/admin/vehicleData/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getVehicles, addVehicle, updateVehicle, deleteVehicle } from "@/utils/vehicleData";

export async function GET() {
  return NextResponse.json(getVehicles());
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  addVehicle(data);
  return NextResponse.json({ ok: true });
}

export async function PATCH(req: NextRequest) {
  const { id, ...update } = await req.json();
  updateVehicle(id, update);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  deleteVehicle(id);
  return NextResponse.json({ ok: true });
}
