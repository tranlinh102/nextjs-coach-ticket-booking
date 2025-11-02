import { generateYAxis } from '@//lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/components/ui/fonts';
import { fetchRevenue } from '@/lib/data';

export default async function RevenueChart() {
  const revenue = await fetchRevenue();
  const chartHeight = 350;
  const { yAxisLabels, topLabel } = generateYAxis(revenue);

  if (!revenue || revenue.length === 0) {
    return (
      <p className="mt-4 text-gray-400 italic text-center">
        Không thấy dữ liệu.
      </p>
    );
  }

  return (
    <div className="w-full md:col-span-4">
      {/* Tiêu đề */}
      <h2
        className={`${lusitana.className} mb-4 text-xl md:text-2xl text-gray-800 `}
      >
        Doanh thu tháng gần nhất
      </h2>

      {/* Khung biểu đồ */}
      <div className="rounded-2xl bg-white shadow-lg ring-1 ring-gray-100 p-6">
        <div className="grid grid-cols-12 sm:grid-cols-13 items-end gap-3 md:gap-4 bg-gradient-to-b from-gray-50 to-white rounded-2xl p-4">
          {/* Cột trục Y */}
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-gray-500 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {/* Cột doanh thu từng tháng */}
          {revenue.map((month) => (
            <div
              key={month.month}
              className="flex flex-col items-center gap-2 group transition-all"
            >
              <div
                className="w-full rounded-md bg-gradient-to-t from-indigo-500 to-blue-400 group-hover:from-indigo-400 group-hover:to-blue-300 shadow-md transition-all duration-300"
                style={{
                  height: `${(chartHeight / topLabel) * month.revenue}px`,
                }}
              ></div>
              <p className="-rotate-90 text-xs text-gray-500 sm:rotate-0">
                {month.month}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end pt-5 text-gray-500 border-t border-gray-100 mt-4">
          <CalendarIcon className="h-5 w-5 mr-2 text-gray-400" />
          <h3 className="text-sm italic">Cập nhật tự động theo từng tháng</h3>
        </div>
      </div>
    </div>
  );
}
