import type { Metadata } from "next";
import "@/styles/globals.css";
// Removed `next/font/google` to avoid server-side download warnings
import SessionProvider from "@/components/SessionProvider";
import SessionErrorHandler from "@/components/auth/SessionErrorHandler";
import { Toaster } from "sonner";

export const experimental_ppr = true;

export const metadata: Metadata = {
  title: "Đặt vé xe khách và xe Limousine",
  description: "",
  icons: {
    icon: "/favicon.svg",
  },
};

// Use system fonts instead of downloading from Google at build/runtime

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="antialiased">
      <body className="bg-gray-50 text-gray-900">
        <SessionProvider>
          <SessionErrorHandler />
          {children}
          <Toaster richColors position="top-right" />
        </SessionProvider>
      </body>
    </html>
  );
}
