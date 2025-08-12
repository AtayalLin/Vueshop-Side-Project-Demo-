<template>
  <div class="app-container">
    <Navbar />
    <main class="main-content">
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

.app-container {
  background-color: var(--bg-color);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 1.5rem;
  max-width: 1200px;
  margin: auto;
  width: 100%;
}

body {
  font-family: var(--font-main);
  margin: 0;
  padding: 0;
  background-color: var(--bg-color);
}
</style>
