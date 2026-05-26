import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function ContactPage() {
  return (
    <main className="site-shell">
      <Navbar />

      <section className="page-hero" style={{ 
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2200&auto=format&fit=crop")',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#fff'
      }}>
        <div className="site-container">
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: '900', marginBottom: '20px' }}>Bize Ulaşın</h1>
          <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem', opacity: '0.9' }}>
            Unutulmaz Van anılarınız için yanınızdayız. Sorularınız, önerileriniz veya özel tur talepleriniz için formu doldurabilir ya da bizi ziyaret edebilirsiniz.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="site-container">
          <div className="detail-layout">
            <div className="info-panel" style={{ padding: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '30px', color: '#171717' }}>Mesaj Gönderin</h2>
              <form style={{ display: 'grid', gap: '20px' }}>
                <div className="form-row">
                  <label>
                    Adınız Soyadınız
                    <input type="text" placeholder="Örn: Ahmet Yılmaz" required />
                  </label>
                  <label>
                    E-posta Adresiniz
                    <input type="email" placeholder="ahmet@example.com" required />
                  </label>
                </div>
                <label>
                  Konu
                  <select required>
                    <option value="">Seçiniz</option>
                    <option value="bilgi">Tur Bilgisi Almak İstiyorum</option>
                    <option value="rezervasyon">Rezervasyon Talebi</option>
                    <option value="ozel">Özel Tur Talebi</option>
                    <option value="diger">Diğer</option>
                  </select>
                </label>
                <label>
                  Mesajınız
                  <textarea placeholder="Mesajınızı buraya yazınız..." required />
                </label>
                <button type="submit" className="button full" style={{ background: '#ff8c00', color: '#fff', fontSize: '1.1rem', padding: '15px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '10px' }}>
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                  Gönder
                </button>
              </form>
            </div>

            <aside style={{ display: 'grid', gap: '20px' }}>
              <div className="info-panel" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ padding: '10px', background: '#f3faf6', borderRadius: '12px', color: '#2a4d44' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div>
                  <h3 style={{ fontSize: '0.9rem', color: '#888', textTransform: 'uppercase', marginBottom: '5px' }}>Adres</h3>
                  <p style={{ fontWeight: '600' }}>Cumhuriyet Caddesi, No: 65, İpekyolu, Van / Türkiye</p>
                </div>
              </div>

              <div className="info-panel" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ padding: '10px', background: '#f3faf6', borderRadius: '12px', color: '#2a4d44' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <div>
                  <h3 style={{ fontSize: '0.9rem', color: '#888', textTransform: 'uppercase', marginBottom: '5px' }}>Telefon</h3>
                  <p style={{ fontWeight: '600' }}>+90 (432) 215 00 65</p>
                  <p style={{ fontSize: '0.8rem', color: '#888' }}>Pzt - Cmt, 09:00 - 18:00</p>
                </div>
              </div>

              <div className="info-panel" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ padding: '10px', background: '#f3faf6', borderRadius: '12px', color: '#2a4d44' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <div>
                  <h3 style={{ fontSize: '0.9rem', color: '#888', textTransform: 'uppercase', marginBottom: '5px' }}>E-posta</h3>
                  <p style={{ fontWeight: '600' }}>bilgi@vadivangezi.com</p>
                  <p style={{ fontWeight: '600' }}>rezervasyon@vadivangezi.com</p>
                </div>
              </div>

              <div style={{ borderRadius: '24px', overflow: 'hidden', position: 'relative', height: '250px' }}>
                <img 
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=600&auto=format&fit=crop" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)', display: 'grid', placeItems: 'center' }}>
                  <button className="button compact" style={{ background: '#fff', color: '#171717', borderRadius: '20px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
                    Yol Tarifi Al
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '10px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f6f4ef', display: 'grid', placeItems: 'center', color: '#888' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </div>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f6f4ef', display: 'grid', placeItems: 'center', color: '#888' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </div>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f6f4ef', display: 'grid', placeItems: 'center', color: '#888' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
