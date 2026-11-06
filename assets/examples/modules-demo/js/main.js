import { cart } from '@js/stores/cart.js'
import { itemList } from '@js/components/item-list.js'
import { cartSummary } from '@js/components/cart-summary.js'

document.addEventListener('alpine:init', () => {
  Alpine.store('cart', cart())
  Alpine.data('itemList', itemList)
  Alpine.data('cartSummary', cartSummary)
})
