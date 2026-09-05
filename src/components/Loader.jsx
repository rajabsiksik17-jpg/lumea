import { useEffect, useState } from 'react'
import { siteConfig } from '../config/siteConfig.js'

// Minimal loading intro — reveals brand name then tagline, then fades out.
export default function Loader({ onComplete }) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      onComplete?.()
      return
    }
    const t1 = setTimeout(() => setPhase(1), 350)
    const t2 = setTimeout(() => setPhase(2), 900)
    const t3 = setTimeout(() => onComplete?.(), 1600)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [onComplete])

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream transition-opacity duration-700 ease-smooth"
      style={{ opacity: phase === 2 ? 0 : 1, pointerEvents: phase === 2 ? 'none' : 'auto' }}
    >
      <div
        className="flex flex-col items-center gap-2 text-center transition-all duration-700 ease-smooth"
        style={{
          opacity: phase >= 1 ? 0 : 1,
          transform: phase >= 1 ? 'translateY(-24px)' : 'translateY(0)',
        }}
      >
        <span className="font-serif text-5xl font-light tracking-[0.28em] text-ink">
          {siteConfig.name}
        </span>
        <span className="text-[0.6rem] uppercase tracking-widest2 text-muted">
          {siteConfig.tagline}
        </span>
      </div>
    </div>
  )
}
