'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { PORTFOLIO_CATEGORIES } from '@/lib/constants'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import clsx from 'clsx'

type PortfolioItem = {
  src: string
  alt: string
  category: string
  service?: string
}

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  { src: '/images/portfolio/1.jpg',  alt: 'Молочный маникюр с омбре', category: 'nude', service: 'manicure-gel' },
  { src: '/images/portfolio/2.jpg',  alt: 'Нюд маникюр с шиммером', category: 'nude', service: 'manicure-gel' },
  { src: '/images/portfolio/3.jpg',  alt: 'Натуральный гель-лак', category: 'nude', service: 'manicure-gel' },
  { src: '/images/portfolio/4.jpg',  alt: 'Синий французский маникюр', category: 'french', service: 'manicure-french' },
  { src: '/images/portfolio/5.jpg',  alt: 'Маникюр со звёздами', category: 'art', service: 'manicure-french' },
  { src: '/images/portfolio/6.jpg',  alt: 'Нежный розовый нюд', category: 'nude', service: 'manicure-gel' },
  { src: '/images/portfolio/7.jpg',  alt: 'Белый маникюр с сердечками', category: 'art', service: 'manicure-french' },
  { src: '/images/portfolio/8.jpg',  alt: 'Розовый хром омбре', category: 'ombre', service: 'manicure-gel-long' },
  { src: '/images/portfolio/9.jpg',  alt: 'Классический французский', category: 'french', service: 'manicure-french' },
  { src: '/images/portfolio/10.jpg', alt: 'Лиловый нюд с шиммером', category: 'nude', service: 'manicure-gel' },
  { src: '/images/portfolio/11.jpg', alt: 'Французский на длинных', category: 'french', service: 'manicure-french' },
  { src: '/images/portfolio/12.jpg', alt: 'Лимонный маникюр', category: 'bright', service: 'manicure-gel' },
  { src: '/images/portfolio/13.jpg', alt: 'Бежевый нюд', category: 'nude', service: 'manicure-gel' },
  { src: '/images/portfolio/14.jpg', alt: 'Яркий красный маникюр', category: 'bright', service: 'manicure-gel' },
  { src: '/images/portfolio/15.jpg', alt: 'Красный педикюр', category: 'pedicure', service: 'pedicure-gel' },
  { src: '/images/portfolio/16.jpg', alt: 'Голубой омбре', category: 'ombre', service: 'manicure-gel-long' },
  { src: '/images/portfolio/17.jpg', alt: 'Розовый маникюр', category: 'bright', service: 'manicure-gel' },
  { src: '/images/portfolio/18.jpg', alt: 'Розовый омбре', category: 'ombre', service: 'manicure-gel' },
  { src: '/images/portfolio/19.jpg', alt: 'Чёрный педикюр', category: 'pedicure', service: 'pedicure-full' },
  { src: '/images/portfolio/20.jpg', alt: 'Чёрный леопард', category: 'art', service: 'manicure-french' },
  { src: '/images/portfolio/21.jpg', alt: 'Нюд с опалом', category: 'nude', service: 'manicure-gel' },
  { src: '/images/portfolio/22.jpg', alt: 'Розово-голубой омбре', category: 'ombre', service: 'manicure-gel-long' },
]

export function PortfolioGallery() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightbox, setLightbox] = useState<number | null>(null)

  const filtered = activeCategory === 'all'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory)

  const prev = useCallback(() => {
    if (lightbox === null) return
    setLightbox((lightbox - 1 + filtered.length) % filtered.length)
  }, [lightbox, filtered.length])

  const next = useCallback(() => {
    if (lightbox === null) return
    setLightbox((lightbox + 1) % filtered.length)
  }, [lightbox, filtered.length])

  return (
    <div>
      {/* Category filter */}
      <AnimatedSection>
        <div className="flex flex-wrap gap-2 mb-8">
          {PORTFOLIO_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={clsx(
                'font-montserrat text-xs px-4 py-2 rounded-full border transition-all duration-200',
                activeCategory === cat.id
                  ? 'bg-taupe-500 border-taupe-500 text-white'
                  : 'border-cream-300 text-brown-900/60 hover:border-taupe-400 hover:text-brown-900 bg-white'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </AnimatedSection>

      {/* Masonry grid */}
      <div className="columns-2 sm:columns-3 gap-3 md:gap-4 space-y-3 md:space-y-4">
        {filtered.map((item, i) => (
          <AnimatedSection key={item.src} delay={i * 40}>
            <button
              onClick={() => setLightbox(i)}
              className="block w-full group break-inside-avoid"
            >
              <div className="relative rounded-2xl overflow-hidden bg-cream-300">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-brown-900/0 group-hover:bg-brown-900/25 transition-colors duration-300 flex items-end p-3">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between w-full">
                    <span className="font-montserrat text-xs text-white">{item.alt}</span>
                    <Link
                      href={`/booking?service=${item.service}`}
                      onClick={(e) => e.stopPropagation()}
                      className="font-montserrat text-xs text-white bg-taupe-500/80 px-2.5 py-1 rounded-full hover:bg-taupe-500 transition-colors"
                    >
                      Записаться
                    </Link>
                  </div>
                </div>
              </div>
            </button>
          </AnimatedSection>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-brown-900/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          {/* Close */}
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-cream-100/10 text-cream-100 flex items-center justify-center hover:bg-cream-100/20 transition-colors"
          >
            <X size={20} />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-4 w-10 h-10 rounded-full bg-cream-100/10 text-cream-100 flex items-center justify-center hover:bg-cream-100/20 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Image */}
          <div
            className="relative max-w-2xl max-h-[85vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={filtered[lightbox].src}
              alt={filtered[lightbox].alt}
              width={800}
              height={1000}
              className="w-full h-auto max-h-[85vh] object-contain rounded-2xl"
              sizes="100vw"
            />
            <div className="mt-3 flex items-center justify-between">
              <p className="font-cormorant text-lg text-cream-100 italic">
                {filtered[lightbox].alt}
              </p>
              <Link
                href={`/booking?service=${filtered[lightbox].service}`}
                className="font-montserrat text-xs text-white bg-taupe-500 px-4 py-2 rounded-full hover:bg-taupe-600 transition-colors flex items-center gap-1.5"
              >
                Записаться на этот дизайн <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-4 w-10 h-10 rounded-full bg-cream-100/10 text-cream-100 flex items-center justify-center hover:bg-cream-100/20 transition-colors"
          >
            <ChevronRight size={20} />
          </button>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-montserrat text-xs text-cream-300/60">
            {lightbox + 1} / {filtered.length}
          </div>
        </div>
      )}
    </div>
  )
}
