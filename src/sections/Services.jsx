import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion, isMobile } from '../animations/helpers.js'
import { setupServicesAnimations } from '../animations/servicesAnimations.js'
import { services } from '../data/services.js'
import { Icon } from '../components/Icon.jsx'
import SmartImage from '../components/SmartImage.jsx'

export default function Services() {
  const root = useRef(null)

  useLayoutEffect(() => {
    if (!root.current) return
    const ctx = gsap.context(() => {
      if (prefersReducedMotion() || isMobile()) {
        return
      }
      setupServicesAnimations({ root: root.current })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={root} className="relative bg-cream">
      <div data-services-pin className="flex min-h-[100svh] items-center overflow-hidden">
        <div className="mx-auto w-full max-w-[1500px] px-5 md:px-10">
          {/* Header */}
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-accent" />
                <span className="eyebrow">04 — Services</span>
              </div>
              <h2 className="font-serif text-4xl font-light leading-tight text-ink md:text-6xl">
                BEAUTY,
                <br />
                <span className="italic">YOUR WAY.</span>
              </h2>
            </div>
            <p className="max-w-sm text-base font-light leading-relaxed text-muted">
              اختاري ما يناسبك، واتركي لنا التفاصيل.
            </p>
          </div>

          {/* Horizontal track (desktop) / vertical stack (mobile) */}
          <div
            data-services-track
            className="flex flex-col gap-8 md:h-[58vh] md:flex-row md:gap-0"
          >
            {services.map((s, i) => (
              <article
                key={s.id}
                className="group relative flex w-full shrink-0 flex-col md:h-full md:w-[70vw] md:max-w-[1100px] md:odd:pr-14 md:even:pl-14"
              >
                <div className="relative flex h-full flex-col overflow-hidden rounded-sm md:flex-row">
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:h-full md:w-1/2">
                    <SmartImage
                      src={s.image}
                      alt={`${s.title} — ${s.titleAr}`}
                      className="h-full w-full object-cover transition-transform duration-[1.2s] ease-smooth group-hover:scale-105"
                    />
                    <span className="absolute left-6 top-6 font-serif text-7xl font-light text-cream/80 mix-blend-difference">
                      {s.number}
                    </span>
                  </div>

                  {/* Text */}
                  <div className="flex flex-1 flex-col justify-center gap-4 bg-warm p-8 md:w-1/2 md:p-12">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-accent">
                      <Icon name={s.icon} className="h-5 w-5" strokeWidth={1.3} />
                    </span>
                    <h3 className="font-serif text-3xl font-light text-ink md:text-4xl">
                      {s.title}
                    </h3>
                    <p className="text-sm uppercase tracking-widest2 text-muted">{s.titleAr}</p>
                    <p className="text-base font-light leading-relaxed text-muted">
                      {s.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
