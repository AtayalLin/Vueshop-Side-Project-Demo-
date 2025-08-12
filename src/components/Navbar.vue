<script setup>
import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
</script>
<template>
  <nav class="app-navbar">
    <div class="nav-logo">
      <router-link to="/">🛍️ 日式電商</router-link>
    </div>
    <ul class="nav-links">
      <li><router-link to="/">回首頁</router-link></li>
      <li><router-link to="/products">商品</router-link></li>
      <li><router-link to="/gallery">相簿</router-link></li>
      <li v-if="!user || !user.email">
        <router-link to="/login">登入會員</router-link>
      </li>
      <li v-if="!user || !user.email">
        <router-link to="/register">註冊成為會員</router-link>
      </li>
      <li v-if="user && user.email">
        <router-link to="/member">會員中心</router-link>
      </li>
      <li><router-link to="/cart">🛒</router-link></li>
    </ul>
  </nav>
</template>

<script setup></script>

<style scoped>
.app-navbar {
  box-sizing: border-box;
  position: sticky;
  top: 0;
  z-index: 200;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-left: clamp(16px, 2vw, 28px);
  padding-right: 12px; /* 固定右側內距，避免因滾動條寬度造成的位移 */
  padding-block: 15px;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  overflow-x: hidden;
}
.nav-logo a {
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: #1f2937;
}
.nav-links {
  display: flex;
  list-style: none;
  gap: 1.25rem;
  align-items: center;
  flex-wrap: nowrap;
  margin-right: 12px; /* 固定值，避免有/無滾動條導致位置跳動 */
}
.nav-links a {
  text-decoration: none;
  color: #1f2937;
  font-weight: 600;
  padding: 10px 12px;
  border-radius: 8px;
  white-space: nowrap;
  transition: transform 0.15s ease, box-shadow 0.2s ease, background 0.2s ease,
    color 0.2s ease;
}
.nav-links a:hover {
  color: #a0522d;
  background: #f3f4f6;
  transform: translateY(-1px);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.14);
}
</style>
