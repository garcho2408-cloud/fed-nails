import type { Metadata } from 'next'
import { Suspense } from 'react'
import { BookingFlow } from '@/components/booking/BookingFlow'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export const metadata: Metadata = {
  title: 'Запись онлайн',
  description: 'Запишитесь на маникюр или педикюр в студии Дарьи Федотовой. Выберите услугу, дату и время онлайн.',
}

export default function BookingPage() {
  return (
    <div className="pt-28 pb-section">
      <div className="container-main">
        <AnimatedSection className="text-center mb-10">
          <p className="section-label mb-3">fed.nails</p>
          <h1 className="font-cormorant text-h1 text-brown-900 mb-3">Запись онлайн</h1>
          <p className="font-inter text-sm text-muted">
            Выберите услугу, дату и время — это займёт 2 минуты
          </p>
        </AnimatedSection>

        <Suspense fallback={
          <div className="flex justify-center py-20 text-muted font-montserrat text-sm">
            Загрузка...
          </div>
        }>
          <BookingFlow />
        </Suspense>
      </div>
    </div>
  )
}
