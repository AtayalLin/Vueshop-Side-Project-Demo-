import { defineStore } from "pinia";
import { ref } from "vue";

export const useCartStore = defineStore("cart", () => {
  const cartItems = ref([]);
  const MIN_QTY = 1;
  const MAX_QTY = 99;

  function addToCart(product) {
    const existing = cartItems.value.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity = Math.min(MAX_QTY, existing.quantity + 1);
    } else {
      cartItems.value.push({ ...product, quantity: MIN_QTY });
    }
  }

  function removeFromCart(productId) {
    cartItems.value = cartItems.value.filter((item) => item.id !== productId);
  }

  function increaseQuantity(productId) {
    const item = cartItems.value.find((item) => item.id === productId);
    if (item) item.quantity = Math.min(MAX_QTY, item.quantity + 1);
  }

  function decreaseQuantity(productId) {
    const item = cartItems.value.find((item) => item.id === productId);
    if (!item) return;
    if (item.quantity > MIN_QTY) {
      item.quantity -= 1;
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
    MIN_QTY,
    MAX_QTY,
  };
});
