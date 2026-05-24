"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between text-white">
        <Link href="/" className="text-2xl font-bold">
          VadiVan Gezi
        </Link>

        <nav className="hidden md:flex gap-8">
          <Link href="/">Anasayfa</Link>
          <Link href="/turlar">Turlarımız</Link>
          <Link href="/hakkimizda">Hakkımızda</Link>
          <Link href="/iletisim">İletişim</Link>
        </nav>
      </div>
    </header>
  )
}
