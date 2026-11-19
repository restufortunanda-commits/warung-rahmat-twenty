<script setup>
const model = defineModel({ type: String, default: '' })
defineProps({ placeholder: { type: String, default: 'Cari...' } })
</script>

<template>
  <input v-model="model" class="search" type="search" :placeholder="placeholder" />
</template>

<style scoped>
.search {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 8px 10px;
  font: inherit;
  min-width: 220px;
}
</style>
