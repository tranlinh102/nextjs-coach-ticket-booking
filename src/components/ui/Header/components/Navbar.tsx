"use client";

import { HelpIcon, UserIcon, ChevronDownIcon } from "@/components/ui/Icon";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { isStaff } from "@/lib/roles";

export default function NavBar() {
  const [accountOpen, setAccountOpen] = useState(false);
  const { data: session, status } = useSession();
  const userIsStaff = session ? isStaff(session) : false;

  const handleSignOut = async () => {
    // Build Keycloak logout URL
    const keycloakLogoutUrl = `${process.env.NEXT_PUBLIC_AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/logout`;
    const params = new URLSearchParams({
      post_logout_redirect_uri: window.location.origin,
      client_id: process.env.NEXT_PUBLIC_AUTH_KEYCLOAK_ID || "",
    });

    // Sign out from NextAuth first
    await signOut({ redirect: false });

    // Then redirect to Keycloak logout
    window.location.href = `${keycloakLogoutUrl}?${params.toString()}`;
  };

  return (
    <nav className="flex items-center gap-8 text-sm font-medium text-gray-700">
      <a
        href="#"
        className="px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200"
      >
        Vé xe khách
      </a>

      <a href="#" className="px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center gap-1">
        <HelpIcon />
        Hỗ trợ
      </a>

      <div
        className="relative"
        onMouseEnter={() => setAccountOpen(true)}
        onMouseLeave={() => setAccountOpen(false)}
      >
        <button className="flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200">
          <UserIcon />
          {status === "loading" ? "..." : session?.user?.name || "Tài khoản"}
          <ChevronDownIcon />
        </button>

        {accountOpen && (
          <div className="absolute right-0 bg-white shadow-md rounded-lg py-2 w-48 text-sm text-gray-700 z-50">
            {status === "authenticated" ? (
              <>
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="font-semibold text-gray-900">{session?.user?.name}</p>
                  <p className="text-xs text-gray-500">{session?.user?.email}</p>
                </div>
                {userIsStaff && (
                  <a href="/dashboard" className="block px-4 py-2 hover:bg-gray-100">
                    Dashboard
                  </a>
                )}
                <button 
                  onClick={handleSignOut} 
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <button 
                onClick={() => signIn("keycloak")} 
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Đăng nhập / Đăng ký
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
