import { gsap } from './helpers.js'
import { isMobile } from './helpers.js'

// Story section — pinned scene on desktop; cinematic vertical reveal on mobile.
export function setupStoryAnimations({ root }) {
  // Desktop: pinned scene with image scale + crossfade + headline reveal.
  if (!isMobile()) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: 'top top',
        end: '+=220%',
        scrub: 0.6,
        pin: root.querySelector('[data-story-pin]'),
        anticipatePin: 1,
      },
    })

    const img = root.querySelector('[data-story-img]')
    const img2 = root.querySelector('[data-story-img-2]')
    const headline = root.querySelectorAll('[data-story-word]')

    tl.fromTo(img, { scale: 0.85, xPercent: 0 }, { scale: 1.1, xPercent: -6, ease: 'none', duration: 0.5 })
      .fromTo(img2, { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, ease: 'none', duration: 0.35 }, '<')
      .fromTo(headline, { yPercent: 120 }, { yPercent: 0, stagger: 0.06, ease: 'power2.out', duration: 0.4 }, 0)
      .to({}, { duration: 0.1 })
      .to(img, { scale: 1.18, ease: 'none', duration: 0.35 })
      .to(img2, { scale: 1.15, ease: 'none', duration: 0.35 }, '<')

    return tl
  }

  // Mobile: headline line reveal + image reveal + crossfade on scroll.
  const img = root.querySelector('[data-story-img]')
  const img2 = root.querySelector('[data-story-img-2]')
  const headline = root.querySelectorAll('[data-story-word]')
  const body = root.querySelectorAll('[data-story-para]')

  gsap.fromTo(
    headline,
    { yPercent: 120 },
    {
      yPercent: 0,
      stagger: 0.08,
      duration: 1,
      ease: 'power4.out',
      scrollTrigger: { trigger: headline[0], start: 'top 85%', once: true },
    },
  )

  gsap.fromTo(
    body,
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.9,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: body[0], start: 'top 85%', once: true },
    },
  )

  if (img) {
    gsap.fromTo(
      img,
      { scale: 1.25, clipPath: 'inset(100% 0 0 0)' },
      {
        scale: 1,
        clipPath: 'inset(0% 0 0 0)',
        duration: 1.4,
        ease: 'power3.out',
        scrollTrigger: { trigger: img, start: 'top 80%', once: true },
      },
    )
    gsap.fromTo(
      img,
      { yPercent: -6 },
      {
        yPercent: 6,
        ease: 'none',
        scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: 1 },
      },
    )
  }

  if (img2) {
    gsap.fromTo(
      img2,
      { opacity: 0 },
      {
        opacity: 0.6,
        ease: 'none',
        scrollTrigger: { trigger: img2, start: 'top 90%', end: 'bottom 40%', scrub: 1 },
      },
    )
  }
}
