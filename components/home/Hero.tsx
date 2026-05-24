import Navbar from "../layout/Navbar";

export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden">
      <img
        src="/images/hero.jpg"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/50" />

      <Navbar />

      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 text-white">
          <h1 className="text-6xl font-bold max-w-4xl leading-tight">
            Van'ın En Özel
            Gezi Deneyimi
          </h1>

          <p className="mt-6 text-lg text-white/80 max-w-2xl">
            Premium turlar, profesyonel rehberlik ve unutulmaz anılar.
          </p>

          <div className="mt-8 flex gap-4">
            <a
              href="/turlar"
              className="bg-white text-black px-7 py-4 rounded-2xl font-semibold"
            >
              Turları Keşfet
            </a>

            <a
              href="/iletisim"
              className="border border-white/30 px-7 py-4 rounded-2xl"
            >
              İletişim
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
