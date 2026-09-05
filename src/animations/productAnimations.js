import { gsap } from './helpers.js'
import { isMobile } from './helpers.js'

// Products — pinned campaign-style reveal (desktop) or vertical cinematic
// stack (mobile). Works on all screens.
export function setupProductAnimations({ root }) {
  const panels = root.querySelectorAll('[data-product-panel]')
  const bgs = root.querySelectorAll('[data-product-bg]')

  // Desktop: pinned overlapping panels.
  if (!isMobile()) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: 'top top',
        end: `+=${panels.length * 100}%`,
        scrub: 0.6,
        pin: root.querySelector('[data-products-pin]'),
        anticipatePin: 1,
      },
    })

    tl.fromTo(
      panels[0].querySelectorAll('[data-product-reveal]'),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.25, stagger: 0.05, ease: 'power3.out' },
    )

    for (let i = 1; i < panels.length; i++) {
      tl.to(panels[i - 1], { opacity: 0, scale: 0.96, duration: 0.2, ease: 'power2.inOut' })
        .fromTo(bgs[i], { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'none' }, '<')
        .fromTo(
          panels[i],
          { opacity: 0, scale: 1.04 },
          { opacity: 1, scale: 1, duration: 0.25, ease: 'power2.out' },
          '<',
        )
        .fromTo(
          panels[i].querySelectorAll('[data-product-reveal]'),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.2, stagger: 0.05, ease: 'power3.out' },
          '<0.05',
        )
    }

    tl.to(panels[panels.length - 1], { opacity: 0, duration: 0.15 })
    return tl
  }

  // Mobile: vertical stack, each product reveals with clip-path + parallax.
  return panels.forEach((panel) => {
    const img = panel.querySelector('img')
    const texts = panel.querySelectorAll('[data-product-reveal]')

    gsap.fromTo(
      texts,
      { y: 36, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: panel, start: 'top 78%', once: true },
      },
    )

    if (img) {
      gsap.fromTo(
        img,
        { scale: 1.25 },
        {
          scale: 1,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: { trigger: panel, start: 'top 82%', once: true },
        },
      )
      gsap.fromTo(
        img,
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: 'none',
          scrollTrigger: { trigger: panel, start: 'top bottom', end: 'bottom top', scrub: 1 },
        },
      )
    }
  })
}
