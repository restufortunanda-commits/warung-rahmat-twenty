<script setup>
import { ref, computed } from 'vue'
import SearchBar from '@/components/common/SearchBar.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import DataTable from '@/components/common/DataTable.vue'
import StockBadge from '@/components/common/StockBadge.vue'
import ModalConfirm from '@/components/common/ModalConfirm.vue'
import ProductForm from '@/components/features/ProductForm.vue'
import { useProductStore } from '@/stores/products'
import { useCategoryStore } from '@/stores/categories'
import { rupiah } from '@/utils/format'

const products = useProductStore()
const categories = useCategoryStore()

const keyword = ref('')
const categoryId = ref(0)
const showForm = ref(false)
const editing = ref(null)
const formErrors = ref({})
const deleteTarget = ref(null)

const columns = [
  { key: 'name', label: 'Nama' },
  { key: 'category_id', label: 'Kategori' },
  { key: 'unit', label: 'Satuan' },
  { key: 'sell_price', label: 'Harga Jual' },
  { key: 'stock', label: 'Stok' },
]

const filtered = computed(() =>
  products.items.filter((p) => {
    const matchName = p.name.toLowerCase().includes(keyword.value.toLowerCase())
    const matchCategory = categoryId.value === 0 || p.category_id === categoryId.value
    return matchName && matchCategory
  }),
)

function openAdd() {
  editing.value = null
  formErrors.value = {}
  showForm.value = true
}

function openEdit(product) {
  editing.value = product
  formErrors.value = {}
  showForm.value = true
}

function save(data) {
  const result = editing.value ? products.update(editing.value.id, data) : products.add(data)
  if (!result.ok) {
    formErrors.value = result.errors
    return
  }
  showForm.value = false
}

function confirmDelete() {
  products.remove(deleteTarget.value.id)
  deleteTarget.value = null
}
</script>

<template>
  <h1>Kelola Produk</h1>
  <div class="row" style="margin-bottom: 12px">
    <SearchBar v-model="keyword" placeholder="Cari nama produk" />
    <select v-model.number="categoryId">
      <option :value="0">Semua kategori</option>
      <option v-for="c in categories.items" :key="c.id" :value="c.id">{{ c.name }}</option>
    </select>
    <BaseButton label="+ Tambah Produk" @click="openAdd" />
  </div>

  <ProductForm
    v-if="showForm"
    :key="editing?.id ?? 'new'"
    :initial="editing"
    :categories="categories.items"
    :errors="formErrors"
    @submit="save"
    @cancel="showForm = false"
  />

  <DataTable :columns="columns" :rows="filtered">
    <template #cell-category_id="{ value }">{{ categories.nameById[value] }}</template>
    <template #cell-sell_price="{ value }">{{ rupiah(value) }}</template>
    <template #cell-stock="{ row }">
      <StockBadge :stock="row.stock" :min-stock="row.min_stock" />
    </template>
    <template #actions="{ row }">
      <div class="row">
        <BaseButton variant="secondary" label="Ubah" @click="openEdit(row)" />
        <BaseButton variant="danger" label="Hapus" @click="deleteTarget = row" />
      </div>
    </template>
  </DataTable>

  <ModalConfirm
    :show="deleteTarget !== null"
    title="Hapus produk"
    :message="`Hapus ${deleteTarget?.name}? Tindakan ini tidak dapat dibatalkan.`"
    @confirm="confirmDelete"
    @cancel="deleteTarget = null"
  />
</template>
