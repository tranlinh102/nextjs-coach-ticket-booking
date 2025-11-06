import type { Metadata } from "next";
import { Suspense } from "react";

import "@/styles/globals.css";

import Header from "@/components/ui/Header/Header";
// import FloatingButtons from "@/components/ui/FloatingButtons";
import Footer from "@/components/ui/Footer";

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
      <Header />
      <main className="container mx-auto pt-24">{children}</main>
      <Footer />
    </>
  );
}
