import BookingHero from "@/components/features/HomePage/BookingHero/BookingHero";
import BookingFAQ from "@/components/features/HomePage/BookingFAQ";
import { AppStoreIcon, GooglePlayIcon, RosetteCheckIcon } from "@/components/ui/Icon";

const highlights = [
  {
    img: "/images/highlight-1.svg",
    title: "56+ triệu",
    desc: "Khách hàng hài lòng trên toàn cầu",
  },
  {
    img: "/images/highlight-2.svg",
    title: "Hơn 5.000",
    desc: "Các nhà xe tin cậy chứng tôi trong việc bán vé xe khách",
  },
  {
    img: "/images/highlight-3.svg",
    title: "Hơn 200.000",
    desc: "Vé mỗi ngày",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-12">
      <BookingHero />

      {/* Highlights */}
      <section className="container max-w-7xl mx-auto px-6 text-left">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 uppercase">
          Điểm nổi bật 
        </h2>

        <div className="grid grid-cols-3 gap-6">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 text-center flex flex-col items-center"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-40 h-40 mb-6 object-contain"
              />
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Download Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div
          className="relative rounded-4xl bg-cover bg-no-repeat bg-right text-white"
          style={{ backgroundImage: "url('/images/download-bg.svg')" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start p-10">
            <div className="flex">
              <div className="bg-white text-gray-900 rounded-2xl p-8 w-full">
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <RosetteCheckIcon />
                  <span className="font-medium">Ưu đãi hấp dẫn</span>
                </li>
                <li className="flex items-start">
                  <RosetteCheckIcon />
                  <span className="font-medium">Tuỳ chọn thanh toán liền mạch</span>
                </li>
              </ul>
  
              <div className="flex items-center justify-around border-t pt-6 text-center">
                <div className="text-left">
                  <p className="font-semibold text-lg">4.5 ⭐</p>
                  <p className="text-sm text-gray-600">50M+ lượt tải</p>
                  <p className="text-sm font-medium">Play Store</p>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-lg">4.6 ⭐</p>
                  <p className="text-sm text-gray-600">10M+ lượt tải</p>
                  <p className="text-sm font-medium">App Store</p>
                </div>
              </div>
              </div>
            </div>
  
            {/* Center: QR */}
            <div className="flex flex-col items-center justify-center">
              <p className="font-semibold mb-4 text-white">Quét để tải</p>
              <img src="/images/qrcode.svg" alt="QR code tải app" className="w-36 h-36 bg-white rounded" />
            </div>
  
            {/* Right: store badges */}
            <div className="flex flex-col items-center md:items-start justify-center gap-4">
              <p className="font-semibold mb-2 text-white">Tải ứng dụng trên</p>
              <div className="flex flex-col gap-3">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <GooglePlayIcon />
                </a>
  
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <AppStoreIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BookingPromo  */}
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

      <BookingFAQ />
    </div>
  );
}
