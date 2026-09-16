'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { navItems } from '@/lib/labels'

export function SiteHeader({ schoolName, tagline }: { schoolName: string; tagline?: string | null }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-name">{schoolName}</span>
          {tagline ? <span className="brand-tag">{tagline}</span> : null}
        </Link>

        <nav className="nav" aria-label="Principal">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href || pathname.startsWith(`${item.href}/`) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
          <Link className="nav-admin" href="/admin">
            Acceso profesorado
          </Link>
        </nav>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="nav-mobile"
          onClick={() => setOpen((value) => !value)}
        >
          Menú
        </button>
      </div>

      <nav id="nav-mobile" className={`container nav-mobile${open ? ' open' : ''}`} aria-label="Móvil">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </Link>
        ))}
        <Link href="/admin" onClick={() => setOpen(false)}>
          Acceso profesorado
        </Link>
      </nav>
    </header>
  )
}
