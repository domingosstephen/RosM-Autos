/**
 * Import used cars from "Used Cars" folder structure.
 * Each folder: .txt file (name, price, description, specs) + Pictures/
 *
 * Run: node scripts/import-used-cars.js "C:\...\RosM Autos Cars\Used Cars"
 * Or set USED_CARS_PATH env.
 */

const fs = require('fs')
const path = require('path')

const USED_CARS_PATH = process.env.USED_CARS_PATH || process.argv[2]
if (!USED_CARS_PATH || !fs.existsSync(USED_CARS_PATH)) {
  console.error('Usage: node scripts/import-used-cars.js <path-to-Used-Cars-folder>')
  console.error('Or set USED_CARS_PATH')
  process.exit(1)
}

const PROJECT_ROOT = path.join(__dirname, '..')
const PUBLIC_INVENTORY = path.join(PROJECT_ROOT, 'public', 'images', 'inventory')
const IMAGE_EXT = /\.(jpe?g|webp|png|gif)$/i

/** Display name overrides: folder name -> clean name (for import from Used Cars folder) */
const DISPLAY_NAME_OVERRIDES = {}

/**
 * Copy all images from folder/Pictures to public/images/inventory/slug/ (1.ext, 2.ext, ...).
 * Primary image = file named "main" (e.g. main.webp, main.jpg) if present, else largest by size.
 * Returns { primaryPath, imagePaths } or null.
 */
function copyAllImagesAndGetPrimaryPath(folderPath, slug) {
  const picturesDir = path.join(folderPath, 'Pictures')
  if (!fs.existsSync(picturesDir)) return null
  const entries = fs.readdirSync(picturesDir, { withFileTypes: true })
    .filter((e) => e.isFile() && IMAGE_EXT.test(e.name))
  if (entries.length === 0) return null
  const destDir = path.join(PUBLIC_INVENTORY, slug)
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true })

  const withSize = entries.map((e) => {
    const src = path.join(picturesDir, e.name)
    const base = path.basename(e.name, path.extname(e.name)).toLowerCase()
    return { name: e.name, size: fs.statSync(src).size, src, isMain: base === 'main' }
  })

  const mainFile = withSize.find((e) => e.isMain)
  const primary = mainFile || withSize.sort((a, b) => b.size - a.size)[0]
  const others = withSize.filter((e) => e !== primary).sort((a, b) => b.size - a.size)
  const ordered = [primary, ...others]

  const imagePaths = []
  for (let i = 0; i < ordered.length; i++) {
    const extI = path.extname(ordered[i].name).toLowerCase()
    const destName = `${i + 1}${extI}`
    try {
      fs.copyFileSync(ordered[i].src, path.join(destDir, destName))
      imagePaths.push(`/images/inventory/${slug}/${destName}`)
    } catch (err) {
      if (i === 0) console.warn(`Could not copy image for ${slug}:`, err.message)
    }
  }
  return imagePaths.length ? { primaryPath: imagePaths[0], imagePaths } : null
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function parsePrice(line) {
  const match = line.replace(/,/g, '').match(/(\d+)/)
  return match ? parseInt(match[1], 10) : 0
}

function extractYear(name) {
  const m = name.match(/\b(19|20)\d{2}\b/)
  return m ? parseInt(m[0], 10) : new Date().getFullYear()
}

const BODY_MAP = {
  'sedan': 'Sedan',
  'suv': 'SUV',
  'suv/crossover': 'SUV',
  'pick up truck': 'Truck',
  'pickup': 'Truck',
  'van': 'Van',
  'hatchback': 'Hatchback',
  'coupe': 'Coupe',
  'other': 'SUV',
}

function parseTxt(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8')
  const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean)

  let name = lines[0] || 'Unknown'
  let price = 0
  let description = ''
  const specs = {}

  let i = 1
  while (i < lines.length) {
    const line = lines[i]
    if (/^Price:\s*/i.test(line)) {
      price = parsePrice(line)
      i++
      continue
    }
    if (/^Description\s*$/i.test(line)) {
      i++
      const descLines = []
      while (i < lines.length && !/^(Specs|Specifications|Make)\s*$/i.test(lines[i]) && !/^Make$/i.test(lines[i])) {
        descLines.push(lines[i])
        i++
      }
      description = descLines.join(' ').trim() || name
      continue
    }
    if (/^(Specs|Specifications|Specs & features)\s*$/i.test(line) || (line === 'Make' && lines[i + 1])) {
      i++
      while (i < lines.length) {
        const key = lines[i]
        const value = lines[i + 1]
        if (!key || !value || /^\s*$/.test(key)) break
        if (/^(Interior|Exterior|Safety|Comfort|Infotainment|Key Features)/i.test(key)) {
          i++
          continue
        }
        specs[key.toLowerCase()] = value
        i += 2
      }
      break
    }
    i++
  }

  return { name, price, description, specs }
}

function isTractor(folderName, specs) {
  const name = folderName.toLowerCase()
  if (name.includes('massey ferguson') || name.includes('tractor')) return true
  const make = (specs.make || '').toLowerCase()
  const type = (specs['vehicle type'] || '').toLowerCase()
  return make.includes('massey ferguson') || type === 'tractor' || type === 'other'
}

