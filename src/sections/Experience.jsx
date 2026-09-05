import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../animations/helpers.js'
import { images } from '../data/images.js'
import Button from '../components/Button.jsx'
import SmartImage from '../components/SmartImage.jsx'

export default function Experience() {
  const root = useRef(null)

  useLayoutEffect(() => {
    if (!root.current) return
    const ctx = gsap.context(() => {
      const bg = root.current.querySelector('[data-exp-bg]')

      if (prefersReducedMotion()) return

      if (bg) {
        gsap.fromTo(
          bg,
          { scale: 1.25, yPercent: -8 },
          {
            scale: 1.1,
            yPercent: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: root.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          },
        )
      }

      gsap.fromTo(
        root.current.querySelectorAll('[data-exp-reveal]'),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: root.current, start: 'top 60%', once: true },
        },
      )
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative overflow-hidden bg-ink py-32 md:py-48">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <SmartImage
          src={images.experience}
          alt=""
          className="h-full w-full object-cover opacity-30"
          data-exp-bg
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/60 to-ink" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center md:px-10">
        <p
          data-exp-reveal
          className="mb-6 text-[0.62rem] uppercase tracking-widest2 text-cream/50"
        >
          Beauty is a ritual
        </p>

        <h2
          data-exp-reveal
          className="font-serif text-[2.4rem] font-light leading-tight text-cream sm:text-5xl md:text-7xl"
        >
          TAKE A MOMENT
          <br />
          FOR YOURSELF.
        </h2>

        <p
          data-exp-reveal
          className="mx-auto mt-8 max-w-xl text-base font-light leading-relaxed text-cream/70 md:text-lg"
        >
          أحيانًا كل ما تحتاجينه هو لحظة.
          <br />
          لحظة بعيدًا عن الضجيج. لحظة للعناية. لحظة لك.
        </p>

        <div data-exp-reveal className="mt-10 flex justify-center">
          <Button href="#contact" variant="light">
            ابدئي تجربتك
          </Button>
        </div>
      </div>
    </section>
  )
}
