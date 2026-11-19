<script setup>
defineProps({
  label: { type: String, default: '' },
  variant: { type: String, default: 'primary' }, // primary | secondary | danger | ghost
  type: { type: String, default: 'button' },
  disabled: { type: Boolean, default: false },
})
</script>

<template>
  <button :type="type" :disabled="disabled" :class="['btn', `btn--${variant}`]">
    <slot>{{ label }}</slot>
  </button>
</template>

<style scoped>
.btn {
  border: 1px solid transparent;
  border-radius: var(--radius);
  padding: 8px 14px;
  font: inherit;
  cursor: pointer;
}
.btn:disabled { opacity: 0.5; cursor: not-allowed; }
.btn--primary { background: var(--primary); color: #fff; }
.btn--secondary { background: var(--secondary); color: #212121; }
.btn--danger { background: var(--danger); color: #fff; }
.btn--ghost { background: #fff; border-color: var(--border); color: var(--text); }
</style>
