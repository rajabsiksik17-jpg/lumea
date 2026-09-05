import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../animations/helpers.js'

// Thin vertical progress indicator pinned to the side of the viewport.
export default function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    if (prefersReduced()) return
    const bar = barRef.current
    const tween = gsap.to(bar, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        start: 0,
        end: () => ScrollTrigger.maxScroll(window),
        scrub: 0.4,
      },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  function prefersReduced() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  return (
    <div
      aria-hidden="true"
      className="fixed right-5 top-1/2 z-40 hidden h-[36vh] w-px -translate-y-1/2 lg:block"
      style={{ background: 'rgba(29,25,23,0.1)' }}
    >
      <div
        ref={barRef}
        className="h-full w-full origin-top scale-y-0"
        style={{ background: 'var(--accent)' }}
      />
    </div>
  )
}
