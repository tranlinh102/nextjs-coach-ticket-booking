// middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Hàm middleware chạy cho các request phù hợp với config.matcher.
 * Tham số `request` chứa URL, headers, cookies, v.v.
 */
export function middleware(request: NextRequest) {
  // Lấy query param 'password' từ URL, ví dụ /dashboard?password=123456
  const password = request.nextUrl.searchParams.get("password");

  // Nếu password khác "123456" -> redirect về trang chủ "/"
  if (password !== "123456") {
    // new URL("/", request.url) tạo URL đích dựa trên origin hiện tại
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Nếu password bằng "123456" -> cho phép request tiếp tục tới /dashboard
  return NextResponse.next();
}

/**
 * config.matcher: chỉ áp dụng middleware cho đường dẫn /dashboard
 * Có thể đặt thành array hoặc biểu thức để mở rộng phạm vi.
 */
export const config = {
  matcher: "/dashboard",
};
