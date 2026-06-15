import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2, Instagram, MessageCircle, Send } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { CONTACTS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'О мастере',
  description: 'Дарья Федотова — мастер маникюра в Раменском. Узнайте больше о студии, подходе к работе и ценностях.',
}

const VALUES = [
  'Работаю только с профессиональными материалами',
  'Стерильные инструменты для каждого клиента',
  'Слежу за трендами nail art и постоянно развиваюсь',
  'Индивидуальный подход — выслушаю и предложу лучшее',
  'Уютная атмосфера — вы отдохнёте, пока я работаю',
]

const SOCIALS = [
  { href: CONTACTS.instagram, label: '@fed.nails.fed', icon: Instagram, desc: 'Instagram' },
  { href: CONTACTS.whatsapp, label: 'WhatsApp', icon: MessageCircle, desc: 'Написать' },
  { href: CONTACTS.telegram, label: 'Telegram', icon: Send, desc: 'Написать' },
]

export default function AboutPage() {
  return (
    <div className="pt-28 pb-section">
      <div className="container-main">

        {/* Hero block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center mb-20">
          <AnimatedSection>
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-cream-300 max-w-sm mx-auto md:mx-0">
              <Image
                src="/images/master.jpg"
                alt="Дарья Федотова — мастер маникюра в Раменском"
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 768px) 90vw, 45vw"
              />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={150} className="flex flex-col gap-5">
            <p className="section-label">О мастере</p>
            <h1 className="font-cormorant text-h1 text-brown-900">
              Дарья Федотова
            </h1>
            <div className="space-y-4 font-inter text-base text-brown-900/70 leading-relaxed">
              <p>
                Студия маникюра — это моё пространство, где каждая работа создаётся с вниманием к деталям. Я верю, что ногти — это не просто уход, а способ выразить себя.
              </p>
              <p>
                Работаю в Раменском, принимаю по предварительной записи. Для меня важно, чтобы вы уходили не только с красивым маникюром, но и с хорошим настроением.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              {SOCIALS.map(({ href, label, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-cream-300 hover:border-taupe-400 font-montserrat text-sm text-brown-900 transition-colors"
                >
                  <Icon size={15} className="text-taupe-500" />
                  {label}
                </a>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Values */}
        <AnimatedSection className="mb-16">
          <div className="bg-cream-200 rounded-3xl p-8 md:p-12">
            <p className="section-label mb-4">Мои принципы</p>
            <h2 className="section-title mb-8">Почему выбирают мою студию</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {VALUES.map((value, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-taupe-500 shrink-0 mt-0.5" />
                  <p className="font-inter text-sm text-brown-900/80 leading-relaxed">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection className="text-center">
          <p className="font-cormorant text-h2 text-brown-900 mb-4">
            Запишитесь прямо сейчас
          </p>
          <p className="font-inter text-sm text-muted mb-6">
            Пн–Вс, 10:00–20:00 · {CONTACTS.address}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/booking" className="btn-primary">
              Записаться онлайн
            </Link>
            <a href={CONTACTS.phoneHref} className="btn-secondary">
              {CONTACTS.phone}
            </a>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
