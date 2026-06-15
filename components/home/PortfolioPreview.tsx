import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

const PREVIEW_IMAGES = [
  { src: '/images/portfolio/1.jpg', alt: 'Молочный маникюр с омбре' },
  { src: '/images/portfolio/2.jpg', alt: 'Нюд маникюр с шиммером' },
  { src: '/images/portfolio/3.jpg', alt: 'Классический французский маникюр' },
  { src: '/images/portfolio/4.jpg', alt: 'Маникюр с дизайном звёзды' },
  { src: '/images/portfolio/5.jpg', alt: 'Розовый омбре маникюр' },
  { src: '/images/portfolio/6.jpg', alt: 'Яркий красный маникюр' },
]

export function PortfolioPreview() {
  return (
    <section className="py-section bg-cream-200">
      <div className="container-main">

        {/* Header */}
        <AnimatedSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="section-label mb-3">Наши работы</p>
            <h2 className="section-title">Портфолио</h2>
          </div>
          <Link href="/portfolio" className="btn-ghost">
            Смотреть все <ArrowRight size={15} />
          </Link>
        </AnimatedSection>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
          {PREVIEW_IMAGES.map((img, i) => (
            <AnimatedSection key={img.src} delay={i * 80}>
              <Link href="/portfolio" className="block group">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-cream-300">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-brown-900/0 group-hover:bg-brown-900/20 transition-colors duration-300 flex items-end p-3">
                    <span className="font-montserrat text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {img.alt}
                    </span>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        {/* Mobile CTA */}
        <AnimatedSection className="text-center mt-8 sm:hidden">
          <Link href="/portfolio" className="btn-secondary">
            Все работы <ArrowRight size={15} />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}
