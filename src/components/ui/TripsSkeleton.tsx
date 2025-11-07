export default function TripsSkeleton() {
  return (
    <section className="relative -mt-20 max-w-7xl mx-auto px-6 animate-pulse">
      <div className="bg-white rounded-2xl shadow-xl p-4">
        <div className="h-6 w-48 bg-gray-200 rounded mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1,2,3].map(x => (
            <div key={x} className="h-32 bg-gray-200 rounded-2xl"></div>
          ))}
        </div>
      </div>
    </section>
  );
}
