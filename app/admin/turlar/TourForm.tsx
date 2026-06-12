'use client'

import { useState } from 'react'

export default function TourForm() {
  const [loading, setLoading] = useState(false)
  const [dates, setDates] = useState([{ startDate: '', endDate: '', price: '', capacity: '12' }])
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [coverPreview, setCoverPreview] = useState<string | null>(null)
  const [galleryFiles, setGalleryFiles] = useState<File[]>([])
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCoverFile(file)
      setCoverPreview(URL.createObjectURL(file))
    }
  }

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newFiles = Array.from(files)
      setGalleryFiles(prev => [...prev, ...newFiles])
      const newPreviews = newFiles.map(file => URL.createObjectURL(file))
      setGalleryPreviews(prev => [...prev, ...newPreviews])
    }
  }

  const removeGalleryImage = (index: number) => {
    setGalleryFiles(prev => prev.filter((_, i) => i !== index))
    setGalleryPreviews(prev => prev.filter((_, i) => i !== index))
  }

  const addDate = () => {
    setDates([...dates, { startDate: '', endDate: '', price: '', capacity: '12' }])
  }

  const removeDate = (index: number) => {
    if (dates.length > 1) {
      setDates(dates.filter((_, i) => i !== index))
    }
  }

  const handleDateChange = (index: number, field: string, value: string) => {
    const newDates = [...dates]
    newDates[index] = { ...newDates[index], [field]: value }
    setDates(newDates)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    
    let coverImageUrl = formData.get('coverImage') as string

    // Eğer bir dosya seçildiyse önce onu yükle
    if (coverFile) {
      try {
        const uploadFormData = new FormData()
        uploadFormData.append('file', coverFile)
        
        const uploadRes = await fetch('/api/admin/upload', {
          method: 'POST',
          body: uploadFormData
        })
        
        if (!uploadRes.ok) {
          const errorData = await uploadRes.json().catch(() => ({ message: 'Sunucu hatası (Status: ' + uploadRes.status + ')' }))
          alert('Kapak resmi yüklenemedi: ' + (errorData.message || 'Bilinmeyen sunucu hatası'))
          setLoading(false)
          return
        }
        
        const uploadResult = await uploadRes.json()
        if (uploadResult.success) {
          coverImageUrl = uploadResult.url
        } else {
          alert('Kapak resmi yüklenemedi: ' + uploadResult.message)
          setLoading(false)
          return
        }
      } catch (err) {
        alert('Resim yüklenirken bir hata oluştu.')
        setLoading(false)
        return
      }
    }

    if (!coverImageUrl) {
      alert('Lütfen bir kapak görseli seçin veya URL girin.')
      setLoading(false)
      return
    }

    // Galeri resimlerini yükle
    let galleryUrls: string[] = []
    if (galleryFiles.length > 0) {
      try {
        const uploadPromises = galleryFiles.map(async (file) => {
          const uploadFormData = new FormData()
          uploadFormData.append('file', file)
          const res = await fetch('/api/admin/upload', { method: 'POST', body: uploadFormData })
          const result = await res.json()
          return result.success ? result.url : null
        })
        
        const uploaded = await Promise.all(uploadPromises)
        galleryUrls = uploaded.filter(Boolean) as string[]
      } catch (err) {
        console.error('Gallery upload error:', err)
      }
    }

    const payload = {
      title: formData.get('title'),
      coverImage: coverImageUrl,
      location: formData.get('location'),
      duration: formData.get('duration'),
      highlights: String(formData.get('highlights') || '').split(',').map(s => s.trim()).filter(Boolean),
      description: formData.get('description'),
      included: String(formData.get('included') || '').split(',').map(s => s.trim()).filter(Boolean),
      excluded: String(formData.get('excluded') || '').split(',').map(s => s.trim()).filter(Boolean),
      terms: String(formData.get('terms') || '').split(',').map(s => s.trim()).filter(Boolean),
      images: galleryUrls,
      programTitle: formData.get('programTitle'),
      programDescription: formData.get('programDescription'),
      dates: dates // Send multiple dates
    }

    try {
      const response = await fetch('/api/admin/tours', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        alert('Tur başarıyla yayınlandı!')
        window.location.reload()
      } else {
        alert('Hata: ' + result.message)
      }
    } catch (error) {
      alert('Bir ağ hatası oluştu.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <div className="form-row">
        <label>
          Tur Başlığı
          <input name="title" placeholder="Görkemli Van Gölü Turu" required />
        </label>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-end' }}>
          <label style={{ flex: 1 }}>
            Kapak Görseli
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
              style={{ marginTop: '5px', padding: '5px' }} 
            />
          </label>
          {coverPreview && (
            <div style={{ marginBottom: '5px' }}>
              <img src={coverPreview} alt="Önizleme" style={{ width: '80px', height: '50px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #ddd' }} />
            </div>
          )}
          <input type="hidden" name="coverImage" value="" />
        </div>
      </div>

      <div className="form-row">
        <label>
          Konum
          <input name="location" placeholder="Van, Akdamar, Ahlat" required />
        </label>
        <label>
          Süre
          <input name="duration" placeholder="4 Gün / 3 Gece" required />
        </label>
      </div>

      <label>
        Öne Çıkanlar (Virgülle ayırın)
        <input name="highlights" placeholder="4 Gün / 3 Gece, Maksimum 12 Kişi, Butik Konaklama" />
      </label>

      <label>
        Tur Hakkında (Açıklama)
        <textarea name="description" placeholder="Turun detaylı açıklamasını yazın" required />
      </label>

      <div className="form-row">
        <label>
          Dahil Olanlar (Virgülle ayırın)
          <textarea name="included" placeholder="Rehberlik, Transfer, Kahvaltı..." />
        </label>
        <label>
          Dahil Olmayanlar (Virgülle ayırın)
          <textarea name="excluded" placeholder="Kişisel harcamalar, Müze girişleri..." />
        </label>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>
          Galeri Görselleri
          <input 
            type="file" 
            multiple 
            accept="image/*" 
            onChange={handleGalleryChange}
            style={{ marginTop: '5px', display: 'block' }}
          />
        </label>
        {galleryPreviews.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
            {galleryPreviews.map((src, idx) => (
              <div key={idx} style={{ position: 'relative' }}>
                <img src={src} alt={`Galeri ${idx}`} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #ddd' }} />
                <button 
                  type="button" 
                  onClick={() => removeGalleryImage(idx)}
                  style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#ff4d4d', color: '#fff', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', fontSize: '12px' }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        <input type="hidden" name="images" value="" />
      </div>

      <div style={{ padding: '20px', background: '#fbf7ef', borderRadius: '12px', margin: '10px 0' }}>
         <h3 style={{ fontSize: '1rem', marginBottom: '15px' }}>Tur Programı (1. Gün)</h3>
         <div className="form-row">
          <label>
            Başlık
            <input name="programTitle" placeholder="Van'a Merhaba ve Şehir Turu" />
          </label>
          <label>
            Açıklama
            <input name="programDescription" placeholder="Havalimanında karşılama sonrası otele yerleşme..." />
          </label>
        </div>
      </div>

      <div style={{ padding: '20px', background: '#f3faf6', borderRadius: '12px', margin: '10px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h3 style={{ fontSize: '1rem' }}>Tur Tarihleri ve Fiyatlar</h3>
          <button type="button" onClick={addDate} style={{ background: '#2a4d44', color: '#fff', border: 'none', padding: '5px 15px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem' }}>
            + Tarih Ekle
          </button>
        </div>

        {dates.map((date, index) => (
          <div key={index} style={{ background: '#fff', padding: '15px', borderRadius: '10px', marginBottom: '10px', border: '1px solid #eee', position: 'relative' }}>
            {dates.length > 1 && (
              <button type="button" onClick={() => removeDate(index)} style={{ position: 'absolute', top: '10px', right: '10px', background: '#c53030', color: '#fff', border: 'none', width: '20px', height: '20px', borderRadius: '50%', cursor: 'pointer', fontSize: '0.7rem' }}>
                ×
              </button>
            )}
            <div className="form-row">
              <label>
                Başlangıç
                <input type="date" value={date.startDate} onChange={(e) => handleDateChange(index, 'startDate', e.target.value)} required />
              </label>
              <label>
                Bitiş
                <input type="date" value={date.endDate} onChange={(e) => handleDateChange(index, 'endDate', e.target.value)} required />
              </label>
            </div>
            <div className="form-row" style={{ marginTop: '10px' }}>
              <label>
                Fiyat (TL)
                <input type="number" value={date.price} onChange={(e) => handleDateChange(index, 'price', e.target.value)} placeholder="8450" required />
              </label>
              <label>
                Kontenjan
                <input type="number" value={date.capacity} onChange={(e) => handleDateChange(index, 'capacity', e.target.value)} placeholder="12" required />
              </label>
            </div>
          </div>
        ))}
      </div>

      <label>
        Haklarınız ve Kurallar (Virgülle ayırın - PDF Bilette görünecek)
        <textarea name="terms" placeholder="Rezervasyon iptal şartları, yanınızda getirmeniz gerekenler..." />
      </label>

      <button 
        type="submit" 
        className="button primary" 
        disabled={loading} 
        style={{ background: '#8a4f17', marginTop: '20px', opacity: loading ? 0.7 : 1 }}
      >
        {loading ? 'Yayınlanıyor...' : 'Turu Yayınla'}
      </button>
    </form>
  )
}
