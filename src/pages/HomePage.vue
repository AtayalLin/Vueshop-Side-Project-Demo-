<template>
  <div class="home">
    <h1 data-aos="fade-up">日式電商首頁</h1>
    <p data-aos="fade-up" data-aos-delay="200">
      歡迎光臨我們的日式風格選物平台。
    </p>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import AOS from "aos";
import "aos/dist/aos.css";

onMounted(() => {
  AOS.init();
});
</script>

<style scoped>
.home {
  padding: 2rem;
  text-align: center;
}
</style>
