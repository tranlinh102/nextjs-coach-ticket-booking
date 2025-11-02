import axiosInstance from "@/lib/axios";

// =====================================================
// TYPES
// =====================================================
export interface Vehicle {
  id: string;
  licensePlate: string;
  seatCapacity: number;
  type: "Ghế" | "Giường";
  status: "Hoạt động" | "Không hoạt động";
  createdAt: string;
  updatedAt: string;
  active: boolean;
}

// =====================================================
// API CALLS
// =====================================================

/**
 * Lấy danh sách tất cả vehicles
 */
export async function getVehicles(): Promise<Vehicle[]> {
  try {
    const response = await axiosInstance.get<Vehicle[]>("/coaches/vehicles");
    return response.data;
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    throw error;
  }
}

/**
 * Lấy chi tiết 1 vehicle theo ID
 */
export async function getVehicleById(id: string): Promise<Vehicle> {
  try {
    const response = await axiosInstance.get<Vehicle>(`/vehicles/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching vehicle:", error);
    throw error;
  }
}

/**
 * Tạo vehicle mới
 */
export async function createVehicle(data: Omit<Vehicle, "id" | "createdAt" | "updatedAt">): Promise<Vehicle> {
  try {
    const response = await axiosInstance.post<Vehicle>("/vehicles", data);
    return response.data;
  } catch (error) {
    console.error("Error creating vehicle:", error);
    throw error;
  }
}

/**
 * Cập nhật vehicle
 */
export async function updateVehicle(id: string, data: Partial<Vehicle>): Promise<Vehicle> {
  try {
    const response = await axiosInstance.put<Vehicle>(`/vehicles/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating vehicle:", error);
    throw error;
  }
}

/**
 * Xóa vehicle
 */
export async function deleteVehicle(id: string): Promise<void> {
  try {
    await axiosInstance.delete(`/vehicles/${id}`);
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    throw error;
  }
}
