<script setup>
import { RouterView, useRouter } from 'vue-router'
import NavBar from '@/components/common/NavBar.vue'
import { SHOP_NAME } from '@/constants/shop'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

const links = [
  { to: '/kasir/pos', label: 'Kasir' },
  { to: '/kasir/history', label: 'Riwayat' },
]

function logout() {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <NavBar :title="`${SHOP_NAME} - Kasir`" :links="links" :user-name="auth.currentUser?.name" @logout="logout" />
  <main class="page"><RouterView /></main>
</template>
