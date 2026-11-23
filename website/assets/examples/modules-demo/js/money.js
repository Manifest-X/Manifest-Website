export function formatPrice(cents) {
  return `$${(cents / 100).toFixed(2)}`
}

export function total(items) {
  return items.reduce((sum, item) => sum + item.cents, 0)
}
