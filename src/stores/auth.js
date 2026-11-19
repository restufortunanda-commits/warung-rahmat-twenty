import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import usersSeed from '@/seed/users.json'
import { loadOrSeed } from '@/services/storage'

const SESSION_KEY = 'rahmat_session'

function readSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null')
  } catch {
    return null
  }
}

export const useAuthStore = defineStore('auth', () => {
  const users = ref(loadOrSeed('rahmat_users', usersSeed))
  const currentUser = ref(readSession())

  const isLoggedIn = computed(() => currentUser.value !== null)
  const role = computed(() => currentUser.value?.role ?? null)

  function login(username, password) {
    if (!username?.trim() || !password) {
      return { ok: false, message: 'Username dan kata sandi wajib diisi' }
    }
    const found = users.value.find((u) => u.username === username && u.password === password)
    if (!found) return { ok: false, message: 'Username atau kata sandi salah' }
    const { password: _hidden, ...safeUser } = found
    currentUser.value = safeUser
    localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser))
    return { ok: true, user: safeUser }
  }

  function logout() {
    currentUser.value = null
    localStorage.removeItem(SESSION_KEY)
  }

  return { users, currentUser, isLoggedIn, role, login, logout }
})
