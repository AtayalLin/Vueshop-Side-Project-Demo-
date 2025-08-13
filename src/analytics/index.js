// Lightweight conditional analytics bootstrap

export function initAnalytics(router){
  const gaId = import.meta.env.VITE_GA_ID
  const sentryDsn = import.meta.env.VITE_SENTRY_DSN

  // GA4 (minimal) – only if GA ID exists
  if (gaId) {
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer',gaId);

    // route view
    router.afterEach((to)=>{
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({ event:'pageview', page_path: to.fullPath })
    })
  }

  // Sentry (minimal) – only if DSN exists
  if (sentryDsn) {
    import('https://browser.sentry-cdn.com/7.108.0/bundle.tracing.min.js').then(()=>{
      // global Sentry is available as window.Sentry
      window.Sentry && window.Sentry.init({ dsn: sentryDsn, tracesSampleRate: 0.1 })
    }).catch(()=>{})
  }
}

