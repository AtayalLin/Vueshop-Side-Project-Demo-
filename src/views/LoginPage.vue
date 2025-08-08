<template>
  <div class="register-container" data-aos="fade-up">
    <h2>會員登入</h2>
    <input type="email" placeholder="請輸入 Email" v-model="email" required />
    <input
      type="password"
      placeholder="請輸入密碼"
      v-model="password"
      required
    />
    <button @click="handleLogin">登入</button>
    <div v-if="errorMsg" class="error-msg">❌ {{ errorMsg }}</div>
    <div class="login-links" style="margin-top: 16px">
      <router-link to="/register">註冊會員</router-link>
      <router-link to="/forgot-password">忘記密碼？</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const errorMsg = ref("");
const auth = useAuthStore();
const toast = useToast();
const router = useRouter();

const handleLogin = async () => {
  console.log("輸入的帳號密碼：", email.value, password.value);
  const result = await auth.login({
    email: email.value,
    password: password.value,
  });
  if (result) {
    toast.success("登入成功！");
    router.push("/member");
    errorMsg.value = "";
  } else {
    errorMsg.value = "登入失敗，請確認帳號密碼";
    toast.error(errorMsg.value);
  }
};
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 80px auto;
  padding: 32px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
}

input {
  display: block;
  width: 100%;
  padding: 12px 14px;
  margin-bottom: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.login-links {
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
}

.login-links a {
  color: #007bff;
  text-decoration: none;
}

.success-msg {
  margin-top: 16px;
  color: green;
}

.error-msg {
  margin-top: 16px;
  color: red;
}
</style>
