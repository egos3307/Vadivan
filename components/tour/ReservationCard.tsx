export default function ReservationCard() {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm sticky top-10">
      <p className="text-zinc-500">
        Başlayan fiyatlarla
      </p>

      <h2 className="text-5xl font-bold mt-3">
        ₺6500
      </h2>

      <form className="mt-8 flex flex-col gap-4">
        <input
          type="text"
          placeholder="Ad Soyad"
          className="h-14 rounded-2xl border px-5"
        />

        <input
          type="tel"
          placeholder="Telefon"
          className="h-14 rounded-2xl border px-5"
        />

        <select className="h-14 rounded-2xl border px-5">
          <option>15 - 19 Mayıs</option>
          <option>20 - 24 Mayıs</option>
        </select>

        <button className="h-14 rounded-2xl bg-black text-white font-semibold mt-2">
          Rezervasyon Yap
        </button>
      </form>
    </div>
  )
}
