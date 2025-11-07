import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { isStaff } from "@/lib/roles";
import PageHeader from "@components/ui/PageHeader";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  // Check if user is staff
  if (!isStaff(session)) {
    redirect("/");
  }

  return (
    <div className="space-y-8">
      <PageHeader />
      
      <div className="bg-white rounded-lg shadow-md p-6">
        
        <div className="space-y-4">
          <div className="border-b pb-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Thông tin người dùng
            </h2>
            <div className="space-y-2 text-gray-600">
              <p><span className="font-medium">Tên:</span> {session.user?.name}</p>
              <p><span className="font-medium">Email:</span> {session.user?.email}</p>
              {session.user?.id && (
                <p><span className="font-medium">ID:</span> {session.user.id}</p>
              )}
              {session.user?.roles && (
                <div>
                  <span className="font-medium">Roles:</span>{" "}
                  <div className="flex gap-2 mt-1">
                    {session.user.roles.map((role) => (
                      <span
                        key={role}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {session.accessToken && (
            <div className="border-b pb-4">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Access Token
              </h2>
              <div className="bg-gray-50 p-3 rounded font-mono text-xs break-all">
                {session.accessToken.substring(0, 50)}...
              </div>
            </div>
          )}

          <div className="pt-4">
            <p className="text-sm text-gray-500">
              Bạn đã đăng nhập với role <strong>staff</strong> và có thể truy cập dashboard này.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
