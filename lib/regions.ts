import type { ShippingRegion } from '@/types/region'

export const shippingRegions: ShippingRegion[] = [
  {
    id: 'africa',
    name: 'Africa',
    description:
      'We ship to major ports across West, East, and Southern Africa. Our established routes and local partnerships ensure smooth delivery and customs clearance for automobiles, tractors, and electric bikes.',
    ports: [
      { name: 'Lagos (Tin Can Island)', country: 'Nigeria', transitTime: '18-25 days' },
      { name: 'Tema Port', country: 'Ghana', transitTime: '20-28 days' },
      { name: 'Mombasa Port', country: 'Kenya', transitTime: '25-35 days' },
      { name: 'Dar es Salaam Port', country: 'Tanzania', transitTime: '28-35 days' },
      { name: 'Durban Port', country: 'South Africa', transitTime: '22-30 days' },
      { name: 'Douala Port', country: 'Cameroon', transitTime: '20-28 days' },
      { name: 'Maputo Port', country: 'Mozambique', transitTime: '25-32 days' },
      { name: 'Matadi Port', country: 'DR Congo', transitTime: '30-40 days' },
    ],
    documents: [
      'Original Bill of Lading',
      'Commercial Invoice',
      'Vehicle Title / Certificate of Ownership',
      'Export Certificate',
      'Inspection Report (Pre-shipment)',
      'Packing List',
      'Insurance Certificate',
    ],
    costRange: '$1,200 - $3,500',
    notes:
      'Most African countries accept vehicles up to 8-15 years old depending on regulations. Nigeria requires vehicles under 15 years. Kenya accepts up to 8 years old. We advise on age restrictions per destination before purchase.',
  },
  {
    id: 'south-america',
    name: 'South America',
    description:
      'Our South American shipping routes cover major ports in Brazil, Colombia, Peru, Chile, and neighboring countries. We handle all export documentation and coordinate with local customs brokers.',
    ports: [
      { name: 'Santos Port', country: 'Brazil', transitTime: '15-22 days' },
      { name: 'Buenaventura Port', country: 'Colombia', transitTime: '12-18 days' },
      { name: 'Callao Port', country: 'Peru', transitTime: '18-25 days' },
      { name: 'Valparaiso Port', country: 'Chile', transitTime: '20-28 days' },
      { name: 'Asuncion (via Paranagua)', country: 'Paraguay', transitTime: '22-30 days' },
      { name: 'Arica Port', country: 'Bolivia (via Chile)', transitTime: '22-30 days' },
    ],
    documents: [
      'Original Bill of Lading',
      'Commercial Invoice (notarized)',
      'Vehicle Title / Certificate of Ownership',
      'Export Certificate',
      'Emissions Compliance Certificate',
      'Packing List',
      'Insurance Certificate',
    ],
    costRange: '$1,000 - $3,000',
    notes:
      'Brazil has specific emission and safety standards for imported vehicles. Colombia and Peru are more flexible with used vehicle imports. We provide country-specific compliance guidance and connect you with trusted local brokers.',
  },
  {
    id: 'eastern-europe',
    name: 'Eastern Europe',
    description:
      'We serve Eastern European markets through major Black Sea and Baltic ports. Our experience with EU and non-EU import regulations ensures compliant delivery to your destination.',
    ports: [
      { name: 'Gdansk Port', country: 'Poland', transitTime: '10-16 days' },
      { name: 'Constanta Port', country: 'Romania', transitTime: '12-18 days' },
      { name: 'Odessa Port', country: 'Ukraine', transitTime: '14-20 days' },
      { name: 'Poti Port', country: 'Georgia', transitTime: '16-22 days' },
      { name: 'Varna Port', country: 'Bulgaria', transitTime: '12-18 days' },
      { name: 'Koper Port', country: 'Slovenia', transitTime: '10-15 days' },
    ],
    documents: [
      'Original Bill of Lading',
      'Commercial Invoice',
      'Vehicle Title / Certificate of Ownership',
      'Export Certificate',
      'EUR.1 Certificate (if applicable)',
      'Certificate of Conformity (EU countries)',
      'Insurance Certificate',
    ],
    costRange: '$800 - $2,500',
    notes:
      'EU member states require Euro emission standards compliance. Non-EU countries like Georgia and Ukraine have more flexible import policies. We advise on homologation requirements and connect you with local certification services.',
  },
]
