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

export default router;
