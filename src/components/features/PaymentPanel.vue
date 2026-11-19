<script setup>
import { ref, computed } from 'vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import { rupiah } from '@/utils/format'

const props = defineProps({
  total: { type: Number, default: 0 },
  error: { type: String, default: '' },
})
const emit = defineEmits(['pay'])

const paid = ref('')
const change = computed(() => Math.max(0, Number(paid.value || 0) - props.total))

function submit() {
  emit('pay', Number(paid.value || 0))
}
</script>

<template>
  <div class="grid">
    <div><span class="muted">Total</span><h2>{{ rupiah(total) }}</h2></div>
    <BaseInput v-model="paid" label="Uang diterima" type="number" :error="error" />
    <div>Kembalian: <strong>{{ rupiah(change) }}</strong></div>
    <BaseButton label="Simpan Transaksi" :disabled="total === 0" @click="submit" />
  </div>
</template>
