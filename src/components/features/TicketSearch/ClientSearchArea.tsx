"use client";

import { useState, useEffect } from "react";
import SearchFilter from "@/components/features/TicketSearch/SearchFilter/SearchFilter";
import SearchResult from "@/components/features/TicketSearch/SearchResults/SearchResult";
import { TripResponse } from "@/type";

export default function ClientSearchArea({
  initialTrips,
}: {
  initialTrips: TripResponse[];
}) {
  const [visibleTrips, setVisibleTrips] = useState<TripResponse[]>(initialTrips);

  // Ensure visibleTrips is in sync with initialTrips when it changes
  useEffect(() => {
    setVisibleTrips(initialTrips);
  }, [initialTrips]);

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-[350px_1fr] gap-6 items-start">
      <SearchFilter initialTrips={initialTrips} onFilter={setVisibleTrips} />

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">
            Hiển thị <span className="font-bold">{visibleTrips.length}</span> kết quả
            {initialTrips.length > visibleTrips.length && (
              <span className="text-sm text-gray-500"> (trên {initialTrips.length})</span>
            )}
          </h2>
        </div>

        <SearchResult trips={visibleTrips} />
      </div>
    </div>
  );
}
