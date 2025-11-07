import { NextRequest, NextResponse } from 'next/server';
import { toggleVehicleActive } from '@/services/vehicle.service';

/**
 * PATCH /api/vehicles/[id]/change-active
 * Toggle trạng thái active của xe (tự động đổi ngược lại)
 * - active: true → false (xóa)
 * - active: false → true (khôi phục)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const response = await toggleVehicleActive(id, 'server');
  return NextResponse.json(response, { status: response.statusCode || 200 });
}
