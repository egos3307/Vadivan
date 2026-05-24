export default function TourDetailPage() {
  return (
    <main className="bg-[#f8f8f8] min-h-screen pb-20">
      <div className="h-[70vh] relative">
        <img
          src="/images/tour-1.jpg"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute bottom-12 left-12 text-white">
          <p className="uppercase tracking-widest text-sm text-white/70">
            Premium Tur
          </p>

          <h1 className="text-6xl font-bold mt-4">
            Görkemli Van Turu
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-16 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <h2 className="text-3xl font-bold">
              Tur Programı
            </h2>

            <div className="mt-8 space-y-6">
              <div className="border rounded-2xl p-6">
                <p className="text-zinc-500 text-sm">
                  Gün 1
                </p>

                <h3 className="text-2xl font-bold mt-2">
                  Van Şehir Turu
                </h3>
              </div>

              <div className="border rounded-2xl p-6">
                <p className="text-zinc-500 text-sm">
                  Gün 2
                </p>

                <h3 className="text-2xl font-bold mt-2">
                  Akdamar Adası
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-3xl p-8 shadow-sm sticky top-10">
            <p className="text-zinc-500">
              Başlayan fiyatlarla
            </p>

            <h2 className="text-5xl font-bold mt-3">
              ₺6500
            </h2>

            <button className="w-full h-14 rounded-2xl bg-black text-white mt-8 font-semibold">
              Rezervasyon Yap
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
