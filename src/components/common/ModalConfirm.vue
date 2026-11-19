<script setup>
import BaseButton from '@/components/common/BaseButton.vue'

defineProps({
  show: { type: Boolean, default: false },
  title: { type: String, default: 'Konfirmasi' },
  message: { type: String, default: 'Apakah Anda yakin?' },
})
const emit = defineEmits(['confirm', 'cancel'])
</script>

<template>
  <div v-if="show" class="overlay" @click.self="emit('cancel')">
    <div class="card dialog">
      <h2>{{ title }}</h2>
      <p>{{ message }}</p>
      <div class="row">
        <BaseButton variant="danger" label="Ya, lanjutkan" @click="emit('confirm')" />
        <BaseButton variant="ghost" label="Batal" @click="emit('cancel')" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed; inset: 0; background: rgba(0, 0, 0, 0.4);
  display: grid; place-items: center; z-index: 10;
}
.dialog { width: min(420px, 90vw); }
</style>
