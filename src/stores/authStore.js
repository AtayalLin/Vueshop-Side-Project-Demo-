import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    user: {
      email: "",
      nickname: "",
    },
  }),
  actions: {
    async login({ email, password }) {
      try {
        // 依官方 API，登入 body 應為 { email, password }
        const body = { email, password };
        console.log("送出的 post body:", body);
        const res = await axios.post(
          "https://todolist-api.hexschool.io/users/sign_in",
          body,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("[login] 伺服器回應:", res.data);
        const token = res.data?.token || res.data?.data?.token || "";
        const nickname = res.data?.nickname || res.data?.data?.nickname || "";
        if (!token) {
          throw new Error("未取得 token");
        }
        // 先立即填入使用者基本資料（從登入欄位與回應補上 nickname），提高 UI 即時性
        this.user = { email, nickname };
        this.token = token;
        localStorage.setItem("token", this.token);
        // 再透過 checkout 校正資料
        await this.getUserInfo();
        console.log("✅ 登入成功:", this.user);
        return true;
      } catch (error) {
        console.error("❌ 登入失敗:", error.response?.data || error.message);
        return false;
      }
    },

    async getUserInfo() {
      if (!this.token) return;
      try {
        const res = await axios.get(
          "https://todolist-api.hexschool.io/users/checkout",
          {
            headers: {
              Authorization: this.token,
            },
          }
        );
        // 兼容不同回傳格式：可能是 { email, nickname } 或 { data: { email, nickname } }
        const payload = res.data?.data ?? res.data ?? {};
        // 若回傳沒有帶欄位，就保留既有資料，避免被清空
        this.user = {
          email: (payload.email ?? this.user.email) || "",
          nickname: (payload.nickname ?? this.user.nickname) || "",
        };
      } catch (error) {
        console.error(
          "❌ 取得使用者資訊失敗:",
          error.response?.data || error.message
        );
      }
    },

    logout() {
      try {
        this.token = "";
        this.user = { email: "", nickname: "" };
        localStorage.removeItem("token");
        console.log("👋 已登出");
      } catch (error) {
        console.error("登出發生錯誤:", error);
      }
    },
  },
});
