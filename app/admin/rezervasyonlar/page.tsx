import AdminSidebar from '@/components/admin/AdminSidebar'

export default function ReservationsPage() {
  return (
    <main className="flex min-h-screen bg-[#f5f5f5]">
      <AdminSidebar />

      <div className="flex-1 p-8">
        <div className="mb-10">
          <p className="text-zinc-500">Rezervasyon Yönetimi</p>
          <h1 className="text-4xl font-bold mt-2">
            Rezervasyonlar
          </h1>
        </div>

        <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
          <table className="w-full">
            <thead className="border-b">
              <tr>
                <th className="text-left p-6">Müşteri</th>
                <th className="text-left p-6">Telefon</th>
                <th className="text-left p-6">Tur</th>
                <th className="text-left p-6">Durum</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="p-6">Ahmet Yılmaz</td>
                <td className="p-6">0555 555 55 55</td>
                <td className="p-6">Görkemli Van Turu</td>
                <td className="p-6">
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                    Bekliyor
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
