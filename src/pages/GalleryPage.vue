<template>
  <div data-aos="fade-up" class="page">
    <h2>相簿頁</h2>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import AOS from "aos";

onMounted(() => {
  AOS.init();
});
</script>

<style scoped>
.page {
  padding: 2rem;
}
</style>
