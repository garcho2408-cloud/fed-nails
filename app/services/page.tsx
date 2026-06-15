import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock, ArrowRight, Sparkles } from 'lucide-react'
import { SERVICES } from '@/lib/constants'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export const metadata: Metadata = {
  title: 'Услуги и цены',
  description: 'Маникюр, педикюр и nail art в Раменском. Прозрачные цены, описание каждой услуги.',
}

const CATEGORIES = [
  { id: 'manicure', label: 'Маникюр' },
  { id: 'pedicure', label: 'Педикюр' },
  { id: 'complex',  label: 'Комплексы' },
]

export default function ServicesPage() {
  return (
    <div className="pt-28 pb-section">
      <div className="container-main">

        {/* Header */}
        <AnimatedSection className="text-center mb-14">
          <p className="section-label mb-3">Студия маникюра Дарьи Федотовой</p>
          <h1 className="font-cormorant text-h1 text-brown-900 mb-4">Услуги и цены</h1>
          <p className="font-inter text-base text-muted max-w-md mx-auto">
            В стоимость уже включены снятие покрытия и все необходимые материалы.
          </p>
        </AnimatedSection>

        {/* Sections by category */}
        {CATEGORIES.map((cat, ci) => {
          const items = SERVICES.filter((s) => s.category === cat.id)
          return (
            <AnimatedSection key={cat.id} delay={ci * 80} className="mb-14">
              <div className="flex items-center gap-4 mb-6">
                <h2 className="font-cormorant text-h2 text-brown-900">{cat.label}</h2>
                <div className="flex-1 h-px bg-cream-300" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((service, i) => (
                  <div
                    key={service.id}
                    className="card border border-cream-300 hover:border-taupe-400 hover:shadow-sm transition-all duration-300 p-6 flex flex-col gap-3 relative"
                  >
                    {service.isPopular && (
                      <div className="absolute top-4 right-4 flex items-center gap-1 bg-taupe-500/10 text-taupe-600 px-2.5 py-1 rounded-full">
                        <Sparkles size={10} />
                        <span className="font-montserrat text-[10px] font-medium">Популярное</span>
                      </div>
                    )}

                    <h3 className="font-cormorant text-h3 text-brown-900 leading-tight pr-20">
                      {service.name}
                    </h3>

                    <p className="font-inter text-sm text-muted leading-relaxed flex-1">
                      {service.description}
                    </p>

                    {service.extras && service.extras.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {service.extras.map((extra) => (
                          <span
                            key={extra.name}
                            className="font-montserrat text-xs px-2.5 py-1 rounded-full bg-cream-200 text-brown-900/50"
                          >
                            + {extra.name} {extra.price} ₽
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-3 border-t border-cream-200 mt-1">
                      <div className="flex items-center gap-3">
                        <span className="font-montserrat text-base font-semibold text-brown-900">
                          {service.priceLabel}
                        </span>
                        <span className="flex items-center gap-1 text-muted">
                          <Clock size={12} />
                          <span className="font-montserrat text-xs">{service.durationLabel}</span>
                        </span>
                      </div>
                      <Link
                        href={`/booking?service=${service.id}`}
                        className="btn-ghost text-xs"
                      >
                        Записаться <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          )
        })}

        {/* Bottom CTA */}
        <AnimatedSection className="text-center mt-4">
          <div className="bg-cream-200 rounded-3xl p-8 flex flex-col items-center gap-4">
            <h3 className="font-cormorant text-h3 text-brown-900">Готовы к записи?</h3>
            <p className="font-inter text-sm text-muted max-w-sm text-center">
              Выберите удобный день и время прямо сейчас
            </p>
            <Link href="/booking" className="btn-primary">
              Записаться онлайн
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
