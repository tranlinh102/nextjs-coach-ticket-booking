export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Ticket = {
  id: string;
  customer_id: string;
  price_paid: number;
  status: 'booked' | 'paid' | 'canceled';
  sold_at: string;     
};

export type Trip = {
  id: string;
  route_name: string;
  price_paid: number;
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestTicket = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  price_paid: string;
};

export type LatestTicketRaw = Omit<LatestTicket, 'ticket_code'> & {
  ticket_code: string;
};

export type TicketsTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  sold_at: string;
  price_paid: number;
  status: 'booked' | 'paid' | 'canceled';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_tickets: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_tickets: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type TicketForm = {
  id: string;
  customer_id: string;
  price_paid: number;
  status: 'booked' | 'paid' | 'canceled';
};

export type TripField = {
  id: string;
  route_name: string;
};

