import { AUDIO_FILES, COACHES, AudioCategory, CoachInfo } from '../config/audioConfig';

class AudioManager {
  private currentCoach: 'female' | 'male' = 'female';
  private isMuted: boolean = false;
  private currentAudio: HTMLAudioElement | null = null;
  private audioCache: Map<string, HTMLAudioElement> = new Map();
  private lastPlayedByCategory: Map<string, string> = new Map();

  constructor() {
    this.initFromStorage();
  }

  private initFromStorage() {
    if (typeof window === 'undefined') return;
    try {
      const storedStats = localStorage.getItem('rashaka_user_stats');
      if (storedStats) {
        const stats = JSON.parse(storedStats);
        if (stats.voiceGender === 'male' || stats.voiceGender === 'female') {
          this.currentCoach = stats.voiceGender;
        }
      }
      const directCoach = localStorage.getItem('rashaka_voice_coach');
      if (directCoach === 'male' || directCoach === 'female') {
        this.currentCoach = directCoach;
      }
      const storedMute = localStorage.getItem('rashaka_sound_muted');
      if (storedMute !== null) {
        this.isMuted = storedMute === 'true';
      }
      this.preloadPreviews();
    } catch (e) {
      console.warn('Audio Manager failed to load settings from storage:', e);
    }
  }

  public preloadPreviews() {
    if (typeof window === 'undefined') return;
    (['female', 'male'] as const).forEach((coach) => {
      const files = AUDIO_FILES[coach]?.preview || [];
      files.forEach((file) => {
        if (file && !this.audioCache.has(file)) {
          try {
            const a = new Audio(file);
            a.preload = 'auto';
            this.audioCache.set(file, a);
          } catch (e) {}
        }
      });
    });
  }

  public getCoach(): 'female' | 'male' {
    return this.currentCoach;
  }

  public getCoachInfo(): CoachInfo {
    return COACHES[this.currentCoach];
  }

  public setCoach(coach: 'female' | 'male') {
    this.currentCoach = coach;
    try {
      localStorage.setItem('rashaka_voice_coach', coach);
      const storedStats = localStorage.getItem('rashaka_user_stats');
      if (storedStats) {
        const stats = JSON.parse(storedStats);
        stats.voiceGender = coach;
        localStorage.setItem('rashaka_user_stats', JSON.stringify(stats));
      }
    } catch (e) {}
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopAudio();
    }
    try {
      localStorage.setItem('rashaka_sound_muted', String(muted));
    } catch (e) {}
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Immediately stops any currently playing audio track across the entire audio engine.
   */
  public stopAudio() {
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch (e) {}
      this.currentAudio = null;
    }
    // Also pause any stray audio elements in the cache to guarantee single-channel audio
    this.audioCache.forEach((audio) => {
      try {
        if (!audio.paused) {
          audio.pause();
          audio.currentTime = 0;
        }
      } catch (e) {}
    });
  }

  /**
   * Picks a random audio file from the candidate list for a given category & coach,
   * guaranteeing that the exact same file is not played twice in a row (if > 1 candidate).
   */
  public getNextAudioFile(category: AudioCategory, coachId: 'female' | 'male' = this.currentCoach): string {
    const files = AUDIO_FILES[coachId]?.[category] || [];
    if (files.length === 0) return '';
    
    // Deduplicate array to get unique URL candidates
    const uniqueFiles = Array.from(new Set(files));
    if (uniqueFiles.length === 1) return uniqueFiles[0];

    const categoryKey = `${coachId}_${category}`;
    const lastPlayed = this.lastPlayedByCategory.get(categoryKey);

    // Filter out the last played file to avoid consecutive repetition
    const availableFiles = uniqueFiles.filter(f => f !== lastPlayed);
    const candidates = availableFiles.length > 0 ? availableFiles : uniqueFiles;

    // Pick 1 random file from candidates
    const selectedFile = candidates[Math.floor(Math.random() * candidates.length)];

    this.lastPlayedByCategory.set(categoryKey, selectedFile);
    return selectedFile;
  }

  /**
   * Plays audio for a given category with single-channel guarantee, lazy caching, and error safety.
   */
  public playAudio(category: AudioCategory, coachId: 'female' | 'male' = this.currentCoach): Promise<boolean> {
    if (this.isMuted) {
      return Promise.resolve(false);
    }

    // Stop previous audio immediately
    this.stopAudio();

    const filePath = this.getNextAudioFile(category, coachId);
    if (!filePath) return Promise.resolve(false);

    return new Promise((resolve) => {
      try {
        let audio = this.audioCache.get(filePath);
        if (!audio) {
          audio = new Audio(filePath);
          audio.preload = 'auto';
          this.audioCache.set(filePath, audio);
        }

        audio.currentTime = 0;
        this.currentAudio = audio;

        const onEnded = () => {
          if (this.currentAudio === audio) {
            this.currentAudio = null;
          }
          resolve(true);
        };

        const onError = (e: any) => {
          console.warn(`Audio playback issue for ${filePath}. Waiting for user MP3 files.`, e);
          if (this.currentAudio === audio) {
            this.currentAudio = null;
          }
          // Subtle fallback system beep so app never feels silent if file is missing
          this.playFallbackBeep();
          resolve(false);
        };

        audio.addEventListener('ended', onEnded, { once: true });
        audio.onerror = onError;

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Playing successfully
            })
            .catch((err) => {
              console.warn(`Autoplay or load blocked for ${filePath}:`, err);
              if (this.currentAudio === audio) {
                this.currentAudio = null;
              }
              this.playFallbackBeep();
              resolve(false);
            });
        }
      } catch (err) {
        console.warn('Failed to initiate audio playback:', err);
        this.playFallbackBeep();
        resolve(false);
      }
    });
  }

  private synthCtx: AudioContext | null = null;

  private getSynthContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return null;
      if (!this.synthCtx || this.synthCtx.state === 'closed') {
        this.synthCtx = new AudioCtx();
      }
      if (this.synthCtx.state === 'suspended') {
        this.synthCtx.resume().catch(() => {});
      }
      return this.synthCtx;
    } catch (e) {
      return null;
    }
  }

  /**
   * Play a refreshing water droplet / glass fill chime effect for water logging
   */
  public playWaterChime() {
    if (this.isMuted) return;
    try {
      const ctx = this.getSynthContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Primary droplet oscillator
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.18);
    } catch (e) {}
  }

  /**
   * Play a pleasant melodic chime when completing or unchecking a daily task
   */
  public playTaskChime(completed: boolean = true) {
    if (this.isMuted) return;
    try {
      const ctx = this.getSynthContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      if (completed) {
        // Bright 2-note ascending chime (E5 -> B5)
        const tones = [659.25, 987.77];
        tones.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);

          gain.gain.setValueAtTime(0, now + idx * 0.08);
          gain.gain.setValueAtTime(0.14, now + idx * 0.08 + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.25);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 0.25);
        });
      } else {
        // Soft uncheck sound
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(330, now + 0.08);

        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.1);
      }
    } catch (e) {}
  }

  /**
   * Fallback tactile sound synth (when MP3 files are missing or offline)
   */
  private playFallbackBeep() {
    if (this.isMuted) return;
    try {
      const ctx = this.getSynthContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) {}
  }
}

export const audioManager = new AudioManager();
