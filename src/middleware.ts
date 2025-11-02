import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Get user roles
    const roles = (token?.roles as string[]) || [];
    const isStaff = roles.includes("staff");

    // If accessing dashboard routes
    if (path.startsWith("/dashboard")) {
      // Only staff can access dashboard
      if (!isStaff) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    // Allow access
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*"],
};
