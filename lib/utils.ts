import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculatePricePerLiter(fat: number, basePrice: number) {
  if (fat < 3.5) return basePrice;
  const baseFat = 3.5;
  const bonusPerPoint = 0.3;

  const fatDifference = fat - baseFat;
  const price = basePrice + (fatDifference / 0.1) * bonusPerPoint;

  return Number(price.toFixed(2));
}
