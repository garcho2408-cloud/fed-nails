'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { CONTACTS } from '@/lib/constants'
import clsx from 'clsx'

const NAV_LINKS = [
  { href: '/services', label: 'Услуги' },
  { href: '/portfolio', label: 'Портфолио' },
  { href: '/about', label: 'О мастере' },
  { href: '/contacts', label: 'Контакты' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-cream-100/95 backdrop-blur-md border-b border-cream-300 py-3'
            : 'bg-transparent py-5'
        )}
      >
        <div className="container-main flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none group">
            <span className="font-cormorant text-2xl font-light tracking-wider text-brown-900 group-hover:text-taupe-600 transition-colors">
              fed<span className="text-taupe-500">.</span>nails
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={clsx(
                  'font-montserrat text-sm font-medium transition-colors duration-200',
                  pathname === href
                    ? 'text-taupe-600'
                    : 'text-brown-900/70 hover:text-brown-900'
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a href={CONTACTS.phoneHref} className="font-montserrat text-sm text-muted hover:text-brown-900 transition-colors">
              {CONTACTS.phone}
            </a>
            <Link href="/booking" className="btn-primary text-sm px-5 py-2.5">
              Записаться
            </Link>
          </div>

          {/* Mobile: book + burger */}
          <div className="flex md:hidden items-center gap-3">
            <Link href="/booking" className="btn-primary text-xs px-4 py-2.5">
              Записаться
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-brown-900"
              aria-label="Меню"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-cream-100 flex flex-col pt-24 pb-8 px-6">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={clsx(
                  'font-cormorant text-3xl py-3 border-b border-cream-300 transition-colors',
                  pathname === href ? 'text-taupe-600' : 'text-brown-900'
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="mt-8 flex flex-col gap-3">
            <a
              href={CONTACTS.phoneHref}
              className="font-montserrat text-base text-brown-900 font-medium"
            >
              {CONTACTS.phone}
            </a>
            <div className="flex gap-3 mt-2">
              <a
                href={CONTACTS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex-1 text-center text-sm py-3"
              >
                WhatsApp
              </a>
              <a
                href={CONTACTS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex-1 text-center text-sm py-3"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
