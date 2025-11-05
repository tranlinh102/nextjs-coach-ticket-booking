'use client';

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import EditVehicleForm from '@/components/features/Admin/vehicles/edit-form';
import { useVehicles } from '@/hook/useVehicles';
import { Vehicle } from '@/services/vehicle.service';

export default function Page() {
  const params = useParams();
  const id = params.id as string;
  const { getVehicleById } = useVehicles();
  
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFoundError, setNotFoundError] = useState(false);

  useEffect(() => {
    // Set page title
    document.title = 'Chỉnh sửa xe - Admin Dashboard - Đặt vé xe khách và xe Limousine';
  }, []);

  useEffect(() => {
    const loadVehicle = async () => {
      setLoading(true);
      const result = await getVehicleById(id);
      
      if (result.success && result.vehicle) {
        setVehicle(result.vehicle);
      } else {
        setNotFoundError(true);
      }
      
      setLoading(false);
    };

    loadVehicle();
  }, [id, getVehicleById]);

  if (notFoundError) {
    notFound();
  }

  if (loading) {
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
        <div className="mt-8 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return null;
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