import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { SERVICES, WORK_HOURS } from '@/lib/constants'

function generateSlots(durationMinutes: number, date: string, bookedSlots: string[]): string[] {
  const slots: string[] = []
  const now = new Date()
  const isToday = new Date(date).toDateString() === now.toDateString()

  let current = WORK_HOURS.start * 60

  while (current + durationMinutes <= WORK_HOURS.end * 60) {
    const h = Math.floor(current / 60)
    const m = current % 60
    const timeStr = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`

    const slotEnd = current + durationMinutes

    const isBooked = bookedSlots.some((bs) => {
      const [bh, bm] = bs.split(':').map(Number)
      const bStart = bh * 60 + bm
      return bStart < slotEnd && bStart + 10 > current
    })

    const isPast = isToday && (h * 60 + m) <= (now.getHours() * 60 + now.getMinutes() + 60)

    if (!isBooked && !isPast) {
      slots.push(timeStr)
    }

    current += 30
  }

  return slots
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const serviceId = searchParams.get('service')
  const date = searchParams.get('date')

  if (!serviceId || !date) {
    return NextResponse.json({ error: 'Missing params' }, { status: 400 })
  }

  const service = SERVICES.find((s) => s.id === serviceId)
  if (!service) {
    return NextResponse.json({ error: 'Service not found' }, { status: 404 })
  }

  const { data: bookings } = await supabase
    .from('bookings')
    .select('booking_time, duration_minutes')
    .eq('booking_date', date)
    .neq('status', 'cancelled')

  const bookedSlots = (bookings ?? []).map((b) => b.booking_time as string)

  const slots = generateSlots(service.duration, date, bookedSlots)

  return NextResponse.json({ slots })
}
