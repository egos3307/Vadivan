export default function HomePage() {
  return (
    <main className="bg-[#f5f5f5] min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <h1 className="text-2xl font-black text-[#9a5b17]">
            VadiVan Gezi
          </h1>

          <nav className="hidden md:flex items-center gap-10 text-sm font-medium text-zinc-700">
            <a href="/">Anasayfa</a>
            <a href="/turlar">Turlarımız</a>
            <a href="/hakkimizda">Hakkımızda</a>
            <a href="/iletisim">İletişim</a>
          </nav>

          <button className="bg-[#a96718] text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 transition duration-300">
            Rezervasyon Yap
          </button>
        </div>
      </header>

      <section className="relative h-screen overflow-hidden flex items-center">
        <img
          src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=2070&auto=format&fit=crop"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />

        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20">
          <div className="max-w-4xl text-white">
            <span className="bg-[#c88a2b] px-5 py-2 rounded-full text-sm uppercase tracking-widest font-semibold">
              Premium Tur Deneyimi
            </span>

            <h2 className="text-6xl md:text-8xl font-black leading-[0.95] mt-8">
              Mezopotamya'nın
              <span className="block text-[#dca35d]">
                Kalbinde Yolculuk
              </span>
            </h2>

            <p className="mt-8 text-xl text-white/80 max-w-2xl leading-relaxed">
              Van Gölü kıyısından Nemrut Krateri'ne uzanan eşsiz keşif rotaları.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-28">
        <div className="text-center max-w-3xl mx-auto">
          <p className="uppercase tracking-[0.3em] text-sm text-zinc-500">
            Yakında
          </p>

          <h3 className="text-5xl md:text-6xl font-black mt-6 leading-tight text-zinc-900">
            Yeni Turlar Çok Yakında
          </h3>

          <p className="mt-8 text-xl text-zinc-600 leading-relaxed">
            Şu anda admin panelinden henüz tur eklenmedi. Yeni premium rotalar eklendiğinde burada otomatik olarak yayınlanacak.
          </p>
        </div>

        <div className="mt-16 bg-white rounded-[40px] p-14 shadow-xl border border-zinc-100 text-center max-w-5xl mx-auto">
          <div className="w-24 h-24 rounded-full bg-[#f4e4d0] flex items-center justify-center mx-auto text-5xl">
            ✈️
          </div>

          <h4 className="text-4xl font-black mt-8 text-zinc-900">
            Henüz Aktif Tur Bulunmuyor
          </h4>

          <p className="mt-6 text-zinc-600 text-lg leading-relaxed max-w-2xl mx-auto">
            Admin panelinden ilk tur oluşturulduğunda tüm rezervasyon sistemi, tarih seçimi ve kontenjan yönetimi otomatik aktif olacak.
          </p>
        </div>
      </section>

      <footer className="bg-[#161616] text-white py-20 mt-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
          <div>
            <h5 className="text-3xl font-black text-[#d39a58]">
              VadiVan Gezi
            </h5>

            <p className="mt-5 text-white/70 leading-relaxed">
              Van ve Doğu Anadolu'nun premium keşif deneyimi.
            </p>
          </div>

          <div>
            <h6 className="font-bold mb-5">Sayfalar</h6>
            <div className="flex flex-col gap-3 text-white/70">
              <a href="/">Anasayfa</a>
              <a href="/turlar">Turlarımız</a>
              <a href="/hakkimizda">Hakkımızda</a>
              <a href="/iletisim">İletişim</a>
            </div>
          </div>

          <div>
            <h6 className="font-bold mb-5">İletişim</h6>
            <div className="flex flex-col gap-3 text-white/70">
              <p>Van / Türkiye</p>
              <p>info@vadivangezi.com</p>
              <p>+90 555 555 55 55</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
