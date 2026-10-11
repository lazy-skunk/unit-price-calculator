export function calculateUnitPrice(priceInput: string, quantityInput: string) {
  const price = Number(priceInput);
  const quantity = Number(quantityInput);
  if (
    !priceInput.trim() ||
    !quantityInput.trim() ||
    !Number.isFinite(price) ||
    price < 0 ||
    !Number.isFinite(quantity) ||
    quantity <= 0
  ) {
    return null;
  }
  const result = price / quantity;
  return Number.isFinite(result) ? result : null;
}
