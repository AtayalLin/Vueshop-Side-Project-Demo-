<template>
  <div class="register-container" data-aos="fade-up">
    <h2>註冊會員</h2>
    <input
      type="email"
      placeholder="請輸入 Email"
      v-model="signupField.email"
    />
    <input
      type="password"
      placeholder="請輸入密碼"
      v-model="signupField.password"
    />
    <input
      type="text"
      placeholder="請輸入暱稱"
      v-model="signupField.nickname"
    />

    <button @click="signup">註冊</button>

    <div v-if="signupRes" class="success-msg">
      ✅ 註冊成功！UID：{{ signupRes.uid }}
    </div>
    <div v-if="errorMsg" class="error-msg">❌ 錯誤：{{ errorMsg }}</div>

    <div class="login-links" style="margin-top: 16px">
      <router-link to="/login">返回登入</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();
const api = "https://todolist-api.hexschool.io";

const signupField = ref({
  email: "",
  password: "",
  nickname: "",
});

const signupRes = ref("");
const errorMsg = ref("");

const signup = async () => {
  console.log("[註冊流程] 開始註冊", signupField.value);
  try {
    const res = await axios.post(`${api}/users/sign_up`, signupField.value);
    console.log("[註冊流程] ✅ 註冊成功:", res.data);
    signupRes.value = res.data;
    errorMsg.value = "";
    toast.success("註冊成功，請前往登入");
  } catch (err) {
    console.log("[註冊流程] ❌ 註冊失敗:", err.response?.data || err);
    errorMsg.value = err.response?.data?.message || "發生未知錯誤";
    signupRes.value = "";
    toast.error(`註冊失敗：${errorMsg.value}`);
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
