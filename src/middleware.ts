import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;

    // Get user roles
    const roles = (token?.roles as string[]) || [];
    const isStaff = roles.includes("staff");

    // Only staff can access dashboard routes
    // If not staff, redirect to homepage
    if (!isStaff) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Staff can proceed
    return NextResponse.next();
  },
  {
    callbacks: {
      // Fast auth check - only verify token exists
      authorized: ({ token }) => !!token,
    },
  }
);

// Only apply middleware to dashboard routes for better performance
export const config = {
  matcher: ["/dashboard/:path*"],
};
