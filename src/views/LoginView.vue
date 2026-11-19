<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import { useAuthStore } from '@/stores/auth'
import { ROLE_HOME } from '@/constants/roles'
import { SHOP_NAME } from '@/constants/shop'

const auth = useAuthStore()
const router = useRouter()

const username = ref('')
const password = ref('')
const message = ref('')

function submit() {
  const result = auth.login(username.value, password.value)
  if (!result.ok) {
    message.value = result.message
    return
  }
  router.push(ROLE_HOME[result.user.role])
}
</script>

<template>
  <main class="page login">
    <form class="card grid" @submit.prevent="submit">
      <h1>{{ SHOP_NAME }}</h1>
      <p class="muted">Masuk ke sistem</p>
      <BaseInput v-model="username" label="Username" />
      <BaseInput v-model="password" label="Kata sandi" type="password" />
      <p v-if="message" class="error-text">{{ message }}</p>
      <BaseButton type="submit" label="Masuk" />
      <p class="muted">
        Akun contoh: pemilik / kasir1 / pelanggan1 (kata sandi 123456)
      </p>
    </form>
  </main>
</template>

<style scoped>
.login { max-width: 380px; margin-top: 10vh; }
</style>
