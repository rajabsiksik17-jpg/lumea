// ============================================================================
// LUMÉA — Image Generator
// ----------------------------------------------------------------------------
// Generates bespoke luxury dermocosmetic SVG illustrations for every slot.
// Run with: node scripts/generate-placeholders.mjs
// Output: public/images/*.svg  (self-contained vector artwork — no external deps)
// ============================================================================

import { writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '..', 'public', 'images')
mkdirSync(outDir, { recursive: true })

const INK = '#1D1917'
const ACCENT = '#B79B7A'

/* ---------------------------------------------------------------- helpers */

const palettes = [
  ['#F6F1EA', '#E8DED2'],
  ['#FCFAF7', '#EDE4D6'],
  ['#F3EDE4', '#DCCFBD'],
  ['#EFE8DC', '#E3D5C1'],
]

function bg(w, h, i, dark = false) {
  const [a, b] = dark ? ['#241f1c', '#15110f'] : palettes[i % palettes.length]
  return `<defs>
    <radialGradient id="bg" cx="50%" cy="32%" r="85%">
      <stop offset="0" stop-color="${a}"/>
      <stop offset="1" stop-color="${b}"/>
    </radialGradient>
    <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.9"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0.35"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>`
}

function groundShadow(cx, cy, rx) {
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${rx * 0.1}" fill="${INK}" opacity="0.14"/>`
}

function wordmark(x, y, size, color = INK, opacity = 0.7) {
  return `<text x="${x}" y="${y}" text-anchor="middle" font-family="Georgia, serif" font-weight="400" font-size="${size}" fill="${color}" fill-opacity="${opacity}" letter-spacing="${size * 0.32}">LUMÉA</text>`
}

function tinyLabel(x, y, size, text, color = '#81766D') {
  return `<text x="${x}" y="${y}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${size}" letter-spacing="${size * 0.28}" fill="${color}">${text}</text>`
}

