<template>
  <div class="product-card" :data-aos="props.aos" :data-aos-delay="props.delay">
    <div class="emoji">{{ props.product.emoji }}</div>
    <h3>{{ props.product.name }}</h3>
    <p>{{ props.product.price }} 元</p>
    <button @click="handleAddToCart">加入購物車</button>
  </div>
</template>

<script setup>
import { useCartStore } from "../store/cart";
import { useToast } from "vue-toastification";

const props = defineProps({
  product: Object,
  aos: { type: String, default: "fade-up" },
  delay: { type: Number, default: 0 },
});

const cart = useCartStore();
const toast = useToast();

const handleAddToCart = () => {
  try {
    if (!props.product || !props.product.id) {
      toast.error("商品資料異常，無法加入購物車");
      console.error("product is invalid:", props.product);
      return;
    }
    cart.addToCart(props.product);
    toast.success(`✅ 商品「${props.product.name}」已加入購物車`, {
      timeout: 3000,
      position: "top-right",
    });
    console.log("加入購物車成功", props.product);
  } catch (err) {
    toast.error("加入購物車失敗");
    console.error("加入購物車錯誤:", err);
  }
};
</script>

<style scoped>
.product-card {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
}
.emoji {
  font-size: 3rem;
}
button {
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background: #111827;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.2s ease, background 0.2s ease;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
}
button:hover {
  background: #0b1220;
  transform: translateY(-1px);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.16);
}
</style>
