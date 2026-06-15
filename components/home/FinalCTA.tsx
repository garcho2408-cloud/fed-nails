import Link from 'next/link'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { CONTACTS } from '@/lib/constants'

export function FinalCTA() {
  return (
    <section className="py-section bg-brown-900 overflow-hidden relative">
      {/* Decorative circle */}
      <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-taupe-700/20 blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-taupe-600/10 blur-3xl pointer-events-none" />

      <div className="container-main relative z-10 text-center">
        <AnimatedSection className="flex flex-col items-center gap-6">
          <p className="section-label text-taupe-400">Готова к новому образу?</p>
          <h2 className="font-cormorant text-h1 text-cream-100 text-balance max-w-lg">
            Запишитесь онлайн — это займёт{' '}
            <em className="text-taupe-400 not-italic">2 минуты</em>
          </h2>
          <p className="font-inter text-sm text-cream-300/60 max-w-xs">
            Выберите услугу, удобный день и время — без звонков и ожидания.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Link href="/booking" className="btn-primary">
              Записаться онлайн
            </Link>
            <a
              href={CONTACTS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-cream-300/30 text-cream-100/70 hover:text-cream-100 hover:border-cream-300/60 font-montserrat text-sm font-medium px-7 py-3.5 rounded-full transition-all duration-200"
            >
              Написать в WhatsApp
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
