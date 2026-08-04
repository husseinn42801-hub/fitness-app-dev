/**
 * App Configuration & Social Share Settings
 * 
 * To modify the app sharing URLs or Google Play state in the future,
 * update the fields in this file without modifying component logic.
 */

export const APP_CONFIG = {
  // App Identifiers & Titles
  appName: 'تمارين منزلية ولياقة بدنية',
  
  // 1. Vercel / Development Web Hosting Link (e.g. https://your-app.vercel.app)
  vercelUrl: 'https://your-app.vercel.app',

  // 2. Google Play Store Configurations
  googlePlayPackageName: 'com.homeworkout.fitness',
  
  // Set to true once the app is published on Google Play
  isPublishedToGooglePlay: false,
  
  // Optional custom Google Play URL override (if empty, auto-constructed using googlePlayPackageName)
  customGooglePlayUrl: '',

  /**
   * Helper function that returns the active share link dynamically:
   * - If published on Google Play, returns the Play Store link.
   * - Otherwise, returns the Vercel or current deployment URL.
   */
  getShareUrl: (): string => {
    // Check Google Play store link first if published
    if (APP_CONFIG.isPublishedToGooglePlay) {
      if (APP_CONFIG.customGooglePlayUrl && APP_CONFIG.customGooglePlayUrl.trim() !== '') {
        return APP_CONFIG.customGooglePlayUrl.trim();
      }
      if (APP_CONFIG.googlePlayPackageName && APP_CONFIG.googlePlayPackageName.trim() !== '') {
        return `https://play.google.com/store/apps/details?id=${APP_CONFIG.googlePlayPackageName.trim()}`;
      }
    }

    // Fallback to configured Vercel URL if modified
    if (APP_CONFIG.vercelUrl && APP_CONFIG.vercelUrl !== 'https://your-app.vercel.app' && APP_CONFIG.vercelUrl.trim() !== '') {
      return APP_CONFIG.vercelUrl.trim();
    }

    // Fallback to current browser origin if in client
    if (typeof window !== 'undefined' && window.location && window.location.origin) {
      return window.location.origin;
    }

    return APP_CONFIG.vercelUrl;
  },

  /**
   * Generates the complete Arabic social share text
   */
  getShareMessage: (): string => {
    const link = APP_CONFIG.getShareUrl();
    return `💪 جرّب تطبيق "تمارين منزلية ولياقة بدنية"

تمارين منزلية، خطط تدريب، تغذية، وتتبع للتقدم، كل ذلك في تطبيق واحد.

حمّل التطبيق من هنا:
${link}`;
  }
};
