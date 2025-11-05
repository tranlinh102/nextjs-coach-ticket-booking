import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { ApiResponse } from '@/type/api';

/**
 * Xử lý lỗi từ API và hiển thị toast
 */
export function handleApiError(error: unknown): ApiResponse {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const data = error.response?.data;
    const message = data?.message || error.message || 'Đã xảy ra lỗi không xác định';

    // Trả về ApiResponse format
    return {
      success: false,
      message,
      errors: data?.errors,
      statusCode: status,
    };
  }

  // Lỗi không phải từ axios
  return {
    success: false,
    message: 'Có lỗi xảy ra',
    statusCode: 500,
  };
}

/**
 * Wrap axios response thành ApiResponse format
 */
export function wrapResponse<T>(data: T, message?: string): ApiResponse<T> {
  return {
    success: true,
    data,
    message,
    statusCode: 200,
  };
}

/**
 * Toast helper - tự động hiển thị toast dựa trên ApiResponse
 */
export const showToast = {
  success: (message: string) => {
    toast.success(message);
  },

  error: (message: string) => {
    toast.error(message);
  },

  warning: (message: string) => {
    toast.warning(message);
  },

  info: (message: string) => {
    toast.info(message);
  },

  // Tự động show toast dựa trên response
  fromResponse: <T>(response: ApiResponse<T>, defaultSuccessMsg?: string) => {
    if (response.success) {
      toast.success(response.message || defaultSuccessMsg || 'Thành công');
    } else {
      // Hiển thị lỗi validation nếu có
      if (response.errors) {
        const errorMessages = Object.values(response.errors).flat();
        errorMessages.forEach((msg) => toast.error(msg));
      } else {
        toast.error(response.message || 'Có lỗi xảy ra');
      }
    }
    return response;
  },
};
