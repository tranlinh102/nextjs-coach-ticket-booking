"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function SignInButton() {
  const searchParams = useSearchParams();
  const error = searchParams?.get("error");

  useEffect(() => {
    if (error) {
      console.error("Authentication error:", error);
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Đăng nhập vào hệ thống
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Đặt vé xe khách và xe Limousine
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error === "OAuthAccountNotLinked" 
              ? "Email đã được sử dụng với phương thức đăng nhập khác"
              : "Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại."}
          </div>
        )}

        <button
          onClick={() => signIn("keycloak", { callbackUrl: "/dashboard" })}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Đăng nhập với Keycloak
        </button>

        <div className="text-center text-sm text-gray-600">
          Bằng cách đăng nhập, bạn đồng ý với{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Điều khoản dịch vụ
          </a>{" "}
          và{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Chính sách bảo mật
          </a>
        </div>
      </div>
    </div>
  );
}
