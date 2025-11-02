import Link from 'next/link';
import NavLinks from '@/components/ui/dashboard/nav-links';
import Logo from '@/components/ui/dashboard/logo';
import { PowerIcon } from '@heroicons/react/24/outline';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-[#404e68] ">
      <Link
        className="mb-2 flex h-20 items-center justify-center rounded-md bg-[#404e68] p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40 bg-[#404e68]">
          <Logo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 ">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-[#404e68] md:block"></div>
        <form>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-[#536077] text-white p-3 font-medium hover:bg-red-500 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Đăng Xuất</div>
          </button>
        </form>
      </div>
    </div>
  );
}
