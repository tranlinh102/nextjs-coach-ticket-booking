import { getAxiosByContext, type AxiosContext } from '@/lib/api';
import { handleApiError, wrapResponse } from '@/lib/api/api-helpers';
import { ApiResponse } from '@/type/api';

export type Vehicle = {
  id: string;
  licensePlate: string;
  seatCapacity: number;
  activeSeatCount: number;
  type: string;
  status: string;
  active: boolean;
};

export type Route = {
  id: string;
  code: string;
  name: string;
  startStopId: string;
  endStopId: string;
  distanceKm: number;
  estimatedDurationMinutes: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Trip = {
  id: string;
  routeId: string;
  vehicleId: string;
  driver: string | null;
  scheduledDepartureTime: string;
  scheduledArrivalTime: string;
  actualDepartureTime: string | null;
  actualArrivalTime: string | null;
  price: number;
  status: string;
  note: string | null;
  createdAt: string;
  updatedAt: string | null;
  vehicle: Vehicle;
  route: Route;
};

export async function fetchTrips(
  context: AxiosContext = 'auto'
): Promise<ApiResponse<Trip[]>> {
  try {
    const axios = await getAxiosByContext(context);

    const response = await axios.get<Trip[]>(`/coaches/public/trips`);

    return wrapResponse(response.data);
  } catch (error) {
    return handleApiError(error);
  }
}

