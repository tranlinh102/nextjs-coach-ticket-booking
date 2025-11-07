'use client';

import { useSession, signOut } from 'next-auth/react';
import { useEffect, useRef } from 'react';
import { showToast } from '@/lib/api-helpers';

/**
 * Component xử lý lỗi session (refresh token hết hạn)
 * Tự động logout và redirect về trang login khi refresh token không còn valid
 */
export default function SessionErrorHandler() {
  const { data: session, status } = useSession();
  const hasHandledError = useRef(false);

  useEffect(() => {
    // Chỉ xử lý khi đã authenticated
    if (status !== 'authenticated') return;

    // Kiểm tra nếu refresh token failed và chưa xử lý
    if (session?.error === 'RefreshAccessTokenError' && !hasHandledError.current) {
      hasHandledError.current = true;
      
      showToast.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
      
      // SignOut để clear session, sau đó redirect về login
      setTimeout(async () => {
        await signOut({ 
          redirect: true,
          callbackUrl: '/' 
        });
      }, 1500);
    }
  }, [session?.error, status]);

  return null;
}
