import { Instagram, Facebook, Music2 } from 'lucide-react'
import { navigation } from '../data/navigation.js'
import { siteConfig } from '../config/siteConfig.js'
import { scrollToSection } from '../utils/scrollTo.js'

const socials = [
  { name: 'Instagram', href: siteConfig.social.instagram, icon: Instagram },
  { name: 'Facebook', href: siteConfig.social.facebook, icon: Facebook },
  { name: 'TikTok', href: siteConfig.social.tiktok, icon: Music2 },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-cream">
      <div className="mx-auto max-w-[1500px] px-5 pb-10 pt-20 md:px-10 md:pt-28">
        <div className="grid gap-14 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('#home')
              }}
              className="inline-flex flex-col items-start leading-none"
            >
              <span className="font-serif text-4xl font-light tracking-[0.22em]">
                {siteConfig.name}
              </span>
            </a>
            <p className="mt-6 max-w-xs text-sm font-light leading-relaxed text-cream/60">
              {siteConfig.brandMotto}
            </p>
            <div className="mt-8 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream/70 transition-all duration-500 ease-smooth hover:border-cream hover:text-cream"
                >
                  <s.icon className="h-4 w-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-4">
            <span className="eyebrow text-cream/40">القائمة</span>
            <nav className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(item.href)
                  }}
                  className="link-line w-fit text-sm font-light text-cream/70 transition-colors hover:text-cream"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <span className="eyebrow text-cream/40">تواصل</span>
            <div className="mt-6 flex flex-col gap-3 text-sm font-light text-cream/70">
              <a href={`mailto:${siteConfig.email}`} className="link-line w-fit hover:text-cream">
                {siteConfig.email}
              </a>
              <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="link-line w-fit hover:text-cream">
                {siteConfig.phoneDisplay}
              </a>
              <span>{siteConfig.location}</span>
            </div>
          </div>
        </div>

        {/* Big wordmark */}
        <div className="mt-20 select-none overflow-hidden" aria-hidden="true">
          <div className="whitespace-nowrap font-serif text-[18vw] font-light leading-none text-cream/[0.04] md:text-[13vw]">
            LUMÉA
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-6 text-[0.68rem] uppercase tracking-widest2 text-cream/40 md:flex-row">
          <span>© 2026 {siteConfig.name}. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="link-line hover:text-cream">
              Privacy Policy
            </a>
            <a href="#" className="link-line hover:text-cream">
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
