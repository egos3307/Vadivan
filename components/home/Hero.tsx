export default function Hero() {
  return (
    <section className="home-hero">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="hero-video"
      >
        <source src="/hero-video.mov" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="hero-overlay" />

      <div className="hero-content">
        <h1>Hayalindeki Rotayı Keşfetmeye Hazır Mısın?</h1>
        <p>
          Karadeniz’in yeşilinden Akdeniz’in mavisine, tarihin sıfır noktasından
          dünyanın öbür ucuna... Güvenli, konforlu ve unutulmaz turlarla
          sınırları aşın.
        </p>

        <div className="filter-bar">
          <div className="filter-group">
            <label>Destinasyon</label>
            <select>
              <option>Tüm Destinasyonlar</option>
              <option>Van</option>
              <option>Mardin</option>
              <option>Rize</option>
              <option>Antalya</option>
              <option>Kapadokya</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Fiyat Aralığı</label>
            <select>
              <option>Tüm Fiyatlar</option>
              <option>0 - 5.000 TL</option>
              <option>5.000 - 15.000 TL</option>
              <option>15.000 - 30.000 TL</option>
              <option>30.000+ TL</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Tur Süresi</label>
            <select>
              <option>Tüm Süreler</option>
              <option>Günübirlik</option>
              <option>1-3 Gün</option>
              <option>4-7 Gün</option>
              <option>8+ Gün</option>
            </select>
          </div>
          <button className="filter-button">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            Filtrele
          </button>
        </div>
      </div>
    </section>
  )
}
