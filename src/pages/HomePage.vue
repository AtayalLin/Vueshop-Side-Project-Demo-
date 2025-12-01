<template>
  <div class="home">
    <div data-aos="fade">
      <HeroSection name="dotonbori">
        <template #title>
          <h1 data-aos="fade-up" data-aos-delay="80">夜色道頓堀 · 和風選物</h1>
        </template>
        <template #subtitle>
          <p data-aos="fade-up" data-aos-delay="160" style="color: white;">
            在霓虹與人潮的間隙，挑一件日常裡的剛好。
          </p>
        </template>
      </HeroSection>
    </div>

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
