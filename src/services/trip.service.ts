import { getAxiosByContext, type AxiosContext } from '@/lib/api';
import { handleApiError, wrapResponse } from '@/lib/api-helpers';
import { ApiResponse } from '@/type/api';
import { Trip } from '@/type/trip';

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

