import { AxiosInstance } from 'axios';
import { getServerAxios } from './server';
import { getClientAxios } from './client';

/**
 * Context type cho axios
 * - 'server': Force dùng getServerAxios (API Routes, Server Components)
 * - 'client': Force dùng getClientAxios (Browser)
 * - 'auto': Tự động detect môi trường (mặc định)
 */
export type AxiosContext = 'server' | 'client' | 'auto';

/**
 * Lấy axios instance dựa trên context
 * 
 * Auto-detect logic:
 * - Nếu typeof window !== 'undefined' → Browser → 'client'
 * - Nếu typeof window === 'undefined' → Node.js → 'server'
 * 
 * @param context - 'server', 'client', hoặc 'auto' (mặc định)
 * @returns Promise<AxiosInstance>
 * 
 * @example
 * // Auto-detect (recommended)
 * const axios = await getAxiosByContext();
 * 
 * // Force server
 * const axios = await getAxiosByContext('server');
 * 
 * // Force client
 * const axios = await getAxiosByContext('client');
 */
export async function getAxiosByContext(
  context: AxiosContext = 'auto'
): Promise<AxiosInstance> {
  // Auto-detect: Nếu có window = client, không có = server
  if (context === 'auto') {
    context = typeof window !== 'undefined' ? 'client' : 'server';
  }

  return context === 'server' ? await getServerAxios() : await getClientAxios();
}
