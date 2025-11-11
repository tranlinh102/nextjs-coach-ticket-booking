import { getAxiosByContext, type AxiosContext } from '@/lib/api';
import { handleApiError, wrapResponse } from '@/lib/api-helpers';
import { ApiResponse } from '@/type/api';
import { Province } from '@/type/province';

export async function fetchProvinces(
  context: AxiosContext = 'auto'
): Promise<ApiResponse<Province[]>> {
  try {
    const axios = await getAxiosByContext(context);

    const response = await axios.get<Province[]>(`/coaches/provinces`);

    return wrapResponse(response.data);
  } catch (error) {
    return handleApiError(error);
  }
}

