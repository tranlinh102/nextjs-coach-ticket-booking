import { getAxiosByContext, type AxiosContext } from '@/lib/api';
import { handleApiError, wrapResponse } from '@/lib/api-helpers';
import { ApiResponse } from '@/type/api';
import { Trip, TripResponse } from '@/type/trip';

export async function fetchAvailableTrips(
  departureDate: string = '',
  startProvinceId: string = '',
  endProvinceId: string = '',
  requiredSeats: number = 1,
  context: AxiosContext = 'auto', 
): Promise<ApiResponse<TripResponse[]>> {
  try {
    const axios = await getAxiosByContext(context);

    const params = new URLSearchParams({
      requiredSeats: String(requiredSeats),
    });

    if (departureDate.trim()) {
      params.append('departureDate', departureDate.trim());
    }

    if (startProvinceId.trim()) {
      params.append('startProvinceId', startProvinceId.trim());
    }

    if (endProvinceId.trim()) {
      params.append('endProvinceId', endProvinceId.trim());
    }
    
    const response = await axios.get<TripResponse[]>(`/coaches/trips/search?${params}`);

    return wrapResponse(response.data);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function fetchTrips(
  context: AxiosContext = 'auto'
): Promise<ApiResponse<TripResponse[]>> {
  try {
    const axios = await getAxiosByContext(context);

    const response = await axios.get<TripResponse[]>(`/coaches/public/trips`);

    return wrapResponse(response.data);
  } catch (error) {
    return handleApiError(error);
  }
}

