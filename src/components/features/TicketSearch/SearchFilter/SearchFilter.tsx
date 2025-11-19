"use client"; 

import { useState, useEffect } from "react";
import { TrashIcon } from "@/components/ui/Icon"; 
import SortButton from "./components/SortButton";
import SortItem from "./components/SortItem";
import { TripResponse } from "@/type";

const timeOptions = [
  "Sáng sớm 00:00 - 06:00",
  "Buổi sáng 06:00 - 12:00",
  "Buổi chiều 12:00 - 18:00",
  "Buổi tối 18:00 - 24:00",
];
const carTypes = ["Ghế", "Giường", "Limousine"];
const seatRows = ["Hàng đầu", "Hàng giữa", "Hàng cuối"];
const floors = ["Tầng trên", "Tầng dưới"];

export default function SearchFilter({
  initialTrips = [],
  onFilter,
}: {
  initialTrips?: TripResponse[];
  onFilter?: (trips: TripResponse[]) => void;
}) {
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [selectedCarTypes, setSelectedCarTypes] = useState<string[]>([]);
  const [selectedSeatRows, setSelectedSeatRows] = useState<string[]>([]);
  const [selectedFloors, setSelectedFloors] = useState<string[]>([]);

  useEffect(() => {
    // Compute filtered trips whenever any filter changes
    let result = initialTrips.slice();

    // If no filters selected, return the full initial list immediately
    const hasAnyFilter =
      selectedTimes.length > 0 ||
      selectedCarTypes.length > 0 ||
      selectedSeatRows.length > 0 ||
      selectedFloors.length > 0;

    if (!hasAnyFilter) {
      if (onFilter) onFilter(result);
      return;
    }

    // Time filtering: map label to hour ranges
    if (selectedTimes.length > 0) {
      const timeRanges = selectedTimes.map((label) => {
        if (label.includes("00:00") && label.includes("06:00")) return [0, 6];
        if (label.includes("06:00") && label.includes("12:00")) return [6, 12];
        if (label.includes("12:00") && label.includes("18:00")) return [12, 18];
        if (label.includes("18:00") && label.includes("24:00")) return [18, 24];
        return [0, 24];
      });

      result = result.filter((trip) => {
        const date = new Date(trip.scheduledDepartureTime);
        const hour = date.getHours();
        return timeRanges.some(([start, end]) => {
          // treat end=24 as inclusive of hours >= start
          if (end === 24) return hour >= start && hour < 24;
          return hour >= start && hour < end;
        });
      });
    }

    // Vehicle type / car types
    if (selectedCarTypes.length > 0) {
      result = result.filter((trip) =>
        selectedCarTypes.some((t) =>
          trip.vehicleType?.toLowerCase().includes(t.toLowerCase())
        )
      );
    }

    // Note: seatRows and floors are not part of TripResponse; no-op for now

    if (onFilter) onFilter(result);
  }, [selectedTimes, selectedCarTypes, selectedSeatRows, selectedFloors, initialTrips, onFilter]);

  const handleTimeChange = (label: string) => {
    setSelectedTimes((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label) 
        : [...prev, label] 
    );
  };

  const handleCarTypeChange = (type: string) => {
    setSelectedCarTypes((prev) =>
      prev.includes(type)
        ? prev.filter((item) => item !== type) 
        : [...prev, type] 
    );
  };
  const handleSeatRowChange = (row: string) => {
    setSelectedSeatRows((prev) =>
      prev.includes(row)
        ? prev.filter((item) => item !== row) 
        : [...prev, row] 
    );
  };
  const handleFloorChange = (floor: string) => {
    setSelectedFloors((prev) =>
      prev.includes(floor)
        ? prev.filter((item) => item !== floor) 
        : [...prev, floor] 
    );
  };

  const handleClearFilters = () => {
    setSelectedTimes([]);
    setSelectedCarTypes([]);
    setSelectedSeatRows([]);
    setSelectedFloors([]);
    if (onFilter) onFilter(initialTrips.slice());
  };

  return (
    <div className="sticky top-4 self-start">
      <aside className="bg-white rounded-xl card-box-shadown p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-800">BỘ LỌC TÌM KIẾM</h3>
          <button
            onClick={handleClearFilters} 
            className={`cursor-pointer text-[var(--brand)] text-sm font-bold flex items-center gap-1`}
          >
            Bỏ lọc
            <TrashIcon />
          </button>
        </div>

        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-medium mb-2 text-gray-800">Giờ đi</h4>
            <div className="space-y-1">
              {timeOptions.map((label, i) => (
                <SortItem 
                key={i}
                label={label} 
                isSelected={selectedTimes.includes(label)} 
                onChange={() => handleTimeChange(label)} 
                />
              ))}
            </div>
          </div>

          <hr />

          <div>
            <h4 className="font-medium mb-2 text-gray-800">Loại xe</h4>
            <div className="flex flex-wrap gap-2">
              {carTypes.map((type) => {
                return (
                  <SortButton
                    key={type}
                    onClick={() => handleCarTypeChange(type)}
                    text={type}
                    isSelected={selectedCarTypes.includes(type)}
                  />
                );
              })}
            </div>
          </div>

          <hr />

          <div>
            <h4 className="font-medium mb-2 text-gray-800">Hàng ghế</h4>
            <div className="flex flex-wrap gap-2">
              {seatRows.map((r) => {
                return (
                  <SortButton
                    key={r}
                    onClick={() => handleSeatRowChange(r)}
                    text={r}
                    isSelected={selectedSeatRows.includes(r)}
                  />
                );
              })}
            </div>
          </div>

          <hr />

          <div>
            <h4 className="font-medium mb-2 text-gray-800">Tầng</h4>
            <div className="flex gap-2">
              {floors.map((floor) => {
                return (
                  <SortButton
                    key={floor}
                    onClick={() => handleFloorChange(floor)}
                    text={floor}
                    isSelected={selectedFloors.includes(floor)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}