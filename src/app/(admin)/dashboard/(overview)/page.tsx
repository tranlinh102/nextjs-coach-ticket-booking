import CardWrapper from '@/components/ui/dashboard/cards';
import RevenueChart from '@/components/ui/dashboard/revenue-chart';
import LatestTickets from '@/components/ui/dashboard/latest-tickets';
import { lusitana } from '@/components/ui/fonts';
import { fetchCardData } from '@/lib/data';
import { Suspense } from 'react';
import {
  RevenueChartSkeleton,
  LatestTicketsSkeleton,
  CardsSkeleton,
} from '@/components/ui/skeletons';

export default async function Page() {
  const {
    numberOfTickets,
    numberOfCustomers,
    totalPaidTickets,
    totalBookedTickets,
  } = await fetchCardData();

  return (
    <main>
      <h1
        className={`${lusitana.className} mb-6 text-3xl md:text-3xl font-bold tracking-wide text-gray-800 drop-shadow-sm`}
      >
        DASHBOARD
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense> 
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestTicketsSkeleton />}>
          <LatestTickets />
        </Suspense>
      </div>
    </main>
  );
}