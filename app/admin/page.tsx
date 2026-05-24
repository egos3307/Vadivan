export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-[#f5f5f5] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-zinc-500">Admin Panel</p>
            <h1 className="text-4xl font-bold mt-2">
              Dashboard
            </h1>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <p className="text-zinc-500">Toplam Rezervasyon</p>
            <h2 className="text-4xl font-bold mt-3">124</h2>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <p className="text-zinc-500">Aktif Turlar</p>
            <h2 className="text-4xl font-bold mt-3">8</h2>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <p className="text-zinc-500">Bugünkü Satış</p>
            <h2 className="text-4xl font-bold mt-3">₺48K</h2>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <p className="text-zinc-500">Bekleyen Ödeme</p>
            <h2 className="text-4xl font-bold mt-3">14</h2>
          </div>
        </div>
      </div>
    </main>
  )
}
