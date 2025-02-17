export const BRANDS = [
  "brand-a",
  "brand-b",
  "brand-c",
  "brand-d"
] as const;
export type Brand = typeof BRANDS[number];
