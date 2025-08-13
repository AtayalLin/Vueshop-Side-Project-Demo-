import { test, expect } from "@playwright/test";

// E2E: add one product -> open cart -> use new checkout -> submit success

test("end-to-end: add to cart and checkout", async ({ page }) => {
  await page.goto("/");

  // 透過 Navbar 桌面連結進入商品頁（避免 Popover 內連結干擾）
  await page.locator('nav .nav-links.desktop a[href="/products"]').click();

  // 加入第一個商品
  await page.getByRole("button", { name: "加入購物車" }).first().click();

  // 透過 Navbar 進入購物車（保持 SPA 狀態，保留 Pinia 資料）
  await page.locator('nav .nav-links.desktop a[href="/cart"]').click();

  // 使用新版結帳
  await page.getByRole("link", { name: "使用新版結帳" }).click();

  // 填表（改用貨到付款，避免卡號欄位必填）
  await page.getByLabel("姓名").fill("王小明");
  await page.getByLabel("電話").fill("0912-345-678");
  await page.getByLabel("地址").fill("台北市信義區市府路1號");
  await page.getByLabel("付款方式").selectOption("cod");

  // 送出
  await page.getByRole("button", { name: /送出訂單/ }).click();

  // 進成功頁
  await expect(page.getByText("下單成功")).toBeVisible();
});
