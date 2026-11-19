<script setup>
import { ref, computed } from 'vue'
import DataTable from '@/components/common/DataTable.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import TransactionDetail from '@/components/features/TransactionDetail.vue'
import { useTransactionStore } from '@/stores/transactions'
import { useAuthStore } from '@/stores/auth'
import { rupiah, formatDate } from '@/utils/format'

const transactions = useTransactionStore()
const auth = useAuthStore()
const selected = ref(null)

const columns = [
  { key: 'invoice_no', label: 'No. Nota' },
  { key: 'created_at', label: 'Waktu' },
  { key: 'total', label: 'Total' },
  { key: 'status', label: 'Status' },
]

// Kasir hanya melihat transaksinya sendiri, pemilik melihat semua
const rows = computed(() =>
  auth.role === 'cashier'
    ? transactions.sorted.filter((t) => t.cashier_id === auth.currentUser.id)
    : transactions.sorted,
)
</script>

<template>
  <h1>Riwayat Transaksi</h1>
  <DataTable :columns="columns" :rows="rows">
    <template #cell-created_at="{ value }">{{ formatDate(value) }}</template>
    <template #cell-total="{ value }">{{ rupiah(value) }}</template>
    <template #actions="{ row }">
      <BaseButton variant="ghost" label="Detail" @click="selected = row" />
    </template>
  </DataTable>
  <TransactionDetail v-if="selected" :transaction="selected" style="margin-top: 16px" />
</template>
