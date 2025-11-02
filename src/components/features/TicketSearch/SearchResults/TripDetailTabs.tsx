"use client";

import { useState } from "react";

type SeatStatus = "available" | "sold";
interface Seat {
  id: string;
  status: SeatStatus;
}

interface TripDetailTabsProps {
  isOpen: boolean;
  onClick: () => void;
}

const lowerCol1: Seat[] = [
  { id: "A01", status: "sold" },
  { id: "A03", status: "sold" },
  { id: "A06", status: "sold" },
  { id: "A09", status: "sold" },
  { id: "A12", status: "available" },
  { id: "A15", status: "available" },
];

const lowerCol2: Seat[] = [
  { id: "A04", status: "available" },
  { id: "A07", status: "sold" },
  { id: "A10", status: "sold" },
  { id: "A13", status: "available" }, 
  { id: "A16", status: "available" },
];

const lowerCol3: Seat[] = [
  { id: "A02", status: "sold" },
  { id: "A05", status: "sold" },
  { id: "A08", status: "sold" },
  { id: "A11", status: "sold" },
  { id: "A14", status: "sold" },
  { id: "A17", status: "available" },
];

const upperCol1: Seat[] = [
  { id: "B01", status: "available" },
  { id: "B03", status: "available" },
  { id: "B06", status: "available" },
  { id: "B09", status: "available" },
  { id: "B12", status: "available" },
  { id: "B15", status: "available" },
];

const upperCol2: Seat[] = [
  { id: "B04", status: "available" },
  { id: "B07", status: "available" },
  { id: "B10", status: "available" },
  { id: "B13", status: "available" },
  { id: "B16", status: "available" },
];

const upperCol3: Seat[] = [
  { id: "B02", status: "available" },
  { id: "B05", status: "available" },
  { id: "B08", status: "available" },
  { id: "B11", status: "available" },
  { id: "B14", status: "available" },
  { id: "B17", status: "available" },
];

const LegendItem = ({ colorClass, label }: { colorClass: string; label: string }) => (
  <div className="flex items-center gap-2">
    <div className={`w-5 h-5 rounded border ${colorClass}`}></div>
    <span className="text-sm text-gray-600">{label}</span>
  </div>
);

const tabs = [
  { id: "seat", label: "Chọn ghế" },
  { id: "schedule", label: "Lịch trình" },
  { id: "transfer", label: "Trung chuyển" },
  { id: "policy", label: "Chính sách" },
];

const SEAT_PRICE = 290000;

