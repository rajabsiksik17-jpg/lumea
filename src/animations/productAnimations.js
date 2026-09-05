import { gsap } from './helpers.js'

// Products — pinned campaign-style reveal: each product takes the stage while
// the background shifts.
export function setupProductAnimations({ root }) {
  const panels = root.querySelectorAll('[data-product-panel]')
  const bgs = root.querySelectorAll('[data-product-bg]')

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

  // Reveal the first panel
  tl.fromTo(
    panels[0].querySelectorAll('[data-product-reveal]'),
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.25, stagger: 0.05, ease: 'power3.out' },
  )

  // Cycle through the rest
  for (let i = 1; i < panels.length; i++) {
    tl.to(panels[i - 1], { opacity: 0, scale: 0.96, duration: 0.2, ease: 'power2.inOut' })
      .fromTo(
        bgs[i],
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: 'none' },
        '<',
      )
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

  // Fade the last one out
  tl.to(panels[panels.length - 1], { opacity: 0, duration: 0.15 })

  return tl
}
