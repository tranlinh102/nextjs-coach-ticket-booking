import { getAxiosByContext, type AxiosContext } from '@/lib/api';
import { handleApiError, wrapResponse } from '@/lib/api/api-helpers';
import { ApiResponse, PaginatedResponse } from '@/type/api';

export type Vehicle = {
  id: string;
  licensePlate: string;
  seatCapacity: number;
  activeSeatCount: number;
  type: string;
  status: string;
  active: boolean;
};

export type VehicleFormData = {
  licensePlate: string;
  seatCapacity: number;
  activeSeatCount: number;
  type: string;
};

// ===== CONTEXT-AWARE FUNCTIONS =====

/**
 * Lấy danh sách xe với pagination
 * @param keyword - Từ khóa tìm kiếm (biển số xe)
 * @param page - Trang hiện tại (1-based)
 * @param size - Số lượng bản ghi mỗi trang
 * @param active - Filter theo trạng thái: true = đang dùng, false = đã xóa, undefined = tất cả
 * @param context - 'server' | 'client' | 'auto' (mặc định: 'auto')
 */
export async function fetchVehicles(
  keyword: string = '',
  page: number = 1,
  size: number = 10,
  active?: boolean,
  context: AxiosContext = 'auto'
): Promise<ApiResponse<PaginatedResponse<Vehicle>>> {
  try {
    const axios = await getAxiosByContext(context);
    const params = new URLSearchParams({
      page: String(page - 1), // Backend bắt đầu từ 0
      size: String(size),
    });

    // Thêm keyword nếu có
    if (keyword.trim()) {
      params.append('keyword', keyword.trim());
    }

    // Thêm active filter nếu có
    if (active !== undefined) {
      params.append('active', String(active));
    }

    const response = await axios.get<PaginatedResponse<Vehicle>>(
      `/coaches/vehicles?${params}`
    );

    return wrapResponse(response.data);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * Lấy thông tin xe theo ID
 * @param id - ID của xe
 * @param context - 'server' | 'client' | 'auto' (mặc định: 'auto')
 */
export async function getVehicleById(
  id: string,
  context: AxiosContext = 'auto'
): Promise<ApiResponse<Vehicle>> {
  try {
    const axios = await getAxiosByContext(context);
    const response = await axios.get<Vehicle>(`/coaches/vehicles/${id}`);
    return wrapResponse(response.data);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * Tạo xe mới
 * @param data - Dữ liệu xe
 * @param context - 'server' | 'client' | 'auto' (mặc định: 'auto')
 */
export async function createVehicle(
  data: VehicleFormData,
  context: AxiosContext = 'auto'
): Promise<ApiResponse<Vehicle>> {
  try {
    const axios = await getAxiosByContext(context);
    const response = await axios.post<Vehicle>('/coaches/vehicles', data);
    return wrapResponse(response.data, 'Tạo xe thành công');
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * Cập nhật thông tin xe
 * @param id - ID của xe
 * @param data - Dữ liệu cập nhật
 * @param context - 'server' | 'client' | 'auto' (mặc định: 'auto')
 */
export async function updateVehicle(
  id: string,
  data: VehicleFormData,
  context: AxiosContext = 'auto'
): Promise<ApiResponse<Vehicle>> {
  try {
    const axios = await getAxiosByContext(context);
    const response = await axios.put<Vehicle>(`/coaches/vehicles/${id}`, data);
    return wrapResponse(response.data, 'Cập nhật xe thành công');
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * Toggle trạng thái active của xe (xóa/khôi phục)
 * API tự động đổi trạng thái ngược lại: active = true → false, active = false → true
 * @param id - ID của xe
 * @param context - 'server' | 'client' | 'auto' (mặc định: 'auto')
 */
export async function toggleVehicleActive(
  id: string,
  context: AxiosContext = 'auto'
): Promise<ApiResponse<Vehicle>> {
  try {
    const axios = await getAxiosByContext(context);
    const response = await axios.patch<Vehicle>(
      `/coaches/vehicles/${id}/change-active`
    );
    
    // Message sẽ phụ thuộc vào trạng thái mới
    const message = response.data.active 
      ? 'Khôi phục xe thành công' 
      : 'Xóa xe thành công';
    
    return wrapResponse(response.data, message);
  } catch (error) {
    return handleApiError(error);
  }
}

// ===== HELPER FUNCTIONS cho Server Components =====

/**
 * Helper: Lấy vehicle theo ID hoặc trả về null nếu không tìm thấy
 * Dùng trong Server Components để dễ dàng handle notFound()
 */
export async function getVehicleByIdOrNull(id: string): Promise<Vehicle | null> {
  const response = await getVehicleById(id, 'server');
  return response.success && response.data ? response.data : null;
}
