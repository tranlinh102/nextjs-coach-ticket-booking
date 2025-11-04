import Breadcrumbs from '@/components/ui/breadcrumbs';
import CreateVehicleForm from '@/components/features/Admin/vehicles/create-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tạo xe mới - Admin Dashboard - Đặt vé xe khách và xe Limousine',
};

export default function Page() {
  return (
    <div className="w-full">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Quản lý xe', href: '/dashboard/vehicles' },
          {
            label: 'Tạo xe mới',
            href: '/dashboard/vehicles/create',
            active: true,
          },
        ]}
      />
      <CreateVehicleForm />
    </div>
  );
}