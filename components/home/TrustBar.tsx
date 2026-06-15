import { Star, MapPin, Clock, Award } from 'lucide-react'
import { CONTACTS } from '@/lib/constants'

const ITEMS = [
  { icon: Star, text: '4.1 на Яндекс Картах', fill: true },
  { icon: MapPin, text: 'Раменское, Северное ш. 16А' },
  { icon: Clock, text: 'Пн–Вс, 10:00–20:00' },
  { icon: Award, text: 'Запись онлайн — 24/7' },
]

export function TrustBar() {
  return (
    <div className="bg-cream-200 border-y border-cream-300">
      <div className="container-main py-4">
        <div className="flex flex-wrap justify-center md:justify-between gap-x-8 gap-y-2">
          {ITEMS.map(({ icon: Icon, text, fill }) => (
            <div key={text} className="flex items-center gap-2">
              <Icon
                size={14}
                className="text-taupe-500 shrink-0"
                fill={fill ? 'currentColor' : 'none'}
              />
              <span className="font-montserrat text-xs text-brown-900/60 whitespace-nowrap">
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
