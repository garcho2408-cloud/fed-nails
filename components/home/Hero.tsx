'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowDown } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-cream-200">

      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Работы студии маникюра Дарьи Федотовой"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-cream-100/90 via-cream-100/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-cream-100/40 via-transparent to-transparent" />
      </div>

      <div className="container-main relative z-10 py-32 pt-40">
        <div className="max-w-xl">

          {/* Label */}
          <p
            className="section-label mb-4"
            style={{ animation: 'fadeUp 0.6s ease-out 0.1s both' }}
          >
            Студия маникюра · Раменское
          </p>

          {/* H1 */}
          <h1
            className="font-cormorant text-display text-brown-900 text-balance leading-[1.05] mb-6"
            style={{ animation: 'fadeUp 0.6s ease-out 0.25s both' }}
          >
            Твои ногти —{' '}
            <em className="text-taupe-500 not-italic">твой почерк</em>
          </h1>

          {/* Sub */}
          <p
            className="font-inter text-base text-brown-900/60 leading-relaxed mb-8 max-w-sm"
            style={{ animation: 'fadeUp 0.6s ease-out 0.4s both' }}
          >
            Маникюр, педикюр и nail&nbsp;art от мастера с любовью к каждой работе.
            Запись онлайн — без звонков.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-3"
            style={{ animation: 'fadeUp 0.6s ease-out 0.55s both' }}
          >
            <Link href="/booking" className="btn-primary">
              Записаться онлайн
            </Link>
            <Link href="/portfolio" className="btn-secondary">
              Смотреть работы
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-brown-900/40"
        style={{ animation: 'fadeIn 1s ease-out 1.2s both' }}
      >
        <span className="font-montserrat text-[10px] tracking-widest uppercase">Смотреть</span>
        <ArrowDown size={14} className="animate-bounce" />
      </div>
    </section>
  )
}
