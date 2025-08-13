// Playwright config (isolate from Vitest by limiting testDir/match)
/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: "tests/e2e",
  testMatch: ["**/*.spec.js"], // avoid picking up *.test.js used by Vitest
  use: {
    baseURL: process.env.E2E_BASE_URL || "http://localhost:4173",
    headless: true,
  },
  webServer: {
    command: "npm run preview",
    port: 4173,
    timeout: 120000,
    reuseExistingServer: true,
  },
};
export default config;
