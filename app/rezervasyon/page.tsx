'use client'

import { useState, useEffect, Suspense } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useRouter, useSearchParams } from 'next/navigation'

function ReservationPageContent() {
  const [step, setStep] = useState(1)
  const [tours, setTours] = useState([])
  const [selectedTour, setSelectedTour] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [personCount, setPersonCount] = useState(1)
  const [loading, setLoading] = useState(true)

  const searchParams = useSearchParams()
  const tourSlug = searchParams.get('tur')
// ... (rest of the component)

  useEffect(() => {
    fetch('/api/tours')
      .then(res => res.json())
      .then(data => {
        const toursList = data.tours || []
        setTours(toursList)
        if (tourSlug) {
          const tour = toursList.find(t => t.slug === tourSlug)
          if (tour) {
            setSelectedTour(tour)
            setStep(2)
          }
        }
        setLoading(false)
      })
  }, [tourSlug])

  const handleTourSelect = (tour) => {
    setSelectedTour(tour)
    setStep(2)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleStepClick = (s) => {
    if (s < step) {
      setStep(s)
      if (s === 1) {
        setSelectedDate(null)
      }
    }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f4ef]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#8a4f17] border-t-transparent rounded-full animate-spin"></div>
        <p className="font-bold text-zinc-500 uppercase tracking-widest text-xs">Yükleniyor...</p>
      </div>
    </div>
  )

  const stepLabels = ["Tur Seçimi", "Tarih & Kişi", "Bilgiler"]

  return (
    <div className="site-shell">
      <Navbar />
      
      <main className="pt-[140px] pb-20 bg-[#f6f4ef] min-h-screen">
        <div className="site-container max-w-5xl">
          {/* Enhanced Progress Bar */}
          <div className="max-w-2xl mx-auto mb-16 px-4">
            <div className="flex justify-between relative">
              <div className="absolute top-5 left-0 w-full h-[2px] bg-zinc-200 -z-10"></div>
              <div 
                className="absolute top-5 left-0 h-[2px] bg-[#8a4f17] transition-all duration-500 -z-10" 
                style={{ width: `${((step - 1) / (stepLabels.length - 1)) * 100}%` }}
              ></div>
              
              {stepLabels.map((label, index) => {
                const s = index + 1
                const isActive = step === s
                const isCompleted = step > s
                
                return (
                  <button 
                    key={s}
                    onClick={() => handleStepClick(s)}
                    disabled={s > step}
                    className="flex flex-col items-center gap-3 group disabled:cursor-default"
                  >
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-black transition-all duration-300 border-2 shadow-sm ${
                        isActive 
                          ? 'bg-[#8a4f17] text-white border-[#8a4f17] scale-110 shadow-lg shadow-[#8a4f17]/20' 
                          : isCompleted 
                            ? 'bg-white text-[#8a4f17] border-[#8a4f17]' 
                            : 'bg-white text-zinc-300 border-zinc-200'
                      }`}
                    >
                      {isCompleted ? '✓' : s}
                    </div>
                    <span className={`text-xs font-black uppercase tracking-widest transition-colors duration-300 ${
                      isActive ? 'text-[#8a4f17]' : isCompleted ? 'text-zinc-600' : 'text-zinc-400'
                    }`}>
                      {label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="transition-all duration-500">
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="text-center mb-10">
                  <p className="text-[#8a4f17] font-black uppercase tracking-[0.2em] text-xs mb-3">Keşfetmeye Başla</p>
                  <h2 className="text-4xl font-black text-zinc-900 tracking-tight">Size En Uygun Turu Seçin</h2>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {tours.map((tour) => (
                    <div
                      key={tour.id}
                      onClick={() => handleTourSelect(tour)}
                      className="group bg-white rounded-[32px] overflow-hidden shadow-xl shadow-zinc-200/50 border border-zinc-100 hover:border-[#8a4f17]/30 transition-all duration-500 cursor-pointer hover:-translate-y-2"
                    >
                      <div className="relative h-56 overflow-hidden">
                        <img 
                          src={tour.coverImage} 
                          alt={tour.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                           <span className="text-white font-bold text-sm bg-[#8a4f17] px-4 py-2 rounded-full shadow-lg">Turu İncele & Seç</span>
                        </div>
                      </div>
                      <div className="p-7">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-[10px] font-black uppercase tracking-widest bg-zinc-100 text-zinc-500 px-2 py-1 rounded-md">{tour.duration}</span>
                          <span className="text-[10px] font-black uppercase tracking-widest bg-amber-50 text-amber-600 px-2 py-1 rounded-md">{tour.location}</span>
                        </div>
                        <h3 className="font-black text-xl text-zinc-900 group-hover:text-[#8a4f17] transition-colors line-clamp-1">{tour.title}</h3>
                        <p className="text-zinc-500 text-sm mt-3 line-clamp-2 leading-relaxed">
                          {tour.description}
                        </p>
                        <div className="mt-6 pt-6 border-t border-zinc-50 flex justify-between items-center">
                          <div className="text-zinc-400 font-bold text-xs uppercase tracking-widest">Başlayan Fiyat</div>
                          <div className="text-[#8a4f17] font-black text-xl">₺{tour.dates[0]?.price?.toLocaleString('tr-TR')}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl mx-auto">
                <button 
                  onClick={() => setStep(1)}
                  className="group flex items-center gap-2 text-zinc-400 hover:text-[#8a4f17] font-bold text-sm mb-8 transition-colors"
                >
                  <span className="bg-zinc-100 group-hover:bg-[#8a4f17]/10 p-2 rounded-full transition-colors">←</span>
                  Turlara Geri Dön
                </button>

                <div className="bg-white rounded-[40px] p-10 shadow-2xl shadow-zinc-200/60 border border-zinc-100">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                      <p className="text-[#8a4f17] font-black uppercase tracking-[0.2em] text-[10px] mb-2">Seçili Tur: {selectedTour.location}</p>
                      <h2 className="text-3xl font-black text-zinc-900">{selectedTour.title}</h2>
                    </div>
                    <img src={selectedTour.coverImage} className="w-24 h-24 rounded-3xl object-cover shadow-lg border-4 border-white" />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                      <label className="block text-xs font-black text-zinc-400 uppercase tracking-[0.2em]">Seyahat Tarihini Seçin</label>
                      <div className="grid gap-4">
                        {selectedTour.dates.map((date) => (
                          <button
                            key={date.id}
                            onClick={() => setSelectedDate(date)}
                            className={`group p-6 rounded-[24px] border-2 text-left flex justify-between items-center transition-all duration-300 ${
                              selectedDate?.id === date.id 
                                ? 'border-[#8a4f17] bg-[#fdf8f3] shadow-lg shadow-[#8a4f17]/5' 
                                : 'border-zinc-100 hover:border-zinc-300 bg-white'
                            }`}
                          >
                            <div>
                              <p className={`font-black text-lg transition-colors ${selectedDate?.id === date.id ? 'text-[#8a4f17]' : 'text-zinc-800'}`}>
                                {new Date(date.startDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' })}
                              </p>
                              <p className="text-zinc-400 text-xs font-bold mt-1 uppercase tracking-wider">
                                {date.capacity} Kişilik Kontenjan
                              </p>
                            </div>
                            <div className="text-right">
                              <p className={`text-xl font-black ${selectedDate?.id === date.id ? 'text-[#8a4f17]' : 'text-zinc-900'}`}>
                                ₺{date.price.toLocaleString('tr-TR')}
                              </p>
                              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1">kişi başı</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-10">
                      <div>
                        <label className="block text-xs font-black text-zinc-400 uppercase tracking-[0.2em] mb-6">Kaç Kişi Katılacaksınız?</label>
                        <div className="flex items-center gap-10 bg-zinc-50/50 p-6 rounded-[32px] w-fit border border-zinc-100">
                          <button 
                            onClick={() => setPersonCount(Math.max(1, personCount - 1))}
                            className="w-14 h-14 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center text-2xl font-black text-zinc-400 hover:text-[#8a4f17] hover:border-[#8a4f17] hover:shadow-lg transition-all"
                          >
                            −
                          </button>
                          <div className="flex flex-col items-center">
                            <span className="text-4xl font-black text-zinc-900 leading-none">{personCount}</span>
                            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-2">Kişi</span>
                          </div>
                          <button 
                            onClick={() => setPersonCount(Math.min(10, personCount + 1))}
                            className="w-14 h-14 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center text-2xl font-black text-zinc-400 hover:text-[#8a4f17] hover:border-[#8a4f17] hover:shadow-lg transition-all"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="pt-8 border-t border-zinc-100">
                         <button
                          disabled={!selectedDate}
                          onClick={() => {
                            setStep(3)
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                          }}
                          className="w-full h-16 bg-[#8a4f17] text-white rounded-2xl font-black text-lg shadow-xl shadow-[#8a4f17]/20 hover:bg-[#6e3f12] hover:shadow-2xl transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed group"
                        >
                          <span className="flex items-center justify-center gap-3">
                            Bilgileri Doldurmaya Geç
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <ReservationDetailsForm 
                tour={selectedTour}
                date={selectedDate}
                personCount={personCount}
                onBack={() => {
                  setStep(2)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

function ReservationDetailsForm({ tour, date, personCount, onBack }) {
  const router = useRouter()
  const [persons, setPersons] = useState(
    Array.from({ length: personCount }, () => ({
      gender: 'FEMALE',
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      birthDate: '',
      departurePoint: '',
      tcNo: '',
      isNotTcCitizen: false,
    }))
  )

  const [submitting, setSubmitting] = useState(false)

  const handlePersonChange = (index, field, value) => {
    const newPersons = [...persons]
    newPersons[index] = { ...newPersons[index], [field]: value }
    setPersons(newPersons)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tourDateId: date.id,
          personCount,
          customerName: `${persons[0].firstName} ${persons[0].lastName}`,
          phone: persons[0].phone,
          email: persons[0].email,
          persons,
          totalPrice: date.price * personCount,
        }),
      })

      if (response.ok) {
        alert('Rezervasyonunuz başarıyla alındı!')
        router.push('/')
      } else {
        alert('Bir hata oluştu. Lütfen tekrar deneyin.')
      }
    } catch (error) {
      console.error(error)
      alert('Bir hata oluştu.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid lg:grid-cols-12 gap-10 items-start animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="lg:col-span-8 space-y-10">
        <div className="bg-white rounded-[40px] shadow-2xl shadow-zinc-200/60 border border-zinc-100 overflow-hidden">
          <div className="bg-zinc-50/80 px-10 py-6 border-b border-zinc-100 flex items-center justify-between">
            <h2 className="text-xl font-black text-zinc-900 tracking-tight">Katılımcı Bilgileri</h2>
            <div className="text-xs font-black text-[#8a4f17] uppercase tracking-widest bg-white px-4 py-2 rounded-full border border-zinc-100">
               Oda 1 • {personCount} Kişi
            </div>
          </div>
          
          <div className="p-10 divide-y divide-zinc-100">
            {persons.map((person, index) => (
              <div key={index} className={index > 0 ? 'pt-12 mt-12' : ''}>
                <div className="flex items-center gap-4 mb-8">
                   <div className="w-10 h-10 rounded-2xl bg-[#8a4f17]/10 text-[#8a4f17] flex items-center justify-center font-black text-sm">
                      {index + 1}
                   </div>
                   <h3 className="font-black text-zinc-900 uppercase tracking-widest text-sm">{index + 1}. Katılımcı</h3>
                </div>
                
                <div className="flex gap-8 mb-10 bg-zinc-50/50 p-6 rounded-3xl w-fit border border-zinc-100">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name={`gender-${index}`} 
                      checked={person.gender === 'FEMALE'}
                      onChange={() => handlePersonChange(index, 'gender', 'FEMALE')}
                      className="w-5 h-5 accent-[#8a4f17] cursor-pointer"
                    />
                    <span className={`font-black text-xs uppercase tracking-widest transition-colors ${person.gender === 'FEMALE' ? 'text-[#8a4f17]' : 'text-zinc-400'}`}>Kadın</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name={`gender-${index}`} 
                      checked={person.gender === 'MALE'}
                      onChange={() => handlePersonChange(index, 'gender', 'MALE')}
                      className="w-5 h-5 accent-[#8a4f17] cursor-pointer"
                    />
                    <span className={`font-black text-xs uppercase tracking-widest transition-colors ${person.gender === 'MALE' ? 'text-[#8a4f17]' : 'text-zinc-400'}`}>Erkek</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-1">Ad</span>
                    <input 
                      required
                      value={person.firstName}
                      onChange={(e) => handlePersonChange(index, 'firstName', e.target.value)}
                      className="w-full h-14 bg-[#f8f8f8] border border-zinc-100 focus:border-[#8a4f17]/50 focus:bg-white rounded-2xl px-6 font-bold text-zinc-900 transition-all outline-none" 
                      placeholder="Adı" 
                    />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-1">Soyad</span>
                    <input 
                      required
                      value={person.lastName}
                      onChange={(e) => handlePersonChange(index, 'lastName', e.target.value)}
                      className="w-full h-14 bg-[#f8f8f8] border border-zinc-100 focus:border-[#8a4f17]/50 focus:bg-white rounded-2xl px-6 font-bold text-zinc-900 transition-all outline-none" 
                      placeholder="Soyadı" 
                    />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-1">Gsm No</span>
                    <div className="flex gap-2">
                      <div className="h-14 flex items-center px-4 bg-[#f8f8f8] border border-zinc-100 rounded-2xl text-zinc-500 font-black text-sm">+90</div>
                      <input 
                        required
                        value={person.phone}
                        onChange={(e) => handlePersonChange(index, 'phone', e.target.value)}
                        className="flex-1 h-14 bg-[#f8f8f8] border border-zinc-100 focus:border-[#8a4f17]/50 focus:bg-white rounded-2xl px-6 font-bold text-zinc-900 transition-all outline-none" 
                        placeholder="(5XX) XXX XX XX" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-1">E-posta</span>
                    <input 
                      type="email"
                      value={person.email}
                      onChange={(e) => handlePersonChange(index, 'email', e.target.value)}
                      className="w-full h-14 bg-[#f8f8f8] border border-zinc-100 focus:border-[#8a4f17]/50 focus:bg-white rounded-2xl px-6 font-bold text-zinc-900 transition-all outline-none" 
                      placeholder="E-posta adresi" 
                    />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-1">Doğum Tarihi</span>
                    <input 
                      value={person.birthDate}
                      onChange={(e) => handlePersonChange(index, 'birthDate', e.target.value)}
                      className="w-full h-14 bg-[#f8f8f8] border border-zinc-100 focus:border-[#8a4f17]/50 focus:bg-white rounded-2xl px-6 font-bold text-zinc-900 transition-all outline-none" 
                      placeholder="GG.AA.YYYY" 
                    />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-1">Tur Kalkış Yeri</span>
                    <input 
                      value={person.departurePoint}
                      onChange={(e) => handlePersonChange(index, 'departurePoint', e.target.value)}
                      className="w-full h-14 bg-[#f8f8f8] border border-zinc-100 focus:border-[#8a4f17]/50 focus:bg-white rounded-2xl px-6 font-bold text-zinc-900 transition-all outline-none" 
                      placeholder="Örn: Forum Durağı" 
                    />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-1">TC Kimlik Numarası</span>
                    <input 
                      value={person.tcNo}
                      onChange={(e) => handlePersonChange(index, 'tcNo', e.target.value)}
                      className="w-full h-14 bg-[#f8f8f8] border border-zinc-100 focus:border-[#8a4f17]/50 focus:bg-white rounded-2xl px-6 font-bold text-zinc-900 transition-all outline-none" 
                      placeholder="11 haneli TC kimlik no" 
                    />
                  </div>
                  <div className="flex items-center pb-2">
                    <label className="flex items-center gap-3 cursor-pointer select-none group">
                      <div className="relative">
                        <input 
                          type="checkbox" 
                          checked={person.isNotTcCitizen}
                          onChange={(e) => handlePersonChange(index, 'isNotTcCitizen', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-6 h-6 border-2 border-zinc-200 rounded-lg bg-white peer-checked:bg-[#8a4f17] peer-checked:border-[#8a4f17] transition-all"></div>
                        <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transition-opacity">
                           <span className="text-xs font-black">✓</span>
                        </div>
                      </div>
                      <span className="text-xs font-black text-zinc-400 group-hover:text-zinc-600 uppercase tracking-widest transition-colors">TC vatandaşı değilim</span>
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-4 space-y-8 sticky top-32">
        {/* Enhanced Tour Summary */}
        <div className="bg-white rounded-[40px] shadow-2xl shadow-zinc-200/60 border border-zinc-100 overflow-hidden">
          <div className="relative h-44">
            <img src={tour.coverImage} alt={tour.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
               <span className="text-[10px] font-black text-amber-400 uppercase tracking-[0.2em] mb-1 block">{tour.location}</span>
               <h2 className="text-xl font-black text-white leading-tight">{tour.title}</h2>
            </div>
          </div>
          
          <div className="p-8 space-y-5">
            <div className="flex items-center gap-4 text-xs">
              <span className="w-8 h-8 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-400">📅</span>
              <div className="flex flex-col">
                 <span className="font-black text-zinc-400 uppercase tracking-widest text-[8px]">Tarih Aralığı</span>
                 <span className="font-black text-zinc-800 uppercase tracking-wider mt-0.5">
                   {new Date(date.startDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })} - {new Date(date.endDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' })}
                 </span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="w-8 h-8 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-400">👥</span>
              <div className="flex flex-col">
                 <span className="font-black text-zinc-400 uppercase tracking-widest text-[8px]">Katılımcı</span>
                 <span className="font-black text-zinc-800 uppercase tracking-wider mt-0.5">{personCount} Yetişkin</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Price Info */}
        <div className="bg-white rounded-[40px] p-8 shadow-2xl shadow-zinc-200/60 border border-zinc-100 space-y-6">
          <div className="space-y-4">
             <div className="flex justify-between items-center text-xs font-black text-zinc-400 uppercase tracking-widest">
                <span>Kişi Başı Ücret</span>
                <span className="text-zinc-800">₺{date.price.toLocaleString('tr-TR')}</span>
             </div>
             <div className="flex justify-between items-center text-xs font-black text-zinc-400 uppercase tracking-widest">
                <span>Adet</span>
                <span className="text-zinc-800">{personCount}</span>
             </div>
          </div>
          
          <div className="pt-6 border-t border-zinc-100 flex justify-between items-end">
            <div className="flex flex-col">
               <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-1">Toplam Tutar</span>
               <span className="text-3xl font-black text-[#8a4f17] leading-none">₺{(date.price * personCount).toLocaleString('tr-TR')}</span>
            </div>
            <div className="text-right">
               <span className="text-[10px] font-black text-zinc-400 block mb-1">€ Yaklaşık</span>
               <span className="text-sm font-black text-zinc-600">{(date.price * personCount / 34).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <button 
            type="submit"
            disabled={submitting}
            className="w-full h-16 bg-[#8a4f17] text-white rounded-[24px] font-black text-lg shadow-xl shadow-[#8a4f17]/20 hover:bg-[#6e3f12] hover:shadow-2xl transition-all duration-300 disabled:opacity-50"
          >
            {submitting ? 'Gönderiliyor...' : 'Rezervasyonu Tamamla'}
          </button>

          <button 
            type="button"
            onClick={onBack}
            className="w-full py-4 text-zinc-400 font-black uppercase tracking-widest text-[10px] hover:text-zinc-900 transition-colors"
          >
            ← Geri Dön ve Bilgileri Düzenle
          </button>
        </div>
        
        <div className="p-6 bg-[#fdf8f3] rounded-3xl border border-[#8a4f17]/10 flex items-start gap-4">
           <span className="text-xl">🔒</span>
           <div>
              <p className="text-[10px] font-black text-[#8a4f17] uppercase tracking-widest mb-1">Güvenli Rezervasyon</p>
              <p className="text-[9px] font-bold text-[#8a4f17]/60 leading-relaxed uppercase tracking-wider">Bilgileriniz 256-bit SSL sertifikası ile korunmaktadır.</p>
           </div>
        </div>
      </div>
    </form>
  )
}

export default function ReservationPage() {
  return (
    <Suspense>
      <ReservationPageContent />
    </Suspense>
  )
}
