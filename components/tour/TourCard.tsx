interface Props {
  title: string
  image: string
  location: string
  duration: string
  price: number
}

export default function TourCard({
  title,
  image,
  location,
  duration,
  price,
}: Props) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg">
      <div className="h-72 overflow-hidden">
        <img
          src={image}
          className="w-full h-full object-cover hover:scale-110 transition duration-700"
        />
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between text-sm text-zinc-500">
          <span>{location}</span>
          <span>{duration}</span>
        </div>

        <h3 className="text-2xl font-bold mt-3">
          {title}
        </h3>

        <div className="mt-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-zinc-500">
              Başlayan fiyatlarla
            </p>

            <h4 className="text-2xl font-bold">
              ₺{price}
            </h4>
          </div>

          <button className="bg-black text-white px-5 py-3 rounded-2xl">
            İncele
          </button>
        </div>
      </div>
    </div>
  )
}
