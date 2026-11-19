<script setup>
import { reactive } from 'vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'

const props = defineProps({
  initial: { type: Object, default: null },
  categories: { type: Array, default: () => [] },
  errors: { type: Object, default: () => ({}) },
})
const emit = defineEmits(['submit', 'cancel'])

const form = reactive(
  props.initial
    ? { ...props.initial }
    : {
        name: '',
        category_id: props.categories[0]?.id ?? null,
        unit: 'pcs',
        buy_price: 0,
        sell_price: 0,
        stock: 0,
        min_stock: 5,
        is_active: true,
      },
)
</script>

<template>
  <form class="card grid" @submit.prevent="emit('submit', { ...form })">
    <h2>{{ initial ? 'Ubah Produk' : 'Tambah Produk' }}</h2>
    <BaseInput v-model="form.name" label="Nama produk" :error="errors.name" />
    <label class="select">
      <span class="label">Kategori</span>
      <select v-model.number="form.category_id">
        <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
      </select>
    </label>
    <BaseInput v-model="form.unit" label="Satuan (pcs, renteng, pak, dus)" />
    <BaseInput v-model="form.buy_price" label="Harga beli" type="number" :error="errors.buy_price" />
    <BaseInput v-model="form.sell_price" label="Harga jual" type="number" :error="errors.sell_price" />
    <BaseInput v-model="form.stock" label="Stok" type="number" :error="errors.stock" />
    <BaseInput v-model="form.min_stock" label="Stok minimum" type="number" />
    <div class="row">
      <BaseButton type="submit" label="Simpan" />
      <BaseButton variant="ghost" label="Batal" @click="emit('cancel')" />
    </div>
  </form>
</template>

<style scoped>
.select { display: flex; flex-direction: column; gap: 4px; }
.label { font-weight: 600; }
select { border: 1px solid var(--border); border-radius: var(--radius); padding: 8px 10px; font: inherit; }
</style>
