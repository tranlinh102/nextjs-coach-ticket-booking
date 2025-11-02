import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard - Đặt vé xe khách và xe Limousine",
  description: "",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        {children}
      </div>
    </div>
  );
}
