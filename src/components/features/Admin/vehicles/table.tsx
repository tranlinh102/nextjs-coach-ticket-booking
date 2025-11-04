'use client';

import { ColumnDef } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useVehicles } from '@/hook/useVehicles';
import { DataTable } from '@components/ui/data-table';
import { Vehicle } from '@/services/vehicle.service';
import Pagination from '@components/ui/Pagination';
import { useDebounce } from '@hook/useDebounce';

const columns: ColumnDef<Vehicle>[] = [
  { header: 'Biển số', accessorKey: 'licensePlate' },
  { header: 'Loại xe', accessorKey: 'type' },
  {
    header: 'Sức chứa',
    cell: ({ row }) =>
      `${row.original.activeSeatCount}/${row.original.seatCapacity}`,
  },
  { header: 'Tình trạng', accessorKey: 'status' },
  {
    header: 'Trạng thái',
    cell: ({ row }) =>
      row.original.active ? (
        <span className="font-medium text-green-600">Hoạt động</span>
      ) : (
        <span className="font-medium text-red-500">Ngừng</span>
      ),
  },
];

export default function VehicleTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const searchParams = useSearchParams();
  const pageSize = Number(searchParams.get('size')) || 10;
  const activeFilter = searchParams.get('active');
  
  // Parse active filter: null = all, "true" = active, "false" = inactive
  const active = activeFilter === null ? undefined : activeFilter === 'true';
  
  const [data, setData] = useState<Vehicle[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const { loading, fetchVehicles, toggleActiveStatus } = useVehicles();

  // Debounce search query (1 giây)
  const debouncedQuery = useDebounce(query, 1000);

  const loadData = async () => {
    const response = await fetchVehicles(debouncedQuery, currentPage, pageSize, active);
    if (response) {
      setData(response.content);
      setTotalPages(response.totalPages);
    } else {
      setData([]);
      setTotalPages(0);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery, currentPage, pageSize, active]);

  // Listen for update/create events từ edit/create form
  useEffect(() => {
    const handleVehicleUpdate = (event: CustomEvent<Vehicle>) => {
      const updatedVehicle = event.detail;
      // Update record trên table
      setData(prevData => 
        prevData.map(item => 
          item.id === updatedVehicle.id ? updatedVehicle : item
        )
      );
    };

    const handleVehicleCreate = (event: CustomEvent<Vehicle>) => {
      const createdVehicle = event.detail;
      // Chỉ thêm vào đầu nếu đang ở page 1 và filter phù hợp
      if (currentPage === 1 && (active === undefined || active === createdVehicle.active)) {
        setData(prevData => {
          const exists = prevData.some(item => item.id === createdVehicle.id);
          if (!exists) {
            const newData = [createdVehicle, ...prevData];
            return newData.slice(0, pageSize);
          }
          return prevData;
        });
      }
    };

    window.addEventListener('vehicle-updated', handleVehicleUpdate as EventListener);
    window.addEventListener('vehicle-created', handleVehicleCreate as EventListener);

    return () => {
      window.removeEventListener('vehicle-updated', handleVehicleUpdate as EventListener);
      window.removeEventListener('vehicle-created', handleVehicleCreate as EventListener);
    };
  }, [currentPage, pageSize, active]);

  const handleToggleActive = async (id: string) => {
    const result = await toggleActiveStatus(id);
    
    if (result.success && result.vehicle) {
      // Xóa record khỏi table vì trạng thái đã thay đổi
      // Ví dụ: đang filter "Đang hoạt động", khi xóa (active=false) thì phải remove
      // Hoặc đang filter "Đã xóa", khi khôi phục (active=true) thì cũng phải remove
      setData(prevData => prevData.filter(item => item.id !== id));
    }
    
    return result.success;
  };

  return (
    <div className="flex h-full flex-col">
      {/* Scrollable Table Section */}
      <div className="flex-1 overflow-auto">
        <DataTable
          data={data}
          columns={columns}
          onToggleActive={handleToggleActive}
          isLoading={loading}
          currentPage={currentPage}
          pageSize={pageSize}
        />
      </div>
      
      {/* Sticky Pagination at Bottom */}
      {totalPages > 0 && (
        <div className="flex-none border-t bg-white pt-4">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            pageSize={pageSize}
          />
        </div>
      )}
    </div>
  );
}