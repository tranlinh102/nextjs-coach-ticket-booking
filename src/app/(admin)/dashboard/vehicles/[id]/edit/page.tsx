import Breadcrumbs from '@/components/ui/breadcrumbs';
import EditVehicleForm from '@/components/features/Admin/vehicles/edit-form';
import { getVehicleByIdOrNull } from '@/services/vehicle.service';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chỉnh sửa xe - Admin Dashboard - Đặt vé xe khách và xe Limousine',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  
  const vehicle = await getVehicleByIdOrNull(id);

  if (!vehicle) {
    notFound();
  }
  
  return (
    <div className="w-full">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Quản lý xe', href: '/dashboard/vehicles' },
          {
            label: 'Chỉnh sửa xe',
            href: `/dashboard/vehicles/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditVehicleForm vehicle={vehicle} />
    </div>
  );
}