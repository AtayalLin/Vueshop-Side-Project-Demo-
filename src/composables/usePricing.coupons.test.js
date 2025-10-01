import { describe, it, expect } from "vitest";
import { applyCouponCode, calcTotal } from "./usePricing";

describe("coupon codes", () => {
  it("SAVE100 fixed amount", () => {
    const subtotal = 1200;
    const d = applyCouponCode(subtotal, "save100");
    expect(d).toBe(100);
    expect(calcTotal({ subtotal, shipping: 80, discount: d })).toBe(1180);
  });

  it("SAVE10 percent", () => {
    const subtotal = 1000;
    const d = applyCouponCode(subtotal, "SAVE10");
    expect(d).toBe(100);
  });

  it("unknown code returns 0", () => {
    expect(applyCouponCode(1000, "???")).toBe(0);
  });
});
