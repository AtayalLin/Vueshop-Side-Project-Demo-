<script setup>
import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
</script>
<template>
  <nav class="navbar">
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
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #f8f8f8;
  border-bottom: 1px solid #ddd;
}
.nav-logo a {
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: #333;
}
.nav-links {
  display: flex;
  list-style: none;
  gap: 1.5rem;
}
.nav-links a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
}
.nav-links a:hover {
  color: #a0522d;
}
</style>
