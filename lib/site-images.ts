/**
 * Site-wide decorative images from "In site cars" — one image per section, no repeats.
 * Tractor hero used on tractor category, contact, FAQ, shipping, how-it-works.
 */

/** Tractor image for hero on contact, FAQ, shipping, how-it-works, and inventory (tractor category) */
export const TRACTOR_HERO = '/images/inventory/massey-ferguson-385-tractor-2025/1.jpeg'

export const SITE_IMAGES = {
  hero: '/images/site/hero.webp',
  about: '/images/site/about.webp',
  howItWorks: TRACTOR_HERO,
  shipping: TRACTOR_HERO,
  contact: TRACTOR_HERO,
  faq: TRACTOR_HERO,
  inventory: '/images/site/inventory.webp',
  tractorInventory: TRACTOR_HERO,
  valueProp: '/images/site/value-prop.webp',
} as const
