export default function Footer() {
  return (
    <footer className="bg-[#111] text-white py-20 mt-24">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-10">
        <div>
          <h2 className="text-3xl font-bold">
            VadiVan Gezi
          </h2>

          <p className="text-white/70 mt-5 leading-relaxed">
            Van ve Doğu Anadolu'nun eşsiz doğasını premium tur deneyimleriyle keşfedin.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-5">
            Sayfalar
          </h3>

          <div className="flex flex-col gap-3 text-white/70">
            <a href="/">Anasayfa</a>
            <a href="/turlar">Turlar</a>
            <a href="/hakkimizda">Hakkımızda</a>
            <a href="/iletisim">İletişim</a>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-5">
            İletişim
          </h3>

          <div className="flex flex-col gap-3 text-white/70">
            <p>+90 555 555 55 55</p>
            <p>info@vadivangezi.com</p>
            <p>Van / Türkiye</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
