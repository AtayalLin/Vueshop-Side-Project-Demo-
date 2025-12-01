<template>
  <div class="app-shell">
    <Navbar />
    <main class="page-container">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore";

const auth = useAuthStore();

onMounted(() => {
  auth.getUserInfo();
});
</script>

<style scoped>
/* CSS variables moved to src/style.css (global) */

/* 入口頁面的一致留白與版幅（較精緻，左右不要過度留白） */
.app-shell {
  background-color: var(--bg-color);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.page-container {
  /* flex: 1; */
  /* 更寬但仍保有安全邊界：1760px 上限，視窗 98vw 內縮 */
  /* max-width: clamp(1760px, 98vw, 1760px); */
  /* padding-inline: clamp(8px, 1.5vw, 20px); */
  /* padding-block: 32px; */
  /* margin-inline: auto; */
  /* width: 100%;  */

  /* 中央內容最大寬度（不含左右留白） */
  /* max-width: 1760px; */
  width: min(95vw, 100%);

  /* 左右留白：固定 24px～48px 之間彈性 */
  padding-inline: clamp(48px);

  /* 上下留白 */
  padding-block: 32px;

  /* 水平置中 */
  margin-inline: auto;
}

body {
  font-family: var(--font-main);
  margin: 0;
  padding: 0;
  background-color: var(--bg-color);
}
</style>
