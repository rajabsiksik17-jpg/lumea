import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../animations/helpers.js'
import { setupProductAnimations } from '../animations/productAnimations.js'
import { products } from '../data/products.js'
import { Icon } from '../components/Icon.jsx'
import SmartImage from '../components/SmartImage.jsx'

const bgTints = ['#1d1917', '#2a2320', '#1d1917', '#26211d']

export default function Products() {
  const root = useRef(null)

  useLayoutEffect(() => {
    if (!root.current) return
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set(root.current.querySelectorAll('[data-product-panel]'), { opacity: 1, scale: 1 })
        gsap.set(root.current.querySelectorAll('[data-product-reveal]'), { opacity: 1, y: 0 })
        gsap.set(root.current.querySelectorAll('[data-product-panel] img'), { scale: 1 })
        return
      }
      setupProductAnimations({ root: root.current })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section id="products" ref={root} className="relative bg-ink">
      <div data-products-pin className="relative flex min-h-[100svh] items-center overflow-hidden">
        {/* Background layers */}
        {products.map((p, i) => (
          <div
            key={p.id}
            data-product-bg
            className="absolute inset-0 transition-opacity"
            style={{ background: bgTints[i], opacity: i === 0 ? 1 : 0 }}
          />
        ))}

        <div className="relative z-10 mx-auto w-full max-w-[1500px] px-5 py-24 md:px-10">
          {/* Header */}
          <div className="mb-10 flex items-center justify-between gap-4 md:mb-14">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-accent" />
              <span className="text-[0.68rem] uppercase tracking-widest2 text-cream/60">
                05 — The Edit
              </span>
            </div>
            <p className="hidden max-w-xs text-sm font-light leading-relaxed text-cream/60 md:block">
              مجموعة مختارة من التفاصيل التي تجعل روتينك أكثر جمالًا.
            </p>
            <h2 className="font-serif text-3xl font-light text-cream md:text-5xl">THE EDIT</h2>
          </div>

          {/* Product panels — overlap on desktop, stack on mobile */}
          <div className="relative flex flex-col gap-20 md:grid md:gap-0">
            {products.map((p) => (
              <div
                key={p.id}
                data-product-panel
                className="flex flex-col gap-8 md:col-start-1 md:row-start-1 md:grid md:grid-cols-2 md:items-center md:gap-16 md:opacity-0"
              >
                {/* Image */}
                <div className="relative aspect-[4/5] max-h-[60vh] w-full overflow-hidden rounded-sm">
                  <SmartImage
                    src={p.image}
                    alt={`${p.name} — ${p.tagline}`}
                    className="h-full w-full object-cover"
                  />
                  <span
                    data-product-reveal
                    className="absolute left-5 top-5 font-serif text-6xl font-light text-cream/80 mix-blend-difference"
                  >
                    {p.number}
                  </span>
                </div>

                {/* Copy */}
                <div className="flex flex-col items-start gap-4">
                  <span
                    data-product-reveal
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/20 text-accent"
                  >
                    <Icon name={p.icon} className="h-5 w-5" strokeWidth={1.3} />
                  </span>
                  <h3
                    data-product-reveal
                    className="font-serif text-4xl font-light text-cream md:text-6xl"
                  >
                    {p.name}
                  </h3>
                  <p data-product-reveal className="text-[0.7rem] uppercase tracking-widest2 text-accent">
                    {p.tagline}
                  </p>
                  <p
                    data-product-reveal
                    className="max-w-md text-base font-light leading-relaxed text-cream/70"
                  >
                    {p.description}
                  </p>
                  <a
                    data-product-reveal
                    href="#contact"
                    className="group mt-2 inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-widest2 text-cream"
                  >
                    <span className="link-line">اكتشفي المنتج</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
