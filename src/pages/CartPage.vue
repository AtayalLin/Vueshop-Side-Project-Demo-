<template>
  <div class="cart-page">
    <h2 data-aos="fade-down">🛒 我的購物清單</h2>

    <p v-if="cartItems.length === 0">目前購物車是空的。</p>

    <div v-else class="cart-container">
      <div class="cart-content">
        <!-- 商品清單 -->
        <div class="cart-list">
          <CartItem
            v-for="item in cartItems"
            :key="item.id"
            :product="item"
            :quantity="item.quantity"
          />
        </div>

        <!-- 購買摘要 -->
        <div class="cart-summary">
          <h3>📝 購買清單</h3>
          <ul class="summary-list">
            <li v-for="item in cartItems" :key="item.id">
              <span>{{ item.name }}</span>
              <span>x {{ item.quantity }}</span>
            </li>
          </ul>

          <div class="total">
            <p>
              總金額：<strong>{{ total }} 元</strong>
            </p>
            <div class="actions">
              <button class="checkout-btn" @click="checkout">前往結帳</button>
              <router-link to="/checkout" class="checkout-btn alt"
                >使用新版結帳</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "../store/cart";
import { computed } from "vue";
import CartItem from "../components/CartItem.vue";

const cart = useCartStore();
const cartItems = computed(() => cart.cartItems);
// 計算總金額
const total = computed(() =>
  cart.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

// 結帳動作（目前僅提示）
const checkout = () => {
  if (cart.cartItems.length === 0) {
    if (confirm("購物車是空的，前往商品頁逛逛？")) {
      // 保持 SPA 體驗
      window.history.pushState({}, "", "/products");
      const navEvent = new PopStateEvent("popstate");
      dispatchEvent(navEvent);
    }
    return;
  }
  alert("🚀 模擬結帳流程開始！");
};
</script>

<style scoped>
.cart-page {
  padding: 2rem;
  text-align: center;
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}
.product-card {
  border: 1px solid #eaeaea;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.3s;
}
.product-card:hover {
  transform: translateY(-5px);
}
.emoji {
  font-size: 2rem;
}

/* 主容器 */
.cart-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
}

.cart-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* 購買摘要區塊 */
.cart-summary {
  background: #f9fafb;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  position: sticky;
  top: 2rem;
}

.cart-summary h3 {
  margin-bottom: 1rem;
  font-size: 1.2rem;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.5rem;
}

.summary-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem 0;
}

.summary-list li {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  color: #444;
  font-size: 0.95rem;
}

.total {
  margin-top: 1rem;
}
.actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.checkout-btn {
  display: block; /* 保證佔滿整行 */
  width: 100%;
  margin: 0;
  padding: 0.75rem;
  background-color: #111827;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  text-decoration: none; /* 移除 router-link 超連結底線 */
}
.checkout-btn.alt {
  background: #0b5;
}
.checkout-btn:hover {
  background-color: #374151;
}

/* 響應式 */
@media (max-width: 768px) {
  .cart-content {
    grid-template-columns: 1fr;
  }
}
</style>
