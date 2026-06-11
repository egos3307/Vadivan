'use client'

import { useState, useMemo } from 'react'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import * as XLSX from 'xlsx'

type Person = {
  fullName: string
  phone: string
  tcNo: string
  roomType: 'SINGLE' | 'DOUBLE' | 'TRIPLE'
  city: string
  deposit: number
  remainingDebt: number
  notes: string
}

export default function ReservationDetailView({ tourDate }: { tourDate: any }) {
  const [persons, setPersons] = useState<Person[]>([
    { fullName: '', phone: '', tcNo: '', roomType: 'DOUBLE', city: '', deposit: 0, remainingDebt: 0, notes: '' }
  ])
  const [groupNotes, setGroupNotes] = useState('')
  const [loading, setLoading] = useState(false)

  const allRegisteredPersons = useMemo(() => {
    if (!tourDate.reservations) return []
    return tourDate.reservations.flatMap((res: any) => 
      res.persons.map((p: any) => ({
        ...p,
        reservationId: res.id,
        resNotes: res.notes
      }))
    )
  }, [tourDate.reservations])

  const currentOccupancy = allRegisteredPersons.length

  const addPerson = () => {
    setPersons([...persons, { fullName: '', phone: '', tcNo: '', roomType: 'DOUBLE', city: '', deposit: 0, remainingDebt: 0, notes: '' }])
  }

  const updatePerson = (index: number, field: keyof Person, value: any) => {
    const newPersons = [...persons]
    newPersons[index] = { ...newPersons[index], [field]: value }
    setPersons(newPersons)
  }

  const handleSave = async () => {
    const validPersons = persons.filter(p => p.fullName.trim() !== '')
    if (validPersons.length === 0) {
      alert('Lütfen en az bir kişi ekleyin.')
      return
    }

    setLoading(true)
    console.log('Saving reservation...', { tourDateId: tourDate.id, persons: validPersons })

    try {
      const res = await fetch('/api/admin/reservations/group', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          tourDateId: tourDate.id,
          notes: groupNotes,
          persons: validPersons
        })
      })

      console.log('Response status:', res.status)

      if (res.ok) {
        alert('Rezervasyon başarıyla kaydedildi.')
        window.location.reload()
      } else {
        const errorText = await res.text()
        console.error('Server error response:', errorText)
        try {
          const errorJson = JSON.parse(errorText)
          alert('Sunucu Hatası: ' + (errorJson.message || 'Bilinmeyen bir hata.'))
        } catch (e) {
          alert('Sunucu Hatası (HTML): ' + errorText.substring(0, 100))
        }
      }
    } catch (err: any) {
      console.error('Fetch catch error:', err)
      alert('Ağ/Bağlantı Hatası: ' + (err.name || 'Hata') + ': ' + (err.message || 'İşlem tamamlanamadı.'))
    } finally {
      setLoading(false)
    }
  }

  const exportToExcel = () => {
    const data = allRegisteredPersons.map((p: any, index: number) => ({
      'No': index + 1,
      'Ad Soyad': p.fullName,
      'Telefon': p.phone,
      'TC No': p.tcNo,
      'Oda': p.roomType,
      'Şehir': p.city,
      'Kapora': p.deposit,
      'Kalan': p.remainingDebt,
      'Not': p.notes || p.resNotes || ''
    }))

    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Rezervasyonlar')
    XLSX.writeFile(wb, `${tourDate.tour.title}_${new Date(tourDate.startDate).toLocaleDateString('tr-TR')}.xlsx`)
  }

  const generatePDF = (person: any) => {
    const doc = new jsPDF()
    
    doc.setFontSize(22)
    doc.setTextColor(138, 79, 23) // #8a4f17
    doc.text('VadiVan Gezi - Tur Bileti', 105, 20, { align: 'center' })
    
    doc.setFontSize(12)
    doc.setTextColor(0, 0, 0)
    doc.text(`Tur: ${tourDate.tour.title}`, 20, 40)
    doc.text(`Tarih: ${new Date(tourDate.startDate).toLocaleDateString('tr-TR')} - ${new Date(tourDate.endDate).toLocaleDateString('tr-TR')}`, 20, 50)
    
    doc.setDrawColor(200, 200, 200)
    doc.line(20, 55, 190, 55)
    
    doc.setFontSize(14)
    doc.text('Yolcu Bilgileri', 20, 65)
    doc.setFontSize(12)
    doc.text(`Ad Soyad: ${person.fullName}`, 20, 75)
    doc.text(`TC No: ${person.tcNo || '-'}`, 20, 85)
    doc.text(`Oda Tipi: ${person.roomType}`, 20, 95)
    
    doc.line(20, 105, 190, 105)
    
    doc.setFontSize(14)
    doc.text('Gezi Planı', 20, 115)
    doc.setFontSize(10)
    let y = 125
    const programs = tourDate.tour.programs || []
    programs.forEach((prog: any) => {
      doc.text(`Gün ${prog.day}: ${prog.title}`, 25, y)
      y += 7
      const descLines = doc.splitTextToSize(prog.description || '', 160)
      doc.text(descLines, 30, y)
      y += (descLines.length * 5) + 5
    })
    
    if (y > 250) { doc.addPage(); y = 20; }
    
    doc.setFontSize(14)
    doc.text('Haklarınız ve Kurallar', 20, y)
    doc.setFontSize(10)
    y += 10
    
    let terms = []
    try {
       terms = JSON.parse(tourDate.tour.terms || '[]')
    } catch(e) {
       terms = []
    }

    if (terms.length > 0) {
      terms.forEach((term: string) => {
        const termLines = doc.splitTextToSize(`• ${term}`, 170)
        doc.text(termLines, 20, y)
        y += (termLines.length * 5) + 2
      })
    } else {
      doc.text('Tur iptal ve iade şartları acente ile yapılan sözleşmeye tabidir.', 20, y)
    }

    doc.save(`${person.fullName}_Bilet.pdf`)
  }

  return (
    <div style={{ paddingBottom: '100px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', fontWeight: '900', fontSize: '2.5rem' }}>
        {tourDate.tour.title} Rezervasyon Paneli
      </h1>

      <div style={{ background: 'white', padding: '25px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '20px', alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700' }}>Tur Tarihi</label>
            <div style={{ padding: '10px 15px', borderRadius: '8px', border: '1px solid #ddd', background: '#f8f9fa' }}>
              {new Date(tourDate.startDate).toLocaleDateString('tr-TR')} - {new Date(tourDate.endDate).toLocaleDateString('tr-TR')}
            </div>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700' }}>Kontenjan</label>
            <input type="text" style={{ width: '100%', padding: '10px 15px', borderRadius: '8px', border: '1px solid #ddd', background: '#f8f9fa' }} value={tourDate.capacity} readOnly />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={exportToExcel}
              style={{ background: '#27ae60', color: 'white', border: 'none', padding: '12px 20px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', flex: 1 }}
            >
              Excel'e Aktar
            </button>
          </div>
        </div>
      </div>

      <div style={{ background: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
        <h2 style={{ fontWeight: '800', marginBottom: '20px' }}>Grup Kaydı</h2>
        
        <div>
          {persons.map((p, index) => (
            <div key={index} style={{ display: 'grid', gridTemplateColumns: '3fr 2fr 2fr 2fr 1fr 1fr 1fr', gap: '10px', marginTop: index > 0 ? '15px' : '0' }}>
              <input style={{ width: '100%', padding: '10px 15px', borderRadius: '8px', border: '1px solid #ddd' }} placeholder="Ad Soyad" value={p.fullName} onChange={(e) => updatePerson(index, 'fullName', e.target.value)} />
              <input style={{ width: '100%', padding: '10px 15px', borderRadius: '8px', border: '1px solid #ddd' }} placeholder="Telefon" value={p.phone} onChange={(e) => updatePerson(index, 'phone', e.target.value)} />
              <input style={{ width: '100%', padding: '10px 15px', borderRadius: '8px', border: '1px solid #ddd' }} placeholder="TC No" value={p.tcNo} onChange={(e) => updatePerson(index, 'tcNo', e.target.value)} />
              <select style={{ width: '100%', padding: '10px 15px', borderRadius: '8px', border: '1px solid #ddd' }} value={p.roomType} onChange={(e) => updatePerson(index, 'roomType', e.target.value)}>
                <option value="DOUBLE">DOUBLE</option>
                <option value="SINGLE">SINGLE</option>
                <option value="TRIPLE">TRIPLE</option>
              </select>
              <input style={{ width: '100%', padding: '10px 15px', borderRadius: '8px', border: '1px solid #ddd' }} placeholder="Şehir" value={p.city} onChange={(e) => updatePerson(index, 'city', e.target.value)} />
              <input style={{ width: '100%', padding: '10px 15px', borderRadius: '8px', border: '1px solid #ddd' }} placeholder="Kapora" type="number" value={p.deposit || ''} onChange={(e) => updatePerson(index, 'deposit', Number(e.target.value))} />
              <input style={{ width: '100%', padding: '10px 15px', borderRadius: '8px', border: '1px solid #ddd' }} placeholder="Kalan" type="number" value={p.remainingDebt || ''} onChange={(e) => updatePerson(index, 'remainingDebt', Number(e.target.value))} />
            </div>
          ))}
        </div>

        <textarea style={{ width: '100%', padding: '10px 15px', borderRadius: '8px', border: '1px solid #ddd', marginTop: '15px', minHeight: '80px' }} placeholder="Grup Notu" value={groupNotes} onChange={(e) => setGroupNotes(e.target.value)}></textarea>

        <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
          <button onClick={addPerson} style={{ background: '#6c757d', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' }}>+ Kişi Ekle</button>
          <button disabled={loading} onClick={handleSave} style={{ background: '#e67e22', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' }}>{loading ? 'Kaydediliyor...' : 'Kaydet / Güncelle'}</button>
        </div>
      </div>

      <div style={{ background: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <h2 style={{ fontWeight: '800', marginBottom: '20px' }}>Doluluk: {currentOccupancy} / {tourDate.capacity}</h2>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
            <thead style={{ background: '#1f3552', color: 'white' }}>
              <tr>
                <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #dee2e6' }}>No</th>
                <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #dee2e6' }}>Ad Soyad</th>
                <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #dee2e6' }}>Telefon</th>
                <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #dee2e6' }}>TC No</th>
                <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #dee2e6' }}>Oda</th>
                <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #dee2e6' }}>Şehir</th>
                <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #dee2e6' }}>Kapora</th>
                <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #dee2e6' }}>Kalan</th>
                <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #dee2e6' }}>Not</th>
                <th style={{ padding: '12px', textAlign: 'center', border: '1px solid #dee2e6' }}>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {allRegisteredPersons.map((p: any, index: number) => (
                <tr key={p.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{index + 1}</td>
                  <td style={{ padding: '12px', fontWeight: '600', border: '1px solid #dee2e6' }}>{p.fullName}</td>
                  <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{p.phone}</td>
                  <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{p.tcNo}</td>
                  <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{p.roomType}</td>
                  <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{p.city}</td>
                  <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{p.deposit} TL</td>
                  <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{p.remainingDebt} TL</td>
                  <td style={{ padding: '12px', fontSize: '0.85rem', color: '#666', border: '1px solid #dee2e6' }}>{p.notes || p.resNotes}</td>
                  <td style={{ padding: '12px', textAlign: 'center', border: '1px solid #dee2e6' }}>
                    <button onClick={() => generatePDF(p)} title="Bilet Oluştur" style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#8a4f17', fontSize: '1.2rem' }}>🎫</button>
                  </td>
                </tr>
              ))}
              {allRegisteredPersons.length === 0 && (
                <tr><td colSpan={10} style={{ padding: '40px', textAlign: 'center', color: '#999' }}>Henüz kayıtlı rezervasyon bulunmuyor.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
