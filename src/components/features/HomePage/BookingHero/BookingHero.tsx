import { Suspense } from "react";
import BookingTrips from "../BookingPromotions/BookingTrips";
import BookingSearchBox from "./components/BookingSearchBox";
import TripsSkeleton from "@/components/ui/TripsSkeleton";

export default function BookingHero() {
  return (
    <div className="relative">
      <section className="relative bg-[url('/images/BookingHeroImg.jpg')] bg-cover bg-center py-50 text-white">
        <div className="absolute inset-0 bg-black/20"></div>

        <BookingSearchBox />
      </section>

      <Suspense fallback={<TripsSkeleton />}>
        <BookingTrips />
      </Suspense>
    </div>
  );
}
