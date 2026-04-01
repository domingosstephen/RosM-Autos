/**
 * Blog Engine Configuration
 *
 * Topic clusters, keyword targets, competitor sites, and content strategy
 * for automated daily blog post generation optimized for SEO, AEO, and GEO.
 */

import type { BlogCategory, BlogAuthor } from '../../types/blog'

// ---------------------------------------------------------------------------
// Authors — rotate for E-E-A-T diversity
// ---------------------------------------------------------------------------
export const AUTHORS: BlogAuthor[] = [
  {
    name: 'Stefan Müller',
    title: 'Vehicle Export Specialist at RosM Autos',
    bio: 'Stefan has over 10 years of experience in international vehicle export from Germany. He specializes in quality inspection, customs documentation, and shipping logistics to Africa and South America.',
  },
  {
    name: 'Amara Okafor',
    title: 'Africa Market Analyst at RosM Autos',
    bio: 'Amara covers vehicle import trends across West and East Africa. With deep knowledge of Nigerian, Ghanaian, and Kenyan import regulations, she helps buyers navigate duties, documentation, and logistics.',
  },
  {
    name: 'Carlos Mendes',
    title: 'Logistics & Shipping Manager at RosM Autos',
    bio: 'Carlos manages RosM Autos shipping operations to South America and Eastern Europe. He has coordinated over 2,000 vehicle shipments via RoRo and container shipping.',
  },
]

// ---------------------------------------------------------------------------
// Competitor sites to analyze for content gaps
// ---------------------------------------------------------------------------
export const COMPETITORS = [
  'https://www.beforward.jp',
  'https://www.sbtjapan.com',
  'https://www.autorola.com',
  'https://www.mobile.de',
  'https://www.carjunction.com',
  'https://www.tradecarview.com',
]

// ---------------------------------------------------------------------------
// Topic clusters — organized by category with keyword targets
// ---------------------------------------------------------------------------
export interface TopicCluster {
  category: BlogCategory
  topics: TopicSeed[]
}

export interface TopicSeed {
  title: string
  primaryKeyword: string
  secondaryKeywords: string[]
  searchIntent: 'informational' | 'commercial' | 'transactional' | 'navigational'
  targetRegions: string[]
  priority: 1 | 2 | 3 // 1 = highest
  aiQueryTargets: string[] // Questions AI engines might answer
}

