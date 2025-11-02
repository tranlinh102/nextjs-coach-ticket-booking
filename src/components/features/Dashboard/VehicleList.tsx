"use client";

import { useEffect, useState } from "react";
import { getVehicles, deleteVehicle, type Vehicle } from "@/services/vehicle.service";

export default function VehicleList() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  // Fetch vehicles khi component mount
  useEffect(() => {
    fetchVehicles();
  }, []);

  async function fetchVehicles() {
    try {
      setLoading(true);
      setError(null);
      const data = await getVehicles();
      setVehicles(data);
    } catch (err) {
      setError("Không thể tải danh sách xe. Vui lòng thử lại.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Bạn có chắc muốn xóa xe này?")) return;

    try {
      setDeleting(id);
      await deleteVehicle(id);
      // Refresh list
      await fetchVehicles();
      alert("Xóa xe thành công!");
    } catch (err) {
      alert("Không thể xóa xe. Vui lòng thử lại.");
      console.error(err);
    } finally {
      setDeleting(null);
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        <p>{error}</p>
        <button
          onClick={fetchVehicles}
          className="mt-2 text-sm underline hover:no-underline"
        >
          Thử lại
        </button>
      </div>
    );
  }

  // Empty state
  if (vehicles.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500 mb-4">Chưa có xe nào trong hệ thống</p>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Thêm xe mới
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Danh sách xe ({vehicles.length})
        </h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          + Thêm xe mới
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Biển số
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Loại xe
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Số ghế
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày tạo
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {vehicle.licensePlate}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{vehicle.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{vehicle.seatCapacity} ghế</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      vehicle.status === "Hoạt động"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {vehicle.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(vehicle.createdAt).toLocaleDateString("vi-VN")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    className="text-blue-600 hover:text-blue-900 mr-4"
                    onClick={() => alert(`Edit vehicle ${vehicle.id}`)}
                  >
                    Sửa
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900 disabled:opacity-50"
                    onClick={() => handleDelete(vehicle.id)}
                    disabled={deleting === vehicle.id}
                  >
                    {deleting === vehicle.id ? "Đang xóa..." : "Xóa"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Refresh button */}
      <div className="flex justify-end">
        <button
          onClick={fetchVehicles}
          className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
        >
          🔄 Làm mới
        </button>
      </div>
    </div>
  );
}
