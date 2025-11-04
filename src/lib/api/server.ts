import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createAxiosApi } from './factory';
import { AxiosInstance } from 'axios';

/**
 * Lấy axios instance cho server-side (API Routes, Server Components)
 * Tự động lấy token từ server session
 * 
 * @returns Promise<AxiosInstance>
 */
export async function getServerAxios(): Promise<AxiosInstance> {
  const session = await getServerSession(authOptions);
  return createAxiosApi(session?.accessToken);
}
