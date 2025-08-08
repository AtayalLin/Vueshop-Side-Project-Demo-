import { defineStore } from "pinia";
import { ref } from "vue";

export const useCartStore = defineStore("cart", () => {
  const cartItems = ref([]);

  function addToCart(product) {
    const existing = cartItems.value.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      cartItems.value.push({ ...product, quantity: 1 });
    }
  }

  function removeFromCart(productId) {
    cartItems.value = cartItems.value.filter((item) => item.id !== productId);
  }

  // 新增：增加數量
  function increaseQuantity(productId) {
    const item = cartItems.value.find((item) => item.id === productId);
    if (item) item.quantity++;
  }

  // 新增：減少數量（數量為 0 時自動移除）
  function decreaseQuantity(productId) {
    const item = cartItems.value.find((item) => item.id === productId);
    if (item && item.quantity > 1) {
      item.quantity--;
    } else {
      removeFromCart(productId);
    }
  }

  return {
    cartItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  };
});
