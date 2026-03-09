/**
 * Import cars from "Mimba final car selection" folder structure into the repo.
 * Images are COPIED into public/images/inventory/<slug>/ so the site does not
 * depend on the external folder. After running, commit those files and
 * lib/used-cars-data.json to Git — the site will then show images even if
 * you delete the source folder.
 *
 * Each folder: 1.jpg, 2.jpg, 3.jpg, 4.jpg (only these 4) + one .txt with specs.
 *
 * Run once: node scripts/import-mimba-cars.js "C:\...\Mimba final car selection\Toyota Hilux"
 * Or set MIMBA_CARS_PATH env.
 */

const fs = require('fs')
const path = require('path')

const MIMBA_CARS_PATH = process.env.MIMBA_CARS_PATH || process.argv[2]
if (!MIMBA_CARS_PATH || !fs.existsSync(MIMBA_CARS_PATH)) {
  console.error('Usage: node scripts/import-mimba-cars.js <path-to-Toyota-Hilux-folder>')
  console.error('Example: node scripts/import-mimba-cars.js "C:\\...\\Mimba final car selection\\Toyota Hilux"')
  process.exit(1)
}

const PROJECT_ROOT = path.join(__dirname, '..')
const PUBLIC_INVENTORY = path.join(PROJECT_ROOT, 'public', 'images', 'inventory')
const USED_CARS_JSON = path.join(PROJECT_ROOT, 'lib', 'used-cars-data.json')

const IMAGE_EXT = /\.(jpe?g|webp|png|gif)$/i
const NUMERIC_IMAGES = ['1', '2', '3', '4'] // only these appear on site

/** Map folder name (or part) to brand for grouping on brand pages */
function getBrandFromFolderName(folderName) {
  const lower = folderName.toLowerCase()
  if (lower.includes('mercedes') || lower.includes('gle') || lower.includes('maybach') || lower.includes('sprinter') || lower.includes('s350') || lower.includes('s680')) return 'Mercedes-Benz'
  if (lower.includes('toyota') || lower.includes('4runner') || lower.includes('land cruiser') || lower.includes('highlander') || lower.includes('corolla') || lower.includes('rav 4') || lower.includes('fortuna') || lower.includes('hiace') || lower.includes('hilux') || lower.includes('vanguard')) return 'Toyota'
  if (lower.includes('ford')) return 'Ford'
  if (lower.includes('nissan')) return 'Nissan'
  if (lower.includes('isuzu')) return 'Isuzu'
  if (lower.includes('suzuki')) return 'Suzuki'
  if (lower.includes('tesla')) return 'Tesla'
  if (lower.includes('ducati')) return 'Ducati'
  if (lower.includes('talaria')) return 'Talaria'
  return 'Other'
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function parsePrice(line) {
  const match = String(line).replace(/,/g, '').match(/(\d+)/)
  return match ? parseInt(match[1], 10) : 0
}

function extractYear(text) {
  if (!text) return null
  const m = String(text).match(/\b(19|20)\d{2}\b/)
  return m ? parseInt(m[0], 10) : null
}

const BODY_MAP = {
  'sedan': 'Sedan', 'suv': 'SUV', 'commercial': 'Truck', 'truck': 'Truck',
  'van': 'Van', 'hatchback': 'Hatchback', 'coupe': 'Coupe', 'pickup': 'Truck',
}

/**
 * Parse .txt with "Price: X EUR" and "Technical information" / "Key: Value" lines.
 * Returns { name, price, description, specs } where specs is Record<string, string>.
 */
function parseMimbaTxt(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8')
  const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean)

  let name = lines[0] || 'Unknown'
  let price = 0
  const specs = {}

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]
    if (/^Price:\s*/i.test(line)) {
      price = parsePrice(line)
      continue
    }
    // "Key: Value" on one line
    const colonIdx = line.indexOf(':')
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim()
      const value = line.slice(colonIdx + 1).trim()
      if (key && value && !/^Technical information$/i.test(key)) {
        specs[key] = value
      }
    }
  }

  const mileage = parseInt(String(specs['Mileage'] || specs['Mileage:'] || '0').replace(/\D/g, ''), 10) || 0
  const description = `${name}. ${specs['Mileage'] ? specs['Mileage'] + '. ' : ''}Available for export.`

  return { name, price, description, specs }
}

/**
 * Copy only 1.ext, 2.ext, 3.ext, 4.ext from folder to public/images/inventory/slug/.
 * Tries .jpg and .png. Returns array of 4 paths or fewer if some missing.
 */
