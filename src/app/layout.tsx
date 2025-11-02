import "@/styles/globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Todo",
  description: "Mini project",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <body className="bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
