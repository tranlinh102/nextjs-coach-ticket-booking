import SearchFilter from "@/components/features/TicketSearch/SearchFilter/SearchFilter";
import TripCard from "@/components/features/TicketSearch/SearchResults/TripCard";
import SearchTicketForm from "@/components/features/TicketSearch/SearchForm/SearchTicketForm";
import { fetchProvinces } from "@/services/province.service";
import { Province } from "@/type/province";
import { LocationProvider } from "@/components/LocationProvider";

const trips = [
    {
      id: 1,
      startTime: "00:02",
      endTime: "08:02",
      from: "Bến Xe An Sương",
      to: "Bến Xe Đà Lạt",
      duration: "8 giờ",
      type: "Limousine",
      available: 32,
      price: "290.000đ",
    },
    {
      id: 2,
      startTime: "00:30",
      endTime: "08:30",
      from: "Bến Xe Miền Tây",
      to: "Bến Xe Đà Lạt",
      duration: "8 giờ",
      type: "Limousine",
      available: 28,
      price: "290.000đ",
    },
    {
      id: 3,
      startTime: "00:35",
      endTime: "08:35",
      from: "BX Miền Đông Mới",
      to: "Bến Xe Đà Lạt",
      duration: "8 giờ",
      type: "Limousine",
      available: 33,
      price: "290.000đ",
    },
  ];

export default async function SearchPage() {
  const { data } = await fetchProvinces();  
  const provinceList: Province[] = data ?? [];
  const filterProvinceList = provinceList.filter((province) => province.active === true);

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
          {/* Thông tin chuyến */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              TP. Hồ Chí Minh – Đà Lạt <span className="text-gray-500">(84)</span>
            </h2>
          </div>

          {/* Danh sách chuyến chuyến */}
          <div className="flex flex-col gap-4">
            {trips.map((trip) => (
              <TripCard 
              key={trip.id} 
              {...trip} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
