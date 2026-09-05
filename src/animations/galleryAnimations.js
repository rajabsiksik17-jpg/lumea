import { gsap } from './helpers.js'

// Gallery — parallax reveal with varying speeds.
export function setupGalleryAnimations({ root }) {
  const items = root.querySelectorAll('[data-gallery-item]')

  items.forEach((item, i) => {
    const img = item.querySelector('img')
    gsap.fromTo(
      item,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: item, start: 'top 88%', once: true },
      },
    )

    if (img) {
      const speed = (i % 3) - 1 // -1, 0, 1
      gsap.fromTo(
        img,
        { yPercent: -6 * speed },
        {
          yPercent: 6 * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        },
      )
    }
  })
}
