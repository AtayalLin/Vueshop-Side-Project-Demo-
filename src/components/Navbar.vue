<script setup>
import { ref, watch, onUnmounted, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";
import { useCartStore } from "@/store/cart";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

// cart badge
const cartStore = useCartStore();
const cartCount = computed(() =>
  (cartStore.cartItems || []).reduce((n, it) => n + (it.quantity || 0), 0)
);

// theme switching (Wabi default)
const theme = ref(localStorage.getItem("theme") || "wabi");
const applyTheme = (t) => {
  document.body.setAttribute("data-theme", t);
  localStorage.setItem("theme", t);
};
watch(theme, (t) => applyTheme(t));
onMounted(() => applyTheme(theme.value));
const themes = ["wabi", "neon", "washi"];
const cycleTheme = () => {
  const i = themes.indexOf(theme.value);
  theme.value = themes[(i + 1) % themes.length];
};

const isDrawerOpen = ref(false);
const toggleDrawer = () => (isDrawerOpen.value = !isDrawerOpen.value);
const closeDrawer = () => (isDrawerOpen.value = false);

// Prevent background scroll when drawer is open
const disableScroll = () => {
  const el = document.documentElement;
  el.style.overflow = "hidden";
};
const enableScroll = () => {
  const el = document.documentElement;
  el.style.overflow = "";
};
watch(isDrawerOpen, (open) => (open ? disableScroll() : enableScroll()));

// Auto-close drawer on route change
const route = useRoute();
watch(
  () => route.fullPath,
  () => {
    closeDrawer();
    enableScroll();
  }
);

onUnmounted(() => enableScroll());
</script>
<template>
  <nav class="app-navbar">
    <div class="nav-logo">
      <router-link to="/">🛍️ 日式電商</router-link>
    </div>

    <!-- 漢堡按鈕（≤768 顯示） -->
    <button class="hamburger" @click="toggleDrawer" aria-label="Open menu">
      ☰
    </button>

    <!-- 桌面版連結 -->
    <ul class="nav-links desktop">
      <li><router-link to="/">回首頁</router-link></li>
      <li><router-link to="/products">商品</router-link></li>
      <li><router-link to="/gallery">相簿</router-link></li>
      <li v-if="user && user.email">
        <router-link to="/orders">訂單</router-link>
      </li>
      <li v-if="user && user.email">
        <router-link to="/profile">{{
          user.nickname || "個人資料"
        }}</router-link>
      </li>
      <li v-if="!user || !user.email">
        <router-link to="/login">登入會員</router-link>
      </li>
      <li v-if="!user || !user.email">
        <router-link to="/register">註冊成為會員</router-link>
      </li>
      <li>
        <router-link to="/member">會員中心</router-link>
      </li>
      <li>
        <router-link to="/cart" class="cart-link">
          🛒<span v-if="cartCount" class="badge">{{ cartCount }}</span>
        </router-link>
      </li>
      <li class="theme-switcher">
        <button type="button" class="theme-toggle" @click="cycleTheme">
          主題切換
        </button>
      </li>
    </ul>

    <!-- 手機/平板 Popover（右上角彈出） - 使用 Teleport 直接掛到 <body>，避免被任何父層裁切 -->
    <teleport to="body">
      <div v-if="isDrawerOpen" class="backdrop" @click="closeDrawer"></div>
      <aside
        class="menu-popover"
        :class="{ open: isDrawerOpen }"
        @click.self="closeDrawer"
        role="dialog"
        aria-modal="true"
      >
        <button
          class="popover-close"
          @click="closeDrawer"
          aria-label="Close menu"
        >
          ✕
        </button>
        <ul class="popover-links">
          <li>
            <router-link to="/" @click="closeDrawer">回首頁</router-link>
          </li>
          <li>
            <router-link to="/products" @click="closeDrawer">商品</router-link>
          </li>
          <li>
            <router-link to="/gallery" @click="closeDrawer">相簿</router-link>
          </li>
          <li v-if="!user || !user.email">
            <router-link to="/login" @click="closeDrawer">登入會員</router-link>
          </li>
          <li v-if="!user || !user.email">
            <router-link to="/register" @click="closeDrawer"
              >註冊成為會員</router-link
            >
          </li>
          <li>
            <router-link to="/member" @click="closeDrawer"
              >會員中心</router-link
            >
          </li>
          <li v-if="user && user.email">
            <router-link to="/orders" @click="closeDrawer">訂單</router-link>
          </li>
          <li v-if="user && user.email">
            <router-link to="/profile" @click="closeDrawer">{{
              user.nickname || "個人資料"
            }}</router-link>
          </li>
          <li>
            <router-link to="/cart" @click="closeDrawer" class="cart-link">
              🛒 購物車
              <span v-if="cartCount" class="badge">{{ cartCount }}</span>
            </router-link>
          </li>
        </ul>
      </aside>
    </teleport>
  </nav>
</template>

<script setup></script>

<style scoped>
.app-navbar {
  box-sizing: border-box;
  position: sticky;
  top: 0;
  z-index: 200;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-left: clamp(16px, 2vw, 28px);
  padding-right: 12px; /* 固定右側內距，避免因滾動條寬度造成的位移 */
  padding-block: 15px;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  overflow-x: hidden;
}
.hamburger {
  display: none;
  background: transparent;
  border: 0;
  font-size: 24px;
  padding: 8px;
  border-radius: 8px;
}
.nav-logo a {
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: #1f2937;
}
.nav-links {
  display: flex;
  list-style: none;
  gap: 1.25rem;
  align-items: center;
  flex-wrap: nowrap;
  margin-right: 12px; /* 固定值，避免有/無滾動條導致位置跳動 */
}
.nav-links a {
  text-decoration: none;
  color: #1f2937;
  font-weight: 600;
  padding: 10px 12px;
  border-radius: 8px;
  white-space: nowrap;
  transition: transform 0.15s ease, box-shadow 0.2s ease, background 0.2s ease,
    color 0.2s ease;
}
.nav-links a:hover {
  color: #a0522d;
  background: #f3f4f6;
  transform: translateY(-1px);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.14);
}

