import Link from 'next/link'
import { CheckCircle2, MessageCircle, Instagram, Calendar } from 'lucide-react'
import { type Service } from '@/lib/constants'
import { CONTACTS } from '@/lib/constants'
import { type BookingData } from './BookingFlow'

interface StepConfirmationProps {
  data: BookingData
  service?: Service
}

export function StepConfirmation({ data, service }: StepConfirmationProps) {
  const formattedDate = data.date
    ? new Date(data.date).toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })
    : ''

  return (
    <div className="text-center flex flex-col items-center gap-6">
      <div className="w-20 h-20 rounded-full bg-taupe-500/10 flex items-center justify-center">
        <CheckCircle2 size={40} className="text-taupe-500" />
      </div>

      <div>
        <h2 className="font-cormorant text-h2 text-brown-900 mb-2">Запись подтверждена!</h2>
        <p className="font-inter text-sm text-muted max-w-xs">
          Дарья получила уведомление и ждёт вас
        </p>
      </div>

      {/* Booking details */}
      <div className="w-full bg-cream-200 rounded-3xl p-6 text-left flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span className="font-montserrat text-xs text-muted">Услуга</span>
          <span className="font-montserrat text-sm font-medium text-brown-900">{service?.name}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-montserrat text-xs text-muted">Дата</span>
          <span className="font-montserrat text-sm text-brown-900 capitalize">{formattedDate}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-montserrat text-xs text-muted">Время</span>
          <span className="font-montserrat text-sm font-semibold text-taupe-500">{data.time}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-montserrat text-xs text-muted">Длительность</span>
          <span className="font-montserrat text-sm text-brown-900">{service?.durationLabel}</span>
        </div>
        <div className="border-t border-cream-300 pt-3 flex justify-between items-center">
          <span className="font-montserrat text-xs text-muted">Стоимость</span>
          <span className="font-montserrat text-sm font-semibold text-brown-900">{service?.priceLabel}</span>
        </div>
      </div>

      {/* Address */}
      <div className="w-full bg-white rounded-2xl border border-cream-300 p-4 text-left">
        <p className="font-montserrat text-xs text-muted mb-1">Адрес студии</p>
        <p className="font-inter text-sm text-brown-900">{CONTACTS.addressFull}</p>
        <a
          href={CONTACTS.yandexMaps}
          target="_blank"
          rel="noopener noreferrer"
          className="font-montserrat text-xs text-taupe-500 hover:text-taupe-600 mt-1 inline-block"
        >
          Открыть на Яндекс Картах →
        </a>
      </div>

      {/* Social links */}
      <div className="flex gap-3 w-full">
        <a
          href={CONTACTS.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border border-cream-300 hover:border-taupe-400 font-montserrat text-sm text-brown-900 transition-colors"
        >
          <MessageCircle size={16} /> WhatsApp
        </a>
        <a
          href={CONTACTS.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border border-cream-300 hover:border-taupe-400 font-montserrat text-sm text-brown-900 transition-colors"
        >
          <Instagram size={16} /> Instagram
        </a>
      </div>

      <Link href="/" className="btn-ghost">
        На главную
      </Link>
    </div>
  )
}
