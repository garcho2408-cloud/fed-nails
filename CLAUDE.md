# CLAUDE.md — Студия Маникюра Дарьи Федотовой

## О проекте
Сайт-визитка для студии маникюра. **Чистый HTML + CSS + JS** — никакого React, Next.js, сборщиков. Файлы открываются напрямую в браузере.

Сайт задеплоен на Netlify: https://funny-heliotrope-ce4daa.netlify.app  
GitHub: https://github.com/garcho2408-cloud/fed-nails  
Домен (в процессе подключения): fednails.ru

---

## Структура файлов

```
fed-nails/
├── index.html          # Главная страница
├── services.html       # Услуги
├── portfolio.html      # Портфолио
├── about.html          # О мастере
├── contacts.html       # Контакты
├── booking.html        # Форма записи
├── css/
│   └── styles.css      # Единый файл стилей (весь дизайн-систем)
├── js/
│   ├── main.js         # Scroll-reveal, scroll-expand фото, мобильное меню
│   ├── portfolio.js    # Сетка портфолио + lightbox (только portfolio.html)
│   ├── lightbox.js     # Lightbox для остальных страниц (index, about)
│   └── booking.js      # Форма записи
├── images/
│   ├── logo.svg        # SVG логотип (F в круге, FED.NAILS.FED по дуге)
│   ├── hero-bg.jpg     # Фон героя (НЕ ИСПОЛЬЗУЕТСЯ — заменён CSS-градиентом)
│   ├── master.jpg      # Фото Дарьи
│   ├── interior/       # Фото студии (1.jpg — 9.jpg)
│   └── portfolio/      # Работы (1.jpg — 23.jpg)
└── netlify.toml        # Конфиг деплоя (publish=".", command="")
```

---

## Дизайн-система

### Цвета (CSS переменные в styles.css)
```
--cream-100: #FAF8F5   — основной фон
--cream-200: #F2EDE6   — бежевый фон секций
--taupe-400: #C4A08A   — акцент светлый
--taupe-500: #B5927B   — основной акцент (тауп)
--dark:      #2C2420   — тёмный текст
--muted:     #9E8E82   — приглушённый текст
```

### Шрифты (Google Fonts CDN)
- **Cormorant Garamond** — заголовки (serif, элегантный)
- **Montserrat** — навигация, кнопки, подписи
- **Inter** — основной текст

### Логотип
- SVG файл: `images/logo.svg`
- В хедере: `<a href="index.html" class="logo-img"><img src="images/logo.svg" height="60" width="60"></a>`
- В футере: текстовый `<a class="footer__logo">fed<span>.</span>nails.fed</a>`

---

## Ключевые решения

### Фон героя (главная)
Заменён на CSS-градиент (фото убрано):
```css
background:
  radial-gradient(ellipse at 75% 60%, rgba(181,146,123,.28) 0%, transparent 55%),
  radial-gradient(ellipse at 20% 20%, rgba(242,237,230,.9) 0%, transparent 50%),
  linear-gradient(135deg, #FAF8F5 0%, #F2EDE6 45%, #E8DDD4 75%, #DCCAB8 100%);
```

### Кнопка записи
Все кнопки "Записаться" → Яндекс Карты онлайн-запись:
```
https://yandex.ru/maps/org/studiya_manikyura_fedotovoy_daryi/131575176640/?booking%5Bpage%5D=menu&booking%5Bpermalink%5D=131575176640&ll=38.212778%2C55.580783&z=17
```

### Telegram FAB (кнопка в правом нижнем углу)
Класс `.telegram-fab`, ссылка `https://t.me/+79661725056`, цвет `#2AABEE`

### Scroll-expand фото (main.js)
При скролле фото плавно разворачиваются: `scale(0.82) opacity(0)` → `scale(1) opacity(1)`.  
Селекторы: `.portfolio-item img, .interior-item img, .about-photo img, .hero__bg img`

### Lightbox (модальные окна фото)
- `portfolio.html` — использует `portfolio.js` (свой lightbox с навигацией по галерее)
- `index.html`, `about.html` — используют `lightbox.js` (универсальный)
- Фото листаются **по группам** (портфолио отдельно, интерьер отдельно, мастер отдельно)
- Подписи на фото **отключены** (пустая строка)

### Карта в контактах
Яндекс Карты iframe с организацией:
```
src="https://yandex.ru/map-widget/v1/?ll=38.212778%2C55.580783&z=17&ol=biz&oid=131575176640"
```

---

## Контакты студии
- Телефон: +7 (966) 172-50-56
- Адрес: Северное шоссе 16А, Раменское
- Режим работы: Пн–Вс, 10:00–20:00
- Instagram: @fed.nails.fed
- Telegram: +79661725056

---

## Услуги (актуальный прайс, цены не отображаются)

**Маникюр:**
- Маникюр + гель-лак — 1 ч 40 мин (Снятие, Маникюр, Укрепление гелем, Ремонты, Однотон)
- Маникюр + гель-лак длинные ногти — 1 ч 50 мин (Дизайн +300 ₽)
- Маникюр + дизайн (френч) — 1 ч 50 мин

**Педикюр:**
- Педикюр + гель-лак — 1 ч 20 мин
- Педикюр + стопы + покрытие — 1 ч 40 мин
- Стопы + пальчики — 1 ч 20 мин

**Комплекс:**
- Маникюр + педикюр гель-лак — 3 ч 30 мин

---

## Деплой

Сайт автоматически обновляется при пуше в GitHub.

Git находится в: `d:\claude\fed-nails`  
Git-бинарник (GitHub Desktop): `C:\Users\user\AppData\Local\GitHubDesktop\app-3.5.12\resources\app\git\cmd\git.exe`

Для пуша изменений:
```powershell
$git = "C:\Users\user\AppData\Local\GitHubDesktop\app-3.5.12\resources\app\git\cmd\git.exe"
cd "d:\claude\fed-nails"
& $git add .
& $git commit -m "описание изменений"
& $git push origin main
```

---

## Что НЕ делать
- Не добавлять React/Next.js/npm — сайт намеренно простой
- Не показывать цены в UI (они убраны по просьбе клиента)
- Не менять логотип (SVG утверждён клиентом)
- Не добавлять WhatsApp — везде только Telegram
- Не трогать `portfolio.js` lightbox — у него своя реализация отдельно от `lightbox.js`
