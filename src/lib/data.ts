import postgres from 'postgres';
import {
  CustomerField,
  CustomersTableType,
  TicketForm,
  TicketsTable,
  Trip,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchRevenue() {
  try {

    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue[]>`SELECT * FROM revenue`;

    console.log('Data fetch completed after 3 seconds.');

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestTickets() {
  try {
    const data = await sql`
      SELECT 
        t.ticket_code,
        c.name AS customer_name,
        tr.route_name AS trip_name,
        t.price_paid
      FROM tickets t
      JOIN customers c ON t.customer_id = c.id
      JOIN trips tr ON t.trip_id = tr.id
      ORDER BY t.created_at DESC
      LIMIT 5;
    `;
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest tickets.');
  }
}


export async function fetchCardData() {
  try {
    // Truy vấn tổng số vé
    const ticketCountPromise = sql`SELECT COUNT(*) FROM tickets`;

    // Truy vấn tổng số khách hàng
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;

    // Truy vấn tổng tiền theo trạng thái vé
    const ticketStatusPromise = sql`
      SELECT
        SUM(CASE WHEN status = 'paid' THEN price_paid ELSE 0 END) AS "paid",
        SUM(CASE WHEN status = 'booked' THEN price_paid ELSE 0 END) AS "booked",
        SUM(CASE WHEN status = 'canceled' THEN price_paid ELSE 0 END) AS "canceled"
      FROM tickets
    `;

    const data = await Promise.all([
      ticketCountPromise,
      customerCountPromise,
      ticketStatusPromise,
    ]);

    // Lấy dữ liệu ra
    const numberOfTickets = Number(data[0][0].count ?? "0");
    const numberOfCustomers = Number(data[1][0].count ?? "0");
    const totalPaidTickets = formatCurrency(data[2][0].paid ?? "0");
    const totalBookedTickets = formatCurrency(data[2][0].booked ?? "0");

    return {
      numberOfTickets,
      numberOfCustomers,
      totalPaidTickets,
      totalBookedTickets,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch ticket card data.");
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredTickets(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const tickets = await sql<TicketsTable[]>`
      SELECT
        tickets.id,
        tickets.price_paid,
        tickets.sold_at,
        tickets.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM tickets
      JOIN customers ON tickets.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        tickets.ticket_code::text ILIKE ${`%${query}%`} OR
        tickets.sold_at::text ILIKE ${`%${query}%`} OR
        tickets.status ILIKE ${`%${query}%`}
      ORDER BY tickets.sold_at DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return tickets;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tickets.');
  }
}

export async function fetchTicketsPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM tickets
    JOIN customers ON tickets.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      tickets.ticket_code::text ILIKE ${`%${query}%`} OR
      tickets.sold_at::text ILIKE ${`%${query}%`} OR
      tickets.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of tickets.');
  }
}
//
export async function fetchTicketById(id: string) {
  try {
    const data = await sql<TicketForm[]>`
      SELECT
        tickets.id,
        tickets.customer_id,
        tickets.price_paid,
        tickets.status
      FROM tickets
      WHERE tickets.id = ${id};
    `;

    const ticket  = data.map((ticket ) => ({
      ...ticket ,
      price_paid: ticket .price_paid / 100,
    }));

    console.log(ticket );
    return ticket [0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch ticket .');
  }
}

export async function fetchCustomers() {
  try {
    const customers = await sql<CustomerField[]>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchTrips() {
  try {
    const trips = await sql<Trip[]>`
      SELECT
        id,
        route_name
      FROM trips
      ORDER BY route_name ASC
    `;
    return trips;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all trips.');
  }
}

//
export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType[]>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(tickets.id) AS total_tickets,
		  SUM(CASE WHEN tickets.status = 'pending' THEN tickets.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN tickets.status = 'paid' THEN tickets.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN tickets ON customers.id = tickets.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}
