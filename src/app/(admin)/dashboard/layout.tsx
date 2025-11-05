import SideNav from "@/components/features/Admin/Dashboard/sidenav";
import SessionErrorHandler from "@/components/auth/SessionErrorHandler";
import type { Metadata } from "next";

export const experimental_ppr = true;

export const metadata: Metadata = {
  title: "Admin Dashboard - Đặt vé xe khách và xe Limousine",
  description: "",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <SessionErrorHandler />
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex flex-grow flex-col p-6 md:p-12">{children}</div>
    </div>
  );
}
