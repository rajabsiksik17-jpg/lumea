import { useLayoutEffect, useRef } from 'react'
import { gsap, revealGroup } from '../animations/helpers.js'
import { whyReasons } from '../data/whyLumea.js'
import { Icon } from '../components/Icon.jsx'

export default function WhyLumea() {
  const root = useRef(null)

  useLayoutEffect(() => {
    if (!root.current) return
    const ctx = gsap.context(() => {
      revealGroup(root.current.querySelectorAll('[data-why-item]'), {
        y: 40,
        stagger: 0.1,
        start: 'top 82%',
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section id="why" className="relative bg-warm py-24 md:py-32">
      <div ref={root} className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="mb-8 flex items-center gap-3">
              <span className="h-px w-8 bg-accent" />
              <span className="eyebrow">07 — Why LUMÉA</span>
            </div>
            <h2 className="font-serif text-4xl font-light leading-tight text-ink md:text-6xl">
              WHY
              <br />
              LUMÉA?
            </h2>
            <p className="mt-6 max-w-sm text-base font-light leading-relaxed text-muted">
              لأنك تستحقين تجربة لا تشبه أي تجربة أخرى.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
              {whyReasons.map((r) => (
                <div
                  key={r.id}
                  data-why-item
                  className="group flex flex-col gap-4 bg-warm p-8 transition-colors duration-700 ease-smooth hover:bg-cream md:p-10"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-accent transition-transform duration-500 ease-smooth group-hover:scale-110">
                    <Icon name={r.icon} className="h-5 w-5" strokeWidth={1.3} />
                  </span>
                  <h3 className="font-serif text-2xl font-light text-ink">{r.title}</h3>
                  <p className="text-sm uppercase tracking-widest2 text-muted/70">{r.titleAr}</p>
                  <p className="text-base font-light leading-relaxed text-muted">{r.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
