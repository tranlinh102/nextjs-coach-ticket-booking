// Example: Sử dụng axios instance để call API
// File: src/services/example.service.ts

import axiosInstance from "@/lib/axios";

// Interface cho response data (tùy chỉnh theo backend API)
interface User {
  id: string;
  name: string;
  email: string;
}

interface Trip {
  id: string;
  departureLocation: string;
  arrivalLocation: string;
  departureTime: string;
  price: number;
}

// =====================================================
// EXAMPLE 1: GET Request - Lấy danh sách users
// =====================================================
export async function getUsers() {
  try {
    const response = await axiosInstance.get<User[]>("/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

// =====================================================
// EXAMPLE 2: GET Request với params - Search trips
// =====================================================
export async function searchTrips(from: string, to: string, date: string) {
  try {
    const response = await axiosInstance.get<Trip[]>("/trips/search", {
      params: { from, to, date },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching trips:", error);
    throw error;
  }
}

// =====================================================
// EXAMPLE 3: POST Request - Tạo booking
// =====================================================
interface CreateBookingData {
  tripId: string;
  seatNumbers: string[];
  passengerName: string;
  passengerPhone: string;
}

interface BookingResponse {
  id: string;
  bookingCode: string;
  status: string;
}

export async function createBooking(data: CreateBookingData) {
  try {
    const response = await axiosInstance.post<BookingResponse>("/bookings", data);
    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
}

// =====================================================
// EXAMPLE 4: PUT Request - Cập nhật profile
// =====================================================
interface UpdateProfileData {
  name?: string;
  phone?: string;
  address?: string;
}

export async function updateProfile(userId: string, data: UpdateProfileData) {
  try {
    const response = await axiosInstance.put<User>(`/users/${userId}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
}

// =====================================================
// EXAMPLE 5: DELETE Request - Hủy booking
// =====================================================
export async function cancelBooking(bookingId: string) {
  try {
    const response = await axiosInstance.delete(`/bookings/${bookingId}`);
    return response.data;
  } catch (error) {
    console.error("Error canceling booking:", error);
    throw error;
  }
}

// =====================================================
// EXAMPLE 6: File Upload - Upload ảnh avatar
// =====================================================
export async function uploadAvatar(file: File) {
  try {
    const formData = new FormData();
    formData.append("avatar", file);

    const response = await axiosInstance.post("/users/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading avatar:", error);
    throw error;
  }
}

// =====================================================
// EXAMPLE 7: Custom headers - Gọi API với custom header
// =====================================================
export async function getAdminData() {
  try {
    const response = await axiosInstance.get("/admin/dashboard", {
      headers: {
        "X-Custom-Header": "custom-value",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching admin data:", error);
    throw error;
  }
}

// =====================================================
// EXAMPLE 8: Handle error properly
// =====================================================
import { AxiosError } from "axios";

interface ApiError {
  message: string;
  code: string;
}

export async function getUserWithErrorHandling(userId: string) {
  try {
    const response = await axiosInstance.get<User>(`/users/${userId}`);
    return { success: true, data: response.data };
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      return {
        success: false,
        error: apiError?.message || "Unknown error occurred",
        code: apiError?.code || "UNKNOWN",
      };
    }
    return {
      success: false,
      error: "Network error",
      code: "NETWORK_ERROR",
    };
  }
}
