'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Check } from 'lucide-react'
import { StepService } from './StepService'
import { StepDateTime } from './StepDateTime'
import { StepContact } from './StepContact'
import { StepConfirmation } from './StepConfirmation'
import { SERVICES } from '@/lib/constants'
import clsx from 'clsx'

export type BookingData = {
  serviceId: string
  date: string
  time: string
  clientName: string
  clientPhone: string
}

const STEPS = ['Услуга', 'Дата и время', 'Контакты', 'Готово']

export function BookingFlow() {
  const searchParams = useSearchParams()
  const preselectedService = searchParams.get('service') ?? ''

  const [step, setStep] = useState(preselectedService ? 1 : 0)
  const [data, setData] = useState<BookingData>({
    serviceId: preselectedService,
    date: '',
    time: '',
    clientName: '',
    clientPhone: '',
  })

  const service = SERVICES.find((s) => s.id === data.serviceId)

  const update = (partial: Partial<BookingData>) =>
    setData((prev) => ({ ...prev, ...partial }))

  return (
    <div className="max-w-2xl mx-auto">

      {/* Progress steps */}
      {step < 3 && (
        <div className="flex items-center justify-center gap-0 mb-10">
          {STEPS.slice(0, 3).map((label, i) => (
            <div key={label} className="flex items-center">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={clsx(
                    'w-8 h-8 rounded-full flex items-center justify-center font-montserrat text-xs font-medium transition-all duration-300',
                    i < step
                      ? 'bg-taupe-500 text-white'
                      : i === step
                        ? 'bg-brown-900 text-white'
                        : 'bg-cream-300 text-muted'
                  )}
                >
                  {i < step ? <Check size={14} /> : i + 1}
                </div>
                <span
                  className={clsx(
                    'font-montserrat text-[10px] tracking-wide whitespace-nowrap',
                    i === step ? 'text-brown-900 font-medium' : 'text-muted'
                  )}
                >
                  {label}
                </span>
              </div>
              {i < 2 && (
                <div
                  className={clsx(
                    'w-16 sm:w-24 h-px mx-2 mb-5 transition-colors duration-300',
                    i < step ? 'bg-taupe-500' : 'bg-cream-300'
                  )}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Steps */}
      {step === 0 && (
        <StepService
          selectedId={data.serviceId}
          onSelect={(id) => { update({ serviceId: id }); setStep(1) }}
        />
      )}
      {step === 1 && (
        <StepDateTime
          serviceId={data.serviceId}
          service={service}
          date={data.date}
          time={data.time}
          onSelect={(date, time) => { update({ date, time }); setStep(2) }}
          onBack={() => setStep(0)}
        />
      )}
      {step === 2 && (
        <StepContact
          data={data}
          service={service}
          onChange={update}
          onSubmit={() => setStep(3)}
          onBack={() => setStep(1)}
        />
      )}
      {step === 3 && (
        <StepConfirmation data={data} service={service} />
      )}
    </div>
  )
}
