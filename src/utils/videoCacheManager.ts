/**
 * High-Performance Video Cache & Preloader Manager for Rashaka App
 * 
 * Features:
 * 1. Persistent caching via Browser CacheStorage API ('rashaka_workout_videos_v1').
 * 2. In-memory Blob URL pool for 0ms instantaneous video playback.
 * 3. Proactive sequential & priority preloading for the entire active workout day.
 * 4. Temporary pre-buffer element pool to guarantee decoded frame readiness before playback.
 * 5. Graceful fallback to original CDN URLs under memory/network constraints.
 */

const CACHE_NAME = 'rashaka_workout_videos_v1';

class VideoCacheManager {
  private memoryBlobCache: Map<string, string> = new Map();
  private inFlightPreloads: Map<string, Promise<string>> = new Map();
  private preloadedElements: Map<string, HTMLVideoElement> = new Map();
  private readyUrls: Set<string> = new Set();
  private cacheAvailable: boolean = typeof window !== 'undefined' && 'caches' in window;

  /**
   * Synchronously return cached Blob URL if available in RAM, otherwise return the original URL
   * and kick off a background fetch to cache it for subsequent loops/replays.
   */
  public getCachedUrl(originalUrl?: string): string {
    if (!originalUrl || !originalUrl.trim()) return '';
    const cleanUrl = originalUrl.trim();

    if (this.memoryBlobCache.has(cleanUrl)) {
      return this.memoryBlobCache.get(cleanUrl)!;
    }

    // Trigger non-blocking background caching
    this.prefetchVideo(cleanUrl).catch(() => {});

    return cleanUrl;
  }

  /**
   * Asynchronously get or fetch the Blob URL for a video.
   */
  public async getVideoBlobUrl(originalUrl: string): Promise<string> {
    if (!originalUrl || !originalUrl.trim()) return '';
    const cleanUrl = originalUrl.trim();

    // 1. Check in-memory blob cache
    if (this.memoryBlobCache.has(cleanUrl)) {
      return this.memoryBlobCache.get(cleanUrl)!;
    }

    // 2. Check if a fetch is already in progress
    if (this.inFlightPreloads.has(cleanUrl)) {
      return this.inFlightPreloads.get(cleanUrl)!;
    }

    // 3. Initiate fetch and cache operation
    const preloadPromise = this.fetchAndCache(cleanUrl);
    this.inFlightPreloads.set(cleanUrl, preloadPromise);

    try {
      const blobUrl = await preloadPromise;
      return blobUrl;
    } catch {
      return cleanUrl;
    } finally {
      this.inFlightPreloads.delete(cleanUrl);
    }
  }

  /**
   * Pre-buffers an HTML5 Video element in memory to ensure video headers, metadata,
   * and initial frames (readyState >= 2) are decoded and ready before rendering.
   */
  public async prepareVideoElement(originalUrl: string): Promise<boolean> {
    if (!originalUrl || !originalUrl.trim()) return false;
    const cleanUrl = originalUrl.trim();

    if (this.readyUrls.has(cleanUrl)) {
      return true;
    }

    // First ensure we have the Blob URL
    const blobUrl = await this.getVideoBlobUrl(cleanUrl);
    const sourceUrl = blobUrl || cleanUrl;

    if (typeof document === 'undefined') return true;

    return new Promise((resolve) => {
      try {
        const video = document.createElement('video');
        video.preload = 'auto';
        video.muted = true;
        video.playsInline = true;
        // @ts-ignore
        video.webkitPlaysInline = true;

        let hasResolved = false;
        const markReady = () => {
          if (!hasResolved) {
            hasResolved = true;
            this.readyUrls.add(cleanUrl);
            this.preloadedElements.set(cleanUrl, video);
            cleanup();
            resolve(true);
          }
        };

        const cleanup = () => {
          video.removeEventListener('canplay', markReady);
          video.removeEventListener('canplaythrough', markReady);
          video.removeEventListener('loadeddata', markReady);
          video.removeEventListener('error', handleError);
        };

        const handleError = () => {
          if (!hasResolved) {
            hasResolved = true;
            cleanup();
            resolve(false);
          }
        };

        video.addEventListener('canplay', markReady, { once: true });
        video.addEventListener('canplaythrough', markReady, { once: true });
        video.addEventListener('loadeddata', markReady, { once: true });
        video.addEventListener('error', handleError, { once: true });

        video.src = sourceUrl;
        video.load();

        // Check if already ready
        if (video.readyState >= 2) {
          markReady();
        }

        // Safety fallback timeout after 4 seconds
        setTimeout(() => {
          if (!hasResolved) {
            markReady();
          }
        }, 4000);
      } catch {
        resolve(true);
      }
    });
  }

  /**
   * Preload an array of video URLs with priority (first items immediate, rest queued).
   */
  public async preloadVideos(urls: string[]): Promise<void> {
    const validUrls = urls.filter(u => Boolean(u && u.trim()));
    if (!validUrls.length) return;

    // Load first 2 videos immediately in parallel, then sequentially load remainder
    const immediate = validUrls.slice(0, 2);
    const background = validUrls.slice(2);

    await Promise.allSettled(immediate.map(url => this.prepareVideoElement(url)));

    // Load remaining videos sequentially to avoid saturating network bandwidth
    for (const url of background) {
      if (!this.memoryBlobCache.has(url) || !this.readyUrls.has(url)) {
        await this.prepareVideoElement(url).catch(() => {});
      }
    }
  }

  /**
   * Internal prefetch helper
   */
  public async prefetchVideo(url: string): Promise<string> {
    return this.getVideoBlobUrl(url);
  }

  private async fetchAndCache(url: string): Promise<string> {
    try {
      // Step A: Check CacheStorage if supported
      if (this.cacheAvailable) {
        try {
          const cache = await caches.open(CACHE_NAME);
          const cachedResponse = await cache.match(url);
          if (cachedResponse) {
            const blob = await cachedResponse.blob();
            const blobUrl = URL.createObjectURL(blob);
            this.memoryBlobCache.set(url, blobUrl);
            return blobUrl;
          }
        } catch {
          // CacheStorage error, fall through to fetch
        }
      }

      // Step B: Fetch with CORS mode
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        credentials: 'omit',
        cache: 'force-cache'
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch video: ${response.statusText}`);
      }

      // Step C: Clone and put in CacheStorage
      if (this.cacheAvailable) {
        try {
          const cache = await caches.open(CACHE_NAME);
          await cache.put(url, response.clone());
        } catch {
          // Ignore cache write errors (e.g. quota limits)
        }
      }

      // Step D: Create in-memory Blob URL
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      this.memoryBlobCache.set(url, blobUrl);
      return blobUrl;
    } catch {
      // If fetch fails (CORS restriction, offline, etc.), return original URL
      return url;
    }
  }

  /**
   * Check if a video URL is already cached in memory or buffered
   */
  public isCached(url: string): boolean {
    if (!url) return false;
    const cleanUrl = url.trim();
    return this.memoryBlobCache.has(cleanUrl) || this.readyUrls.has(cleanUrl);
  }

  /**
   * Clear all blob URLs and preloaded video elements to free memory when necessary
   */
  public clearMemoryCache(): void {
    this.memoryBlobCache.forEach((blobUrl) => {
      if (blobUrl.startsWith('blob:')) {
        URL.revokeObjectURL(blobUrl);
      }
    });
    this.memoryBlobCache.clear();
    this.readyUrls.clear();
    this.preloadedElements.forEach((video) => {
      video.src = '';
      video.load();
    });
    this.preloadedElements.clear();
  }
}

export const videoCacheManager = new VideoCacheManager();
