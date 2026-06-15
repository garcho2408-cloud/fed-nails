'use client'

import { useState } from 'react'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { type Service } from '@/lib/constants'
import { type BookingData } from './BookingFlow'
import clsx from 'clsx'

interface StepContactProps {
  data: BookingData
  service?: Service
  onChange: (partial: Partial<BookingData>) => void
  onSubmit: () => void
  onBack: () => void
}

export function StepContact({ data, service, onChange, onSubmit, onBack }: StepContactProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const formattedDate = data.date
    ? new Date(data.date).toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })
    : ''

  const handleSubmit = async () => {
    setError('')
    if (!data.clientName.trim()) { setError('Введите ваше имя'); return }
    if (!data.clientPhone.trim()) { setError('Введите номер телефона'); return }

    setLoading(true)
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: data.serviceId,
          date: data.date,
          time: data.time,
          clientName: data.clientName,
          clientPhone: data.clientPhone,
        }),
      })
      const json = await res.json()
      if (!res.ok) { setError(json.error ?? 'Ошибка. Попробуйте ещё раз.'); return }
      onSubmit()
    } catch {
      setError('Ошибка сети. Попробуйте ещё раз.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button onClick={onBack} className="btn-ghost mb-6">
        <ArrowLeft size={15} /> Назад
      </button>

      <h2 className="font-cormorant text-h2 text-brown-900 mb-6">Ваши данные</h2>

      {/* Summary */}
      <div className="bg-cream-200 rounded-2xl p-4 mb-6 flex flex-col gap-2">
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
        <div className="flex justify-between items-center pt-2 border-t border-cream-300">
          <span className="font-montserrat text-xs text-muted">Стоимость</span>
          <span className="font-montserrat text-sm font-semibold text-brown-900">{service?.priceLabel}</span>
        </div>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-4 mb-6">
        <div>
          <label className="block font-montserrat text-xs font-medium text-brown-900 mb-2">
            Ваше имя *
          </label>
          <input
            type="text"
            placeholder="Анна"
            value={data.clientName}
            onChange={(e) => onChange({ clientName: e.target.value })}
            className="w-full px-4 py-3 rounded-2xl border border-cream-300 bg-white font-inter text-sm text-brown-900 placeholder:text-muted focus:outline-none focus:border-taupe-400 transition-colors"
          />
        </div>
        <div>
          <label className="block font-montserrat text-xs font-medium text-brown-900 mb-2">
            Номер телефона *
          </label>
          <input
            type="tel"
            placeholder="+7 (___) ___-__-__"
            value={data.clientPhone}
            onChange={(e) => onChange({ clientPhone: e.target.value })}
            className="w-full px-4 py-3 rounded-2xl border border-cream-300 bg-white font-inter text-sm text-brown-900 placeholder:text-muted focus:outline-none focus:border-taupe-400 transition-colors"
          />
        </div>
      </div>

      {error && (
        <p className="font-inter text-sm text-red-500 mb-4 px-1">{error}</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className={clsx(
          'w-full py-4 rounded-2xl font-montserrat text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2',
          loading
            ? 'bg-cream-300 text-muted cursor-not-allowed'
            : 'bg-taupe-500 hover:bg-taupe-600 text-white'
        )}
      >
        {loading && <Loader2 size={16} className="animate-spin" />}
        {loading ? 'Отправляем...' : 'Подтвердить запись'}
      </button>

      <p className="font-inter text-xs text-muted text-center mt-4">
        Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
      </p>
    </div>
  )
}
