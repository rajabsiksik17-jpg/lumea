// Generates elegant SVG placeholder images into /public/images.
// Run with: node scripts/generate-placeholders.mjs
// Replace each .svg with your real photo (jpg/webp) before launch and update
// the extension in src/data/images.js / services.js / products.js.

import { writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '..', 'public', 'images')
mkdirSync(outDir, { recursive: true })

const slots = [
  { file: 'hero.svg', label: 'HERO', w: 1920, h: 1080 },
  { file: 'story.svg', label: 'STORY', w: 1200, h: 1500 },
  { file: 'story-secondary.svg', label: 'STORY DETAIL', w: 1200, h: 1500 },
  { file: 'philosophy-01.svg', label: 'PHILOSOPHY · 01', w: 1200, h: 1200 },
  { file: 'philosophy-02.svg', label: 'PHILOSOPHY · 02', w: 1200, h: 1200 },
  { file: 'philosophy-03.svg', label: 'PHILOSOPHY · 03', w: 1200, h: 1200 },
  { file: 'experience.svg', label: 'EXPERIENCE', w: 1920, h: 1080 },
  { file: 'final-cta.svg', label: 'FINAL CTA', w: 1920, h: 1080 },
  { file: 'gallery-01.svg', label: 'GALLERY · 01', w: 900, h: 1200 },
  { file: 'gallery-02.svg', label: 'GALLERY · 02', w: 900, h: 1200 },
  { file: 'gallery-03.svg', label: 'GALLERY · 03', w: 900, h: 1200 },
  { file: 'gallery-04.svg', label: 'GALLERY · 04', w: 900, h: 1200 },
  { file: 'gallery-05.svg', label: 'GALLERY · 05', w: 900, h: 1200 },
  { file: 'gallery-06.svg', label: 'GALLERY · 06', w: 900, h: 1200 },
  { file: 'service-fillers.svg', label: 'DERMAL FILLERS', w: 1200, h: 900 },
  { file: 'service-skin-renewal.svg', label: 'SKIN RENEWAL', w: 1200, h: 900 },
  { file: 'service-consultation.svg', label: 'DERMA CONSULTATION', w: 1200, h: 900 },
  { file: 'service-creams.svg', label: 'SIGNATURE CREAMS', w: 1200, h: 900 },
  { file: 'product-hydrapeptide.svg', label: 'HYDRAPEPTIDE', w: 900, h: 1125 },
  { file: 'product-retinol.svg', label: 'RETINOL RENEW', w: 900, h: 1125 },
  { file: 'product-vitac.svg', label: 'VITA-C SERUM', w: 900, h: 1125 },
  { file: 'product-barrier-balm.svg', label: 'BARRIER BALM', w: 900, h: 1125 },
]

function svg(slot, i) {
  const { label, w, h } = slot
  // Subtle palette variation for visual rhythm
  const tints = [
    ['#F6F1EA', '#E8DED2'],
    ['#FCFAF7', '#EDE4D6'],
    ['#F3EDE4', '#E0D5C5'],
  ]
  const [a, b] = tints[i % tints.length]
  const fs = Math.round(w * 0.13)
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${a}"/>
      <stop offset="1" stop-color="${b}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <g fill="none" stroke="#B79B7A" stroke-opacity="0.25">
    <rect x="${w * 0.06}" y="${h * 0.06}" width="${w * 0.88}" height="${h * 0.88}"/>
  </g>
  <text x="50%" y="${h * 0.47}" text-anchor="middle" font-family="Georgia, serif" font-weight="300" font-size="${fs}" fill="#1D1917" fill-opacity="0.55" letter-spacing="${w * 0.04}">LUMÉA</text>
  <text x="50%" y="${h * 0.55}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${Math.round(w * 0.022)}" letter-spacing="${Math.round(w * 0.006)}" fill="#81766D" fill-opacity="0.85">${label}</text>
</svg>
`
}

slots.forEach((slot, i) => {
  writeFileSync(join(outDir, slot.file), svg(slot, i), 'utf8')
})

console.log(`Generated ${slots.length} placeholder images in ${outDir}`)
