import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // 僅執行我們自己的單元測試，避免抓到 E2E 與外部套件測試
    include: [
      'src/**/*.test.{js,ts,jsx,tsx}',
      'src/**/*.spec.{js,ts,jsx,tsx}',
    ],
    exclude: [
      'node_modules/**',
      'tests/e2e/**',
      'dist/**',
    ],
  },
})

