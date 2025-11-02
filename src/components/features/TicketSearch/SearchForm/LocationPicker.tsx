"use client";

import { useState, useRef, useEffect } from "react";

const allLocations = [
  "Bình Thuận",
  "Cà Mau",
  "Cao Bằng",
  "Cần Thơ",
  "Đà Nẵng",
  "Đắk Lắk",
  "Hà Nội",
  "Hải Phòng",
  "Nha Trang",
  "TP. Hồ Chí Minh",
  "Đà Lạt",
  "Vũng Tàu",
];

export default function LocationPicker({
  label,
  value,
  onSelect,
}: {
  label: string;
  value: string;
  onSelect: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const pickerRef = useRef<HTMLDivElement>(null); // Ref cho toàn bộ component

  // Lọc danh sách địa điểm dựa trên tìm kiếm
  const filteredLocations = allLocations.filter((loc) =>
    loc.toLowerCase().includes(search.toLowerCase())
  );

  // Xử lý khi bấm ra ngoài component thì sẽ đóng modal
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearch(""); // Reset tìm kiếm khi đóng
      }
    }
    // Thêm event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Dọn dẹp event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [pickerRef]);

  // Xử lý khi chọn một địa điểm
  const handleSelectLocation = (location: string) => {
    onSelect(location);
    setIsOpen(false);
    setSearch(""); // Reset tìm kiếm
  };

  return (
    // Dùng relative để modal con định vị absolute theo component này
    <div className="relative" ref={pickerRef}>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </label>
      {/* Ô input này chỉ dùng để hiển thị giá trị và kích hoạt modal.
        Dùng onFocus để mở modal, và readOnly để ngăn người dùng gõ trực tiếp.
      */}
      <input
        type="text"
        value={value}
        onFocus={() => setIsOpen(true)}
        readOnly
        className="w-full rounded-lg border border-gray-300 p-2 cursor-pointer"
        placeholder={`Chọn ${label.toLowerCase()}`}
      />

      {/* --- BẮT ĐẦU: Modal chọn địa điểm --- */}
      {isOpen && (
        <div
          className="absolute top-full left-0 z-10 mt-2 w-80 max-w-sm
                     rounded-lg border border-gray-200 bg-white p-4 shadow-lg"
        >
          {/* Ô tìm kiếm bên trong modal */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Chọn điểm đi"
            className="w-full rounded-lg border border-gray-300 p-2 mb-3"
            autoFocus // Tự động focus vào ô tìm kiếm khi modal mở
          />

          {/* Tiêu đề */}
          <p className="text-sm font-semibold text-gray-500 mb-2">
            TỈNH/THÀNH PHỐ
          </p>

          {/* Danh sách địa điểm */}
          <ul className="max-h-60 overflow-y-auto">
            {filteredLocations.length > 0 ? (
              filteredLocations.map((loc) => (
                <li key={loc}>
                  <button
                    type="button" // Quan trọng: để không submit form
                    className="w-full rounded-md p-2 text-left text-gray-700 hover:bg-gray-100"
                    onClick={() => handleSelectLocation(loc)}
                  >
                    {loc}
                  </button>
                </li>
              ))
            ) : (
              <li className="p-2 text-sm text-gray-500">
                Không tìm thấy địa điểm.
              </li>
            )}
          </ul>
        </div>
      )}
      {/* --- KẾT THÚC: Modal chọn địa điểm --- */}
    </div>
  );
}