function wrap(w, h, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}</svg>`
}

/* -------------------------------------------------------- product primitives */

// Glass dropper serum bottle
function dropperBottle(cx, baseY, s, fill = '#E9DCC8') {
  const bw = 90 * s
  const bh = 150 * s
  const x = cx - bw / 2
  const y = baseY - bh
  return `
  ${groundShadow(cx, baseY + 6, bw * 0.62)}
  <rect x="${x}" y="${y + 20 * s}" width="${bw}" height="${bh - 20 * s}" rx="${12 * s}" fill="${fill}"/>
  <rect x="${x + 6 * s}" y="${y + 30 * s}" width="${bw * 0.22}" height="${bh - 40 * s}" rx="${4 * s}" fill="#ffffff" opacity="0.55"/>
  <rect x="${x + 30 * s}" y="${y - 34 * s}" width="${30 * s}" height="${40 * s}" rx="${6 * s}" fill="#1D1917"/>
  <rect x="${x + 33 * s}" y="${y - 60 * s}" width="${24 * s}" height="${30 * s}" rx="${8 * s}" fill="#1D1917"/>
  <rect x="${x + 40 * s}" y="${y - 66 * s}" width="${10 * s}" height="${10 * s}" rx="${3 * s}" fill="${ACCENT}"/>
  <text x="${cx}" y="${baseY - bh * 0.42}" text-anchor="middle" font-family="Georgia, serif" font-size="${16 * s}" fill="${INK}" opacity="0.75" letter-spacing="${6 * s}">LUMÉA</text>
  <text x="${cx}" y="${baseY - bh * 0.30}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${7 * s}" letter-spacing="${2.4 * s}" fill="${INK}" opacity="0.5">SERUM</text>`
}

// Cream jar
function creamJar(cx, baseY, s, lid = '#E9DCC8', body = '#F2EBDE') {
  const w = 120 * s
  const x = cx - w / 2
  const lh = 46 * s
  const bh = 70 * s
  return `
  ${groundShadow(cx, baseY + 6, w * 0.6)}
  <rect x="${x}" y="${baseY - bh}" width="${w}" height="${bh}" rx="${10 * s}" fill="${body}"/>
  <rect x="${x + 10 * s}" y="${baseY - bh + 8 * s}" width="${w * 0.2}" height="${bh - 16 * s}" rx="${5 * s}" fill="#ffffff" opacity="0.5"/>
  <rect x="${x - 6 * s}" y="${baseY - bh - lh}" width="${w + 12 * s}" height="${lh}" rx="${14 * s}" fill="${lid}"/>
  <ellipse cx="${cx}" cy="${baseY - bh - lh}" rx="${w / 2 + 6 * s}" ry="${14 * s}" fill="#ffffff" opacity="0.35"/>
  <text x="${cx}" y="${baseY - bh - lh + 18 * s}" text-anchor="middle" font-family="Georgia, serif" font-size="${15 * s}" fill="${INK}" opacity="0.7" letter-spacing="${6 * s}">LUMÉA</text>`
}

// Tube
function tube(cx, baseY, s, fill = '#E9DCC8') {
  const w = 96 * s
  const h = 150 * s
  const x = cx - w / 2
  return `
  ${groundShadow(cx, baseY + 6, w * 0.66)}
  <rect x="${x}" y="${baseY - h}" width="${w}" height="${h * 0.72}" rx="${10 * s}" fill="${fill}"/>
  <path d="M ${x} ${baseY - h * 0.28} L ${x + w / 2} ${baseY - h * 0.02} L ${x + w} ${baseY - h * 0.28} L ${x + w} ${baseY - h * 0.4} L ${x} ${baseY - h * 0.4} Z" fill="${fill}"/>
  <rect x="${cx - w / 2}" y="${baseY - h * 0.28}" width="${w}" height="${14 * s}" fill="#ffffff" opacity="0.4"/>
  <rect x="${cx - 14 * s}" y="${baseY - h * 0.4}" width="${28 * s}" height="${26 * s}" rx="${4 * s}" fill="#1D1917"/>
  <text x="${cx}" y="${baseY - h * 0.55}" text-anchor="middle" font-family="Georgia, serif" font-size="${14 * s}" fill="${INK}" opacity="0.7" letter-spacing="${5 * s}">LUMÉA</text>`
}

// Ampoule set (3 vials)
function ampouleSet(cx, baseY, s) {
  const out = [groundShadow(cx, baseY + 8, 150 * s)]
  const cols = ['#E9DCC8', '#DCCFBD', '#F2EBDE']
  const offs = [-60, 0, 60]
  offs.forEach((o, i) => {
    const ax = cx + o * s
    const w = 30 * s
    const h = 120 * s
    const x = ax - w / 2
    out.push(`
    <rect x="${x}" y="${baseY - h}" width="${w}" height="${h}" rx="${7 * s}" fill="${cols[i]}"/>
    <path d="M ${x} ${baseY - h} L ${ax} ${baseY - h - 24 * s} L ${x + w} ${baseY - h} Z" fill="${cols[i]}"/>
    <rect x="${x + 4 * s}" y="${baseY - h + 10 * s}" width="${w * 0.18}" height="${h - 20 * s}" rx="${3 * s}" fill="#ffffff" opacity="0.5"/>`)
  })
  return out.join('')
}

// Syringe (dermal filler)
function syringe(cx, baseY, s) {
  const w = 150 * s
  const h = 44 * s
  const x = cx - w / 2
  const y = baseY - h
  return `
  ${groundShadow(cx, baseY + 8, w * 0.55)}
  <rect x="${x + 60 * s}" y="${y - 30 * s}" width="${18 * s}" height="${30 * s}" rx="${3 * s}" fill="#1D1917"/>
  <rect x="${x + 64 * s}" y="${y - 40 * s}" width="${10 * s}" height="${12 * s}" rx="${2 * s}" fill="${ACCENT}"/>
  <rect x="${x + 30 * s}" y="${y}" width="${60 * s}" height="${h}" rx="${6 * s}" fill="url(#glass)" stroke="#1D1917" stroke-opacity="0.15"/>
  <rect x="${x + 34 * s}" y="${y + 8 * s}" width="${52 * s}" height="${14 * s}" rx="${3 * s}" fill="${ACCENT}" opacity="0.35"/>
  <rect x="${x}" y="${y + 6 * s}" width="${34 * s}" height="${h - 12 * s}" rx="${5 * s}" fill="${ACCENT}"/>
  <rect x="${x + 10 * s}" y="${y}" width="${12 * s}" height="${h}" rx="${3 * s}" fill="#1D1917" opacity="0.25"/>
  <line x1="${x + 8 * s}" y1="${y}" x2="${x + 8 * s}" y2="${y + h}" stroke="${INK}" stroke-opacity="0.25"/>`
}

// Pump bottle
function pumpBottle(cx, baseY, s, fill = '#E9DCC8') {
  const w = 88 * s
  const h = 140 * s
  const x = cx - w / 2
  const y = baseY - h
  return `
  ${groundShadow(cx, baseY + 6, w * 0.6)}
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${12 * s}" fill="${fill}"/>
  <rect x="${x + 6 * s}" y="${y + 10 * s}" width="${w * 0.2}" height="${h - 20 * s}" rx="${4 * s}" fill="#ffffff" opacity="0.5"/>
  <rect x="${cx - 20 * s}" y="${y - 20 * s}" width="${40 * s}" height="${24 * s}" rx="${5 * s}" fill="#1D1917"/>
  <rect x="${cx - 6 * s}" y="${y - 30 * s}" width="${12 * s}" height="${14 * s}" rx="${3 * s}" fill="${ACCENT}"/>
  <text x="${cx}" y="${baseY - h * 0.5}" text-anchor="middle" font-family="Georgia, serif" font-size="${14 * s}" fill="${INK}" opacity="0.7" letter-spacing="${5 * s}">LUMÉA</text>`
}

// Flatlay composition (multiple jars + bottle)
function flatlay(w, h) {
  const s = Math.min(w, h) / 900
  return `
  ${groundShadow(w * 0.32, h * 0.82, 150 * s)}
  ${groundShadow(w * 0.7, h * 0.84, 130 * s)}
  ${dropperBottle(w * 0.72, h * 0.82, s * 1.15, '#E9DCC8')}
  ${creamJar(w * 0.3, h * 0.78, s * 0.95, '#DCCFBD')}
  ${tube(w * 0.5, h * 0.5, s * 0.55, '#F2EBDE')}`
}

// Macro cream swirl
function macroSwirl(w, h) {
  return `
  <defs>
    <radialGradient id="sw" cx="42%" cy="38%" r="70%">
      <stop offset="0" stop-color="#FCFAF7"/>
      <stop offset="0.5" stop-color="#EFE6D6"/>
      <stop offset="1" stop-color="#E3D5C1"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <ellipse cx="${w * 0.5}" cy="${h * 0.5}" rx="${w * 0.42}" ry="${h * 0.42}" fill="url(#sw)"/>
  <path d="M ${w * 0.22} ${h * 0.5} Q ${w * 0.4} ${h * 0.32} ${w * 0.5} ${h * 0.46} T ${w * 0.78} ${h * 0.44}" fill="none" stroke="#FCFAF7" stroke-width="${w * 0.02}" stroke-linecap="round" opacity="0.9"/>
  <path d="M ${w * 0.26} ${h * 0.62} Q ${w * 0.46} ${h * 0.72} ${w * 0.74} ${h * 0.6}" fill="none" stroke="#ffffff" stroke-width="${w * 0.018}" stroke-linecap="round" opacity="0.7"/>`
}

// Dark immersive glow (experience)
function darkGlow(w, h) {
  return `
  ${bg(w, h, 0, true)}
  <circle cx="${w * 0.5}" cy="${h * 0.42}" r="${Math.min(w, h) * 0.34}" fill="#B79B7A" opacity="0.08"/>
  <circle cx="${w * 0.5}" cy="${h * 0.42}" r="${Math.min(w, h) * 0.2}" fill="#B79B7A" opacity="0.12"/>
  ${dropperBottle(w * 0.5, h * 0.72, Math.min(w, h) / 900 * 1.5, '#2E2723')}
  <rect x="${w * 0.5 - 30}" y="${h * 0.72 + 6}" width="${60}" height="${6}" rx="3" fill="#B79B7A" opacity="0.5"/>`
}

/* ------------------------------------------------------------- slot mapping */

const slots = [
  { file: 'hero.svg', type: 'hero', w: 1920, h: 1080 },
  { file: 'story.svg', type: 'flatlay', w: 1200, h: 1500 },
  { file: 'story-secondary.svg', type: 'macro', w: 1200, h: 1500 },
  { file: 'philosophy-01.svg', type: 'jar', w: 1200, h: 1200 },
  { file: 'philosophy-02.svg', type: 'ampoule', w: 1200, h: 1200 },
  { file: 'philosophy-03.svg', type: 'dropper', w: 1200, h: 1200 },
  { file: 'experience.svg', type: 'dark', w: 1920, h: 1080 },
  { file: 'final-cta.svg', type: 'flatlay', w: 1920, h: 1080 },
  { file: 'gallery-01.svg', type: 'jar', w: 900, h: 1200 },
  { file: 'gallery-02.svg', type: 'dropper', w: 900, h: 1200 },
  { file: 'gallery-03.svg', type: 'ampoule', w: 900, h: 1200 },
  { file: 'gallery-04.svg', type: 'tube', w: 900, h: 1200 },
  { file: 'gallery-05.svg', type: 'macro', w: 900, h: 1200 },
  { file: 'gallery-06.svg', type: 'pump', w: 900, h: 1200 },
  { file: 'service-fillers.svg', type: 'syringe', w: 1200, h: 900 },
  { file: 'service-skin-renewal.svg', type: 'brush', w: 1200, h: 900 },
  { file: 'service-consultation.svg', type: 'consult', w: 1200, h: 900 },
  { file: 'service-creams.svg', type: 'jar', w: 1200, h: 900 },
  { file: 'product-hydrapeptide.svg', type: 'product', color: '#9FB8C4', w: 900, h: 1125 },
  { file: 'product-retinol.svg', type: 'product', color: '#2E3A4E', w: 900, h: 1125 },
  { file: 'product-vitac.svg', type: 'product', color: '#C9973B', w: 900, h: 1125 },
  { file: 'product-barrier-balm.svg', type: 'product', color: '#A8B5A0', w: 900, h: 1125 },
]

function render(slot, i) {
  const w = slot.w || 1200
  const h = slot.h || 1200
  let body = ''

  switch (slot.type) {
    case 'hero': {
      const s = Math.min(w, h) / 900
      body = `${bg(w, h, i)}${dropperBottle(w * 0.5, h * 0.8, s * 1.6, '#E9DCC8')}
      <circle cx="${w * 0.28}" cy="${h * 0.22}" r="${s * 40}" fill="#B79B7A" opacity="0.18"/>
      <circle cx="${w * 0.76}" cy="${h * 0.28}" r="${s * 26}" fill="#B79B7A" opacity="0.14"/>`
      break
    }
    case 'flatlay': body = `${bg(w, h, i)}${flatlay(w, h)}`; break
    case 'macro': body = macroSwirl(w, h); break
    case 'jar': body = `${bg(w, h, i)}${creamJar(w * 0.5, h * 0.72, Math.min(w, h) / 900 * 1.3)}`; break
    case 'ampoule': body = `${bg(w, h, i)}${ampouleSet(w * 0.5, h * 0.74, Math.min(w, h) / 900 * 1.2)}`; break
    case 'dropper': body = `${bg(w, h, i)}${dropperBottle(w * 0.5, h * 0.76, Math.min(w, h) / 900 * 1.3)}`; break
    case 'dark': body = darkGlow(w, h); break
    case 'tube': body = `${bg(w, h, i)}${tube(w * 0.5, h * 0.74, Math.min(w, h) / 900 * 1.2)}`; break
    case 'pump': body = `${bg(w, h, i)}${pumpBottle(w * 0.5, h * 0.76, Math.min(w, h) / 900 * 1.25)}`; break
    case 'syringe': body = `${bg(w, h, i)}${syringe(w * 0.5, h * 0.52, Math.min(w, h) / 900 * 1.4)}`; break
    case 'brush': {
      const s = Math.min(w, h) / 900
      body = `${bg(w, h, i)}${creamJar(w * 0.34, h * 0.78, s, '#DCCFBD')}
      <g transform="rotate(32 ${w * 0.62} ${h * 0.62})">
        <rect x="${w * 0.60}" y="${h * 0.62}" width="${s * 150}" height="${s * 16}" rx="${s * 8}" fill="#1D1917"/>
        <rect x="${w * 0.60 + s * 150}" y="${h * 0.60}" width="${s * 40}" height="${s * 22}" rx="${s * 11}" fill="#B79B7A"/>
      </g>`
      break
    }
    case 'consult': {
      const s = Math.min(w, h) / 900
      body = `${bg(w, h, i)}
      <circle cx="${w * 0.5}" cy="${h * 0.5}" r="${s * 150}" fill="#FCFAF7" stroke="${ACCENT}" stroke-opacity="0.3"/>
      <circle cx="${w * 0.5}" cy="${h * 0.5}" r="${s * 150}" fill="none" stroke="${INK}" stroke-opacity="0.1"/>
      <line x1="${w * 0.5 - s * 150}" y1="${h * 0.5}" x2="${w * 0.5 + s * 150}" y2="${h * 0.5}" stroke="${INK}" stroke-opacity="0.1"/>
      <line x1="${w * 0.5}" y1="${h * 0.5 - s * 150}" x2="${w * 0.5}" y2="${h * 0.5 + s * 150}" stroke="${INK}" stroke-opacity="0.1"/>
      <circle cx="${w * 0.5}" cy="${h * 0.5}" r="${s * 30}" fill="${ACCENT}" opacity="0.5"/>
      <circle cx="${w * 0.5}" cy="${h * 0.5}" r="${s * 10}" fill="${INK}"/>`
      break
    }
    case 'product': {
      const s = Math.min(w, h) / 900
      body = `${bg(w, h, i)}${pumpBottle(w * 0.5, h * 0.78, s * 1.5, slot.color)}
      <rect x="${w * 0.5 - s * 90}" y="${h * 0.4}" width="${s * 180}" height="${s * 34}" rx="${s * 17}" fill="${slot.color}" opacity="0.25"/>`
      break
    }
    default: body = bg(w, h, i)
  }

  return wrap(w, h, body)
}

slots.forEach((slot, i) => {
  writeFileSync(join(outDir, slot.file), render(slot, i), 'utf8')
})

console.log(`Generated ${slots.length} bespoke SVG illustrations in ${outDir}`)
