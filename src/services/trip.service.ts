import { getAxiosByContext, type AxiosContext } from '@/lib/api';
import { handleApiError, wrapResponse } from '@/lib/api-helpers';
import { ApiResponse, PaginatedResponse } from '@/type/api';

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

/**
 * Lấy danh sách chuyến xe — không truyền params, chỉ GET /coaches/trips
 */
export async function fetchTrips(
  context: AxiosContext = 'auto'
): Promise<ApiResponse<PaginatedResponse<Trip>>> {
  try {
    const axios = await getAxiosByContext(context);

    const response = await axios.get<PaginatedResponse<Trip>>(
      `/coaches/trips`
    );

    return wrapResponse(response.data);
  } catch (error) {
    return handleApiError(error);
  }
}
