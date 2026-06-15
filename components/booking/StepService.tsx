import { Clock, Sparkles } from 'lucide-react'
import { SERVICES } from '@/lib/constants'
import clsx from 'clsx'

interface StepServiceProps {
  selectedId: string
  onSelect: (id: string) => void
}

const CATEGORIES = [
  { id: 'manicure', label: 'Маникюр' },
  { id: 'pedicure', label: 'Педикюр' },
  { id: 'complex',  label: 'Комплекс' },
]

export function StepService({ selectedId, onSelect }: StepServiceProps) {
  return (
    <div>
      <h2 className="font-cormorant text-h2 text-brown-900 mb-2">Выберите услугу</h2>
      <p className="font-inter text-sm text-muted mb-8">
        В стоимость включены снятие и все материалы
      </p>

      {CATEGORIES.map((cat) => {
        const items = SERVICES.filter((s) => s.category === cat.id)
        return (
          <div key={cat.id} className="mb-8">
            <p className="section-label mb-4">{cat.label}</p>
            <div className="flex flex-col gap-2">
              {items.map((service) => (
                <button
                  key={service.id}
                  onClick={() => onSelect(service.id)}
                  className={clsx(
                    'w-full text-left p-4 rounded-2xl border transition-all duration-200',
                    selectedId === service.id
                      ? 'border-taupe-500 bg-taupe-500/5'
                      : 'border-cream-300 bg-white hover:border-taupe-400'
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-montserrat text-sm font-medium text-brown-900">
                          {service.name}
                        </span>
                        {service.isPopular && (
                          <span className="flex items-center gap-0.5 text-taupe-500">
                            <Sparkles size={10} />
                            <span className="font-montserrat text-[10px]">Популярное</span>
                          </span>
                        )}
                      </div>
                      <p className="font-inter text-xs text-muted leading-relaxed">
                        {service.description}
                      </p>
                      {service.extras && (
                        <p className="font-inter text-xs text-taupe-500 mt-1">
                          {service.extras.map((e) => `+ ${e.name} ${e.price} ₽`).join(' · ')}
                        </p>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-montserrat text-sm font-semibold text-brown-900">
                        {service.priceLabel}
                      </p>
                      <p className="flex items-center justify-end gap-1 text-muted mt-0.5">
                        <Clock size={11} />
                        <span className="font-montserrat text-xs">{service.durationLabel}</span>
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
