<script setup>
import { ref, computed } from 'vue'
import SearchBar from '@/components/common/SearchBar.vue'
import ProductCard from '@/components/features/ProductCard.vue'
import CartList from '@/components/features/CartList.vue'
import PaymentPanel from '@/components/features/PaymentPanel.vue'
import TransactionDetail from '@/components/features/TransactionDetail.vue'
import { useProductStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'
import { useTransactionStore } from '@/stores/transactions'

const products = useProductStore()
const cart = useCartStore()
const auth = useAuthStore()
const transactions = useTransactionStore()

const keyword = ref('')
const payError = ref('')
const lastTransaction = ref(null)

const visible = computed(() =>
  products.activeItems.filter((p) => p.name.toLowerCase().includes(keyword.value.toLowerCase())),
)

function pay(paidAmount) {
  payError.value = ''
  const result = transactions.create({
    cashier_id: auth.currentUser.id,
    paid_amount: paidAmount,
    lines: cart.items.map((i) => ({ ...i })),
  })
  if (!result.ok) {
    payError.value = result.errors.paid_amount ?? result.errors.items
    return
  }
  lastTransaction.value = result.data
  cart.clear()
}
</script>

<template>
  <h1>Kasir</h1>
  <div class="layout">
    <section>
      <SearchBar v-model="keyword" placeholder="Cari produk" />
      <div class="grid grid--cards" style="margin-top: 12px">
        <ProductCard v-for="p in visible" :key="p.id" :product="p" @add="cart.add" />
      </div>
    </section>
    <aside class="card">
      <h2>Keranjang</h2>
      <CartList
        :items="cart.items"
        @increase="cart.increase"
        @decrease="cart.decrease"
        @remove="cart.remove"
      />
      <PaymentPanel :total="cart.total" :error="payError" @pay="pay" />
    </aside>
  </div>
  <TransactionDetail v-if="lastTransaction" :transaction="lastTransaction" style="margin-top: 16px" />
</template>

<style scoped>
.layout { display: grid; grid-template-columns: 2fr 1fr; gap: var(--gap); align-items: start; }
@media (max-width: 800px) { .layout { grid-template-columns: 1fr; } }
</style>
