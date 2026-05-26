import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h2 style={{ fontWeight: '900' }}>
            <span style={{ color: '#f3bd72' }}>VadiVan</span> <span style={{ color: '#fff' }}>Gezi</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
            Doğu’nun kalbinde, her yolculuğu bir hikayeye dönüştürüyoruz.
          </p>
          <div style={{ display: 'flex', gap: '15px' }}>
             {/* Social Media Placeholders */}
             <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'grid', placeItems: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
             </div>
             <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'grid', placeItems: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
             </div>
             <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'grid', placeItems: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
             </div>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>Hızlı Bağlantılar</h3>
          <div className="footer-links" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link href="/">Anasayfa</Link>
            <Link href="/turlar">Turlarımız</Link>
            <Link href="/hakkimizda">Hakkımızda</Link>
            <Link href="/iletisim">İletişim</Link>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>Kurumsal</h3>
          <div className="footer-links" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link href="/">Kullanım Koşulları</Link>
            <Link href="/">Gizlilik Politikası</Link>
            <Link href="/">KVKK</Link>
            <div style={{ marginTop: '10px' }}>
              <p style={{ fontSize: '0.85rem', marginBottom: '10px', color: '#f3bd72' }}>Bizi Takip Edin</p>
              <a 
                href="https://www.instagram.com/vadivangezi?igsh=MWdybDVzc2lkZms5bA==" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#fff' }}
              >
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', display: 'grid', placeItems: 'center' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </div>
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>İletişim</h3>
          <div className="footer-links" style={{ display: 'flex', flexDirection: 'column', gap: '10px', color: 'rgba(255,255,255,0.7)' }}>
            <span>Van, Türkiye</span>
            <span>info@vadivangezi.com</span>
            <div style={{ marginTop: '15px', borderRadius: '12px', overflow: 'hidden', height: '100px', background: '#333' }}>
               {/* Map Placeholder */}
               <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=400&auto=format&fit=crop" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: '0.6' }} />
            </div>
          </div>
        </div>
      </div>
      <div className="site-container" style={{ marginTop: '60px', paddingTop: '30px', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
        © 2024 VadiVan Gezi. Tüm hakları saklıdır.
      </div>
    </footer>
  )
}
