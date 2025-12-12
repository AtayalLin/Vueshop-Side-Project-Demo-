<template>
  <div class="checkout-page" data-aos="fade-up">
    <h2>結帳</h2>

    <div class="layout">
      <section class="form-area" style="color: black;">
        <h3>收件與付款資訊</h3>
        <Form
          :validation-schema="schema"
          :initial-values="initialValues"
          @submit="onSubmit"
          v-slot="{ meta, isSubmitting, values }"
        >
          <div class="grid">
            <label>
              姓名
              <Field name="name" as="input" />
              <ErrorMessage name="name" class="err" />
            </label>
            <label \>
              電話
              <Field name="phone" as="input" />
              <ErrorMessage name="phone" class="err" />
            </label>
            <label class="col-2">
              地址
              <Field name="address" as="input" />
              <ErrorMessage name="address" class="err" />
            </label>
          </div>

          <div class="grid">
            <label>
              配送方式
              <Field name="shipping" as="select">
                <option value="home">宅配</option>
                <option value="store">超商取貨</option>
              </Field>
              <ErrorMessage name="shipping" class="err" />
            </label>
            <label>
              付款方式
              <Field name="payment" as="select">
                <option value="card">信用卡</option>
                <option value="cod">貨到付款</option>
              </Field>
              <ErrorMessage name="payment" class="err" />
            </label>
          </div>

          <div class="grid" v-if="values.payment === 'card'">
            <label class="col-2">
              卡號
              <Field
                name="cardNumber"
                as="input"
                inputmode="numeric"
                placeholder="僅輸入數字，12–19 位"
              />
              <ErrorMessage name="cardNumber" class="err" />
            </label>
          </div>

          <button
            type="submit"
            class="primary"
            :disabled="isSubmitting || !meta.valid || !hasItems"
          >
            {{ isSubmitting ? "送出中…" : "送出訂單（模擬）" }}
          </button>
        </Form>
      </section>

      <aside class="summary" style="color: black;">
        <h3>訂單摘要</h3>
        <ul>
          <li>
            小計：<strong>{{ subtotal }} 元</strong>
          </li>
          <li>
            運費：<strong>{{ shipping }} 元</strong>
          </li>
          <li v-if="discount > 0">
            折扣：<strong>-{{ discount }} 元</strong>
          </li>
        </ul>
        <div class="coupon">
          <input
            v-model="couponCode"
            placeholder="輸入折扣碼（SAVE100 / SAVE10 / FREESHIP）"
          />
          <small class="hint">免運請輸入 FREESHIP（運費會顯示為 0）</small>
        </div>
        <p class="total">
          應付金額：<strong>{{ total }} 元</strong>
        </p>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/store/cart";
import {
  calcSubtotal,
  calcShipping,
  calcTotal,
  applyCouponCode,
  isFreeShipCode,
} from "@/composables/usePricing";

import { Form, Field, ErrorMessage } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

const router = useRouter();
const cart = useCartStore();

// derived values
const hasItems = computed(() => cart.cartItems.length > 0);
const subtotal = computed(() => calcSubtotal(cart.cartItems));
const couponCode = ref("");
const shipping = computed(() =>
  isFreeShipCode(couponCode.value)
    ? 0
    : calcShipping(subtotal.value, { base: 80, freeThreshold: 999 })
);
const discount = computed(() =>
  applyCouponCode(subtotal.value, couponCode.value)
);
const total = computed(() =>
  calcTotal({
    subtotal: subtotal.value,
    shipping: shipping.value,
    discount: discount.value,
  })
);

// validation schema
const schema = toTypedSchema(
  z.object({
    name: z.string().min(1, "請輸入姓名"),
    phone: z
      .string()
      .min(6, "電話格式不正確")
      .regex(/^[0-9\- ]+$/, "請輸入數字或 - 符號"),
    address: z.string().min(3, "請填寫完整地址"),
    shipping: z.enum(["home", "store"]),
    payment: z.enum(["card", "cod"]),
    cardNumber: z
      .string()
      .optional()
      .transform((v) => (v ?? "").replace(/\s+/g, ""))
      .refine((v, ctx) => {
        // 若付款方式是信用卡，卡號必填且長度 12–19 且皆為數字
        const payingCard = ctx?.parent?.payment === "card";
        if (!payingCard) return true;
        if (!v) return false;
        if (!/^\d{12,19}$/.test(v)) return false;
        return true;
      }, "請輸入正確卡號（12–19 位數字）"),
  })
);

const initialValues = {
  name: "",
  phone: "",
  address: "",
  shipping: "home",
  payment: "card",
};

function onSubmit(values) {
  if (!hasItems.value) return;
  const id = `ORD-${Date.now().toString(36)}`;
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  orders.push({
    id,
    items: cart.cartItems,
    form: values,
    total: total.value,
    createdAt: Date.now(),
  });
  localStorage.setItem("orders", JSON.stringify(orders));
  cart.cartItems = [];
  router.push({ name: "OrderSuccess", query: { id } });
}
</script>

<style scoped>
.checkout-page {
  padding: 24px;
}

/* --- Layout --- */
.layout {
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr;
}

.form-area,
.summary {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 20px;
}

/* --- Grid for fields --- */
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px; /* 更舒服的間距 */
}

.grid .col-2 {
  grid-column: 1 / -1;
}

/* --- Label 統一垂直排列 --- */
label {
  color: #111;
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-weight: 500;
  font-size: 15px;
}

/* --- Input & Select UI --- */
input,
select {
  width: 100%;
  box-sizing: border-box;
  padding: 12px 14px;

  background: #2e2e2e;          /* 暗色輸入框 */
  color: #f3f4f6;               /* 輸入後的文字變亮 */
  border: 1px solid #4b5563;     /* 深灰邊框 */
  border-radius: 8px;

  font-size: 15px;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
}

/* Focus 狀態更容易辨識 */
input:focus,
select:focus {
  border-color: #3b82f6; /* 藍色聚焦樣式 */
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.4);
  outline: none;
  background: #1f1f1f; /* 聚焦時稍微更深一點 */
}

/* --- Error message --- */
.err {
  color: #dc2626;
  font-size: 13px;
  margin-top: -2px;
  line-height: 1.3;
}

/* --- Submit Button --- */
.primary {
  margin-top: 10px;
  padding: 12px 16px;
  border: 0;
  border-radius: 8px;
  background: #111827;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.2s, opacity 0.2s;
}

.primary:hover:not(:disabled) {
  background: #1f2937;
}

.primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* --- Coupon --- */
.coupon {
  margin-top: 8px;
}

.coupon input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.coupon .hint {
  color: #6b7280;
  font-size: 12px;
  margin-top: 4px;
}

/* --- Total --- */
.total {
  margin-top: 12px;
  font-size: 1.1rem;
}

/* --- RWD 保留 --- */
@media (min-width: 900px) {
  .layout {
    grid-template-columns: 2fr 1fr;
  }
}

</style>
