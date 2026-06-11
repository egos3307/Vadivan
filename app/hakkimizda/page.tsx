import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'

const values = [
  {
    title: 'Yerel uzmanlık',
    text: 'Rotalarımızı Van ve çevresini bilen rehberlerle, mevsime ve ziyaret saatlerine göre planlarız.',
  },
  {
    title: 'Düzenli operasyon',
    text: 'Ulaşım, mola, ziyaret noktası ve rezervasyon akışını tur başlamadan önce netleştiririz.',
  },
  {
    title: 'Misafir odaklılık',
    text: 'Kalabalık tempo yerine anlaşılır program, konforlu hareket ve güçlü iletişim kurarız.',
  },
]

export default function AboutPage() {
  return (
    <main className="site-shell">
      <Navbar />

      <section className="page-hero about-hero">
        <div className="site-container">
          <p className="eyebrow light">Hakkımızda</p>
          <h1>Van'ın doğasını ve kültürünü özenli tur deneyimlerine dönüştürüyoruz.</h1>
          <p>
            VadiVan Gezi, Van Gölü havzası ve Doğu Anadolu rotalarında güvenilir,
            planlı ve yerel bilgiye dayalı gezi organizasyonları sunar.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="site-container split align-center">
          <img
            src="/IMG_2921.jpeg"
            alt="Doğa rotasında seyahat eden yol"
            className="about-image"
          />

          <div>
            <p className="eyebrow">Biz Kimiz?</p>
            <h2>Doğa turizminde 16. yılımızla, bölgeyi sadece gezdirmek değil doğru hikayeyle tanıtıyoruz.</h2>
            <p className="section-copy">
              On altı yıllık derin tecrübemizle, misafirlerimizin Van'a ayırdığı zamanı en verimli şekilde
              değerlendirmesi için rota, ulaşım ve rehberlik detaylarını tek
              merkezden planlıyoruz. Her turda güvenilir organizasyon, temiz
              iletişim ve bölgeye saygılı bir keşif anlayışıyla hareket ediyoruz.
            </p>

            <div className="stats">
              <div>
                <strong>16 Yıl</strong>
                <span>Doğa turizmi tecrübesi</span>
              </div>
              <div>
                <strong>10K+</strong>
                <span>Mutlu misafir</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section muted">
        <div className="site-container section-heading">
          <p className="eyebrow">Yaklaşımımız</p>
          <h2>Her programda netlik, güven ve yerel deneyim önceliğimizdir.</h2>
        </div>

        <div className="site-container value-grid">
          {values.map((value) => (
            <article className="value-card" key={value.title}>
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
