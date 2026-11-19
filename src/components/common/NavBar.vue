<script setup>
import { RouterLink } from 'vue-router'
import BaseButton from '@/components/common/BaseButton.vue'

defineProps({
  title: { type: String, required: true },
  links: { type: Array, default: () => [] }, // [{ to, label }]
  userName: { type: String, default: '' },
})
const emit = defineEmits(['logout'])
</script>

<template>
  <header class="nav">
    <strong class="nav__title">{{ title }}</strong>
    <nav class="nav__links">
      <RouterLink v-for="link in links" :key="link.to" :to="link.to">{{ link.label }}</RouterLink>
    </nav>
    <div class="row">
      <span class="muted">{{ userName }}</span>
      <BaseButton variant="ghost" label="Keluar" @click="emit('logout')" />
    </div>
  </header>
</template>

<style scoped>
.nav {
  display: flex; align-items: center; gap: var(--gap); flex-wrap: wrap;
  padding: 10px var(--gap); background: var(--primary); color: #fff;
}
.nav__title { font-size: 16px; }
.nav__links { display: flex; gap: 12px; flex: 1; }
.nav__links a { color: #e8f5e9; text-decoration: none; padding: 4px 8px; border-radius: 6px; }
.nav__links a.router-link-active { background: rgba(255, 255, 255, 0.2); color: #fff; }
.muted { color: #e8f5e9; }
</style>
