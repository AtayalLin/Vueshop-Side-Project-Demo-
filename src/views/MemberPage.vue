<template>
  <div class="member-container" data-aos="fade-up">
    <h1>會員中心</h1>
    <div v-if="authStore.token" class="member-info">
      <p><strong>暱稱：</strong>{{ user.nickname || "(未設定)" }}</p>
      <p><strong>Email：</strong>{{ user.email || "(未知)" }}</p>
      <button class="logout-btn" @click="handleLogout">登出</button>
    </div>
    <div v-else class="member-info">
      <button class="open-modal" @click="showModal = true">會員功能</button>
    </div>

    <teleport to="body">
      <div
        v-if="showModal"
        class="modal-backdrop"
        @click.self="showModal = false"
      >
        <div class="modal" data-aos="zoom-in">
          <h3>請先前往登入頁面或註冊會員頁面</h3>
          <div class="modal-actions">
            <router-link
              to="/login"
              @click.native="showModal = false"
              class="btn"
              >前往登入</router-link
            >
            <router-link
              to="/register"
              @click.native="showModal = false"
              class="btn"
              >註冊會員</router-link
            >
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";

const authStore = useAuthStore();
const showModal = ref(false);
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
.open-modal {
  background: #111827;
  color: #fff;
  border: 0;
  padding: 8px 12px;
  border-radius: 8px;
}
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: grid;
  place-items: center;
  z-index: 300;
}
.modal {
  width: min(92vw, 520px);
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.22);
}
.modal-actions {
  margin-top: 12px;
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}
.btn {
  display: inline-block;
  padding: 8px 12px;
  background: #111827;
  color: #fff;
  border-radius: 8px;
}
</style>
