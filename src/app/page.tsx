// src/app/page.tsx
import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Trang Chủ</h1>
      <p>Đây là trang chủ của ứng dụng.</p>
      <ul>
        <li>
          <Link href="/users">Đi đến trang Users (Server)</Link>
        </li>
        <li>
          <Link href="/users-client">Đi đến trang Users (Client)</Link>
        </li>
      </ul>
    </div>
  );
}