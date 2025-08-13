<template>
  <div class="checkout-page" data-aos="fade-up">
    <h2>結帳</h2>

    <div class="layout">
      <section class="form-area">
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
            <label>
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

      <aside class="summary">
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
        <p class="total">
          應付金額：<strong>{{ total }} 元</strong>
        </p>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/store/cart";
import {
  calcSubtotal,
  calcShipping,
  calcTotal,
} from "@/composables/usePricing";
import { Form, Field, ErrorMessage } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

const router = useRouter();
const cart = useCartStore();

// derived values
const hasItems = computed(() => cart.cartItems.length > 0);
const subtotal = computed(() => calcSubtotal(cart.cartItems));
const shipping = computed(() =>
  calcShipping(subtotal.value, { base: 80, freeThreshold: 999 })
);
const discount = computed(() => 0);
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
  orders.push({ id, items: cart.cartItems, form: values, total: total.value });
  localStorage.setItem("orders", JSON.stringify(orders));
  cart.cartItems = [];
  router.push({ name: "OrderSuccess", query: { id } });
}
</script>

<style scoped>
.checkout-page {
  padding: 24px;
}
.layout {
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr;
}
.form-area {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 16px;
}
.summary {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 16px;
}
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.grid .col-2 {
  grid-column: span 2;
}
input,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.err {
  color: #dc2626;
  font-size: 12px;
  margin-top: 4px;
  display: block;
}
.primary {
  margin-top: 12px;
  padding: 10px 14px;
  border: 0;
  border-radius: 8px;
  background: #111827;
  color: #fff;
  cursor: pointer;
}
.total {
  margin-top: 8px;
  font-size: 1.1rem;
}
@media (min-width: 900px) {
  .layout {
    grid-template-columns: 2fr 1fr;
  }
}
</style>
