'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menuItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: '📊'
  },
  {
    title: 'Turlar',
    href: '/admin/turlar',
    icon: '🌍'
  },
  {
    title: 'Tarihler',
    href: '/admin/tarihler',
    icon: '📅'
  },
  {
    title: 'Rezervasyonlar',
    href: '/admin/rezervasyonlar',
    icon: '📝'
  }
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="admin-sidebar-container">
      <div className="admin-sidebar-header">
        <h1 className="admin-logo">VadiVan</h1>
        <p className="admin-subtitle">YÖNETİM PANELİ</p>
      </div>

      <nav className="admin-nav">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
          
          return (
            <Link 
              key={item.href}
              href={item.href} 
              className={`admin-nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="admin-nav-icon">{item.icon}</span>
              <span className="admin-nav-text">{item.title}</span>
            </Link>
          )
        })}
      </nav>

      <div className="admin-sidebar-footer">
        <Link href="/" className="back-to-site">
          <span>←</span> Siteye Dön
        </Link>
      </div>
    </div>
  )
}
