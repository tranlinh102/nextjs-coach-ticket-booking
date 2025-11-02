import Form from '@/components/ui/tickets/create-form';
import Breadcrumbs from '@/components/ui/tickets/breadcrumbs';
import { fetchCustomers,fetchTrips } from '@/lib/data';
 
export default async function Page() {
  const customers = await fetchCustomers();
  const trips = await fetchTrips();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Vé Xe', href: '/dashboard/tickets' },
          {
            label: 'Thêm vé xe',
            href: '/dashboard/tickets/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} trips={trips} />
    </main>
  );
}