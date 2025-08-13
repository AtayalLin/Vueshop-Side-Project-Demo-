<template>
  <div class="orders-page" data-aos="fade-up">
    <h2>我的訂單</h2>
    <p v-if="orders.length === 0" class="empty">目前尚無任何訂單。</p>
    <ul v-else class="list">
      <li v-for="o in orders" :key="o.id" class="card" data-aos="fade-up">
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
        <div class="items">
          <h4>訂單內容</h4>
          <ul>
            <li v-for="it in o.items || []" :key="it.id">
              <span class="name">{{ it.name }}</span>
              <span class="meta">{{ it.price }} 元 × {{ it.quantity }}</span>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";

const orders = ref([]);

onMounted(() => {
  try {
    const raw = JSON.parse(localStorage.getItem("orders") || "[]");
    // 兼容舊資料，無 createdAt 時用現在時間
    orders.value = raw.map((o) => ({
      createdAt: o.createdAt || Date.now(),
      ...o,
    }));
  } catch (e) {
    orders.value = [];
  }
});

const formatDate = (ts) => new Date(ts).toLocaleString();
</script>
<style scoped>
.orders-page {
  padding: 24px;
}
.empty {
  color: #6b7280;
}
.list {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 12px;
}
.card {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 12px 16px;
}
.row {
  display: flex;
  justify-content: space-between;
  margin: 0.25rem 0;
}
.items {
  margin-top: 8px;
  border-top: 1px dashed #e5e7eb;
  padding-top: 8px;
}
.items h4 {
  margin: 0 0 6px;
  font-size: 1rem;
  color: #374151;
}
.items ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 6px;
}
.items li {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 0.95rem;
}
.items .name {
  font-weight: 600;
}
.items .meta {
  color: #6b7280;
}
</style>
