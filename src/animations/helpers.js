import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Centralized animation configuration — respects reduced motion globally.
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Safe matchMedia for media-query-driven animation logic.
export const isMobile = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(max-width: 767px)').matches

export const isDesktop = () => !isMobile()

// Split text into word spans for staggered reveal.
export function splitWords(el) {
  if (!el) return null
  const text = el.textContent || ''
  el.setAttribute('aria-label', text)
  el.textContent = ''
  const words = text.split(' ')
  const spans = words.map((word, i) => {
    const span = document.createElement('span')
    span.className = 'split-word'
    span.style.display = 'inline-block'
    span.style.overflow = 'hidden'
    span.style.verticalAlign = 'top'
    const inner = document.createElement('span')
    inner.className = 'split-word-inner'
    inner.style.display = 'inline-block'
    inner.style.willChange = 'transform'
    inner.textContent = word + (i < words.length - 1 ? '\u00A0' : '')
    span.appendChild(inner)
    el.appendChild(span)
    return inner
  })
  return spans
}

// Standard fade/slide-up reveal on scroll.
export function revealUp(el, { y = 40, delay = 0, duration = 1.1, start = 'top 85%' } = {}) {
  if (!el || prefersReducedMotion()) return
  return gsap.fromTo(
    el,
    { y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start, once: true },
    },
  )
}

// Batch reveal for a group of elements with stagger.
export function revealGroup(items, { y = 36, stagger = 0.08, start = 'top 85%' } = {}) {
  if (!items || items.length === 0 || prefersReducedMotion()) return
  return gsap.fromTo(
    items,
    { y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.05,
      stagger,
      ease: 'power3.out',
      scrollTrigger: { trigger: items[0], start, once: true },
    },
  )
}

// Simple parallax on scroll.
export function parallax(el, { amount = 12, scrub = true, start = 'top bottom', end = 'bottom top' } = {}) {
  if (!el || prefersReducedMotion()) return
  return gsap.fromTo(
    el,
    { yPercent: -amount },
    {
      yPercent: amount,
      ease: 'none',
      scrollTrigger: { trigger: el, start, end, scrub: scrub ? 1 : false },
    },
  )
}

export { gsap, ScrollTrigger }
