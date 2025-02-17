import fs from 'fs'
import path from 'path'

const packageJson = JSON.parse(
  fs.readFileSync(path.resolve('package.json'), 'utf-8')
)

export const PACKAGE_VERSION = packageJson.version
export const DIST_DIR = 'src/components/BrandProvider/css/'
export const SRC_DIR = 'src/components/BrandProvider'
export const TOKENS_DIR = `tokens/`

export const getBrands = () =>
  getJsonFiles(TOKENS_DIR)
    .filter((file) => file !== 'default.json')
    .map((file) => file.replace('.json', ''))

export const getAllFiles = () =>
  getJsonFiles(TOKENS_DIR).map((file) => file.replace('.json', ''))

export const getJsonFiles = (dir) =>
  fs.readdirSync(dir).filter((file) => file.endsWith('.json'))

export const writeToFile = (filePath, content) => {
  fs.writeFileSync(filePath, content)
}

export const generateBrandsFile = () => {
  const brands = getBrands()
  const brandFileContent = `export const BRANDS = ${JSON.stringify(brands, null, 2)} as const;
export type Brand = typeof BRANDS[number];\n`

  writeToFile(`${SRC_DIR}/brands.ts`, brandFileContent)
  console.log('✅ Brands file generated!')
}

export const generateVersionFile = () => {
  const versionFileContent = `export const PACKAGE_VERSION = "${packageJson.version}";\n`
  writeToFile(`${SRC_DIR}/version.ts`, versionFileContent)
  console.log('✅ Version file generated!')
}
