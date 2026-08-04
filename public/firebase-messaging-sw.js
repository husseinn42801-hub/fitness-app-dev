// Service worker for Firebase Cloud Messaging in "رشاقة 30 يوم" app
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

// Default client configuration placeholder.
// We also try to read config stored from the main thread via IndexedDB if available.
const firebaseConfig = {
  apiKey: "AIzaSyFakeKeyPlaceholderForBuild",
  authDomain: "rashaka-30day.firebaseapp.com",
  projectId: "rashaka-30day",
  storageBucket: "rashaka-30day.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};

let messaging = null;

try {
  firebase.initializeApp(firebaseConfig);
  if (firebase.messaging.isSupported()) {
    messaging = firebase.messaging();
    
    // Background message handler
    messaging.onBackgroundMessage((payload) => {
      console.log('[firebase-messaging-sw.js] Received background message: ', payload);
      
      const notificationTitle = payload.notification?.title || payload.data?.title || 'رَشاقَة 30 يَوْم 🏃‍♂️';
      const notificationOptions = {
        body: payload.notification?.body || payload.data?.body || 'لديك تذكير رياضي وصحي جديد!',
        icon: payload.notification?.icon || payload.data?.icon || '/assets/logo.png',
        badge: '/favicon.ico',
        data: {
          click_action: payload.notification?.click_action || payload.data?.click_action || payload.data?.url || '/?tab=workout',
          ...payload.data
        },
        tag: payload.data?.tag || 'rashaka-notification',
        renotify: true
      };

      return self.registration.showNotification(notificationTitle, notificationOptions);
    });
  }
} catch (error) {
  console.warn('[firebase-messaging-sw.js] Firebase initialization failed, running in standard Push fallback mode:', error);
}

// -------------------------------------------------------------
// WEBVIEW & GENERAL COMPATIBILITY FALLBACK: DIRECT 'PUSH' EVENT
// -------------------------------------------------------------
// This catches raw web-push payloads, perfect for Android WebView / AppCreator24 wrappers
self.addEventListener('push', function(event) {
  console.log('[firebase-messaging-sw.js] Raw Push Event received.');
  
  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = { body: event.data.text() };
    }
  }

  const title = data.title || data.notification?.title || 'رَشاقَة 30 يَوْم 🏃‍♂️';
  const options = {
    body: data.body || data.notification?.body || 'حان وقت التمرين وشرب الماء! 💧🏋️‍♀️',
    icon: data.icon || data.notification?.icon || '/assets/logo.png',
    badge: '/favicon.ico',
    tag: data.tag || 'rashaka-notification',
    renotify: true,
    data: {
      click_action: data.click_action || data.notification?.click_action || data.url || '/?tab=workout',
      ...data
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// -------------------------------------------------------------
// CLICK HANDLER: OPEN APP AND FOCUS/NAVIGATE TO TARGET URL
// -------------------------------------------------------------
self.addEventListener('notificationclick', function(event) {
  console.log('[firebase-messaging-sw.js] Notification clicked.');
  event.notification.close();

  const clickAction = event.notification.data?.click_action || '/?tab=workout';

  event.waitUntil(
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then(function(windowClients) {
      // Focus existing window and navigate if open
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        if ('focus' in client) {
          client.postMessage({
            type: 'NAVIGATE_TO_TAB',
            url: clickAction
          });
          return client.focus();
        }
      }
      // If no window is open, open a new one
      if (clients.openWindow) {
        return clients.openWindow(clickAction);
      }
    })
  );
});
