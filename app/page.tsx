import { Hero } from '@/components/home/Hero'
import { TrustBar } from '@/components/home/TrustBar'
import { ServicesPreview } from '@/components/home/ServicesPreview'
import { PortfolioPreview } from '@/components/home/PortfolioPreview'
import { Testimonials } from '@/components/home/Testimonials'
import { AboutTeaser } from '@/components/home/AboutTeaser'
import { FinalCTA } from '@/components/home/FinalCTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesPreview />
      <PortfolioPreview />
      <Testimonials />
      <AboutTeaser />
      <FinalCTA />
    </>
  )
}
