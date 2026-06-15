import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { sendTelegramNotification } from '@/lib/telegram'
import { SERVICES } from '@/lib/constants'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { serviceId, date, time, clientName, clientPhone } = body

    if (!serviceId || !date || !time || !clientName || !clientPhone) {
      return NextResponse.json({ error: 'Заполните все поля' }, { status: 400 })
    }

    const service = SERVICES.find((s) => s.id === serviceId)
    if (!service) {
      return NextResponse.json({ error: 'Услуга не найдена' }, { status: 404 })
    }

    // Sanitize phone
    const phone = clientPhone.replace(/\D/g, '')
    if (phone.length < 10) {
      return NextResponse.json({ error: 'Введите корректный номер телефона' }, { status: 400 })
    }

    // Check slot is still free
    const { data: existing } = await supabase
      .from('bookings')
      .select('id')
      .eq('booking_date', date)
      .eq('booking_time', time)
      .neq('status', 'cancelled')
      .single()

    if (existing) {
      return NextResponse.json({ error: 'Это время уже занято. Пожалуйста, выберите другое.' }, { status: 409 })
    }

    // Create booking
    const { data, error } = await supabase
      .from('bookings')
      .insert({
        client_name: clientName.trim(),
        client_phone: phone,
        service_id: serviceId,
        service_name: service.name,
        booking_date: date,
        booking_time: time,
        duration_minutes: service.duration,
        status: 'pending',
      })
      .select()
      .single()

    if (error) throw error

    // Notify Darya via Telegram
    const dateObj = new Date(date)
    const formattedDate = dateObj.toLocaleDateString('ru-RU', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    })

    await sendTelegramNotification({
      clientName: clientName.trim(),
      clientPhone: clientPhone,
      serviceName: service.name,
      date: formattedDate,
      time,
      duration: service.durationLabel,
    })

    return NextResponse.json({ booking: data }, { status: 201 })
  } catch (err) {
    console.error('Booking error:', err)
    return NextResponse.json({ error: 'Ошибка сервера. Попробуйте ещё раз.' }, { status: 500 })
  }
}
