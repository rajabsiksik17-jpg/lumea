import { gsap } from './helpers.js'
import { isMobile } from './helpers.js'

// Services — horizontal cinematic transition (desktop) or a vertical
// editorial reveal (mobile). Works on all screens.
export function setupServicesAnimations({ root }) {
  const track = root.querySelector('[data-services-track]')

  // Desktop: horizontal pinned scroll.
  if (!isMobile()) {
    const getScroll = () => track.scrollWidth - window.innerWidth
    return gsap.to(track, {
      x: () => -getScroll(),
      ease: 'none',
      scrollTrigger: {
        trigger: root,
        start: 'top top',
        end: () => `+=${getScroll()}`,
        scrub: 0.6,
        pin: root.querySelector('[data-services-pin]'),
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    })
  }

  // Mobile: vertical stacked panels with cinematic reveal.
  const panels = root.querySelectorAll('[data-service-panel]')
  return panels.forEach((panel) => {
    const img = panel.querySelector('img')
    const texts = panel.querySelectorAll('[data-service-reveal]')

    gsap.fromTo(
      texts,
      { y: 36, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: panel, start: 'top 80%', once: true },
      },
    )

    if (img) {
      gsap.fromTo(
        img,
        { scale: 1.2, clipPath: 'inset(100% 0 0 0)' },
        {
          scale: 1,
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.3,
          ease: 'power3.out',
          scrollTrigger: { trigger: panel, start: 'top 80%', once: true },
        },
      )
    }

    // Subtle parallax on the image.
    if (img) {
      gsap.fromTo(
        img,
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: 'none',
          scrollTrigger: {
            trigger: panel,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        },
      )
    }
  })
}
