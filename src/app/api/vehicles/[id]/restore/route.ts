import { NextRequest, NextResponse } from 'next/server';
import { restoreVehicle } from '@/services/vehicle.service';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const response = await restoreVehicle(id);
  return NextResponse.json(response, { status: response.statusCode || 200 });
}
