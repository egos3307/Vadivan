import Navbar from '@/components/layout/Navbar'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#f6f4ef]">
      <Navbar />
      
      <div className="admin-layout-wrapper">
        <aside className="admin-aside">
          <AdminSidebar />
        </aside>
        
        <main className="admin-main">
          {children}
        </main>
      </div>
    </div>
  )
}
