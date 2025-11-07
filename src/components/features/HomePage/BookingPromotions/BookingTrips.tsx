import { fetchTrips } from "@/services/trip.service";
import TripCard from "./components/TripCard";
import { Trip } from "@/type";

export default async function BookingTrips() {
  const { data } = await fetchTrips();

  const tripList: Trip[] = data ?? [];

  return (
    <section className="relative -mt-20 max-w-7xl mx-auto px-6">
      <div className="bg-white rounded-2xl shadow-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900 uppercase">
            Chuyến xe nổi bật
          </h2>
          <button className="cursor-pointer text-base font-bold px-4 py-2 rounded-full border border-gray-300 text-blue-700 hover:bg-gray-50 hover:shadow-lg">
            Xem tất cả
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tripList.map((trip: Trip) => (
            <TripCard key={trip.id} {...trip} />
          ))}
        </div>
      </div>
    </section>
  );
}

