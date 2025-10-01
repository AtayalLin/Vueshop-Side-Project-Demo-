// Price utilities (pure functions) – safe to import anywhere
// Shipping/discount rules kept simple and configurable here

//計算所有商品的小計，使用者購買項目總價
export function calcSubtotal(items) {
  if (!Array.isArray(items)) return 0;
  return items.reduce(
    (sum, it) => sum + (it.price || 0) * (it.quantity || 0),
    0
  );
}

//根據小計決定是否免運，滿 999 免運，否則固定 80 元
export function calcShipping(subtotal, opts = {}) {
  const { base = 80, freeThreshold = 999 } = opts;
  if (subtotal <= 0) return 0;
  return subtotal >= freeThreshold ? 0 : base;
}

export function calcDiscount(subtotal, coupon) {
  if (!coupon) return 0;
  // Example simple coupon: { type: 'percent', value: 10 } or { type: 'fixed', value: 100 }
  if (coupon.type === "percent")
    return Math.round((subtotal * coupon.value) / 100);
  if (coupon.type === "fixed") return Math.min(subtotal, coupon.value);
  return 0;
}

//根據折扣碼算折扣金額，支援 SAVE100 / SAVE10
export function applyCouponCode(subtotal, code) {
  // Demo codes; in real world read from API or config
  // SAVE100: -100; SAVE10: -10%; FREESHIP: shipping 0 (handled by caller)
  const normalized = (code || "").trim().toUpperCase();
  if (!normalized) return 0;
  if (normalized === "SAVE100") return Math.min(subtotal, 100);
  if (normalized === "SAVE10") return Math.round(subtotal * 0.1);
  return 0;
}

//判斷是否為免運折扣碼，FREESHIP 會令運費變 0
export function isFreeShipCode(code) {
  return (code || "").trim().toUpperCase() === "FREESHIP";
}

//最終總金額，小計 + 運費 - 折扣
export function calcTotal({ subtotal, shipping, discount }) {
  return Math.max(0, (subtotal || 0) + (shipping || 0) - (discount || 0));
}

export const DEMO_COUPONS = [
  { code: "SAVE100", desc: "折抵 100 元" },
  { code: "SAVE10", desc: "九折（10% off）" },
  { code: "FREESHIP", desc: "免運（配合 UI 控制 shipping=0）" },
];
