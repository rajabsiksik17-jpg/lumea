// ============================================================================
// Image sources — centralized so they can be swapped easily.
// ----------------------------------------------------------------------------
// Development uses royalty-free Unsplash editorial images.
// For production, replace these URLs (or drop files in /public/images and
// reference them as '/images/...') to fully own your assets.
// ============================================================================

const u = (id, w = 1600, extra = '') =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80${extra}`

export const images = {
  hero: u('photo-1522335789203-aabd1fc54bc9', 1920),
  heroAlt: u('photo-1512496015851-a90fb38ba796', 1600),
  story: u('photo-1487412947147-5cebf100ffc2', 1400),
  storySecondary: u('photo-1526510747491-58f928ec870f', 1400),
  philosophy: [
    u('photo-1556228720-195a672e8a03', 1200),
    u('photo-1570172619644-dfd03ed5d881', 1200),
    u('photo-1612817288484-6f916006741a', 1200),
  ],
  ritual: u('photo-1542037104857-ffbb0b9155fb', 1800),
  experience: u('photo-1600334129128-685c5582fd35', 1920),
  finalCta: u('photo-1512496015851-a90fb38ba796', 1920),
  gallery: [
    u('photo-1596462502278-27bfdc403348', 900),
    u('photo-1522337660859-02fbefca4702', 900),
    u('photo-1571781926291-c477ebfd024b', 900),
    u('photo-1556228578-8c89e6adf883', 900),
    u('photo-1616394584738-fc6e612e71b9', 900),
    u('photo-1598440947619-2c35fc9aa908', 900),
  ],
}

export default images
