// Smooth-scroll to a section by id using Lenis (when available).
// Falls back to native smooth scroll.

let lenisInstance = null

export function setLenis(lenis) {
  lenisInstance = lenis
}

export function getLenis() {
  return lenisInstance
}

export function scrollToSection(href) {
  if (!href || !href.startsWith('#')) return
  const target = document.querySelector(href)
  if (!target) return

  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset: -80, duration: 1.4 })
  } else {
    const top = target.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

export default scrollToSection
