'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ArrowLeft, Loader2 } from 'lucide-react'
import { type Service } from '@/lib/constants'
import clsx from 'clsx'

interface StepDateTimeProps {
  serviceId: string
  service?: Service
  date: string
  time: string
  onSelect: (date: string, time: string) => void
  onBack: () => void
}

const WEEKDAYS = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
const MONTHS = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь']

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
}

export function StepDateTime({ serviceId, service, date, time, onSelect, onBack }: StepDateTimeProps) {
  const today = new Date()
  const [viewMonth, setViewMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [selectedDate, setSelectedDate] = useState<Date | null>(date ? new Date(date) : null)
  const [selectedTime, setSelectedTime] = useState(time)
  const [slots, setSlots] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!selectedDate) return
    const dateStr = selectedDate.toISOString().split('T')[0]
    setLoading(true)
    fetch(`/api/slots?service=${serviceId}&date=${dateStr}`)
      .then((r) => r.json())
      .then((d) => { setSlots(d.slots ?? []); setSelectedTime('') })
      .finally(() => setLoading(false))
  }, [selectedDate, serviceId])

  const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate()
  const firstDayOfWeek = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1).getDay()
  const adjustedFirst = (firstDayOfWeek + 6) % 7 // Monday first

  const calendarDays: (Date | null)[] = [
    ...Array(adjustedFirst).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) =>
      new Date(viewMonth.getFullYear(), viewMonth.getMonth(), i + 1)
    ),
  ]

  const handleDateClick = (day: Date) => {
    if (day < new Date(today.getFullYear(), today.getMonth(), today.getDate())) return
    setSelectedDate(day)
  }

  const handleContinue = () => {
    if (!selectedDate || !selectedTime) return
    onSelect(selectedDate.toISOString().split('T')[0], selectedTime)
  }

  return (
    <div>
      <button onClick={onBack} className="btn-ghost mb-6">
        <ArrowLeft size={15} /> Назад
      </button>

      {service && (
        <div className="bg-cream-200 rounded-2xl p-4 mb-6 flex items-center justify-between">
          <span className="font-montserrat text-sm text-brown-900">{service.name}</span>
          <span className="font-montserrat text-sm font-semibold text-taupe-500">{service.priceLabel}</span>
        </div>
      )}

      <h2 className="font-cormorant text-h2 text-brown-900 mb-6">Выберите дату</h2>

      {/* Calendar */}
      <div className="bg-white rounded-3xl border border-cream-300 p-5 mb-6">
        {/* Month nav */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1))}
            className="w-8 h-8 rounded-full hover:bg-cream-200 flex items-center justify-center text-brown-900/60 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="font-montserrat text-sm font-medium text-brown-900">
            {MONTHS[viewMonth.getMonth()]} {viewMonth.getFullYear()}
          </span>
          <button
            onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1))}
            className="w-8 h-8 rounded-full hover:bg-cream-200 flex items-center justify-center text-brown-900/60 transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Weekdays */}
        <div className="grid grid-cols-7 mb-2">
          {['Пн','Вт','Ср','Чт','Пт','Сб','Вс'].map((d) => (
            <div key={d} className="text-center font-montserrat text-[10px] text-muted py-1">{d}</div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, i) => {
            if (!day) return <div key={i} />
            const isPast = day < new Date(today.getFullYear(), today.getMonth(), today.getDate())
            const isSelected = selectedDate && isSameDay(day, selectedDate)
            const isToday = isSameDay(day, today)
            return (
              <button
                key={i}
                onClick={() => handleDateClick(day)}
                disabled={isPast}
                className={clsx(
                  'aspect-square rounded-xl font-montserrat text-xs transition-all duration-150',
                  isSelected && 'bg-taupe-500 text-white',
                  !isSelected && isToday && 'border border-taupe-400 text-taupe-600',
                  !isSelected && !isToday && !isPast && 'hover:bg-cream-200 text-brown-900',
                  isPast && 'text-cream-400 cursor-not-allowed'
                )}
              >
                {day.getDate()}
              </button>
            )
          })}
        </div>
      </div>

      {/* Time slots */}
      {selectedDate && (
        <div className="mb-6">
          <h3 className="font-cormorant text-h3 text-brown-900 mb-4">Выберите время</h3>
          {loading ? (
            <div className="flex items-center justify-center py-8 text-muted">
              <Loader2 size={20} className="animate-spin mr-2" /> Загружаем слоты...
            </div>
          ) : slots.length === 0 ? (
            <p className="font-inter text-sm text-muted py-4 text-center">
              На этот день нет свободных окошек. Выберите другую дату.
            </p>
          ) : (
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {slots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedTime(slot)}
                  className={clsx(
                    'py-2.5 rounded-xl font-montserrat text-sm transition-all duration-150',
                    selectedTime === slot
                      ? 'bg-taupe-500 text-white'
                      : 'bg-cream-200 text-brown-900 hover:bg-cream-300'
                  )}
                >
                  {slot}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <button
        onClick={handleContinue}
        disabled={!selectedDate || !selectedTime}
        className={clsx(
          'w-full py-4 rounded-2xl font-montserrat text-sm font-medium transition-all duration-200',
          selectedDate && selectedTime
            ? 'bg-taupe-500 hover:bg-taupe-600 text-white'
            : 'bg-cream-300 text-muted cursor-not-allowed'
        )}
      >
        Продолжить
      </button>
    </div>
  )
}
