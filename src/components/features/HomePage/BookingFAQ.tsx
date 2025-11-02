'use client';

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqData = {
  "Tổng quan": [
    { question: "Làm thế nào để đặt vé xe trực tuyến tại Việt Nam?", answer: "Bạn có thể truy cập trang chủ, chọn điểm đi - điểm đến và thanh toán an toàn qua thẻ hoặc ví điện tử." },
    { question: "Các tuyến xe phổ biến ở Việt Nam là gì?", answer: "Các tuyến phổ biến gồm Hà Nội - Sapa, TP.HCM - Đà Lạt, Đà Nẵng - Huế, và nhiều tuyến khác." },
    { question: "Bạn nên ghé thăm những địa điểm du lịch nào ở Việt Nam?", answer: "Một số điểm nổi bật gồm Hội An, Hạ Long, Phú Quốc, Đà Lạt, và Ninh Bình." },
    { question: "Có dịch vụ xe khách kết nối các thành phố lớn và điểm du lịch không?", answer: "Có, LongDistanceBuses cung cấp mạng lưới xe khách liên tỉnh phủ rộng toàn quốc." },
    { question: "Giá vé xe khách thông thường ở Việt Nam là bao nhiêu?", answer: "Giá dao động từ 100.000đ đến 500.000đ tùy tuyến và loại xe." },
  ],
  "Đặt chỗ": [
    { question: "Làm sao để hủy hoặc thay đổi chỗ ngồi?", answer: "Bạn có thể vào mục ‘Đặt chỗ của tôi’ và chọn ‘Thay đổi hoặc hủy vé’." },
  ],
  "Thanh Toán": [
    { question: "Có những phương thức thanh toán nào?", answer: "Chúng tôi hỗ trợ thẻ quốc tế, thẻ nội địa, ví điện tử và QR code." },
  ],
  "Hủy Vé & Hoàn tiền": [
    { question: "Bao lâu thì tôi nhận được tiền hoàn?", answer: "Thông thường trong vòng 5–7 ngày làm việc tùy phương thức thanh toán." },
  ],
  "Giảm giá & Khuyến mại": [
    { question: "Làm thế nào để áp dụng mã giảm giá?", answer: "Nhập mã ở bước thanh toán để được giảm trực tiếp trên tổng tiền." },
  ],
} as const;

type TabKey = keyof typeof faqData;

export default function BookingFAQ() {
  const tabs = Object.keys(faqData) as TabKey[];
  const [activeTab, setActiveTab] = useState<TabKey>(tabs[0]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 uppercase">
        Câu hỏi thường gặp
      </h2>

      {/* Tabs */}
      <div className="flex flex-wrap border-b mb-8 text-gray-600">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setOpenIndex(null);
            }}
            className={`px-6 py-2 border-b-2 transition-colors ${
              activeTab === tab
                ? "border-red-500 text-red-600 font-medium"
                : "border-transparent hover:text-black"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
      {(faqData[activeTab] ?? []).map((faq, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-xl overflow-hidden shadow-sm"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex justify-between items-center text-left px-6 py-4 font-medium"
          >
            {faq.question}
            {openIndex === index ? (
              <Minus className="w-5 h-5 text-gray-500" />
            ) : (
              <Plus className="w-5 h-5 text-gray-500" />
            )}
          </button>

          {openIndex === index && (
            <div className="px-6 py-4 text-gray-600 border-t">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
      </div>
    </section>
  );
}
