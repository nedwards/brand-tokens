import StyleDictionary from 'style-dictionary'
import {
  generateBrandsFile,
  generateVersionFile,
  getAllFiles,
} from './utils/index.js'
import { getStyleDictionaryConfig } from './style-dictionary/index.js'

generateVersionFile()

generateBrandsFile()

const buildTokens = async () => {
  const brands = getAllFiles()
  for (const brand of brands) {
    const styleDictionary = new StyleDictionary(getStyleDictionaryConfig(brand))
    await styleDictionary.buildAllPlatforms()
  }
  console.log('✅ Brand token build complete!')
}

buildTokens().catch((err) => {
  console.error('❌ Brand token build failed:', err)
})
