import SearchFilter from "@/components/features/TicketSearch/SearchFilter/SearchFilter";
import SearchTicketForm from "@/components/features/TicketSearch/SearchForm/SearchTicketForm";
import ClientSearchArea from "@/components/features/TicketSearch/ClientSearchArea";
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
        <SearchTicketForm startProvince={startProvince ?? null} endProvince={endProvince ?? null} />
      </LocationProvider>

      {/* Client-side filter + results (filtering happens on client from fetched trips) */}
      <ClientSearchArea initialTrips={trips} />
    </div>
  );
}

