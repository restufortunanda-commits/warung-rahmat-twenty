import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import seed from '@/seed/products.json'
import { loadOrSeed, saveData } from '@/services/storage'

const KEY = 'rahmat_products'

function validate(data) {
  const errors = {}
  if (!data.name || !String(data.name).trim()) errors.name = 'Nama produk wajib diisi'
  if (!(Number(data.sell_price) > 0)) errors.sell_price = 'Harga jual harus lebih dari 0'
  if (!(Number(data.buy_price) >= 0)) errors.buy_price = 'Harga beli tidak boleh negatif'
  if (!Number.isInteger(Number(data.stock)) || Number(data.stock) < 0) {
    errors.stock = 'Stok harus bilangan bulat 0 atau lebih'
  }
  return errors
}

function normalize(data) {
  return {
    category_id: Number(data.category_id),
    name: String(data.name).trim(),
    unit: String(data.unit || 'pcs').trim(),
    buy_price: Number(data.buy_price),
    sell_price: Number(data.sell_price),
    stock: Number(data.stock),
    min_stock: Number(data.min_stock ?? 0),
    is_active: data.is_active ?? true,
  }
}

export const useProductStore = defineStore('products', () => {
  const items = ref(loadOrSeed(KEY, seed))
  watch(items, (value) => saveData(KEY, value), { deep: true })

  const activeItems = computed(() => items.value.filter((p) => p.is_active))
  const lowStock = computed(() => activeItems.value.filter((p) => p.stock <= p.min_stock))

  function getById(id) {
    return items.value.find((p) => p.id === id)
  }

  function add(data) {
    const errors = validate(data)
    if (Object.keys(errors).length) return { ok: false, errors }
    const id = items.value.reduce((max, p) => Math.max(max, p.id), 0) + 1
    items.value.push({ id, ...normalize(data) })
    return { ok: true, id }
  }

  function update(id, data) {
    const errors = validate(data)
    if (Object.keys(errors).length) return { ok: false, errors }
    const index = items.value.findIndex((p) => p.id === id)
    if (index === -1) return { ok: false, errors: { general: 'Produk tidak ditemukan' } }
    items.value[index] = { id, ...normalize(data) }
    return { ok: true }
  }

  function remove(id) {
    items.value = items.value.filter((p) => p.id !== id)
  }

  function decreaseStock(id, qty) {
    const product = getById(id)
    if (product) product.stock -= qty
  }

  return { items, activeItems, lowStock, getById, add, update, remove, decreaseStock }
})
