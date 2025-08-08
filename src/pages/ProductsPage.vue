<template>
  <div class="product-page">
    <h2 data-aos="fade-down">商品一覽</h2>
    <div class="product-grid">
      <ProductCard
        v-for="(item, i) in products"
        :key="item.id"
        :product="item"
        :aos="getAosType(i)"
        :delay="(i % 4) * 100"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ProductCard from "../components/ProductCard.vue";
import AOS from "aos";
import "aos/dist/aos.css";
import "../assets/aos-custom.css";

const products = ref([
  { id: 1, name: "日式風格杯子", price: 350, emoji: "🍵" },
  { id: 2, name: "手工茶壺", price: 680, emoji: "🫖" },
  { id: 3, name: "原木餐盤", price: 420, emoji: "🍽️" },
  { id: 4, name: "和風布巾", price: 290, emoji: "🧣" },
  { id: 5, name: "日式便當盒", price: 550, emoji: "🍱" },
  { id: 6, name: "招財貓擺飾", price: 720, emoji: "🐱" },
  { id: 7, name: "竹製筷子組", price: 180, emoji: "🥢" },
  { id: 8, name: "和風燈籠", price: 980, emoji: "🏮" },
  { id: 9, name: "日本抹茶粉", price: 460, emoji: "🌿" },
  { id: 10, name: "風呂敷布包", price: 360, emoji: "🎁" },
  { id: 11, name: "日式茶道組", price: 1250, emoji: "🧉" },
  { id: 12, name: "陶瓷花瓶", price: 640, emoji: "🏺" },
  { id: 13, name: "日式桌墊", price: 280, emoji: "🪑" },
  { id: 14, name: "京都手工香", price: 580, emoji: "🕯️" },
  { id: 15, name: "和風漆器碗", price: 530, emoji: "🥣" },
  { id: 16, name: "手作木托盤", price: 390, emoji: "🪵" },
]);

const getAosType = (index) => {
  const pattern = [
    "fade-zoom-in",
    "fade-zoom-in",
    "fade-zoom-in",
    "fade-zoom-in",
  ];
  return pattern[index % 4];
};

onMounted(() => {
  AOS.init({
    duration: 600,
    easing: "ease-in-out",
    once: false,
    mirror: true, // 滑上滑下都會觸發動畫
  });
});
</script>

<style scoped>
.product-page {
  padding: 2rem;
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}
.product-card {
  border: 1px solid #eaeaea;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.3s;
}
.product-card:hover {
  transform: translateY(-5px);
}
.emoji {
  font-size: 2rem;
}
</style>
