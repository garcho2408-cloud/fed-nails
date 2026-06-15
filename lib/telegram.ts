export async function sendTelegramNotification(booking: {
  clientName: string
  clientPhone: string
  serviceName: string
  date: string
  time: string
  duration: string
}) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) return

  const text = [
    '🌸 *Новая запись!*',
    '',
    `📋 *Услуга:* ${booking.serviceName} (${booking.duration})`,
    `📅 *Дата:* ${booking.date}`,
    `⏰ *Время:* ${booking.time}`,
    `👤 *Клиент:* ${booking.clientName}`,
    `📞 *Телефон:* ${booking.clientPhone}`,
  ].join('\n')

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'Markdown',
    }),
  })
}
