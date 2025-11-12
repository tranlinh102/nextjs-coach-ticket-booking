import SearchFilter from "@/components/features/TicketSearch/SearchFilter/SearchFilter";
import SearchTicketForm from "@/components/features/TicketSearch/SearchForm/SearchTicketForm";
import { fetchProvinces } from "@/services/province.service";
import { Province } from "@/type/province";
import { LocationProvider } from "@/components/LocationProvider";
import SearchResult from "@/components/features/TicketSearch/SearchResults/SearchResult";
import { fetchAvailableTrips } from "@/services/trip.service";
import { TripResponse } from "@/type";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { data } = await fetchProvinces();  
  const provinceList: Province[] = data ?? [];
  const filterProvinceList = provinceList.filter((province) => province.active === true);

  const params = await searchParams;
  const departureDate = params.departureDate || "";
  const startProvinceId = params.startProvinceId || "";
  const endProvinceId = params.endProvinceId || "";
  const requiredSeats = params.requiredSeats || "1";

  const response = await fetchAvailableTrips(
    departureDate,
    startProvinceId,
    endProvinceId,
    parseInt(requiredSeats, 10)
  );
  const trips: TripResponse[] = response.data ?? [];

  // Tìm tên tỉnh
  const startProvince = filterProvinceList.find(p => p.id === startProvinceId);
  const endProvince = filterProvinceList.find(p => p.id === endProvinceId);
  const startProvinceName = startProvince?.name || "";
  const endProvinceName = endProvince?.name || "";

  return (
    <div className="space-y-12">
      {/* Form tìm kiếm */}
      <LocationProvider value={filterProvinceList}>
        <SearchTicketForm />
      </LocationProvider>

      <div className="max-w-7xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-[350px_1fr] gap-6 items-start">
        {/* Bộ lọc */}
        <SearchFilter />

        {/* Kết quả */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              {startProvinceName} – {endProvinceName}{" "}
              <span className="text-gray-500">({trips.length})</span>
            </h2>
          </div>
          <SearchResult trips={trips}/>
        </div>
      </div>
    </div>
  );
}

