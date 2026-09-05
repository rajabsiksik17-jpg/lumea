import { gsap } from './helpers.js'
import { isMobile } from './helpers.js'

// Philosophy — pinned section on desktop; scroll-driven crossfade on mobile.
export function setupPhilosophyAnimations({ root }) {
  const bg = root.querySelectorAll('[data-phil-bg]')
  const principles = root.querySelectorAll('[data-phil-item]')

  // Desktop: pinned reveal, principles one after another.
  if (!isMobile()) {
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

    tl.fromTo(
      principles[0].querySelectorAll('[data-phil-reveal]'),
      { y: 44, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.3, stagger: 0.08, ease: 'power3.out' },
    )

    for (let i = 1; i < principles.length; i++) {
      tl.to(principles[i - 1], { opacity: 0, y: -40, duration: 0.25, ease: 'power2.inOut' })
        .fromTo(bg[i], { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'none' }, '<')
        .fromTo(
          principles[i],
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power3.out' },
          '<',
        )
    }

    tl.to(principles[principles.length - 1], { opacity: 0, y: -40, duration: 0.2 })
    return tl
  }

  // Mobile: principles stack vertically, each reveals on scroll with a background tint.
  principles.forEach((item, i) => {
    gsap.fromTo(
      item.querySelectorAll('[data-phil-reveal]'),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: item, start: 'top 78%', once: true },
      },
    )
  })
}
