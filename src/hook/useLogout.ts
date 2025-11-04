"use client";

import { signOut } from "next-auth/react";

export function useLogout() {
  const handleSignOut = async () => {
    const keycloakIssuer = process.env.NEXT_PUBLIC_AUTH_KEYCLOAK_ISSUER;
    const keycloakClientId = process.env.NEXT_PUBLIC_AUTH_KEYCLOAK_ID;

    if (!keycloakIssuer || !keycloakClientId) {
      console.error("Missing Keycloak environment variables");
      return;
    }

    // 1. Build Keycloak logout URL
    const keycloakLogoutUrl = `${keycloakIssuer}/protocol/openid-connect/logout`;
    const params = new URLSearchParams({
      post_logout_redirect_uri: window.location.origin,
      client_id: keycloakClientId,
    });

    // 2. Sign out NextAuth first
    await signOut({ redirect: false });

    // 3. Redirect to Keycloak logout
    window.location.href = `${keycloakLogoutUrl}?${params.toString()}`;
  };

  return { handleSignOut };
}
