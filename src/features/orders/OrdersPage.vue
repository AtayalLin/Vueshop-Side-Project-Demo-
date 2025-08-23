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
            <li v-for="it in o.items || []" :key="it.id" class="order-item">
              <div class="thumb" v-if="resolveImage(it)">
                <img :src="resolveImage(it)" alt="" />
              </div>
              <div v-else class="emoji">{{ it.emoji }}</div>
              <div class="info">
                <span class="name">{{ it.name }}</span>
                <span class="meta">{{ it.price }} 元 × {{ it.quantity }}</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="actions">
          <button class="btn-danger" @click="cancelOrder(o.id)">
            取消訂單
          </button>
        </div>
      </li>
    </ul>

    <!-- 浮動通知 -->
    <transition name="toast">
      <div class="toast" v-if="toastMsg">{{ toastMsg }}</div>
    </transition>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { listOrders, removeOrder } from "@/services/ordersService";
import { productImages } from "@/data/productImages";

const orders = ref([]);
const toastMsg = ref("");
let toastTimer = null;

onMounted(() => {
  orders.value = listOrders();
});

function cancelOrder(id) {
  removeOrder(id);
  orders.value = listOrders();
  showToast("已取消並移除該筆訂單");
}

function showToast(msg) {
  toastMsg.value = msg;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (toastMsg.value = ""), 2200);
}

const formatDate = (ts) => new Date(ts).toLocaleString();

function resolveImage(item) {
  const name = (item?.name || "").toLowerCase();
  const base = `${import.meta.env.BASE_URL}images/products`;
  if (name.includes("茶壺") || name.includes("teapot"))
    return `${base}/${productImages.teapot}-640.webp`;
  if (
    name.includes("茶杯") ||
    name.includes("杯子") ||
    name.includes("杯") ||
    name.includes("teacup")
  )
    return `${base}/${productImages.teacup}-640.webp`;
  if (name.includes("便當") || name.includes("bento"))
    return `${base}/${productImages.bento}-640.webp`;
  if (name.includes("筷") || name.includes("chopstick"))
    return `${base}/${productImages.chopsticks}-640.webp`;
  if (name.includes("燈籠") || name.includes("lantern"))
    return `${base}/${productImages.lantern}-640.webp`;
  return "";
}
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
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-size: 0.95rem;
}
.order-item .thumb img {
  width: 72px;
  height: 54px;
  object-fit: cover;
  border-radius: 8px;
  display: block;
}
.order-item .emoji {
  font-size: 1.5rem;
}
.items .name {
  font-weight: 600;
}
.items .meta {
  color: #6b7280;
}
.actions {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}
.btn-danger {
  background: #ef4444;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 999px;
  box-shadow: 0 8px 20px rgba(239, 68, 68, 0.35);
  transform: translateY(0);
  transition: transform 0.12s ease, box-shadow 0.2s ease;
}
.btn-danger:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(239, 68, 68, 0.45);
}
.toast {
  position: fixed;
  top: 18px;
  right: 18px;
  background: #111827;
  color: #fff;
  padding: 10px 14px;
  border-radius: 10px;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.25);
  z-index: 350; /* 高於導覽列陰影 */
}
.toast-enter-active,
.toast-leave-active {
  transition: all 0.2s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
