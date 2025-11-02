export default function Footer() {
  return (
    <footer className="bg-[#1d2430] text-gray-200 text-sm">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Cột 1: Chứng nhận */}
        <div>
          <h3 className="font-semibold mb-3">Chứng nhận</h3>
          <img
            src="/images/bo-cong-thuong.webp"
            alt="Đã đăng ký Bộ Công Thương"
            className="w-32"
          />
        </div>

        {/* Cột 2: Thông tin */}
        <div>
          <h3 className="font-semibold mb-3">Thông tin</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Điều khoản & Điều kiện</a></li>
            <li><a href="#" className="hover:underline">Chính sách bảo mật</a></li>
            <li><a href="#" className="hover:underline">Quy chế</a></li>
          </ul>
        </div>

        {/* Cột 3: Vé LongDistanceBuses */}
        <div>
          <h3 className="font-semibold mb-3">Về LongDistanceBuses</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Về chúng tôi</a></li>
            <li><a href="#" className="hover:underline">Liên hệ</a></li>
          </ul>
        </div>

        {/* Cột 4: Đặt */}
        <div>
          <h3 className="font-semibold mb-3">Đặt</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Nhà xe Limousine</a></li>
          </ul>
        </div>
      </div>

      {/* Logo + Bản quyền */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
          <div className="flex items-center gap-3">
            <img src="/favicon.svg" alt="LongDistanceBuses logo" className="h-20" />
            <p>© 2025 LongDistanceBuses Vietnam All Rights Reserved</p>
          </div>

          <div className="text-gray-400 leading-relaxed text-xs md:text-sm max-w-2xl">
            <p>Công ty TNHH LongDistanceBuses Việt Nam</p>
            <p>Email: contact@LongDistanceBuses.vn | Liên hệ: 19001900</p>
            <p>
              Địa chỉ văn phòng: Tầng 6 và 7, Tòa nhà Mê Linh Point, Số 2 Ngô Đức Kế, Phường Bến Nghé,
              Quận 1, Thành phố Hồ Chí Minh
            </p>
            <p>
              Số Giấy chứng nhận đăng ký doanh nghiệp: 0317772069 được cấp bởi Sở Kế hoạch đầu tư
              Thành phố Hồ Chí Minh lần đầu ngày 4/6/2023.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
