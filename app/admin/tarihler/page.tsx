export default function DatesPage() {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-zinc-500">Tur Tarihleri</p>
          <h1 className="text-4xl font-bold mt-2">
            Tarih Yönetimi
          </h1>
        </div>

        <button className="bg-black text-white px-6 py-4 rounded-2xl">
          Tarih Ekle
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                Görkemli Van Turu
              </h2>

              <p className="text-zinc-500 mt-2">
                15 - 19 Mayıs 2026
              </p>
            </div>

            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm">
              12 / 20 Dolu
            </span>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="bg-[#f8f8f8] rounded-2xl p-4">
              <p className="text-zinc-500 text-sm">
                Fiyat
              </p>

              <h3 className="text-3xl font-bold mt-2">
                ₺6500
              </h3>
            </div>

            <div className="bg-[#f8f8f8] rounded-2xl p-4">
              <p className="text-zinc-500 text-sm">
                Kontenjan
              </p>

              <h3 className="text-3xl font-bold mt-2">
                20
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
