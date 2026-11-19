<script setup>
import { ref, computed } from 'vue'
import SearchBar from '@/components/common/SearchBar.vue'
import ProductCard from '@/components/features/ProductCard.vue'
import { useProductStore } from '@/stores/products'
import { useCategoryStore } from '@/stores/categories'

const products = useProductStore()
const categories = useCategoryStore()

const keyword = ref('')
const categoryId = ref(0)

const visible = computed(() =>
  products.activeItems.filter((p) => {
    const matchName = p.name.toLowerCase().includes(keyword.value.toLowerCase())
    const matchCategory = categoryId.value === 0 || p.category_id === categoryId.value
    return matchName && matchCategory
  }),
)
</script>

<template>
  <h1>Katalog Produk</h1>
  <div class="row" style="margin-bottom: 12px">
    <SearchBar v-model="keyword" placeholder="Cari produk" />
    <select v-model.number="categoryId">
      <option :value="0">Semua kategori</option>
      <option v-for="c in categories.items" :key="c.id" :value="c.id">{{ c.name }}</option>
    </select>
  </div>
  <div class="grid grid--cards">
    <ProductCard v-for="p in visible" :key="p.id" :product="p" :show-add="false" />
  </div>
</template>
