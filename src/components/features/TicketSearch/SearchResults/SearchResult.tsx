"use client";

import { TripResponse } from "@/type";
import TripCard from "./components/TripCard";

export default function SearchResult({ trips }: { trips: TripResponse[] }) { 
    return (
        <div className="flex flex-col gap-4">
            {trips.map((trip) => (
                <TripCard 
                    key={trip.tripId} 
                    {...trip}
                />
            ))}
        </div>
    );
}