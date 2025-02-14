import StyleDictionary from 'style-dictionary'
import fs from 'fs'
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'))

const PACKAGE_VERSION = packageJson.version
const TOKENS_DIR = 'tokens/'
const DIST_DIR = 'dist/'
const CSS_DIR = 'dist/css/'

// Get all JSON files in the tokens directory
const brandFiles = fs
  .readdirSync(TOKENS_DIR)
  .filter((file) => file !== 'default.json' && file.endsWith('.json'))
const brands = brandFiles.map((file) => file.replace('.json', ''))

// Ensure output directory exists
if (!fs.existsSync(CSS_DIR)) {
  fs.mkdirSync(CSS_DIR, { recursive: true })
}

// ✅ Generate brands.d.ts for TypeScript
const brandsTsContent = `export const availableBrands = ${JSON.stringify(brands, null, 2)} as const;
export type Brand = typeof availableBrands[number];\n`
fs.writeFileSync(`${DIST_DIR}/brands.ts`, brandsTsContent)

// Function to create Style Dictionary configuration for a brand
const getStyleDictionaryConfig = (brand) => ({
  extends: [`${TOKENS_DIR}/default.json`],
  source: [`${TOKENS_DIR}/${brand}.json`],
  platforms: {
    web: {
      transformGroup: 'css',
      buildPath: CSS_DIR,
      files: [
        {
          destination: `${brand}.module.css`,
          format: 'css/variables',
          options: {
            selector: `[data-brand="${brand}-${PACKAGE_VERSION}"]`,
          },
        },
      ],
    },
  },
})

// Build the style dictionary for each brand
const buildAllBrands = async () => {
  for (const brand of brands) {
    const styleDictionary = new StyleDictionary(getStyleDictionaryConfig(brand))
    await styleDictionary.buildAllPlatforms()
  }
  console.log('✅ Style Dictionary build complete!')
}

buildAllBrands().catch((err) => {
  console.error('❌ Style Dictionary build failed:', err)
})
