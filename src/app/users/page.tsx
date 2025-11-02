// app/users/page.tsx

// Định nghĩa kiểu dữ liệu cho User
interface User {
  id: number;
  name: string;
  email: string;
}

/**
 * Đây là một Server Component (vì không có "use client").
 * Nó chạy hoàn toàn trên server.
 */
export default async function UsersPage() {
  let users: User[] = [];
  let error: string | null = null;

  try {
    // 1. Server sẽ "chờ" (await) tại đây cho đến khi API trả về
    const res = await fetch('https://jsonplaceholder.typicode.com/users', {
      // Tùy chọn cache: 'no-store' để luôn lấy dữ liệu mới nhất
      cache: 'no-store', 
    });

    if (!res.ok) {
      throw new Error('Failed to fetch users');
    }

    users = await res.json();
  } catch (err) {
    error = err instanceof Error ? err.message : 'An unknown error occurred';
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Danh sách Users (Server Component)</h1>
      <p>Trang này được render trên server.</p>
      <ul>
        {/* 2. Dữ liệu được lặp và render ra HTML ngay trên server */}
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}