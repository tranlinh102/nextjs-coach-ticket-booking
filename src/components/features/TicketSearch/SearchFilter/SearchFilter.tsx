"use client"; 

import { useState } from "react";
import { TrashIcon } from "@/components/ui/Icon"; 
import SortButton from "./components/SortButton";
import SortItem from "./components/SortItem";

const timeOptions = [
  "Sáng sớm 00:00 - 06:00 (13)",
  "Buổi sáng 06:00 - 12:00 (17)",
  "Buổi chiều 12:00 - 18:00 (18)",
  "Buổi tối 18:00 - 24:00 (36)",
];
const carTypes = ["Ghế", "Giường", "Limousine"];
const seatRows = ["Hàng đầu", "Hàng giữa", "Hàng cuối"];
const floors = ["Tầng trên", "Tầng dưới"];

export default function SearchFilter() {
  const [selectedTimes, setSelectedTimes] = useState<string[]>([""]);
  const [selectedCarTypes, setSelectedCarTypes] = useState<string[]>([""]);
  const [selectedSeatRows, setSelectedSeatRows] = useState<string[]>([""]);
  const [selectedFloors, setSelectedFloors] = useState<string[]>([""]);

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
                const isSelected = selectedCarTypes.includes(type);
                return (
                  <SortButton
                    key={type}
                    onClick={() => handleCarTypeChange(type)}
                    text={type}
                    isSelected={isSelected}
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
                const isSelected = selectedSeatRows.includes(r);
                return (
                  <SortButton
                    key={r}
                    onClick={() => handleSeatRowChange(r)}
                    text={r}
                    isSelected={isSelected}
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
                const isSelected = selectedFloors.includes(floor);
                return (
                  <SortButton
                    key={floor}
                    onClick={() => handleFloorChange(floor)}
                    text={floor}
                    isSelected={isSelected}
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