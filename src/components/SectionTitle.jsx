import { useEffect, useRef } from 'react'
import { revealGroup } from '../animations/helpers.js'

// Section heading with an editorial eyebrow + optional large title.
export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  number,
  align = 'start',
  dark = false,
  className = '',
  titleClassName = '',
}) {
  const root = useRef(null)

  useEffect(() => {
    if (!root.current) return
    const els = root.current.querySelectorAll('[data-reveal]')
    revealGroup(els, { y: 34, stagger: 0.1 })
  }, [])

  const alignment = {
    start: 'text-start items-start',
    center: 'text-center items-center',
    end: 'text-end items-end',
  }[align]

  return (
    <div
      ref={root}
      className={`flex flex-col gap-5 ${alignment} ${className}`}
    >
      {eyebrow && (
        <div
          data-reveal
          className="flex items-center gap-3 text-[0.68rem] uppercase tracking-widest2"
          style={{ color: dark ? 'rgba(252,250,247,0.7)' : 'var(--muted)' }}
        >
          {number && <span className="opacity-60">{number}</span>}
          <span className="h-px w-8" style={{ background: dark ? 'rgba(252,250,247,0.3)' : 'var(--accent)' }} />
          <span>{eyebrow}</span>
        </div>
      )}
      {title && (
        <h2
          data-reveal
          className={`font-serif font-light leading-[1.05] ${titleClassName || 'display-lg'}`}
          style={{ color: dark ? 'var(--warm)' : 'var(--ink)' }}
        >
          {title}
        </h2>
      )}
      {subtitle && (
        <p
          data-reveal
          className="max-w-xl text-base font-light leading-relaxed"
          style={{ color: dark ? 'rgba(252,250,247,0.72)' : 'var(--muted)' }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
