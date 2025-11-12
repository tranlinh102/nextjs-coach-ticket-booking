import { EndPointIcon, StartPointIcon } from "@/components/ui/Icon";
import { TripResponse } from "@/type";

export default function TripCard(trip : TripResponse) {
  const {
    startStopName,
    endStopName,
    startStopAddress,
    endStopAddress,
    scheduledDepartureTime,
    scheduledArrivalTime,
    availableSeats,
    vehicleType,
    price,
  } = trip;

  // Format thời gian
  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  // Format tiền
  const formatPrice = (p: number) => p.toLocaleString("vi-VN") + " ₫";

  // Tính duration (giờ:phút)
  const durationMs =
    new Date(scheduledArrivalTime).getTime() -
    new Date(scheduledDepartureTime).getTime();
  const durationHours = Math.floor(durationMs / 1000 / 60 / 60);
  const durationMinutes = Math.floor((durationMs / 1000 / 60) % 60);
  const durationStr = `${durationHours}h ${durationMinutes}m`;

  return (
    <div className="bg-white card-box-shadown rounded-xl shadow-sm p-4 flex flex-col gap-3 transition-all">
      <div className="flex justify-between items-center">
        {/* Thời gian và điểm đi */}
        <div className="text-left">
          <div className="text-2xl font-bold">{formatTime(scheduledDepartureTime)}</div>
          <p className="text-sm text-gray-500 truncate">{startStopName}</p>
        </div>

        {/* Duration */}
        <div className="flex-1 px-4">
          <div className="text-center">
            <div className="text-sm font-semibold text-gray-600">{durationStr}</div>
          </div>
          <div className="flex items-center mt-1">
            <div className="text-[var(--brand)]">
              <StartPointIcon />
            </div>
            <div className="flex-grow border-b border-dotted border-gray-400 mx-2"></div>
            <div className="text-orange-600">
              <EndPointIcon />
            </div>
          </div>
        </div>

        {/* Thời gian và điểm đến */}
        <div className="text-right">
          <div className="text-2xl font-bold">{formatTime(scheduledArrivalTime)}</div>
          <p className="text-sm text-gray-500 truncate">{endStopName}</p>
        </div>

        {/* Thông tin xe và chỗ trống */}
        <div className="flex gap-4 text-gray-500 pl-4 border-l ml-4">
          <div>
            <div className="font-semibold">{vehicleType}</div>
            <div className="text-[var(--brand-dark)] font-medium text-sm">
              {availableSeats} chỗ trống
            </div>
          </div>
        </div>

        {/* Giá */}
        <div className="flex items-center gap-3 pl-4 border-l ml-4">
          <span className="font-bold text-[var(--brand)] text-lg">{formatPrice(price)}</span>
        </div>
      </div>

      {/* Button chọn chuyến */}
      <div className="flex gap-4 text-gray-500 text-sm border-t pt-3">
        <div className="w-full rounded-xl overflow-hidden bg-white">
          <div className="flex">
            <button className="cursor-pointer ml-auto bg-[var(--brand-light)] text-[var(--brand-dark)] px-4 py-2 rounded-full m-2 hover:bg-[var(--brand-dark)] hover:text-white transition font-semibold">
              Chọn chuyến
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
