// Định nghĩa kiểu dữ liệu cho mỗi repository trả về từ GitHub API
// Giúp đảm bảo tính an toàn kiểu (type safety) khi xử lý dữ liệu
interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
}

// Next.js Server Component (mặc định) - chạy trên server
// Không cần "use client", có thể gọi API trực tiếp bằng async/await
export default async function Page() {

  // Gửi request đến GitHub API để lấy danh sách repository của tổ chức Vercel
  // cache: "no-store" đảm bảo mỗi lần tải trang sẽ luôn lấy dữ liệu mới nhất
  const res = await fetch("https://api.github.com/users/vercel/repos", {
    cache: "no-store",
  });

  // Chuyển dữ liệu JSON thành dạng mảng Repo[] đã khai báo bên trên
  const repos: Repo[] = await res.json();

  // JSX hiển thị danh sách repository ra giao diện
  return (
    <div className="max-w-2xl mx-auto p-6">
      
      {/* Tiêu đề trang */}
      <h1 className="text-2xl font-semibold mb-4">
        Danh sách Repository (Server Fetch)
      </h1>

      {/* Danh sách các repository */}
      <ul className="space-y-2">
        {repos.map((repo) => (
          
          // Mỗi repo hiển thị trong một thẻ <li>
          <li
            key={repo.id}
            className="p-3 border rounded-lg hover:bg-gray-50 transition"
          >
            
            {/* Tên repository (kèm link đến GitHub repo) */}
            <a
              href={repo.html_url}
              target="_blank"
              className="text-blue-600 font-medium hover:underline"
            >
              {repo.name}
            </a>

            {/* Mô tả repo, nếu null thì hiển thị thông báo thay thế */}
            <p className="text-sm text-gray-500">
              {repo.description || "Không có mô tả"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
