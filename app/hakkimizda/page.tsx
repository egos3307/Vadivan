export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f8f8f8] pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-sm uppercase tracking-widest text-zinc-500">
          VadiVan Gezi
        </p>

        <h1 className="text-6xl font-bold mt-4 max-w-4xl leading-tight">
          Van’ın kültürünü ve doğasını premium deneyimlerle buluşturuyoruz.
        </h1>

        <div className="grid lg:grid-cols-2 gap-10 mt-20 items-center">
          <img
            src="/images/about.jpg"
            className="rounded-3xl h-[500px] object-cover w-full"
          />

          <div>
            <h2 className="text-4xl font-bold leading-tight">
              Profesyonel Tur Deneyimi
            </h2>

            <p className="mt-6 text-zinc-600 leading-relaxed text-lg">
              VadiVan Gezi olarak misafirlerimize sadece bir tur değil unutulmaz anılar sunuyoruz.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-10">
              <div className="bg-white rounded-3xl p-6 shadow-sm">
                <h3 className="text-4xl font-bold">
                  5K+
                </h3>

                <p className="text-zinc-500 mt-2">
                  Mutlu Misafir
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-sm">
                <h3 className="text-4xl font-bold">
                  120+
                </h3>

                <p className="text-zinc-500 mt-2">
                  Tur Organizasyonu
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
