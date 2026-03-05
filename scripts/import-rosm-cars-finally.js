/**
 * Import cars from "RosM Cars finally" folder structure.
 * Each folder: name includes mileage and price (e.g. "2018 Toyota Corolla 153 600 km - 5950 eur");
 * optional .txt file with specs; images (png, jpg, etc.) in folder root.
 *
 * Run: node scripts/import-rosm-cars-finally.js "C:\...\RosM Cars finally"
 * Or set ROSM_CARS_PATH env.
 */

const fs = require('fs')
const path = require('path')

const ROSM_CARS_PATH = process.env.ROSM_CARS_PATH || process.argv[2]
if (!ROSM_CARS_PATH || !fs.existsSync(ROSM_CARS_PATH)) {
  console.error('Usage: node scripts/import-rosm-cars-finally.js <path-to-RosM-Cars-finally>')
  console.error('Or set ROSM_CARS_PATH')
  process.exit(1)
}

const PROJECT_ROOT = path.join(__dirname, '..')
const PUBLIC_INVENTORY = path.join(PROJECT_ROOT, 'public', 'images', 'inventory')
const IMAGE_EXT = /\.(jpe?g|webp|png|gif)$/i

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/** Parse folder name like "2018 Toyota Corolla 153 600 km - 5950 eur" or "2014 Toyota 4Runner Limited - 13000 eur" */
function parseFolderName(folderName) {
  const priceMatch = folderName.match(/\s*-\s*([\d\s]+)\s*(?:eur|euro|euros?)\s*$/i)
  const price = priceMatch ? parseInt(priceMatch[1].replace(/\s/g, ''), 10) : 0
  const beforePrice = priceMatch ? folderName.slice(0, priceMatch.index).trim() : folderName
  const mileageMatch = beforePrice.match(/(\d[\d\s]*)\s*km\s*$/i)
  const mileage = mileageMatch ? parseInt(mileageMatch[1].replace(/\s/g, ''), 10) || 0 : 0
  const displayName = mileageMatch ? beforePrice.slice(0, mileageMatch.index).trim() : beforePrice
  const yearMatch = displayName.match(/\b(19|20)\d{2}\b/)
  const year = yearMatch ? parseInt(yearMatch[0], 10) : new Date().getFullYear()
  const nameWithoutYear = displayName.replace(/^\d{4}[\-\s]*/, '').trim()
  const make = nameWithoutYear.split(/\s+/)[0] || 'Unknown'
  const model = nameWithoutYear.replace(new RegExp(`^${make}\\s*`), '').trim() || nameWithoutYear
  return { displayName, price, mileage, year, make, model }
}

/** Parse .txt spec file: alternating Key/Value lines and inline KeyValue lines */
function parseSpecsTxt(filePath) {
  if (!fs.existsSync(filePath)) return {}
  const raw = fs.readFileSync(filePath, 'utf-8')
  const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean)
  const specs = {}
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    // Inline "KeyValue" (e.g. "First registration2018-03", "Mileage153 600 km")
    const inline = line.match(/^([A-Za-z\s\/\-]+?)(\d[\d\s\.\-].*)$/)
    if (inline) {
      const key = inline[1].replace(/\s+$/, '').trim()
      if (key.length > 0) specs[key] = inline[2].trim()
      continue
    }
    // Alternating: this line is key, next is value (if next looks like value)
    if (i + 1 < lines.length && /^[A-Za-z]/.test(line) && line.length < 50) {
      const next = lines[i + 1]
      if (next.length > 0 && (/\d/.test(next) || next.length > 2)) {
        specs[line] = next
        i++
        continue
      }
    }
  }
  return specs
}

/** Copy all images from folder root to public/images/inventory/slug/. If a file is named "main" (e.g. main.jpg), it becomes the first/primary image. */
function copyImagesFromRoot(folderPath, slug) {
  const entries = fs.readdirSync(folderPath, { withFileTypes: true })
    .filter((e) => e.isFile() && IMAGE_EXT.test(e.name))
  if (entries.length === 0) return null
  const destDir = path.join(PUBLIC_INVENTORY, slug)
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true })

  const mainFile = entries.find((e) => path.basename(e.name, path.extname(e.name)).toLowerCase() === 'main')
  const otherFiles = entries.filter((e) => e !== mainFile).map((e) => e.name).sort()
  const ordered = mainFile ? [mainFile.name, ...otherFiles] : otherFiles

  const imagePaths = []
  for (let i = 0; i < ordered.length; i++) {
    const name = ordered[i]
    const ext = path.extname(name).toLowerCase()
    const destName = `${i + 1}${ext}`
    try {
      fs.copyFileSync(path.join(folderPath, name), path.join(destDir, destName))
      imagePaths.push(`/images/inventory/${slug}/${destName}`)
    } catch (err) {
      console.warn(`Could not copy ${name} for ${slug}:`, err.message)
    }
  }
  return imagePaths.length ? { primaryPath: imagePaths[0], imagePaths } : null
}

