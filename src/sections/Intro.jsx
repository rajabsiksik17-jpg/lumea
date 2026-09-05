import { useLayoutEffect, useRef } from 'react'
import { gsap, splitWords, prefersReducedMotion } from '../animations/helpers.js'

export default function Intro() {
  const root = useRef(null)

  useLayoutEffect(() => {
    if (!root.current) return
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return

      const titleEl = root.current.querySelector('[data-intro-title]')
      const bodyEl = root.current.querySelector('[data-intro-body]')
      const titleWords = splitWords(titleEl)
      const bodyWords = splitWords(bodyEl)

      gsap.fromTo(
        titleWords,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.06,
          ease: 'power4.out',
          scrollTrigger: { trigger: titleEl, start: 'top 82%', once: true },
        },
      )

      gsap.fromTo(
        bodyWords,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          stagger: 0.02,
          ease: 'none',
          scrollTrigger: { trigger: bodyEl, start: 'top 80%', once: true },
        },
      )
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section className="relative bg-cream py-28 md:py-40">
      <div ref={root} className="mx-auto max-w-4xl px-5 md:px-10">
        <div className="mb-8 flex items-center gap-3">
          <span className="h-px w-8 bg-accent" />
          <span className="eyebrow">01 — Intro</span>
        </div>

        <h2
          data-intro-title
          className="font-serif text-3xl font-light leading-snug text-ink md:text-5xl"
        >
          جمالك ليس اتجاهًا. إنه طريقتك الخاصة.
        </h2>

        <p
          data-intro-body
          className="mt-8 max-w-2xl text-base font-light leading-relaxed text-muted md:text-lg"
        >
          لذلك لا نقدم حلولًا جاهزة للجميع. نبدأ منك، من احتياجاتك، من تفاصيلك، ومن الطريقة التي
          تريدين أن تشعري بها.
        </p>
      </div>
    </section>
  )
}
