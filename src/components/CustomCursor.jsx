import { useEffect, useRef, useState } from 'react'

// Minimal custom cursor for fine-pointer devices only.
// Shows a small dot; expands to a "VIEW" label over interactive elements.
export default function CustomCursor() {
  const dotRef = useRef(null)
  const labelRef = useRef(null)
  const hoverRef = useRef(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return
    setEnabled(true)
    document.documentElement.classList.add('has-custom-cursor')
    return () => document.documentElement.classList.remove('has-custom-cursor')
  }, [])

  useEffect(() => {
    if (!enabled) return
    const dot = dotRef.current
    const label = labelRef.current
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let dx = x
    let dy = y
    let raf

    const move = (e) => {
      x = e.clientX
      y = e.clientY
    }

    const over = (e) => {
      const interactive = e.target.closest('a, button, [data-cursor]')
      hoverRef.current = Boolean(interactive)
      if (interactive) {
        label.style.opacity = '1'
        label.style.transform = 'translate(-50%, -50%) scale(1)'
      } else {
        label.style.opacity = '0'
        label.style.transform = 'translate(-50%, -50%) scale(0.4)'
      }
    }

    const loop = () => {
      dx += (x - dx) * 0.2
      dy += (y - dy) * 0.2
      const scale = hoverRef.current ? 2.8 : 1
      dot.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%) scale(${scale})`
      label.style.left = `${dx}px`
      label.style.top = `${dy}px`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      cancelAnimationFrame(raf)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="custom-cursor flex h-3 w-3 items-center justify-center rounded-full bg-cream"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div
        ref={labelRef}
        aria-hidden="true"
        className="custom-cursor text-[0.55rem] font-semibold uppercase tracking-widest2 text-cream"
        style={{ opacity: 0, transform: 'translate(-50%, -50%) scale(0.4)' }}
      >
        VIEW
      </div>
    </>
  )
}
