import { gsap } from './helpers.js'

// Story section — pinned scene: image scales/moves, crossfades to a second
// image, and the headline reveals while scrolling.
export function setupStoryAnimations({ root }) {
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

  tl.fromTo(
    img,
    { scale: 0.85, xPercent: 0 },
    { scale: 1.1, xPercent: -6, ease: 'none', duration: 0.5 },
  )
    .fromTo(
      img2,
      { opacity: 0, scale: 1.05 },
      { opacity: 1, scale: 1, ease: 'none', duration: 0.35 },
      '<',
    )
    .fromTo(
      headline,
      { yPercent: 120 },
      { yPercent: 0, stagger: 0.06, ease: 'power2.out', duration: 0.4 },
      0,
    )
    .to({}, { duration: 0.1 })
    .to(img, { scale: 1.18, ease: 'none', duration: 0.35 })
    .to(img2, { scale: 1.15, ease: 'none', duration: 0.35 }, '<')

  return tl
}
