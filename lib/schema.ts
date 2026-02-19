import {
  SITE_NAME,
  SITE_URL,
  PHONE_NUMBER,
  EMAIL,
  ADDRESS,
  SOCIAL_LINKS,
} from './constants'
import type { Product } from '@/types/product'
import type { FAQItem } from '@/types/faq'

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icons/logo.svg`,
    description:
      'International dealer of quality-inspected used automobiles, farm tractors, and electric bikes with complete export shipping service.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: PHONE_NUMBER,
      contactType: 'sales',
      email: EMAIL,
      availableLanguage: ['English'],
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Siemensstrasse 7',
      postalCode: '32312',
      addressLocality: 'Lübbecke',
      addressCountry: 'DE',
    },
    sameAs: Object.values(SOCIAL_LINKS),
    areaServed: [
      { '@type': 'Continent', name: 'Africa' },
      { '@type': 'Continent', name: 'South America' },
      { '@type': 'Place', name: 'Eastern Europe' },
    ],
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
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

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    name: SITE_NAME,
    url: SITE_URL,
    telephone: PHONE_NUMBER,
    email: EMAIL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Siemensstrasse 7',
      postalCode: '32312',
      addressLocality: 'Lübbecke',
      addressCountry: 'DE',
    },
    openingHours: 'Mo-Fr 08:00-18:00, Sa 09:00-15:00',
    priceRange: '$$',
    areaServed: [
      'Nigeria',
      'Ghana',
      'Kenya',
      'Tanzania',
      'South Africa',
      'Brazil',
      'Colombia',
      'Peru',
      'Poland',
      'Romania',
      'Ukraine',
    ],
  }
}

export function productSchema(product: Product) {
  const base = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: SITE_NAME,
      },
    },
    itemCondition: 'https://schema.org/UsedCondition',
    image: `${SITE_URL}/images/placeholder.jpg`,
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
    }
  }

  return base
}

export function productListSchema(products: Product[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Vehicle Inventory',
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.name,
        url: `${SITE_URL}/inventory/${product.slug}`,
        offers: {
          '@type': 'Offer',
          price: product.price,
          priceCurrency: 'USD',
        },
      },
    })),
  }
}

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

export function howToSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Buy a Used Vehicle for International Export',
    description:
      'A step-by-step guide to purchasing and importing a quality used vehicle, tractor, or electric bike from RosM Autos.',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Browse Our Inventory',
        text: 'Explore our online catalog of quality-inspected automobiles, farm tractors, and electric bikes. Use filters to find exactly what you need.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Select Your Vehicle',
        text: 'Choose the vehicle or equipment that fits your needs and request a detailed quote including shipping to your destination.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Review Inspection Report',
        text: 'Receive a comprehensive inspection report with detailed photos and condition assessment before committing to purchase.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Complete Secure Payment',
        text: 'Pay securely through our verified payment channels with full transaction protection and confirmation.',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'We Handle Shipping',
        text: 'Our logistics team manages port-to-port shipping, export documentation, and customs clearance for your destination country.',
      },
      {
        '@type': 'HowToStep',
        position: 6,
        name: 'Receive Your Vehicle',
        text: 'Your vehicle arrives at your nearest port. We provide tracking throughout and assist with local import procedures.',
      },
    ],
  }
}

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

export function serviceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'International Vehicle Export & Shipping',
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
    description:
      'Complete vehicle export service including inspection, purchase, shipping, customs documentation, and port-to-port delivery to Africa, South America, and Eastern Europe.',
    areaServed: [
      { '@type': 'Continent', name: 'Africa' },
      { '@type': 'Continent', name: 'South America' },
      { '@type': 'Place', name: 'Eastern Europe' },
    ],
    serviceType: 'Vehicle Export and Shipping',
  }
}
