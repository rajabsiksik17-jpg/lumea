import { gsap } from './helpers.js'

// Hero intro timeline — runs once after the loader completes.
export function heroIntro({ root, timeline }) {
  if (!root) return
  const q = (sel) => root.querySelectorAll(sel)

  // Background: blur -> sharp
  gsap.fromTo(
    root.querySelector('[data-hero-bg]'),
    { filter: 'blur(20px)', scale: 1.08 },
    { filter: 'blur(0px)', scale: 1, duration: 1.8, ease: 'power2.out' },
  )

  timeline
    .fromTo(
      q('[data-hero-eyebrow]'),
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
      '+=0.4',
    )
    .fromTo(
      q('[data-hero-line]'),
      { yPercent: 115 },
      { yPercent: 0, duration: 1.2, stagger: 0.14, ease: 'power4.out' },
      '-=0.5',
    )
    .fromTo(
      q('[data-hero-sub]'),
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
      '-=0.7',
    )
    .fromTo(
      q('[data-hero-desc]'),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
      '-=0.5',
    )
    .fromTo(
      q('[data-hero-cta]'),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
      '-=0.5',
    )
    .fromTo(
      q('[data-hero-float]'),
      { opacity: 0 },
      { opacity: 1, duration: 1, stagger: 0.15, ease: 'power2.out' },
      '-=0.4',
    )

  return timeline
}

// Hero scroll-out — content fades/moves up while the image scales slowly.
export function heroScrollOut({ root }) {
  const content = root.querySelector('[data-hero-content]')
  const bg = root.querySelector('[data-hero-bg]')

  if (content) {
    gsap.to(content, {
      yPercent: -18,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: root,
        start: 'top top',
        end: 'bottom 25%',
        scrub: 0.6,
      },
    })
  }

  if (bg) {
    gsap.to(bg, {
      scale: 1.15,
      ease: 'none',
      scrollTrigger: {
        trigger: root,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8,
      },
    })
  }
}
