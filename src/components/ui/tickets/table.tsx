import Image from 'next/image';
import { UpdateTicket, DeleteTicket } from '@/components/ui/tickets/buttons';
import TicketStatus from '@/components/ui/tickets/status';
import { formatDateToLocal, formatCurrency } from '@/lib/utils';
import { fetchFilteredTickets } from '@/lib/data';

export default async function TicketsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const tickets = await fetchFilteredTickets(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-2xl bg-white p-4 shadow-md ring-1 ring-gray-100">
          <table className="min-w-full text-gray-800">
            <thead className="text-sm font-semibold uppercase tracking-wide text-gray-600 border-b border-gray-200 bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left">
                  Khách hàng
                </th>
                <th scope="col" className="px-4 py-4 text-left">
                  Email
                </th>
                <th scope="col" className="px-4 py-4 text-left">
                  Số tiền
                </th>
                <th scope="col" className="px-4 py-4 text-left">
                  Ngày đặt
                </th>
                <th scope="col" className="px-4 py-4 text-left">
                  Trạng thái
                </th>
                <th scope="col" className="px-4 py-4 text-right">
                  Hành động
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {tickets?.map((ticket) => (
                <tr
                  key={ticket.id}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{ticket.name}</span>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-sm text-gray-600">
                    {ticket.email}
                  </td>

                  <td className="px-4 py-4 font-semibold text-gray-900">
                    {formatCurrency(ticket.price_paid)}
                  </td>

                  <td className="px-4 py-4 text-sm text-gray-500">
                    {formatDateToLocal(ticket.sold_at)}
                  </td>

                  <td className="px-4 py-4">
                    <TicketStatus status={ticket.status} />
                  </td>

                  <td className="px-4 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <UpdateTicket id={ticket.id} />
                      <DeleteTicket id={ticket.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {(!tickets || tickets.length === 0) && (
            <p className="py-6 text-center text-gray-400">
              Không có vé nào được tìm thấy.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
