export default function RecentReservations() {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm mt-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-zinc-500">
            Son İşlemler
          </p>

          <h2 className="text-3xl font-bold mt-2">
            Son Rezervasyonlar
          </h2>
        </div>
      </div>

      <div className="space-y-5">
        <div className="flex items-center justify-between border rounded-2xl p-5">
          <div>
            <h3 className="font-semibold text-lg">
              Ahmet Yılmaz
            </h3>

            <p className="text-zinc-500 mt-1">
              Görkemli Van Turu
            </p>
          </div>

          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm">
            Ödendi
          </span>
        </div>

        <div className="flex items-center justify-between border rounded-2xl p-5">
          <div>
            <h3 className="font-semibold text-lg">
              Mehmet Kaya
            </h3>

            <p className="text-zinc-500 mt-1">
              Akdamar Premium
            </p>
          </div>

          <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm">
            Bekliyor
          </span>
        </div>
      </div>
    </div>
  )
}
