"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Component to handle role-based redirect after login
 * Only redirects staff from homepage to dashboard immediately
 * Uses synchronous redirect for instant navigation
 */
export default function RoleBasedRedirect() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Only process when authenticated
    if (status !== "authenticated") return;
    
    // Only redirect from homepage
    if (pathname !== "/") return;
    
    const roles = session?.user?.roles;
    if (!roles || roles.length === 0) return;

    // Staff should go to dashboard immediately
    // Use replace to avoid back button showing homepage
    if (roles.includes("staff")) {
      router.replace("/dashboard");
    }
    // Customer stays on homepage - no action needed
  }, [session, status, router, pathname]);

  // Return null - this component doesn't render anything
  return null;
}
