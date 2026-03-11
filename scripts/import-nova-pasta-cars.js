/**
 * Copy images from "Nova pasta" Toyota Prado folders into public/images/inventory/.
 * Run from project root: node scripts/import-nova-pasta-cars.js
 *
 * Source folders (default):
 *   - .../Used cars/Nova pasta/Toyota LandCruiser Prado Pick-Up
 *   - .../Used cars/Nova pasta/Toyota Prado
 *
 * Or set NOVA_PASTA_PATH to parent "Nova pasta" folder.
 */

const fs = require('fs')
const path = require('path')

const PROJECT_ROOT = path.join(__dirname, '..')
const PUBLIC_INVENTORY = path.join(PROJECT_ROOT, 'public', 'images', 'inventory')

const DEFAULT_BASE = path.join(
  PROJECT_ROOT,
  '..',
  '..',
  'Used cars',
  'Nova pasta'
)
const NOVA_PASTA_PATH = process.env.NOVA_PASTA_PATH || DEFAULT_BASE

const IMAGE_EXT = /\.(jpe?g|webp|png|gif)$/i

const FOLDERS = [
  { folderName: 'Toyota LandCruiser Prado Pick-Up', slug: 'toyota-land-cruiser-prado-pick-up' },
  { folderName: 'Toyota Prado', slug: 'toyota-prado' },
]

function copyImages(sourceDir, slug) {
  if (!fs.existsSync(sourceDir)) {
    console.warn(`Skip ${slug}: folder not found: ${sourceDir}`)
    return
  }
  const entries = fs.readdirSync(sourceDir, { withFileTypes: true })
    .filter((e) => e.isFile() && IMAGE_EXT.test(e.name))
  if (entries.length === 0) {
    console.warn(`Skip ${slug}: no images in ${sourceDir}`)
    return
  }
  const destDir = path.join(PUBLIC_INVENTORY, slug)
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true })

  const byName = entries.map((e) => ({
    name: e.name,
    src: path.join(sourceDir, e.name),
    isMain: /^untitled\./i.test(e.name) && !e.name.match(/untitled\s*\d/i),
  }))
  const main = byName.find((e) => e.isMain)
  const rest = byName.filter((e) => !e.isMain).sort((a, b) => a.name.localeCompare(b.name))
  const ordered = main ? [main, ...rest] : rest

  for (let i = 0; i < ordered.length; i++) {
    const ext = path.extname(ordered[i].name).toLowerCase()
    const destName = `${i + 1}${ext}`
    const destPath = path.join(destDir, destName)
    try {
      fs.copyFileSync(ordered[i].src, destPath)
      console.log(`  ${ordered[i].name} -> ${slug}/${destName}`)
    } catch (err) {
      console.warn(`  Failed to copy ${ordered[i].name}:`, err.message)
    }
  }
}

function main() {
  console.log('Source base:', NOVA_PASTA_PATH)
  for (const { folderName, slug } of FOLDERS) {
    const sourceDir = path.join(NOVA_PASTA_PATH, folderName)
    console.log(`\n${slug}:`)
    copyImages(sourceDir, slug)
  }
  console.log('\nDone. Update lib/used-cars-data.json if you added new cars.')
}

main()
