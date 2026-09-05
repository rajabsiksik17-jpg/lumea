import { gsap } from './helpers.js'

// Philosophy — pinned section where three principles appear one after another
// while the background transitions. Desktop only.
export function setupPhilosophyAnimations({ root }) {
  const bg = root.querySelectorAll('[data-phil-bg]')
  const principles = root.querySelectorAll('[data-phil-item]')

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: root,
      start: 'top top',
      end: '+=300%',
      scrub: 0.6,
      pin: root.querySelector('[data-phil-pin]'),
      anticipatePin: 1,
    },
  })

  // Entrance for the first principle (its container is visible by default).
  tl.fromTo(
    principles[0].querySelectorAll('[data-phil-reveal]'),
    { y: 44, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.3, stagger: 0.08, ease: 'power3.out' },
  )

  // Cycle through the remaining principles.
  for (let i = 1; i < principles.length; i++) {
    tl.to(principles[i - 1], { opacity: 0, y: -40, duration: 0.25, ease: 'power2.inOut' })
      .fromTo(
        bg[i],
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'none' },
        '<',
      )
      .fromTo(
        principles[i],
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power3.out' },
        '<',
      )
  }

  // Fade the last one out.
  tl.to(principles[principles.length - 1], { opacity: 0, y: -40, duration: 0.2 })

  return tl
}
