<template>
  <div class="product-card">
    <div class="emoji">{{ product.emoji }}</div>
    <h3>{{ product.name }}</h3>
    <p>{{ product.price }} 元</p>

    <!-- 顯示數量 -->
    <p v-if="quantity !== undefined">數量：{{ quantity }}</p>

    <!-- 顯示按鈕（可選）-->
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  product: Object,
  quantity: Number, // 可選參數
});
</script>

<style scoped>
.product-card {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
  min-width: 240px;
}
.emoji {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}
</style>
