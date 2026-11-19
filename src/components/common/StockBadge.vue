<script setup>
import { computed } from 'vue'

const props = defineProps({
  stock: { type: Number, required: true },
  minStock: { type: Number, default: 0 },
})

const status = computed(() => {
  if (props.stock <= 0) return { text: 'Habis', css: 'danger' }
  if (props.stock <= props.minStock) return { text: `Menipis (${props.stock})`, css: 'warning' }
  return { text: `Tersedia (${props.stock})`, css: 'success' }
})
</script>

<template>
  <span :class="['badge', `badge--${status.css}`]">{{ status.text }}</span>
</template>

<style scoped>
.badge { padding: 2px 8px; border-radius: 999px; font-size: 12px; color: #fff; }
.badge--success { background: var(--success); }
.badge--warning { background: var(--warning); }
.badge--danger { background: var(--danger); }
</style>
