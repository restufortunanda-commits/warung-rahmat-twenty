import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useProductStore } from '@/stores/products'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])

  const total = computed(() => items.value.reduce((sum, i) => sum + i.price * i.qty, 0))
  const totalQty = computed(() => items.value.reduce((sum, i) => sum + i.qty, 0))

  function add(product) {
    const line = items.value.find((i) => i.product_id === product.id)
    if (line) {
      increase(product.id)
      return
    }
    if (product.stock < 1) return
    items.value.push({
      product_id: product.id,
      name: product.name,
      price: product.sell_price,
      qty: 1,
    })
  }

  function increase(productId) {
    const line = items.value.find((i) => i.product_id === productId)
    const product = useProductStore().getById(productId)
    if (line && product && line.qty < product.stock) line.qty += 1
  }

  function decrease(productId) {
    const line = items.value.find((i) => i.product_id === productId)
    if (!line) return
    line.qty -= 1
    if (line.qty <= 0) remove(productId)
  }

  function remove(productId) {
    items.value = items.value.filter((i) => i.product_id !== productId)
  }

  function clear() {
    items.value = []
  }

  return { items, total, totalQty, add, increase, decrease, remove, clear }
})
