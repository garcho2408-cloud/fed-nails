# fed.nails — Студия маникюра Дарьи Федотовой

## Запуск проекта

### 1. Установить зависимости
```bash
npm install
```

### 2. Настроить переменные окружения
```bash
cp .env.local.example .env.local
```
Заполнить `.env.local` — Supabase и Telegram (инструкции внутри файла).

### 3. Создать таблицу в Supabase
Открыть [Supabase → SQL Editor](https://supabase.com) и выполнить `supabase/schema.sql`.

### 4. Добавить фотографии
Положить в `public/images/`:
- `hero-bg.jpg` — фоновое фото для главной страницы
- `master.jpg` — фото Дарьи
- `portfolio/1.jpg` ... `portfolio/22.jpg` — работы

### 5. Запустить
```bash
npm run dev     # разработка → http://localhost:3000
npm run build   # сборка для продакшена
npm run start   # продакшен-сервер
```

### 6. Деплой на Vercel
```bash
npx vercel deploy
```
Добавить переменные окружения в настройках проекта на Vercel.

## Структура
```
app/               — страницы (Next.js App Router)
components/        — React-компоненты
  layout/          — Header, Footer, WhatsApp-кнопка
  home/            — секции главной страницы
  booking/         — 4-шаговая форма записи
  portfolio/       — галерея с фильтром и lightbox
lib/               — константы, Supabase, Telegram
supabase/          — SQL-схема
public/images/     — фотографии
```
