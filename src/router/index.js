import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../pages/HomePage.vue";
import ProductsPage from "../pages/ProductsPage.vue";
import GalleryPage from "../pages/GalleryPage.vue";

import CartPage from "../pages/CartPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/products",
    name: "Products",
    component: ProductsPage,
  },
  {
    path: "/gallery",
    name: "Gallery",
    component: GalleryPage,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/LoginPage.vue"),
  },
  {
    path: "/member",
    name: "Member",
    component: () => import("@/views/MemberPage.vue"),
  },
  {
    path: "/cart",
    name: "Cart",
    component: CartPage,
  },
  // New: Checkout flow (non-invasive)
  {
    path: "/checkout",
    name: "Checkout",
    component: () => import("@/features/checkout/CheckoutPage.vue"),
  },
  {
    path: "/order-success",
    name: "OrderSuccess",
    component: () => import("@/features/checkout/OrderSuccessPage.vue"),
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("@/features/orders/OrdersPage.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/RegisterPage.vue"),
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: () => import("../views/ForgotPasswordPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// 基本路由保護：需要登入的頁面
router.beforeEach((to, from, next) => {
  const protectedNames = new Set(["Member", "Orders"]);
  const token = localStorage.getItem("token") || "";
  if (protectedNames.has(to.name) && !token) {
    next({ name: "Login", query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router;
