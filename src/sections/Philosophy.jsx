import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../animations/helpers.js'
import { setupPhilosophyAnimations } from '../animations/philosophyAnimations.js'
import { principles } from '../data/philosophy.js'
import { images } from '../data/images.js'
import SmartImage from '../components/SmartImage.jsx'

export default function Philosophy() {
  const root = useRef(null)

  useLayoutEffect(() => {
    if (!root.current) return
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set(root.current.querySelectorAll('[data-phil-item]'), { opacity: 1, y: 0 })
        gsap.set(root.current.querySelectorAll('[data-phil-reveal]'), { opacity: 1, y: 0 })
        return
      }
      setupPhilosophyAnimations({ root: root.current })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section id="philosophy" ref={root} className="relative bg-cream">
      <div data-phil-pin className="relative flex min-h-[100svh] items-center overflow-hidden">
        {/* Background layers (cream base + optional imagery) */}
        <div data-phil-bg className="absolute inset-0 bg-cream">
          <SmartImage
            src={images.philosophy[0]}
            alt=""
            className="h-full w-full object-cover opacity-[0.16]"
          />
        </div>
        {principles.slice(1).map((p, i) => (
          <div key={p.number} data-phil-bg className="absolute inset-0" style={{ opacity: 0 }}>
            <SmartImage
              src={images.philosophy[i + 1] || images.philosophy[0]}
              alt=""
              className="h-full w-full object-cover opacity-25"
            />
          </div>
        ))}

        <div className="relative z-10 mx-auto w-full max-w-[1500px] px-5 md:px-10">
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-8 bg-accent" />
            <span className="eyebrow">03 — Our Philosophy</span>
          </div>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="font-serif text-4xl font-light leading-tight text-ink md:text-6xl">
                Less noise.
                <br />
                <span className="italic">More beauty.</span>
              </h2>
              <p className="mt-6 font-serif text-2xl font-light text-muted">
                أقل ضجيجًا. أكثر جمالًا.
              </p>
              <p className="mt-6 max-w-sm text-base font-light leading-relaxed text-muted">
                نؤمن بالجمال الهادئ. بالجودة التي لا تحتاج إلى شرح. وبالتفاصيل الصغيرة التي تصنع
                الفرق الكبير.
              </p>
            </div>

            {/* Principles — stacked on mobile, overlapping (animated) on desktop */}
            <div className="relative flex flex-col gap-12 lg:block lg:h-[380px]">
              {principles.map((p) => (
                <div
                  key={p.number}
                  data-phil-item
                  className={`relative flex flex-col justify-center lg:absolute lg:inset-0 ${
                    p.number === '01' ? '' : 'lg:opacity-0'
                  }`}
                >
                  <span
                    data-phil-reveal
                    className="font-serif text-7xl font-light leading-none text-accent/60 md:text-8xl"
                  >
                    {p.number}
                  </span>
                  <h3
                    data-phil-reveal
                    className="mt-4 font-serif text-3xl font-light text-ink md:text-5xl"
                  >
                    {p.title}
                    <span className="mt-1 block text-sm uppercase tracking-widest2 text-muted">
                      {p.titleEn}
                    </span>
                  </h3>
                  <p
                    data-phil-reveal
                    className="mt-4 max-w-md text-base font-light leading-relaxed text-muted"
                  >
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
