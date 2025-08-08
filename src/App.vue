<template>
  <Navbar />
  <router-view />
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

<style>
body {
  font-family: "Noto Sans TC", sans-serif;
  margin: 0;
  padding: 0;
  background-color: #fff;
}
</style>
