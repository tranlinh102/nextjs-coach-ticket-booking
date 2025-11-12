"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import { vi } from "date-fns/locale/vi";

import "react-datepicker/dist/react-datepicker.css";
import LocationPicker from "./LocationPicker";
import { SwapIcon } from "@/components/ui/Icon";
import { formatDate } from "@/lib/utils";
import { useLocations } from "@/components/LocationProvider";
import { Province } from "@/type/province";
import { useRouter } from "next/navigation";

export default function SearchTicketForm() {
  const [from, setFrom] = useState<Province | null>(null);
  const [to, setTo] = useState<Province | null>(null);
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [tickets, setTickets] = useState(1);

  const router = useRouter();
  const provinces = useLocations();

  const provincesForFrom = provinces.filter(
    p => !to || parseInt(p.code) !== parseInt(to.code)
  );

  const provincesForTo = provinces.filter(
    p => !from || parseInt(p.code) !== parseInt(from.code)
  );
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedDepartureDate = departureDate ? formatDate(departureDate) : "";

    const query = new URLSearchParams({
      departureDate: "2025-11-06", // Thay thế bằng formattedDepartureDate khi backend hỗ trợ
      startProvinceId: from?.id || "",
      endProvinceId: to?.id || "",
      requiredSeats: tickets.toString(),
    }).toString();

    router.push(`/search?${query}`);
  };

  const handleSwap = () => {
    const tempFrom = from;
    setFrom(to);
    setTo(tempFrom);
  };

  return (
    <section className="container max-w-7xl mx-auto px-6 text-left py-5 mb-0">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-[var(--brand)] bg-white p-6 shadow-sm"
        style={{ outline: "8px solid rgba(127,216,88,.1)" }}
        noValidate
      >
        <div
          className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4`}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto_1fr] sm:col-span-2 items-end">
            <LocationPicker label="Điểm đi" value={from} onSelect={setFrom} list={provincesForFrom} />

            <div className="flex items-center justify-center">
              <button
                type="button"
                onClick={handleSwap}
                className="
                  p-2 rounded-full border border-gray-300 bg-white
                  hover:bg-gray-100 transition shadow-sm
                  rotate-90 sm:rotate-0 {/* Xoay icon trên mobile */}
                "
                aria-label="Đảo ngược điểm đi và điểm đến"
              >
                <SwapIcon />
              </button>
            </div>

            <LocationPicker label="Điểm đến" value={to} onSelect={setTo} list={provincesForTo} />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Ngày đi
            </label>
            <DatePicker
              selected={departureDate}
              onChange={(date) => setDepartureDate(date)}
              dateFormat="dd/MM/yyyy"
              locale={vi}
              placeholderText="Chọn ngày"
              minDate={new Date()}
              className="w-full rounded-lg border border-gray-300 p-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Số vé
            </label>
            <input
              type="number"
              min={1}                    
              value={tickets}
              onChange={(e) => setTickets(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Nhập số vé"
            />
          </div>

        </div>

        <div className="mt-6 text-center">
          <button
            type="submit"
            className="cursor-pointer rounded-2xl bg-[var(--brand)] px-8 py-2 text-white hover:bg-[var(--brand-dark)] font-bold transition"
          >
            Tìm chuyến xe
          </button>
        </div>
      </form>
    </section>
  );
}