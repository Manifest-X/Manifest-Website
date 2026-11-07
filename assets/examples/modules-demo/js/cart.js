export function cart() {
  return {
    items: [],
    has(item) { return this.items.some(i => i.id === item.id) },
    toggle(item) {
      this.items = this.has(item) ? this.items.filter(i => i.id !== item.id) : [...this.items, item]
    }
  }
}
