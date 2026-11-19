<script setup>
defineProps({
  modelValue: { type: [String, Number], default: '' },
  label: { type: String, default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  error: { type: String, default: '' },
})
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <label class="field">
    <span v-if="label" class="field__label">{{ label }}</span>
    <input
      class="field__input"
      :class="{ 'field__input--error': error }"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      @input="emit('update:modelValue', $event.target.value)"
    />
    <span v-if="error" class="error-text">{{ error }}</span>
  </label>
</template>

<style scoped>
.field { display: flex; flex-direction: column; gap: 4px; }
.field__label { font-weight: 600; }
.field__input {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 8px 10px;
  font: inherit;
}
.field__input--error { border-color: var(--danger); }
</style>
