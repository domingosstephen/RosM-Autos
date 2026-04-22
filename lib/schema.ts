/**
 * JSON-LD Structured Data — RosM Autos
 *
 * SOP §3.3  — All schema in JSON-LD format. Covers: Organization, WebSite,
 *             LocalBusiness (AutoDealer), BreadcrumbList, FAQPage, HowTo,
 *             Product/Car, ItemList, Service, Speakable.
 * SOP §7.3  — Speakable schema flags content for AI engine recitation (GEO).
 * SOP §8.3  — Voice & AEO: FAQPage and HowTo mandatory; Speakable deployed.
 * SOP §8.4  — Organization sameAs links for Knowledge Panel / entity building.
 */

import {
  SITE_NAME,
  SITE_URL,
  PHONE_NUMBER,
  EMAIL,
  SALES_EMAIL,
  ADDRESS,
  SOCIAL_LINKS,
} from './constants'
import type { Product, Automobile } from '@/types/product'
import type { FAQItem } from '@/types/faq'

// ---------------------------------------------------------------------------
// Organization — SOP §8.4 Knowledge Panel & entity building
// ---------------------------------------------------------------------------
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/icons/logo.svg`,
      width: 300,
      height: 80,
    },
    description:
      'International dealer of quality-inspected used automobiles, farm tractors, and electric bikes with complete export shipping service to Africa, South America, and Eastern Europe.',
    foundingDate: '2016',
    numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 5, maxValue: 20 },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: PHONE_NUMBER,
        contactType: 'sales',
        email: [EMAIL, SALES_EMAIL],
        availableLanguage: ['English', 'German', 'French'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '18:00',
        },
      },
      {
        '@type': 'ContactPoint',
        telephone: PHONE_NUMBER,
        contactType: 'customer support',
        contactOption: 'TollFree',
        availableLanguage: ['English'],
      },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Siemensstrasse 7',
      postalCode: '32312',
      addressLocality: 'Lübbecke',
      addressRegion: 'North Rhine-Westphalia',
      addressCountry: 'DE',
    },
    // sameAs — consistent entity signals across all platforms (SOP §8.4)
    sameAs: [
      ...Object.values(SOCIAL_LINKS),
      'https://www.google.com/maps/search/RosM+Autos+Lubbecke',
    ],
    areaServed: [
      { '@type': 'Continent', name: 'Africa' },
      { '@type': 'Continent', name: 'South America' },
      { '@type': 'Place', name: 'Eastern Europe' },
    ],
  }
}

// ---------------------------------------------------------------------------
// WebSite — SiteLinksSearchBox (SOP §3.3)
// ---------------------------------------------------------------------------
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description:
      'Browse quality-inspected used vehicles for international export. Toyota, Mercedes-Benz, Ford, Nissan, farm tractors and more — shipped from Germany to all countries in Africa, South America, and Eastern Europe.',
    inLanguage: 'en',
    publisher: { '@id': `${SITE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/inventory?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

// ---------------------------------------------------------------------------
// LocalBusiness (AutoDealer) — GeoCoordinates + openingHoursSpecification
// SOP §6.4 — local schema with GeoCoordinates and openingHoursSpecification
// ---------------------------------------------------------------------------
export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['AutoDealer', 'LocalBusiness'],
    '@id': `${SITE_URL}/#localbusiness`,
    name: SITE_NAME,
    url: SITE_URL,
    telephone: PHONE_NUMBER,
    email: [EMAIL, SALES_EMAIL],
    image: `${SITE_URL}/opengraph-image`,
    logo: `${SITE_URL}/icons/logo.svg`,
    description:
      'RosM Autos is a Germany-based international dealer of quality-inspected used cars, farm tractors, and electric bikes. We export to Africa, South America, and Eastern Europe with full shipping and customs service.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Siemensstrasse 7',
      postalCode: '32312',
      addressLocality: 'Lübbecke',
      addressRegion: 'North Rhine-Westphalia',
      addressCountry: 'DE',
    },
    // GeoCoordinates — SOP §6.4
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 52.3092,
      longitude: 8.6236,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '09:00',
        closes: '15:00',
      },
    ],
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Bank Transfer, Wire Transfer',
    areaServed: [
      'Nigeria', 'Ghana', 'Kenya', 'Tanzania', 'Uganda', 'South Africa',
      'Cameroon', 'DR Congo', 'Mozambique', 'Ethiopia',
      'Brazil', 'Colombia', 'Peru', 'Chile', 'Paraguay', 'Bolivia',
      'Poland', 'Romania', 'Ukraine', 'Georgia', 'Bulgaria', 'Czech Republic',
    ],
    hasMap: 'https://www.google.com/maps/search/RosM+Autos+Siemensstrasse+7+Lubbecke+Germany',
    sameAs: Object.values(SOCIAL_LINKS),
  }
}

