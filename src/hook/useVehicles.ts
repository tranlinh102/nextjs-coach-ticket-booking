import { useState, useCallback } from 'react';
import { showToast } from '@/lib/api-helpers';
import { Vehicle, VehicleFormData } from '@/type/vehicle';
import { PaginatedResponse } from '@/type/api';

export function useVehicles() {
  const [loading, setLoading] = useState(false);

  const fetchVehicles = useCallback(
    async (
      keyword: string = '', 
      page: number = 1, 
      size: number = 10,
      active?: boolean
    ) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: String(page),
          size: String(size),
        });

        if (keyword.trim()) {
          params.append('query', keyword.trim());
        }

        if (active !== undefined) {
          params.append('active', String(active));
        }

        const response = await fetch(`/api/vehicles?${params}`);
        const result = await response.json();

        if (!result.success) {
          showToast.error(result.message || 'Không thể tải danh sách xe');
          return null;
        }

        return result.data as PaginatedResponse<Vehicle>;
      } catch (error) {
        console.error('Error fetching vehicles:', error);
        showToast.error('Có lỗi xảy ra khi tải dữ liệu');
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const getVehicleById = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/vehicles/${id}`);
      const result = await response.json();

      if (!result.success) {
        showToast.error(result.message || 'Không thể tải thông tin xe');
        return { success: false, vehicle: undefined };
      }

      return {
        success: true,
        vehicle: result.data as Vehicle,
      };
    } catch (error) {
      console.error('Error fetching vehicle:', error);
      showToast.error('Có lỗi xảy ra khi tải dữ liệu');
      return { success: false, vehicle: undefined };
    } finally {
      setLoading(false);
    }
  }, []);

  const createVehicle = useCallback(async (data: VehicleFormData) => {
    setLoading(true);
    try {
      const response = await fetch('/api/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      showToast.fromResponse(result, 'Thêm xe thành công');
      return {
        success: result.success,
        vehicle: result.data as Vehicle | undefined,
      };
    } catch (error) {
      console.error('Error creating vehicle:', error);
      showToast.error('Có lỗi xảy ra khi thêm xe');
      return { success: false, vehicle: undefined };
    } finally {
      setLoading(false);
    }
  }, []);

  const updateVehicle = useCallback(
    async (id: string, data: VehicleFormData) => {
      setLoading(true);
      try {
        const response = await fetch(`/api/vehicles/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const result = await response.json();

        showToast.fromResponse(result, 'Cập nhật xe thành công');
        return {
          success: result.success,
          vehicle: result.data as Vehicle | undefined,
        };
      } catch (error) {
        console.error('Error updating vehicle:', error);
        showToast.error('Có lỗi xảy ra khi cập nhật xe');
        return { success: false, vehicle: undefined };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /**
   * Toggle trạng thái active của xe (API tự động đổi ngược lại)
   * @param id - ID của xe
   * @returns Object với success và vehicle data để cập nhật UI
   */
  const toggleActiveStatus = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/vehicles/${id}/change-active`, {
        method: 'PATCH',
      });
      const result = await response.json();

      // Toast message đã có trong response từ backend
      showToast.fromResponse(result);
      
      return {
        success: result.success,
        vehicle: result.data as Vehicle | undefined,
      };
    } catch (error) {
      console.error('Error toggling vehicle active status:', error);
      showToast.error('Có lỗi xảy ra');
      return { success: false, vehicle: undefined };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    fetchVehicles,
    getVehicleById,
    createVehicle,
    updateVehicle,
    toggleActiveStatus,
  };
}
