// Khai báo đây là Client Component. 
// Thành phần này sẽ được render trên trình duyệt, cho phép sử dụng hook React.
"use client";

import { useState, useEffect } from "react";

// Định nghĩa kiểu dữ liệu repo theo GitHub API
interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
}

export default function Page() {
  // State lưu danh sách repo, ban đầu là mảng rỗng
  const [repos, setRepos] = useState<Repo[]>([]);
  
  // State điều khiển trạng thái loading
  const [loading, setLoading] = useState(true);

  // useEffect chỉ chạy 1 lần khi component mount
  useEffect(() => {
    async function getRepos() {
      const res = await fetch("https://api.github.com/users/vercel/repos");
      const data: Repo[] = await res.json();

      // cập nhật state → trigger re-render
      setRepos(data);
      setLoading(false);
    }

    getRepos();
  }, []);

  // Nếu đang tải, hiện loading
  if (loading)
    return (
      <div className="max-w-2xl mx-auto p-6">
        <p className="text-lg text-gray-600 animate-pulse">
          Đang tải dữ liệu...
        </p>
      </div>
    );

  // Khi đã có dữ liệu
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">
        Danh sách Repository (Client Fetch)
      </h2>

      <ul className="space-y-2">
        {repos.map((repo) => (
          <li
            key={repo.id}
            className="p-3 border rounded-lg hover:bg-gray-50 transition"
          >
            <a
              href={repo.html_url}
              target="_blank"
              className="text-blue-600 font-medium hover:underline"
            >
              {repo.name}
            </a>

            <p className="text-sm text-gray-500">
              {repo.description || "Không có mô tả"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
