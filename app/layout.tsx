import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Montserrat, Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600'],
  variable: '--font-montserrat',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Маникюр в Раменском | Студия Дарьи Федотовой | fed.nails',
    template: '%s | fed.nails',
  },
  description: 'Студия маникюра Дарьи Федотовой в Раменском. Маникюр, педикюр, nail art. Запись онлайн. Северное ш., 16А. Работаем без выходных 10:00–20:00.',
  keywords: ['маникюр Раменское', 'педикюр Раменское', 'студия маникюра Раменское', 'nail art Раменское', 'гель-лак Раменское', 'Дарья Федотова маникюр'],
  authors: [{ name: 'fed.nails' }],
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'fed.nails',
    title: 'Студия маникюра Дарьи Федотовой | Раменское',
    description: 'Маникюр, педикюр, nail art в Раменском. Запись онлайн.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FAF8F5',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${cormorant.variable} ${montserrat.variable} ${inter.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
