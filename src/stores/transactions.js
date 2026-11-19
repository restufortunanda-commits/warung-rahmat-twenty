import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import seed from '@/seed/transactions.json'
import { loadOrSeed, saveData } from '@/services/storage'
import { useProductStore } from '@/stores/products'

const KEY = 'rahmat_transactions'

function makeInvoiceNo(existing) {
  const d = new Date()
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`
  const prefix = `INV-${ymd}-`
  const sameDay = existing.filter((t) => t.invoice_no.startsWith(prefix)).length
  return `${prefix}${String(sameDay + 1).padStart(4, '0')}`
}

export const useTransactionStore = defineStore('transactions', () => {
  const items = ref(loadOrSeed(KEY, seed))
  watch(items, (value) => saveData(KEY, value), { deep: true })

  const sorted = computed(() =>
    [...items.value].sort((a, b) => b.created_at.localeCompare(a.created_at)),
  )
  const totalRevenue = computed(() => items.value.reduce((sum, t) => sum + t.total, 0))

  function create({ cashier_id, customer_id = null, payment_method = 'tunai', paid_amount, lines }) {
    const productStore = useProductStore()
    const errors = {}

    if (!lines || lines.length === 0) errors.items = 'Keranjang masih kosong'

    const detail = (lines ?? []).map((line) => {
      const product = productStore.getById(line.product_id)
      if (!product) errors.items = 'Ada produk yang tidak ditemukan'
      else if (line.qty > product.stock) errors.items = `Stok ${product.name} tersisa ${product.stock}`
      return {
        product_id: line.product_id,
        name: line.name,
        qty: line.qty,
        price: line.price,
        subtotal: line.price * line.qty,
      }
    })

    const total = detail.reduce((sum, d) => sum + d.subtotal, 0)
    const paid = Number(paid_amount)
    if (!Number.isFinite(paid) || paid < total) errors.paid_amount = 'Uang bayar kurang dari total'
    if (Object.keys(errors).length) return { ok: false, errors }

    const trx = {
      id: items.value.reduce((max, t) => Math.max(max, t.id), 0) + 1,
      invoice_no: makeInvoiceNo(items.value),
      cashier_id,
      customer_id,
      payment_method,
      total,
      paid_amount: paid,
      change_amount: paid - total,
      status: 'paid',
      created_at: new Date().toISOString(),
      items: detail,
    }
    items.value.push(trx)
    detail.forEach((d) => productStore.decreaseStock(d.product_id, d.qty))
    return { ok: true, data: trx }
  }

  return { items, sorted, totalRevenue, create }
})
