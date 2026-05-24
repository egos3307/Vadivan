import Link from 'next/link'

export default function AdminSidebar() {
  return (
    <aside className="w-72 min-h-screen bg-[#111] text-white p-6">
      <div>
        <h1 className="text-3xl font-bold">
          VadiVan
        </h1>

        <p className="text-white/50 mt-2 text-sm">
          Admin Panel
        </p>
      </div>

      <nav className="mt-12 flex flex-col gap-3">
        <Link href="/admin" className="p-4 rounded-2xl hover:bg-white/10 transition">
          Dashboard
        </Link>

        <Link href="/admin/turlar" className="p-4 rounded-2xl hover:bg-white/10 transition">
          Turlar
        </Link>

        <Link href="/admin/tarihler" className="p-4 rounded-2xl hover:bg-white/10 transition">
          Tarihler
        </Link>

        <Link href="/admin/rezervasyonlar" className="p-4 rounded-2xl hover:bg-white/10 transition">
          Rezervasyonlar
        </Link>

        <Link href="/admin/musteriler" className="p-4 rounded-2xl hover:bg-white/10 transition">
          Müşteriler
        </Link>
      </nav>
    </aside>
  )
}
