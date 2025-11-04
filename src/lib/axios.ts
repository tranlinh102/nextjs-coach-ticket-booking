import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";

// Base API URL - có thể cấu hình từ env
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000/api/v1";

// Tạo axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 seconds
});

// Request interceptor - Tự động thêm access token vào mỗi request
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Get session from NextAuth
    const session = await getSession();

    // Nếu có access token, thêm vào Authorization header
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Xử lý errors
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Return data directly
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // Nếu token hết hạn (401) và chưa retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // NextAuth sẽ tự động refresh token khi gọi getSession() lần tiếp theo
      // Do đó chỉ cần retry request này
      const session = await getSession();
      
      if (session?.accessToken) {
        // Update token và retry
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${session.accessToken}`;
        }
        return axiosInstance(originalRequest);
      }
    }

    if (process.env.NODE_ENV === 'development') {
      console.error('[API ERROR DETAILS]', {
        url: error.config?.url,
        method: error.config?.method,
        data: error.response?.data,
        status: error.response?.status,
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

// Export helper function để tạo axios instance tùy chỉnh
export function createAxiosInstance(baseURL?: string) {
  return axios.create({
    baseURL: baseURL || API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
