/**
 * Site-wide decorative images from "In site cars" — one image per section, no repeats.
 * Tractor hero used on tractor category, contact, FAQ, shipping, how-it-works.
 */

/** Tractor for inventory when category = tractor */
export const TRACTOR_HERO = '/images/inventory/massey-ferguson-385-tractor-2025/1.jpeg'

export const SITE_IMAGES = {
  hero: '/images/site/hero.webp',
  about: '/images/site/about.webp',
  howItWorks: '/images/site/how-it-works-shipping.webp',
  shipping: '/images/site/how-it-works-shipping.webp',
  faq: '/images/site/faq.webp',
  inventory: '/images/site/inventory.webp',
  tractorInventory: TRACTOR_HERO,
  valueProp: '/images/site/value-prop.webp',
} as const
