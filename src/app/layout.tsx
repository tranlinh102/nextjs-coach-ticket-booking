import type { Metadata } from "next";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import SessionProvider from "@/components/SessionProvider";
import { Toaster } from "sonner";

export const experimental_ppr = true;

export const metadata: Metadata = {
  title: "Đặt vé xe khách và xe Limousine",
  description: "",
  icons: {
    icon: "/favicon.svg",
  },
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter", 
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={inter.variable}>
      <body className="bg-gray-50 text-gray-900">
        <SessionProvider>
          {children}
          <Toaster richColors position="top-right" />
        </SessionProvider>
      </body>
    </html>
  );
}
