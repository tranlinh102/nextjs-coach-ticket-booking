import {
  HomeIcon,
  TruckIcon,
} from '@heroicons/react/24/outline';

export type NavLink = {
  name: string;
  href: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  title: string; // Title cho page
};

// Config cho tất cả các routes trong dashboard
export const dashboardRoutes: NavLink[] = [
  { 
    name: 'Trang chủ', 
    href: '/dashboard', 
    icon: HomeIcon,
    title: 'Tổng quan'
  },
  { 
    name: 'Danh mục xe', 
    href: '/dashboard/vehicles', 
    icon: TruckIcon,
    title: 'Danh mục xe'
  },
];

// Helper function để lấy title dựa vào pathname
export function getPageTitle(pathname: string): string {
  const route = dashboardRoutes.find(r => r.href === pathname);
  return route?.title || 'Dashboard';
}
