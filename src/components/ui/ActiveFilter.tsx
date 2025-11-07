'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function ActiveFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentActive = searchParams.get('active');

  const handleFilterChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (value === 'all') {
      params.delete('active');
    } else {
      params.set('active', value);
    }
    
    // Reset về trang 1 khi thay đổi filter
    params.set('page', '1');
    
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="active-filter" className="text-sm font-medium text-gray-700">
        Trạng thái:
      </label>
      <select
        id="active-filter"
        value={currentActive === null ? 'true' : currentActive}
        onChange={(e) => handleFilterChange(e.target.value)}
        className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option value="true">Đang hoạt động</option>
        <option value="false">Đã xóa</option>
      </select>
    </div>
  );
}
