import { getAxiosByContext, type AxiosContext } from '@/lib/api';
import { handleApiError, wrapResponse } from '@/lib/api-helpers';
import { ApiResponse } from '@/type/api';

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
  note?: string | null;
  createdAt: string;
  updatedAt?: string | null;
};

export async function fetchTrips(
  context: AxiosContext = 'auto'
): Promise<ApiResponse<Trip[]>> {
  try {
    const axios = await getAxiosByContext(context);

    const response = await axios.get<Trip[]>(`/coaches/trips`);

    return wrapResponse(response.data);
  } catch (error) {
    return handleApiError(error);
  }
}

