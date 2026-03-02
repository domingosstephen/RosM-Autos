/**
 * Copy images from "In site cars" to public/images/site/ with section names.
 * Each image used in exactly one section (no repeat).
 *
 * Run: node scripts/copy-site-images.js "C:\...\Used Cars\In site cars"
 * Or set IN_SITE_CARS_PATH env.
 */

const fs = require('fs')
const path = require('path')

const IN_SITE_CARS_PATH = process.env.IN_SITE_CARS_PATH || process.argv[2]
if (!IN_SITE_CARS_PATH || !fs.existsSync(IN_SITE_CARS_PATH)) {
  console.error('Usage: node scripts/copy-site-images.js <path-to-In-site-cars-folder>')
  process.exit(1)
}

const DEST_DIR = path.join(__dirname, '..', 'public', 'images', 'site')

// Section names for each image (order by filename sort)
const SECTION_NAMES = [
  'hero',
  'about',
  'how-it-works',
  'shipping',
  'contact',
  'faq',
  'inventory',
  'value-prop',
]

function main() {
  const files = fs.readdirSync(IN_SITE_CARS_PATH, { withFileTypes: true })
    .filter((f) => f.isFile() && /\.(jpe?g|webp|png)$/i.test(f.name))
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, 8)

  if (files.length < 8) {
    console.warn(`Found ${files.length} images; expected 8. Some sections may not get an image.`)
  }

  if (!fs.existsSync(DEST_DIR)) {
    fs.mkdirSync(DEST_DIR, { recursive: true })
  }

  for (let i = 0; i < files.length && i < SECTION_NAMES.length; i++) {
    const ext = path.extname(files[i].name).toLowerCase()
    const destName = SECTION_NAMES[i] + ext
    const src = path.join(IN_SITE_CARS_PATH, files[i].name)
    const dest = path.join(DEST_DIR, destName)
    fs.copyFileSync(src, dest)
    console.log(`Copied ${files[i].name} -> site/${destName}`)
  }

  console.log(`Done. ${Math.min(files.length, SECTION_NAMES.length)} images in public/images/site/`)
}

main()
