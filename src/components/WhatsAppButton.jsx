import { MessageCircle } from 'lucide-react'
import { siteConfig } from '../config/siteConfig.js'

// Floating WhatsApp button — bottom-left (RTL friendly) on all devices.
export default function WhatsAppButton() {
  const href = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    siteConfig.whatsappMessage,
  )}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل معنا عبر واتساب"
      className="fixed bottom-6 left-6 z-40 flex items-center justify-center rounded-full bg-ink text-cream shadow-lg shadow-ink/20 transition-transform duration-500 ease-smooth hover:scale-110"
      style={{ height: 52, width: 52 }}
    >
      <MessageCircle className="h-5 w-5" strokeWidth={1.5} />
    </a>
  )
}
