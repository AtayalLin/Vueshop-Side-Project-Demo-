// Price utilities (pure functions) – safe to import anywhere
// Shipping/discount rules kept simple and configurable here

export function calcSubtotal(items) {
  if (!Array.isArray(items)) return 0;
  return items.reduce((sum, it) => sum + (it.price || 0) * (it.quantity || 0), 0);
}

export function calcShipping(subtotal, opts = {}) {
  const { base = 80, freeThreshold = 999 } = opts;
  if (subtotal <= 0) return 0;
  return subtotal >= freeThreshold ? 0 : base;
}

export function calcDiscount(subtotal, coupon) {
  if (!coupon) return 0;
  // Example simple coupon: { type: 'percent', value: 10 } or { type: 'fixed', value: 100 }
  if (coupon.type === "percent") return Math.round((subtotal * coupon.value) / 100);
  if (coupon.type === "fixed") return Math.min(subtotal, coupon.value);
  return 0;
}

export function calcTotal({ subtotal, shipping, discount }) {
  return Math.max(0, (subtotal || 0) + (shipping || 0) - (discount || 0));
}

