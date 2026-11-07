import { formatPrice, total } from '@js/money.js'

export function cartSummary() {
  return {
    get label() {
      const items = this.$store.cart.items
      return items.length ? `${items.length} in cart · ${formatPrice(total(items))}` : 'Cart is empty'
    }
  }
}
