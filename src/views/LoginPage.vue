<template>
  <div class="register-container" data-aos="fade-up">
    <h2>會員登入</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <input
          type="email"
          placeholder="請輸入 Email"
          v-model.trim="email"
          required
        />
      </div>

      <div class="form-group">
        <div class="password-wrapper">
          <input
            :type="showPassword ? 'text' : 'password'"
            placeholder="請輸入密碼"
            v-model.trim="password"
            minlength="6"
            required
          />
          <span class="eye-icon" @click="toggleShow">
            <i :class="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"></i>
          </span>
        </div>
      </div>

      <button type="submit" class="login-btn">登入</button>
    </form>

    <div v-if="errorMsg" class="error-msg">❌ {{ errorMsg }}</div>

    <div class="login-links">
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

// 狀態定義
const email = ref("");
const password = ref("");
const errorMsg = ref("");
const showPassword = ref(false); // 控制密碼顯示/隱藏

const auth = useAuthStore();
const toast = useToast();
const router = useRouter();

// 切換密碼顯示狀態
const toggleShow = () => {
  showPassword.value = !showPassword.value;
};

// 登入邏輯
const handleLogin = async () => {
  const result = await auth.login({
    email: email.value,
    password: password.value,
  });

  if (result) {
    toast.success("登入成功！");
    const redirect = router.currentRoute.value.query.redirect || "/member";
    router.push(redirect);
    errorMsg.value = "";
  } else {
    errorMsg.value = "登入失敗，請確認帳號密碼";
    toast.error(errorMsg.value);
  }
};
</script>

<style scoped>
/* 登入容器 */
.register-container {
  max-width: 400px;
  margin: 80px auto;
  padding: 40px 32px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  margin-bottom: 24px;
  font-size: 24px;
  color: #333;
  font-weight: 700;
}

.form-group {
  margin-bottom: 16px;
}

/* 輸入框通用樣式 */
input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.3s, box-shadow 0.3s;
}

input:focus {
  border-color: #42b983; /* 綠色聚焦 */
  outline: none;
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.1);
}

/* 密碼包裝容器 (關鍵) */
.password-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.password-wrapper input {
  padding-right: 45px; /* 為右側眼睛留出空間 */
}

/* 眼睛圖示樣式與定位 */
.eye-icon {
  position: absolute;
  right: 15px;
  cursor: pointer;
  color: #888;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
  user-select: none; /* 防止點擊時選中文字 */
}

.eye-icon:hover {
  color: #42b983;
}

/* 登入按鈕 (參考圖 1 色調) */
.login-btn {
  width: 100%;
  padding: 12px;
  background-color: #4cc37a; /* 亮綠色 */
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 8px;
}

.login-btn:hover {
  background-color: #3dae6a;
}

/* 下方連結排列 */
.login-links {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.login-links a {
  color: #007bff;
  text-decoration: none;
}

.login-links a:hover {
  text-decoration: underline;
}

.error-msg {
  margin-top: 16px;
  color: #e74c3c;
  font-size: 14px;
}
</style>