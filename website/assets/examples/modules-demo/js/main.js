import { cart } from '@js/cart.js'
import { itemList } from '@js/item-list.js'
import { cartSummary } from '@js/cart-summary.js'

document.addEventListener('alpine:init', () => {
  Alpine.store('cart', cart())
  Alpine.data('itemList', itemList)
  Alpine.data('cartSummary', cartSummary)
})
