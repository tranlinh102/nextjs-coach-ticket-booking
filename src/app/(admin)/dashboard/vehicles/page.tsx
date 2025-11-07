import { Metadata } from 'next';
import { Search } from '@components/ui/search';
import { CreateButton } from '@components/ui/action-buttons';
import VehicleTable from '@components/features/Admin/vehicles/table';
import PageHeader from '@components/ui/PageHeader';
import ActiveFilter from '@components/ui/ActiveFilter';

export const metadata: Metadata = {
  title: 'Vehicles - Admin Dashboard - Đặt vé xe khách và xe Limousine',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const params = await searchParams;
  const query = params?.query || '';
  const currentPage = Number(params?.page) || 1;

  return (
    <div className="flex h-full flex-col">
      {/* Sticky Header Section */}
      <div className="flex-none">
        <PageHeader />

        <div className="mt-4 flex flex-col gap-4 md:mt-8">
          <div className="flex items-center justify-between gap-2">
            <Search placeholder="Tìm kiếm biển số xe..." />
            <CreateButton />
          </div>
          <ActiveFilter />
        </div>
      </div>

      {/* Scrollable Table Section */}
      <div className="mt-4 flex-1 overflow-hidden">
        <VehicleTable query={query} currentPage={currentPage} />
      </div>
    </div>
  );
}
