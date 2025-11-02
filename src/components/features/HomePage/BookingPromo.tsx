export default function BookingPromo() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {/* Cột trái */}
      <div className="space-y-6">
        <h2 className="text-4xl font-bold leading-tight">
          ĐẶT VÉ XE KHÁCH RẺ NHẤT!
        </h2>
        <p className="text-gray-600 max-w-lg">
          LongDistanceBuses là nền tảng đặt vé xe khách trực tuyến lớn nhất Việt Nam, được hàng triệu khách hàng tin dùng.
        </p>

        <ul className="space-y-4">
          <li className="flex items-center gap-3">
            <img src="/images/icon-secure-payment.svg" alt="" className="w-10 h-10" />
            <span className="font-semibold text-gray-800">Thanh toán an toàn và bảo mật</span>
          </li>
          <li className="flex items-center gap-3">
            <img src="/images/icon-no-fee.svg" alt="" className="w-10 h-10" />
            <span className="font-semibold text-gray-800">Không tính phí phụ thu</span>
          </li>
          <li className="flex items-center gap-3">
            <img src="/images/icon-safe-trip.svg" alt="" className="w-10 h-10" />
            <span className="font-semibold text-gray-800">Chuyến đi an toàn và không lo lắng</span>
          </li>
        </ul>
      </div>

      {/* Cột phải */}
      <div className="relative w-full h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-pink-50 to-pink-200 rounded-[3rem] rotate-[-8deg]" />
      </div>
    </section>
  );
}
