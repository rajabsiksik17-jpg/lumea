import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../animations/helpers.js'
import { images } from '../data/images.js'
import Button from '../components/Button.jsx'
import SmartImage from '../components/SmartImage.jsx'

export default function FinalCTA() {
  const root = useRef(null)

  useLayoutEffect(() => {
    if (!root.current) return
    const ctx = gsap.context(() => {
      const imgWrap = root.current.querySelector('[data-cta-img-wrap]')
      const img = root.current.querySelector('[data-cta-img]')

      if (prefersReducedMotion()) {
        if (imgWrap) imgWrap.style.clipPath = 'inset(0 0 0 0)'
        gsap.set(root.current.querySelectorAll('[data-cta-reveal]'), { opacity: 1, y: 0 })
        return
      }

      // Image reveal via clip-path
      if (imgWrap) {
        gsap.fromTo(
          imgWrap,
          { clipPath: 'inset(100% 0 0 0)' },
          {
            clipPath: 'inset(0% 0 0 0)',
            duration: 1.4,
            ease: 'power4.inOut',
            scrollTrigger: { trigger: imgWrap, start: 'top 75%', once: true },
          },
        )
        gsap.fromTo(
          img,
          { scale: 1.3 },
          {
            scale: 1,
            duration: 1.6,
            ease: 'power3.out',
            scrollTrigger: { trigger: imgWrap, start: 'top 75%', once: true },
          },
        )
      }

      gsap.fromTo(
        root.current.querySelectorAll('[data-cta-reveal]'),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: root.current, start: 'top 55%', once: true },
        },
      )
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative overflow-hidden bg-warm">
      <div className="relative">
        <div
          data-cta-img-wrap
          className="relative h-[70vh] min-h-[480px] w-full overflow-hidden md:h-[85vh]"
          style={{ clipPath: 'inset(0 0 0 0)' }}
        >
          <SmartImage
            src={images.finalCta}
            alt="Premium beauty campaign imagery"
            className="h-full w-full object-cover"
            data-cta-img
            eager
          />
          <div className="absolute inset-0 bg-ink/40" />
        </div>

        {/* Overlay content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="mx-auto max-w-3xl px-5 text-center">
            <p
              data-cta-reveal
              className="mb-6 text-[0.62rem] uppercase tracking-widest2 text-cream/70"
            >
              Your beauty deserves a moment
            </p>
            <h2
              data-cta-reveal
              className="font-serif text-[2.4rem] font-light leading-tight text-cream sm:text-5xl md:text-7xl"
            >
              جمالك يستحق
              <br />
              لحظته.
            </h2>
            <p
              data-cta-reveal
              className="mx-auto mt-6 max-w-md text-base font-light leading-relaxed text-cream/80"
            >
              اكتشفي تجربة LUMÉA وابدئي رحلة مختلفة نحو العناية والجمال.
            </p>
            <div
              data-cta-reveal
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <Button href="#contact" variant="light">
                احجزي تجربتك
              </Button>
              <Button href="#contact" variant="outlineLight">
                تواصلي معنا
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
