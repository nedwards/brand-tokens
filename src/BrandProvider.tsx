import { useEffect, useRef, ReactNode, FC, HTMLAttributes } from 'react'
import packageJson from '../package.json'
import defaultStyles from '../dist/css/default.module.css'

import { availableBrands, type Brand } from './brands'

const PACKAGE_VERSION = packageJson.version

type BrandProviderProps = {
  brand: Brand
  children: ReactNode
} & HTMLAttributes<HTMLDivElement>

export const BrandProvider: FC<BrandProviderProps> = ({
  brand,
  children,
  ...props
}) => {
  const isValidBrand = availableBrands.includes(brand)
  const stylesRef = useRef(defaultStyles)

  useEffect(() => {
    if (!isValidBrand) {
      console.warn(`⚠️ Invalid brand "${brand}".`)
      return
    }

    import(`./css/${brand}.module.css`)
      .then((module) => {
        stylesRef.current = module.default
      })
      .catch(() => {
        console.warn(
          `⚠️ Could not load styles for brand "${brand}", using defaults.`
        )
      })
  }, [brand, isValidBrand])

  return (
    <div
      data-brand={`${isValidBrand ? brand : 'default'}-${PACKAGE_VERSION}`}
      {...props}
    >
      {children}
    </div>
  )
}
