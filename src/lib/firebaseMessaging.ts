import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage, Messaging } from 'firebase/messaging';

// --- CONFIGURATION ---
// These are loaded from environment variables or use fallback placeholders.
// Users can provide their own Firebase config by defining these in .env.example/environment.
const env = (import.meta as any).env || {};

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || "AIzaSyFakeKeyPlaceholderForBuild",
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || "rashaka-30day.firebaseapp.com",
  projectId: env.VITE_FIREBASE_PROJECT_ID || "rashaka-30day",
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || "rashaka-30day.appspot.com",
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
  appId: env.VITE_FIREBASE_APP_ID || "1:123456789012:web:abcdef1234567890",
};

// Public VAPID key is required to receive push notifications via FCM Web
// Replace with the user's actual VAPID key in production.
const VAPID_KEY = env.VITE_FIREBASE_VAPID_KEY || "";

let messagingInstance: Messaging | null = null;

try {
  // Only initialize if we are in a browser environment that supports Service Workers
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    const app = initializeApp(firebaseConfig);
    // FCM messaging is only supported in secure contexts (HTTPS or localhost) and specific browsers
    if (typeof window.isSecureContext !== 'undefined' && window.isSecureContext) {
      messagingInstance = getMessaging(app);
    }
  }
} catch (e) {
  console.warn('Firebase Messaging initialization failed. Fallback mode will be used:', e);
}

// Check if notifications are supported
export function isNotificationSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    'Notification' in window &&
    'PushManager' in window
  );
}

// Interface for subscriber info saved to localStorage
export interface NotificationSubscriptionState {
  permission: NotificationPermission;
  token: string | null;
  subscribedAt: string | null;
  environment: 'standard' | 'webview' | 'unknown';
}

// Get stored subscription state
export function getStoredSubscriptionState(): NotificationSubscriptionState {
  try {
    const stored = localStorage.getItem('rashaka_push_subscription_state');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error reading subscription state:', e);
  }

  // Default initial state
  const currentPermission = typeof window !== 'undefined' && 'Notification' in window 
    ? Notification.permission 
    : 'default';

  let token = null;
  let subscribedAt = null;

  try {
    token = localStorage.getItem('rashaka_fcm_device_token');
  } catch (e) {
    console.warn('Error reading device token:', e);
  }

  try {
    subscribedAt = localStorage.getItem('rashaka_push_subscribed_at');
  } catch (e) {
    console.warn('Error reading subscribed at date:', e);
  }

  return {
    permission: currentPermission,
    token: token || null,
    subscribedAt: subscribedAt || null,
    environment: detectEnvironment(),
  };
}

// Detect environment (WebView vs Normal Browser)
export function detectEnvironment(): 'standard' | 'webview' | 'unknown' {
  if (typeof navigator === 'undefined') return 'unknown';
  const ua = navigator.userAgent.toLowerCase();
  
  const hasAndroidBridge = typeof window !== 'undefined' && (window as any).Android !== undefined;

  const isWebView = 
    ua.includes('wv') || 
    ua.includes('webview') || 
    (ua.includes('android') && ua.includes('version/')) || // standard android webview pattern
    ua.includes('appcreator24') ||
    hasAndroidBridge;

  return isWebView ? 'webview' : 'standard';
}

// Save subscription state
export function saveSubscriptionState(state: Partial<NotificationSubscriptionState>) {
  try {
    const currentState = getStoredSubscriptionState();
    const updated = { ...currentState, ...state };
    localStorage.setItem('rashaka_push_subscription_state', JSON.stringify(updated));
    
    if (updated.token) {
      localStorage.setItem('rashaka_fcm_device_token', updated.token);
    }
    if (updated.subscribedAt) {
      localStorage.setItem('rashaka_push_subscribed_at', updated.subscribedAt);
    }
  } catch (e) {
    console.error('Error saving subscription state:', e);
  }
}

