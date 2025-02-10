export function validatePriceRangeInput(value: string): string {
  const num = parseFloat(value);
  if (isNaN(num) || num < 0) return "";
  return num.toString();
}