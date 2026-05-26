import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="site-container" style={{ display: 'flex', justifyContent: 'flex-end', padding: '5px 0', borderBottom: '1px solid rgba(0,0,0,0.05)', gap: '15px' }}>
        <Link href="/admin" style={{ fontSize: '0.75rem', color: '#888', fontWeight: '600' }}>
          Yönetim Paneli
        </Link>
      </div>
      <div className="site-container nav-inner">
        <Link href="/" className="brand">
          <span style={{ color: '#8a4f17' }}>VadiVan</span> <span style={{ color: '#c47a25' }}>Gezi</span>
        </Link>

        <nav className="nav-links" aria-label="Ana menü">
          <Link href="/">Anasayfa</Link>
          <Link href="/turlar">Turlarımız</Link>
          <Link href="/hakkimizda">Hakkımızda</Link>
          <Link href="/iletisim">İletişim</Link>
        </nav>

        <Link href="/rezervasyon" className="nav-cta" style={{ background: '#8a4f17', borderRadius: '24px', padding: '10px 28px', fontSize: '0.9rem' }}>
          Hemen Rezervasyon Yap
        </Link>
      </div>
    </header>
  )
}