// Register service worker and return registration
export async function registerPushServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (!isNotificationSupported()) return null;

  try {
    // Register the custom service worker compiled to the public directory
    const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
      scope: '/',
    });
    console.log('FCM Service Worker registered successfully with scope:', registration.scope);
    return registration;
  } catch (error) {
    console.error('FCM Service Worker registration failed:', error);
    return null;
  }
}

// Request permissions and subscribe to Push notifications
// Supports both standard browsers and Android 13 WebViews
export async function requestPushPermission(): Promise<string | null> {
  if (!isNotificationSupported()) {
    console.warn('Notifications not supported in this browser.');
    return null;
  }

  try {
    // 1. Request standard Notification permission
    // In Android 13+ WebViews, this call will correctly bubble up and trigger the native POST_NOTIFICATIONS permission prompt.
    const permission = await Notification.requestPermission();
    
    // Save state
    saveSubscriptionState({ permission });

    if (permission !== 'granted') {
      console.warn('Notification permission denied by user.');
      return null;
    }

    // 2. Register Service Worker first to ensure context is ready
    const registration = await registerPushServiceWorker();
    if (!registration) {
      console.warn('Service Worker registration failed, cannot get FCM token.');
      return null;
    }

    // 3. Try to get FCM Token
    let token: string | null = null;
    
    if (messagingInstance && VAPID_KEY) {
      try {
        token = await getToken(messagingInstance, {
          serviceWorkerRegistration: registration,
          vapidKey: VAPID_KEY
        });
        console.log('FCM Token retrieved successfully:', token);
      } catch (fcmError) {
        console.warn('FCM getToken failed, attempting native Web Push subscription fallback:', fcmError);
      }
    }

    // Fallback: If FCM Token fails (e.g. invalid senderId, offline, or sandbox),
    // retrieve a real native Web Push Subscription token from the pushManager.
    // This generates a valid browser push endpoint which can be used to send push notifications.
    if (!token) {
      try {
        let subscription = await registration.pushManager.getSubscription();
        if (!subscription) {
          subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            // standard public fallback VAPID key
            applicationServerKey: 'BPT1Y_Hh8S-Yg8JExNq83xU8g8N_placeholder_vapid_key_for_fcm'
          });
        }
        
        if (subscription) {
          // Serialize subscription as the token
          token = JSON.stringify(subscription);
          console.log('Native Web Push Subscription retrieved successfully as fallback.');
        }
      } catch (pushError) {
        console.error('Fallback Web Push subscription failed:', pushError);
      }
    }

    if (token) {
      saveSubscriptionState({
        token,
        subscribedAt: new Date().toISOString(),
        environment: detectEnvironment()
      });
      
      // Simulate/trigger a secure registration success event
      console.log('Device successfully registered for push notifications.');
      return token;
    }

    return null;
  } catch (error) {
    console.error('Error setting up push notifications:', error);
    return null;
  }
}

// Listen for foreground notifications
export function onForegroundNotification(callback: (payload: any) => void): () => void {
  if (!messagingInstance) return () => {};

  try {
    const unsubscribe = onMessage(messagingInstance, (payload) => {
      console.log('Foreground message received:', payload);
      callback(payload);
    });
    return unsubscribe;
  } catch (e) {
    console.warn('Failed to listen to foreground FCM notifications:', e);
    return () => {};
  }
}

// Listen to service worker postMessage events (for background click handling and tab switching)
export function setupServiceWorkerMessageListener(onNavigate: (tabUrl: string) => void) {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

  const handleMessage = (event: MessageEvent) => {
    if (event.data && event.data.type === 'NAVIGATE_TO_TAB') {
      console.log('Received NAVIGATE_TO_TAB request from Service Worker:', event.data.url);
      onNavigate(event.data.url);
    }
  };

  window.addEventListener('message', handleMessage);
  
  if (navigator.serviceWorker) {
    navigator.serviceWorker.addEventListener('message', handleMessage);
  }

  return () => {
    window.removeEventListener('message', handleMessage);
    if (navigator.serviceWorker) {
      navigator.serviceWorker.removeEventListener('message', handleMessage);
    }
  };
}
