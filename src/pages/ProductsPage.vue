<template>
  <div class="product-page">
    <h2 data-aos="fade-down">商品一覽</h2>

    <div class="toolbar" data-aos="fade-up" data-aos-delay="50">
      <input v-model="keyword" class="input" placeholder="搜尋商品名稱…" />
      <select v-model="sortBy" class="select">
        <option value="name-asc">名稱（A→Z）</option>
        <option value="name-desc">名稱（Z→A）</option>
        <option value="price-asc">價格（低→高）</option>
        <option value="price-desc">價格（高→低）</option>
      </select>
    </div>

    <div class="product-grid">
      <ProductCard
        v-for="(item, i) in filteredSorted"
        :key="item.id"
        :product="item"
        :aos="getAosType(i)"
        :delay="(i % 4) * 100"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import ProductCard from "../components/ProductCard.vue";
import AOS from "aos";
import "aos/dist/aos.css";
import "../assets/aos-custom.css";

import { listProducts } from "@/services/productsService";
const products = ref(listProducts());

const keyword = ref("");
const sortBy = ref("name-asc");

const filteredSorted = computed(() => {
  const k = keyword.value.trim().toLowerCase();
  const arr = products.value.filter((p) => p.name.toLowerCase().includes(k));
  switch (sortBy.value) {
    case "name-desc":
      arr.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "price-asc":
      arr.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      arr.sort((a, b) => b.price - a.price);
      break;
    default:
      arr.sort((a, b) => a.name.localeCompare(b.name));
  }
  return arr;
});

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
/* 讓商品頁的導覽列樣式與全站一致：移除任何本頁的覆蓋，僅保留內容區樣式 */
:deep(.app-navbar) {
  box-sizing: border-box;
}

.toolbar {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}
.input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}
.select {
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 16px;
  margin-top: 1rem;
}
@media (min-width: 600px) {
  .product-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (min-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
@media (min-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 20px;
  }
}
@media (min-width: 1440px) {
  .product-grid {
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 24px;
  }
}
.product-card {
  border: 1px solid #eaeaea;
  border-radius: 8px;
  padding: clamp(12px, 2.2vw, 24px);
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.product-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
}
.emoji {
  font-size: clamp(1.5rem, 3.5vw, 2rem);
}
</style>