function parseAutomobile(folderName, txtPath, folderSlug, index) {
  const { name, price, description, specs } = parseTxt(txtPath)
  const year = extractYear(name) || extractYear(specs.model || '') || extractYear(folderName)
  const make = specs.make || name.split(/\s+/)[0] || 'Unknown'
  const model = specs.model || name.replace(make, '').trim() || 'Unknown'
  const bodyRaw = (specs['vehicle type'] || 'SUV').toLowerCase()
  const bodyType = BODY_MAP[bodyRaw] || 'SUV'
  const mileage = parseInt(String(specs.mileage || '0').replace(/\D/g, ''), 10) || 0
  const fuel = (specs['fuel type'] || 'Petrol').toLowerCase()
  const fuelType = fuel.includes('diesel') ? 'Diesel' : fuel.includes('electric') ? 'Electric' : fuel.includes('hybrid') ? 'Hybrid' : 'Petrol'
  const trans = (specs.transmission || 'Automatic').toLowerCase()
  const transmission = trans.startsWith('manual') || trans === 'm/t' ? 'Manual' : 'Automatic'
  const engineSize = specs['engine capacity'] || specs.engine || ''

  const features = []
  if (specs['interior color']) features.push(`${specs['interior color']} interior`)
  if (specs.color) features.push(specs.color + ' exterior')
  if (specs['drive type']) features.push(specs['drive type'])
  if (specs['steering side']) features.push(specs['steering side'])
  if (specs['seating capacity']) features.push(specs['seating capacity'])
  if (specs['wheel size']) features.push(specs['wheel size'] + ' wheels')
  if (description && description.length > 20) features.push(description.slice(0, 80) + (description.length > 80 ? '…' : ''))

  const slug = slugify(folderName)
  const id = `used-auto-${index + 1}`
  const displayName = DISPLAY_NAME_OVERRIDES[folderName] || name || folderName

  return {
    id,
    slug: slug.length > 60 ? slug.slice(0, 60) : slug,
    category: 'automobile',
    name: displayName,
    brand: make,
    model: String(model),
    year: Number.isNaN(year) ? new Date().getFullYear() : year,
    price: price || 5000,
    condition: 'Good',
    description: description || `${make} ${model} ${year}. Available for export.`,
    features: features.slice(0, 8),
    imageAlt: `${displayName} - used vehicle for export`,
    imagePlaceholder: '/images/placeholders/automobile.svg',
    bodyType,
    mileage,
    fuelType,
    transmission,
    engineSize: engineSize || '-',
  }
}

function parseTractor(folderName, txtPath, folderSlug, index) {
  const { name, price, description, specs } = parseTxt(txtPath)
  const year = extractYear(name) || extractYear(folderName) || new Date().getFullYear()
  const make = (specs.make && specs.make.toLowerCase().includes('massey')) ? 'Massey Ferguson' : (specs.make || 'Massey Ferguson')
  const model = (specs.model && !specs.model.toLowerCase().includes('ferguson')) ? specs.model : folderName.replace(/Massey Ferguson\s*/i, '').replace(/\s*TRACTOR.*$/i, '').trim() || 'Tractor'
  const horsepower = parseInt(String(specs.horsepower || '75').replace(/\D/g, ''), 10) || 75
  const hoursUsed = parseInt(String(specs['hours used'] || specs.hours || '0').replace(/\D/g, ''), 10) || 0

  const slug = slugify(folderName)
  const id = `used-tractor-${index + 1}`
  const displayName = DISPLAY_NAME_OVERRIDES[folderName] || name || folderName

  const features = []
  if (specs['fuel type']) features.push(specs['fuel type'])
  if (specs.transmission) features.push(specs.transmission)
  if (specs['drive type'] || (description && description.includes('4WD'))) features.push('4WD')
  if (specs.color) features.push(specs.color)
  if (description) features.push(description.slice(0, 60) + (description.length > 60 ? '…' : ''))

  return {
    id,
    slug: slug.length > 60 ? slug.slice(0, 60) : slug,
    category: 'tractor',
    name: displayName,
    brand: make,
    model: String(model),
    year: Number.isNaN(year) ? new Date().getFullYear() : year,
    price: price || 15000,
    condition: 'Good',
    description: description || `${make} ${model} tractor. Available for export.`,
    features: features.slice(0, 6),
    imageAlt: `${displayName} - tractor for export`,
    imagePlaceholder: '/images/placeholders/tractor.svg',
    horsepower,
    hoursUsed,
    driveType: '4WD',
    ptoType: '540 RPM',
    liftCapacity: '-',
  }
}

function main() {
  const dirs = fs.readdirSync(USED_CARS_PATH, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)

  const automobiles = []
  const tractors = []
  let autoIndex = 0
  let tractorIndex = 0

  for (const folderName of dirs) {
    const dirPath = path.join(USED_CARS_PATH, folderName)
    const files = fs.readdirSync(dirPath, { withFileTypes: true })
    const txtFile = files.find((f) => f.isFile() && f.name.endsWith('.txt'))
    if (!txtFile) continue

    const txtPath = path.join(dirPath, txtFile.name)
    const { specs } = parseTxt(txtPath)
    const folderSlug = slugify(folderName)
    const slug = folderSlug.length > 60 ? folderSlug.slice(0, 60) : folderSlug

    let product
    if (isTractor(folderName, specs)) {
      product = parseTractor(folderName, txtPath, folderSlug, tractorIndex++)
      tractors.push(product)
    } else {
      product = parseAutomobile(folderName, txtPath, folderSlug, autoIndex++)
      automobiles.push(product)
    }
    const result = copyAllImagesAndGetPrimaryPath(dirPath, slug)
    if (result) {
      product.image = result.primaryPath
      product.images = result.imagePaths
    }
  }

  const outPath = path.join(__dirname, '..', 'lib', 'used-cars-data.json')
  fs.writeFileSync(outPath, JSON.stringify({ automobiles, tractors }, null, 2), 'utf-8')
  console.log(`Wrote ${outPath}: ${automobiles.length} automobiles, ${tractors.length} tractors`)
}

main()
