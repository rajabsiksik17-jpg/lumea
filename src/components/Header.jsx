import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navigation } from '../data/navigation.js'
import { siteConfig } from '../config/siteConfig.js'
import { scrollToSection, getLenis } from '../utils/scrollTo.js'
import Button from './Button.jsx'

function Logo({ onClick, dark }) {
  return (
    <a
      href="#home"
      onClick={(e) => {
        e.preventDefault()
        scrollToSection('#home')
        onClick?.()
      }}
      className="group flex flex-col items-start leading-none"
      aria-label={`${siteConfig.name} — ${siteConfig.tagline}`}
    >
      <span
        className="font-serif text-2xl font-medium tracking-[0.22em] transition-colors"
        style={{ color: dark ? 'var(--ink)' : 'var(--cream)' }}
      >
        {siteConfig.name}
      </span>
      <span
        className="mt-1 text-[0.5rem] uppercase tracking-widest2"
        style={{ color: dark ? 'var(--muted)' : 'rgba(252,250,247,0.7)' }}
      >
        {siteConfig.tagline}
      </span>
    </a>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const lenis = getLenis()
    if (open) lenis?.stop()
    else lenis?.start()
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
      lenis?.start()
    }
  }, [open])

  const go = (href) => {
    setOpen(false)
    setTimeout(() => scrollToSection(href), 60)
  }

  const overHero = !scrolled && !open

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-smooth ${
          scrolled
            ? 'border-b border-line bg-cream/80 py-3 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent py-5'
        }`}
      >
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 md:px-10">
          <Logo onClick={() => setOpen(false)} dark={scrolled || open} />

          <nav className="hidden items-center gap-8 lg:flex" aria-label="التنقل الرئيسي">
            {navigation.slice(0, 5).map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  go(item.href)
                }}
                className="link-line text-[0.7rem] uppercase tracking-widest2 transition-colors duration-300"
                style={{ color: overHero ? 'rgba(252,250,247,0.85)' : 'var(--ink)' }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button
              href="#contact"
              variant={overHero ? 'outlineLight' : 'outline'}
              arrow={false}
              className="px-5 py-2.5 text-[0.62rem]"
            >
              تواصل معنا
            </Button>
          </div>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border lg:hidden"
            style={{
              borderColor: overHero ? 'rgba(252,250,247,0.4)' : 'var(--line)',
              color: overHero ? 'var(--cream)' : 'var(--ink)',
            }}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
          </button>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-cream px-8 transition-all duration-700 ease-smooth lg:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!open}
      >
        <nav className="flex flex-col gap-2" aria-label="قائمة الجوال">
          {navigation.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault()
                go(item.href)
              }}
              className="group flex items-center justify-between border-b border-line py-4"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.6s ${0.05 * i + 0.1}s ease-smooth`,
              }}
            >
              <span className="font-serif text-3xl font-light text-ink">{item.label}</span>
              <span className="text-[0.6rem] uppercase tracking-widest2 text-muted">
                0{i + 1}
              </span>
            </a>
          ))}
        </nav>

        <div
          className="mt-10 flex flex-col gap-4"
          style={{
            opacity: open ? 1 : 0,
            transition: 'all 0.6s 0.5s ease-smooth',
          }}
        >
          <Button href="#contact" onClick={() => go('#contact')}>
            احجزي تجربتك
          </Button>
        </div>
      </div>
    </>
  )
}
