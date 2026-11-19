<script setup>
import BaseButton from '@/components/common/BaseButton.vue'
import { rupiah } from '@/utils/format'

defineProps({
  items: { type: Array, default: () => [] },
})
const emit = defineEmits(['increase', 'decrease', 'remove'])
</script>

<template>
  <div>
    <p v-if="items.length === 0" class="muted">Keranjang masih kosong</p>
    <div v-for="item in items" :key="item.product_id" class="line">
      <div>
        <strong>{{ item.name }}</strong>
        <div class="muted">{{ rupiah(item.price) }} x {{ item.qty }} = {{ rupiah(item.price * item.qty) }}</div>
      </div>
      <div class="row">
        <BaseButton variant="ghost" label="-" @click="emit('decrease', item.product_id)" />
        <BaseButton variant="ghost" label="+" @click="emit('increase', item.product_id)" />
        <BaseButton variant="danger" label="Hapus" @click="emit('remove', item.product_id)" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.line {
  display: flex; justify-content: space-between; align-items: center; gap: 8px;
  padding: 8px 0; border-bottom: 1px solid var(--border);
}
</style>
