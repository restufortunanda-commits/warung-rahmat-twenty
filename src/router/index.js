import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { ROLE_HOME } from '@/constants/roles'

const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { guestOnly: true },
  },
  {
    path: '/admin',
    component: () => import('@/layouts/AdminLayout.vue'),
    meta: { roles: ['owner'] },
    children: [
      { path: 'dashboard', name: 'dashboard', component: () => import('@/views/DashboardView.vue') },
      { path: 'products', name: 'products', component: () => import('@/views/ProductsView.vue') },
      {
        path: 'transactions',
        name: 'admin-transactions',
        component: () => import('@/views/TransactionsView.vue'),
      },
    ],
  },
  {
    path: '/kasir',
    component: () => import('@/layouts/CashierLayout.vue'),
    meta: { roles: ['cashier'] },
    children: [
      { path: 'pos', name: 'pos', component: () => import('@/views/PosView.vue') },
      {
        path: 'history',
        name: 'cashier-history',
        component: () => import('@/views/TransactionsView.vue'),
      },
    ],
  },
  {
    path: '/katalog',
    component: () => import('@/layouts/PublicLayout.vue'),
    meta: { roles: ['customer'] },
    children: [{ path: '', name: 'catalog', component: () => import('@/views/CatalogView.vue') }],
  },
  { path: '/:pathMatch(.*)*', redirect: '/login' },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// Route guard: membatasi akses halaman berdasarkan role
router.beforeEach((to) => {
  const auth = useAuthStore()
  const guarded = to.matched.find((record) => record.meta.roles)

  if (guarded) {
    if (!auth.isLoggedIn) return { name: 'login' }
    if (!guarded.meta.roles.includes(auth.role)) return ROLE_HOME[auth.role]
  }
  if (to.meta.guestOnly && auth.isLoggedIn) return ROLE_HOME[auth.role]
})

export default router