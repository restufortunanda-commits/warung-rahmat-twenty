<script setup>
import StatCard from '@/components/common/StatCard.vue'
import DataTable from '@/components/common/DataTable.vue'
import StockBadge from '@/components/common/StockBadge.vue'
import { useProductStore } from '@/stores/products'
import { useTransactionStore } from '@/stores/transactions'
import { rupiah } from '@/utils/format'

const products = useProductStore()
const transactions = useTransactionStore()

const lowColumns = [
  { key: 'name', label: 'Produk' },
  { key: 'stock', label: 'Stok' },
  { key: 'min_stock', label: 'Minimum' },
]
</script>

<template>
  <h1>Dashboard Pemilik</h1>
  <div class="grid grid--4">
    <StatCard title="Total Pendapatan" :value="rupiah(transactions.totalRevenue)" />
    <StatCard title="Jumlah Transaksi" :value="transactions.items.length" />
    <StatCard title="Jumlah Produk Aktif" :value="products.activeItems.length" />
    <StatCard title="Stok Menipis" :value="products.lowStock.length" />
  </div>
  <h2 style="margin-top: 24px">Produk dengan stok menipis</h2>
  <DataTable :columns="lowColumns" :rows="products.lowStock" empty-text="Semua stok aman">
    <template #cell-stock="{ row }">
      <StockBadge :stock="row.stock" :min-stock="row.min_stock" />
    </template>
  </DataTable>
</template>
