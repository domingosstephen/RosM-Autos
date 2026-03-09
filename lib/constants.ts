export const SITE_NAME = 'RosM Autos'
export const SITE_URL = 'https://rosmautos.com'
export const SITE_DESCRIPTION =
  'Quality-inspected used automobiles, farm tractors, and electric bikes for export to Africa, South America, and Eastern Europe. Complete shipping and customs service.'

export const WHATSAPP_NUMBER = '+4917642428612'
export const PHONE_NUMBER = '+4917642428612'
export const EMAIL = 'info@rosmautos.com'
export const ADDRESS = 'Siemensstrasse 7, 32312 Lübbecke, Germany'

export const BUSINESS_HOURS = 'Monday - Friday: 8:00 AM - 6:00 PM | Saturday: 9:00 AM - 3:00 PM'

export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/rosmautos',
  instagram: 'https://instagram.com/rosmautos',
  twitter: 'https://twitter.com/rosmautos',
  youtube: 'https://youtube.com/@rosmautos',
}

export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, '')}?text=${encodeURIComponent(
  "Hi, I'm interested in purchasing a vehicle from RosM Autos. Can you help me?"
)}`

export const PRIORITY_COUNTRIES = [
  'Nigeria',
  'Ghana',
  'Kenya',
  'Tanzania',
  'South Africa',
  'Uganda',
  'Cameroon',
  'Mozambique',
  'DR Congo',
  'Brazil',
  'Colombia',
  'Peru',
  'Chile',
  'Paraguay',
  'Bolivia',
  'Poland',
  'Romania',
  'Ukraine',
  'Georgia',
  'Bulgaria',
  'Czech Republic',
]

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Inventory', href: '/inventory', hasDropdown: true },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Shipping', href: '/shipping' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

/** Inventory nav dropdown — cars are by brand, tractors have their own page */
export const PRODUCT_CATEGORIES = [
  { value: 'all', label: 'Browse by brand', href: '/inventory' },
  { value: 'tractor', label: 'Farm Tractors', href: '/inventory/tractors' },
] as const

export const STATS = {
  responseTime: '24h',
  countriesServed: '45+',
  yearsInBusiness: '8+',
  satisfactionRate: '98%',
}
