import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Exercise, WorkoutDay, UserStats } from '../types';
import { EXERCISES_DB } from '../data/exercises';
import { getAlternativeExercise, saveSwappedExerciseInStorage, calculateExerciseCalories } from '../utils/exerciseSwapper';
import { ExerciseModel } from './ExerciseModel';
import { HudBannerTimer } from './HudBannerTimer';
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
  Languages,
  RotateCw,
  Repeat1
} from 'lucide-react';
import { audioManager } from '../lib/audioManager';
import { COACHES } from '../config/audioConfig';

interface WorkoutPlayerProps {
  day: WorkoutDay;
  onFinishWorkout: (dayNumber: number, caloriesBurned: number) => void;
  onClose: () => void;
  userStats?: UserStats;
  seasonId?: string;
}

export const WorkoutPlayer: React.FC<WorkoutPlayerProps> = ({ 
  day, 
  onFinishWorkout, 
  onClose,
  userStats,
  seasonId 
}) => {
  const [exerciseIds, setExerciseIds] = useState<string[]>(() => day.exercises);
  const [swapNotification, setSwapNotification] = useState<string | null>(null);

  useEffect(() => {
    setExerciseIds(day.exercises);
  }, [day.exercises]);
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
  const [restTotalTime, setRestTotalTime] = useState<number>(day.restTimePerSet || 15);
  
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isRepeatOne, setIsRepeatOne] = useState<boolean>(false); // Single exercise repeat mode
  const [muted, setMuted] = useState<boolean>(() => audioManager.getMuted());
  const [showTipsModal, setShowTipsModal] = useState<boolean>(false);
  const [tipsModalLang, setTipsModalLang] = useState<'ar' | 'en'>('ar');

  // Translation helpers for Exercise Steps & Tips Modal
  const translateStepToArabic = (step: string): string => {
    if (!step) return '';
    let s = step;
    s = s.replace(/^Stand upright with your feet shoulder-width apart and your back straight\./i, "قف بشكل مستقيم مع مباعدة قدميك بعرض الكتفين واستقامة الظهر.");
    s = s.replace(/^Stand upright with your feet shoulder-width apart/i, "قف بشكل مستقيم مع مباعدة قدميك بعرض الكتفين");
    s = s.replace(/^Stand upright with your feet together/i, "قف بشكل مستقيم مع ضم القدمين");
    s = s.replace(/^Stand upright/i, "قف بشكل مستقيم");
    s = s.replace(/^Kneel on the floor and grip/i, "اجثُ على ركبتيك على الأرض وأمسك");
    s = s.replace(/^Kneel on the floor/i, "اجثُ على ركبتيك على الأرض");
    s = s.replace(/^Sit on the floor with/i, "اجلس على الأرض مع");
    s = s.replace(/^Sit on the floor/i, "اجلس على الأرض");
    s = s.replace(/^Lie flat on your back/i, "استلقِ مسطحاً على ظهرك");
    s = s.replace(/^Lie on your back/i, "استلقِ على ظهرك");
    s = s.replace(/^Lie on your stomach/i, "استلقِ على بطنك");
    s = s.replace(/^Begin on all fours with/i, "ابدأ في وضع الاستناد على الأطراف الأربعة مع");
    s = s.replace(/^Begin on all fours/i, "ابدأ في وضع الاستناد على الأطراف الأربعة");

    s = s.replace(/Engage your core to/gi, "شد عضلات بطنك لـ");
    s = s.replace(/Engage your core and/gi, "شد عضلات بطنك و");
    s = s.replace(/Engage your core/gi, "شد عضلات بطنك (الكور)");
    s = s.replace(/Slowly lower your/gi, "اخفض ببطء");
    s = s.replace(/Slowly lower/gi, "اخفض ببطء");
    s = s.replace(/Slowly raise/gi, "ارفع ببطء");
    s = s.replace(/Slowly lift/gi, "ارفع ببطء");
    s = s.replace(/Slowly roll/gi, "دحرج ببطء");
    s = s.replace(/Inhale to/gi, "شهيق لـ");
    s = s.replace(/Inhale and/gi, "خذ شهيقاً و");
    s = s.replace(/Exhale and/gi, "زفير و");
    s = s.replace(/Exhale to/gi, "ازفر لـ");
    s = s.replace(/Pause briefly at/gi, "اثبت لثانية واحدة عند");
    s = s.replace(/Pause briefly/gi, "اثبت لثانية واحدة");
    s = s.replace(/Hold for (\d+)-(\d+) seconds/gi, "اثبت لمدة $1-$2 ثانية");
    s = s.replace(/Hold for (\d+) seconds/gi, "اثبت لمدة $1 ثانية");
    s = s.replace(/Hold this position for (\d+)-(\d+) seconds/gi, "اثبت على هذا الوضع لمدة $1-$2 ثانية");
    s = s.replace(/Hold this position/gi, "اثبت على هذا الوضع");
    s = s.replace(/Return to starting position/gi, "عد إلى وضع البداية");
    s = s.replace(/Return to the starting position/gi, "عد إلى وضع البداية");
    s = s.replace(/Repeat for the desired number of repetitions\./gi, "كرر الحركة طوال مدة الجولة.");
    s = s.replace(/Repeat for the desired number of reps\./gi, "كرر الحركة طوال مدة الجولة.");
    s = s.replace(/Repeat on the opposite side\./gi, "كرر الحركة على الجانب الآخر.");
    s = s.replace(/Repeat for the other side\./gi, "كرر الحركة للجانب الآخر.");
    s = s.replace(/Extend both legs/gi, "افرد كلا الساقين");
    s = s.replace(/Bend your knees/gi, "اثنِ ركبتيك");
    s = s.replace(/Bend your right knee/gi, "اثنِ ركبتك اليمنى");
    s = s.replace(/Bend your left knee/gi, "اثنِ ركبتك اليسرى");
    s = s.replace(/Keep your back flat/gi, "حافظ على استقامة ظهرك");
    s = s.replace(/Keep your back straight/gi, "حافظ على استقامة ظهرك");

    s = s.replace(/your back/gi, "ظهرك");
    s = s.replace(/your arms/gi, "ذراعيك");
    s = s.replace(/your hands/gi, "يديك");
    s = s.replace(/your feet/gi, "قدميك");
    s = s.replace(/your knees/gi, "ركبتيك");
    s = s.replace(/your legs/gi, "ساقيك");
    s = s.replace(/your hips/gi, "وربيك");
    s = s.replace(/your chest/gi, "صدرك");
    s = s.replace(/your shoulders/gi, "كتفيك");
    s = s.replace(/your head/gi, "رأسك");
    s = s.replace(/your neck/gi, "رقبتك");
    s = s.replace(/your torso/gi, "جذعك");
    s = s.replace(/your body/gi, "جسمك");
    s = s.replace(/the floor/gi, "الأرض");
    s = s.replace(/the ground/gi, "الأرض");
    s = s.replace(/parallel to the floor/gi, "موازية للأرض");
    s = s.replace(/shoulder-width apart/gi, "بعرض الكتفين");

    return s;
  };

  const translateTipToEnglish = (tip: string): string => {
    if (!tip) return '';
    let t = tip;
    t = t.replace(/حافظ على استقامة الظهر والتنفس المنتظم أثناء أداء (.+)\./gi, "Keep your back straight and maintain regular breathing during performance.");
    t = t.replace(/ركز على انقباض العضلات المستهدفة \((.+)\) طوال مدة الأداء \((.+) ثانية\)\./gi, "Focus on contracting the target muscle ($1) throughout the duration ($2s).");
    t = t.replace(/حافظ على استقامة الظهر والتنفس المنتظم/gi, "Keep your back straight and breathe regularly.");
    t = t.replace(/ركز على انقباض العضلات المستهدفة/gi, "Focus on contracting the target muscle group.");
    return t;
  };
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

  // Smart prefetch for ONLY the immediate next video of the current active workout day
  const nextVideoUrl = React.useMemo(() => {
    const nextExerciseId = exerciseIds[currentIndex + 1];
    if (!nextExerciseId) return null;
    return EXERCISES_DB[nextExerciseId]?.videoUrl || EXERCISES_DB[nextExerciseId]?.mp4Url || null;
  }, [exerciseIds, currentIndex]);

  // Dynamic DOM prefetch element for the next exercise video only
  useEffect(() => {
    if (!nextVideoUrl) return;

    const existing = document.querySelector(`link[href="${nextVideoUrl}"]`);
    if (existing) return;

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.as = 'video';
    link.href = nextVideoUrl;
    document.head.appendChild(link);

    return () => {
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
    };
  }, [nextVideoUrl]);

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

  // Sound Synth Ref (reusable AudioContext to eliminate memory leaks and WebAudio exhaustion)
  const synthCtxRef = useRef<AudioContext | null>(null);

  const getSynthContext = useCallback((): AudioContext | null => {
    if (typeof window === 'undefined') return null;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return null;
      if (!synthCtxRef.current || synthCtxRef.current.state === 'closed') {
        synthCtxRef.current = new AudioContextClass();
      }
      if (synthCtxRef.current.state === 'suspended') {
        synthCtxRef.current.resume().catch(() => {});
      }
      return synthCtxRef.current;
    } catch (e) {
      return null;
    }
  }, []);

  // Sound Synth Helper (tactile system beeps)
  const playBeep = (freq = 800, duration = 0.15) => {
    if (muted || audioManager.getMuted()) return;
    try {
      const audioCtx = getSynthContext();
      if (!audioCtx) return;

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

  // Touch gesture unlock to activate WebAudio context
  const handleUserGestureUnlock = () => {
    try {
      const ctx = getSynthContext();
      if (ctx && ctx.state === 'suspended') {
        ctx.resume();
      }
    } catch (e) {
      console.warn('Audio gesture unlock failed:', e);
    }
  };

  // Unmount audio & timer cleanup
  useEffect(() => {
    return () => {
      audioManager.stopAudio();
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      clearAllTimeouts();
      if (synthCtxRef.current && synthCtxRef.current.state !== 'closed') {
        try {
          synthCtxRef.current.close();
        } catch (e) {}
      }
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
    setRestTimeLeft(day.restTimePerSet || 15);
    setRestTotalTime(day.restTimePerSet || 15);
    setTimeLeft(activeExercise.duration);
    setCurrentSet(1);
    hasPlayedEncourageForSetRef.current = false;

    if (isFocusedAndVisible) {
      audioManager.playAudio('get_ready');
    }
  }, [currentIndex, activeExerciseId, isFinished, day.restTimePerSet]);

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

  // Safe side-effect triggers next set when rest timer hits 0
  useEffect(() => {
    if (isPlaying && !isFinished && isResting && restTimeLeft === 0 && !isAdActive && !showTipsModal) {
      const nextSetNum = currentSet + 1;
      setCurrentSet(nextSetNum);
      setIsResting(false);
      hasPlayedEncourageForSetRef.current = false;
      audioManager.playAudio('start');
      setTimeLeft(activeExercise.duration);
    }
  }, [restTimeLeft, isPlaying, isFinished, isResting, currentSet, activeExercise.duration, isAdActive, showTipsModal]);

  // Handles completion of one Set of the current exercise
  const handleSetCompletion = () => {
    playBeep(900, 0.3);
    
    // If repeat single exercise mode is enabled, restart current exercise continuously
    if (isRepeatOne) {
      setTimeLeft(activeExercise.duration);
      audioManager.playAudio('start');
      return;
    }

    if (currentSet < totalSets) {
      // Move to rest timer before starting next set
      const restDuration = day.restTimePerSet || 15;
      setIsResting(true);
      setRestTimeLeft(restDuration);
      setRestTotalTime(restDuration);
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

  const handleSwapExercise = () => {
    const currentEx = activeExercise;
    const stats: UserStats = userStats || {
      weight: 70,
      height: 168,
      age: 26,
      gender: 'أنثى',
      activityLevel: 1.375,
      goal: 'loss'
    };
    const currentSeason = seasonId || 'season_1';

    const alternativeEx = getAlternativeExercise(currentEx, stats, currentSeason, exerciseIds);

    if (alternativeEx && alternativeEx.id !== currentEx.id) {
      const updatedIds = [...exerciseIds];
      updatedIds[currentIndex] = alternativeEx.id;
      setExerciseIds(updatedIds);

      // Save choice in localStorage so it persists
      saveSwappedExerciseInStorage(currentSeason, day.dayNumber, currentIndex, alternativeEx.id, day.exercises);

      // Reset active exercise timer to match new exercise duration
      setTimeLeft(alternativeEx.duration || 30);

      // Trigger notification toast
      setSwapNotification(`تم تبديل التمرين بنجاح إلى: ${alternativeEx.nameAr} ⚡`);
      setTimeout(() => {
        setSwapNotification(null);
      }, 4500);

      try {
        playBeep(900, 0.2);
      } catch (e) {}
    }
  };

  const handleFinishAndSave = () => {
    audioManager.stopAudio();
    const calculatedCalories = exerciseIds.reduce((sum, id) => {
      const ex = EXERCISES_DB[id];
      return sum + (ex ? calculateExerciseCalories(ex, userStats) : 0);
    }, 0) * totalSets;

    const finalCalories = calculatedCalories > 0 ? Math.round(calculatedCalories) : day.caloriesEstimate;
    onFinishWorkout(day.dayNumber, finalCalories);
  };

  const handleClose = () => {
    audioManager.stopAudio();
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    clearAllTimeouts();
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
              تهانينا يا {userStats?.userName ? userStats.userName : 'بطل'}! 🎉
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

  return (
    <div 
      onClick={handleUserGestureUnlock}
      onTouchStart={handleUserGestureUnlock}
      className={`fixed inset-0 z-50 flex flex-col justify-between overflow-y-auto transition-colors duration-300 ${
        isDark ? 'bg-[#0A0A0A] text-white' : 'bg-[#F9FAFB] text-gray-900'
      }`} 
      dir="rtl"
    >
      {/* Background Next-Video Prefetch for the current active day only */}
      {nextVideoUrl && (
        <div className="hidden pointer-events-none aria-hidden" aria-hidden="true">
          <video
            key={nextVideoUrl}
            src={nextVideoUrl}
            preload="metadata"
            muted
            playsInline
            // @ts-ignore
            webkit-playsinline="true"
          />
        </div>
      )}
      
      {/* Top Header Navigation */}
      <div className={`px-4 py-2.5 flex items-center justify-between border-b ${
        isDark ? 'bg-[#121212] border-white/5' : 'bg-white border-gray-100 shadow-xs'
      }`}>
        <button 
          onClick={handleClose}
          className={`p-2 rounded-xl transition-all cursor-pointer flex items-center gap-1 text-xs font-bold ${
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
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              const nextGender = voiceGenderPref === 'male' ? 'female' : 'male';
              setVoiceGenderPref(nextGender);
              audioManager.setCoach(nextGender);
              audioManager.playAudio('preview', nextGender);
            }}
            className={`px-2 py-1 border text-[9px] font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
              isDark ? 'bg-[#1A1A1A] border-white/5 text-gray-300 hover:text-white' : 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Mic className="w-3 h-3 text-[#FF5F2E]" />
            <span>{voiceGenderPref === 'male' ? 'كابتن حسين' : 'كابتن أميرة'}</span>
          </button>

          <button
            onClick={() => setMuted(!muted)}
            className={`p-2 rounded-xl transition-all cursor-pointer flex items-center justify-center ${
              muted 
                ? 'bg-red-500 text-white border border-red-400 shadow-md shadow-red-500/30' 
                : (isDark ? 'bg-[#FF5F2E]/10 text-[#FF5F2E] border border-[#FF5F2E]/20' : 'bg-[#FF5F2E]/10 text-[#FF5F2E] border border-[#FF5F2E]/20')
            }`}
            title={muted ? 'تشغيل الصوت' : 'كتم الصوت'}
          >
            {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Progress indicators */}
      <div className={`px-4 py-1.5 flex items-center justify-between border-b ${
        isDark ? 'bg-[#121212] border-white/5' : 'bg-white border-gray-100'
      }`}>
        <span className="text-[10px] font-bold text-gray-400">التمارين:</span>
        <div className="flex gap-1 flex-1 mx-3 max-w-xs">
          {exerciseIds.map((_, idx) => (
            <div 
              key={idx}
              className={`h-1 rounded-full flex-1 transition-all duration-300 ${
                idx < currentIndex 
                  ? 'bg-emerald-500' 
                  : idx === currentIndex 
                  ? 'bg-[#FF5F2E] w-3' 
                  : (isDark ? 'bg-[#222222]' : 'bg-gray-200')
              }`}
            ></div>
          ))}
        </div>
        <span className="text-[11px] font-mono font-bold text-[#FF5F2E]">{currentStepNum} / {totalSteps}</span>
      </div>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col px-3 py-1.5 max-w-md mx-auto w-full justify-center">
        
        <AnimatePresence mode="wait">
          {isReadyCount ? (
            /* 1. GET READY STATE (WARMUP & PREPARATION) */
            <motion.div 
              key={`ready-warmup-${currentIndex}-${activeExercise.id}`}
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex-1 flex flex-col items-center justify-center text-center space-y-1.5 py-0.5"
            >
              {/* Toast message after swapping exercise */}
              {swapNotification && (
                <motion.div 
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="w-full max-w-xs px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-black text-center flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0 animate-pulse" />
                  <span className="line-clamp-1">{swapNotification}</span>
                </motion.div>
              )}

              {/* Video Player for Upcoming Exercise */}
              <div className="w-full max-w-[260px] xs:max-w-[280px] sm:max-w-[300px] shadow-lg rounded-2xl overflow-hidden mx-auto relative group">
                <ExerciseModel 
                  type={activeExercise.animationType} 
                  mp4Url={activeExercise.mp4Url} 
                  exerciseNameEn={activeExercise.nameEn}
                  isPlaying={isPlaying}
                  showBadge={false}
                />
              </div>

              <span className="text-[9px] bg-[#FF5F2E]/10 text-[#FF5F2E] px-2.5 py-0.5 rounded-full font-extrabold border border-[#FF5F2E]/20">
                صفحة الاستعداد للتمرين
              </span>

              {/* Exercise Title and EN Name */}
              <div className="text-center space-y-0.5 px-2">
                <h2 className={`text-sm sm:text-base font-extrabold line-clamp-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {activeExercise.nameAr}
                </h2>
                <p className="text-[9px] text-gray-400 font-medium font-mono uppercase tracking-wide">
                  {activeExercise.nameEn}
                </p>
              </div>

              {/* Comprehensive Exercise Metadata Grid (Requirement #1) */}
              <div className="grid grid-cols-3 gap-1.5 w-full max-w-xs my-0.5">
                <div className={`p-1.5 rounded-xl border text-center ${isDark ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                  <span className="text-[8px] text-gray-400 block font-bold">العضلات</span>
                  <span className="text-[10px] font-black text-amber-400 truncate block">
                    {activeExercise.targetMuscle || activeExercise.bodyPart || activeExercise.category || 'كامل الجسم'}
                  </span>
                </div>
                <div className={`p-1.5 rounded-xl border text-center ${isDark ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                  <span className="text-[8px] text-gray-400 block font-bold">مدة التمرين</span>
                  <span className="text-[10px] font-black text-sky-400 font-mono block">
                    {activeExercise.duration || 30} ثانية
                  </span>
                </div>
                <div className={`p-1.5 rounded-xl border text-center ${isDark ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                  <span className="text-[8px] text-gray-400 block font-bold">السعرات المقدرة</span>
                  <span className="text-[10px] font-black text-emerald-400 font-mono block">
                    ~{calculateExerciseCalories(activeExercise, userStats)} سعرة
                  </span>
                </div>
              </div>

              {/* Sci-Fi HUD Banner Countdown Timer */}
              <div className="my-1 w-full flex justify-center">
                <div className="max-w-[160px] xs:max-w-[180px] sm:max-w-[200px] w-full flex justify-center">
                  <HudBannerTimer 
                    value={readyTimeLeft} 
                    total={15} 
                    label="" 
                    theme="orange" 
                    isDark={isDark} 
                    className="!max-w-[160px] xs:!max-w-[180px] sm:!max-w-[200px]"
                  />
                </div>
              </div>

              {/* Daily Workout Session Circular Progress Indicator */}
              <div className={`p-2 rounded-2xl w-full max-w-xs flex items-center justify-between gap-3 border shadow-xs ${
                isDark ? 'bg-[#1A1A1A]/90 border-white/10' : 'bg-white border-gray-100 shadow-xs'
              }`}>
                <div className="flex items-center gap-2.5">
                  {/* Circular Progress Ring */}
                  <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
                    <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 36 36">
                      <circle 
                        cx="18" 
                        cy="18" 
                        r="14" 
                        stroke={isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"} 
                        strokeWidth="3.5" 
                        fill="transparent" 
                      />
                      <circle 
                        cx="18" 
                        cy="18" 
                        r="14" 
                        stroke="url(#sessionProgressGradient)" 
                        strokeWidth="3.5" 
                        fill="transparent" 
                        strokeDasharray={2 * Math.PI * 14} 
                        strokeDashoffset={2 * Math.PI * 14 * (1 - (currentIndex / Math.max(1, exerciseIds.length)))} 
                        strokeLinecap="round" 
                        className="transition-all duration-700 ease-out"
                      />
                      <defs>
                        <linearGradient id="sessionProgressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#FF5F2E" />
                          <stop offset="100%" stopColor="#FF912E" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span className={`absolute text-[9px] font-black font-mono ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {Math.round((currentIndex / Math.max(1, exerciseIds.length)) * 100)}%
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[9px] text-gray-400 font-bold block">إنجاز تمارين اليوم</span>
                    <span className={`text-xs font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      التمرين <span className="text-[#FF5F2E] font-mono">{currentIndex + 1}</span> من <span className="font-mono">{exerciseIds.length}</span>
                    </span>
                  </div>
                </div>

                <div className="text-left shrink-0">
                  <span className="text-[8px] px-2 py-0.5 rounded-full bg-[#FF5F2E]/10 text-[#FF5F2E] font-extrabold border border-[#FF5F2E]/20 block">
                    {currentIndex === 0 ? 'البداية 🎯' : currentIndex + 1 === exerciseIds.length ? 'المرحلة الأخيرة 🏁' : 'مستمر ⚡'}
                  </span>
                </div>
              </div>

              {/* Action Buttons Row: Start & Swap Exercise */}
              <div className="flex items-center justify-center gap-2.5 w-full max-w-xs pt-1">
                <button 
                  onClick={() => {
                    setIsReadyCount(false);
                    setTimeLeft(isTimeBased ? activeExercise.duration : 0);
                    playBeep(1200, 0.4);
                    audioManager.playAudio('start');
                  }}
                  className="flex-1 py-2.5 bg-gradient-to-r from-[#FF5F2E] to-[#FF912E] hover:opacity-95 text-white rounded-xl font-black text-xs cursor-pointer shadow-md shadow-[#FF5F2E]/25 transition-all hover:scale-102 active:scale-98 flex items-center justify-center gap-1.5"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>ابدأ التمرين</span>
                </button>

                <button 
                  type="button"
                  onClick={handleSwapExercise}
                  className="flex-1 py-2.5 bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:opacity-95 text-white border border-white/20 rounded-xl font-black text-xs cursor-pointer transition-all hover:scale-102 active:scale-98 flex items-center justify-center gap-1.5 shadow-md shadow-sky-500/20 group"
                  title="تبديل التمرين بتمرين بديل مناسب للياقة وهدفك"
                >
                  <RotateCw className="w-4 h-4 text-white group-hover:rotate-180 transition-transform duration-500 shrink-0" />
                  <span>تبديل التمرين</span>
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
              className="flex-1 flex flex-col items-center justify-center text-center space-y-2 py-1"
            >
              <div className="w-10 h-10 bg-sky-500/10 text-sky-500 rounded-full flex items-center justify-center border border-sky-500/20">
                <Clock className="w-5 h-5 animate-spin" style={{ animationDuration: '3s' }} />
              </div>
              
              <div>
                <span className="text-[10px] text-sky-400 font-bold tracking-wider uppercase block">وقت الراحة والاستراحة</span>
                <h3 className={`text-sm sm:text-base font-black mt-0.5 ${isDark ? 'text-white' : 'text-gray-900'}`}>خذ نفساً عميقاً واسترخِ</h3>
                <p className="text-[10px] text-gray-400 font-medium">المجموعة التالية: {currentSet + 1} من {totalSets}</p>
              </div>

              {/* Pro Fitness App Style HUD Rest Timer Ring with +10s / -10s Controls */}
              <div className="flex items-center gap-3 my-1">
                <button
                  onClick={() => {
                    setRestTimeLeft((prev) => {
                      const nextVal = prev - 10;
                      return nextVal <= 0 ? 0 : nextVal;
                    });
                    playBeep(500, 0.1);
                  }}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border active:scale-95 ${
                    isDark ? 'bg-white/5 border-white/10 text-gray-300 hover:text-white' : 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200'
                  }`}
                  title="إنقاص 10 ثوانٍ من وقت الراحة"
                >
                  -10ث
                </button>

                <div className="max-w-[200px] w-full flex justify-center">
                  <HudBannerTimer 
                    value={restTimeLeft} 
                    total={restTotalTime} 
                    label="راحة" 
                    theme="cyan" 
                    isDark={isDark} 
                  />
                </div>

                <button
                  onClick={() => {
                    setRestTimeLeft((prev) => {
                      const newLeft = prev + 10;
                      setRestTotalTime((t) => Math.max(t, newLeft));
                      return newLeft;
                    });
                    playBeep(700, 0.1);
                  }}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border active:scale-95 ${
                    isDark ? 'bg-sky-500/10 border-sky-500/20 text-sky-400 hover:bg-sky-500/20' : 'bg-sky-500/10 border-sky-500/20 text-sky-600 hover:bg-sky-500/20'
                  }`}
                  title="إضافة 10 ثوانٍ لوقت الراحة"
                >
                  +10ث
                </button>
              </div>

              <p className="text-[10px] text-gray-400 leading-snug max-w-xs">
                "الراحة جزء من البناء العضلي. اشرب القليل من الماء ونظّم أنفاسك."
              </p>

              <button 
                onClick={handleSkipRest}
                className="px-4 py-1.5 border border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white rounded-full font-bold text-[11px] cursor-pointer transition-all hover:scale-105 active:scale-95"
              >
                تخطي الاستراحة والبدء فوراً ⏭
              </button>
            </motion.div>
          ) : (
            /* 3. ACTIVE EXERCISE STATE */
            <motion.div 
              key={`active-exercise-${currentIndex}-${currentSet}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex-1 flex flex-col justify-center space-y-1.5 sm:space-y-2 py-0.5"
            >
              
              {/* Visual demo container with compact height */}
              <div className="w-full relative">
                <ExerciseModel 
                  type={activeExercise.animationType} 
                  isPlaying={isPlaying} 
                  mp4Url={activeExercise.mp4Url} 
                  exerciseNameEn={activeExercise.nameEn}
                />

                {/* Live Pro Coaching Toast Notification */}
                {activeExercise.tips && activeExercise.tips.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -4, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="mt-1.5 mx-auto max-w-xs w-full px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#FF5F2E]/15 via-amber-500/10 to-sky-500/10 border border-[#FF5F2E]/25 backdrop-blur-md text-right flex items-center gap-2 shadow-xs"
                  >
                    <span className="w-5 h-5 rounded-lg bg-[#FF5F2E] text-white flex items-center justify-center shrink-0 text-[10px] animate-bounce">
                      💡
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-[10px] font-semibold leading-tight line-clamp-1 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                        {activeExercise.tips[0]}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Header info with compact font and spacing */}
              <div className="text-center space-y-0.5">
                <span className="text-[9px] bg-[#FF5F2E]/10 text-[#FF5F2E] px-2 py-0.5 rounded-full font-extrabold border border-[#FF5F2E]/20">
                  المجموعة {currentSet} من {totalSets}
                </span>
                <h2 className={`text-base sm:text-lg font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>{activeExercise.nameAr}</h2>
                <p className="text-[9px] text-gray-400 font-medium font-mono uppercase tracking-wide">{activeExercise.nameEn}</p>
              </div>

              {/* Middle displays with compact size */}
              <div className="flex justify-center items-center py-1">
                {isTimeBased ? (
                  /* Sci-Fi Banner Timer with +10s / -10s Quick Adjustment */
                  <div className="flex items-center justify-center gap-2.5 w-full max-w-xs mx-auto">
                    <button
                      onClick={() => {
                        setTimeLeft((prev) => Math.max(1, prev - 10));
                        playBeep(500, 0.1);
                      }}
                      className={`px-2.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border active:scale-95 shrink-0 ${
                        isDark ? 'bg-white/5 border-white/10 text-gray-300 hover:text-white' : 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200'
                      }`}
                      title="إنقاص 10 ثوانٍ"
                    >
                      -10ث
                    </button>

                    <div className="max-w-[200px] w-full flex justify-center">
                      <HudBannerTimer 
                        value={timeLeft} 
                        total={activeExercise.duration || 30} 
                        label="" 
                        theme="orange" 
                        isDark={isDark} 
                      />
                    </div>

                    <button
                      onClick={() => {
                        setTimeLeft((prev) => prev + 10);
                        playBeep(700, 0.1);
                      }}
                      className={`px-2.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border active:scale-95 shrink-0 ${
                        isDark ? 'bg-[#FF5F2E]/10 border-[#FF5F2E]/20 text-[#FF5F2E] hover:bg-[#FF5F2E]/20' : 'bg-[#FF5F2E]/10 border-[#FF5F2E]/20 text-[#FF5F2E] hover:bg-[#FF5F2E]/20'
                      }`}
                      title="إضافة 10 ثوانٍ"
                    >
                      +10ث
                    </button>
                  </div>
                ) : (
                  /* Pro Reps Box */
                  <div className="flex flex-col items-center gap-1">
                    <div className={`relative w-20 h-20 rounded-2xl border flex flex-col items-center justify-center shadow-xs overflow-hidden ${
                      isDark ? 'bg-[#1A1A1A] border-white/10' : 'bg-white border-gray-100'
                    }`}>
                      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400" />
                      <span className="text-xl font-black font-mono text-[#FF5F2E]">{exerciseReps}</span>
                      <span className={`text-[8px] font-extrabold uppercase tracking-wide mt-0.5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>تكرار</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Reps interactive validation button */}
              {!isTimeBased && (
                <div className="px-3 pb-0.5">
                  <button
                    onClick={handleSetCompletion}
                    className="w-full py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 text-white font-extrabold rounded-xl text-[10px] transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    <span>أنهيت الـ {exerciseReps} تكرارات (تمت المجموعة ✔)</span>
                  </button>
                </div>
              )}

              {/* Controller row: Back (with Calories beside it), Play/Pause, Next (with Reset time beside it) */}
              <div className="flex items-center justify-center gap-2.5 sm:gap-4 my-1">
                
                {/* Back / Previous exercise button + Calories Estimate beside it */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    onClick={handlePreviousExerciseManual}
                    disabled={currentIndex === 0}
                    className={`p-2 rounded-xl border transition-all cursor-pointer ${
                      isDark ? 'border-white/10 text-white hover:bg-white/5' : 'border-gray-200 text-gray-800 hover:bg-gray-50'
                    } disabled:opacity-30 disabled:pointer-events-none`}
                    title="التمرين السابق"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button 
                    onClick={() => {
                      setIsRepeatOne(prev => !prev);
                      playBeep(700, 0.15);
                    }}
                    className={`p-2 rounded-xl transition-all cursor-pointer border relative flex items-center justify-center ${
                      isRepeatOne
                        ? 'bg-[#FF5F2E]/20 border-[#FF5F2E]/50 text-[#FF5F2E] shadow-xs'
                        : (isDark ? 'bg-[#1A1A1A] border-white/10 text-gray-300 hover:text-white' : 'bg-white border-gray-100 text-gray-600 hover:bg-gray-50 shadow-xs')
                    }`}
                    title={isRepeatOne ? "إلغاء تكرار التمرين الحالي" : "تكرار التمرين الحالي باستمرار"}
                  >
                    <Repeat1 className="w-4 h-4" />
                    {isRepeatOne && (
                      <span className="absolute -top-1 -right-1 bg-[#FF5F2E] text-white text-[9px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-xs">
                        1
                      </span>
                    )}
                  </button>
                </div>

                {/* Play / Pause button in center */}
                {isTimeBased && (
                  <button
                    onClick={handlePlayPause}
                    className={`w-11 h-11 rounded-full flex items-center justify-center shadow-md transition-all cursor-pointer ${
                      isPlaying 
                        ? 'bg-[#FF5F2E] text-white hover:bg-[#FF912E]' 
                        : (isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-gray-900 text-white hover:bg-black')
                    }`}
                    title={isPlaying ? 'إيقاف مؤقت' : 'تشغيل'}
                  >
                    {isPlaying ? <Pause className="w-4.5 h-4.5 fill-current" /> : <Play className="w-4.5 h-4.5 fill-current translate-x-[-1px]" />}
                  </button>
                )}

                {/* Reset Time button + Next exercise button beside it */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button 
                    onClick={() => {
                      setTimeLeft(isTimeBased ? activeExercise.duration : 0);
                      playBeep(600, 0.15);
                      audioManager.playAudio('start');
                    }}
                    className={`p-2 rounded-xl transition-all cursor-pointer border ${
                      isDark ? 'bg-[#1A1A1A] border-white/10 text-gray-300 hover:text-white' : 'bg-white border-gray-100 text-gray-600 hover:bg-gray-50 shadow-xs'
                    }`}
                    title="إعادة وقت التمرين"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleNextExerciseManual}
                    className={`p-2 rounded-xl border transition-all cursor-pointer ${
                      isDark ? 'border-white/10 text-white hover:bg-white/5' : 'border-gray-200 text-gray-800 hover:bg-gray-50'
                    }`}
                    title="التمرين التالي"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>

              </div>

              {/* Info Pill Button */}
              <div className="flex justify-center pt-0.5">
                <button
                  onClick={() => setShowTipsModal(true)}
                  className={`flex items-center gap-1 px-3.5 py-1.5 rounded-full text-[10px] font-bold transition-all cursor-pointer shadow-xs border ${
                    isDark 
                      ? 'bg-[#121212] border-white/5 text-gray-300 hover:text-white hover:bg-[#1A1A1A]/80 hover:scale-105 active:scale-95' 
                      : 'bg-white border-gray-100 text-gray-700 hover:bg-gray-50 hover:scale-105 active:scale-95'
                  }`}
                >
                  <span className="w-3.5 h-3.5 rounded-full bg-[#FF5F2E]/10 text-[#FF5F2E] flex items-center justify-center text-[8px] font-black font-mono">i</span>
                  <span>طريقة الأداء والتركيز الذهني</span>
                </button>
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
              <div className="flex items-center justify-between mb-3 border-b pb-3 border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#FF5F2E]/10 text-[#FF5F2E] flex items-center justify-center text-xs font-black font-mono">i</span>
                  <span className="text-sm font-extrabold text-[#FF5F2E]">
                    {tipsModalLang === 'ar' ? 'طريقة الأداء والتركيز الذهني' : 'Performance & Mental Focus'}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {/* Translate Button */}
                  <button
                    onClick={() => setTipsModalLang((prev) => (prev === 'ar' ? 'en' : 'ar'))}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-[10px] font-bold border transition-all cursor-pointer active:scale-95 ${
                      isDark 
                        ? 'bg-white/5 border-white/10 text-gray-200 hover:text-white hover:bg-white/10' 
                        : 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200'
                    }`}
                    title={tipsModalLang === 'ar' ? 'التحويل إلى اللغة الإنجليزية' : 'التحويل إلى اللغة العربية'}
                  >
                    <Languages className="w-3.5 h-3.5 text-[#FF5F2E]" />
                    <span>{tipsModalLang === 'ar' ? 'English' : 'العربية'}</span>
                  </button>

                  {/* Close Modal Button */}
                  <button
                    onClick={() => setShowTipsModal(false)}
                    className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                      isDark ? 'hover:bg-white/5 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Exercise Meta Pill */}
              <div className={`p-2.5 rounded-2xl mb-3 border flex flex-col gap-1 ${
                isDark ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {tipsModalLang === 'ar' ? activeExercise.nameAr : activeExercise.nameEn}
                  </span>
                  <span className="text-[9px] bg-[#FF5F2E]/10 text-[#FF5F2E] px-2 py-0.5 rounded-full font-bold">
                    {tipsModalLang === 'ar' ? activeExercise.category : activeExercise.bodyPart}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-gray-400">
                  <span>{tipsModalLang === 'ar' ? 'العضلة المستهدفة:' : 'Target:'} {activeExercise.targetMuscle || 'العضلات العامة'}</span>
                  <span>•</span>
                  <span>{tipsModalLang === 'ar' ? 'الأدوات:' : 'Equipment:'} {activeExercise.equipment || 'وزن الجسم'}</span>
                </div>
              </div>

              {/* Content Checklist & Mental Focus */}
              <div className="space-y-4 my-2 max-h-[50vh] overflow-y-auto pr-1">
                {/* 1. Steps Section */}
                <div>
                  <h4 className={`text-[11px] font-extrabold mb-2 uppercase tracking-wide flex items-center gap-1.5 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <span>📋</span>
                    <span>{tipsModalLang === 'ar' ? 'خطوات الأداء الصحيح:' : 'Execution Steps:'}</span>
                  </h4>
                  <ul className="space-y-2.5">
                    {activeExercise.steps.map((step, idx) => {
                      const displayStep = tipsModalLang === 'ar' ? translateStepToArabic(step) : step;
                      return (
                        <li key={idx} className="text-xs flex items-start gap-2.5 leading-relaxed">
                          <span className={`w-5 h-5 rounded-full text-[10px] font-bold font-mono flex items-center justify-center shrink-0 mt-0.5 ${
                            isDark ? 'bg-[#1A1A1A] text-gray-300 border border-white/5' : 'bg-gray-100 text-gray-600 border border-gray-200'
                          }`}>
                            {idx + 1}
                          </span>
                          <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>{displayStep}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* 2. Mental Focus / Tips Section */}
                {activeExercise.tips && activeExercise.tips.length > 0 && (
                  <div className="pt-2 border-t border-gray-100 dark:border-white/5">
                    <h4 className={`text-[11px] font-extrabold mb-2 uppercase tracking-wide flex items-center gap-1.5 ${
                      isDark ? 'text-amber-400' : 'text-amber-600'
                    }`}>
                      <span>💡</span>
                      <span>{tipsModalLang === 'ar' ? 'توجيهات التركيز الذهني:' : 'Mental Focus Guidance:'}</span>
                    </h4>
                    <ul className="space-y-2">
                      {activeExercise.tips.map((tip, idx) => {
                        const displayTip = tipsModalLang === 'ar' ? tip : translateTipToEnglish(tip);
                        return (
                          <li key={idx} className={`text-xs p-2 rounded-xl leading-relaxed flex items-start gap-2 border ${
                            isDark 
                              ? 'bg-amber-500/10 border-amber-500/20 text-amber-200' 
                              : 'bg-amber-50 border-amber-200/60 text-amber-900'
                          }`}>
                            <span className="shrink-0">🎯</span>
                            <span>{displayTip}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>

              {/* Action Close Button */}
              <div className="pt-3 border-t border-gray-100 dark:border-white/5">
                <button
                  onClick={() => setShowTipsModal(false)}
                  className="w-full py-2.5 bg-gradient-to-r from-[#FF5F2E] to-[#FF912E] text-white text-xs font-bold rounded-xl hover:opacity-90 active:scale-98 transition-all cursor-pointer shadow-xs"
                >
                  {tipsModalLang === 'ar' ? 'حسناً، فهمت' : 'Got it, thanks'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
