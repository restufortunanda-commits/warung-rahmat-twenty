import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import seed from '@/seed/categories.json'
import { loadOrSeed, saveData } from '@/services/storage'

const KEY = 'rahmat_categories'

export const useCategoryStore = defineStore('categories', () => {
  const items = ref(loadOrSeed(KEY, seed))
  watch(items, (value) => saveData(KEY, value), { deep: true })

  const nameById = computed(() => Object.fromEntries(items.value.map((c) => [c.id, c.name])))

  return { items, nameById }
})
