import { defineStore } from "pinia";
import { ref } from "vue";

//宣告一個名為 "cart" 的 store，用來存放購物車的所有行為與資料。
export const useCartStore = defineStore("cart", () => {
  const cartItems = ref([]); //cartItems：儲存目前購物車中的所有商品，每筆商品應包含 id、name、price、quantity 等資訊。
  const MIN_QTY = 1;
  const MAX_QTY = 99; //MIN_QTY / MAX_QTY：限制每項商品的最小/最大購買數量，避免出錯。

  function addToCart(product) {
    const existing = cartItems.value.find((item) => item.id === product.id); //檢查商品是否已在購物車中
    if (existing) {
      existing.quantity = Math.min(MAX_QTY, existing.quantity + 1); //若已存在，則增加數量，但不超過 MAX_QTY
    } else {
      cartItems.value.push({ ...product, quantity: MIN_QTY }); //若不存在，則新增商品，初始數量為 MIN_QTY
    }
  }

  //移除購物車中的商品
  function removeFromCart(productId) {
    cartItems.value = cartItems.value.filter((item) => item.id !== productId);
  }

  //增加商品數量
  function increaseQuantity(productId) {
    const item = cartItems.value.find((item) => item.id === productId);
    if (item) item.quantity = Math.min(MAX_QTY, item.quantity + 1);
  }

  //減少商品數量
  function decreaseQuantity(productId) {
    const item = cartItems.value.find((item) => item.id === productId);
    if (!item) return;
    if (item.quantity > MIN_QTY) {
      item.quantity -= 1;
    } else {
      removeFromCart(productId);
    }
  }

  //將購物車的狀態與操作方法回傳，供組件使用
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
