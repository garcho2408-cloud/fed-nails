import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export function AboutTeaser() {
  return (
    <section className="py-section bg-cream-200 overflow-hidden">
      <div className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Image */}
          <AnimatedSection>
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-cream-300 max-w-sm mx-auto md:mx-0">
              <Image
                src="/images/master.jpg"
                alt="Дарья Федотова — мастер маникюра"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 90vw, 45vw"
              />
            </div>
          </AnimatedSection>

          {/* Text */}
          <AnimatedSection delay={150} className="flex flex-col gap-5">
            <p className="section-label">О мастере</p>
            <h2 className="section-title">
              Дарья Федотова
            </h2>
            <div className="space-y-4 font-inter text-base text-brown-900/70 leading-relaxed">
              <p>
                Студия маникюра — это моё пространство, где каждая работа создаётся с вниманием к деталям и желанием подарить вам результат, которым хочется делиться.
              </p>
              <p>
                Работаю только с качественными материалами, соблюдаю стерильность и слежу за каждой тенденцией в nail&nbsp;art.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 pt-2">
              {['Nail Art', 'Омбре', 'Французский', 'Укрепление'].map((tag) => (
                <span
                  key={tag}
                  className="font-montserrat text-xs px-3 py-1.5 rounded-full bg-cream-100 border border-cream-300 text-brown-900/60"
                >
                  {tag}
                </span>
              ))}
            </div>
            <Link href="/about" className="btn-ghost mt-2">
              Узнать больше <ArrowRight size={15} />
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
