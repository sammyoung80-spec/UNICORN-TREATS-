/**
 * Native Service Worker Registration for Unicorn Treats PWA.
 * Enables home-screen installation and offline caching without virtual module dependencies.
 */
export function initPWA() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then((registration) => {
          console.log('[Unicorn Treats PWA] Service Worker registered with scope:', registration.scope);

          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker) {
              installingWorker.onstatechange = () => {
                if (installingWorker.state === 'installed') {
                  if (navigator.serviceWorker.controller) {
                    console.log('[Unicorn Treats PWA] New content is available; please refresh.');
                  } else {
                    console.log('[Unicorn Treats PWA] Content is cached for offline use.');
                  }
                }
              };
            }
          };
        })
        .catch((error) => {
          console.warn('[Unicorn Treats PWA] Service Worker registration failed:', error);
        });
    });
  }
}
