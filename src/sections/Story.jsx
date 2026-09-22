import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../animations/helpers.js'
import { setupStoryAnimations } from '../animations/storyAnimations.js'
import { images } from '../data/images.js'
import SmartImage from '../components/SmartImage.jsx'

const headline = ['بدأ كل شيء', 'بسؤال واحد:', 'كيف نجمع بين', 'العلم والجمال؟']

export default function Story() {
  const root = useRef(null)

  useLayoutEffect(() => {
    if (!root.current) return
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set(root.current.querySelectorAll('[data-story-word]'), { yPercent: 0 })
        gsap.set(root.current.querySelectorAll('[data-story-para]'), { opacity: 1, y: 0 })
        gsap.set(root.current.querySelector('[data-story-img]'), { scale: 1, clipPath: 'inset(0 0 0 0)' })
        return
      }
      setupStoryAnimations({ root: root.current })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section id="story" ref={root} className="relative bg-warm">
      <div data-story-pin className="flex min-h-[100svh] items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-[1500px] gap-12 px-5 py-24 md:px-10 lg:grid-cols-2 lg:items-center">
          {/* Text */}
          <div className="order-2 lg:order-1">
            <div className="mb-8 flex items-center gap-3">
              <span className="h-px w-8 bg-accent" />
              <span className="eyebrow">02 — Our Story</span>
            </div>

            <h2 className="font-serif text-3xl font-light leading-tight text-ink md:text-5xl">
              {headline.map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  <span data-story-word className="block will-change-transform">
                    {line}
                  </span>
                </span>
              ))}
            </h2>

            <div className="mt-8 max-w-lg space-y-5 text-base font-light leading-relaxed text-muted">
              <p data-story-para>
                بدأت LUMÉA من قناعة بأن العناية بالبشرة لا تقتصر على ما يظهر على السطح، بل تبدأ من
                فهم أعمق لطبيعة الجلد.
              </p>
              <p data-story-para>
                لذلك جمعنا بين المعرفة الطبية والتركيبات الدقيقة لصنع تجربة تتجاوز المنتج أو
                الجلسة — من الكريمات إلى الفيلر.
              </p>
              <p data-story-para>
                من أول استشارة وحتى آخر تفصيل، نريد أن تشعري بأن كل خطوة صُمّمت علميًا من أجل
                بشرتك.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative order-1 aspect-[4/5] max-h-[80vh] overflow-hidden lg:order-2">
            <SmartImage
              src={images.story}
              alt="Editorial portrait with soft natural lighting"
              className="h-full w-full object-cover will-change-transform"
              data-story-img
              eager
            />
            <SmartImage
              src={images.storySecondary}
              alt="Close-up beauty editorial detail"
              className="absolute inset-0 h-full w-full object-cover will-change-transform"
              style={{ opacity: 0 }}
              data-story-img-2
            />
          </div>
        </div>
      </div>
    </section>
  )
}
