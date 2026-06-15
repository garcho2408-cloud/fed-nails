import type { Metadata } from 'next'
import Link from 'next/link'
import { PortfolioGallery } from '@/components/portfolio/PortfolioGallery'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export const metadata: Metadata = {
  title: 'Портфолио',
  description: 'Работы студии маникюра Дарьи Федотовой. Маникюр, педикюр, nail art, французский, омбре.',
}

export default function PortfolioPage() {
  return (
    <div className="pt-28 pb-section">
      <div className="container-main">

        {/* Header */}
        <AnimatedSection className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="section-label mb-3">Студия fed.nails</p>
              <h1 className="font-cormorant text-h1 text-brown-900">Портфолио</h1>
            </div>
            <Link href="/booking" className="btn-primary self-start sm:self-auto">
              Записаться
            </Link>
          </div>
        </AnimatedSection>

        <PortfolioGallery />
      </div>
    </div>
  )
}
