import { PACKAGE_VERSION, TOKENS_DIR, DIST_DIR } from '../utils/index.js'

export const getStyleDictionaryConfig = (brand) => ({
  source: [`${TOKENS_DIR}/default.json`, `${TOKENS_DIR}/${brand}.json`],
  platforms: {
    web: {
      transformGroup: 'css',
      buildPath: DIST_DIR,
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
