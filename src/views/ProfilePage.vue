<template>
  <div class="profile" data-aos="fade-up">
    <h2>個人資料</h2>
    <div class="card" data-aos="fade-up" data-aos-delay="100">
      <div class="row">
        <span>暱稱</span>
        <strong>{{ auth.user.nickname || '(未設定)' }}</strong>
      </div>
      <div class="row">
        <span>Email</span>
        <strong>{{ auth.user.email || '(未知)' }}</strong>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useAuthStore } from '@/stores/authStore'
const auth = useAuthStore()
</script>
<style scoped>
.profile{ padding:24px; }
.card{ background:#fff; border:1px solid #eee; border-radius:12px; padding:16px; }
.row{ display:flex; justify-content:space-between; margin:.5rem 0; }
</style>

