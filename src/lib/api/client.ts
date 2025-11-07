import { getSession } from 'next-auth/react';
import { createAxiosApi } from './factory';
import { AxiosInstance } from 'axios';

/**
 * Lấy axios instance cho client-side (Browser)
 * Tự động lấy token từ client session
 * Tự động refresh token khi hết hạn
 * 
 * @returns Promise<AxiosInstance>
 */
export async function getClientAxios(): Promise<AxiosInstance> {
  const session = await getSession();
  // Bật auto-refresh token cho client-side
  return createAxiosApi(session?.accessToken, true);
}