// ---------------------------------------------------------------------------
// Product / Car schema — SOP §3.3 — includes actual image URLs
// ---------------------------------------------------------------------------
export function productSchema(product: Product) {
  const primaryImage = product.images?.[0] ?? product.image
  const allImages = product.images ?? (product.image ? [product.image] : [])

  const mileageStr = product.category === 'automobile' ? ` Mileage: ${(product as Automobile).mileage} km.` : ''
  const fallbackDescription = `${product.name} — quality-inspected used ${product.category === 'automobile' ? 'vehicle' : product.category} for international export from Germany. Year: ${product.year}.${mileageStr} Available for shipping to Africa, South America, and Eastern Europe.`

  const base = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description || fallbackDescription,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    image: primaryImage
      ? allImages.map((img) => `${SITE_URL}${img}`)
      : `${SITE_URL}/opengraph-image`,
    url: `${SITE_URL}/inventory/${product.slug}`,
    sku: product.id,
    condition: 'https://schema.org/UsedCondition',
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/UsedCondition',
      url: `${SITE_URL}/inventory/${product.slug}`,
      seller: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: 0,
          currency: 'EUR',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: ['NG', 'GH', 'KE', 'TZ', 'ZA', 'BR', 'CO', 'PL', 'RO', 'UA'],
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 3,
            unitCode: 'd',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 14,
            maxValue: 42,
            unitCode: 'd',
          },
        },
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'DE',
        returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
        merchantReturnDays: 0,
        returnMethod: 'https://schema.org/ReturnByMail',
        description: 'All sales of used vehicles for export are final. Vehicles are sold as-inspected with full condition reports provided before purchase.',
      },
    },
  }

  if (product.category === 'automobile') {
    return {
      ...base,
      '@type': 'Car',
      vehicleModelDate: String(product.year),
      mileageFromOdometer: {
        '@type': 'QuantitativeValue',
        value: product.mileage,
        unitCode: 'KMT',
      },
      fuelType: product.fuelType,
      vehicleTransmission: product.transmission,
      vehicleEngine: {
        '@type': 'EngineSpecification',
        name: product.engineSize,
      },
      vehicleConfiguration: product.bodyType,
    }
  }

  return base
}

// ---------------------------------------------------------------------------
// ItemList — brand or category inventory page (SOP §3.3)
// ---------------------------------------------------------------------------
export function productListSchema(products: Product[], listName = 'Vehicle Inventory') {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    description: `${listName} — quality-inspected used vehicles for international export from RosM Autos.`,
    numberOfItems: products.length,
    url: SITE_URL,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': product.category === 'automobile' ? 'Car' : 'Product',
        name: product.name,
        description: product.description || `${product.name} — quality-inspected used ${product.category === 'automobile' ? 'vehicle' : product.category} for export from Germany.`,
        url: `${SITE_URL}/inventory/${product.slug}`,
        image: product.images?.[0]
          ? `${SITE_URL}${product.images[0]}`
          : `${SITE_URL}/opengraph-image`,
        offers: {
          '@type': 'Offer',
          price: product.price,
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/UsedCondition',
          url: `${SITE_URL}/inventory/${product.slug}`,
          shippingDetails: {
            '@type': 'OfferShippingDetails',
            shippingRate: {
              '@type': 'MonetaryAmount',
              value: 0,
              currency: 'EUR',
            },
            shippingDestination: {
              '@type': 'DefinedRegion',
              addressCountry: ['NG', 'GH', 'KE', 'TZ', 'ZA', 'BR', 'CO', 'PL', 'RO', 'UA'],
            },
          },
          hasMerchantReturnPolicy: {
            '@type': 'MerchantReturnPolicy',
            applicableCountry: 'DE',
            returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
          },
        },
        brand: { '@type': 'Brand', name: product.brand },
      },
    })),
  }
}

