// ============================================================================
// Image sources — centralized so they can be swapped easily.
// ----------------------------------------------------------------------------
// Theme: dermocosmetics & aesthetic treatments (creams, serums, bottles,
// ampoules, clinical skincare).
//
// All images live in /public/images as elegant SVG placeholders.
// To go live, replace each placeholder with your real photo (jpg/webp) and
// update the file extension below (e.g. 'images/hero.svg' -> 'images/hero.jpg').
// See /public/images/README.md for the full list.
// ============================================================================

// Relative paths work both at the domain root and in a subfolder.
const img = (name) => `images/${name}`

export const images = {
  hero: img('hero.svg'),
  heroAlt: img('hero.svg'),
  story: img('story.svg'),
  storySecondary: img('story-secondary.svg'),
  philosophy: [
    img('philosophy-01.svg'),
    img('philosophy-02.svg'),
    img('philosophy-03.svg'),
  ],
  ritual: img('experience.svg'),
  experience: img('experience.svg'),
  finalCta: img('final-cta.svg'),
  gallery: [
    img('gallery-01.svg'),
    img('gallery-02.svg'),
    img('gallery-03.svg'),
    img('gallery-04.svg'),
    img('gallery-05.svg'),
    img('gallery-06.svg'),
  ],
}

export default images
