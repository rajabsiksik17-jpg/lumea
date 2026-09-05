import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../animations/helpers.js'
import { stats } from '../data/numbers.js'

export default function Numbers() {
  const root = useRef(null)

  useLayoutEffect(() => {
    if (!root.current) return
    const ctx = gsap.context(() => {
      const items = root.current.querySelectorAll('[data-stat]')

      items.forEach((el) => {
        const valueEl = el.querySelector('[data-stat-value]')
        const target = parseFloat(el.dataset.value)
        const suffix = el.dataset.suffix || ''

        if (prefersReducedMotion()) {
          gsap.set(el, { opacity: 1, y: 0 })
          valueEl.textContent = target.toLocaleString('en-US') + suffix
          return
        }

        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          },
        )

        const counter = { val: 0 }
        gsap.to(counter, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          onUpdate: () => {
            valueEl.textContent = Math.round(counter.val).toLocaleString('en-US') + suffix
          },
        })
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section className="relative bg-beige py-24 md:py-32">
      <div ref={root} className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="mb-8 flex items-center gap-3">
          <span className="h-px w-8 bg-accent" />
          <span className="eyebrow">06 — Numbers</span>
        </div>

        <div className="grid grid-cols-2 gap-y-14 md:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              data-stat
              data-value={s.value}
              data-suffix={s.suffix}
              className="flex flex-col items-start gap-3 border-s border-line ps-6"
            >
              <span
                data-stat-value
                className="font-serif text-6xl font-light leading-none text-ink md:text-7xl"
              >
                0
              </span>
              <span className="text-[0.62rem] uppercase tracking-widest2 text-muted">
                {s.label}
              </span>
              <span className="text-sm font-light text-muted/70">{s.labelAr}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