export default function TripDetailTabs(
  {
  isOpen,
  onClick,
  }: TripDetailTabsProps
) {
  const [activeTab, setActiveTab] = useState("");
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // Hàm xử lý chọn ghế
  const handleSelectSeat = (seatId: string, status: SeatStatus) => {
    // Không cho chọn ghế đã bán
    if (status === "sold") return;

    setSelectedSeats((prev) => {
      // Nếu ghế đã được chọn -> bỏ chọn
      if (prev.includes(seatId)) {
        return prev.filter((id) => id !== seatId);
      }
      // Nếu ghế chưa được chọn -> thêm vào
      else {
        return [...prev, seatId];
      }
    });
  };

  // Hàm tính tổng tiền
  const totalPrice = selectedSeats.length * SEAT_PRICE;

  return (
    <div className="w-full rounded-xl overflow-hidden bg-white">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              onClick();
            }}
            className={`cursor-pointer px-5 py-3 text-sm font-medium transition-all border-b-2 ${
              activeTab === tab.id && isOpen
                ? "border-[var(--brand-dark)] text-[var(--brand-dark)]"
                : "border-transparent text-gray-700 hover:text-[var(--brand-dark)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
        <button className="cursor-pointer ml-auto bg-[var(--brand-light)] text-[var(--brand-dark)] px-4 py-2 rounded-full m-2 hover:bg-[var(--brand-dark)] hover:text-white transition font-semibold">
          Chọn chuyến
        </button>
      </div>

      {isOpen && (
        <div>
          {(activeTab !== "") && (
            <div className="p-5 text-sm text-gray-700">
              {activeTab === "seat" && (
                <div>
                  {/* 1. Chú thích */}
                  <div className="flex flex-wrap justify-center gap-6 mb-6">
                    <LegendItem colorClass="bg-gray-200 border-gray-300" label="Đã bán" />
                    <LegendItem colorClass="bg-white border-blue-400" label="Còn trống" />
                    <LegendItem
                      colorClass="bg-orange-50 border-orange-400"
                      label="Đang chọn"
                    />
                  </div>
    
                  {/* 2. Bản đồ ghế */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-lg mx-auto">
                    {/* Tầng dưới */}
                    <div className="flex flex-col items-center">
                      <h4 className="font-semibold mb-3">Tầng dưới</h4>
                      <div className="flex gap-2">
                        {[lowerCol1, lowerCol2, lowerCol3].map((col, colIndex) => (
                          <div key={colIndex} className="flex flex-col gap-2">
                            {col.map((seat) => {
                              const isSelected = selectedSeats.includes(seat.id);
                              const isDisabled = seat.status === "sold";
                              
                              let seatClass = "bg-white border-blue-400 text-blue-500 hover:bg-blue-50"; // Available
                              if (isDisabled) {
                                seatClass = "bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed"; // Sold
                              }
                              if (isSelected) {
                                seatClass = "bg-orange-50 border-orange-400 text-orange-500"; // Selecting
                              }
    
                              return (
                                <button
                                  key={seat.id}
                                  onClick={() => handleSelectSeat(seat.id, seat.status)}
                                  disabled={isDisabled}
                                  className={`cursor-pointer w-12 h-8 text-xs rounded border flex items-center justify-center font-medium transition-colors ${seatClass}`}
                                >
                                  {seat.id}
                                </button>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
    
                    {/* Tầng trên */}
                    <div className="flex flex-col items-center">
                      <h4 className="font-semibold mb-3">Tầng trên</h4>
                      <div className="flex gap-2">
                        {[upperCol1, upperCol2, upperCol3].map((col, colIndex) => (
                          <div key={colIndex} className="flex flex-col gap-2">
                            {col.map((seat) => {
                              const isSelected = selectedSeats.includes(seat.id);
                              const isDisabled = seat.status === "sold";
                              
                              let seatClass = "bg-white border-blue-400 text-blue-500 hover:bg-blue-50"; // Available
                              if (isDisabled) {
                                seatClass = "bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed"; // Sold
                              }
                              if (isSelected) {
                                seatClass = "bg-orange-50 border-orange-400 text-orange-500"; // Selecting
                              }
                              
                              return (
                                <button
                                  key={seat.id}
                                  onClick={() => handleSelectSeat(seat.id, seat.status)}
                                  disabled={isDisabled}
                                  className={`cursor-pointer w-12 h-8 text-xs rounded border flex items-center justify-center font-medium transition-colors ${seatClass}`}
                                >
                                  {seat.id}
                                </button>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
    
                  {/* 3. Tổng tiền */}
                  <div className="flex justify-between items-center mt-6 pt-4 border-t">
                    <div>
                      <p className="font-semibold">{selectedSeats.length} Vé</p>
                      <p className="text-[var(--brand-dark)] font-bold">
                        {selectedSeats.join(", ")}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold">Tổng tiền</p>
                        <p className="text-xl font-bold text-[var(--brand-dark)]">
                          {totalPrice.toLocaleString("vi-VN")}đ
                        </p>
                      </div>
                      <button 
                        className="bg-[var(--brand)] text-white font-bold px-6 py-3 rounded-lg hover:bg-[var(--brand-dark)] transition"
                        disabled={selectedSeats.length === 0}
                      >
                        Chọn
                      </button>
                    </div>
                  </div>
                </div>
              )}
    
              {activeTab === "schedule" && (
                <div>
                  <h3 className="font-semibold mb-2">Lịch trình chuyến xe</h3>
                  <ul className="space-y-1 text-gray-600">
                    <li>00:00 — BX Miền Tây</li>
                    <li>23:00 — BX An Sương</li>
                    <li>23:45 — 205 Phạm Ngũ Lão</li>
                  </ul>
                </div>
              )}
    
              {activeTab === "transfer" && (
                <div>
                  <h3 className="font-semibold mb-2">Đón / trả tận nơi</h3>
                  <ul className="list-disc list-inside">
                    <li>Thời gian nhận khách: Trước 4 tiếng.</li>
                    <li>Chuẩn bị trước 2–3 tiếng.</li>
                    <li>Xe trung chuyển sẽ đón khách đầu hẻm / đầu đường.</li>
                  </ul>
                </div>
              )}
    
              {activeTab === "policy" && (
                <div>
                  <h3 className="font-semibold mb-2">Yêu cầu khi lên xe</h3>
                  <ul className="list-disc list-inside">
                    <li>Có mặt trước 30 phút để làm thủ tục lên xe.</li>
                    <li>Không mang thức ăn, đồ uống có mùi lên xe.</li>
                    <li>Không hút thuốc hoặc sử dụng chất kích thích.</li>
                  </ul>
                </div>
              )}
            </div>
          )}
    
          {(activeTab === "") && (
            <div></div>
          )}
        </div>
      )}
    </div>
  );
}