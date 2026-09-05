import { useState, useLayoutEffect, useRef } from 'react'
import { Phone, Mail, MapPin, Send } from 'lucide-react'
import { siteConfig } from '../config/siteConfig.js'
import { services } from '../data/services.js'
import { gsap, revealGroup } from '../animations/helpers.js'

const contactItems = [
  { icon: Phone, label: 'Phone', value: siteConfig.phoneDisplay, href: `tel:${siteConfig.phone.replace(/\s/g, '')}` },
  { icon: Mail, label: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: MapPin, label: 'Location', value: siteConfig.location, href: null },
]

export default function Contact() {
  const root = useRef(null)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })

  useLayoutEffect(() => {
    if (!root.current) return
    const ctx = gsap.context(() => {
      revealGroup(root.current.querySelectorAll('[data-contact-reveal]'), {
        y: 30,
        stagger: 0.08,
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()

    // ---------------------------------------------------------------------
    // FORM SUBMISSION
    // This is a static site with no backend.
    //
    // Option A (default): mailto fallback — opens the visitor's email client.
    // Option B: set `siteConfig.formEndpoint` (e.g. https://formspree.io/f/xxxx
    //          or Web3Forms) and the form will POST there automatically.
    // ---------------------------------------------------------------------

    if (siteConfig.formEndpoint) {
      setStatus('sending')
      try {
        const res = await fetch(siteConfig.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(form),
        })
        if (!res.ok) throw new Error('send-failed')
        setStatus('sent')
      } catch {
        setStatus('error')
      }
      return
    }

    // mailto fallback
    const subject = `طلب تجربة من ${form.name || 'عميلة LUMÉA'}`
    const body = [
      `الاسم: ${form.name}`,
      `البريد: ${form.email}`,
      `الهاتف: ${form.phone}`,
      `نوع الخدمة: ${form.service || 'غير محدد'}`,
      `الرسالة: ${form.message}`,
    ].join('\n')

    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
    setStatus('sent')
  }

  const inputClass =
    'w-full rounded-none border-b border-line bg-transparent py-3 text-base font-light text-ink placeholder:text-muted/50 focus:border-accent focus:outline-none transition-colors duration-500'

  return (
    <section id="contact" className="relative bg-cream py-24 md:py-32">
      <div ref={root} className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Info */}
          <div>
            <div data-contact-reveal className="mb-8 flex items-center gap-3">
              <span className="h-px w-8 bg-accent" />
              <span className="eyebrow">10 — Contact</span>
            </div>
            <h2 data-contact-reveal className="font-serif text-4xl font-light leading-tight text-ink md:text-6xl">
              LET'S TALK
              <br />
              <span className="italic">BEAUTY.</span>
            </h2>
            <p data-contact-reveal className="mt-6 max-w-sm text-base font-light leading-relaxed text-muted">
              لديك سؤال؟ تريدين معرفة المزيد؟ نحن هنا لنساعدك.
            </p>

            <div className="mt-12 flex flex-col gap-6">
              {contactItems.map((c) => (
                <div key={c.label} data-contact-reveal className="flex items-center gap-5">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-accent">
                    <c.icon className="h-5 w-5" strokeWidth={1.4} />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[0.62rem] uppercase tracking-widest2 text-muted">
                      {c.label}
                    </span>
                    {c.href ? (
                      <a href={c.href} className="link-line w-fit text-base font-light text-ink">
                        {c.value}
                      </a>
                    ) : (
                      <span className="text-base font-light text-ink">{c.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div data-contact-reveal className="rounded-sm border border-line bg-warm p-8 md:p-12">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-[0.62rem] uppercase tracking-widest2 text-muted">
                    الاسم
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={update}
                    className={inputClass}
                    placeholder="اسمك الكريم"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-[0.62rem] uppercase tracking-widest2 text-muted">
                    البريد الإلكتروني
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={update}
                    className={inputClass}
                    placeholder="you@email.com"
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-[0.62rem] uppercase tracking-widest2 text-muted">
                    رقم الهاتف
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={update}
                    className={inputClass}
                    placeholder="+962 7X XXX XXXX"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="service" className="text-[0.62rem] uppercase tracking-widest2 text-muted">
                    نوع الخدمة
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={update}
                    className={`${inputClass} cursor-pointer`}
                  >
                    <option value="">اختاري الخدمة</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    <option value="other">أخرى</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-[0.62rem] uppercase tracking-widest2 text-muted">
                  الرسالة
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={form.message}
                  onChange={update}
                  className={`${inputClass} resize-none`}
                  placeholder="حدثينا عن احتياجاتك..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-ink px-8 py-4 text-[0.72rem] uppercase tracking-widest2 text-cream transition-all duration-500 ease-smooth hover:bg-[#2a2420] disabled:opacity-60"
              >
                {status === 'sending' ? 'جارٍ الإرسال...' : 'إرسال الطلب'}
                <Send className="h-4 w-4 transition-transform duration-500 ease-smooth group-hover:-translate-x-1" strokeWidth={1.5} />
              </button>

              {status === 'sent' && (
                <p className="text-sm font-light text-accent">
                  شكرًا لك، تم استلام طلبك. سنتواصل معك قريبًا.
                </p>
              )}
              {status === 'error' && (
                <p className="text-sm font-light text-red-500">
                  حدث خطأ أثناء الإرسال، حاولي مرة أخرى.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
