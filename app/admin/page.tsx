import AdminSidebar from '@/components/admin/AdminSidebar'
import DashboardStats from '@/components/admin/DashboardStats'
import RecentReservations from '@/components/admin/RecentReservations'

export default function AdminDashboard() {
  return (
    <main className="flex min-h-screen bg-[#f5f5f5]">
      <AdminSidebar />

      <div className="flex-1 p-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-zinc-500">Admin Panel</p>
            <h1 className="text-4xl font-bold mt-2">
              Dashboard
            </h1>
          </div>
        </div>

        <DashboardStats />

        <RecentReservations />
      </div>
    </main>
  )
}
