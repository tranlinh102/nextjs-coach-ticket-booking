"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

/**
 * Smart login hook that prefetches dashboard for better UX
 * Can be extended to redirect based on user context
 */
export function useSmartLogin() {
  const router = useRouter();

  const handleLogin = async () => {
    // Prefetch dashboard route for faster navigation
    router.prefetch("/dashboard");
    
    // Sign in with Keycloak
    // After signin, RoleBasedRedirect will handle staff redirect
    await signIn("keycloak");
  };

  return { handleLogin };
}
