<template>
  <div class="member-container" data-aos="fade-up">
    <h1>會員中心</h1>
    <div v-if="authStore.token" class="member-info">
      <p><strong>暱稱：</strong>{{ user.nickname || "(未設定)" }}</p>
      <p><strong>Email：</strong>{{ user.email || "(未知)" }}</p>
      <button class="logout-btn" @click="handleLogout">登出</button>
    </div>
    <div v-else class="member-info">
      <p>尚未登入，請先登入帳號。</p>
      <router-link to="/login">前往登入</router-link>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const router = useRouter();

onMounted(() => {
  // 保險起見：若尚未載入使用者資料，但有 token，嘗試取得一次
  if (!user.value?.email && authStore.token) {
    authStore.getUserInfo();
  }
});

const handleLogout = () => {
  authStore.logout();
  router.push("/login");
};
</script>

<style scoped>
.member-container {
  max-width: 400px;
  margin: 60px auto;
  padding: 32px;
  background: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  text-align: center;
}
.member-info {
  margin-top: 20px;
  font-size: 16px;
  color: #333;
}

.logout-btn {
  margin-top: 24px;
  padding: 10px 32px;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
}
.logout-btn:hover {
  background: #0056b3;
}
</style>
