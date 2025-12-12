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

          <!-- 總金額 -->
          <div class="summary-total">
            <p>總金額：<strong>{{ total }} 元</strong></p>
          </div>

          <!-- 新版排版的兩個結帳按鈕 -->
          <div class="summary-actions">
            <button class="btn primary" @click="checkout">
             前往結帳
            </button>

            <router-link to="/checkout" class="btn secondary">
            使用新版結帳
            </router-link>
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
/* 整體排版同原本，不動動能 */
.cart-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
}

/* 購買摘要卡片 */
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
  font-size: 0.95rem;
  color: #444;
}

.summary-total {
  margin: 1rem 0;
  font-size: 1rem;
}

/* === 新結帳按鈕統一樣式 === */
.summary-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* 🔥 讓 button 和 router-link 完全一樣 */
.btn,
.btn:visited,
.btn:link {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 0.9rem;
  border-radius: 10px;

  font-size: 1rem;
  font-weight: 700;
  font-family: inherit;
  line-height: 1; /* 🔥 超重要：避免 router-link 內建行高 */

  cursor: pointer;
  text-decoration: none;
  border: none;

  box-sizing: border-box; /* 🔥 防止不同元素呈現差異 */
}

/* 主按鈕 */
.btn.primary {
  background: #0d1223;
  color: white;
}

/* 次按鈕 */
.btn.secondary {
  background: #07c157;
  color: white;
}

.btn.primary:hover {
  background: #18203b;
}

.btn.secondary:hover {
  background: #06a84c;
}


/* 響應式 */
@media (max-width: 768px) {
  .cart-content {
    grid-template-columns: 1fr;
  }
}

</style>
