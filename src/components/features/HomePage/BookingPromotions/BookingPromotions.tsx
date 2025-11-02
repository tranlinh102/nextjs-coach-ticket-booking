import PromoCard from "./components/PromoCard";

const promotionList = [
    {
        id: 1,
        gradient: 'from-blue-500 to-indigo-600',
        title: 'Tiết kiệm tới 30% khi đặt vé xe lần đầu',
        subtitle: 'Hiệu lực đến 31 tháng 12',
        code: 'DAUTIEN',
        img: '/images/icon-secure-payment.svg',
    },
    {
        id: 2,
        gradient: 'from-teal-400 to-teal-600',
        title: 'Giảm ngay 20% cho chuyến đi cuối tuần',
        subtitle: 'Áp dụng đến 15 tháng 11',
        code: 'WEEKEND',
        img: '/images/icon-secure-payment.svg',
    },
    {
        id: 3,
        gradient: 'from-orange-400 to-orange-600',
        title: 'Ưu đãi 40% cho nhóm 4 người',
        subtitle: 'Chỉ trong tháng này',
        code: 'GROUP40',
        img: '/images/icon-secure-payment.svg',
    },
];

export default function BookingPromotions() {
  return (
    <section className="relative -mt-20 max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 uppercase">Ưu đãi đang hot</h2>
            <button className="cursor-pointer text-base font-bold px-4 py-2 rounded-full border border-gray-300 text-blue-700 hover:bg-gray-50 hover:shadow-lg">Xem tất cả</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {promotionList.map((p) => (
              <PromoCard key={p.id} {...p} />
            ))}
          </div>
        </div>
    </section>    
  );
}
