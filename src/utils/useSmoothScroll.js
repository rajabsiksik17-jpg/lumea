import { useEffect } from 'react'
import Lenis from 'lenis'
import { setLenis } from './scrollTo.js'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Initializes Lenis smooth scrolling and keeps it in sync with GSAP ScrollTrigger.
// Respects prefers-reduced-motion by skipping smooth scrolling entirely.
export function useSmoothScroll(enabled = true) {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!enabled || reduced) return undefined

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    })

    setLenis(lenis)

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      setLenis(null)
      lenis.destroy()
    }
  }, [enabled])

  return null
}

export default useSmoothScroll
