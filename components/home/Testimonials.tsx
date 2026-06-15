import Link from 'next/link'
import { Star } from 'lucide-react'
import { TESTIMONIALS } from '@/lib/constants'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={13} className="text-taupe-500" fill="currentColor" />
      ))}
    </div>
  )
}

export function Testimonials() {
  return (
    <section className="py-section bg-cream-100">
      <div className="container-main">

        {/* Header */}
        <AnimatedSection className="text-center mb-12">
          <p className="section-label mb-3">Отзывы клиентов</p>
          <h2 className="section-title">О нас говорят</h2>
        </AnimatedSection>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {TESTIMONIALS.map((review, i) => (
            <AnimatedSection key={review.id} delay={i * 120}>
              <div className="card border border-cream-300 p-6 flex flex-col gap-4 h-full">
                <StarRating count={review.rating} />
                <p className="font-cormorant text-lg text-brown-900 leading-relaxed flex-1 italic">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-cream-200">
                  <span className="font-montserrat text-sm font-medium text-brown-900">
                    {review.name}
                  </span>
                  <span className="font-inter text-xs text-muted">{review.date}</span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/booking" className="btn-primary">
            Записаться к Дарье
          </Link>
          <a
            href="https://yandex.ru/maps/org/studiya_manikyura_fedotovoy_daryi/131575176640/reviews/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            Все отзывы на Яндекс Картах →
          </a>
        </AnimatedSection>
      </div>
    </section>
  )
}
