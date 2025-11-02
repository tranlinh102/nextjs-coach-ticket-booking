import { BriefcaseIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/components/ui/fonts';

export default function Logo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center gap-2 rounded-xl px-3 py-2 shadow-sm `}
    >
      <BriefcaseIcon className="h-10 w-10 text-white/90" />
      <p className="text-3xl font-semibold text-white tracking-wide">
        Admin
      </p>
    </div>
  );
}