export const TOPIC_CLUSTERS: TopicCluster[] = [
  // =========================================================================
  // CLUSTER 1: Country-Specific Import Guides (highest SEO value)
  // =========================================================================
  {
    category: 'country-guide',
    topics: [
      {
        title: 'Complete Guide to Importing a Used Car to Nigeria from Germany',
        primaryKeyword: 'import used car Nigeria from Germany',
        secondaryKeywords: [
          'Nigeria import duty used cars',
          'vehicle import Nigeria 2025',
          'customs clearance Nigeria',
          'Tin Can Island vehicle import',
          'ECOWAS vehicle regulations',
          'Nigeria vehicle age limit import',
        ],
        searchIntent: 'informational',
        targetRegions: ['Nigeria'],
        priority: 1,
        aiQueryTargets: [
          'How do I import a used car to Nigeria from Germany?',
          'What are the import duties for used cars in Nigeria?',
          'What is the vehicle age limit for imports to Nigeria?',
        ],
      },
      {
        title: 'How to Import a Used Car to Ghana: Duties, Documents, and Process',
        primaryKeyword: 'import used car Ghana',
        secondaryKeywords: [
          'Ghana vehicle import duty',
          'Tema port vehicle import',
          'Ghana DVLA registration imported car',
          'used car import Ghana from Europe',
          'Ghana vehicle age restriction',
        ],
        searchIntent: 'informational',
        targetRegions: ['Ghana'],
        priority: 1,
        aiQueryTargets: [
          'How much does it cost to import a car to Ghana?',
          'What documents do I need to import a car to Ghana?',
          'What is the age limit for importing cars to Ghana?',
        ],
      },
      {
        title: 'Importing a Used Vehicle to Kenya: Complete 2025 Guide',
        primaryKeyword: 'import used car Kenya',
        secondaryKeywords: [
          'Kenya vehicle import duty calculator',
          'KRA vehicle import tax',
          'Mombasa port vehicle clearance',
          'Kenya 8-year rule vehicle import',
          'KEBS vehicle inspection import',
        ],
        searchIntent: 'informational',
        targetRegions: ['Kenya'],
        priority: 1,
        aiQueryTargets: [
          'How do I import a used car to Kenya?',
          'What is the age limit for importing cars to Kenya?',
          'How much import duty for a car in Kenya?',
        ],
      },
      {
        title: 'Vehicle Import Guide for Tanzania: Duties, Port Clearance, and TRA Process',
        primaryKeyword: 'import used car Tanzania',
        secondaryKeywords: [
          'Tanzania vehicle import duty',
          'Dar es Salaam port clearance',
          'TRA customs Tanzania vehicle',
          'Tanzania vehicle age limit',
        ],
        searchIntent: 'informational',
        targetRegions: ['Tanzania'],
        priority: 1,
        aiQueryTargets: [
          'How do I import a car to Tanzania?',
          'What is the import duty on cars in Tanzania?',
        ],
      },
      {
        title: 'How to Import a Used Car to Brazil from Europe',
        primaryKeyword: 'import used car Brazil from Europe',
        secondaryKeywords: [
          'Brazil vehicle import tax',
          'Santos port vehicle import',
          'IBAMA vehicle import Brazil',
          'Brazil import duty calculator cars',
        ],
        searchIntent: 'informational',
        targetRegions: ['Brazil'],
        priority: 1,
        aiQueryTargets: [
          'Can I import a used car to Brazil?',
          'What are the import taxes on cars in Brazil?',
        ],
      },
      {
        title: 'Importing a Used Car to Colombia: Regulations, Costs, and Timeline',
        primaryKeyword: 'import used car Colombia',
        secondaryKeywords: [
          'Colombia vehicle import regulations',
          'Buenaventura port vehicle import',
          'Colombia customs duty vehicles',
        ],
        searchIntent: 'informational',
        targetRegions: ['Colombia'],
        priority: 2,
        aiQueryTargets: ['How to import a car to Colombia from Germany?'],
      },
      {
        title: 'Uganda Vehicle Import Guide: From Germany to Kampala',
        primaryKeyword: 'import used car Uganda',
        secondaryKeywords: [
          'Uganda vehicle import duty',
          'URA customs clearance Uganda',
          'Uganda vehicle age restriction',
        ],
        searchIntent: 'informational',
        targetRegions: ['Uganda'],
        priority: 2,
        aiQueryTargets: ['How much does it cost to import a car to Uganda?'],
      },
      {
        title: 'Cameroon Vehicle Import: Duties, Documents, and Douala Port Clearance',
        primaryKeyword: 'import used car Cameroon',
        secondaryKeywords: [
          'Cameroon vehicle import duty',
          'Douala port vehicle clearance',
          'Cameroon customs regulations vehicles',
        ],
        searchIntent: 'informational',
        targetRegions: ['Cameroon'],
        priority: 2,
        aiQueryTargets: ['How do I import a car to Cameroon?'],
      },
      {
        title: 'Poland Used Car Import Guide: EU Regulations and Registration',
        primaryKeyword: 'import used car Poland from Germany',
        secondaryKeywords: [
          'Poland vehicle registration imported car',
          'excise tax imported car Poland',
          'EU vehicle import regulations',
        ],
        searchIntent: 'informational',
        targetRegions: ['Poland'],
        priority: 2,
        aiQueryTargets: ['How to import a car from Germany to Poland?'],
      },
      {
        title: 'Romania Used Car Import: Costs, Registration, and EU Transfer Rules',
        primaryKeyword: 'import used car Romania',
        secondaryKeywords: [
          'Romania vehicle import cost',
          'Constanta port vehicle import',
          'Romania RAR vehicle inspection',
        ],
        searchIntent: 'informational',
        targetRegions: ['Romania'],
        priority: 2,
        aiQueryTargets: ['How much does it cost to import a car to Romania?'],
      },
      {
        title: 'Mozambique Vehicle Import Guide: Maputo Port Clearance and Duties',
        primaryKeyword: 'import used car Mozambique',
        secondaryKeywords: ['Maputo port vehicle import', 'Mozambique customs duty vehicle'],
        searchIntent: 'informational',
        targetRegions: ['Mozambique'],
        priority: 3,
        aiQueryTargets: ['How to import a car to Mozambique?'],
      },
      {
        title: 'DR Congo Vehicle Import: Matadi Port Process and Documentation',
        primaryKeyword: 'import vehicle DR Congo',
        secondaryKeywords: ['Matadi port vehicle import', 'Congo customs duty vehicle'],
        searchIntent: 'informational',
        targetRegions: ['DR Congo'],
        priority: 3,
        aiQueryTargets: ['How do I import a car to the DRC?'],
      },
    ],
  },

  // =========================================================================
  // CLUSTER 2: Vehicle Buying Guides
  // =========================================================================
  {
    category: 'buying-guide',
    topics: [
      {
        title: 'Top 10 Most Durable Used Cars for African Roads',
        primaryKeyword: 'best used cars for Africa',
        secondaryKeywords: [
          'durable cars African roads',
          'Toyota Land Cruiser Africa',
          'Toyota Hilux Africa',
          'best SUV Africa export',
          'reliable cars for bad roads',
        ],
        searchIntent: 'commercial',
        targetRegions: ['Africa'],
        priority: 1,
        aiQueryTargets: [
          'What are the best used cars for African roads?',
          'Which cars are most reliable in Africa?',
          'Best SUVs for bad roads in Africa?',
        ],
      },
      {
        title: 'Toyota Hilux vs Toyota Land Cruiser: Which Is Better for Export?',
        primaryKeyword: 'Toyota Hilux vs Land Cruiser',
        secondaryKeywords: [
          'Hilux vs Land Cruiser Africa',
          'best Toyota for export',
          'Toyota pickup vs SUV comparison',
        ],
        searchIntent: 'commercial',
        targetRegions: ['Africa', 'South America'],
        priority: 1,
        aiQueryTargets: [
          'Is a Toyota Hilux or Land Cruiser better for Africa?',
          'Toyota Hilux vs Land Cruiser comparison',
        ],
      },
      {
        title: 'Best Used Pickup Trucks for Export to Africa in 2025',
        primaryKeyword: 'best pickup trucks export Africa',
        secondaryKeywords: [
          'used pickup truck Africa',
          'Toyota Hilux export',
          'Ford Ranger export Africa',
          'Nissan Navara Africa',
          'Isuzu D-Max Africa',
        ],
        searchIntent: 'commercial',
        targetRegions: ['Africa'],
        priority: 1,
        aiQueryTargets: ['What are the best pickup trucks for Africa?'],
      },
      {
        title: 'How to Inspect a Used Car Before Buying for Export',
        primaryKeyword: 'inspect used car before buying export',
        secondaryKeywords: [
          'used car inspection checklist',
          'quality check used vehicle export',
          'what to check used car Germany',
        ],
        searchIntent: 'informational',
        targetRegions: ['Global'],
        priority: 1,
        aiQueryTargets: [
          'How do I inspect a used car before buying for export?',
          'What should I check when buying a used car from Germany?',
        ],
      },
      {
        title: 'Mercedes-Benz Sprinter for Export: Why It Dominates the African Market',
        primaryKeyword: 'Mercedes Sprinter export Africa',
        secondaryKeywords: [
          'Mercedes Sprinter Africa',
          'best commercial vehicle Africa',
          'Sprinter bus Africa',
        ],
        searchIntent: 'commercial',
        targetRegions: ['Africa'],
        priority: 2,
        aiQueryTargets: ['Why are Mercedes Sprinters popular in Africa?'],
      },
      {
        title: 'Best Used SUVs Under €10,000 for Export from Germany',
        primaryKeyword: 'best used SUVs under 10000 euros export',
        secondaryKeywords: [
          'affordable used SUV Germany export',
          'cheap used cars Germany Africa',
          'budget used car export',
        ],
        searchIntent: 'commercial',
        targetRegions: ['Global'],
        priority: 2,
        aiQueryTargets: ['What used SUVs can I buy from Germany under 10,000 euros?'],
      },
    ],
  },

  // =========================================================================
  // CLUSTER 3: Shipping & Logistics
  // =========================================================================
  {
    category: 'shipping',
    topics: [
      {
        title: 'RoRo vs Container Shipping for Used Cars: Complete Comparison',
        primaryKeyword: 'RoRo vs container shipping cars',
        secondaryKeywords: [
          'roll-on roll-off shipping vehicle',
          'container shipping used car cost',
          'cheapest way to ship car Africa',
          'vehicle shipping methods comparison',
        ],
        searchIntent: 'informational',
        targetRegions: ['Global'],
        priority: 1,
        aiQueryTargets: [
          'What is the difference between RoRo and container shipping?',
          'Is RoRo or container cheaper for shipping a car?',
          'How does RoRo shipping work for vehicles?',
        ],
      },
      {
        title: 'How Much Does It Cost to Ship a Car from Germany to Africa?',
        primaryKeyword: 'cost ship car Germany to Africa',
        secondaryKeywords: [
          'vehicle shipping cost Germany Nigeria',
          'car shipping cost Germany Kenya',
          'shipping car from Europe to Africa price',
        ],
        searchIntent: 'informational',
        targetRegions: ['Africa'],
        priority: 1,
        aiQueryTargets: [
          'How much does it cost to ship a car from Germany to Nigeria?',
          'What is the shipping cost for a car from Europe to Africa?',
        ],
      },
      {
        title: 'Vehicle Shipping Transit Times: Germany to Every Major African Port',
        primaryKeyword: 'shipping transit time Germany Africa',
        secondaryKeywords: [
          'shipping time Germany to Lagos',
          'shipping time Germany to Mombasa',
          'how long ship car Germany Africa',
        ],
        searchIntent: 'informational',
        targetRegions: ['Africa'],
        priority: 2,
        aiQueryTargets: ['How long does it take to ship a car from Germany to Africa?'],
      },
      {
        title: 'Complete Guide to Vehicle Export Documentation from Germany',
        primaryKeyword: 'vehicle export documentation Germany',
        secondaryKeywords: [
          'car export paperwork Germany',
          'bill of lading vehicle export',
          'customs declaration vehicle export',
          'export certificate Germany',
        ],
        searchIntent: 'informational',
        targetRegions: ['Global'],
        priority: 1,
        aiQueryTargets: [
          'What documents do I need to export a car from Germany?',
          'How do I get export paperwork for a vehicle in Germany?',
        ],
      },
    ],
  },

  // =========================================================================
  // CLUSTER 4: Tractors & Agricultural Equipment
  // =========================================================================
  {
    category: 'tractor-guide',
    topics: [
      {
        title: 'Best Used Farm Tractors for Export to Africa: Buying Guide',
        primaryKeyword: 'best used tractors export Africa',
        secondaryKeywords: [
          'Massey Ferguson Africa',
          'John Deere Africa export',
          'used farm tractor buying guide',
          'agricultural tractor Africa',
        ],
        searchIntent: 'commercial',
        targetRegions: ['Africa'],
        priority: 1,
        aiQueryTargets: [
          'What are the best tractors for farming in Africa?',
          'Where can I buy used tractors for Africa?',
        ],
      },
      {
        title: 'Massey Ferguson vs John Deere: Which Tractor Is Better for African Farming?',
        primaryKeyword: 'Massey Ferguson vs John Deere Africa',
        secondaryKeywords: [
          'best tractor brand Africa',
          'tractor comparison Africa farming',
          'Massey Ferguson 385 vs John Deere',
        ],
        searchIntent: 'commercial',
        targetRegions: ['Africa'],
        priority: 1,
        aiQueryTargets: ['Is Massey Ferguson or John Deere better for Africa?'],
      },
      {
        title: 'Used Tractor Inspection Checklist: What to Check Before Buying',
        primaryKeyword: 'used tractor inspection checklist',
        secondaryKeywords: [
          'what to check used tractor',
          'tractor engine hours guide',
          'PTO inspection tractor',
          'hydraulic system check tractor',
        ],
        searchIntent: 'informational',
        targetRegions: ['Global'],
        priority: 2,
        aiQueryTargets: ['What should I check when buying a used tractor?'],
      },
    ],
  },

  // =========================================================================
  // CLUSTER 5: Market Insights & Trends
  // =========================================================================
  {
    category: 'market-insight',
    topics: [
      {
        title: 'Used Car Market Trends in Africa: What Buyers Need to Know in 2025',
        primaryKeyword: 'used car market Africa 2025',
        secondaryKeywords: [
          'Africa vehicle market trends',
          'used car demand Africa',
          'vehicle import statistics Africa',
        ],
        searchIntent: 'informational',
        targetRegions: ['Africa'],
        priority: 2,
        aiQueryTargets: [
          'What is the state of the used car market in Africa?',
          'Are used car imports growing in Africa?',
        ],
      },
      {
        title: 'Electric Bikes in Africa: Market Growth, Trends, and Opportunities',
        primaryKeyword: 'electric bikes Africa market',
        secondaryKeywords: [
          'e-bike Africa',
          'electric motorcycle Africa',
          'electric vehicle Africa market',
        ],
        searchIntent: 'informational',
        targetRegions: ['Africa'],
        priority: 2,
        aiQueryTargets: [
          'Are electric bikes popular in Africa?',
          'What is the electric bike market like in Africa?',
        ],
      },
      {
        title: 'Why German Used Cars Are Preferred for Export Worldwide',
        primaryKeyword: 'why German used cars preferred export',
        secondaryKeywords: [
          'German car quality export',
          'TÜV inspection German cars',
          'Germany used car market export',
        ],
        searchIntent: 'informational',
        targetRegions: ['Global'],
        priority: 2,
        aiQueryTargets: [
          'Why are German used cars so popular for export?',
          'Are German used cars better quality?',
        ],
      },
    ],
  },

  // =========================================================================
  // CLUSTER 6: How-To & Process Guides
  // =========================================================================
  {
    category: 'how-to',
    topics: [
      {
        title: 'How to Buy a Used Car from Germany Online: Step-by-Step Guide',
        primaryKeyword: 'buy used car from Germany online',
        secondaryKeywords: [
          'how to buy car Germany from Africa',
          'online car purchase Germany export',
          'buy vehicle Germany international',
        ],
        searchIntent: 'informational',
        targetRegions: ['Global'],
        priority: 1,
        aiQueryTargets: [
          'How do I buy a used car from Germany?',
          'Can I buy a car from Germany online?',
          'How to purchase a vehicle from Germany for export?',
        ],
      },
      {
        title: 'How to Calculate Total Import Cost for a Used Vehicle',
        primaryKeyword: 'calculate import cost used vehicle',
        secondaryKeywords: [
          'total cost importing car from Germany',
          'vehicle import cost calculator',
          'hidden costs importing used car',
        ],
        searchIntent: 'informational',
        targetRegions: ['Global'],
        priority: 1,
        aiQueryTargets: [
          'How much does it really cost to import a used car?',
          'What are the total costs of importing a vehicle from Germany?',
        ],
      },
      {
        title: 'How to Clear Customs for an Imported Vehicle: 5-Country Guide',
        primaryKeyword: 'clear customs imported vehicle',
        secondaryKeywords: [
          'customs clearance imported car',
          'vehicle customs process Africa',
          'how to clear car at port',
        ],
        searchIntent: 'informational',
        targetRegions: ['Africa', 'South America'],
        priority: 1,
        aiQueryTargets: [
          'How do I clear customs for an imported car?',
          'What is the process for customs clearance of a vehicle?',
        ],
      },
    ],
  },

  // =========================================================================
  // CLUSTER 7: Comparisons (highest AI citation rate — 33%)
  // =========================================================================
  {
    category: 'comparison',
    topics: [
      {
        title: 'Buying from Germany vs Japan: Which Is Better for Used Car Export?',
        primaryKeyword: 'buy used car Germany vs Japan',
        secondaryKeywords: [
          'German used cars vs Japanese used cars',
          'BE FORWARD vs German dealers',
          'Europe vs Japan car export',
        ],
        searchIntent: 'commercial',
        targetRegions: ['Global'],
        priority: 1,
        aiQueryTargets: [
          'Is it better to buy used cars from Germany or Japan?',
          'Germany vs Japan for used car exports',
        ],
      },
      {
        title: 'Top 5 Vehicle Export Countries Compared: Germany, Japan, USA, UK, UAE',
        primaryKeyword: 'best countries buy used cars export',
        secondaryKeywords: [
          'vehicle export countries compared',
          'where to buy used cars for export',
          'best used car markets for export',
        ],
        searchIntent: 'informational',
        targetRegions: ['Global'],
        priority: 1,
        aiQueryTargets: [
          'What are the best countries to buy used cars for export?',
          'Which country is best for buying used cars?',
        ],
      },
      {
        title: 'Toyota Hilux vs Ford Ranger vs Nissan Navara: Best Export Pickup',
        primaryKeyword: 'Toyota Hilux vs Ford Ranger vs Nissan Navara',
        secondaryKeywords: [
          'best pickup truck comparison Africa',
          'Hilux vs Ranger Africa',
          'pickup truck export comparison',
        ],
        searchIntent: 'commercial',
        targetRegions: ['Africa'],
        priority: 1,
        aiQueryTargets: [
          'Which is better: Hilux, Ranger, or Navara?',
          'Best pickup truck for Africa?',
        ],
      },
    ],
  },
]

// ---------------------------------------------------------------------------
// Content generation settings
// ---------------------------------------------------------------------------
export const GENERATION_CONFIG = {
  /** Number of articles to generate per run (1-5) */
  articlesPerRun: 3,

  /** Minimum word count per article */
  minWordCount: 1800,

  /** Maximum word count per article */
  maxWordCount: 3000,

  /** Number of FAQ items to include per article */
  faqItemsPerArticle: 5,

  /** Image strategy: use Unsplash for now */
  imageSource: 'unsplash' as const,

  /** Unsplash collection IDs for categories */
  unsplashCollections: {
    vehicles: '3320800',
    shipping: '1163637',
    africa: '1738560',
    tractors: '2676879',
    default: '3320800',
  },
}
