import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../animations/helpers.js'
import { setupGalleryAnimations } from '../animations/galleryAnimations.js'
import { images } from '../data/images.js'
import SmartImage from '../components/SmartImage.jsx'

// Aspect ratios give an editorial, varied rhythm rather than a plain grid.
const layouts = [
  'aspect-[3/4] md:col-span-2 md:row-span-2',
  'aspect-[4/3]',
  'aspect-[3/4]',
  'aspect-[4/3]',
  'aspect-[3/4]',
  'aspect-[4/3] md:col-span-2',
]

export default function Gallery() {
  const root = useRef(null)

  useLayoutEffect(() => {
    if (!root.current) return
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set(root.current.querySelectorAll('[data-gallery-item]'), { opacity: 1, y: 0 })
        return
      }
      setupGalleryAnimations({ root: root.current })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section className="relative overflow-hidden bg-warm py-24 md:py-32">
      {/* Moving wordmark */}
      <div className="pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <div className="marquee-track flex w-max whitespace-nowrap font-serif text-[16vw] font-light leading-none text-ink/[0.05] md:text-[11vw]">
          <span className="px-6">BEAUTY IN DETAILS</span>
          <span className="px-6 italic text-accent/20">· BEAUTY IN DETAILS</span>
          <span className="px-6">BEAUTY IN DETAILS</span>
          <span className="px-6 italic text-accent/20">· BEAUTY IN DETAILS</span>
        </div>
      </div>

      <div ref={root} className="mx-auto mt-10 max-w-[1500px] px-5 md:mt-16 md:px-10">
        <div className="mb-12 flex items-center gap-3">
          <span className="h-px w-8 bg-accent" />
          <span className="eyebrow">09 — Gallery</span>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {images.gallery.map((src, i) => (
            <div
              key={i}
              data-gallery-item
              className={`group relative overflow-hidden rounded-sm ${layouts[i]}`}
              style={{ opacity: 0 }}
            >
              <SmartImage
                src={src}
                alt={`Beauty editorial detail ${i + 1}`}
                className="h-full w-full scale-[1.12] object-cover transition-transform duration-[1.2s] ease-smooth group-hover:scale-[1.18]"
              />
              <span className="absolute bottom-3 left-3 font-serif text-sm text-cream/80 mix-blend-difference">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
