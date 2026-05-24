export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f8f8f8] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-sm uppercase tracking-widest text-zinc-500">
            İletişim
          </p>

          <h1 className="text-6xl font-bold mt-4 leading-tight">
            Bizimle İletişime Geçin
          </h1>

          <p className="mt-6 text-zinc-600 text-lg leading-relaxed">
            Tur rezervasyonları ve detaylı bilgi için bize ulaşabilirsiniz.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 mt-20">
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <h2 className="text-3xl font-bold">
              Mesaj Gönder
            </h2>

            <form className="mt-8 flex flex-col gap-5">
              <input
                type="text"
                placeholder="Ad Soyad"
                className="h-14 rounded-2xl border px-5"
              />

              <input
                type="email"
                placeholder="E-posta"
                className="h-14 rounded-2xl border px-5"
              />

              <input
                type="tel"
                placeholder="Telefon"
                className="h-14 rounded-2xl border px-5"
              />

              <textarea
                placeholder="Mesajınız"
                className="rounded-2xl border p-5 min-h-[180px]"
              />

              <button className="h-14 rounded-2xl bg-black text-white font-semibold">
                Gönder
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <h3 className="text-2xl font-bold">
                Telefon
              </h3>

              <p className="mt-4 text-zinc-600 text-lg">
                +90 555 555 55 55
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <h3 className="text-2xl font-bold">
                E-posta
              </h3>

              <p className="mt-4 text-zinc-600 text-lg">
                info@vadivangezi.com
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <h3 className="text-2xl font-bold">
                Adres
              </h3>

              <p className="mt-4 text-zinc-600 text-lg leading-relaxed">
                Van Merkez / Türkiye
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
