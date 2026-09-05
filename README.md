# LUMÉA — Beauty, Refined

A cinematic, scroll-driven landing page for a luxury beauty & care brand.
Built as a **100% static frontend** — no database, no backend, no auth.

The site is designed to feel like an interactive beauty campaign rather than a
traditional business website: smooth scrolling, pinned scenes, parallax,
mask reveals and editorial typography.

---

## ✨ Features

- **Scroll-driven animations** powered by GSAP + ScrollTrigger
- **Smooth scrolling** with [Lenis](https://lenis.darkroom.engineering)
- **Cinematic scenes** — Hero intro, Story pin, Philosophy pin, Services
  horizontal scroll, Products campaign reveal, Parallax gallery
- **Fully responsive** with a dedicated mobile experience (animations reduced)
- **Accessible** — semantic HTML, ARIA labels, focus states,
  `prefers-reduced-motion` support
- **SEO ready** — meta tags, Open Graph, Twitter Card, JSON-LD, sitemap, robots
- **Central configuration** — edit brand, contact, links & SEO from one file

## 🛠 Tech Stack

| Layer      | Tool                          |
| ---------- | ----------------------------- |
| Framework  | React 18                      |
| Build      | Vite 5                        |
| Styling    | Tailwind CSS 3                |
| Animation  | GSAP + ScrollTrigger          |
| Smooth     | Lenis                         |
| Icons      | Lucide React                  |
| Fonts      | Cormorant Garamond + Manrope  |

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev

# 3. Production build
npm run build

# 4. Preview the build locally
npm run preview
```

## 📁 Project Structure

```
src/
├── animations/      # GSAP setup functions (hero, story, philosophy, ...)
├── components/      # Header, Footer, Button, Loader, Cursor, ...
├── config/          # siteConfig.js — central brand/contact/SEO settings
├── data/            # navigation, services, products, testimonials, images
├── sections/        # Hero, Intro, Story, Philosophy, Services, ...
├── utils/           # Lenis smooth scroll, scroll-to helper
├── App.jsx
├── main.jsx
└── index.css
```

## ⚙️ Configuration

Everything brand-related lives in `src/config/siteConfig.js`:

- Company name & tagline
- Email, phone, location
- WhatsApp number & message
- Social links
- SEO title / description / URL

Content (services, products, testimonials, stats) lives in `src/data/*.js`.

Images are centralized in `src/data/images.js` and currently use royalty-free
Unsplash URLs for development. **Replace them** with your own assets before
launch (drop files in `public/images` and reference them as `/images/...`).

### Contact form

The form is frontend-only. By default it uses a `mailto:` fallback.

To connect a real service (Formspree / Web3Forms), set `formEndpoint` in
`siteConfig.js`, e.g.:

```js
formEndpoint: 'https://formspree.io/f/YOUR_FORM_ID'
```

The form will POST JSON to that endpoint automatically.

## 🌍 Deployment (Hostinger)

The build outputs a static `dist/` folder — upload its contents to `public_html`.

```bash
npm run build
# upload the contents of ./dist to your hosting root
```

You can also connect Hostinger to your GitHub repo via Git deployment and set
the build command to `npm run build` with output directory `dist`.

> `vite.config.js` uses `base: './'` so the build works from any subfolder.

## ♿ Accessibility & Performance

- Animations respect `prefers-reduced-motion`
- Lazy-loaded images with graceful fallbacks
- Code-split vendor/motion/icon bundles
- GSAP & ScrollTrigger contexts are properly cleaned up on unmount

## License

Proprietary — all rights reserved.
