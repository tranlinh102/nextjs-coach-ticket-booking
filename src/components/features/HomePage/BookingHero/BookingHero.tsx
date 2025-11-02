import BookingPromotions from "../BookingPromotions/BookingPromotions";
import BookingSearchBox from "./components/BookingSearchBox";

export default function BookingHero() {
  return (
    <div className="relative">
      <section className="relative bg-[url('/images/BookingHeroImg.jpg')] bg-cover bg-center py-50 text-white">
        <div className="absolute inset-0 bg-black/20"></div>

        <BookingSearchBox />
      </section>

      <BookingPromotions />
    </div>
  );
}
