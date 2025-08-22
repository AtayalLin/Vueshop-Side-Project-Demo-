<template>
  <footer class="site-footer">
    <div class="wrap">
      <div class="left">
        <strong>日式電商</strong>
        <small>© 2025 All Rights Reserved.</small>
      </div>
      <nav class="social">
        <a href="#" aria-label="Facebook" class="fb" title="Facebook" rel="noopener" target="_blank"> 
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="#1877F2" d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07c0 5.02 3.66 9.19 8.44 9.93v-7.03H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.45h-1.25c-1.23 0-1.61.77-1.61 1.56v1.87h2.74l-.44 2.9h-2.3V22c4.78-.74 8.44-4.91 8.44-9.93z"/></svg>
        </a>
        <a href="#" aria-label="Instagram" class="ig" title="Instagram" rel="noopener" target="_blank">
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="#E4405F" d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.65 0 3 1.35 3 3v10c0 1.65-1.35 3-3 3H7c-1.65 0-3-1.35-3-3V7c0-1.65 1.35-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm5.5-.75a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z"/></svg>
        </a>
        <a href="#" aria-label="LINE" class="line" title="LINE" rel="noopener" target="_blank">
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="#00C300" d="M19.05 4H4.95C3.33 4 2 5.33 2 6.95v7.59C2 16.17 3.33 17.5 4.95 17.5h7.68l2.9 2.5c.22.19.57.04.57-.25v-2.25h2.95c1.62 0 2.95-1.33 2.95-2.95V6.95C22 5.33 20.67 4 19.05 4zM7.71 13.1H6.2V8.55h1.51v4.55zm3.85 0H10.05V8.55h1.51v4.55zm3.86 0h-1.51V8.55h1.51v4.55zm3.86 0h-1.51V8.55h1.51v4.55z"/></svg>
        </a>
      </nav>
    </div>
  </footer>
</template>
<style scoped>
.site-footer{ border-top:1px solid #e5e7eb; padding:20px 16px; background:#fff; }
.wrap{ display:flex; align-items:center; justify-content:space-between; gap:16px; max-width:1280px; margin-inline:auto; }
.left{ display:flex; flex-direction:column; gap:4px; color:#374151; }
.social{ display:flex; gap:14px; }
.social a{ display:inline-flex; padding:8px; border-radius:8px; background:#f9fafb; transition:transform .15s ease, box-shadow .2s ease; }
.social a:hover{ transform: translateY(-1px); box-shadow: 0 8px 20px rgba(0,0,0,.08); }
@media (max-width: 768px){ .wrap{ flex-direction:column; align-items:center; text-align:center; } }
</style>

