<template>
  <div class="orders-page" data-aos="fade-up">
    <h2>我的訂單</h2>
    <p v-if="orders.length === 0" class="empty">目前尚無任何訂單。</p>
    <ul v-else class="list">
      <li v-for="o in orders" :key="o.id" class="card">
        <div class="row">
          <strong>訂單編號</strong>
          <span>{{ o.id }}</span>
        </div>
        <div class="row">
          <span>建立時間</span>
          <span>{{ formatDate(o.createdAt) }}</span>
        </div>
        <div class="row">
          <span>品項數</span>
          <span>{{ o.items?.length || 0 }}</span>
        </div>
        <div class="row">
          <span>金額</span>
          <span>{{ o.total }} 元</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'

const orders = ref([])

onMounted(() => {
  try {
    const raw = JSON.parse(localStorage.getItem('orders') || '[]')
    // 新增 createdAt 欄位兼容舊資料
    orders.value = raw.map(o => ({ createdAt: Date.now(), ...o }))
  } catch (e) {
    orders.value = []
  }
})

const formatDate = (ts) => new Date(ts).toLocaleString()
</script>
<style scoped>
.orders-page{ padding:24px; }
.empty{ color:#6b7280; }
.list{ list-style:none; padding:0; display:grid; gap:12px; }
.card{ background:#fff; border:1px solid #eee; border-radius:12px; padding:12px 16px; }
.row{ display:flex; justify-content:space-between; margin:.25rem 0; }
</style>

