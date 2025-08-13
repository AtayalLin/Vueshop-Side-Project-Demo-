<template>
  <div class="profile" data-aos="fade-up">
    <h2>個人資料</h2>
    <div class="card" data-aos="fade-up" data-aos-delay="100">
      <div class="row">
        <span>暱稱</span>
        <strong>{{ auth.user.nickname || "(未設定)" }}</strong>
      </div>
      <div class="row">
        <span>Email</span>
        <strong>{{ auth.user.email || "(未知)" }}</strong>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useAuthStore } from "@/stores/authStore";
const auth = useAuthStore();
</script>
<style scoped>
.profile {
  padding: 24px;
}
.card {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 16px;
}
.row {
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
}

/* 僅在小/中/大型行動裝置調整版面，置中且避免文字外溢 */
@media (max-width: 480px),
  (min-width: 600px) and (max-width: 767px),
  (min-width: 768px) and (max-width: 1023px) {
  .profile {
    display: grid;
    place-items: center;
  }
  .card {
    width: min(92vw, 520px);
    margin-inline: auto;
  }
  .row {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    column-gap: 12px;
  }
  .row > span,
  .row > strong {
    max-width: 100%;
    overflow-wrap: anywhere;
    word-break: break-word;
    text-align: left;
  }
}
</style>
