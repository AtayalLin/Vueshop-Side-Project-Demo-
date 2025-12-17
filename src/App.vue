<template>
  <div class="app-shell">
    <Navbar />
    <main class="page-container">
      <router-view />
    </main>
    <FooterSocial />   <!-- 全局 Footer -->

  </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore";
import FooterSocial from "@/components/FooterSocial.vue";


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
  flex: 1;

  width: min(95vw, 100%);

  /* 左右留白：固定 24px～48px 之間彈性 */
  padding-inline: clamp(48px);

  /* 上下留白 */
  padding-block: 32px;

  /* 水平置中 */
  margin-inline: auto;
  padding-bottom: 80px;  /* 根據 Footer 高度調整 */

}

body {
  font-family: var(--font-main);
  margin: 0;
  padding: 0;
  background-color: var(--bg-color);
}

.app-shell {
 display: flex;
  flex-direction: column;
  min-height: 100vh;  /* 讓整個頁面至少撐滿視窗高度 */
  background-color: var(--bg-color);
}

</style>
