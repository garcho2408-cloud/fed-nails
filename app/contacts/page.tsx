import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Phone, Clock, Instagram, MessageCircle, Send } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { CONTACTS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Контакты',
  description: 'Студия маникюра Дарьи Федотовой. Северное шоссе 16А, Раменское. Телефон, WhatsApp, Telegram, Instagram.',
}

const CONTACT_ITEMS = [
  {
    icon: MapPin,
    label: 'Адрес',
    value: CONTACTS.addressFull,
    href: CONTACTS.yandexMaps,
    linkLabel: 'Открыть на Яндекс Картах →',
    external: true,
  },
  {
    icon: Phone,
    label: 'Телефон',
    value: CONTACTS.phone,
    href: CONTACTS.phoneHref,
    linkLabel: 'Позвонить',
    external: false,
  },
  {
    icon: Clock,
    label: 'Часы работы',
    value: 'Понедельник – Воскресенье',
    subValue: '10:00 – 20:00',
    href: null,
    linkLabel: null,
    external: false,
  },
]

const SOCIAL_ITEMS = [
  { href: CONTACTS.instagram, label: 'Instagram', sublabel: '@fed.nails.fed', icon: Instagram, color: 'bg-gradient-to-br from-purple-500 to-pink-500' },
  { href: CONTACTS.whatsapp, label: 'WhatsApp', sublabel: 'Написать сообщение', icon: MessageCircle, color: 'bg-[#25D366]' },
  { href: CONTACTS.telegram, label: 'Telegram', sublabel: 'Написать в Telegram', icon: Send, color: 'bg-[#2AABEE]' },
]

export default function ContactsPage() {
  return (
    <div className="pt-28 pb-section">
      <div className="container-main">

        {/* Header */}
        <AnimatedSection className="mb-12">
          <p className="section-label mb-3">Студия fed.nails</p>
          <h1 className="font-cormorant text-h1 text-brown-900 mb-4">Контакты</h1>
          <p className="font-inter text-sm text-muted max-w-md">
            Находимся в Раменском. Принимаем по предварительной записи.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Left: contacts + socials */}
          <div className="flex flex-col gap-6">

            {/* Contact info */}
            <AnimatedSection>
              <div className="card border border-cream-300 p-6 flex flex-col gap-5">
                {CONTACT_ITEMS.map(({ icon: Icon, label, value, subValue, href, linkLabel, external }) => (
                  <div key={label} className="flex gap-4 items-start">
                    <div className="w-9 h-9 rounded-full bg-cream-200 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-taupe-500" />
                    </div>
                    <div>
                      <p className="font-montserrat text-xs text-muted mb-0.5">{label}</p>
                      <p className="font-inter text-sm text-brown-900">{value}</p>
                      {subValue && <p className="font-inter text-sm font-medium text-brown-900">{subValue}</p>}
                      {href && linkLabel && (
                        <a
                          href={href}
                          target={external ? '_blank' : undefined}
                          rel={external ? 'noopener noreferrer' : undefined}
                          className="font-montserrat text-xs text-taupe-500 hover:text-taupe-600 mt-1 inline-block transition-colors"
                        >
                          {linkLabel}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Social links */}
            <AnimatedSection delay={100}>
              <p className="section-label mb-4">Мы в соцсетях</p>
              <div className="flex flex-col gap-3">
                {SOCIAL_ITEMS.map(({ href, label, sublabel, icon: Icon, color }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-cream-300 hover:border-taupe-400 transition-colors group"
                  >
                    <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-white shrink-0`}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="font-montserrat text-sm font-medium text-brown-900 group-hover:text-taupe-600 transition-colors">
                        {label}
                      </p>
                      <p className="font-inter text-xs text-muted">{sublabel}</p>
                    </div>
                  </a>
                ))}
              </div>
            </AnimatedSection>

            {/* Booking CTA */}
            <AnimatedSection delay={200}>
              <Link
                href="/booking"
                className="flex items-center justify-between bg-taupe-500 hover:bg-taupe-600 text-white rounded-2xl p-5 transition-colors group"
              >
                <div>
                  <p className="font-montserrat text-sm font-medium">Записаться онлайн</p>
                  <p className="font-inter text-xs text-white/70 mt-0.5">Выберите удобный день и время</p>
                </div>
                <span className="font-montserrat text-lg group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </AnimatedSection>
          </div>

          {/* Right: Yandex Map embed */}
          <AnimatedSection delay={150} className="h-full min-h-[400px] lg:min-h-0">
            <div className="rounded-3xl overflow-hidden border border-cream-300 h-full min-h-[400px]">
              <iframe
                src="https://yandex.ru/map-widget/v1/-/CDz5FTyA"
                width="100%"
                height="100%"
                style={{ minHeight: '400px', border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Студия маникюра Дарьи Федотовой на карте"
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  )
}
