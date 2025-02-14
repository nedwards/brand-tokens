import { useEffect, useRef, ReactNode, FC } from 'react'
import packageJson from '../package.json'
import defaultStyles from './css/default.module.css'
import brands from './brands.json'

const PACKAGE_VERSION = packageJson.version

export type Brand = string

const BrandProvider: FC<{ brand: Brand; children: ReactNode }> = ({
  brand,
  children,
}) => {
  const isValidBrand = brands.includes(brand)
  const stylesRef = useRef(defaultStyles)

  useEffect(() => {
    if (!isValidBrand) {
      console.warn(`⚠️ Invalid brand "${brand}", using default styles.`)
      return
    }

    import(`./css/${brand}.module.css`)
      .then((module) => {
        stylesRef.current = module.default
      })
      .catch(() => {
        console.warn(
          `⚠️ Could not load styles for brand "${brand}", using default.`
        )
      })
  }, [brand, isValidBrand])

  return (
    <div data-brand={`${isValidBrand ? brand : 'default'}-${PACKAGE_VERSION}`}>
      {children}
    </div>
  )
}

export default BrandProvider
