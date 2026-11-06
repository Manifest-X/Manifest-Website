import { formatPrice } from '@js/lib/money.js'

export function itemList() {
  return {
    items: [
      { id: 1, name: 'Apples', cents: 349 },
      { id: 2, name: 'Bread', cents: 425 },
      { id: 3, name: 'Coffee', cents: 1199 }
    ],
    price(item) { return formatPrice(item.cents) },
    inCart(item) { return this.$store.cart.has(item) },
    toggle(item) { this.$store.cart.toggle(item) }
  }
}
