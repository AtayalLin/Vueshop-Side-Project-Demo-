import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import AOS from "aos";
import "aos/dist/aos.css";

// ✅ 引入 toast 套件
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);

AOS.init();

app.use(createPinia()); // ✅ 註冊 Pinia
app.use(router);

// ✅ 註冊 Toast plugin
app.use(Toast, {
  position: POSITION.TOP_RIGHT,
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  transition: "Vue-Toastification__fade",
});

app.mount("#app");
