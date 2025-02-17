export const BRANDS = [
  "brandA",
  "brandB",
  "brandC",
  "brandD"
] as const;
export type Brand = typeof BRANDS[number];
