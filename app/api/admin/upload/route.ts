import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  try {
    // Auth kontrolü
    const cookieStore = await cookies()
    const adminToken = cookieStore.get('admin-token')
    
    if (!adminToken || adminToken.value !== 'local-admin') {
      return NextResponse.json({ success: false, message: 'Yetkisiz erişim.' }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ success: false, message: 'Dosya seçilmedi.' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Benzersiz ve güvenli dosya adı oluştur
    const extension = file.name.split('.').pop() || 'jpg'
    const safeName = file.name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
    
    const fileName = `${Date.now()}-${safeName}.${extension}`
    const publicPath = join(process.cwd(), 'public')
    
    console.log('Upload target:', fileName)
    
    try {
      await mkdir(publicPath, { recursive: true })
    } catch (e) {
      // Dizin varsa hata vermez, devam et
    }

    const filePath = join(publicPath, fileName)
    
    try {
      await writeFile(filePath, buffer)
      console.log('File saved:', filePath)
      return NextResponse.json({ success: true, url: `/${fileName}` })
    } catch (writeError: any) {
      console.error('Write File Error:', writeError)
      return NextResponse.json({ 
        success: false, 
        message: 'Dosya kaydedilemedi. Sunucu yazma izni hatası olabilir.',
        error: writeError.message
      }, { status: 500 })
    }
  } catch (error: any) {
    console.error('Upload Process Error:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Yükleme işlemi sırasında bir hata oluştu: ' + (error.message || 'Bilinmeyen hata'),
      error: error.toString()
    }, { status: 500 })
  }
}
