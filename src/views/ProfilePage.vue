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
  padding: 24px 0;
  width: 100%;
}
.card {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 16px;
  width: 100%;
}
.row {
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
}

/* 僅在小/中/大型行動裝置與平板電腦下調整：上方標題置中、卡片置中、欄位由上往下排列 */
@media (max-width: 480px),
  (min-width: 600px) and (max-width: 767px),
  (min-width: 768px) and (max-width: 1023px),
  (min-width: 1024px) and (max-width: 1279px) {
  .profile {
    display: flex;
    flex-direction: column; /* 讓 h2 在上、卡片在下 */
    align-items: center; /* 標題與卡片都置中 */
    padding: 16px 0 24px; /* 移除左右 padding，避免視覺偏移 */
    width: 100%;
  }
  .card {
    width: 100%;
    max-width: 520px;
    margin-inline: auto;
  }
  .row {
    display: flex;
    flex-direction: column; /* label 在上，值在下 */
    align-items: center;
    gap: 4px;
    text-align: center;
  }
  .row > span,
  .row > strong {
    max-width: 100%;
    overflow-wrap: anywhere;
    word-break: break-word;
  }
}
</style>
