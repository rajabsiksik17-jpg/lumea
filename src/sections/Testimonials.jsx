import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { testimonials } from '../data/testimonials.js'
import { revealGroup } from '../animations/helpers.js'
import { gsap } from '../animations/helpers.js'

export default function Testimonials() {
  const root = useRef(null)
  const [index, setIndex] = useState(0)
  const timer = useRef(null)

  useEffect(() => {
    if (!root.current) return
    const ctx = gsap.context(() => {
      revealGroup(root.current.querySelectorAll('[data-t-head]'), { y: 30, stagger: 0.1 })
    }, root)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer.current)
  }, [])

  const go = (dir) => {
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length)
  }

  const active = testimonials[index]

  return (
    <section className="relative bg-cream py-24 md:py-32">
      <div ref={root} className="mx-auto max-w-5xl px-5 md:px-10">
        <div className="mb-14 flex flex-col items-center gap-3 text-center">
          <div data-t-head className="flex items-center gap-3">
            <span className="h-px w-8 bg-accent" />
            <span className="eyebrow">08 — What They Feel</span>
          </div>
          <h2 data-t-head className="font-serif text-4xl font-light text-ink md:text-5xl">
            WHAT THEY FEEL
          </h2>
        </div>

        <div className="relative flex min-h-[220px] items-center justify-center md:min-h-[260px]">
          {/* Quote mark */}
          <span className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 font-serif text-8xl font-light leading-none text-accent/20 md:text-9xl">
            &ldquo;
          </span>

          <div className="relative w-full">
            {testimonials.map((t, i) => (
              <figure
                key={t.id}
                className={`flex flex-col items-center gap-5 text-center transition-all duration-700 ease-smooth ${
                  i === index
                    ? 'pointer-events-auto opacity-100'
                    : 'pointer-events-none absolute inset-0 opacity-0'
                }`}
                style={{ transform: i === index ? 'translateY(0)' : 'translateY(24px)' }}
                aria-hidden={i !== index}
              >
                <blockquote className="max-w-2xl font-serif text-2xl font-light leading-relaxed text-ink md:text-4xl">
                  {t.quote}
                </blockquote>
                <figcaption className="flex flex-col items-center gap-1">
                  <span className="text-sm uppercase tracking-widest2 text-accent">— {t.name}</span>
                  <span className="text-xs font-light text-muted">{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="الشهادة السابقة"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-all duration-500 ease-smooth hover:bg-ink hover:text-cream"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
          </button>

          <div className="flex gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`الانتقال إلى الشهادة ${i + 1}`}
                className="h-1.5 rounded-full transition-all duration-500 ease-smooth"
                style={{
                  width: i === index ? 28 : 8,
                  background: i === index ? 'var(--accent)' : 'rgba(29,25,23,0.15)',
                }}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="الشهادة التالية"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-all duration-500 ease-smooth hover:bg-ink hover:text-cream"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  )
}
