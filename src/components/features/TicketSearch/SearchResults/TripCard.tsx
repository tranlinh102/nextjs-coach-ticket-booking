import { EndPointIcon, StartPointIcon } from "@/components/ui/Icon";

interface TripCardProps {
  startTime: string;
  endTime: string;
  from: string;
  to: string;
  duration: string;
  type: string;
  available: number;
  price: string;
}

export default function TripCard(
  {
  startTime,
  endTime,
  from,
  to,
  duration,
  type,
  available,
  price,
  }: TripCardProps) {
  return (
    <div className="bg-white card-box-shadown rounded-xl shadow-sm p-4 flex flex-col gap-3 transition-all">
      <div className="flex justify-between items-center">
        <div className="text-left">
          <div className="text-2xl font-bold">{startTime}</div>
          <p className="text-sm text-gray-500 truncate">{from}</p>
        </div>

        <div className="flex-1 px-4">
          <div className="text-center">
            <div className="text-sm font-semibold text-gray-600">
              {duration}
            </div>
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

        <div className="text-right">
          <div className="text-2xl font-bold">{endTime}</div>
          <p className="text-sm text-gray-500 truncate">{to}</p>
        </div>

        <div className="flex gap-4 text-gray-500 pl-4 border-l ml-4">
          <div>
            <div className="font-semibold">{type}</div>
            <div className="text-[var(--brand-dark)] font-medium text-sm">
              {available} chỗ trống
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 pl-4 border-l ml-4">
          <span className="font-bold text-[var(--brand)] text-lg">{price}</span>
        </div>
      </div>

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