// ============================================================================
// LUMÉA — Central Site Configuration
// ----------------------------------------------------------------------------
// Edit everything about the company from this single file.
// Brand, contact details, social links, WhatsApp and SEO data all live here.
// ============================================================================

export const siteConfig = {
  // Brand
  name: 'LUMÉA',
  tagline: 'BEAUTY & CARE',
  brandMotto: 'Beauty, refined.',
  brandStatement: 'جمالٌ يُرى، عنايةٌ تُشعر بها.',

  // Contact (placeholders — replace with real data before launch)
  email: 'hello@lumea.com',
  phone: '+962 79 000 0000',
  phoneDisplay: '+962 XX XXX XXXX',
  location: 'Amman, Jordan',
  address: 'Amman, Jordan',

  // WhatsApp (placeholder number — replace with real number incl. country code)
  whatsapp: '962790000000',
  whatsappMessage:
    'مرحباً LUMÉA، أرغب بالاستفسار عن خدماتكم.',

  // Social links
  social: {
    instagram: 'https://instagram.com/lumea',
    facebook: 'https://facebook.com/lumea',
    tiktok: 'https://tiktok.com/@lumea',
  },

  // SEO / meta
  seo: {
    title: 'LUMÉA — Beauty, Refined',
    description:
      'Discover LUMÉA, a modern beauty experience built around thoughtful care, premium products and timeless beauty.',
    url: 'https://lumea.com/',
    canonical: 'https://lumea.com/',
    ogImage: '/og-image.jpg',
  },

  // Form service (leave null to use mailto fallback).
  // To connect a real service later, set e.g.:
  //   formEndpoint: 'https://formspree.io/f/YOUR_FORM_ID'
  // and the Contact form will POST to it automatically.
  formEndpoint: null,
}

export default siteConfig
