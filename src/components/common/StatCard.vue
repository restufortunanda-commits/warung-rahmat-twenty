<script setup>
defineProps({
  title: { type: String, required: true },
  value: { type: [String, Number], required: true },
})
</script>

<template>
  <div class="card">
    <div class="muted">{{ title }}</div>
    <div class="value">{{ value }}</div>
  </div>
</template>

<style scoped>
.value { font-size: 24px; font-weight: 700; margin-top: 4px; }
</style>
