<template>
  <section class="hero" :class="variant">
    <picture>
      <!-- mobile-first sources; user will put images under /public/images/hero -->
      <source
        :srcset="`${base}/hero-${name}-1440.webp`"
        media="(min-width: 1024px)"
        type="image/webp"
      />
      <source
        :srcset="`${base}/hero-${name}-960.webp`"
        media="(min-width: 768px)"
        type="image/webp"
      />
      <img
        :src="`${base}/hero-${name}-640.webp`"
        alt=""
        class="bg"
        loading="eager"
        decoding="async"
      />
    </picture>
    <div class="overlay" />
    <div class="inner">
      <h1 class="title"><slot name="title">和風精選</slot></h1>
      <p class="subtitle">
        <slot name="subtitle">夜色中的道頓堀，開啟你的日式選物之旅。</slot>
      </p>
      <slot />
    </div>
  </section>
</template>
<script setup>
const props = defineProps({
  name: { type: String, default: "dotonbori" }, // 用於組圖檔名
  variant: { type: String, default: "default" },
});
<<<<<<< HEAD
const base = "/images/hero";
=======
const base = `${import.meta.env.BASE_URL}images/hero`;
>>>>>>> e9c6f28 (重新上傳)
</script>
<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  color: #fff;
}
.hero .bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 35%;
  display: block;
}
/* 加重遮罩，帶一點漸層方向感 */
.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.3));
}
.inner {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  text-align: center;
  padding: 0 16px;
}
.title {
  margin: 0;
  font-weight: 800;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
}
.subtitle {
  margin: 0.5rem 0 0;
  opacity: 0.98;
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.3);
}

/* heights per breakpoint */
.hero {
  height: 320px;
}
@media (min-width: 375px) {
  .hero {
    height: 360px;
  }
}
@media (min-width: 425px) {
  .hero {
    height: 380px;
  }
}
@media (min-width: 768px) {
  .hero {
    height: 500px;
  }
}
@media (min-width: 1024px) {
  .hero {
    height: 560px;
  }
}
@media (min-width: 1440px) {
  .hero {
    height: 640px;
  }
}
</style>
