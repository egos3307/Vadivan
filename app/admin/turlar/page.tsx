import AdminSidebar from '@/components/admin/AdminSidebar'

export default function AdminToursPage() {
  return (
    <main className="flex min-h-screen bg-[#f5f5f5]">
      <AdminSidebar />

      <div className="flex-1 p-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-zinc-500">Tur Yönetimi</p>
            <h1 className="text-4xl font-bold mt-2">
              Turlar
            </h1>
          </div>

          <button className="bg-black text-white px-6 py-4 rounded-2xl">
            Yeni Tur Ekle
          </button>
        </div>

        <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
          <table className="w-full">
            <thead className="border-b">
              <tr>
                <th className="text-left p-6">Tur</th>
                <th className="text-left p-6">Konum</th>
                <th className="text-left p-6">Süre</th>
                <th className="text-left p-6">Durum</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="p-6">Görkemli Van Turu</td>
                <td className="p-6">Van</td>
                <td className="p-6">3 Gün</td>
                <td className="p-6">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    Aktif
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
