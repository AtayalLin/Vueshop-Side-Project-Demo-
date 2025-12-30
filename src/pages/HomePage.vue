<template>
  <div class="home">
    <!-- Hero Section -->
    <HeroSection name="dotonbori">
      <template #title>
        <h1 data-aos="fade-up" data-aos-delay="80" style="color: white;">夜色道頓堀 · 和風選物</h1>
      </template>
      <template #subtitle>
        <p data-aos="fade-up" data-aos-delay="160" style="color: white;">
          在霓虹與人潮的間隙，挑一件日常裡的剛好。
        </p>
      </template>
    </HeroSection>

    <!-- About / Intro Section -->
    <section class="intro" data-aos="fade-up">
      <h2>關於我們</h2>
      <p>
        我們專注於精選日式生活選物，將傳統與現代美學融合，為你帶來獨特的購物體驗。
      </p>
    </section>

   
  </div>
</template>

<script setup>
import HeroSection from "@/components/HeroSection.vue";
</script>

<style scoped>
.home {
  display: grid;
  gap: 48px;
  min-height: 100vh;
  padding-bottom: 48px; /* 避免 footer 擠到內容 */
}

.intro {
  text-align: center;
  padding: 0 16px;
  max-width: 720px;
  margin-inline: auto;
  line-height: 1.6;
}

.intro h2 {
  margin-bottom: 16px;
  font-size: 2rem;
}

.intro p {
  font-size: 1rem;
  color: #555;
}

/* Footer */
.site-footer {
  border-top: 1px solid #e5e7eb;
  padding: 16px;
  background: #fff;
}

.wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  max-width: 1280px;
  margin-inline: auto;
}

.left {
  display: flex;
  flex-direction: column;
  gap: 2px;
  color: #374151;
}

.left small {
  font-size: 0.75rem;
  color: #6b7280;
}

.social {
  display: flex;
  gap: 14px;
}

.social a {
  display: inline-flex;
  padding: 8px;
  border-radius: 8px;
  background: #f9fafb;
  transition: transform 0.15s ease, box-shadow 0.2s ease;
}

.social a:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

@media (max-width: 768px) {
  .wrap {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>
