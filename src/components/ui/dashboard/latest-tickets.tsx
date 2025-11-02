import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/components/ui/fonts';
import { fetchLatestTickets } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';

export default async function LatestTickets() {
  const tickets = await fetchLatestTickets();

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2
        className={`${lusitana.className} mb-4 text-xl md:text-2xl text-gray-800`}
      >
        Danh sách vé xe đã đặt
      </h2>

      <div className="flex grow flex-col justify-between rounded-2xl bg-white shadow-lg ring-1 ring-gray-100">
        <div className="overflow-x-auto rounded-2xl">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gradient-to-r from-cyan-300 to-indigo-500 text-white text-xs uppercase tracking-wider">
              <tr>
                <th scope="col" className="px-6 py-4 font-semibold">Mã vé</th>
                <th scope="col" className="px-6 py-4 font-semibold">Tên khách</th>
                <th scope="col" className="px-6 py-4 font-semibold">Tuyến xe</th>
                <th scope="col" className="px-6 py-4 font-semibold text-right">Giá vé</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {tickets?.map((t, index) => (
                <tr
                  key={t.ticket_code}
                  className={`transition-colors ${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  } hover:bg-blue-50`}
                >
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {t.ticket_code}
                  </td>
                  <td className="px-6 py-4">{t.customer_name}</td>
                  <td className="px-6 py-4">{t.trip_name}</td>
                  <td className="px-6 py-4 text-right font-semibold text-blue-600">
                    {formatCurrency(t.price_paid)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-end pb-3 pr-6 pt-4 text-gray-500 border-t border-gray-100">
          <ArrowPathIcon className="h-5 w-5 mr-2 text-gray-400" />
          <h3 className="text-sm italic">Vừa được cập nhật</h3>
        </div>
      </div>
    </div>
  );
}