// ---------------------------------------------------------------------------
// FAQPage — SOP §3.3 & §8.1 (AEO mandatory on FAQ sections)
// ---------------------------------------------------------------------------
export function faqSchema(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

// ---------------------------------------------------------------------------
// HowTo — SOP §3.3 & §8.1 (AEO mandatory on instructional content)
// ---------------------------------------------------------------------------
export function howToSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Buy a Used Vehicle for International Export from Germany',
    description:
      'A step-by-step guide to purchasing and importing a quality-inspected used car, tractor, or electric bike from RosM Autos in Germany. Covers browsing, quoting, payment, shipping, and port delivery.',
    totalTime: 'P7D',
    estimatedCost: { '@type': 'MonetaryAmount', currency: 'EUR', minValue: 3000 },
    supply: [
      { '@type': 'HowToSupply', name: 'Export documentation' },
      { '@type': 'HowToSupply', name: 'Marine cargo insurance' },
      { '@type': 'HowToSupply', name: 'Bill of lading' },
    ],
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Browse Our Inventory by Brand',
        text: 'Explore our online catalog of quality-inspected used automobiles (Toyota, Mercedes-Benz, Ford, Nissan, Isuzu), farm tractors, and electric bikes. Filter by brand to find exactly what you need.',
        url: `${SITE_URL}/inventory`,
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Get a Transparent All-In Quote',
        text: 'Tell us your destination country and port. We calculate vehicle price, shipping, export documentation, and insurance — all in one itemised quote with zero hidden fees.',
        url: `${SITE_URL}/contact`,
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Review Photos and Condition Report',
        text: 'We provide a full photo set and condition summary covering engine, transmission, body, electronics, and interior before you commit to purchase.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Complete Secure Payment',
        text: 'Pay via bank or wire transfer with full transaction protection. Payment is confirmed before shipping is arranged.',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'We Handle Export Shipping',
        text: 'Our logistics team manages RoRo or container shipping, export paperwork, customs clearance, and marine insurance for your destination port in Africa, South America, and Eastern Europe.',
        url: `${SITE_URL}/shipping`,
      },
      {
        '@type': 'HowToStep',
        position: 6,
        name: 'Receive Your Vehicle at Port',
        text: 'Your vehicle arrives at your nearest port fully documented. We provide tracking throughout and assist with local import procedures.',
      },
    ],
  }
}

// ---------------------------------------------------------------------------
// BreadcrumbList — SOP §3.2 (breadcrumbs with schema on all pages)
// ---------------------------------------------------------------------------
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

// ---------------------------------------------------------------------------
// Service — shipping & export service schema
// ---------------------------------------------------------------------------
export function serviceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'International Vehicle Export & Shipping from Germany',
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    description:
      'Complete vehicle export service from Germany including vehicle inspection, purchase support, RoRo and container shipping, customs documentation, and port-to-port delivery to Africa, South America, and Eastern Europe.',
    areaServed: [
      { '@type': 'Continent', name: 'Africa' },
      { '@type': 'Continent', name: 'South America' },
      { '@type': 'Place', name: 'Eastern Europe' },
    ],
    serviceType: 'Vehicle Export and International Shipping',
    offers: {
      '@type': 'Offer',
      description: 'All-inclusive vehicle export quote: vehicle price, shipping, insurance, and documentation.',
    },
  }
}

// ---------------------------------------------------------------------------
// Speakable — SOP §7.3 GEO: flag content suitable for AI engine recitation
// (Deployed on pages with direct-answer content: homepage, FAQ, how-it-works)
// ---------------------------------------------------------------------------
export function speakableSchema(cssSelectors: string[] = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: cssSelectors.length > 0
        ? cssSelectors
        : ['h1', '[data-speakable]'],
    },
    url: SITE_URL,
  }
}

// ---------------------------------------------------------------------------
// WebPage — for AEO: general WebPage schema with speakable pointer
// ---------------------------------------------------------------------------
export function webPageSchema({
  name,
  description,
  url,
  breadcrumb,
}: {
  name: string
  description: string
  url: string
  breadcrumb?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    name,
    description,
    url,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
    ...(breadcrumb ? { breadcrumb } : {}),
    inLanguage: 'en',
    potentialAction: {
      '@type': 'ReadAction',
      target: [url],
    },
  }
}
