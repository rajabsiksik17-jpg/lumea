import { gsap } from './helpers.js'

// Services — pinned horizontal cinematic transition (desktop only).
export function setupServicesAnimations({ root }) {
  const track = root.querySelector('[data-services-track]')

  const getScroll = () => track.scrollWidth - window.innerWidth

  gsap.to(track, {
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
