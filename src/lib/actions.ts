'use server';
import { z } from 'zod';
import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Vui lòng chọn 1 khách hàng.',
  }),
  tripId: z.string({
    invalid_type_error: 'Vui lòng chọn 1 chuyến đi.',
  }),
  price_paid: z.coerce.number().gt(0, {
    message: 'Vui lòng nhập số tiền lớn hơn 0.',
  }),
  status: z.enum(['booked', 'paid', 'canceled'], {
    invalid_type_error: 'Vui lòng chọn trạng thái hợp lệ.',
  }),
  date: z.string(),
});

const CreateTicket = FormSchema.omit({ id: true, date: true });
const UpdateTicket = FormSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    customerId?: string[];
    tripId?: string[];
    price_paid?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createTicket(prevState: State, formData: FormData) {
  const validatedFields = CreateTicket.safeParse({
    customerId: formData.get('customerId'),
    tripId: formData.get('tripId'),
    price_paid: formData.get('price_paid'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Thiếu thông tin.',
    };
  }

  const { customerId, tripId, price_paid, status } = validatedFields.data;
  const ticketCode = `VE-${Date.now()}`;
  
  try {
    await sql`
        INSERT INTO tickets (ticket_code, customer_id, trip_id, price_paid, status)
        VALUES (${ticketCode}, ${customerId}, ${tripId}, ${price_paid}, ${status})
    `;
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Lỗi cơ sở dữ liệu: Không thể tạo vé.' };
  }

  revalidatePath('/dashboard/tickets');
  redirect('/dashboard/tickets');
}

export async function updateTicket(id: string, prevState: State, formData: FormData) {
  const validatedFields = UpdateTicket.safeParse({
    customerId: formData.get('customerId'),
    tripId: formData.get('tripId'),
    price_paid: formData.get('price_paid'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Thiếu thông tin. Không thể cập nhật vé.',
    };
  }

  const { customerId, tripId, price_paid, status } = validatedFields.data;

  try {
    await sql`
      UPDATE tickets
      SET customer_id = ${customerId}, trip_id = ${tripId}, price_paid = ${price_paid}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Lỗi cơ sở dữ liệu: Không thể cập nhật vé.' };
  }

  revalidatePath('/dashboard/tickets');
  redirect('/dashboard/tickets');
}

export async function deleteTicket(id: string) {
  await sql`DELETE FROM tickets WHERE id = ${id}`;
  revalidatePath('/dashboard/tickets');
}
