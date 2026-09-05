import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { getLenis } from '../utils/scrollTo.js'

// Back-to-top button — appears after scrolling past the hero.
export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = () => {
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(0, { duration: 1.6 })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="العودة إلى الأعلى"
      className={`fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 bg-warm/80 backdrop-blur-md text-ink transition-all duration-500 ease-smooth hover:bg-ink hover:text-cream ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <ArrowUp className="h-4 w-4" strokeWidth={1.5} />
    </button>
  )
}
