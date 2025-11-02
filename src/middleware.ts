// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Yêu cầu 4: Hàm middleware
export function middleware(request: NextRequest) {
  
  // Lấy giá trị của query param 'password' từ URL
  const password = request.nextUrl.searchParams.get('password');

  // Yêu cầu 5: Kiểm tra logic
  // Nếu password KHÔNG BẰNG '123456'
  if (password !== '123456') {
    
    // Tạo một URL mới trỏ về trang chủ (/)
    const homeUrl = new URL('/', request.url);
    
    // Trả về một phản hồi (Response) yêu cầu trình duyệt
    // chuyển hướng (redirect) về trang chủ
    return NextResponse.redirect(homeUrl);
  }

  // Yêu cầu 6: Nếu password ĐÚNG
  // Cho phép request đi tiếp đến trang /dashboard
  return NextResponse.next();
}

// Yêu cầu 3: Cấu hình Matcher
export const config = {
  // Middleware này sẽ CHỈ CHẠY cho các request
  // đến đường dẫn (pathname) là '/dashboard'
  matcher: '/dashboard',
};
