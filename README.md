# 日式電商 Demo

[![Deploy Vite site to GitHub Pages](https://github.com/AtayalLin/Vueshop-Side-Project-Demo-/actions/workflows/deploy.yml/badge.svg)](https://github.com/AtayalLin/Vueshop-Side-Project-Demo-/actions/workflows/deploy.yml)

- 線上網站（GitHub Pages）：https://atayallin.github.io/Vueshop-Side-Project-Demo-/
- 技術棧：Vue 3 + Vite + Pinia + Vue Router + AOS + GitHub Actions
- 功能：登入 / 登出、註冊、購物車（加入、清單、總計）

## 本機開發

```bash
npm ci
npm run dev
```

## 部署

推送到 main 會自動部署到 GitHub Pages，Action 檔：.github/workflows/deploy.yml

## 專案結構（重點）

```
src/
  api/                 # axios 客戶端與攔截器（集中錯誤處理、讀取 token）
  assets/              # 靜態資源（圖片、樣式覆寫）
  components/          # 可重用元件（Navbar、ProductCard、CartItem...）
  composables/         # 可重用邏輯（usePricing：小計/運費/折扣/總額）
  features/
    checkout/          # 新結帳流程（隔離開發）
      CheckoutPage.vue
      OrderSuccessPage.vue
  pages/               # 一般頁面（Home/Products/Gallery/Cart）
  router/              # 路由設定（含 /checkout 與 /order-success）
  stores/ or store/    # Pinia（auth、cart）
  style.css            # 全域樣式（Design Tokens、RWD 基礎）
App.vue                # App 殼層（Navbar + router-view）
main.js                # 入口檔（Pinia、Router、AOS、Toast）
```

設計原則：增量、低耦合、可測試

- 新功能放在 features/ 下，避免影響既有頁面
- api/ 與 composables/ 與 UI 解耦，利於單元測試與替換
- Router 僅新增路由，不改舊頁面行為

## 主流程圖（加入 → 購物車 → 結帳 → 成功）

```mermaid
flowchart LR
  A[使用者在 ProductsPage] -->|加入購物車| B{Pinia cart}
  B -->|更新數量| C[Navbar 徽章數]
  B --> D[/CartPage/]
  D -->|按「使用新版結帳」| E[/CheckoutPage/]
  E -->|驗證通過（vee-validate + Zod）| F[計算金額 usePricing]
  F -->|建立模擬訂單 localStorage| G[/OrderSuccessPage/]
  G --> H[清空購物車]
  H --> C
```

說明：

- usePricing 提供小計/運費/折扣/總額計算
- Checkout 使用表單驗證（vee-validate + Zod），送出後寫入 localStorage 並清空購物車
- Navbar 徽章數從 Pinia cart 取得，桌面與抽屜選單都會顯示

---

以下為 Vite Template 說明：

# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).
