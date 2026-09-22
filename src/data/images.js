// ============================================================================
// Image sources — centralized so they can be swapped easily.
// ----------------------------------------------------------------------------
// Theme: dermocosmetics & aesthetic treatments (creams, serums, bottles,
// ampoules, clinical skincare). Development uses royalty-free Unsplash images.
// For production, replace these URLs (or drop files in /public/images and
// reference them as '/images/...') to fully own your assets.
// ============================================================================

const u = (id, w = 1600, extra = '') =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80${extra}`

export const images = {
  // Premium skincare product / treatment editorial
  hero: u('photo-1612817288484-6f916006741a', 1920),
  heroAlt: u('photo-1512496015851-a90fb38ba796', 1600),

  // Story — cosmetic products & formulas
  story: u('photo-1571781926291-c477ebfd024b', 1400),
  storySecondary: u('photo-1598440947619-2c35fc9aa908', 1400),

  // Philosophy — creams / serums / application
  philosophy: [
    u('photo-1556228720-195a672e8a03', 1200),
    u('photo-1620916566398-39f1143ab7be', 1200),
    u('photo-1612817288484-6f916006741a', 1200),
  ],

  // Ritual / treatment
  ritual: u('photo-1542037104857-ffbb0b9155fb', 1800),

  // Dark immersive scene — facial treatment
  experience: u('photo-1542037104857-ffbb0b9155fb', 1920),

  // Final CTA — cosmetic products flatlay
  finalCta: u('photo-1556228578-8c89e6adf883', 1920),

  // Gallery — cosmetic materials in detail
  gallery: [
    u('photo-1608248543803-ba4f8c70ae0b', 900),
    u('photo-1571781926291-c477ebfd024b', 900),
    u('photo-1556228578-8c89e6adf883', 900),
    u('photo-1598440947619-2c35fc9aa908', 900),
    u('photo-1620916566398-39f1143ab7be', 900),
    u('photo-1556228720-195a672e8a03', 900),
  ],
}

export default images
