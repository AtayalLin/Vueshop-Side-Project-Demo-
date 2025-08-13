import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
import path from "path"; // 加這行
export default defineConfig(({ mode }) => {
  // 允許用環境變數控制 base，以部署至 GitHub Pages 子路徑
  // 例如：/REPO_NAME/；若部署到使用者首頁（USERNAME.github.io）則設為 "/"
  const base = process.env.BASE_PATH || "/";
  return {
    base,
    plugins: [vue()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // Vitest 設定：排除 node_modules 與 e2e 測試，以避免抓到外部套件的測試
    test: {
      exclude: ["node_modules/**", "tests/e2e/**"],
    },
  };
});
