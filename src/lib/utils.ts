export function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

/**
 * Định dạng số tiền theo đơn vị tiền tệ (mặc định là VND).
 * Ví dụ: 1200000 -> 1.200.000 ₫
 */
export function formatCurrency(
  amount: number,
  currency: string = 'VND',
  locale: string = 'vi-VN'
): string {
  if (isNaN(amount)) return '-';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Chuyển đổi chuỗi ngày (ISO string hoặc Date) thành định dạng địa phương.
 * Ví dụ: "2025-11-03T12:00:00Z" -> "03/11/2025"
 */
export function formatDateToLocal(
  date: string | Date,
  locale: string = 'vi-VN'
): string {
  if (!date) return '-';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}
