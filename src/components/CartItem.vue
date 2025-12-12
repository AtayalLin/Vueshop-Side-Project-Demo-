<template>
  <div class="cart-item" data-aos="fade-up">
    <div class="item-left">
      <div v-if="imgBase" class="thumb">
        <img :src="`${imgDir}/${imgBase}-640.webp`" alt="" />
      </div>
      <div v-else class="emoji">{{ product.emoji }}</div>
      <div class="info">
        <h3>{{ product.name }}</h3>
        <p>單價：{{ product.price }} 元</p>
      </div>
    </div>
    <div class="item-right" style="color: black;">
      <div class="quantity-control" >
        <button @click="decrease" style="color: black;">－</button>
        <span>{{ quantity }}</span>
        <button @click="increase" style="color: black;">＋</button>
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
import { productImages } from "@/data/productImages";

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

const imgDir = `${import.meta.env.BASE_URL}images/products`;
const key = computed(() => (props.product?.name || "").toLowerCase());
const imgBase = computed(() => {
  if (key.value.includes("茶壺") || key.value.includes("teapot"))
    return productImages.teapot;
  if (
    key.value.includes("茶杯") ||
    key.value.includes("杯子") ||
    key.value.includes("杯") ||
    key.value.includes("teacup")
  )
    return productImages.teacup;
  if (key.value.includes("便當") || key.value.includes("bento"))
    return productImages.bento;
  if (key.value.includes("筷") || key.value.includes("chopstick"))
    return productImages.chopsticks;
  if (key.value.includes("燈籠") || key.value.includes("lantern"))
    return productImages.lantern;
  return "";
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
/* 行動裝置（≤480px）：置中卡片版型 */
.cart-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: #fff;
  padding: clamp(12px, 3.5vw, 20px);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 1.5rem;
  text-align: center;
  transition: transform 0.3s;
}
.cart-item:hover {
  transform: translateY(-4px);
}

.item-left {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}
.thumb img {
  width: 72px;
  height: 54px;
  object-fit: cover;
  border-radius: 8px;
  display: block;
}
.emoji {
  font-size: clamp(2.2rem, 8vw, 2.8rem);
}
.info h3 {
  margin: 0;
  font-size: clamp(16px, 4.5vw, 18px);
  line-height: 1.3;
}
.info p {
  margin: 0.25rem 0;
  color: #666;
}

.item-right {
  width: 100%;
}
.quantity-control {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 6px 0 8px;
}
.quantity-control button {
  min-width: 36px;
  height: 36px;
  padding: 0;
  font-size: clamp(14px, 3.8vw, 16px);
  background-color: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  cursor: pointer;
}
.quantity-control span {
  font-weight: 700;
  min-width: 1.75rem;
  text-align: center;
}
.item-right p {
  margin: 0.25rem 0 0.5rem;
}
.delete-btn {
  padding: 8px 16px;
  background-color: #f87171;
  color: #fff;
  border: 0;
  border-radius: 8px;
  cursor: pointer;
}
.delete-btn:hover {
  background-color: #ef4444;
}

/* 平板與桌面（≥600px）：左右排列，更好的視覺層次 */
@media (min-width: 600px) {
  .cart-item {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    text-align: left;
    padding: 20px 24px;
    gap: 20px;
  }
  .item-left {
    flex: 1 1 auto;
    justify-content: flex-start;
    gap: 16px;
  }
  .emoji {
    font-size: 3rem;
  }
  .info h3 {
    font-size: 1.2rem;
  }
  .info p {
    font-size: 0.95rem;
  }
  .item-right {
    flex: 0 0 auto;
    width: auto;
    text-align: right;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
  }
  .quantity-control {
    justify-content: flex-end;
    margin: 0;
  }
  .quantity-control button {
    min-width: 32px;
    height: 32px;
    font-size: 14px;
  }
  .item-right p {
    margin: 0;
    font-weight: 600;
  }
  .delete-btn {
    padding: 6px 12px;
    font-size: 0.9rem;
  }
}

/* 大桌面（≥1024px）：更寬鬆的間距與更大的觸控區域 */
@media (min-width: 1024px) {
  .cart-item {
    padding: 24px 28px;
    gap: 24px;
  }
  .item-left {
    gap: 20px;
  }
  .emoji {
    font-size: 3.5rem;
  }
  .info h3 {
    font-size: 1.35rem;
  }
  .quantity-control button {
    min-width: 36px;
    height: 36px;
    font-size: 15px;
  }
  .delete-btn {
    padding: 8px 16px;
    font-size: 1rem;
  }
}
</style>
