import type { Metadata } from "next";
import { Suspense } from "react";

import "@/styles/globals.css";

import Header from "@/components/ui/Header/Header";
// import FloatingButtons from "@/components/ui/FloatingButtons";
import Footer from "@/components/ui/Footer";
import RoleBasedRedirect from "@/components/auth/RoleBasedRedirect";

export const metadata: Metadata = {
  title: "Đặt vé xe khách và xe Limousine",
  description: "",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={null}>
        <RoleBasedRedirect />
      </Suspense>
      <Header />
      <main className="container mx-auto pt-24">{children}</main>
      {/* <FloatingButtons /> */}
      <Footer />
    </>
  );
}
