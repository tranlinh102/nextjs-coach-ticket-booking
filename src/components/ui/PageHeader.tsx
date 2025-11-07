'use client';

import { usePathname } from 'next/navigation';
import { lusitana } from '@styles/fonts';
import { getPageTitle } from '@/lib/dashboard-routes';

export default function PageHeader() {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <div className="flex w-full items-center justify-between">
      <h1 className={`${lusitana.className} text-2xl`}>{title}</h1>
    </div>
  );
}
