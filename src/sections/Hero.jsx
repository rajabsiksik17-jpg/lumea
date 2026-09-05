import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../animations/helpers.js'
import { heroIntro, heroScrollOut } from '../animations/heroAnimations.js'
import { images } from '../data/images.js'
import Button from '../components/Button.jsx'
import SmartImage from '../components/SmartImage.jsx'

export default function Hero() {
  const root = useRef(null)

  useLayoutEffect(() => {
    if (!root.current) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let intro = null
    let cleanupListener = null

    const ctx = gsap.context(() => {
      intro = gsap.timeline({ paused: true })
      heroIntro({ root: root.current, timeline: intro })

      if (reduced) {
        // Skip animations entirely, ensure everything is visible.
        gsap.set(root.current.querySelectorAll('[data-hero-line], [data-hero-sub], [data-hero-desc], [data-hero-cta], [data-hero-float], [data-hero-eyebrow]'), {
          y: 0,
          yPercent: 0,
          opacity: 1,
        })
        gsap.set(root.current.querySelector('[data-hero-bg]'), { filter: 'none', scale: 1 })
        intro.progress(1)
      } else {
        heroScrollOut({ root: root.current })
      }
    }, root)

    if (!reduced) {
      let played = false
      const play = () => {
        if (played) return
        played = true
        intro?.play()
      }
      window.addEventListener('lumea:ready', play)
      const fallback = setTimeout(play, 2600)
      cleanupListener = () => {
        window.removeEventListener('lumea:ready', play)
        clearTimeout(fallback)
      }
    }

    return () => {
      cleanupListener?.()
      ctx.revert()
    }
  }, [])

  return (
    <section
      id="home"
      ref={root}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink"
    >
      {/* Background image */}
      <div className="absolute inset-0" data-hero-bg-wrap>
        <SmartImage
          src={images.hero}
          alt="Editorial beauty photograph with soft, premium lighting"
          className="h-full w-full object-cover will-change-transform"
          width={1920}
          height={1280}
          eager
          data-hero-bg
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-ink/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1500px] flex-col px-5 pt-28 md:px-10">
        <div data-hero-content className="flex flex-col items-start">
          <p
            data-hero-eyebrow
            className="mb-6 text-[0.68rem] uppercase tracking-widest2 text-cream/70"
          >
            Luxury Beauty &amp; Care
          </p>

          <h1 className="font-serif font-light text-cream">
            <span className="block overflow-hidden">
              <span data-hero-line className="display-hero block will-change-transform">
                BEAUTY,
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-hero-line className="display-hero block italic will-change-transform">
                REFINED.
              </span>
            </span>
          </h1>

          <p
            data-hero-sub
            className="mt-6 font-serif text-2xl font-light text-cream/90 md:text-3xl"
          >
            جمالٌ يُرى، عنايةٌ تُشعر بها.
          </p>

          <p
            data-hero-desc
            className="mt-6 max-w-xl text-sm font-light leading-relaxed text-cream/70 md:text-base"
          >
            في LUMÉA نؤمن أن الجمال الحقيقي لا يحتاج إلى مبالغة. نصنع تجربة متكاملة تجمع بين
            العناية، الجودة، والتفاصيل التي تمنحك إحساسًا مختلفًا في كل مرة.
          </p>

          <div className="mt-10 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
            <Button data-hero-cta href="#story" variant="light" className="w-full justify-center sm:w-auto">
              اكتشفي عالمنا
            </Button>
            <Button data-hero-cta href="#contact" variant="outlineLight" className="w-full justify-center sm:w-auto">
              احجزي تجربتك
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          data-hero-float
          className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
        >
          <span className="text-[0.58rem] uppercase tracking-widest2 text-cream/60">
            Scroll to explore
          </span>
          <span className="scroll-line block h-12 w-px bg-cream/40" />
        </div>

        {/* Floating editorial details */}
        <div
          data-hero-float
          className="pointer-events-none absolute right-8 top-1/2 hidden -translate-y-1/2 rotate-90 text-[0.58rem] uppercase tracking-widest2 text-cream/40 md:block"
        >
          Aesthetics
        </div>
        <div
          data-hero-float
          className="pointer-events-none absolute left-8 top-1/2 hidden -translate-y-1/2 -rotate-90 text-[0.58rem] uppercase tracking-widest2 text-cream/40 md:block"
        >
          Beauty · Care
        </div>
      </div>
    </section>
  )
}
