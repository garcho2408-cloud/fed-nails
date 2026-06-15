'use client'

import { MessageCircle } from 'lucide-react'
import { CONTACTS } from '@/lib/constants'

export function WhatsAppButton() {
  return (
    <a
      href={CONTACTS.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Написать в WhatsApp"
      className="
        fixed bottom-6 right-6 z-50
        w-14 h-14 rounded-full
        bg-[#25D366] hover:bg-[#1ebe57]
        shadow-lg hover:shadow-xl
        flex items-center justify-center
        text-white
        transition-all duration-200
        hover:scale-105 active:scale-95
      "
    >
      <MessageCircle size={26} fill="white" />
    </a>
  )
}
