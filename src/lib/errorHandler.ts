import { ApiErrorResponse } from '@/type/api';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

export function handleApiError(error: AxiosError) {
  const status = error.response?.status;
  const data = error.response?.data as ApiErrorResponse | undefined;
  const message = data?.message || error.message || 'Đã xảy ra lỗi không xác định';

  switch (status) {
    case 400:
      toast.error(`${message}`);
      break;
    case 401:
      toast.error('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
      if (typeof window !== 'undefined') {
        setTimeout(() => (window.location.href = '/login'), 1500);
      }
      break;
    case 403:
      toast.warning('Bạn không có quyền truy cập.');
      break;
    case 404:
      toast.error('Không tìm thấy tài nguyên yêu cầu.');
      break;
    case 500:
      toast.error('Lỗi máy chủ. Vui lòng thử lại sau.');
      break;
    default:
      toast.error(`Lỗi: ${message}`);
  }

  if (process.env.NODE_ENV === 'development') {
    console.error('[API ERROR DETAILS]', {
      url: error.config?.url,
      method: error.config?.method,
      data: error.response?.data,
      status,
    });
  }
}
