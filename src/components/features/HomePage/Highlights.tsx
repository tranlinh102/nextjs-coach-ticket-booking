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

export default function Highlights() {
  return (
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
  );
}
