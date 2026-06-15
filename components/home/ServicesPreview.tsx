import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import { SERVICES } from '@/lib/constants'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

const PREVIEW = SERVICES.filter((s) => s.isPopular)

export function ServicesPreview() {
  return (
    <section className="py-section bg-cream-100">
      <div className="container-main">

        {/* Header */}
        <AnimatedSection className="text-center mb-12">
          <p className="section-label mb-3">Что мы делаем</p>
          <h2 className="section-title">Услуги и цены</h2>
        </AnimatedSection>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {PREVIEW.map((service, i) => (
            <AnimatedSection key={service.id} delay={i * 100}>
              <div className="card border border-cream-300 hover:border-taupe-400 transition-colors duration-300 h-full p-6 flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <h3 className="font-cormorant text-h3 text-brown-900 leading-tight">
                    {service.name}
                  </h3>
                  <span className="font-montserrat text-sm font-medium text-taupe-500 whitespace-nowrap ml-3">
                    {service.priceLabel}
                  </span>
                </div>
                <p className="font-inter text-sm text-muted leading-relaxed flex-1">
                  {service.description}
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-cream-200">
                  <div className="flex items-center gap-1.5 text-muted">
                    <Clock size={13} />
                    <span className="font-montserrat text-xs">{service.durationLabel}</span>
                  </div>
                  <Link
                    href={`/booking?service=${service.id}`}
                    className="btn-ghost text-xs"
                  >
                    Записаться <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* All services link */}
        <AnimatedSection className="text-center mt-10">
          <Link href="/services" className="btn-secondary">
            Все услуги и цены
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}
