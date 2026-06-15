export const CONTACTS = {
  phone: '+7 (966) 172-50-56',
  phoneHref: 'tel:+79661725056',
  whatsapp: 'https://wa.me/79661725056?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%21+%D0%A5%D0%BE%D1%87%D1%83+%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D0%B0%D1%82%D1%8C%D1%81%D1%8F+%D0%BD%D0%B0+%D0%BC%D0%B0%D0%BD%D0%B8%D0%BA%D1%8E%D1%80',
  telegram: 'https://t.me/+79661725056',
  instagram: 'https://www.instagram.com/fed.nails.fed',
  yandexMaps: 'https://yandex.ru/maps/org/studiya_manikyura_fedotovoy_daryi/131575176640',
  address: 'Северное ш., 16А, Раменское',
  addressFull: 'Северное шоссе, 16А, Раменское (вход со двора)',
  workHours: 'Пн–Вс, 10:00–20:00',
  masterName: 'Дарья Федотова',
  studioName: 'Студия маникюра Дарьи Федотовой',
}

export type Service = {
  id: string
  name: string
  description: string
  price: number
  priceLabel: string
  duration: number
  durationLabel: string
  category: 'manicure' | 'pedicure' | 'complex'
  isPopular?: boolean
  extras?: { name: string; price: number }[]
}

export const SERVICES: Service[] = [
  {
    id: 'manicure-gel',
    name: 'Маникюр + гель-лак',
    description: 'Снятие, маникюр, укрепление гелем, ремонты, однотон',
    price: 2500,
    priceLabel: '2 500 ₽',
    duration: 100,
    durationLabel: '1 ч 40 мин',
    category: 'manicure',
    isPopular: true,
    extras: [{ name: 'Дизайн', price: 300 }],
  },
  {
    id: 'manicure-gel-long',
    name: 'Маникюр + гель-лак (длинные)',
    description: 'Снятие, маникюр, укрепление гелем, однотон',
    price: 2800,
    priceLabel: '2 800 ₽',
    duration: 110,
    durationLabel: '1 ч 50 мин',
    category: 'manicure',
    extras: [{ name: 'Дизайн', price: 300 }],
  },
  {
    id: 'manicure-french',
    name: 'Маникюр + дизайн (French)',
    description: 'Снятие, маникюр, укрепление, дизайн',
    price: 2800,
    priceLabel: '2 800 ₽',
    duration: 110,
    durationLabel: '1 ч 50 мин',
    category: 'manicure',
  },
  {
    id: 'pedicure-gel',
    name: 'Педикюр + гель-лак',
    description: 'Снятие, педикюр, покрытие однофазное или гель-лак',
    price: 2500,
    priceLabel: '2 500 ₽',
    duration: 80,
    durationLabel: '1 ч 20 мин',
    category: 'pedicure',
  },
  {
    id: 'pedicure-full',
    name: 'Педикюр + стопы + покрытие',
    description: 'Снятие, педикюр пальчики, гель-лак, обработка пяточек',
    price: 3000,
    priceLabel: '3 000 ₽',
    duration: 100,
    durationLabel: '1 ч 40 мин',
    category: 'pedicure',
    isPopular: true,
  },
  {
    id: 'pedicure-basic',
    name: 'Стопы + пальчики',
    description: 'Педикюр пальчики, обработка стопы, прозрачный лак',
    price: 2500,
    priceLabel: '2 500 ₽',
    duration: 80,
    durationLabel: '1 ч 20 мин',
    category: 'pedicure',
  },
  {
    id: 'complex',
    name: 'Маникюр + педикюр (1+1)',
    description: 'Полный комплекс — маникюр и педикюр',
    price: 5000,
    priceLabel: '5 000 ₽',
    duration: 210,
    durationLabel: '3 ч 30 мин',
    category: 'complex',
    isPopular: true,
  },
]

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Анна',
    text: 'Маникюр 10/10, приятный мастер. Очень довольна результатом!',
    rating: 5,
    date: 'Май 2025',
  },
  {
    id: 2,
    name: 'Екатерина',
    text: 'Супер удобное кресло для педикюра, мастер опытный и приятный. Однозначно вернусь.',
    rating: 5,
    date: 'Апрель 2025',
  },
  {
    id: 3,
    name: 'Мария',
    text: 'Студия уютная, Дарья — мастер своего дела. Сделала французский маникюр — всё идеально.',
    rating: 5,
    date: 'Июнь 2025',
  },
]

export const WORK_HOURS = {
  start: 10,
  end: 20,
  days: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
}

export const PORTFOLIO_CATEGORIES = [
  { id: 'all', label: 'Все работы' },
  { id: 'nude', label: 'Нюд / Натуральный' },
  { id: 'french', label: 'Французский' },
  { id: 'bright', label: 'Яркие' },
  { id: 'ombre', label: 'Омбре' },
  { id: 'art', label: 'Дизайн' },
  { id: 'pedicure', label: 'Педикюр' },
]
