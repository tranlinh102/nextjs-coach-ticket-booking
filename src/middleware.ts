import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;

    // Get user roles
    const rawRoles = token?.roles;
    const roles = Array.isArray(rawRoles) ? 
                  rawRoles : typeof rawRoles === 'string' ? [rawRoles]
                  : [];
    const isStaff = roles.includes('staff');

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
      // Redirect to signin page if not authenticated
      authorized: ({ token }) => {
        // If no token, will automatically redirect to signin with Keycloak
        return !!token;
      },
    },
  }
);

// Only apply middleware to dashboard routes for better performance
export const config = {
  matcher: ["/dashboard/:path*"],
};
