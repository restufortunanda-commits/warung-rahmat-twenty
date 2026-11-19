<script setup>
import BaseButton from '@/components/common/BaseButton.vue'
import StockBadge from '@/components/common/StockBadge.vue'
import { rupiah } from '@/utils/format'

defineProps({
  product: { type: Object, required: true },
  showAdd: { type: Boolean, default: true },
})
const emit = defineEmits(['add'])
</script>

<template>
  <div class="card product">
    <strong>{{ product.name }}</strong>
    <div class="muted">per {{ product.unit }}</div>
    <div class="price">{{ rupiah(product.sell_price) }}</div>
    <StockBadge :stock="product.stock" :min-stock="product.min_stock" />
    <BaseButton
      v-if="showAdd"
      label="Tambah"
      :disabled="product.stock < 1"
      @click="emit('add', product)"
    />
  </div>
</template>

<style scoped>
.product { display: flex; flex-direction: column; gap: 6px; }
.price { font-size: 16px; font-weight: 700; color: var(--primary); }
</style>
