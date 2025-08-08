<template>
  <div class="login-container">
    <div class="login-card" data-aos="fade-up">
      <h2 class="title">忘記密碼</h2>

      <div class="form-group">
        <label for="email">註冊信箱</label>
        <input
          id="email"
          v-model="email"
          type="email"
          placeholder="請輸入 Email"
        />
        <p v-if="showErrors && !email" class="error">請輸入 Email</p>
      </div>

      <button class="login-btn" @click="handleReset">寄送重設密碼連結</button>

      <div class="login-links">
        <router-link to="/member">返回登入</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import AOS from "aos";
import "aos/dist/aos.css";

const email = ref("");
const showErrors = ref(false);

const handleReset = () => {
  showErrors.value = true;

  if (!email.value) return;

  alert("已寄送重設密碼連結至您的信箱");
};

onMounted(() => {
  AOS.init({ duration: 600, easing: "ease-out" });
});
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 2rem;
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  border: 1px solid #eaeaea;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}

.title {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

input {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  box-sizing: border-box;
}

input:focus {
  border-color: #000;
  outline: none;
}

.error {
  color: red;
  font-size: 0.85rem;
  margin-top: 0.25rem;
}

.login-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 0.5rem;
}

.login-btn:hover {
  background-color: #444;
}

.login-links {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  font-size: 0.9rem;
}

.login-links a {
  color: #333;
  text-decoration: underline;
}
</style>
