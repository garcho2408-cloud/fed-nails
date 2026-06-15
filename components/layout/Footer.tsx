import Link from 'next/link'
import { MapPin, Phone, Clock, Instagram, MessageCircle, Send } from 'lucide-react'
import { CONTACTS } from '@/lib/constants'

const NAV_LINKS = [
  { href: '/services', label: 'Услуги и цены' },
  { href: '/portfolio', label: 'Портфолио' },
  { href: '/about', label: 'О мастере' },
  { href: '/booking', label: 'Запись онлайн' },
  { href: '/contacts', label: 'Контакты' },
]

const SOCIAL_LINKS = [
  {
    href: CONTACTS.instagram,
    label: 'Instagram',
    icon: Instagram,
  },
  {
    href: CONTACTS.whatsapp,
    label: 'WhatsApp',
    icon: MessageCircle,
  },
  {
    href: CONTACTS.telegram,
    label: 'Telegram',
    icon: Send,
  },
]

export function Footer() {
  return (
    <footer className="bg-brown-900 text-cream-200 mt-0">
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">

          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-cormorant text-2xl font-light tracking-wider text-cream-100">
                fed<span className="text-taupe-400">.</span>nails
              </span>
            </Link>
            <p className="font-inter text-sm text-cream-300/70 leading-relaxed max-w-xs">
              Студия маникюра Дарьи Федотовой в Раменском. Работы, которыми хочется делиться.
            </p>
            <div className="flex gap-3 pt-1">
              {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-cream-300/20 flex items-center justify-center text-cream-300/60 hover:border-taupe-400 hover:text-taupe-400 transition-colors duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div className="space-y-4">
            <p className="section-label text-taupe-400">Навигация</p>
            <nav className="flex flex-col gap-2.5">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="font-inter text-sm text-cream-300/70 hover:text-cream-100 transition-colors duration-200"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contacts */}
          <div className="space-y-4">
            <p className="section-label text-taupe-400">Контакты</p>
            <div className="flex flex-col gap-3.5">
              <address className="not-italic">
                <a
                  href={CONTACTS.yandexMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-2.5 text-sm text-cream-300/70 hover:text-cream-100 transition-colors"
                >
                  <MapPin size={16} className="mt-0.5 shrink-0 text-taupe-400" />
                  <span>{CONTACTS.addressFull}</span>
                </a>
              </address>
              <a
                href={CONTACTS.phoneHref}
                className="flex gap-2.5 text-sm text-cream-300/70 hover:text-cream-100 transition-colors"
              >
                <Phone size={16} className="shrink-0 text-taupe-400" />
                {CONTACTS.phone}
              </a>
              <div className="flex gap-2.5 text-sm text-cream-300/70">
                <Clock size={16} className="shrink-0 text-taupe-400" />
                {CONTACTS.workHours}
              </div>
            </div>
          </div>
        </div>

        <div className="divider border-cream-300/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-inter text-xs text-cream-300/40">
            © 2026 {CONTACTS.studioName}
          </p>
          <Link
            href="/booking"
            className="font-montserrat text-xs text-taupe-400 hover:text-taupe-300 transition-colors"
          >
            Записаться онлайн →
          </Link>
        </div>
      </div>
    </footer>
  )
}