function main() {
  const dirs = fs.readdirSync(ROSM_CARS_PATH, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)

  const automobiles = []
  for (let i = 0; i < dirs.length; i++) {
    const folderName = dirs[i]
    const dirPath = path.join(ROSM_CARS_PATH, folderName)
    const { displayName, price, mileage, year, make, model } = parseFolderName(folderName)

    const slug = slugify(folderName)
    const shortSlug = slug.length > 60 ? slug.slice(0, 60) : slug

    let specs = {}
    const files = fs.readdirSync(dirPath, { withFileTypes: true })
    const txtFile = files.find((f) => f.isFile() && f.name.toLowerCase().endsWith('.txt'))
    if (txtFile) {
      specs = parseSpecsTxt(path.join(dirPath, txtFile.name))
    }
    const mileageFromSpecs = parseInt(String(specs.Mileage || specs.mileage || '0').replace(/\D/g, ''), 10) || 0
    const finalMileage = mileage || mileageFromSpecs

    const fuel = (specs['Fuel type'] || '').toLowerCase()
    const fuelType = fuel.includes('diesel') ? 'Diesel' : fuel.includes('electric') ? 'Electric' : fuel.includes('hybrid') ? 'Hybrid' : 'Petrol'
    const trans = (specs.Gearbox || specs.gearbox || 'Automatic').toLowerCase()
    const transmission = trans.startsWith('manual') || trans === 'm/t' ? 'Manual' : 'Automatic'
    const bodyRaw = (specs['Body type'] || specs['Body type'] || 'SUV').toLowerCase()
    const bodyType = bodyRaw.includes('sedan') || bodyRaw.includes('saloon') ? 'Sedan' : bodyRaw.includes('suv') ? 'SUV' : bodyRaw.includes('truck') ? 'Truck' : bodyRaw.includes('van') ? 'Van' : 'SUV'
    const engineSize = specs['Engine capacity, cc'] || specs['Engine capacity'] || specs['Engine'] || '-'

    const features = []
    if (specs.Color) features.push(specs.Color)
    if (specs['Number of seats']) features.push(`${specs['Number of seats']} seats`)
    if (specs['Driven wheels']) features.push(specs['Driven wheels'])
    if (specs['Climate control']) features.push('Climate control')

    const result = copyImagesFromRoot(dirPath, shortSlug)
    if (!result) {
      console.warn(`No images in ${folderName}, skipping`)
      continue
    }

    const entry = {
      id: `used-auto-${i + 1}`,
      slug: shortSlug,
      category: 'automobile',
      name: displayName,
      brand: make,
      model: String(model).slice(0, 80) || displayName,
      year: Number.isNaN(year) ? new Date().getFullYear() : year,
      price: price || 5000,
      condition: 'Good',
      description: `${displayName}. ${finalMileage ? `${finalMileage.toLocaleString()} km. ` : ''}Available for export.`,
      features: features.slice(0, 8),
      imageAlt: `${displayName} - used vehicle for export`,
      imagePlaceholder: '/images/placeholders/automobile.svg',
      bodyType,
      mileage: finalMileage,
      fuelType,
      transmission,
      engineSize: engineSize === '-' ? engineSize : String(engineSize),
      image: result.primaryPath,
      images: result.imagePaths,
      specs: Object.keys(specs).length ? specs : undefined,
    }
    automobiles.push(entry)
  }

  const usedCarsPath = path.join(__dirname, '..', 'lib', 'used-cars-data.json')
  const existing = fs.existsSync(usedCarsPath)
    ? JSON.parse(fs.readFileSync(usedCarsPath, 'utf-8'))
    : { automobiles: [], tractors: [] }
  const tractors = existing.tractors || []

  fs.writeFileSync(
    usedCarsPath,
    JSON.stringify({ automobiles, tractors }, null, 2),
    'utf-8'
  )
  console.log(`Wrote ${usedCarsPath}: ${automobiles.length} automobiles, ${tractors.length} tractors`)
}

main()
