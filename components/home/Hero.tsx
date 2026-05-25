export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=2070&auto=format&fit=crop')",
        }}
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="max-w-3xl text-white">
            <span className="mb-6 inline-flex rounded-full bg-orange-500/20 px-5 py-2 text-sm font-semibold text-orange-300 backdrop-blur-md border border-orange-400/30">
              VAN • PREMIUM TUR DENEYİMİ
            </span>

            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              Mezopotamya'nın
              <span className="block text-orange-400">
                Kalbinde Yolculuk
              </span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-zinc-200 max-w-2xl leading-relaxed">
              Van Gölü kıyısından Nemrut Krateri'ne uzanan eşsiz keşif rotaları.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button className="rounded-2xl bg-orange-500 px-8 py-4 font-bold text-white transition hover:scale-105 hover:bg-orange-400">
                Turları Keşfet
              </button>

              <button className="rounded-2xl border border-white/30 bg-white/10 px-8 py-4 font-bold text-white backdrop-blur-md transition hover:bg-white/20">
                Hemen Rezervasyon
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