/* Popover styles */
.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: saturate(120%) blur(1px);
  z-index: 299;
}
.menu-popover {
  position: fixed;
  top: 12px;
  right: 12px;
  width: min(92vw, 360px);
  max-height: calc(100vh - 24px);
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.16);
  padding: 14px 12px 12px;
  transform: translate(8px, -8px) scale(0.96);
  transform-origin: top right;
  opacity: 0;
  pointer-events: none;
  transition: transform 0.18s ease, opacity 0.18s ease;
  z-index: 300;
  overflow-y: auto;
}
.menu-popover.open {
  transform: translate(0, 0) scale(1);
  opacity: 1;
  pointer-events: auto;
}
.popover-close {
  position: sticky;
  top: 0;
  margin-left: auto;
  background: transparent;
  border: 0;
  font-size: 20px;
  padding: 6px;
}
.popover-links {
  list-style: none;
  padding: 0;
  margin: 8px 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.popover-links a {
  padding: 10px 12px;
  border-radius: 8px;
  display: block;
}
.popover-links a:hover {
  background: #f3f4f6;
}

/* Responsive behaviors */
@media (max-width: 768px) {
  .hamburger {
    display: inline-flex;
  }
  .nav-links.desktop {
    display: none;
  }
}

/* badge */
.cart-link {
  position: relative;
  display: inline-flex;
  align-items: center;
}
.badge {
  position: absolute;
  top: -6px;
  right: -10px;
  background: #ef4444;
  color: #fff;
  font-size: 12px;
  line-height: 1;
  padding: 3px 6px;
  border-radius: 999px;
  min-width: 18px;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}
</style>
