"use client";

type TripCardProps = {
  id: string;
  routeId: string;
  vehicleId: string;
  scheduledDepartureTime: string;
  scheduledArrivalTime: string;
  price: number;
  status: string;
};

export default function TripCard(props: TripCardProps) {
  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("vi-VN");
  };

  return (
    <div className="rounded-2xl bg-white p-5 shadow-md border border-gray-100">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h4 className="text-base font-bold">Tuyến: {props.routeId}</h4>
          <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700">
            {props.status}
          </span>
        </div>

        <div className="text-sm text-gray-600">
          🚍 Xe: <span className="font-semibold">{props.vehicleId}</span>
        </div>

        <div className="text-sm text-gray-600">
          🕒 Khởi hành: <span className="font-semibold">{formatTime(props.scheduledDepartureTime)}</span>
          {" • "}
          {formatDate(props.scheduledDepartureTime)}
        </div>

        <div className="text-sm text-gray-600">
          🕘 Đến nơi: <span className="font-semibold">{formatTime(props.scheduledArrivalTime)}</span>
        </div>

        <div className="text-lg font-bold text-green-600 mt-2">
          {props.price.toLocaleString("vi-VN")} ₫
        </div>

        <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold">
          Đặt vé
        </button>
      </div>
    </div>
  );
}
