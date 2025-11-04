import { NextRequest, NextResponse } from 'next/server';
import {
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} from '@/services/vehicle.service';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const response = await getVehicleById(id);
  return NextResponse.json(response, { status: response.statusCode || 200 });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const response = await updateVehicle(id, body);
    return NextResponse.json(response, { status: response.statusCode || 200 });
  } catch (error) {
    console.error('Error in PUT /api/vehicles/[id]:', error);
    return NextResponse.json(
      { success: false, message: 'Invalid request body' },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const response = await deleteVehicle(id);
  return NextResponse.json(response, { status: response.statusCode || 200 });
}
