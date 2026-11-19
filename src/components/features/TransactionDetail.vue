<script setup>
import DataTable from '@/components/common/DataTable.vue'
import { rupiah, formatDate } from '@/utils/format'

defineProps({
  transaction: { type: Object, required: true },
})

const columns = [
  { key: 'name', label: 'Barang' },
  { key: 'qty', label: 'Qty' },
  { key: 'price', label: 'Harga' },
  { key: 'subtotal', label: 'Subtotal' },
]
</script>

<template>
  <div class="card">
    <h2>Nota {{ transaction.invoice_no }}</h2>
    <p class="muted">{{ formatDate(transaction.created_at) }} | {{ transaction.payment_method }}</p>
    <DataTable :columns="columns" :rows="transaction.items.map((i, n) => ({ ...i, id: n }))">
      <template #cell-price="{ value }">{{ rupiah(value) }}</template>
      <template #cell-subtotal="{ value }">{{ rupiah(value) }}</template>
    </DataTable>
    <p>
      Total <strong>{{ rupiah(transaction.total) }}</strong> | Bayar {{ rupiah(transaction.paid_amount) }}
      | Kembali {{ rupiah(transaction.change_amount) }}
    </p>
  </div>
</template>
