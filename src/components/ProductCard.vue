<template>
  <div class="product-card" :data-aos="props.aos" :data-aos-delay="props.delay">
    <picture v-if="imgBase">
      <source
        :srcset="`${imgDir}/${imgBase}-960.webp`"
        media="(min-width: 768px)"
        type="image/webp"
      />
      <img
        :src="`${imgDir}/${imgBase}-640.webp`"
        :alt="props.product.name"
        class="thumb"
        loading="lazy"
        decoding="async"
        @error="handleImageError"
      />
    </picture>
    <div v-else class="emoji">{{ props.product.emoji }}</div>
    <h3>{{ props.product.name }}</h3>
    <p>{{ props.product.price }} 元</p>
    <button @click="handleAddToCart">加入購物車</button>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useCartStore } from "../store/cart";
import { useToast } from "vue-toastification";
import { productImages } from "@/data/productImages";

const props = defineProps({
  product: Object,
  aos: { type: String, default: "fade-up" },
  delay: { type: Number, default: 0 },
});

const imgDir = "/images/products";
const key = computed(() => (props.product?.name || "").toLowerCase());
const imgBase = computed(() => {
  const productName = key.value;
  console.log("圖片映射檢查:", { productName });

  // 茶壺
  if (productName.includes("手工茶壺")) {
    return productImages.teapot;
  }

  // 茶杯
  if (productName.includes("日式風格杯子")) {
    return productImages.teacup;
  }

  // 便當
  if (productName.includes("日式便當盒")) {
    return productImages.bento;
  }

  // 筷子
  if (productName.includes("竹製筷子組")) {
    return productImages.chopsticks;
  }

  // 燈籠
  if (productName.includes("和風燈籠")) {
    return productImages.lantern;
  }

  // 如果沒有符合的圖片，記錄並返回空字串
  console.log("無對應圖片:", productName);
  return "";
});

const cart = useCartStore();
const toast = useToast();

const handleImageError = (e) => {
  // 圖片載入失敗時，記錄詳細信息
  console.error("圖片載入失敗:", {
    src: e.target.src,
    productName: props.product.name,
    imgBase: imgBase.value,
    key: key.value,
  });

  // 移除圖片元素，顯示 emoji
  e.target.style.display = "none";
  const emojiDiv = document.createElement("div");
  emojiDiv.className = "emoji";
  emojiDiv.textContent = props.product.emoji;
  e.target.parentNode.appendChild(emojiDiv);
};

const handleAddToCart = () => {
  try {
    if (!props.product || !props.product.id) {
      toast.error("商品資料異常，無法加入購物車");
      console.error("product is invalid:", props.product);
      return;
    }
    cart.addToCart(props.product);
    toast.success(`✅ 商品「${props.product.name}」已加入購物車`);
  } catch (err) {
    toast.error("加入購物車失敗");
    console.error("加入購物車錯誤:", err);
  }
};
</script>

<style scoped>
.product-card {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 12px;
  text-align: center;
}
.thumb {
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
  border-radius: 10px;
}
.emoji {
  font-size: 3rem;
}
button {
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background: #111827;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.2s ease, background 0.2s ease;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
}
button:hover {
  background: #0b1220;
  transform: translateY(-1px);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.16);
}
</style>
