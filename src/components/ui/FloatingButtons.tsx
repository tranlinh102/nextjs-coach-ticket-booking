"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);

  // Hiện nút scroll-top khi cuộn xuống
  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cuộn lên đầu trang
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col items-center gap-3">
      {/* Messenger */}
      <a
        href=""
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition"
      >
        <img src="/images/messenger.svg" alt="Messenger" className="w-6 h-6" />
      </a>

      {/* Zalo */}
      <a
        href="https://zalo.me/yourzalo"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-[#2196F3] flex items-center justify-center shadow-md hover:scale-110 transition"
      >
        <img src="/images/zalo.svg" alt="Zalo" className="w-6 h-6" />
      </a>

      {/* Phone */}
      <a
        href="tel:0123456789"
        className="w-12 h-12 rounded-full bg-[#f44336] flex items-center justify-center shadow-md hover:scale-110 transition"
      >
        <img src="/images/phone.png" alt="Phone" className="w-6 h-6" />
      </a>

      {/* Scroll to top */}
      {showTop && (
        <button
          onClick={scrollToTop}
          className="cursor-pointer w-12 h-12 rounded-full bg-gray-700 text-white flex items-center justify-center shadow-lg hover:bg-gray-800 transition"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}
