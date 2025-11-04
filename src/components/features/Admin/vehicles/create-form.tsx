'use client';

import Link from 'next/link';
import { TruckIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useVehicles } from '@/hook/useVehicles';

export default function CreateVehicleForm() {
  const router = useRouter();
  const { createVehicle } = useVehicles();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const seatCapacity = Number(formData.get('seatCapacity'));
    const activeSeatCount = Number(formData.get('activeSeatCount'));
    
    const data = {
      licensePlate: formData.get('licensePlate') as string,
      seatCapacity,
      activeSeatCount,
      type: formData.get('type') as string,
    };

    // Validation
    const newErrors: Record<string, string[]> = {};
    
    if (!data.licensePlate?.trim()) {
      newErrors.licensePlate = ['Biển số xe là bắt buộc'];
    }
    
    if (!data.seatCapacity || data.seatCapacity < 1) {
      newErrors.seatCapacity = ['Sức chứa phải lớn hơn 0'];
    }
    
    if (!data.activeSeatCount || data.activeSeatCount < 0) {
      newErrors.activeSeatCount = ['Số ghế hoạt động không được âm'];
    }
    
    if (data.activeSeatCount > data.seatCapacity) {
      newErrors.activeSeatCount = ['Số ghế hoạt động không được lớn hơn sức chứa'];
    }
    
    if (!data.type) {
      newErrors.type = ['Vui lòng chọn loại xe'];
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    const result = await createVehicle(data);
    setIsSubmitting(false);

    if (result.success && result.vehicle) {
      // Dispatch event để table thêm record
      const event = new CustomEvent('vehicle-created', { 
        detail: result.vehicle 
      });
      window.dispatchEvent(event);
      
      // Redirect về trang 1 để thấy item mới
      router.push('/dashboard/vehicles?page=1');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Biển số xe */}
        <div className="mb-4">
          <label htmlFor="licensePlate" className="mb-2 block text-sm font-medium">
            Biển số xe <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="licensePlate"
              name="licensePlate"
              type="text"
              placeholder="VD: 51A-12345"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="licensePlate-error"
            />
            <TruckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="licensePlate-error" aria-live="polite" aria-atomic="true">
            {errors.licensePlate?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* Sức chứa */}
        <div className="mb-4">
          <label htmlFor="seatCapacity" className="mb-2 block text-sm font-medium">
            Sức chứa (tổng số ghế) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="seatCapacity"
              name="seatCapacity"
              type="number"
              min="1"
              placeholder="VD: 45"
              defaultValue="45"
              className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="seatCapacity-error"
            />
          </div>
          <div id="seatCapacity-error" aria-live="polite" aria-atomic="true">
            {errors.seatCapacity?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* Số ghế hoạt động */}
        <div className="mb-4">
          <label htmlFor="activeSeatCount" className="mb-2 block text-sm font-medium">
            Số ghế hoạt động <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="activeSeatCount"
              name="activeSeatCount"
              type="number"
              min="0"
              placeholder="VD: 45"
              defaultValue="45"
              className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="activeSeatCount-error"
            />
          </div>
          <div id="activeSeatCount-error" aria-live="polite" aria-atomic="true">
            {errors.activeSeatCount?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* Loại xe */}
        <div className="mb-4">
          <label htmlFor="type" className="mb-2 block text-sm font-medium">
            Loại xe <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              id="type"
              name="type"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 px-3 text-sm outline-2"
              defaultValue=""
              aria-describedby="type-error"
            >
              <option value="" disabled>
                Chọn loại xe
              </option>
              <option value="Ghế">Ghế</option>
              <option value="Giường">Giường</option>
              <option value="Limousine">Limousine</option>
            </select>
          </div>
          <div id="type-error" aria-live="polite" aria-atomic="true">
            {errors.type?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/vehicles"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Hủy
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? 'Đang tạo...' : 'Tạo xe'}
        </button>
      </div>
    </form>
  );
}
