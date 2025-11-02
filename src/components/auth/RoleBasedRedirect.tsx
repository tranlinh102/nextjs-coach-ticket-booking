"use client";

import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Component to handle role-based redirect after login
 * Place this in the root layout or pages where users land after login
 */
export default function RoleBasedRedirect() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasRedirected = useRef(false);

  useEffect(() => {
    // Only redirect once and when authenticated
    if (status !== "authenticated" || hasRedirected.current) return;
    if (!session?.user?.roles || session.user.roles.length === 0) return;

    const roles = session.user.roles;
    const callbackUrl = searchParams?.get("callbackUrl");

    // If there's a specific callback URL, use it
    if (callbackUrl && callbackUrl !== "/") {
      hasRedirected.current = true;
      router.push(callbackUrl);
      return;
    }

    // Role-based redirect
    if (roles.includes("staff")) {
      hasRedirected.current = true;
      router.push("/dashboard");
    }
    // Customer stays on current page (usually homepage)
    // No redirect needed for customers
  }, [session, status, router, searchParams]);

  return null;
}
