// Custom Service Worker to override UploadThing's restrictive CSP
// This allows Google Fonts to load properly

self.addEventListener('install', () => {
  console.log('Custom SW: Installing...');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Custom SW: Activating...');
  event.waitUntil(self.clients.claim());
});

// Don't intercept any fetch requests - let them pass through normally
// This prevents UploadThing's service worker from blocking Google Fonts