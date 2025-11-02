"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import { vi } from "date-fns/locale";

import "react-datepicker/dist/react-datepicker.css";
import LocationPicker from "./LocationPicker";
import { SwapIcon } from "@/components/ui/Icon";

// import { formatDate } from "@/libs/date";

export default function SearchTicketForm() {
  const [tripType, setTripType] = useState<"oneway" | "roundtrip">("oneway");
  const [from, setFrom] = useState("TP. Hồ Chí Minh");
  const [to, setTo] = useState("Đà Lạt");
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [tickets, setTickets] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // const formattedDepartureDate = departureDate ? formatDate(departureDate) : "";
    // alert(`${formattedDepartureDate}`);

    // const formattedReturnDate = returnDate ? formatDate(returnDate) : "";
    // alert(`${formattedReturnDate}`);

    // alert(`Tìm chuyến xe từ ${from} đến ${to} (${departureDate?.toLocaleDateString()}), số vé: ${tickets}`);
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
        {/* <div className="mb-4 flex items-center gap-6">
          <label className="flex cursor-pointer items-center space-x-2">
            <input
              type="radio"
              name="tripType"
              value="oneway"
              checked={tripType === "oneway"}
              onChange={() => setTripType("oneway")}
              className="peer sr-only"
            />
            <div
              className="
                flex h-5 w-5 items-center justify-center rounded-full border-2 
                border-gray-400 text-transparent 
                peer-checked:border-[var(--brand)] peer-checked:text-[var(--brand)]
              "
            >
              <div className="h-2.5 w-2.5 rounded-full bg-current"></div>
            </div>
            <span className="text-gray-700 peer-checked:text-[var(--brand)]">
              Một chiều
            </span>
          </label>
          <label className="flex cursor-pointer items-center space-x-2">
            <input
              type="radio"
              name="tripType"
              value="roundtrip"
              checked={tripType === "roundtrip"}
              onChange={() => setTripType("roundtrip")}
              className="peer sr-only"
            />
            <div
              className="
                flex h-5 w-5 items-center justify-center rounded-full border-2 
                border-gray-400 text-transparent 
                peer-checked:border-[var(--brand)] peer-checked:text-[var(--brand)]
              "
            >
              <div className="h-2.5 w-2.5 rounded-full bg-current"></div>
            </div>
            <span className="text-gray-700 peer-checked:text-[var(--brand)]">
              Khứ hồi
            </span>
          </label>
          <a
            href="#"
            className="ml-auto text-sm text-[var(--brand)] hover:underline"
          >
            Hướng dẫn mua vé
          </a>
        </div> */}

        <div
          className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${
            tripType === "roundtrip" ? "lg:grid-cols-5" : "lg:grid-cols-4"
          }`}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto_1fr] sm:col-span-2 items-end">
            <LocationPicker label="Điểm đi" value={from} onSelect={setFrom} />


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

            <LocationPicker label="Điểm đến" value={to} onSelect={setTo} />
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

          {tripType === "roundtrip" && (
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Ngày về
              </label>
              <DatePicker
                selected={returnDate}
                onChange={(date) => setReturnDate(date)}
                dateFormat="dd/MM/yyyy"
                locale={vi}
                placeholderText="Chọn ngày"
                minDate={new Date()}
                className="w-full rounded-lg border border-gray-300 p-2"
              />
            </div>
          )}

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