<template>
  <div class="checkout-page" data-aos="fade-up">
    <h2>結帳</h2>

    <div class="layout">
      <section class="form-area">
        <h3>收件與付款資訊</h3>
        <form @submit.prevent="submit">
          <div class="grid">
            <label>
              姓名
              <input v-model.trim="form.name" required />
            </label>
            <label>
              電話
              <input v-model.trim="form.phone" required />
            </label>
            <label class="col-2">
              地址
              <input v-model.trim="form.address" required />
            </label>
          </div>

          <div class="grid">
            <label>
              配送方式
              <select v-model="form.shipping">
                <option value="home">宅配</option>
                <option value="store">超商取貨</option>
              </select>
            </label>
            <label>
              付款方式
              <select v-model="form.payment">
                <option value="card">信用卡</option>
                <option value="cod">貨到付款</option>
              </select>
            </label>
          </div>

          <button type="submit" class="primary" :disabled="!canSubmit">
            送出訂單（模擬）
          </button>
        </form>
      </section>

      <aside class="summary">
        <h3>訂單摘要</h3>
        <ul>
          <li>小計：<strong>{{ subtotal }} 元</strong></li>
          <li>運費：<strong>{{ shipping }} 元</strong></li>
          <li v-if="discount > 0">折扣：<strong>-{{ discount }} 元</strong></li>
        </ul>
        <p class="total">應付金額：<strong>{{ total }} 元</strong></p>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/store/cart'
import { calcSubtotal, calcShipping, calcDiscount, calcTotal } from '@/composables/usePricing'

const router = useRouter()
const cart = useCartStore()

const form = ref({ name: '', phone: '', address: '', shipping: 'home', payment: 'card' })
const canSubmit = computed(() => cart.cartItems.length > 0 && form.value.name && form.value.phone && form.value.address)

const subtotal = computed(() => calcSubtotal(cart.cartItems))
const shipping = computed(() => calcShipping(subtotal.value, { base: 80, freeThreshold: 999 }))
const discount = computed(() => 0)
const total = computed(() => calcTotal({ subtotal: subtotal.value, shipping: shipping.value, discount: discount.value }))

function submit(){
  if(!canSubmit.value) return
  // 模擬下單：存到 localStorage 並清空購物車
  const id = `ORD-${Date.now().toString(36)}`
  const orders = JSON.parse(localStorage.getItem('orders')||'[]')
  orders.push({ id, items: cart.cartItems, form: form.value, total: total.value })
  localStorage.setItem('orders', JSON.stringify(orders))
  cart.cartItems = []
  router.push({ name: 'OrderSuccess', query: { id } })
}
</script>

<style scoped>
.checkout-page{ padding: 24px; }
.layout{ display: grid; gap: 24px; grid-template-columns: 1fr; }
.form-area{ background:#fff; border:1px solid #eee; border-radius:12px; padding:16px; }
.summary{ background:#fff; border:1px solid #eee; border-radius:12px; padding:16px; }
.grid{ display:grid; grid-template-columns: 1fr 1fr; gap:12px; }
.grid .col-2{ grid-column: span 2; }
input,select{ width:100%; padding:10px; border:1px solid #ddd; border-radius:8px; }
.primary{ margin-top:12px; padding:10px 14px; border:0; border-radius:8px; background:#111827; color:#fff; cursor:pointer; }
.total{ margin-top:8px; font-size:1.1rem; }
@media(min-width: 900px){ .layout{ grid-template-columns: 2fr 1fr; } }
</style>

