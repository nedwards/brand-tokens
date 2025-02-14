export const availableBrands = ['brandA', 'brandB'] as const
export type Brand = (typeof availableBrands)[number]
