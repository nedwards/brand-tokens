import { useEffect, useRef, ReactNode, FC, HTMLAttributes } from 'react'
import defaultStyles from './css/default.module.css'

import { PACKAGE_VERSION } from './version'
import { BRANDS, type Brand } from './brands'

type BrandProviderProps = {
  brand: Brand
  children: ReactNode
} & HTMLAttributes<HTMLDivElement>

export const BrandProvider: FC<BrandProviderProps> = ({
  brand,
  children,
  ...props
}) => {
  const isValidBrand = BRANDS.includes(brand)
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
        console.warn(`⚠️ Could not load styles for brand "${brand}".`)
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
