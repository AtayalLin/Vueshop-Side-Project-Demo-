<template>
  <div class="cart-item" data-aos="fade-up">
    <div class="item-left">
      <div class="emoji">{{ product.emoji }}</div>
      <div class="info">
        <h3>{{ product.name }}</h3>
        <p>單價：{{ product.price }} 元</p>
      </div>
    </div>
    <div class="item-right">
      <div class="quantity-control">
        <button @click="decrease">－</button>
        <span>{{ quantity }}</span>
        <button @click="increase">＋</button>
      </div>
      <p>小計：{{ subtotal }} 元</p>
      <button class="delete-btn" @click="remove">移除</button>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "../store/cart";
import { computed } from "vue";
import { useToast } from "vue-toastification";

// ✅ 接收 props 並強制要求存在
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const cart = useCartStore();
const toast = useToast();

const subtotal = computed(() => props.product.price * props.quantity);

// ➕ 增加數量
const increase = () => {
  if (!props.product?.id) return;
  cart.increaseQuantity(props.product.id);
};

// ➖ 減少數量（若 =1 再按就移除）
const decrease = () => {
  if (!props.product?.id) return;
  cart.decreaseQuantity(props.product.id);
};

// ❌ 移除商品
const remove = () => {
  if (!props.product?.id) return;
  cart.removeFromCart(props.product.id);
  toast.info(`已移除「${props.product.name}」`, { timeout: 2000 });
};
</script>

<style scoped>
.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 1.5rem;
  transition: transform 0.3s;
}
.cart-item:hover {
  transform: translateY(-4px);
}
.item-left {
  display: flex;
  align-items: center;
}
.emoji {
  font-size: 3rem;
  margin-right: 1rem;
}
.info h3 {
  margin: 0;
  font-size: 1.25rem;
}
.info p {
  margin: 0.25rem 0;
  color: #666;
}
.item-right {
  text-align: right;
}
.quantity-control {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
.quantity-control button {
  padding: 0.3rem 0.75rem;
  font-size: 1rem;
  background-color: #f3f4f6;
  border: 1px solid #ccc;
  border-radius: 6px;
  cursor: pointer;
}
.quantity-control span {
  font-weight: bold;
  min-width: 1.5rem;
  text-align: center;
}
.delete-btn {
  margin-top: 0.5rem;
  padding: 0.25rem 0.75rem;
  background-color: #f87171;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.delete-btn:hover {
  background-color: #ef4444;
}
</style>
