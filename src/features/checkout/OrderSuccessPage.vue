<template>
  <div class="success" data-aos="fade-up">
    <h2>下單成功 🎉</h2>
    <p>訂單編號：<strong>{{ orderId }}</strong></p>
    <router-link to="/products" class="btn">繼續逛逛</router-link>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const orderId = computed(() => route.query.id || '未知')
</script>
<style scoped>
.success{ padding:24px; text-align:center; }
.btn{ display:inline-block; margin-top:12px; padding:10px 14px; background:#111827; color:#fff; border-radius:8px; }
</style>

