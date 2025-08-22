<template>
  <div class="home">
    <HeroSection name="dotonbori">
      <template #title>夜色道頓堀 · 和風選物</template>
      <template #subtitle>在霓虹與人潮的間隙，挑一件日常裡的剛好。</template>
    </HeroSection>

    <section class="intro" data-aos="fade-up">
      <h2>日式電商首頁</h2>
      <p>歡迎光臨我們的日式風格選物平台。</p>
    </section>

    <FooterSocial />
  </div>
</template>

<script setup>
import HeroSection from "@/components/HeroSection.vue";
import FooterSocial from "@/components/FooterSocial.vue";
</script>

<style scoped>
.home {
  display: grid;
  gap: 24px;
}
.intro {
  padding: 24px 16px;
  text-align: center;
}
</style>
