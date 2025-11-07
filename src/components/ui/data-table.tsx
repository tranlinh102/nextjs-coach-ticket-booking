'use client';

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';
import { PencilIcon, TrashIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type DataTableProps<T extends { id: string; active?: boolean }> = {
  data: T[];
  columns: ColumnDef<T>[];
  onToggleActive?: (id: string) => Promise<{ success: boolean; vehicle?: T }>;
  isLoading?: boolean;
  currentPage?: number;
  pageSize?: number;
};

export function DataTable<T extends { id: string; active?: boolean }>({
  data,
  columns,
  onToggleActive,
  isLoading = false,
  currentPage = 1,
  pageSize = 10,
}: DataTableProps<T>) {
  const pathname = usePathname();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <div className="rounded-lg border bg-white p-8 text-center shadow">
        <p className="text-gray-500">Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="rounded-lg border bg-white p-8 text-center shadow">
        <p className="text-gray-500">Không có dữ liệu</p>
      </div>
    );
  }

  return (
    <div className="flow-root">
      <div className="rounded-lg border bg-white shadow">
        <table className="min-w-full text-sm text-gray-900">
          <thead className="sticky top-0 z-10 bg-gray-50 font-medium shadow-sm">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                <th className="px-4 py-3 text-left">STT</th>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-4 py-3 text-left">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
                <th className="px-4 py-3 text-right">Thao tác</th>
              </tr>
            ))}
          </thead>
            <tbody>
              {table.getRowModel().rows.map((row, index) => {
                // Tính số thứ tự dựa trên page và pageSize
                const rowNumber = (currentPage - 1) * pageSize + index + 1;
                
                return (
                  <tr key={row.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-500">
                      {rowNumber}
                    </td>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`${pathname}/${row.original.id}/edit`}
                          className="rounded-md border p-2 hover:bg-gray-100"
                          title="Chỉnh sửa"
                        >
                          <PencilIcon className="w-4" />
                        </Link>
                        <button
                          onClick={async () => {
                            const confirmMessage = row.original.active 
                              ? 'Xác nhận xóa?' 
                              : 'Khôi phục dữ liệu này?';
                            
                            if (confirm(confirmMessage)) {
                              await onToggleActive?.(row.original.id);
                            }
                          }}
                          className={`rounded-md border p-2 ${
                            row.original.active 
                              ? 'hover:bg-red-100' 
                              : 'hover:bg-green-100'
                          }`}
                          title={row.original.active ? 'Xóa' : 'Khôi phục'}
                        >
                          {row.original.active ? (
                            <TrashIcon className="w-4 text-red-500" />
                          ) : (
                            <ArrowPathIcon className="w-4 text-green-600" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
        </table>
      </div>
    </div>
  );
}