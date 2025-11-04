import axios, { AxiosInstance } from 'axios';
import { getSession } from 'next-auth/react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000/api/v1';

// Track if we're currently refreshing to avoid multiple refresh calls
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

function onTokenRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

/**
 * Factory tạo axios instance với token
 * Dùng chung cho cả client và server
 * 
 * @param token - Access token (optional)
 * @param enableAutoRefresh - Tự động refresh token khi hết hạn (chỉ dùng cho client)
 * @returns Axios instance đã được cấu hình
 */
export function createAxiosApi(token?: string, enableAutoRefresh = false): AxiosInstance {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    timeout: 30000,
  });

  // Response interceptor - Xử lý errors và auto-refresh token
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // Log error cho debugging
      if (error.response) {
        console.error('[API Error]', {
          status: error.response.status,
          data: error.response.data,
          url: error.config?.url,
        });

        // Nếu lỗi 401 và có bật auto-refresh (chỉ dùng cho client-side)
        if (
          error.response.status === 401 &&
          enableAutoRefresh &&
          !originalRequest._retry &&
          typeof window !== 'undefined'
        ) {
          originalRequest._retry = true;

          if (!isRefreshing) {
            isRefreshing = true;

            try {
              // Lấy session mới (NextAuth tự động refresh token)
              const session = await getSession();

              // Kiểm tra nếu refresh token đã hết hạn
              if (session?.error === 'RefreshAccessTokenError') {
                isRefreshing = false;
                console.error('[Token Refresh] Refresh token expired, need to login again');
                // SessionErrorHandler sẽ tự động redirect về login
                return Promise.reject(new Error('Session expired'));
              }

              if (session?.accessToken) {
                isRefreshing = false;
                onTokenRefreshed(session.accessToken);

                // Retry request với token mới
                originalRequest.headers.Authorization = `Bearer ${session.accessToken}`;
                return instance(originalRequest);
              } else {
                isRefreshing = false;
                return Promise.reject(new Error('No access token available'));
              }
            } catch (refreshError) {
              isRefreshing = false;
              console.error('[Token Refresh Error]', refreshError);
              return Promise.reject(refreshError);
            }
          }

          // Nếu đang refresh, đợi cho đến khi có token mới
          return new Promise((resolve) => {
            subscribeTokenRefresh((newToken: string) => {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              resolve(instance(originalRequest));
            });
          });
        }
      } else {
        console.error('[API Error]', error.message);
      }

      return Promise.reject(error);
    }
  );

  return instance;
}
