import { RosetteCheckIcon, GooglePlayIcon, AppStoreIcon } from "../../ui/Icon";

export default function DownloadSection() {
  return (
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
  );
}
