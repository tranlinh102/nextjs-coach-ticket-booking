export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-50">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-2xl font-semibold text-blue-600 mb-2">
          Trang chủ
        </h1>
        <p className="text-gray-600 mb-4">
          Đây là trang Home — hãy thử truy cập Dashboard bí mật nhé!
        </p>

        <div className="space-y-3">
          <a
            href="/dashboard"
            className="block bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
          >
            Vào Dashboard không có password
          </a>

          <a
            href="/dashboard?password=123456"
            className="block bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg"
          >
            Vào Dashboard với password đúng
          </a>
        </div>
      </div>
    </div>
  );
}
