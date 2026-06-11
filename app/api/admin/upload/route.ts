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

    // Benzersiz dosya adı oluştur (timestamp + orijinal ad)
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`
    const publicPath = join(process.cwd(), 'public')
    
    // Klasörün var olduğundan emin ol (genelde public zaten vardır ama yine de)
    try {
      await mkdir(publicPath, { recursive: true })
    } catch (e) {}

    const filePath = join(publicPath, fileName)
    await writeFile(filePath, buffer)
    
    return NextResponse.json({ success: true, url: `/${fileName}` })
  } catch (error) {
    console.error('Upload Error:', error)
    return NextResponse.json({ success: false, message: 'Yükleme hatası oluştu.' }, { status: 500 })
  }
}
