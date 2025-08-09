// utils/currency.ts
export function formatRupiahNoPrefix(value: number): string {
  if (value == null || Number.isNaN(value)) return "";
  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

// If you ever need to parse a string back to number (thousand separator aware)
export function parseRupiahStringToNumber(text: string): number {
  const digitsOnly = text.replace(/\D/g, ""); // keep 0-9
  return digitsOnly ? Number(digitsOnly) : 0;
}