function copyFirstFourImages(folderPath, slug) {
  const destDir = path.join(PUBLIC_INVENTORY, slug)
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true })

  const imagePaths = []
  for (const num of NUMERIC_IMAGES) {
    let found = false
    for (const ext of ['.jpg', '.jpeg', '.png', '.webp']) {
      const name = num + ext
      const src = path.join(folderPath, name)
      if (fs.existsSync(src)) {
        const destName = num + path.extname(src).toLowerCase().replace(/jpeg/, 'jpg')
        const destPath = path.join(destDir, destName)
        try {
          fs.copyFileSync(src, destPath)
          imagePaths.push(`/images/inventory/${slug}/${destName}`)
          found = true
          break
        } catch (err) {
          console.warn(`Could not copy ${name} for ${slug}:`, err.message)
        }
      }
    }
    if (!found) break
  }
  return imagePaths
}

function buildAutomobile(folderName, txtPath, slug, index) {
  const { name, price, description, specs } = parseMimbaTxt(txtPath)
  const brand = getBrandFromFolderName(folderName)
  const year = extractYear(name) || extractYear(folderName) || new Date().getFullYear()

  // Model: strip brand from name or use folder
  let model = name
    .replace(/^\d{4}\s*/i, '')
    .replace(new RegExp(brand.replace('-', ' '), 'gi'), '')
    .trim() || folderName
  if (model.length > 60) model = folderName

  const bodyRaw = (specs['Body type'] || specs['Body type:'] || 'SUV').toLowerCase()
  const bodyType = BODY_MAP[bodyRaw] || 'SUV'
  const mileage = parseInt(String(specs['Mileage'] || specs['Mileage:'] || '0').replace(/\D/g, ''), 10) || 0
  const fuel = (specs['Fuel type'] || specs['Fuel type:'] || 'Petrol').toLowerCase()
  const fuelType = fuel.includes('diesel') ? 'Diesel' : fuel.includes('electric') ? 'Electric' : fuel.includes('hybrid') ? 'Hybrid' : 'Petrol'
  const trans = (specs['Gearbox'] || specs['Transmission'] || 'Automatic').toLowerCase()
  const transmission = trans.startsWith('manual') || trans === 'm/t' ? 'Manual' : 'Automatic'
  const engineSize = specs['Engine'] || specs['Engine:'] || '-'

  const slugFinal = slug.length > 60 ? slug.slice(0, 60) : slug
  const id = `used-auto-${index + 1}`

  return {
    id,
    slug: slugFinal,
    category: 'automobile',
    name: name || folderName,
    brand,
    model: String(model),
    year: Number.isNaN(year) ? new Date().getFullYear() : year,
    price: price || 5000,
    condition: 'Good',
    description: description || `${brand} ${model}. Available for export.`,
    features: [],
    imageAlt: `${name || folderName} - used vehicle for export`,
    imagePlaceholder: '/images/placeholders/automobile.svg',
    bodyType,
    mileage,
    fuelType,
    transmission,
    engineSize: engineSize || '-',
    image: null,
    images: null,
    specs: Object.keys(specs).length ? specs : undefined,
  }
}

function main() {
  const dirs = fs.readdirSync(MIMBA_CARS_PATH, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)

  const automobiles = []
  let autoIndex = 0

  for (const folderName of dirs) {
    const dirPath = path.join(MIMBA_CARS_PATH, folderName)
    const files = fs.readdirSync(dirPath, { withFileTypes: true })
    const txtFile = files.find((f) => f.isFile() && f.name.toLowerCase().endsWith('.txt'))
    if (!txtFile) {
      console.warn(`No .txt in ${folderName}, skipping`)
      continue
    }

    const txtPath = path.join(dirPath, txtFile.name)
    const slug = slugify(folderName)

    const product = buildAutomobile(folderName, txtPath, slug, autoIndex++)
    const imagePaths = copyFirstFourImages(dirPath, product.slug)

    if (imagePaths.length > 0) {
      product.image = imagePaths[0]
      product.images = imagePaths
    } else {
      product.image = product.imagePlaceholder
      product.images = [product.imagePlaceholder]
    }

    automobiles.push(product)
  }

  // Keep existing tractors from used-cars-data.json
  let tractors = []
  if (fs.existsSync(USED_CARS_JSON)) {
    try {
      const existing = JSON.parse(fs.readFileSync(USED_CARS_JSON, 'utf-8'))
      tractors = existing.tractors || []
    } catch (_) {}
  }

  const out = { automobiles, tractors }
  fs.writeFileSync(USED_CARS_JSON, JSON.stringify(out, null, 2), 'utf-8')
  console.log(`Wrote ${USED_CARS_JSON}: ${automobiles.length} automobiles, ${tractors.length} tractors`)
  console.log('Brands:', [...new Set(automobiles.map((a) => a.brand))].join(', '))
  console.log('')
  console.log('Images were copied into the repo (public/images/inventory/).')
  console.log('Commit these to Git so the site works without the source folder:')
  console.log('  git add public/images/inventory lib/used-cars-data.json')
  console.log('  git commit -m "Add car images and inventory data"')
}

main()
