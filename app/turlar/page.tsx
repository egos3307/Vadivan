import TourCard from '@/components/tour/TourCard'

export default function ToursPage() {
  return (
    <main className="min-h-screen bg-[#f8f8f8] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-14">
          <p className="text-zinc-500 uppercase tracking-widest text-sm">
            VadiVan Gezi
          </p>

          <h1 className="text-6xl font-bold mt-3">
            Turlarımız
          </h1>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TourCard
            title="Görkemli Van Turu"
            image="/images/tour-1.jpg"
            location="Van"
            duration="3 Gün"
            price={6500}
          />

          <TourCard
            title="Akdamar Premium"
            image="/images/tour-2.jpg"
            location="Van Gölü"
            duration="2 Gün"
            price={4200}
          />

          <TourCard
            title="Doğu Anadolu Keşfi"
            image="/images/tour-3.jpg"
            location="Doğu Anadolu"
            duration="5 Gün"
            price={12900}
          />
        </div>
      </div>
    </main>
  )
}
