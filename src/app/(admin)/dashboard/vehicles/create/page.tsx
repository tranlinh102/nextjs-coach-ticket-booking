'use client';

import { useEffect } from 'react';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import CreateVehicleForm from '@/components/features/Admin/vehicles/create-form';

export default function Page() {
  useEffect(() => {
    // Set page title
    document.title = 'Tạo xe mới - Admin Dashboard - Đặt vé xe khách và xe Limousine';
  }, []);

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