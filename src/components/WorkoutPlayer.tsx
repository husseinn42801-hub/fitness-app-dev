import React, { useState, useEffect, useRef } from 'react';
import { Exercise, WorkoutDay } from '../types';
import { EXERCISES_DB } from '../data/exercises';
import { ExerciseModel } from './ExerciseModel';
import { CountUp } from './CountUp';
// @ts-ignore
import goldenTrophyImg from '../assets/images/golden_trophy_cup_1785369511939.jpg';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  VolumeX,
  Info, 
  Check, 
  RefreshCw, 
  Trophy, 
  Flame, 
  Clock, 
  Lightbulb,
  Mic,
  Dumbbell,
  PlaySquare,
  Sparkles,
  Zap,
  CheckCircle2,
  X,
  Share2,
  Copy,
  Award,
  Layers,
  Activity,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { audioManager } from '../lib/audioManager';
import { COACHES } from '../config/audioConfig';

interface WorkoutPlayerProps {
  day: WorkoutDay;
  onFinishWorkout: (dayNumber: number, caloriesBurned: number) => void;
  onClose: () => void;
}

export const WorkoutPlayer: React.FC<WorkoutPlayerProps> = ({ day, onFinishWorkout, onClose }) => {
  const exerciseIds = day.exercises;
  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const exParam = params.get('exercise');
      if (exParam) {
        const parsed = parseInt(exParam, 10);
        if (!isNaN(parsed) && parsed >= 0 && parsed < day.exercises.length) {
          return parsed;
        }
      }
    } catch (e) {}
    return 0;
  });
  const activeExerciseId = exerciseIds[currentIndex];
  const fallbackExercise: Exercise = {
    id: activeExerciseId || 'placeholder',
    nameAr: 'تمرين بانتظار القائمة الجديدة',
    nameEn: 'Exercise Pending New Library',
    description: 'سيتم إضافة تفاصيل هذا التمرين عند تزويد القائمة الجديدة من التمارين.',
    duration: 30,
    caloriesPerMin: 5,
    animationType: 'jumping-jacks',
    steps: ['استعد لتنفيذ التمرين عند توفر القائمة الجديده.'],
    tips: ['حافظ على الحركة المنتظمة والتنفس السليم.'],
    muscleGroup: 'كامل الجسم',
    difficulty: 'مبتدئ'
  };
  const activeExercise: Exercise = EXERCISES_DB[activeExerciseId] || EXERCISES_DB['jumping_jacks'] || fallbackExercise;

  // Sets & Reps structure:
  // Dynamically populated based on day parameters
  const totalSets = day.totalSets || 3;
  const [currentSet, setCurrentSet] = useState<number>(1);
  
  // All exercises are now 100% time-based as requested by the user
  const isTimeBased = true;
  const exerciseReps = 12; // Kept for metadata/legacy but not used for flow control
  
  // Timer States
  const [timeLeft, setTimeLeft] = useState<number>(activeExercise.duration);
  const [isPlaying, setIsPlaying] = useState<boolean>(() => {
    if (typeof document !== 'undefined') {
      return !document.hidden && document.hasFocus();
    }
    return true;
  });
  
  // Preparation Countdown (before the very first set of an exercise)
  const [isReadyCount, setIsReadyCount] = useState<boolean>(true);
  const [readyTimeLeft, setReadyTimeLeft] = useState<number>(15); // 15 seconds warm-up
  
  // Rest period between sets of the same exercise, or between exercises
  const [isResting, setIsResting] = useState<boolean>(false);
  const [restTimeLeft, setRestTimeLeft] = useState<number>(day.restTimePerSet || 15);
  
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [muted, setMuted] = useState<boolean>(() => audioManager.getMuted());
  const [showTipsModal, setShowTipsModal] = useState<boolean>(false);
  const [isAutoPaused, setIsAutoPaused] = useState<boolean>(() => {
    if (typeof document !== 'undefined') {
      return document.hidden || !document.hasFocus();
    }
    return false;
  });
  const [isAdActive, setIsAdActive] = useState<boolean>(() => {
    if (typeof document !== 'undefined') {
      return document.hidden || !document.hasFocus();
    }
    return false;
  });
  
  // Real-time coach voice settings (initialized from saved preference)
  const [voiceGenderPref, setVoiceGenderPref] = useState<'male' | 'female'>(() => audioManager.getCoach());

  // Theme Detection (reads directly from localStorage to ensure 100% theme alignment)
  const [isDark, setIsDark] = useState<boolean>(() => {
    return localStorage.getItem('rashaka_theme') === 'dark';
  });

  // --- FULLSCREEN & LANDSCAPE ORIENTATION STATE ---
  const playerContainerRef = useRef<HTMLDivElement | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const toggleFullscreen = async () => {
    try {
      if (!isFullscreen) {
        // 1. Enter Fullscreen Mode
        const elem = playerContainerRef.current || document.documentElement;
        if (elem.requestFullscreen) {
          await elem.requestFullscreen().catch(() => {});
        } else if ((elem as any).webkitRequestFullscreen) {
          await (elem as any).webkitRequestFullscreen().catch(() => {});
        } else if ((elem as any).msRequestFullscreen) {
          await (elem as any).msRequestFullscreen().catch(() => {});
        }

        // 2. Lock Orientation to Landscape (if supported by browser/WebView)
        if (window.screen && window.screen.orientation && (window.screen.orientation as any).lock) {
          try {
            await (window.screen.orientation as any).lock('landscape').catch(() => {});
          } catch (e) {
            console.log('Landscape orientation lock unsupported or denied:', e);
          }
        }
        setIsFullscreen(true);
      } else {
        // 1. Exit Fullscreen Mode
        if (document.fullscreenElement || (document as any).webkitFullscreenElement) {
          if (document.exitFullscreen) {
            await document.exitFullscreen().catch(() => {});
          } else if ((document as any).webkitExitFullscreen) {
            await (document as any).webkitExitFullscreen().catch(() => {});
          }
        }

        // 2. Lock Orientation back to Portrait
        if (window.screen && window.screen.orientation) {
          try {
            if ((window.screen.orientation as any).lock) {
              await (window.screen.orientation as any).lock('portrait').catch(() => {});
            }
            if (window.screen.orientation.unlock) {
              window.screen.orientation.unlock();
            }
          } catch (e) {
            console.log('Portrait orientation unlock error:', e);
          }
        }
        setIsFullscreen(false);
      }
    } catch (err) {
      console.warn('Error toggling fullscreen:', err);
      setIsFullscreen(!isFullscreen);
    }
  };

  // Sync fullscreen state with document fullscreenchange events (e.g. Esc key press or gesture exit)
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isDocFs = Boolean(
        document.fullscreenElement || (document as any).webkitFullscreenElement
      );
      if (!isDocFs && isFullscreen) {
        setIsFullscreen(false);
        if (window.screen && window.screen.orientation) {
          try {
            if ((window.screen.orientation as any).lock) {
              (window.screen.orientation as any).lock('portrait').catch(() => {});
            }
            if (window.screen.orientation.unlock) {
              window.screen.orientation.unlock();
            }
          } catch (e) {}
        }
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, [isFullscreen]);

  // Clean up on unmount (leaving exercise page): ALWAYS exit fullscreen and revert to portrait orientation
  useEffect(() => {
    return () => {
      if (document.fullscreenElement || (document as any).webkitFullscreenElement) {
        if (document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        } else if ((document as any).webkitExitFullscreen) {
          (document as any).webkitExitFullscreen().catch(() => {});
        }
      }
      if (window.screen && window.screen.orientation) {
        try {
          if ((window.screen.orientation as any).lock) {
            (window.screen.orientation as any).lock('portrait').catch(() => {});
          }
          if (window.screen.orientation.unlock) {
            window.screen.orientation.unlock();
          }
        } catch (e) {}
      }
    };
  }, []);

  // Confetti Canvas Animation Ref for Workout Completion
  const confettiCanvasRef = useRef<HTMLCanvasElement | null>(null);
  // Track if encouragement audio was already triggered for the active set
  const hasPlayedEncourageForSetRef = useRef<boolean>(false);

  useEffect(() => {
    if (!isFinished) return;
    const canvas = confettiCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!confettiCanvasRef.current) return;
      width = confettiCanvasRef.current.width = window.innerWidth;
      height = confettiCanvasRef.current.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    class Particle {
      x: number;
      y: number;
      size: number;
      color: string;
      speedX: number;
      speedY: number;
      rotation: number;
      rotationSpeed: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * -height - 20;
        this.size = Math.random() * 8 + 6;

        const colors = [
          '#FF5F2E', // Core Orange
          '#FF912E', // Amber
          '#FFD700', // Gold
          '#38BDF8', // Sky Blue
          '#34D399', // Emerald
          '#EC4899', // Pink
          '#8B5CF6'  // Purple
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 5 + 3;
        this.rotation = Math.random() * Math.PI;
        this.rotationSpeed = Math.random() * 0.05 - 0.025;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        if (this.y > height) {
          this.y = -20;
          this.x = Math.random() * width;
          this.speedY = Math.random() * 5 + 3;
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.translate(this.x, this.y);
        c.rotate(this.rotation);
        c.fillStyle = this.color;
        c.fillRect(-this.size / 2, -this.size / 2, this.size, this.size / 1.5);
        c.restore();
      }
    }

    const particles: Particle[] = Array.from({ length: 140 }, () => new Particle());

    const loop = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });
      animationId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [isFinished]);

  const challengeTitle = React.useMemo(() => {
    try {
      const statsStr = localStorage.getItem('rashaka_user_stats');
      const stats = statsStr ? JSON.parse(statsStr) : null;
      const goal = stats?.goal || 'loss';
      
      const seasonId = localStorage.getItem('rashaka_current_season_id') || '';
      
      let goalText = 'لتنسيق القوام';
      if (goal === 'loss') {
        goalText = 'لتخسيس وحرق الدهون';
      } else if (goal === 'maintain') {
        goalText = 'لشد وترهلات الجسم';
      } else if (goal === 'gain') {
        goalText = 'لبناء العضلات وتضخيمها';
      }

      let seasonText = '';
      if (seasonId.includes('season_1')) {
        seasonText = ' - المستوى الأول';
      } else if (seasonId.includes('season_2')) {
        seasonText = ' - المستوى الثاني';
      } else if (seasonId.includes('season_3')) {
        seasonText = ' - المستوى الثالث';
      } else if (seasonId.includes('season_4')) {
        seasonText = ' - المستوى الرابع';
      }

      return `تحدي الـ 30 يوماً ${goalText}${seasonText}`;
    } catch (e) {
      return 'تحدي الـ 30 يوماً الرياضي';
    }
  }, []);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutsRef = useRef<number[]>([]);
  const lailaAudioRef = useRef<HTMLAudioElement | null>(null);

  // Prefetching videos for upcoming exercises in the workout day to guarantee smooth transitions
  const upcomingVideoUrls = React.useMemo(() => {
    const upcomingIds = exerciseIds.slice(currentIndex + 1, currentIndex + 3);
    return upcomingIds
      .map((id) => EXERCISES_DB[id]?.videoUrl || EXERCISES_DB[id]?.mp4Url)
      .filter((url): url is string => Boolean(url));
  }, [exerciseIds, currentIndex]);

  // Dynamic DOM prefetching element insertion into document.head
  useEffect(() => {
    if (!upcomingVideoUrls.length) return;

    const createdLinks: HTMLLinkElement[] = [];

    upcomingVideoUrls.forEach((url) => {
      const existing = document.querySelector(`link[href="${url}"]`);
      if (!existing) {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.as = 'video';
        link.href = url;
        document.head.appendChild(link);
        createdLinks.push(link);
      }
    });

    return () => {
      createdLinks.forEach((link) => {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      });
    };
  }, [upcomingVideoUrls]);

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
  };

  // Sync with theme changes if any
  useEffect(() => {
    const handleStorageChange = () => {
      setIsDark(localStorage.getItem('rashaka_theme') === 'dark');
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Sync muted and coach preferences with audioManager
  useEffect(() => {
    audioManager.setMuted(muted);
    window.dispatchEvent(new CustomEvent('app_mute_changed', { detail: { isMuted: muted } }));
  }, [muted]);

  // Listen to external mute state changes (e.g. from topbar button)
  useEffect(() => {
    const handleMuteChange = (e: any) => {
      if (typeof e.detail?.isMuted === 'boolean') {
        setMuted(e.detail.isMuted);
      }
    };
    window.addEventListener('app_mute_changed', handleMuteChange);
    return () => window.removeEventListener('app_mute_changed', handleMuteChange);
  }, []);

  useEffect(() => {
    audioManager.setCoach(voiceGenderPref);
  }, [voiceGenderPref]);

  // Sound Synth Helper (tactile system beeps)
  const playBeep = (freq = 800, duration = 0.15) => {
    if (muted || audioManager.getMuted()) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioContextClass();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.frequency.value = freq;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn('AudioContext not supported or gesture needed');
    }
  };

  // Touch gesture unlock to activate iOS Safari audio context
  const handleUserGestureUnlock = () => {
    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtxClass) {
        const ctx = new AudioCtxClass();
        if (ctx.state === 'suspended') {
          ctx.resume();
        }
      }
    } catch (e) {
      console.warn('Audio gesture unlock failed:', e);
    }
  };

  // Unmount audio cleanup
  useEffect(() => {
    return () => {
      audioManager.stopAudio();
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      clearAllTimeouts();
    };
  }, []);

  // Refs to always access the latest state in global event listeners without recreating them
  const isPlayingRef = useRef<boolean>(isPlaying);
  const isAutoPausedRef = useRef<boolean>(isAutoPaused);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    isAutoPausedRef.current = isAutoPaused;
  }, [isAutoPaused]);

  // Handle pause / play and mute of Laila custom audio
  useEffect(() => {
    if (!isPlaying || muted) {
      if (lailaAudioRef.current) {
        lailaAudioRef.current.pause();
      }
    }
  }, [isPlaying, muted]);

  // Auto-pause timer when window loses focus, document is hidden (e.g. interstitial ads)
  useEffect(() => {
    const handleAdOpened = () => {
      setIsAdActive(true);
      audioManager.stopAudio();
    };

    const handleAdClosed = () => {
      setTimeout(() => {
        setIsAdActive(false);
      }, 300);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleAdOpened();
      } else {
        handleAdClosed();
      }
    };

    const handleBlur = () => {
      handleAdOpened();
    };

    const handleFocus = () => {
      handleAdClosed();
    };

    // Standard native event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    // Common standard ad wrapper events
    window.addEventListener('adShow', handleAdOpened);
    window.addEventListener('adOpened', handleAdOpened);
    window.addEventListener('adClosed', handleAdClosed);
    window.addEventListener('adDismiss', handleAdClosed);
    window.addEventListener('interstitialShow', handleAdOpened);
    window.addEventListener('interstitialDismiss', handleAdClosed);
    window.addEventListener('interstitialClosed', handleAdClosed);
    
    // Cordova/PhoneGap lifecycle events
    document.addEventListener('pause', handleAdOpened);
    document.addEventListener('resume', handleAdClosed);

    // Register global bridge callbacks
    (window as any).onAdShow = handleAdOpened;
    (window as any).onAdOpened = handleAdOpened;
    (window as any).onAdClosed = handleAdClosed;
    (window as any).onAdDismiss = handleAdClosed;
    (window as any).onInterstitialAdShow = handleAdOpened;
    (window as any).onInterstitialAdClosed = handleAdClosed;

    // Listen to standard postMessage bridge events
    const handleMessage = (e: MessageEvent) => {
      try {
        if (typeof e.data === 'string') {
          const msg = e.data.toLowerCase();
          if (msg.includes('ad_opened') || msg.includes('ad_show') || msg.includes('interstitial_show') || msg.includes('pause_workout')) {
            handleAdOpened();
          } else if (msg.includes('ad_closed') || msg.includes('ad_dismiss') || msg.includes('interstitial_close') || msg.includes('resume_workout')) {
            handleAdClosed();
          }
        } else if (e.data && typeof e.data === 'object') {
          const type = e.data.type || '';
          if (type === 'AD_OPENED' || type === 'AD_SHOW' || type === 'INTERSTITAL_SHOW') {
            handleAdOpened();
          } else if (type === 'AD_CLOSED' || type === 'AD_DISMISSED' || type === 'INTERSTITIAL_CLOSED') {
            handleAdClosed();
          }
        }
      } catch (err) {
        console.warn('postMessage parse error:', err);
      }
    };
    window.addEventListener('message', handleMessage);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('adShow', handleAdOpened);
      window.removeEventListener('adOpened', handleAdOpened);
      window.removeEventListener('adClosed', handleAdClosed);
      window.removeEventListener('adDismiss', handleAdClosed);
      window.removeEventListener('interstitialShow', handleAdOpened);
      window.removeEventListener('interstitialDismiss', handleAdClosed);
      window.removeEventListener('interstitialClosed', handleAdClosed);
      document.removeEventListener('pause', handleAdOpened);
      document.removeEventListener('resume', handleAdClosed);
      window.removeEventListener('message', handleMessage);

      delete (window as any).onAdShow;
      delete (window as any).onAdOpened;
      delete (window as any).onAdClosed;
      delete (window as any).onAdDismiss;
      delete (window as any).onInterstitialAdShow;
      delete (window as any).onInterstitialAdClosed;
    };
  }, []);

  // Sync automatic play/pause state when showTipsModal or isAdActive changes
  useEffect(() => {
    if (showTipsModal || isAdActive) {
      if (isPlaying) {
        setIsPlaying(false);
        setIsAutoPaused(true);
        audioManager.stopAudio();
      }
    } else {
      if (isAutoPaused) {
        setIsPlaying(true);
        setIsAutoPaused(false);
      }
    }
  }, [showTipsModal, isAdActive, isReadyCount, activeExercise]);

  // Trigger ready count / prepare screen on exercise or set changes
  useEffect(() => {
    if (isFinished) return;

    const isFocusedAndVisible = typeof document !== 'undefined' ? (!document.hidden && document.hasFocus()) : true;

    setIsPlaying(isFocusedAndVisible);
    setIsAutoPaused(!isFocusedAndVisible);
    setIsReadyCount(true);
    setIsResting(false);
    setReadyTimeLeft(15);
    setTimeLeft(activeExercise.duration);
    setCurrentSet(1);
    hasPlayedEncourageForSetRef.current = false;

    if (isFocusedAndVisible) {
      audioManager.playAudio('get_ready');
    }
  }, [currentIndex, activeExerciseId, isFinished]);

  // Main Timer Tick Logic (Counts down readyTime, exerciseTime, or restTime)
  useEffect(() => {
    if (!isPlaying || isFinished || isAdActive || showTipsModal) return;

    timerRef.current = setInterval(() => {
      if (typeof document !== 'undefined' && (document.hidden || !document.hasFocus())) {
        setIsPlaying(false);
        setIsAutoPaused(true);
        setIsAdActive(true);
        audioManager.stopAudio();
        return;
      }

      // 1. Preparation Countdown State (Get Ready)
      if (isReadyCount) {
        setReadyTimeLeft((prev) => {
          if (prev <= 1) {
            playBeep(1200, 0.4);
            hasPlayedEncourageForSetRef.current = false;
            audioManager.playAudio('start');
            setIsReadyCount(false);
            return 0;
          }
          if (prev <= 4) {
            playBeep(600, 0.1);
          }
          return prev - 1;
        });
      }
      // 2. Rest Period State (Rest)
      else if (isResting) {
        setRestTimeLeft((prev) => {
          if (prev <= 1) {
            playBeep(1100, 0.4);
            const nextSetNum = currentSet + 1;
            setCurrentSet(nextSetNum);
            setIsResting(false);
            hasPlayedEncourageForSetRef.current = false;
            audioManager.playAudio('start');
            setTimeLeft(activeExercise.duration);
            return 0;
          }

          // Countdown audio beeps for final 3 seconds of rest
          if (prev <= 4 && prev >= 2) {
            playBeep(600, 0.1);
          }

          return prev - 1;
        });
      }
      // 3. Active Exercise Execution State
      else {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            playBeep(1000, 0.5);
            return 0;
          }

          // Trigger encouragement at 50% midpoint of active set duration (once per set)
          const midpoint = Math.floor(activeExercise.duration / 2);
          if (prev <= midpoint && !hasPlayedEncourageForSetRef.current) {
            hasPlayedEncourageForSetRef.current = true;
            audioManager.playAudio('encourage');
          }
          
          if (prev <= 4 && prev >= 2) {
            playBeep(600, 0.1);
          }
          
          return prev - 1;
        });
      }
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isReadyCount, isResting, currentIndex, currentSet, isFinished, activeExerciseId, activeExercise.duration, isAdActive, showTipsModal]);

  // Safe side-effect triggers completion when timeLeft hits 0
  useEffect(() => {
    if (isPlaying && !isFinished && !isReadyCount && !isResting && timeLeft === 0 && !isAdActive && !showTipsModal) {
      handleSetCompletion();
    }
  }, [timeLeft, isPlaying, isFinished, isReadyCount, isResting, isAdActive, showTipsModal]);

  // Handles completion of one Set of the current exercise
  const handleSetCompletion = () => {
    playBeep(900, 0.3);
    
    if (currentSet < totalSets) {
      // Move to rest timer before starting next set
      setIsResting(true);
      setRestTimeLeft(day.restTimePerSet || 15);
      audioManager.playAudio('rest');
    } else {
      // Completed all 3 sets of this exercise!
      handleNextExerciseTransition();
    }
  };

  // Logic to switch to next exercise or finish workout
  const handleNextExerciseTransition = () => {
    try {
      if (currentIndex < exerciseIds.length - 1) {
        playBeep(1000, 0.4);
        audioManager.playAudio('exercise_complete');
        const nextIndex = currentIndex + 1;
        window.location.href = window.location.pathname + `?tab=workout&day=${day.dayNumber}&exercise=${nextIndex}`;
      } else {
        // Completed last exercise of the day!
        setIsFinished(true);
        setIsPlaying(false);
        audioManager.playAudio('workout_complete');
        
        try {
          playBeep(523.25, 0.3); 
          const t1 = window.setTimeout(() => playBeep(659.25, 0.3), 150); 
          const t2 = window.setTimeout(() => playBeep(783.99, 0.5), 300);
          timeoutsRef.current.push(t1, t2);
        } catch (soundErr) {
          console.warn("Audio feedback failed:", soundErr);
        }
      }
    } catch (err) {
      console.error("Error in handleNextExerciseTransition:", err);
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      audioManager.stopAudio();
    }
    setIsPlaying(!isPlaying);
    setIsAutoPaused(false);
  };

  // Manual trigger to force-skip the current set or rest timer
  const handleSkipRest = () => {
    if (isResting) {
      playBeep(1100, 0.2);
      const nextSetNum = currentSet + 1;
      setCurrentSet(nextSetNum);
      setIsResting(false);
      audioManager.playAudio('start');
      setTimeLeft(activeExercise.duration);
    }
  };

  const handleNextExerciseManual = () => {
    try {
      if (currentIndex < exerciseIds.length - 1) {
        const nextIndex = currentIndex + 1;
        window.location.href = window.location.pathname + `?tab=workout&day=${day.dayNumber}&exercise=${nextIndex}`;
      } else {
        setIsFinished(true);
        setIsPlaying(false);
        audioManager.playAudio('workout_complete');
        
        try {
          playBeep(523.25, 0.3); 
          const t1 = window.setTimeout(() => playBeep(659.25, 0.3), 150); 
          const t2 = window.setTimeout(() => playBeep(783.99, 0.5), 300);
          timeoutsRef.current.push(t1, t2);
        } catch (soundErr) {
          console.warn("Audio feedback failed:", soundErr);
        }
      }
    } catch (err) {
      console.error("Error in handleNextExerciseManual:", err);
    }
  };

  const handlePreviousExerciseManual = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      window.location.href = window.location.pathname + `?tab=workout&day=${day.dayNumber}&exercise=${prevIndex}`;
    }
  };

  const handleFinishAndSave = () => {
    audioManager.stopAudio();
    if (document.fullscreenElement || (document as any).webkitFullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen().catch(() => {});
      }
    }
    if (window.screen && window.screen.orientation) {
      try {
        if ((window.screen.orientation as any).lock) {
          (window.screen.orientation as any).lock('portrait').catch(() => {});
        }
        if (window.screen.orientation.unlock) {
          window.screen.orientation.unlock();
        }
      } catch (e) {}
    }
    setIsFullscreen(false);
    onFinishWorkout(day.dayNumber, day.caloriesEstimate);
  };

  const handleClose = () => {
    audioManager.stopAudio();
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    clearAllTimeouts();
    if (document.fullscreenElement || (document as any).webkitFullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen().catch(() => {});
      }
    }
    if (window.screen && window.screen.orientation) {
      try {
        if ((window.screen.orientation as any).lock) {
          (window.screen.orientation as any).lock('portrait').catch(() => {});
        }
        if (window.screen.orientation.unlock) {
          window.screen.orientation.unlock();
        }
      } catch (e) {}
    }
    setIsFullscreen(false);
    onClose();
  };

  const totalSteps = exerciseIds.length;
  const currentStepNum = currentIndex + 1;

  if (isFinished) {
    return (
      <div className={`fixed inset-0 z-50 flex flex-col justify-between p-6 transition-colors duration-300 ${
        isDark ? 'bg-[#0A0A0A] text-white' : 'bg-[#F9FAFB] text-gray-900'
      }`} dir="rtl">
        {/* Animated Confetti Canvas Layer */}
        <canvas ref={confettiCanvasRef} className="absolute inset-0 pointer-events-none z-10" />

        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 0.3 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#FF5F2E]/20 rounded-full blur-3xl"
          />
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 0.8, opacity: 0.3 }}
            transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
            className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-[#FF912E]/20 rounded-full blur-3xl"
          />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-6 relative z-10">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.1 }}
            className="relative my-2"
          >
            {/* Ambient Multi-layered Glow Background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#FF5F2E]/40 via-amber-500/30 to-yellow-400/20 rounded-full blur-2xl scale-125 animate-pulse" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="absolute -inset-4 rounded-full border border-amber-500/20 border-dashed pointer-events-none"
            />
            
            {/* Main Trophy Frame */}
            <div className="relative w-40 h-40 sm:w-44 sm:h-44 rounded-3xl bg-gradient-to-b from-[#1E1916] via-[#120F0D] to-[#0A0807] border-2 border-amber-500/40 p-2 shadow-[0_0_40px_rgba(255,145,46,0.3)] flex items-center justify-center overflow-hidden group">
              {/* Radial inner light beam */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/25 via-transparent to-transparent pointer-events-none" />
              
              {goldenTrophyImg && typeof goldenTrophyImg === 'string' && goldenTrophyImg.trim() !== '' ? (
                <motion.img 
                  src={goldenTrophyImg} 
                  alt="كأس البطولة الذهبي" 
                  className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)] z-10"
                  referrerPolicy="no-referrer"
                  animate={{ y: [-3, 3, -3], rotate: [0, 1.5, -1.5, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                />
              ) : null}

              {/* Sparkle Badges */}
              <span className="absolute top-2 right-2 text-amber-400 text-xs font-black bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30 flex items-center gap-1 z-20 shadow-xs">
                <Sparkles className="w-3 h-3 animate-spin-slow text-amber-400" />
                2026
              </span>
            </div>
          </motion.div>

          <div className="space-y-2">
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-extrabold tracking-tight"
            >
              تهانينا يا بطل! 🎉
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="text-sm text-[#FF912E] font-semibold"
            >
              لقد أتممت اليوم {day.dayNumber} بنجاح كامل!
            </motion.p>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className={`text-xs px-4 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
          >
            استمر بهذا الحماس والالتزام اليومي للوصول لهدفك ونسف الكرش وبناء الخصر الرياضي المثالي في 30 يوماً.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.75 }}
            className={`grid grid-cols-3 gap-2.5 w-full p-4 rounded-2xl border backdrop-blur-md ${
              isDark ? 'bg-[#1A1A1A] border-white/5' : 'bg-white border-gray-100 shadow-sm'
            }`}
          >
            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/5">
              <div className="flex items-center gap-1 text-[#FF5F2E] text-[10px] mb-0.5 font-bold">
                <Flame className="w-3.5 h-3.5 animate-pulse" />
                <span>حرق تقريبي</span>
              </div>
              <span className={`text-base font-black font-mono ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <CountUp end={day.caloriesEstimate} duration={1200} /> <span className="text-[10px] text-gray-400 font-sans font-medium">سعرة</span>
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/5">
              <div className="flex items-center gap-1 text-sky-400 text-[10px] mb-0.5 font-bold">
                <Clock className="w-3.5 h-3.5" />
                <span>مدة الجلسة</span>
              </div>
              <span className={`text-base font-black font-mono ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <CountUp end={day.estimatedTime} duration={1000} /> <span className="text-[10px] text-gray-400 font-sans font-medium">دقيقة</span>
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/5">
              <div className="flex items-center gap-1 text-emerald-400 text-[10px] mb-0.5 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>التمارين</span>
              </div>
              <span className={`text-base font-black font-mono ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {day.exercises.length} <span className="text-[10px] text-gray-400 font-sans font-medium">تمارين</span>
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/5">
              <div className="flex items-center gap-1 text-purple-400 text-[10px] mb-0.5 font-bold">
                <Layers className="w-3.5 h-3.5" />
                <span>المجموعات</span>
              </div>
              <span className={`text-base font-black font-mono ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {totalSets} <span className="text-[10px] text-gray-400 font-sans font-medium">جولات</span>
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/5">
              <div className="flex items-center gap-1 text-amber-400 text-[10px] mb-0.5 font-bold">
                <Activity className="w-3.5 h-3.5" />
                <span>الصعوبة</span>
              </div>
              <span className="text-xs font-black text-amber-400">
                {day.difficulty}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/5 col-span-1">
              <div className="flex items-center gap-1 text-rose-400 text-[10px] mb-0.5 font-bold">
                <Dumbbell className="w-3.5 h-3.5" />
                <span>العضلات</span>
              </div>
              <span className="text-[10px] font-bold text-gray-300 truncate max-w-full text-center">
                {day.targetMuscles?.[0] || 'كامل الجسم'}
              </span>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="max-w-md mx-auto w-full relative z-10 flex flex-col gap-3"
        >
          <button
            onClick={handleFinishAndSave}
            className="w-full py-4.5 bg-gradient-to-r from-[#FF5F2E] to-[#FF912E] hover:opacity-95 active:scale-98 text-white font-extrabold rounded-2xl text-xs transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-[#FF5F2E]/20"
          >
            <Sparkles className="w-4.5 h-4.5 animate-pulse text-yellow-200" />
            <span>تأكيد إكمال اليوم والرجوع للرئيسية</span>
          </button>
        </motion.div>
      </div>
    );
  }

  if (isFullscreen) {
    return (
      <div 
        ref={playerContainerRef}
        onClick={handleUserGestureUnlock}
        onTouchStart={handleUserGestureUnlock}
        className="fixed inset-0 z-[999] bg-[#0A0A0A] text-white flex flex-col w-screen h-screen overflow-hidden select-none font-sans" 
        dir="rtl"
      >
        {/* Top Header Bar for Landscape Fullscreen */}
        <div className="px-5 py-2 flex items-center justify-between border-b border-white/10 bg-[#121212]/90 backdrop-blur-md shrink-0 z-30">
          <button 
            onClick={toggleFullscreen}
            className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-[#FF5F2E] text-white transition-all cursor-pointer flex items-center gap-2 text-xs font-bold border border-white/10 shadow-sm"
            title="تصغير الشاشة (Portrait)"
          >
            <Minimize2 className="w-4 h-4 text-white" />
            <span>تصغير الشاشة</span>
          </button>

          <div className="text-center flex-1 min-w-0 px-4">
            <h3 className="text-xs font-black text-white truncate">
              {day.titleAr} <span className="text-gray-400 font-normal">|</span> <span className="text-[#FF5F2E]">{activeExercise.nameAr}</span>
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold bg-[#FF5F2E]/15 text-[#FF5F2E] px-2.5 py-1 rounded-lg border border-[#FF5F2E]/30">
              {currentStepNum} / {totalSteps}
            </span>

            <button
              onClick={() => {
                const nextGender = voiceGenderPref === 'male' ? 'female' : 'male';
                setVoiceGenderPref(nextGender);
                audioManager.setCoach(nextGender);
                audioManager.playAudio('preview', nextGender);
              }}
              className="px-2.5 py-1 bg-white/5 border border-white/10 text-[10px] font-bold rounded-lg text-gray-300 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <Mic className="w-3 h-3 text-[#FF5F2E]" />
              <span>{voiceGenderPref === 'male' ? 'كابتن حسين' : 'كابتن أميرة'}</span>
            </button>

            <button
              onClick={() => setMuted(!muted)}
              className={`p-2 rounded-xl transition-all cursor-pointer flex items-center justify-center ${
                muted 
                  ? 'bg-red-500 text-white border border-red-400' 
                  : 'bg-white/10 text-[#FF5F2E] border border-white/10'
              }`}
              title={muted ? 'تشغيل الصوت' : 'كتم الصوت'}
            >
              {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Main Fullscreen Body Layout */}
        <div className="flex-1 flex flex-row items-stretch p-3 sm:p-4 gap-4 min-h-0 w-full h-full overflow-hidden">
          
          {/* Left Column (الجانب الأيسر): Video / Rest Screen Stage + Integrated Controls Bar below */}
          <div className="flex-1 flex flex-col h-full min-w-0 min-h-0 gap-3">
            
            {/* Stage: Exercise Video OR Rest Stage */}
            <div className="flex-1 relative rounded-2xl overflow-hidden bg-black flex items-center justify-center border border-white/15 shadow-2xl min-h-0 w-full">
              {isResting ? (
                /* HIDE VIDEO completely on rest screen! Render clean Rest Stage */
                <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0A0A0A] text-center space-y-3">
                  <div className="p-3 rounded-full bg-sky-500/20 text-sky-400 border border-sky-400/30 animate-pulse">
                    <Pause className="w-7 h-7" />
                  </div>
                  
                  <div>
                    <span className="text-xs font-bold text-sky-400 tracking-wide uppercase">وقت الاستراحة والتعافي</span>
                    <h3 className="text-base font-extrabold text-white mt-0.5">
                      خذ نفساً عميقاً واستعد للمجموعة التالية ({currentSet} من {totalSets})
                    </h3>
                  </div>

                  {/* Rest Circular Timer */}
                  <div className="relative w-24 h-24 flex items-center justify-center my-1">
                    <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" stroke="#1E293B" strokeWidth="6" fill="transparent" />
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="40" 
                        stroke="#38BDF8" 
                        strokeWidth="6" 
                        fill="transparent" 
                        strokeDasharray={2 * Math.PI * 40}
                        strokeDashoffset={2 * Math.PI * 40 * (1 - restTimeLeft / (day.restTimePerSet || 15))}
                        className="transition-all duration-1000 linear"
                      />
                    </svg>
                    <div className="flex flex-col items-center">
                      <span className="text-3xl font-black font-mono text-sky-400">{restTimeLeft}</span>
                      <span className="text-[9px] text-gray-400 font-bold">ثانية</span>
                    </div>
                  </div>

                  <button 
                    onClick={handleSkipRest}
                    className="px-5 py-2 bg-sky-500 hover:bg-sky-400 text-white rounded-full text-xs font-bold shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <span>تخطي الراحة والبدء فوراً</span>
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                /* Video Player - No floating text over the video */
                <ExerciseModel 
                  type={activeExercise.animationType} 
                  isPlaying={isPlaying} 
                  mp4Url={activeExercise.mp4Url} 
                  exerciseNameEn={activeExercise.nameEn}
                  heightClass="h-full w-full"
                  onToggleFullscreen={toggleFullscreen}
                  isFullscreen={true}
                />
              )}
            </div>

            {/* Controls Bar directly below the Video */}
            <div className="px-4 py-2.5 rounded-2xl bg-[#141414]/90 border border-white/10 backdrop-blur-xl text-white shadow-xl flex items-center justify-between gap-3 shrink-0">
              
              {/* Previous / Play-Pause / Next / Reset */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePreviousExerciseManual}
                  disabled={currentIndex === 0}
                  className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none cursor-pointer text-white"
                  title="التمرين السابق"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {isTimeBased && !isResting && (
                  <button
                    onClick={handlePlayPause}
                    className="w-10 h-10 rounded-full bg-[#FF5F2E] text-white flex items-center justify-center shadow-lg hover:bg-[#FF912E] cursor-pointer"
                    title={isPlaying ? "إيقاف مؤقت" : "تشغيل"}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current translate-x-[-1px]" />}
                  </button>
                )}

                <button
                  onClick={handleNextExerciseManual}
                  className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 cursor-pointer text-white"
                  title="التمرين التالي"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button 
                  onClick={() => {
                    setTimeLeft(isTimeBased ? activeExercise.duration : 0);
                    playBeep(600, 0.15);
                    audioManager.playAudio('start');
                  }}
                  className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white cursor-pointer"
                  title="إعادة الجولة"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              {/* Timer / Counter Indicator */}
              <div className="flex items-center gap-3">
                {isReadyCount ? (
                  <div className="flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 px-3 py-1.5 rounded-xl">
                    <span className="text-[10px] text-amber-400 font-bold">استعداد:</span>
                    <span className="text-sm font-black font-mono text-amber-400">{readyTimeLeft}s</span>
                    <button 
                      onClick={() => {
                        setIsReadyCount(false);
                        setTimeLeft(isTimeBased ? activeExercise.duration : 0);
                        playBeep(1200, 0.4);
                        audioManager.playAudio('start');
                      }}
                      className="text-[10px] bg-amber-500 text-black font-extrabold px-2 py-0.5 rounded-md hover:bg-amber-400"
                    >
                      بدء
                    </button>
                  </div>
                ) : isResting ? (
                  <div className="flex items-center gap-2 bg-sky-500/15 border border-sky-500/30 px-3 py-1.5 rounded-xl">
                    <span className="text-[10px] text-sky-400 font-bold">راحه:</span>
                    <span className="text-sm font-black font-mono text-sky-400">{restTimeLeft}s</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-gray-400 font-bold">الوقت:</span>
                      <span className="text-base font-black font-mono text-[#FF5F2E]">{timeLeft}s</span>
                    </div>
                    <div className="h-4 w-[1px] bg-white/10"></div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-gray-400 font-bold">المجموعة:</span>
                      <span className="text-xs font-black text-white">{currentSet}/{totalSets}</span>
                    </div>
                  </div>
                )}

                {/* Info button */}
                <button
                  onClick={() => setShowTipsModal(true)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[10px] font-bold bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 cursor-pointer"
                  title="تعليمات أداء التمرين"
                >
                  <Info className="w-3.5 h-3.5 text-[#FF5F2E]" />
                  <span>طريقة الأداء</span>
                </button>
              </div>

            </div>

          </div>

          {/* Right Column (الجانب الأيمن): Daily Exercises Scrollable List */}
          <div className="w-72 sm:w-80 shrink-0 h-full flex flex-col p-3.5 rounded-2xl bg-[#141414]/90 border border-white/10 backdrop-blur-xl text-white shadow-2xl overflow-hidden">
            
            {/* Header of Exercise List */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-[#FF5F2E]" />
                <h3 className="text-xs font-black text-white">قائمة تمارين اليوم</h3>
              </div>
              <span className="text-[10px] font-mono font-bold bg-[#FF5F2E]/15 text-[#FF5F2E] px-2 py-0.5 rounded-md border border-[#FF5F2E]/30">
                {exerciseIds.length} تمارين
              </span>
            </div>

            {/* Scrollable Container ONLY for Exercise List */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar min-h-0">
              {exerciseIds.map((exId, idx) => {
                const ex = EXERCISES_DB[exId] || fallbackExercise;
                const isActive = idx === currentIndex;
                const isCompleted = idx < currentIndex;

                return (
                  <div
                    key={`${exId}-${idx}`}
                    onClick={() => {
                      if (idx === currentIndex) return;
                      setCurrentIndex(idx);
                      setCurrentSet(1);
                      setIsReadyCount(true);
                      setReadyTimeLeft(15);
                      setIsResting(false);
                      setTimeLeft(ex.duration || 30);
                      setIsPlaying(true);
                    }}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer text-right flex items-center justify-between gap-2 ${
                      isActive 
                        ? 'border-[#FF5F2E] bg-[#FF5F2E]/15 shadow-md ring-1 ring-[#FF5F2E]/40' 
                        : isCompleted
                        ? 'border-emerald-500/20 bg-emerald-500/5 opacity-80 hover:opacity-100'
                        : 'border-white/5 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${
                        isActive 
                          ? 'bg-[#FF5F2E] text-white shadow-sm' 
                          : isCompleted 
                          ? 'bg-emerald-500 text-white' 
                          : 'bg-white/10 text-gray-400'
                      }`}>
                        {isCompleted ? '✓' : idx + 1}
                      </div>
                      
                      <div className="min-w-0 flex-1">
                        <h4 className={`text-xs font-bold truncate ${isActive ? 'text-[#FF5F2E]' : 'text-gray-200'}`}>
                          {ex.nameAr}
                        </h4>
                        <span className="text-[9px] text-gray-400 block truncate">
                          {ex.duration} ثانية • {totalSets} مجموعات
                        </span>
                      </div>
                    </div>

                    {isActive && (
                      <span className="text-[9px] font-bold text-[#FF5F2E] bg-[#FF5F2E]/20 px-1.5 py-0.5 rounded shrink-0 border border-[#FF5F2E]/30 animate-pulse">
                        الآن
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

        </div>

        {/* Steps & Guidance Modal in Fullscreen Mode */}
        <AnimatePresence>
          {showTipsModal && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#1A1A1A] border border-white/10 rounded-3xl p-5 max-w-md w-full text-white shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className="text-sm font-extrabold text-[#FF5F2E] flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    <span>طريقة أداء {activeExercise.nameAr}</span>
                  </h3>
                  <button 
                    onClick={() => setShowTipsModal(false)}
                    className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3 text-right">
                  <div>
                    <h4 className="text-xs font-bold text-gray-300 mb-1.5">خطوات التنفيذ الصحيحة:</h4>
                    <ul className="space-y-1.5">
                      {activeExercise.steps.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-gray-200">
                          <span className="w-4 h-4 rounded-full bg-[#FF5F2E]/20 text-[#FF5F2E] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{idx + 1}</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {activeExercise.tips && activeExercise.tips.length > 0 && (
                    <div className="p-3 rounded-2xl bg-[#FF5F2E]/10 border border-[#FF5F2E]/20">
                      <h4 className="text-xs font-bold text-[#FF5F2E] mb-1">💡 نصيحة التركيز الذهني:</h4>
                      <p className="text-xs text-gray-200">{activeExercise.tips[0]}</p>
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => setShowTipsModal(false)}
                  className="w-full py-2.5 bg-[#FF5F2E] hover:bg-[#FF912E] text-white font-bold rounded-xl text-xs cursor-pointer"
                >
                  فهمت، العودة للتمرين
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div 
      ref={playerContainerRef}
      onClick={handleUserGestureUnlock}
      onTouchStart={handleUserGestureUnlock}
      className={`fixed inset-0 z-50 flex flex-col justify-between overflow-y-auto transition-colors duration-300 ${
        isDark ? 'bg-[#0A0A0A] text-white' : 'bg-[#F9FAFB] text-gray-900'
      }`} 
      dir="rtl"
    >
      {/* Background Video Prefetching Pipeline for smooth instant transitions */}
      <div className="hidden pointer-events-none aria-hidden" aria-hidden="true">
        {upcomingVideoUrls.filter(url => Boolean(url && url.trim())).map((url) => (
          <video
            key={url}
            src={url}
            preload="auto"
            muted
            playsInline
            // @ts-ignore
            webkit-playsinline="true"
          />
        ))}
      </div>
      
      {/* Top Header Navigation */}
      <div className={`px-5 py-4 flex items-center justify-between border-b ${
        isDark ? 'bg-[#121212] border-white/5' : 'bg-white border-gray-100 shadow-xs'
      }`}>
        <button 
          onClick={handleClose}
          className={`p-2.5 rounded-2xl transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold ${
            isDark ? 'bg-[#1A1A1A] text-gray-300 hover:text-white hover:bg-[#222]' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          title="رجوع"
        >
          <ChevronRight className="w-4 h-4" />
          <span>رجوع</span>
        </button>

        <div className="text-center flex-1 min-w-0 max-w-[130px] sm:max-w-none px-1">
          <span className={`text-[10px] font-black leading-tight block truncate sm:whitespace-normal ${isDark ? 'text-white' : 'text-gray-900'}`} title={day.titleAr}>
            {day.titleAr}
          </span>
        </div>

        {/* Voice and Mute controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const nextGender = voiceGenderPref === 'male' ? 'female' : 'male';
              setVoiceGenderPref(nextGender);
              audioManager.setCoach(nextGender);
              audioManager.playAudio('preview', nextGender);
            }}
            className={`px-2.5 py-1.5 border text-[9px] font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1 ${
              isDark ? 'bg-[#1A1A1A] border-white/5 text-gray-300 hover:text-white' : 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Mic className="w-3 h-3 text-[#FF5F2E]" />
            <span>{voiceGenderPref === 'male' ? 'كابتن حسين' : 'كابتن أميرة'}</span>
          </button>

          <button
            onClick={() => setMuted(!muted)}
            className={`p-2.5 rounded-2xl transition-all cursor-pointer flex items-center justify-center ${
              muted 
                ? 'bg-red-500 text-white border border-red-400 shadow-md shadow-red-500/30' 
                : (isDark ? 'bg-[#FF5F2E]/10 text-[#FF5F2E] border border-[#FF5F2E]/20' : 'bg-[#FF5F2E]/10 text-[#FF5F2E] border border-[#FF5F2E]/20')
            }`}
            title={muted ? 'تشغيل الصوت' : 'كتم الصوت'}
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Progress indicators */}
      <div className={`px-5 py-2 flex items-center justify-between border-b ${
        isDark ? 'bg-[#121212] border-white/5' : 'bg-white border-gray-100'
      }`}>
        <span className="text-[11px] font-bold text-gray-400">التمارين:</span>
        <div className="flex gap-1.5 flex-1 mx-4 max-w-xs">
          {exerciseIds.map((_, idx) => (
            <div 
              key={idx}
              className={`h-1.5 rounded-full flex-1 transition-all duration-300 ${
                idx < currentIndex 
                  ? 'bg-emerald-500' 
                  : idx === currentIndex 
                  ? 'bg-[#FF5F2E] w-4' 
                  : (isDark ? 'bg-[#222222]' : 'bg-gray-200')
              }`}
            ></div>
          ))}
        </div>
        <span className="text-xs font-mono font-bold text-[#FF5F2E]">{currentStepNum} / {totalSteps}</span>
      </div>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col px-4 py-3 landscape:py-2 max-w-md landscape:max-w-4xl mx-auto w-full justify-center">
        
        <AnimatePresence mode="wait">
          {isReadyCount ? (
            /* 1. GET READY STATE (WARMUP) */
            <motion.div 
              key="ready-warmup"
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex-1 flex flex-col landscape:flex-row items-center justify-center landscape:justify-around text-center landscape:text-right space-y-2.5 sm:space-y-3 landscape:space-y-0 landscape:gap-6 py-1.5"
            >
              {/* Video Player for Upcoming Exercise */}
              <div className="w-full max-w-xs landscape:max-w-sm shadow-xl rounded-3xl overflow-hidden mb-0.5 shrink-0">
                <ExerciseModel 
                  type={activeExercise.animationType} 
                  mp4Url={activeExercise.mp4Url} 
                  exerciseNameEn={activeExercise.nameEn}
                  heightClass="h-40 sm:h-44 landscape:h-52"
                  isPlaying={isPlaying}
                  onToggleFullscreen={toggleFullscreen}
                  isFullscreen={false}
                />
              </div>

              <div className="flex flex-col items-center justify-center space-y-2 max-w-sm">
                <span className="text-[10px] sm:text-xs bg-[#FF5F2E]/10 text-[#FF5F2E] px-2.5 py-0.5 rounded-full font-bold">استعد للتمرين التالي</span>
                <h2 className={`text-base sm:text-lg font-extrabold px-3 line-clamp-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{activeExercise.nameAr}</h2>
                
                {/* Compact Countdown Timer Circle */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center my-0.5">
                  <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 96 96">
                    <circle cx="48" cy="48" r="40" stroke={isDark ? "#222222" : "#E5E7EB"} strokeWidth="6" fill="transparent" />
                    <circle 
                      cx="48" 
                      cy="48" 
                      r="40" 
                      stroke="#FF5F2E" 
                      strokeWidth="6" 
                      fill="transparent" 
                      strokeDasharray={2 * Math.PI * 40}
                      strokeDashoffset={2 * Math.PI * 40 * (1 - readyTimeLeft / 15)}
                      className="transition-all duration-1000 linear"
                    />
                  </svg>
                  
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-[9px] text-gray-400 font-semibold uppercase">انطلاق خلال</span>
                    <span className={`text-2xl sm:text-3xl font-black font-mono leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>{readyTimeLeft}</span>
                    <span className="text-[10px] text-gray-400 font-medium">ثواني</span>
                  </div>
                </div>

                <div className={`p-2.5 rounded-xl max-w-xs flex gap-2.5 text-right border ${
                  isDark ? 'bg-[#1A1A1A]/40 border-white/5' : 'bg-amber-500/5 border-amber-500/15'
                }`}>
                  <Lightbulb className="w-4 h-4 text-[#FF5F2E] shrink-0 mt-0.5" />
                  <p className={`text-[11px] leading-relaxed font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    {activeExercise.tips[0] || "تأكد من شرب رشفة ماء والوقوف في وضع مريح قبل الانطلاق."}
                  </p>
                </div>

                <button 
                  onClick={() => {
                    setIsReadyCount(false);
                    setTimeLeft(isTimeBased ? activeExercise.duration : 0);
                    playBeep(1200, 0.4);
                    audioManager.playAudio('start');
                  }}
                  className="px-5 py-2 bg-[#FF5F2E] hover:bg-[#FF912E] text-white rounded-full font-bold text-xs cursor-pointer shadow-sm shadow-[#FF5F2E]/10 transition-all hover:scale-105 active:scale-95"
                >
                  تخطي الانتظار والبدء فوراً
                </button>
              </div>
            </motion.div>
          ) : isResting ? (
            /* 2. BETWEEN SETS REST STATE */
            <motion.div 
              key="resting-state"
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex-1 flex flex-col landscape:flex-row items-center justify-center landscape:justify-around text-center landscape:text-right space-y-3 landscape:space-y-0 landscape:gap-6 py-3"
            >
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="w-12 h-12 bg-sky-500/10 text-sky-500 rounded-full flex items-center justify-center border border-sky-500/20">
                  <Clock className="w-6 h-6 animate-spin" style={{ animationDuration: '3s' }} />
                </div>
                
                <div>
                  <span className="text-[11px] text-sky-400 font-bold tracking-wider uppercase block">وقت الراحة والاستراحة</span>
                  <h3 className={`text-base sm:text-lg font-black mt-0.5 ${isDark ? 'text-white' : 'text-gray-900'}`}>خذ نفساً عميقاً واسترخِ</h3>
                  <p className="text-[11px] text-gray-400 mt-0.5 font-medium">المجموعة التالية: {currentSet + 1} من {totalSets}</p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center space-y-3 max-w-xs">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 96 96">
                    <circle cx="48" cy="48" r="40" stroke={isDark ? "#222222" : "#E5E7EB"} strokeWidth="5" fill="transparent" />
                    <circle 
                      cx="48" 
                      cy="48" 
                      r="40" 
                      stroke="#0EA5E9" 
                      strokeWidth="5" 
                      fill="transparent" 
                      strokeDasharray={2 * Math.PI * 40}
                      strokeDashoffset={2 * Math.PI * 40 * (1 - restTimeLeft / 15)}
                      className="transition-all duration-1000 linear"
                    />
                  </svg>
                  
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-[9px] text-gray-400 font-semibold uppercase">راحة متبقية</span>
                    <span className={`text-3xl sm:text-4xl font-black font-mono leading-none ${isDark ? 'text-white' : 'text-gray-900'}`}>{restTimeLeft}</span>
                    <span className="text-[10px] text-gray-400 font-medium mt-0.5">ثواني</span>
                  </div>
                </div>

                <p className="text-[11px] text-gray-400 leading-relaxed max-w-xs text-center">
                  "الراحة جزء من البناء العضلي. اشرب القليل من الماء ونظّم أنفاسك."
                </p>

                <button 
                  onClick={handleSkipRest}
                  className="px-5 py-2 border border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white rounded-full font-bold text-xs cursor-pointer transition-all hover:scale-105 active:scale-95"
                >
                  تخطي الاستراحة والبدء فوراً ⏭
                </button>
              </div>
            </motion.div>
          ) : (
            /* 3. ACTIVE EXERCISE STATE */
            <motion.div 
              key={`active-exercise-${currentIndex}-${currentSet}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="flex-1 flex flex-col landscape:flex-row justify-center landscape:items-center landscape:justify-between space-y-3 landscape:space-y-0 landscape:gap-6"
            >
              
              {/* Left Column in Landscape / Top in Portrait: Demo Video & Coaching Tip */}
              <div className="w-full landscape:w-1/2 relative flex flex-col items-center">
                <ExerciseModel 
                  type={activeExercise.animationType} 
                  isPlaying={isPlaying} 
                  mp4Url={activeExercise.mp4Url} 
                  exerciseNameEn={activeExercise.nameEn}
                  heightClass="h-44 sm:h-52 landscape:h-56 landscape:w-full" 
                  onToggleFullscreen={toggleFullscreen}
                  isFullscreen={false}
                />

                {/* Live Pro Coaching Toast Notification */}
                {activeExercise.tips && activeExercise.tips.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="mt-2 mx-auto max-w-sm w-full px-3.5 py-2 rounded-2xl bg-gradient-to-r from-[#FF5F2E]/15 via-amber-500/10 to-sky-500/10 border border-[#FF5F2E]/30 backdrop-blur-md text-right flex items-center gap-2.5 shadow-md shadow-[#FF5F2E]/5"
                  >
                    <span className="w-7 h-7 rounded-xl bg-[#FF5F2E] text-white flex items-center justify-center shrink-0 shadow-xs text-xs animate-bounce">
                      💡
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-[11px] font-semibold leading-tight line-clamp-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                        {activeExercise.tips[0]}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Right Column in Landscape / Bottom in Portrait: Info, Timer, Controls */}
              <div className="w-full landscape:w-1/2 flex flex-col items-center justify-center space-y-2.5">
                {/* Header info with smaller font and spacing */}
                <div className="text-center space-y-1">
                  <span className="text-[9px] bg-[#FF5F2E]/10 text-[#FF5F2E] px-2 py-0.5 rounded-full font-extrabold border border-[#FF5F2E]/20">
                    المجموعة {currentSet} من {totalSets}
                  </span>
                  <h2 className={`text-lg font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>{activeExercise.nameAr}</h2>
                  <p className="text-[9px] text-gray-400 font-medium font-mono uppercase tracking-wide">{activeExercise.nameEn}</p>
                </div>

                {/* Middle displays with reduced height and gap */}
                <div className="flex justify-center items-center gap-5 py-0.5">
                  <div className="text-gray-400 text-[11px] text-center">
                    <span className="block text-[9px] font-medium text-gray-400">مقدر للحرق</span>
                    <span className="font-extrabold text-[#FF5F2E] font-mono text-xs">
                      ~{isTimeBased 
                        ? Math.max(1, Math.round((activeExercise.caloriesPerMin || 6) * ((activeExercise.duration || 30) / 60))) 
                        : Math.max(1, Math.round((activeExercise.caloriesPerMin || 6) * 0.75))
                      }
                    </span> <span className="text-[10px]">سعرة</span>
                  </div>

                  {isTimeBased ? (
                    /* Active countdown circle */
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                        <circle cx="48" cy="48" r="40" stroke={isDark ? "#222222" : "#E5E7EB"} strokeWidth="5" fill="transparent" />
                        <circle 
                          cx="48" 
                          cy="48" 
                          r="40" 
                          stroke="#FF5F2E" 
                          strokeWidth="5" 
                          fill="transparent" 
                          strokeDasharray={2 * Math.PI * 40}
                          strokeDashoffset={2 * Math.PI * 40 * (1 - timeLeft / activeExercise.duration)}
                          className="transition-all duration-1000 linear"
                        />
                      </svg>
                      <div className="flex flex-col items-center">
                        <span className={`text-3xl font-black font-mono ${isDark ? 'text-white' : 'text-gray-900'}`}>{timeLeft}</span>
                        <span className="text-[9px] text-gray-400 font-bold">ثانية</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1">
                      <div className={`w-24 h-24 rounded-2xl border flex flex-col items-center justify-center shadow-xs ${
                        isDark ? 'bg-[#1A1A1A] border-white/5' : 'bg-white border-gray-100'
                      }`}>
                        <span className="text-2xl font-black font-mono text-[#FF5F2E]">{exerciseReps}</span>
                        <span className={`text-[9px] font-extrabold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>تكرارات جيدة</span>
                      </div>
                    </div>
                  )}

                  <button 
                    onClick={() => {
                      setTimeLeft(isTimeBased ? activeExercise.duration : 0);
                      playBeep(600, 0.15);
                      audioManager.playAudio('start');
                    }}
                    className={`p-2.5 rounded-full transition-all cursor-pointer border ${
                      isDark ? 'bg-[#1A1A1A] border-white/5 text-gray-300 hover:text-white' : 'bg-white border-gray-100 text-gray-600 hover:bg-gray-50 shadow-sm'
                    }`}
                    title="إعادة جولة التمرين"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Controller row: Back, Play/Pause/Mute, Next */}
                <div className="flex items-center justify-center gap-5">
                  <button
                    onClick={handlePreviousExerciseManual}
                    disabled={currentIndex === 0}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                      isDark ? 'border-white/10 text-white hover:bg-white/5' : 'border-gray-200 text-gray-800 hover:bg-gray-50'
                    } disabled:opacity-30 disabled:pointer-events-none`}
                  >
                    <ChevronRight className="w-4.5 h-4.5" />
                  </button>

                  {isTimeBased && (
                    <button
                      onClick={handlePlayPause}
                      className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-all cursor-pointer ${
                        isPlaying 
                          ? 'bg-[#FF5F2E] text-white hover:bg-[#FF912E]' 
                          : (isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-gray-900 text-white hover:bg-black')
                      }`}
                    >
                      {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current translate-x-[-1px]" />}
                    </button>
                  )}

                  <button
                    onClick={handleNextExerciseManual}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                      isDark ? 'border-white/10 text-white hover:bg-white/5' : 'border-gray-200 text-gray-800 hover:bg-gray-50'
                    }`}
                    title="التمرين التالي"
                  >
                    <ChevronLeft className="w-4.5 h-4.5" />
                  </button>
                </div>

                {/* Info Pill Button */}
                <div className="flex justify-center pt-1">
                  <button
                    onClick={() => setShowTipsModal(true)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-bold transition-all cursor-pointer shadow-xs border ${
                      isDark 
                        ? 'bg-[#121212] border-white/5 text-gray-300 hover:text-white hover:bg-[#1A1A1A]/80 hover:scale-105 active:scale-95' 
                        : 'bg-white border-gray-100 text-gray-700 hover:bg-gray-50 hover:scale-105 active:scale-95'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-[#FF5F2E]/10 text-[#FF5F2E] flex items-center justify-center text-[9px] font-black font-mono">i</span>
                    <span>طريقة الأداء والتركيز الذهني</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Steps & Guidance Checklist Popup Modal */}
      <AnimatePresence>
        {showTipsModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop with elegant blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTipsModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            
            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className={`relative w-full max-w-sm rounded-3xl p-6 shadow-2xl border overflow-hidden z-10 ${
                isDark 
                  ? 'bg-[#121212] border-white/10 text-white' 
                  : 'bg-white border-gray-100 text-gray-900'
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4 border-b pb-3 border-gray-100 dark:border-white/5">
                <span className="text-sm font-extrabold flex items-center gap-2 text-[#FF5F2E]">
                  <span className="w-5 h-5 rounded-full bg-[#FF5F2E]/10 text-[#FF5F2E] flex items-center justify-center text-xs font-black font-mono">i</span>
                  <span>طريقة الأداء والتركيز الذهني</span>
                </span>
                <button
                  onClick={() => setShowTipsModal(false)}
                  className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                    isDark ? 'hover:bg-white/5 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Content Checklist */}
              <ul className="space-y-3.5 my-4 pr-1 max-h-[60vh] overflow-y-auto">
                {activeExercise.steps.map((step, idx) => (
                  <li key={idx} className="text-xs flex items-start gap-3 leading-relaxed">
                    <span className={`w-5 h-5 rounded-full text-[11px] font-bold font-mono flex items-center justify-center shrink-0 mt-0.5 ${
                      isDark ? 'bg-[#1A1A1A] text-gray-300 border border-white/5' : 'bg-gray-100 text-gray-600 border border-gray-200'
                    }`}>
                      {idx + 1}
                    </span>
                    <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>{step}</span>
                  </li>
                ))}
              </ul>

              {/* Action Close Button */}
              <div className="pt-2 border-t border-gray-100 dark:border-white/5">
                <button
                  onClick={() => setShowTipsModal(false)}
                  className="w-full py-2.5 bg-gradient-to-r from-[#FF5F2E] to-[#FF912E] text-white text-xs font-bold rounded-xl hover:opacity-90 active:scale-98 transition-all cursor-pointer"
                >
                  حسناً، فهمت
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
