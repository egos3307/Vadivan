'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DeleteTourButton({ tourId, tourTitle }: { tourId: string, tourTitle: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleDelete() {
    if (!confirm(`"${tourTitle}" turunu silmek istediğinize emin misiniz?`)) {
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`/api/admin/tours?id=${tourId}`, {
        method: 'DELETE',
      })
      
      const result = await response.json()

      if (response.ok && result.success) {
        alert('Tur başarıyla silindi.')
        router.refresh()
      } else {
        alert('Hata: ' + (result.message || 'Silme işlemi başarısız.'))
      }
    } catch (error) {
      alert('Bir ağ hatası oluştu.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button 
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        handleDelete()
      }}
      disabled={loading}
      className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors disabled:opacity-50"
      title="Turu Sil"
    >
      {loading ? '...' : '🗑️'}
    </button>
  )
}
