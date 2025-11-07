import { NextRequest, NextResponse } from 'next/server';
import { fetchVehicles, createVehicle } from '@/services/vehicle.service';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const keyword = searchParams.get('query') || searchParams.get('keyword') || '';
  const page = parseInt(searchParams.get('page') || '1');
  const size = parseInt(searchParams.get('size') || '10');
  const activeParam = searchParams.get('active');
  const active = activeParam !== null ? activeParam === 'true' : undefined;

  const response = await fetchVehicles(keyword, page, size, active, 'server');

  return NextResponse.json(response, { status: response.statusCode || 200 });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await createVehicle(body);

    return NextResponse.json(response, { status: response.statusCode || 200 });
  } catch (error) {
    console.error('Error in POST /api/vehicles:', error);
    return NextResponse.json(
      { success: false, message: 'Invalid request body' },
      { status: 400 }
    );
  }
}
