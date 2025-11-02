// app/users-client/page.tsx
"use client"; // 1. Đánh dấu đây là Client Component

import { useState, useEffect } from "react";

// Định nghĩa kiểu dữ liệu
interface User {
  id: number;
  name: string;
}

export default function UsersClientPage() {
  // 2. Sử dụng useState để lưu trạng thái
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 3. Sử dụng useEffect để gọi API khi component mount
  useEffect(() => {
    // Hàm fetch này chạy ở TRÌNH DUYỆT
    async function fetchUsers() {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await res.json();
        setUsers(data); // Cập nhật data vào state
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false); // Luôn tắt loading
      }
    }

    fetchUsers();
  }, []); // [] đảm bảo hàm chỉ chạy 1 lần khi component mount

  // 4. Hiển thị trạng thái "Loading..."
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // 5. Hiển thị danh sách
  return (
    <div>
      <h1>Danh sách Users (Client Component)</h1>
      <p>Trang này fetch dữ liệu ở trình duyệt.</p>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}