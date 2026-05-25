export default function HomePage() {
  return (
    <main className="bg-[#f6f6f6] overflow-hidden">
      <section className="relative h-screen flex items-center">
        <img
          src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=2070&auto=format&fit=crop"
          className="absolute inset-0 w-full h-full object-cover scale-105 animate-pulse"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          <div className="max-w-4xl text-white">
            <span className="bg-[#c88a2b] text-white px-5 py-2 rounded-full text-sm tracking-widest uppercase">
              Premium Deneyim
            </span>

            <h1 className="text-6xl md:text-8xl font-black leading-[0.95] mt-8">
              Mezopotamya'nın
              Kalbinde
              Unutulmaz Yolculuklar
            </h1>

            <p className="mt-8 text-xl text-white/80 max-w-2xl leading-relaxed">
              Van Gölü kıyısından Nemrut Krateri'ne uzanan eşsiz keşif rotaları.
            </p>

            <div className="mt-10 flex flex-wrap gap-5">
              <button className="bg-white text-black px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition duration-300 shadow-2xl">
                Turları Keşfet
              </button>

              <button className="border border-white/30 backdrop-blur-xl px-8 py-4 rounded-2xl hover:bg-white/10 transition duration-300">
                Hemen Rezervasyon
              </button>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex gap-6 bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 w-[90%] max-w-5xl">
            <input
              placeholder="Nereye Gitmek İstersiniz?"
              className="flex-1 h-14 rounded-2xl bg-white/10 border border-white/10 px-5 text-white placeholder:text-white/60 outline-none"
            />

            <input
              placeholder="Tarih"
              className="flex-1 h-14 rounded-2xl bg-white/10 border border-white/10 px-5 text-white placeholder:text-white/60 outline-none"
            />

            <button className="bg-[#c88a2b] px-10 rounded-2xl text-white font-semibold hover:scale-105 transition">
              Ara
            </button>
          </div>
        </div>
      </section>

      <section className="py-28 max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="uppercase tracking-[0.3em] text-sm text-zinc-500">
              Öne Çıkan Deneyimler
            </p>

            <h2 className="text-6xl font-bold mt-5 leading-tight">
              Premium Tur Koleksiyonu
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1,2,3].map((item) => (
            <div key={item} className="group bg-white rounded-[32px] overflow-hidden shadow-sm hover:-translate-y-3 transition duration-500 hover:shadow-2xl">
              <div className="relative h-80 overflow-hidden">
                <img
                  src={`https://picsum.photos/600/80${item}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-sm uppercase tracking-widest text-white/70">
                    Van / Premium
                  </p>

                  <h3 className="text-3xl font-bold mt-2">
                    Görkemli Van Turu
                  </h3>
                </div>
              </div>

              <div className="p-7">
                <div className="flex items-center justify-between text-zinc-500">
                  <span>3 Gün</span>
                  <span>⭐ 4.9</span>
                </div>

                <div className="flex items-center justify-between mt-8">
                  <div>
                    <p className="text-zinc-500 text-sm">
                      Başlayan fiyatlarla
                    </p>

                    <h4 className="text-4xl font-black mt-1">
                      ₺6500
                    </h4>
                  </div>

                  <button className="w-14 h-14 rounded-2xl bg-black text-white hover:bg-[#c88a2b] transition">
                    →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
