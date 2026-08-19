import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Dumbbell, 
  Calculator, 
  Video, 
  CalendarDays, 
  Flame, 
  Clock, 
  CheckCircle2, 
  ChevronLeft, 
  AlertCircle, 
  User, 
  Award,
  ChevronRight,
  TrendingUp,
  RotateCcw,
  Sparkles,
  Menu,
  X,
  Sun,
  Moon,
  Star,
  Shield,
  MessageSquare,
  Instagram,
  Send,
  Heart,
  ExternalLink,
  MessageCircle,
  ThumbsUp,
  Trophy,
  Lock,
  Unlock,
  Bell,
  Copy,
  Check,
  HelpCircle,
  FileText,
  AlertTriangle,
  Copyright
} from 'lucide-react';

import { UserStats, DailyLog, JournalTask, WorkoutDay, SeasonCertificate } from './types';
import { APP_CONFIG } from './config/appConfig';
import { generateWorkoutDaysForUser, WORKOUT_DAYS_DB } from './data/workoutDays';
import { EXERCISES_DB } from './data/exercises';
import { SEASONS_BY_GOAL, SEASONS_DB } from './data/seasons';
import { WorkoutDays, VirtualizedExerciseList } from './components/WorkoutDays';
import { Apple, Share2 } from 'lucide-react';
import { OnboardingWizard } from './components/OnboardingWizard';
import { AppSplashScreen } from './components/AppSplashScreen';
import { SuccessCelebration } from './components/SuccessCelebration';
import { ConfirmModal } from './components/ConfirmModal';
import { LegalModal, LegalModalType } from './components/LegalModal';
// @ts-ignore
import appIcon from './assets/images/app_icon_1784528616960.jpg';

import { WorkoutPlayer } from './components/WorkoutPlayer';
import { CalorieCalculator } from './components/CalorieCalculator';
import { DailyJournal } from './components/DailyJournal';
import { ExerciseEncyclopedia } from './components/ExerciseEncyclopedia';
import { SmartNutrition } from './components/SmartNutrition';
import { SeasonsPage } from './components/SeasonsPage';
import { AchievementsPage } from './components/AchievementsPage';
import { TutorialGuideModal } from './components/TutorialGuideModal';


export default function App() {
  // Dynamic Tab Router for App Creator 24 Interstitial Ads
  const getInitialTab = (): 'workout' | 'calculator' | 'journal' | 'encyclopedia' | 'seasons' | 'achievements' | 'nutrition' => {
    try {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get('tab');
      if (
        tab === 'workout' || 
        tab === 'calculator' || 
        tab === 'journal' || 
        tab === 'encyclopedia' ||
        tab === 'seasons' ||
        tab === 'achievements' ||
        tab === 'nutrition'
      ) {
        return tab as any;
      }
    } catch (e) {
      console.warn("Could not parse URL search parameters:", e);
    }
    return 'workout';
  };

  const [currentTab, setCurrentTab] = useState<'workout' | 'calculator' | 'journal' | 'encyclopedia' | 'seasons' | 'achievements' | 'nutrition'>(getInitialTab);

  
  // Immersive active day state - Initialized from URL to trigger interstitial ads on open
  const [activePlayingDay, setActivePlayingDay] = useState<WorkoutDay | null>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const dayParam = params.get('day');
      if (dayParam) {
        const dayNum = parseInt(dayParam, 10);
        const statsStr = localStorage.getItem('rashaka_user_stats');
        const statsObj = statsStr ? JSON.parse(statsStr) : {
          weight: 70, height: 168, age: 26, gender: 'أنثى', activityLevel: 1.375, goal: 'loss', onboarded: false
        };
        const seasonStr = localStorage.getItem('rashaka_current_season_id') || `${statsObj.goal || 'loss'}_season_1`;
        const days = generateWorkoutDaysForUser(statsObj, seasonStr);
        return days.find(d => d.dayNumber === dayNum) || null;
      }
    } catch (e) {}
    return null;
  });
  
  // Selected day for the list preview drawer/modal - Initialized from URL to trigger interstitial ads on click
  const [selectedDayPreview, setSelectedDayPreview] = useState<WorkoutDay | null>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const previewParam = params.get('preview');
      if (previewParam) {
        const dayNum = parseInt(previewParam, 10);
        const statsStr = localStorage.getItem('rashaka_user_stats');
        const statsObj = statsStr ? JSON.parse(statsStr) : {
          weight: 70, height: 168, age: 26, gender: 'أنثى', activityLevel: 1.375, goal: 'loss', onboarded: false
        };
        const seasonStr = localStorage.getItem('rashaka_current_season_id') || `${statsObj.goal || 'loss'}_season_1`;
        const days = generateWorkoutDaysForUser(statsObj, seasonStr);
        return days.find(d => d.dayNumber === dayNum) || null;
      }
    } catch (e) {}
    return null;
  });

  // Scroll Container Ref to handle auto-scrolling to top on tab switch
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // --- DARK MODE STATE (Synchronized with localStorage) ---
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('rashaka_theme');
      return stored === 'dark'; // Default to light mode if not explicitly set to dark
    } catch {
      return false;
    }
  });

  // --- HAMBURGER MENU & COMPLIANCE MODALS STATE ---
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isTutorialModalOpen, setIsTutorialModalOpen] = useState<boolean>(false);
  const [complianceModal, setComplianceModal] = useState<'rate' | 'social' | 'privacy' | null>(null);
  const [legalModalType, setLegalModalType] = useState<LegalModalType>(null);

  // --- CUSTOM CONFIRMATION MODALS STATE ---
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState<boolean>(false);
  const [isCalcConfirmOpen, setIsCalcConfirmOpen] = useState<boolean>(false);
  const [pendingCalcStats, setPendingCalcStats] = useState<UserStats | null>(null);
  const [seasonConfirmModalOpen, setSeasonConfirmModalOpen] = useState<boolean>(false);
  const [selectedSeasonIdToActivate, setSelectedSeasonIdToActivate] = useState<string | null>(null);
  const [selectedSeasonNameToActivate, setSelectedSeasonNameToActivate] = useState<string>('');

  // --- APP SPLASH SCREEN STATE ---
  const [showSplash, setShowSplash] = useState<boolean>(() => {
    try {
      const shown = sessionStorage.getItem('rashaka_splash_shown');
      return !shown;
    } catch {
      return true;
    }
  });

  const handleSplashComplete = () => {
    setShowSplash(false);
    try {
      sessionStorage.setItem('rashaka_splash_shown', 'true');
    } catch (e) {
      console.error(e);
    }
  };

  // --- CORE STATE (Persisted in LocalStorage) ---
  const [completedDaysBySeason, setCompletedDaysBySeason] = useState<Record<string, number[]>>(() => {
    try {
      const storedStats = localStorage.getItem('rashaka_user_stats');
      const statsObj = storedStats ? JSON.parse(storedStats) : null;
      const goal = statsObj?.goal || 'loss';

      const stored = localStorage.getItem('rashaka_completed_days_by_season');
      let data: Record<string, number[]> = {};
      if (stored) {
        data = JSON.parse(stored);
      } else {
        const legacy = localStorage.getItem('rashaka_completed_days');
        const legacyDays = legacy ? JSON.parse(legacy) : [];
        data = {
          'season_1': legacyDays,
          'season_2': [],
          'season_3': [],
          'season_4': []
        };
      }
      
      // Ensure all dynamic seasons for ALL goals are initialized if not present
      const goals: ('loss' | 'maintain' | 'gain')[] = ['loss', 'maintain', 'gain'];
      goals.forEach(g => {
        for (let lvl = 1; lvl <= 4; lvl++) {
          const prefix = g === 'loss' ? 'loss' : g === 'maintain' ? 'tone' : 'gain';
          const key = `${prefix}_season_${lvl}`;
          if (!data[key]) {
            // Migrate legacy if matching index
            const legacyKey = `season_${lvl}`;
            data[key] = data[legacyKey] || [];
          }
        }
      });
      
      localStorage.setItem('rashaka_completed_days_by_season', JSON.stringify(data));
      return data;
    } catch {
      return {
        'loss_season_1': [], 'loss_season_2': [], 'loss_season_3': [], 'loss_season_4': [],
        'tone_season_1': [], 'tone_season_2': [], 'tone_season_3': [], 'tone_season_4': [],
        'gain_season_1': [], 'gain_season_2': [], 'gain_season_3': [], 'gain_season_4': []
      };
    }
  });

  const [currentSeasonId, setCurrentSeasonId] = useState<string>(() => {
    try {
      const storedStats = localStorage.getItem('rashaka_user_stats');
      const statsObj = storedStats ? JSON.parse(storedStats) : null;
      const goal = statsObj?.goal || 'loss';
      const prefix = goal === 'loss' ? 'loss' : goal === 'maintain' ? 'tone' : 'gain';

      const stored = localStorage.getItem('rashaka_current_season_id');
      if (!stored) {
        return `${prefix}_season_1`;
      }
      
      // If legacy, migrate
      if (stored === 'season_1') return `${prefix}_season_1`;
      if (stored === 'season_2') return `${prefix}_season_2`;
      if (stored === 'season_3') return `${prefix}_season_3`;
      if (stored === 'season_4') return `${prefix}_season_4`;
      
      return stored;
    } catch {
      return 'loss_season_1';
    }
  });

  const [certificates, setCertificates] = useState<SeasonCertificate[]>(() => {
    try {
      const stored = localStorage.getItem('rashaka_certificates');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [celebrationSeasonName, setCelebrationSeasonName] = useState<string | null>(null);
  const [copySuccessToast, setCopySuccessToast] = useState<boolean>(false);

  // Computed completedDays for backward compatibility with the day grid
  const completedDays = completedDaysBySeason[currentSeasonId] || [];

  const [dailyLogs, setDailyLogs] = useState<Record<string, DailyLog>>(() => {
    try {
      const stored = localStorage.getItem('rashaka_daily_logs');
      return stored ? JSON.parse(stored) : {};
    } catch { return {}; }
  });

  const [journalTasks, setJournalTasks] = useState<JournalTask[]>(() => {
    try {
      const stored = localStorage.getItem('rashaka_journal_tasks');
      return stored ? JSON.parse(stored) : [
        { id: '1', text: 'شرب كوب ماء فور الاستيقاظ', completed: false },
        { id: '2', text: 'أداء تمرين اليوم بنجاح في التطبيق', completed: false },
        { id: '3', text: 'الابتعاد التام عن السكر والوجبات السريعة اليوم', completed: false },
        { id: '4', text: 'المشي لمدة 15 دقيقة بعد وجبة الغداء', completed: false }
      ];
    } catch { return []; }
  });

  const [userStats, setUserStats] = useState<UserStats>(() => {
    try {
      const stored = localStorage.getItem('rashaka_user_stats');
      return stored ? JSON.parse(stored) : {
        weight: 70,
        height: 168,
        age: 26,
        gender: 'أنثى',
        activityLevel: 1.375,
        goal: 'loss',
        onboarded: false
      };
    } catch {
      return {
        weight: 70,
        height: 168,
        age: 26,
        gender: 'أنثى',
        activityLevel: 1.375,
        goal: 'loss',
        onboarded: false
      };
    }
  });

  const seasonsList = useMemo(() => {
    const goal = userStats?.goal || 'loss';
    return SEASONS_BY_GOAL[goal] || SEASONS_BY_GOAL.loss;
  }, [userStats]);

  // Automatically keep currentSeasonId synchronized with user goal & active seasons
  useEffect(() => {
    if (seasonsList && seasonsList.length > 0) {
      const exists = seasonsList.some(s => s.id === currentSeasonId);
      if (!exists) {
        const nextSeasonId = seasonsList[0].id;
        setCurrentSeasonId(nextSeasonId);
        localStorage.setItem('rashaka_current_season_id', nextSeasonId);
      }
    }
  }, [seasonsList, currentSeasonId]);

  const workoutDays = useMemo(() => {
    return generateWorkoutDaysForUser(userStats, currentSeasonId);
  }, [userStats, currentSeasonId]);

  const activeSeason = useMemo(() => {
    return seasonsList.find(s => s.id === currentSeasonId) || seasonsList[0];
  }, [seasonsList, currentSeasonId]);

  const currentSeasonIndex = useMemo(() => {
    const idx = seasonsList.findIndex(s => s.id === currentSeasonId);
    return idx !== -1 ? idx : 0;
  }, [seasonsList, currentSeasonId]);

  const currentLevelTitle = useMemo(() => {
    switch (currentSeasonIndex) {
      case 0:
        return 'مبتدئ';
      case 1:
        return 'متوسط';
      case 2:
        return 'متقدم';
      case 3:
        return 'احترافي';
      default:
        return 'مبتدئ';
    }
  }, [currentSeasonIndex]);

  const challengeTitle = useMemo(() => {
    if (!userStats) return 'تحدي الـ 30 يوماً الرياضي';
    const goal = userStats.goal;
    let goalText = 'لتنسيق القوام';
    if (goal === 'loss') {
      goalText = 'لتخسيس وحرق الدهون';
    } else if (goal === 'maintain') {
      goalText = 'لشد وترهلات الجسم';
    } else if (goal === 'gain') {
      goalText = 'لبناء العضلات وتضخيمها';
    }

    let seasonText = '';
    if (currentSeasonId.includes('season_1')) {
      seasonText = ' - المستوى الأول';
    } else if (currentSeasonId.includes('season_2')) {
      seasonText = ' - المستوى الثاني';
    } else if (currentSeasonId.includes('season_3')) {
      seasonText = ' - المستوى الثالث';
    } else if (currentSeasonId.includes('season_4')) {
      seasonText = ' - المستوى الرابع';
    }

    return `تحدي الـ 30 يوماً ${goalText}${seasonText}`;
  }, [userStats, currentSeasonId]);

  const bmi = useMemo(() => {
    const hM = userStats.height / 100;
    return hM > 0 ? (userStats.weight / (hM * hM)).toFixed(1) : '0';
  }, [userStats]);

  const weightDistance = useMemo(() => {
    if (!userStats.targetWeight) return null;
    const diff = userStats.weight - userStats.targetWeight;
    return {
      diff: Math.abs(diff).toFixed(1),
      isLoss: diff > 0,
      isPerfect: Math.abs(diff) < 0.5
    };
  }, [userStats]);

  const todayStr = new Date().toISOString().split('T')[0];

  // Safe getter for today's log to prevent schema compatibility crashes from localStorage
  const getTodayLog = (): DailyLog => {
    const existing = dailyLogs[todayStr];
    return {
      date: todayStr,
      waterCups: existing?.waterCups ?? 0,
      caloriesBurned: existing?.caloriesBurned ?? 0,
      caloriesEaten: existing?.caloriesEaten ?? 0,
      completedExercisesCount: existing?.completedExercisesCount ?? 0,
      completedDays: existing?.completedDays ?? [],
      weightLogged: existing?.weightLogged
    };
  };

  // --- LOCAL STORAGE LOAD ---
  useEffect(() => {
    try {
      const storedCompletedBySeason = localStorage.getItem('rashaka_completed_days_by_season');
      if (storedCompletedBySeason) setCompletedDaysBySeason(JSON.parse(storedCompletedBySeason));

      const storedCurrentSeasonId = localStorage.getItem('rashaka_current_season_id');
      if (storedCurrentSeasonId) setCurrentSeasonId(storedCurrentSeasonId);

      const storedCertificates = localStorage.getItem('rashaka_certificates');
      if (storedCertificates) setCertificates(JSON.parse(storedCertificates));

      const storedLogs = localStorage.getItem('rashaka_daily_logs');
      if (storedLogs) setDailyLogs(JSON.parse(storedLogs));

      const storedStats = localStorage.getItem('rashaka_user_stats');
      if (storedStats) setUserStats(JSON.parse(storedStats));

      const storedTasks = localStorage.getItem('rashaka_journal_tasks');
      if (storedTasks) {
        setJournalTasks(JSON.parse(storedTasks));
      } else {
        const defaultTasks: JournalTask[] = [
          { id: '1', text: 'شرب كوب ماء فور الاستيقاظ', completed: false },
          { id: '2', text: 'أداء تمرين اليوم بنجاح في التطبيق', completed: false },
          { id: '3', text: 'الابتعاد التام عن السكر والوجبات السريعة اليوم', completed: false },
          { id: '4', text: 'المشي لمدة 15 دقيقة بعد وجبة الغداء', completed: false }
        ];
        setJournalTasks(defaultTasks);
        localStorage.setItem('rashaka_journal_tasks', JSON.stringify(defaultTasks));
      }
    } catch (e) {
      console.error('Error loading LocalStorage', e);
    }
  }, []);

  // --- STATE PERSISTENCE HELPERS ---
  const saveCompletedDaysBySeason = (seasonId: string, days: number[]) => {
    const updated = { ...completedDaysBySeason, [seasonId]: days };
    setCompletedDaysBySeason(updated);
    localStorage.setItem('rashaka_completed_days_by_season', JSON.stringify(updated));
    // For legacy backward compatibility:
    if (seasonId === 'season_1') {
      localStorage.setItem('rashaka_completed_days', JSON.stringify(days));
    }
  };

  const saveDailyLogs = (newLogs: Record<string, DailyLog>) => {
    setDailyLogs(newLogs);
    localStorage.setItem('rashaka_daily_logs', JSON.stringify(newLogs));
  };

  const saveJournalTasks = (newTasks: JournalTask[]) => {
    setJournalTasks(newTasks);
    localStorage.setItem('rashaka_journal_tasks', JSON.stringify(newTasks));
  };

  const saveUserStats = (newStats: UserStats) => {
    setUserStats(newStats);
    localStorage.setItem('rashaka_user_stats', JSON.stringify(newStats));
  };

  // --- THEME TOGGLE ACTIONS ---
  const handleToggleTheme = () => {
    const nextTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    localStorage.setItem('rashaka_theme', nextTheme);
    // Notify workout player of theme change
    window.dispatchEvent(new Event('storage'));
  };

  // --- STICKY FOOTER NAVIGATION HANDLER (APP CREATOR 24 INTERSTITIAL ADS COMPATIBLE) ---
  const handleTabChange = (tab: 'workout' | 'calculator' | 'journal' | 'encyclopedia' | 'seasons' | 'achievements' | 'nutrition') => {
    window.location.href = window.location.pathname + "?tab=" + tab;
  };

  // --- ACTIONS HANDLERS ---
  const handleUpdateWater = (change: number) => {
    const todayLog = getTodayLog();
    todayLog.waterCups = Math.max(0, todayLog.waterCups + change);
    
    const updated = { ...dailyLogs, [todayStr]: todayLog };
    saveDailyLogs(updated);
  };

  const handleLogWeight = (loggedWeight: number) => {
    const todayLog = getTodayLog();
    todayLog.weightLogged = loggedWeight;

    const previousWeight = userStats.weight || loggedWeight;
    const initialStartWeight = userStats.startWeight || (userStats as any).initialWeight || (previousWeight !== loggedWeight ? previousWeight : loggedWeight);

    const updatedStats: UserStats = {
      ...userStats,
      weight: loggedWeight,
      prevWeight: previousWeight !== loggedWeight ? previousWeight : (userStats.prevWeight || previousWeight),
      startWeight: initialStartWeight
    };

    setUserStats(updatedStats);
    localStorage.setItem('rashaka_user_stats', JSON.stringify(updatedStats));

    const updatedLogs = { ...dailyLogs, [todayStr]: todayLog };
    saveDailyLogs(updatedLogs);
  };

  const handleAddTask = (text: string) => {
    const newTask: JournalTask = {
      id: Date.now().toString(),
      text,
      completed: false
    };
    const updated = [newTask, ...journalTasks];
    saveJournalTasks(updated);
  };

  const handleToggleTask = (id: string) => {
    const updated = journalTasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    saveJournalTasks(updated);
  };

  const handleDeleteTask = (id: string) => {
    const updated = journalTasks.filter(t => t.id !== id);
    saveJournalTasks(updated);
  };

  const handleFinishWorkout = (dayNum: number, caloriesEstimate: number) => {
    const currentDays = completedDaysBySeason[currentSeasonId] || [];
    let updatedDays = currentDays;

    if (!currentDays.includes(dayNum)) {
      updatedDays = [...currentDays, dayNum];
      saveCompletedDaysBySeason(currentSeasonId, updatedDays);
    }

    const todayLog = getTodayLog();
    
    todayLog.caloriesBurned += caloriesEstimate;
    const targetDay = workoutDays.find(d => d.dayNumber === dayNum);
    todayLog.completedExercisesCount += targetDay?.exercises?.length || 0;
    if (!todayLog.completedDays.includes(dayNum)) {
      todayLog.completedDays.push(dayNum);
    }

    const updatedLogs = { ...dailyLogs, [todayStr]: todayLog };
    saveDailyLogs(updatedLogs);

    // If day 30 is completed for the current season, trigger celebration and issue reward certificates
    if (dayNum === 30 && updatedDays.length === 30) {
      const activeSeason = seasonsList.find(s => s.id === currentSeasonId);
      if (activeSeason) {
        const certExists = certificates.some(c => c.seasonId === currentSeasonId);
        if (!certExists) {
          const newCert: SeasonCertificate = {
            id: Date.now().toString(),
            seasonId: currentSeasonId,
            seasonName: activeSeason.nameAr,
            completedAt: new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' }),
            totalDays: 30,
            commitmentRate: 100
          };
          const updatedCerts = [...certificates, newCert];
          setCertificates(updatedCerts);
          localStorage.setItem('rashaka_certificates', JSON.stringify(updatedCerts));
        }
        setCelebrationSeasonName(activeSeason.nameAr);
      }
    } else {
      setActivePlayingDay(null);
      setSelectedDayPreview(null);
      setCurrentTab('workout');
      try {
        window.history.replaceState({}, '', window.location.pathname + "?tab=workout");
      } catch (e) {}
    }
  };

  const handleClosePreview = useCallback(() => {
    setSelectedDayPreview(null);
    try {
      window.history.replaceState({}, '', window.location.pathname + "?tab=workout");
    } catch (e) {}
  }, []);

  const handleResetProgress = () => {
    setIsResetConfirmOpen(true);
  };

  const executeResetProgress = () => {
    const resetDays = {
      'loss_season_1': [], 'loss_season_2': [], 'loss_season_3': [], 'loss_season_4': [],
      'tone_season_1': [], 'tone_season_2': [], 'tone_season_3': [], 'tone_season_4': [],
      'gain_season_1': [], 'gain_season_2': [], 'gain_season_3': [], 'gain_season_4': [],
      'season_1': [],
      'season_2': [],
      'season_3': [],
      'season_4': []
    };
    setCompletedDaysBySeason(resetDays);
    localStorage.setItem('rashaka_completed_days_by_season', JSON.stringify(resetDays));
    localStorage.setItem('rashaka_completed_days', JSON.stringify([]));

    setCurrentSeasonId('loss_season_1');
    localStorage.setItem('rashaka_current_season_id', 'loss_season_1');

    setCertificates([]);
    localStorage.setItem('rashaka_certificates', JSON.stringify([]));

    saveDailyLogs({});
    saveJournalTasks([
      { id: '1', text: 'شرب كوب ماء فور الاستيقاظ', completed: false },
      { id: '2', text: 'أداء تمرين اليوم بنجاح في التطبيق', completed: false },
      { id: '3', text: 'الابتعاد التام عن السكر والوجبات السريعة اليوم', completed: false },
      { id: '4', text: 'المشي لمدة 15 دقيقة بعد وجبة الغداء', completed: false }
    ]);
    const defaultStats: UserStats = {
      weight: 70,
      height: 168,
      age: 26,
      gender: 'أنثى',
      activityLevel: 1.375,
      goal: 'loss',
      onboarded: false
    };
    saveUserStats(defaultStats);
  };

  const executeSaveCalcStats = () => {
    if (pendingCalcStats) {
      saveUserStats({
        ...pendingCalcStats,
        onboarded: false
      });
      setPendingCalcStats(null);
    }
  };

  // Definitive Radical Social Share Executor (Works seamlessly in Android WebViews & Browsers)
  const executeSocialShare = useCallback((platform: 'whatsapp' | 'telegram' | 'facebook' | 'twitter' | 'native' | 'copy') => {
    const shareTitle = APP_CONFIG.appName;
    const shareUrl = APP_CONFIG.getShareUrl();
    const shareMessage = APP_CONFIG.getShareMessage();

    const openSafely = (url: string) => {
      try {
        const win = window.open(url, '_blank', 'noopener,noreferrer');
        if (!win || win.closed || typeof win.closed === 'undefined') {
          const a = document.createElement('a');
          a.href = url;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
      } catch (e) {
        window.location.href = url;
      }
    };

    const copyToClipboard = (text: string) => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          setCopySuccessToast(true);
          setTimeout(() => setCopySuccessToast(false), 3000);
        }).catch(() => {
          setCopySuccessToast(true);
          setTimeout(() => setCopySuccessToast(false), 3000);
        });
      } else {
        setCopySuccessToast(true);
        setTimeout(() => setCopySuccessToast(false), 3000);
      }
    };

    if (platform === 'whatsapp') {
      const fullText = encodeURIComponent(shareMessage);
      openSafely(`https://api.whatsapp.com/send?text=${fullText}`);
    } else if (platform === 'telegram') {
      const cleanText = shareMessage.replace(shareUrl, '').trim();
      openSafely(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(cleanText)}`);
    } else if (platform === 'facebook') {
      const url = encodeURIComponent(shareUrl);
      openSafely(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
    } else if (platform === 'twitter') {
      const fullText = encodeURIComponent(shareMessage);
      openSafely(`https://twitter.com/intent/tweet?text=${fullText}`);
    } else if (platform === 'native') {
      if (navigator.share) {
        navigator.share({
          title: shareTitle,
          text: shareMessage,
          url: shareUrl,
        }).catch(() => {
          copyToClipboard(shareMessage);
        });
      } else {
        copyToClipboard(shareMessage);
      }
    } else if (platform === 'copy') {
      copyToClipboard(shareMessage);
    }
  }, []);

  const handleSaveCalcStats = useCallback((stats: UserStats) => {
    setPendingCalcStats(stats);
    setIsCalcConfirmOpen(true);
  }, []);

  const handleTriggerWaterTest = useCallback(() => {
    triggerWaterReminder(true);
  }, []);

  const handleTriggerWorkoutTest = useCallback(() => {
    triggerWorkoutReminder(true);
  }, []);

  // Progress metrics
  const totalDays = 30;
  const completedCount = completedDays.length;
  const progressPercent = Math.round((completedCount / totalDays) * 100);
  const waterGoalCups = Math.round((userStats.weight * 35) / 250) || 8;

  // --- SAVED NORMAL SEASON STATE FOR LOCKING SWITCHED SEASONS ---
  const [savedNormalSeasonId, setSavedNormalSeasonId] = useState<string | null>(() => {
    try {
      return localStorage.getItem('rashaka_saved_normal_season_id');
    } catch {
      return null;
    }
  });

  const handleLockCurrentSeason = () => {
    const saved = localStorage.getItem('rashaka_saved_normal_season_id');
    if (saved) {
      setCurrentSeasonId(saved);
      localStorage.setItem('rashaka_current_season_id', saved);
      setSavedNormalSeasonId(null);
      localStorage.removeItem('rashaka_saved_normal_season_id');
      setIsFreeChallengeMode(false);
      localStorage.setItem('rashaka_free_challenge_mode', 'false');
      setCurrentTab('workout');
    }
  };

  // --- FREE CHALLENGE MODE STATE ---
  const [isFreeChallengeMode, setIsFreeChallengeMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('rashaka_free_challenge_mode') === 'true';
    } catch {
      return false;
    }
  });

  const handleToggleFreeChallengeMode = () => {
    setIsFreeChallengeMode(prev => {
      const next = !prev;
      localStorage.setItem('rashaka_free_challenge_mode', String(next));
      
      if (next) {
        // Turning ON: save the current normal season so we can return to it later
        localStorage.setItem('rashaka_saved_normal_season_id', currentSeasonId);
        setSavedNormalSeasonId(currentSeasonId);
      } else {
        // Turning OFF (locking seasons): return back to the saved normal season
        const savedNormal = localStorage.getItem('rashaka_saved_normal_season_id');
        if (savedNormal) {
          setCurrentSeasonId(savedNormal);
          localStorage.setItem('rashaka_current_season_id', savedNormal);
          setSavedNormalSeasonId(null);
          localStorage.removeItem('rashaka_saved_normal_season_id');
        } else {
          // Default fallback based on goal
          const goal = userStats?.goal || 'loss';
          const prefix = goal === 'loss' ? 'loss' : goal === 'maintain' ? 'tone' : 'gain';
          const defaultSeason = `${prefix}_season_1`;
          setCurrentSeasonId(defaultSeason);
          localStorage.setItem('rashaka_current_season_id', defaultSeason);
        }
      }
      return next;
    });
  };

  // --- WORKOUT REMINDER STATE ---
  const [isWorkoutReminderEnabled, setIsWorkoutReminderEnabled] = useState<boolean>(() => {
    try {
      return localStorage.getItem('rashaka_workout_reminder_enabled') !== 'false'; // Default to true
    } catch {
      return true;
    }
  });

  const [workoutReminderTime, setWorkoutReminderTime] = useState<string>(() => {
    try {
      return localStorage.getItem('rashaka_workout_reminder_time') || '18:00';
    } catch {
      return '18:00';
    }
  });

  const [activeWorkoutToast, setActiveWorkoutToast] = useState<{ text: string } | null>(null);

  const handleToggleWorkoutReminder = async () => {
    const nextState = !isWorkoutReminderEnabled;
    if (nextState) {
      const granted = await requestNotificationPermission();
      if (!granted && 'Notification' in window && Notification.permission === 'denied') {
        alert('تنبيه: تم حظر إشعارات المتصفح. سنقوم بإظهار تنبيهات ذكية تفاعلية وجميلة داخل التطبيق بدلاً من ذلك!');
      }
    }
    setIsWorkoutReminderEnabled(nextState);
    localStorage.setItem('rashaka_workout_reminder_enabled', String(nextState));
  };

  const handleUpdateWorkoutReminderTime = (time: string) => {
    setWorkoutReminderTime(time);
    localStorage.setItem('rashaka_workout_reminder_time', time);
  };

  const triggerWorkoutReminder = (isTest = false) => {
    const bodyText = `تنبيه التمرين اليومي 🏋️: حان الوقت المجدول لأداء تمرين اليوم! لنبدأ معاً بنشاط لنحرق الدهون ونبني قواماً صحياً رشيقاً.`;
    
    // Play a subtle notification audio chime (double chime)
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5 chime
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
      
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.15); // E5 chime
      gain2.gain.setValueAtTime(0.08, audioCtx.currentTime + 0.15);
      osc2.start(audioCtx.currentTime + 0.15);
      osc2.stop(audioCtx.currentTime + 0.3);
    } catch (e) {}

    // 1. Dispatch Native HTML5 notification if granted
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification('تمارين رياضية ولياقة بدنية 🏋️', {
          body: bodyText,
          icon: '/favicon.ico'
        });
      } catch (e) {
        console.warn('HTML5 Notification failed:', e);
      }
    }

    // 2. Show in-app Custom Floating Banner Toast
    setActiveWorkoutToast({ text: bodyText });
  };

  // Effect to check if the current local time matches the scheduled workout reminder time
  useEffect(() => {
    if (!isWorkoutReminderEnabled) return;

    const workoutChecker = setInterval(() => {
      try {
        const now = new Date();
        const currentHours = String(now.getHours()).padStart(2, '0');
        const currentMinutes = String(now.getMinutes()).padStart(2, '0');
        const currentTimeStr = `${currentHours}:${currentMinutes}`;

        if (currentTimeStr === workoutReminderTime) {
          // Only trigger once per minute
          const lastTriggerKey = `rashaka_last_workout_trigger_day_${now.toDateString()}`;
          const triggeredToday = localStorage.getItem(lastTriggerKey) === 'true';
          if (!triggeredToday) {
            triggerWorkoutReminder(false);
            localStorage.setItem(lastTriggerKey, 'true');
          }
        }
      } catch (e) {
        console.error('Error running workout reminder checker:', e);
      }
    }, 15000); // Check every 15 seconds

    return () => clearInterval(workoutChecker);
  }, [isWorkoutReminderEnabled, workoutReminderTime]);

  // --- MEAL REMINDERS STATES AND PERSISTENT SCHEDULER ---
  const [isBreakfastReminderEnabled, setIsBreakfastReminderEnabled] = useState<boolean>(() => {
    try {
      return localStorage.getItem('rashaka_breakfast_reminder_enabled') === 'true';
    } catch {
      return false;
    }
  });
  const [breakfastReminderTime, setBreakfastReminderTime] = useState<string>(() => {
    try {
      return localStorage.getItem('rashaka_breakfast_reminder_time') || '08:00';
    } catch {
      return '08:00';
    }
  });

  const [isLunchReminderEnabled, setIsLunchReminderEnabled] = useState<boolean>(() => {
    try {
      return localStorage.getItem('rashaka_lunch_reminder_enabled') === 'true';
    } catch {
      return false;
    }
  });
  const [lunchReminderTime, setLunchReminderTime] = useState<string>(() => {
    try {
      return localStorage.getItem('rashaka_lunch_reminder_time') || '14:00';
    } catch {
      return '14:00';
    }
  });

  const [isDinnerReminderEnabled, setIsDinnerReminderEnabled] = useState<boolean>(() => {
    try {
      return localStorage.getItem('rashaka_dinner_reminder_enabled') === 'true';
    } catch {
      return false;
    }
  });
  const [dinnerReminderTime, setDinnerReminderTime] = useState<string>(() => {
    try {
      return localStorage.getItem('rashaka_dinner_reminder_time') || '20:00';
    } catch {
      return '20:00';
    }
  });

  const [activeMealToast, setActiveMealToast] = useState<{ text: string, type: 'breakfast' | 'lunch' | 'dinner' } | null>(null);

  const handleToggleBreakfastReminder = async () => {
    const nextState = !isBreakfastReminderEnabled;
    if (nextState) {
      await requestNotificationPermission();
    }
    setIsBreakfastReminderEnabled(nextState);
    localStorage.setItem('rashaka_breakfast_reminder_enabled', String(nextState));
  };

  const handleUpdateBreakfastReminderTime = (time: string) => {
    setBreakfastReminderTime(time);
    localStorage.setItem('rashaka_breakfast_reminder_time', time);
  };

  const handleToggleLunchReminder = async () => {
    const nextState = !isLunchReminderEnabled;
    if (nextState) {
      await requestNotificationPermission();
    }
    setIsLunchReminderEnabled(nextState);
    localStorage.setItem('rashaka_lunch_reminder_enabled', String(nextState));
  };

  const handleUpdateLunchReminderTime = (time: string) => {
    setLunchReminderTime(time);
    localStorage.setItem('rashaka_lunch_reminder_time', time);
  };

  const handleToggleDinnerReminder = async () => {
    const nextState = !isDinnerReminderEnabled;
    if (nextState) {
      await requestNotificationPermission();
    }
    setIsDinnerReminderEnabled(nextState);
    localStorage.setItem('rashaka_dinner_reminder_enabled', String(nextState));
  };

  const handleUpdateDinnerReminderTime = (time: string) => {
    setDinnerReminderTime(time);
    localStorage.setItem('rashaka_dinner_reminder_time', time);
  };

  const triggerMealReminder = (mealType: 'breakfast' | 'lunch' | 'dinner', isTest = false) => {
    let mealName = '';
    let emoji = '';
    let tip = '';
    if (mealType === 'breakfast') {
      mealName = 'وجبة الإفطار 🍳';
      emoji = '🍳';
      tip = 'ابدأ يومك بوجبة غنية بالبروتين والألياف لتنشيط الحرق والحفاظ على طاقتك طوال النهار!';
    } else if (mealType === 'lunch') {
      mealName = 'وجبة الغداء 🍗';
      emoji = '🍗';
      tip = 'حان موعد الغداء الصحي المخطط له! ركز على الخضروات، الكربوهيدرات المعقدة، والبروتين النظيف.';
    } else {
      mealName = 'وجبة العشاء 🥗';
      emoji = '🥗';
      tip = 'وجبة عشاء خفيفة وصحية قبل النوم تدعم الاستشفاء العضلي ولا تثقل معدتك أثناء النوم.';
    }

    const bodyText = `تذكير الوجبة المجدول ${emoji}: حان الآن وقت ${mealName}. ${tip}`;

    // Play a subtle notification audio chime
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5 chime
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch (e) {}

    // 1. Dispatch Native HTML5 notification if granted
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(`تمارين رياضية ولياقة بدنية ${emoji}`, {
          body: bodyText,
          icon: '/favicon.ico'
        });
      } catch (e) {
        console.warn('HTML5 Notification failed:', e);
      }
    }

    // 2. Show in-app Custom Floating Banner Toast
    setActiveMealToast({ text: bodyText, type: mealType });
  };

  // Effect to check if the current local time matches any scheduled meal reminder times
  useEffect(() => {
    const mealChecker = setInterval(() => {
      try {
        const now = new Date();
        const currentHours = String(now.getHours()).padStart(2, '0');
        const currentMinutes = String(now.getMinutes()).padStart(2, '0');
        const currentTimeStr = `${currentHours}:${currentMinutes}`;

        // Check Breakfast
        if (isBreakfastReminderEnabled && currentTimeStr === breakfastReminderTime) {
          const lastTriggerKey = `rashaka_last_breakfast_trigger_${now.toDateString()}`;
          if (localStorage.getItem(lastTriggerKey) !== 'true') {
            triggerMealReminder('breakfast');
            localStorage.setItem(lastTriggerKey, 'true');
          }
        }

        // Check Lunch
        if (isLunchReminderEnabled && currentTimeStr === lunchReminderTime) {
          const lastTriggerKey = `rashaka_last_lunch_trigger_${now.toDateString()}`;
          if (localStorage.getItem(lastTriggerKey) !== 'true') {
            triggerMealReminder('lunch');
            localStorage.setItem(lastTriggerKey, 'true');
          }
        }

        // Check Dinner
        if (isDinnerReminderEnabled && currentTimeStr === dinnerReminderTime) {
          const lastTriggerKey = `rashaka_last_dinner_trigger_${now.toDateString()}`;
          if (localStorage.getItem(lastTriggerKey) !== 'true') {
            triggerMealReminder('dinner');
            localStorage.setItem(lastTriggerKey, 'true');
          }
        }
      } catch (e) {
        console.error('Error running meal reminder checker:', e);
      }
    }, 15000); // Check every 15 seconds

    return () => clearInterval(mealChecker);
  }, [
    isBreakfastReminderEnabled, breakfastReminderTime,
    isLunchReminderEnabled, lunchReminderTime,
    isDinnerReminderEnabled, dinnerReminderTime
  ]);

  // --- WATER REMINDER STATE AND PERSISTENT SCHEDULER ---
  const [isWaterReminderEnabled, setIsWaterReminderEnabled] = useState<boolean>(() => {
    try {
      return localStorage.getItem('rashaka_water_reminder_enabled') === 'true';
    } catch {
      return false;
    }
  });

  const [activeWaterToast, setActiveWaterToast] = useState<{ text: string } | null>(null);

  // Request browser notification permission
  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      try {
        const permission = await Notification.requestPermission();
        return permission === 'granted';
      } catch (e) {
        console.warn('Error requesting notifications permission:', e);
      }
    }
    return false;
  };

  // Toggle Reminder Status
  const handleToggleWaterReminder = async () => {
    const nextState = !isWaterReminderEnabled;
    if (nextState) {
      const granted = await requestNotificationPermission();
      if (!granted && 'Notification' in window && Notification.permission === 'denied') {
        alert('تنبيه: تم حظر إشعارات المتصفح. سنقوم بإظهار تنبيهات ذكية تفاعلية وجميلة داخل التطبيق بدلاً من ذلك!');
      }
    }
    setIsWaterReminderEnabled(nextState);
    localStorage.setItem('rashaka_water_reminder_enabled', String(nextState));
    if (nextState) {
      localStorage.setItem('rashaka_last_water_reminder_time', String(Date.now()));
    }
  };

  // Function to dispatch a local and in-app water reminder
  const triggerWaterReminder = (isTest = false) => {
    const bodyText = `تذكير صحي 🥛: حان الوقت لشرب كوب من الماء! هدفك اليومي هو ${waterGoalCups} أكواب للمحافظة على رطوبتك وحرق دهون البطن.`;
    
    // Play a subtle notification audio chime
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // chime frequency
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch (e) {}

    // 1. Dispatch Native HTML5 notification if granted
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification('تمارين رياضية ولياقة بدنية 🥛', {
          body: bodyText,
          icon: '/favicon.ico'
        });
      } catch (e) {
        console.warn('HTML5 Notification failed:', e);
      }
    }

    // 2. Show in-app Custom Floating Banner Toast
    setActiveWaterToast({ text: bodyText });
  };

  // Effect to handle persistent checking of intervals
  useEffect(() => {
    if (!isWaterReminderEnabled) return;

    // Check every 10 seconds if 2 hours have passed since last reminder
    const reminderChecker = setInterval(() => {
      try {
        const lastStr = localStorage.getItem('rashaka_last_water_reminder_time');
        const lastTime = lastStr ? parseInt(lastStr, 10) : Date.now();
        const now = Date.now();
        const TWO_HOURS = 2 * 60 * 60 * 1000; // 2 hours

        if (now - lastTime >= TWO_HOURS) {
          triggerWaterReminder();
          localStorage.setItem('rashaka_last_water_reminder_time', String(now));
        }
      } catch (e) {
        console.error('Error in persistent water reminder tracker:', e);
      }
    }, 10000);

    return () => clearInterval(reminderChecker);
  }, [isWaterReminderEnabled, waterGoalCups]);

  // Render different themes seamlessly
  const themeClass = isDark 
    ? 'bg-[#0E0E10] text-white border-white/5 shadow-2xl' 
    : 'bg-[#F4F4F5] text-gray-950 border-gray-200 shadow-xl';

  const innerBgClass = isDark 
    ? 'bg-[#121214]' 
    : 'bg-[#FAFAFA]';

  const headerBgClass = isDark 
    ? 'bg-[#18181B] border-white/5' 
    : 'bg-white border-gray-200 shadow-xs';

  const cardClass = isDark 
    ? 'bg-[#1F1F23]/80 border-white/5 text-white' 
    : 'bg-white border-gray-200 text-gray-900 shadow-sm';

  return (
    <div className={`min-h-screen font-sans flex items-center justify-center p-0 md:p-6 transition-colors duration-300 ${
      isDark ? 'bg-[#040406]' : 'bg-[#EAEAEA]'
    }`} dir="rtl">
      
      {/* Absolute blurry background glow effects on desktop */}
      <div className="hidden md:block absolute top-10 left-10 w-96 h-96 bg-[#FF5F2E]/5 rounded-full blur-3xl pointer-events-none z-0 animate-pulse"></div>
      <div className="hidden md:block absolute bottom-10 right-10 w-96 h-96 bg-[#FF912E]/5 rounded-full blur-3xl pointer-events-none z-0 animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Main smartphone emulator container */}
      <div className={`relative max-w-md w-full h-screen md:h-[850px] md:max-h-[900px] md:rounded-[40px] flex flex-col justify-between overflow-hidden border transition-all duration-300 z-10 ${themeClass}`}>
        
        {showSplash ? (
          <AppSplashScreen onComplete={handleSplashComplete} isDark={isDark} />
        ) : !userStats.onboarded ? (
          <OnboardingWizard onComplete={saveUserStats} isDark={isDark} />
        ) : (
          <>
            {/* Custom In-App Water Toast Notification with modern slide-down animations */}
            <AnimatePresence>
              {activeWaterToast && (
                <motion.div
                  initial={{ opacity: 0, y: -50, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                  className="absolute top-16 left-4 right-4 z-50 bg-[#1E1E24]/95 backdrop-blur-md border border-sky-500/20 shadow-[0_10px_25px_rgba(14,165,233,0.15)] rounded-2xl p-4 text-white"
                  dir="rtl"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/15 text-sky-400 flex items-center justify-center animate-bounce-slow shrink-0">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12,2.69C12,2.69 19,10.19 19,15A7,7 0 0,1 12,22A7,7 0 0,1 5,15C5,10.19 12,2.69 12,2.69M12,5.19C10.24,7.3 7,11.59 7,15A5,5 0 0,0 12,20A5,5 0 0,0 17,15C17,11.59 13.76,7.3 12,5.19Z" />
                      </svg>
                    </div>
                    <div className="flex-1 space-y-1">
                      <h4 className="text-xs font-black text-sky-400 flex items-center gap-1.5">
                        <span>تذكير شرب الماء الذكي 🥛</span>
                      </h4>
                      <p className="text-[11px] leading-relaxed text-gray-200 font-medium">
                        {activeWaterToast.text}
                      </p>
                      
                      {/* Interactive Buttons */}
                      <div className="flex gap-2.5 pt-2">
                        <button
                          onClick={() => {
                            handleUpdateWater(1);
                            setActiveWaterToast(null);
                          }}
                          className="px-3 py-1.5 bg-sky-500 hover:bg-sky-600 text-white text-[10px] font-black rounded-lg transition-all active:scale-95 cursor-pointer"
                        >
                          تم شرب كوب (+1) 👍
                        </button>
                        <button
                          onClick={() => setActiveWaterToast(null)}
                          className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-[10px] font-bold rounded-lg transition-all active:scale-95 cursor-pointer"
                        >
                          تجاهل
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeWorkoutToast && (
                <motion.div
                  initial={{ opacity: 0, y: -50, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                  className="absolute top-16 left-4 right-4 z-50 bg-[#1E1E24]/95 backdrop-blur-md border border-[#FF5F2E]/20 shadow-[0_10px_25px_rgba(255,95,46,0.15)] rounded-2xl p-4 text-white"
                  dir="rtl"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FF5F2E]/15 text-[#FF5F2E] flex items-center justify-center animate-bounce-slow shrink-0">
                      <Bell className="w-5 h-5 text-[#FF5F2E]" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h4 className="text-xs font-black text-[#FF5F2E] flex items-center gap-1.5">
                        <span>تنبيه التمرين المجدول 🏋️</span>
                      </h4>
                      <p className="text-[11px] leading-relaxed text-gray-200 font-medium">
                        {activeWorkoutToast.text}
                      </p>
                      
                      {/* Interactive Buttons */}
                      <div className="flex gap-2.5 pt-2">
                        <button
                          onClick={() => {
                            setActiveWorkoutToast(null);
                            handleTabChange('workout');
                          }}
                          className="px-3 py-1.5 bg-[#FF5F2E] hover:bg-[#FF912E] text-white text-[10px] font-black rounded-lg transition-all active:scale-95 cursor-pointer"
                        >
                          ابدأ التمرين الآن 💪
                        </button>
                        <button
                          onClick={() => setActiveWorkoutToast(null)}
                          className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-[10px] font-bold rounded-lg transition-all active:scale-95 cursor-pointer"
                        >
                          تذكير لاحقاً
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeMealToast && (
                <motion.div
                  initial={{ opacity: 0, y: -50, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                  className="absolute top-16 left-4 right-4 z-50 bg-[#1E1E24]/95 backdrop-blur-md border border-[#FF5F2E]/30 shadow-[0_10px_25px_rgba(255,95,46,0.18)] rounded-2xl p-4 text-white"
                  dir="rtl"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FF5F2E]/15 text-[#FF5F2E] flex items-center justify-center animate-bounce-slow shrink-0">
                      <Sparkles className="w-5 h-5 text-[#FF5F2E]" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h4 className="text-xs font-black text-[#FF5F2E] flex items-center gap-1.5">
                        <span>💡 تذكير التغذية والوجبات</span>
                      </h4>
                      <p className="text-[11px] leading-relaxed text-gray-200 font-medium">
                        {activeMealToast.text}
                      </p>
                      
                      {/* Interactive Buttons */}
                      <div className="flex gap-2.5 pt-2">
                        <button
                          onClick={() => {
                            setActiveMealToast(null);
                            handleTabChange('nutrition');
                          }}
                          className="px-3 py-1.5 bg-[#FF5F2E] hover:bg-[#FF912E] text-white text-[10px] font-black rounded-lg transition-all active:scale-95 cursor-pointer"
                        >
                          افتح التغذية 🍎
                        </button>
                        <button
                          onClick={() => setActiveMealToast(null)}
                          className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-[10px] font-bold rounded-lg transition-all active:scale-95 cursor-pointer"
                        >
                          تجاهل
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* App Topbar (Sticky on scroll) */}
            <div className={`px-5 py-4 flex items-center justify-between border-b shrink-0 z-20 ${headerBgClass}`}>
              <div className="flex items-center gap-2.5">
                {/* Menu Hamburger Trigger */}
                <button
                  onClick={() => setIsMenuOpen(true)}
                  className={`p-2.5 rounded-2xl transition-all cursor-pointer ${
                    isDark ? 'bg-[#1E1E22] text-gray-300 hover:text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  title="القائمة الجانبية"
                >
                  <Menu className="w-4 h-4" />
                </button>
                
                <div>
                  <h1 className={`text-sm font-black tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {userStats.userName ? `👋 مرحبًا يا ${userStats.userName}` : 'تمارين رياضية ولياقة بدنية'}
                  </h1>
                  <p className="text-[9px] text-[#FF5F2E] font-black">
                    المستوى {seasonsList.findIndex(s => s.id === currentSeasonId) !== -1 ? seasonsList.findIndex(s => s.id === currentSeasonId) + 1 : 1}: {activeSeason.nameAr} 🔥
                  </p>
                </div>
              </div>

              {/* Flame status */}
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 bg-[#FF5F2E]/10 border border-[#FF5F2E]/20 text-[#FF5F2E] rounded-full text-xs font-bold flex items-center gap-1">
                  <Flame className="w-4 h-4 text-[#FF5F2E] animate-pulse" />
                  <span className="font-mono">{completedCount} / 30</span>
                </div>
              </div>
            </div>

            {/* Dynamic Screen View Content with Scroll - Lock when Preview Modal is active as requested */}
            <div 
              ref={scrollContainerRef}
              className={`flex-1 px-5 py-4 space-y-5 overflow-y-auto transition-all ${innerBgClass} ${
                selectedDayPreview ? 'overflow-hidden pointer-events-none' : ''
              }`}
            >
              
              <AnimatePresence mode="wait">
                  {/* Workout Screen Tab */}
                  {currentTab === 'workout' && (
                    <motion.div 
                      key="workout"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                      className="space-y-6 pb-20"
                    >
                      {/* Profile progress card */}
                      <div className={`border border-[#FF5F2E]/35 rounded-3xl p-5 shadow-lg relative overflow-hidden transition-all duration-300 shadow-[#FF5F2E]/15 hover:shadow-[#FF5F2E]/25 shadow-[0_0_20px_rgba(255,95,46,0.12)] ${cardClass}`}>
                        {/* Top Glowing Orange Edge Line */}
                        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#FF5F2E] to-transparent opacity-90 rounded-t-3xl pointer-events-none" />
                        
                        {/* Glowing Orange Inner Border Effect */}
                        <div className="absolute inset-0 rounded-3xl border border-[#FF5F2E]/20 pointer-events-none shadow-[0_0_12px_rgba(255,95,46,0.1)_inset]" />

                        <div className="absolute right-0 bottom-0 w-36 h-36 bg-[#FF5F2E]/15 rounded-full blur-2xl pointer-events-none"></div>
                        <div className="flex justify-between items-start">
                          <div className="space-y-1.5">
                            <span className="text-[10px] bg-[#FF5F2E] text-white font-bold px-2.5 py-0.5 rounded-full font-sans">
                              مستوى التحدي الحالي
                            </span>
                            <h2 className={`text-base font-extrabold ${isDark ? 'text-white' : 'text-gray-900'}`}>مستوى {activeSeason.nameAr} {activeSeason.emoji}</h2>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>أنهيت بنجاح {completedCount} يوماً حتى الآن.</p>
                          </div>
                          <div className="text-left">
                            <span className="text-3xl font-black font-mono text-[#FF5F2E]">{progressPercent}%</span>
                            <span className={`block text-[9px] font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>نسبة الإكمال</span>
                          </div>
                        </div>

                        {/* Progress bar visual */}
                        <div className="mt-4 space-y-1">
                          <div className={`w-full h-2.5 rounded-full overflow-hidden ${isDark ? 'bg-[#222222]' : 'bg-gray-100'}`}>
                            <div 
                              className="bg-gradient-to-r from-[#FF3B00] via-[#FF5F2E] to-[#FF2E00] h-full rounded-full transition-all duration-500 shadow-sm shadow-[#FF3B00]/30"
                              style={{ width: `${progressPercent}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Reset Progress trigger button */}
                        <div className="flex justify-between items-center mt-5 pt-3 border-t border-white/5 text-[11px] text-gray-400">
                          <span className="flex items-center gap-1 text-[10px]">
                            <Award className="w-3.5 h-3.5 text-[#FF5F2E]" />
                            <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>الهدف: بطن مشدود وجسم رياضي</span>
                          </span>
                          <button 
                            onClick={handleResetProgress}
                            className="hover:text-rose-400 flex items-center gap-1.5 transition-all text-[10px] cursor-pointer"
                            title="إعادة تهيئة كل التقدم"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>إعادة ضبط البدء</span>
                          </button>
                        </div>
                      </div>

                      {/* Virtualized 30 Days Grid Section */}
                      <WorkoutDays
                        workoutDays={workoutDays}
                        completedDays={completedDays}
                        isDark={isDark}
                        onSelectDay={(dayNum) => {
                          const targetDay = workoutDays.find(d => d.dayNumber === dayNum);
                          if (targetDay) {
                            setSelectedDayPreview(targetDay);
                            try {
                              window.history.replaceState({}, '', window.location.pathname + `?tab=workout&preview=${dayNum}`);
                            } catch (e) {}
                          }
                        }}
                        onResetProgress={handleResetProgress}
                        onSelectNextSeason={() => {
                          const currentIndex = seasonsList.findIndex(s => s.id === currentSeasonId);
                          const nextSeason = seasonsList[currentIndex + 1];
                          if (nextSeason) {
                            setCurrentSeasonId(nextSeason.id);
                            localStorage.setItem('rashaka_current_season_id', nextSeason.id);
                            window.location.href = window.location.pathname + "?tab=workout";
                          }
                        }}
                      />
                    </motion.div>
                  )}

                  {/* Calculator Tab */}
                  {currentTab === 'calculator' && (
                    <motion.div
                      key="calculator"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <CalorieCalculator 
                        savedStats={userStats}
                        isDark={isDark}
                        onSaveStats={handleSaveCalcStats}
                      />
                    </motion.div>
                  )}

                  {/* Journal & Water Tab */}
                  {currentTab === 'journal' && (
                    <motion.div
                      key="journal"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <DailyJournal 
                        logs={dailyLogs}
                        tasks={journalTasks}
                        waterGoalCups={waterGoalCups}
                        isDark={isDark}
                        userStats={userStats}
                        onUpdateWater={handleUpdateWater}
                        onLogWeight={handleLogWeight}
                        onAddTask={handleAddTask}
                        onToggleTask={handleToggleTask}
                        onDeleteTask={handleDeleteTask}
                        isWaterReminderEnabled={isWaterReminderEnabled}
                        onToggleWaterReminder={handleToggleWaterReminder}
                        onTriggerTestReminder={handleTriggerWaterTest}
                        isWorkoutReminderEnabled={isWorkoutReminderEnabled}
                        onToggleWorkoutReminder={handleToggleWorkoutReminder}
                        workoutReminderTime={workoutReminderTime}
                        onUpdateWorkoutReminderTime={handleUpdateWorkoutReminderTime}
                        onTriggerTestWorkoutReminder={handleTriggerWorkoutTest}
                      />
                    </motion.div>
                  )}

                  {/* Encyclopedia Tab */}
                  {currentTab === 'encyclopedia' && (
                    <motion.div
                      key="encyclopedia"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <ExerciseEncyclopedia isDark={isDark} />
                    </motion.div>
                  )}

                  {/* Seasons Tab */}
                  {currentTab === 'seasons' && (
                    <motion.div
                      key="seasons"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <SeasonsPage
                        completedDaysBySeason={completedDaysBySeason}
                        currentSeasonId={currentSeasonId}
                        onSelectSeason={(seasonId) => {
                          const selectedSeason = seasonsList.find(s => s.id === seasonId);
                          const seasonNameAr = selectedSeason ? selectedSeason.nameAr : 'المستوى الجديد';
                          
                          if (isFreeChallengeMode) {
                            setSelectedSeasonIdToActivate(seasonId);
                            setSelectedSeasonNameToActivate(seasonNameAr);
                            setSeasonConfirmModalOpen(true);
                          } else {
                            setCurrentSeasonId(seasonId);
                            localStorage.setItem('rashaka_current_season_id', seasonId);
                            setCurrentTab('workout');
                            try {
                              window.history.replaceState({}, '', window.location.pathname + "?tab=workout");
                            } catch (e) {}
                          }
                        }}
                        isDark={isDark}
                        seasonsList={seasonsList}
                        isFreeChallengeMode={isFreeChallengeMode}
                        userStats={userStats}
                      />
                    </motion.div>
                  )}

                  {/* Achievements Tab */}
                  {currentTab === 'achievements' && (
                    <motion.div
                      key="achievements"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <AchievementsPage
                        completedDaysBySeason={completedDaysBySeason}
                        certificates={certificates}
                        dailyLogs={dailyLogs}
                        isDark={isDark}
                        userStats={userStats}
                        onUpdateProfile={(name, avatar) => {
                          const updated = { ...userStats, userName: name, userAvatar: avatar };
                          saveUserStats(updated);
                        }}
                        seasonsList={seasonsList}
                        currentSeasonId={currentSeasonId}
                        onSelectSeason={(seasonId) => {
                          setCurrentSeasonId(seasonId);
                          localStorage.setItem('rashaka_current_season_id', seasonId);
                          window.location.href = window.location.pathname + "?tab=workout";
                        }}
                      />
                    </motion.div>
                  )}

                  {/* Smart Nutrition Tab */}
                  {currentTab === 'nutrition' && (
                    <motion.div
                      key="nutrition"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <SmartNutrition
                        userStats={userStats}
                        isDark={isDark}
                        onUpdateStats={(newStats) => {
                          saveUserStats(newStats);
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

            </div>

            {/* --- DYNAMIC DRAWERS AND INTERACTIVE MODALS --- */}
            
            {/* Day Preview Modal (قبل البدء في التمرين) WITH EXACT NUTRITION LIBRARY CARD SPRING TRANSITION */}
            <AnimatePresence>
              {selectedDayPreview && (
                <div className="fixed inset-0 bg-black/80 z-40 flex items-end justify-center" dir="rtl">
                  {/* Backdrop Touch Close Trigger */}
                  <div className="absolute inset-0" onClick={handleClosePreview}></div>
                  
                  {/* Drawer Container */}
                  <motion.div 
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                    className={`relative max-w-md w-full border-t rounded-t-[36px] overflow-hidden z-50 max-h-[92%] overflow-y-auto ${
                      isDark ? 'bg-[#161618] border-white/10 text-white' : 'bg-white border-gray-200 text-gray-900 shadow-2xl'
                    }`}
                  >
                    <div className="p-6 space-y-5">
                      {/* Visual Handle */}
                      <div className="w-12 h-1 bg-gray-500/30 rounded-full mx-auto"></div>
 
                      {/* Bold X Close Button */}
                      <button
                        onClick={handleClosePreview}
                        className={`absolute left-5 top-5 p-2 rounded-full transition-all cursor-pointer ${
                          isDark ? 'bg-[#222224] text-gray-400 hover:text-white hover:bg-[#2C2C2E]' : 'bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200'
                        }`}
                        title="قفل النافذة"
                      >
                        <X className="w-5 h-5" />
                      </button>

                    <div className="flex justify-between items-start pt-2">
                      <div className="space-y-1">
                        <span className="text-[10px] bg-[#FF5F2E]/10 text-[#FF5F2E] border border-[#FF5F2E]/20 font-black px-2.5 py-0.5 rounded-full uppercase">
                          تمارين اليوم المقترحة
                        </span>
                        <h3 className={`text-sm font-extrabold mt-1.5 ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedDayPreview.titleAr}</h3>
                        <p className="text-[9px] text-gray-400 font-mono uppercase mt-0.5">{selectedDayPreview.titleEn}</p>
                      </div>
                    </div>

                    {/* Difficulty Badge and Metadata Grid */}
                    <div className="grid grid-cols-3 gap-2.5">
                      <div className={`p-2 rounded-2xl border text-center ${isDark ? 'bg-[#222225]/40 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                        <span className="text-[9px] text-gray-400 block font-bold">الصعوبة</span>
                        <span className="text-xs font-black text-[#FF5F2E]">{selectedDayPreview.difficulty}</span>
                      </div>
                      <div className={`p-2 rounded-2xl border text-center ${isDark ? 'bg-[#222225]/40 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                        <span className="text-[9px] text-gray-400 block font-bold">حرق تقريبي</span>
                        <span className="text-xs font-black font-mono text-emerald-500 flex items-center justify-center gap-1">
                          <span>{selectedDayPreview.caloriesEstimate}</span>
                          <span>سعرة</span>
                        </span>
                      </div>
                      <div className={`p-2 rounded-2xl border text-center ${isDark ? 'bg-[#222225]/40 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                        <span className="text-[9px] text-gray-400 block font-bold">مدة الجلسة</span>
                        <span className="text-xs font-black font-mono text-sky-400 flex items-center justify-center gap-1">
                          <span>{selectedDayPreview.estimatedTime}</span>
                          <span>دقيقة</span>
                        </span>
                      </div>
                      <div className={`p-2 rounded-2xl border text-center ${isDark ? 'bg-[#222225]/40 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                        <span className="text-[9px] text-gray-400 block font-bold">عدد التمارين</span>
                        <span className="text-xs font-black font-mono text-purple-400">
                          {selectedDayPreview.exercises.length} تمارين
                        </span>
                      </div>
                      <div className={`p-2 rounded-2xl border text-center ${isDark ? 'bg-[#222225]/40 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                        <span className="text-[9px] text-gray-400 block font-bold">المجموعات</span>
                        <span className="text-xs font-black font-mono text-indigo-400">
                          {selectedDayPreview.totalSets || 3} جولات
                        </span>
                      </div>
                      <div className={`p-2 rounded-2xl border text-center ${isDark ? 'bg-[#222225]/40 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                        <span className="text-[9px] text-gray-400 block font-bold">العضلات</span>
                        <span className="text-[10px] font-bold text-amber-400 truncate block">
                          {selectedDayPreview.targetMuscles?.[0] || 'كامل الجسم'}
                        </span>
                      </div>
                    </div>

                    {/* Exercises list */}
                    {selectedDayPreview.isRestDay ? (
                      <div className={`text-center py-8 space-y-3 rounded-2xl border ${
                        isDark ? 'bg-[#FF912E]/5 border-[#FF912E]/15' : 'bg-amber-500/5 border-amber-500/15'
                      }`}>
                        <span className="text-3xl">☕</span>
                        <h4 className="font-extrabold text-[#FF912E] text-sm">يوم راحة مريح وجسم مشدود!</h4>
                        <p className={`text-xs leading-relaxed max-w-xs mx-auto px-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          عضلاتك تنمو وتتشكل أثناء الراحة وليس التمرين فقط. خذ نفساً عميقاً، ركز على الغذاء الصحي اليوم والماء لتجديد حيويتك للغد!
                        </p>
                        <button
                          onClick={() => handleFinishWorkout(selectedDayPreview.dayNumber, 0)}
                          className="mt-4 px-6 py-2.5 bg-[#FF5F2E] hover:bg-[#FF5F2E]/90 text-white rounded-full font-bold text-xs shadow-xs transition-all cursor-pointer"
                        >
                          تأكيد الراحة والانتقال لليوم التالي
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <span className={`text-xs font-bold block ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>التمارين وجولات الأداء:</span>
                        <VirtualizedExerciseList exerciseIds={selectedDayPreview.exercises} isDark={isDark} />

                        {/* CTA START BUTTON */}
                        <div className="pt-2">
                          <button
                            onClick={() => {
                              window.location.href = window.location.pathname + `?tab=workout&day=${selectedDayPreview.dayNumber}&exercise=0`;
                            }}
                            className="w-full py-4 bg-gradient-to-r from-[#FF5F2E] to-[#FF912E] hover:opacity-90 text-white font-extrabold rounded-2xl text-xs transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                          >
                            <Sparkles className="w-4 h-4 text-white animate-pulse" />
                            <span>ابدأ التمرين اليوم ({selectedDayPreview.totalSets || 3} مجموعات لكل تمرين)</span>
                          </button>
                        </div>
                      </div>
                    )}
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* Fullscreen Workout Active Game/Player */}
            {activePlayingDay && (
              <WorkoutPlayer 
                day={activePlayingDay}
                onFinishWorkout={handleFinishWorkout}
                onClose={() => {
                  window.location.href = window.location.pathname + "?tab=workout";
                }}
                userStats={userStats}
                seasonId={currentSeasonId}
              />
            )}

            {/* --- COMPLIANCE HAMBURGER MENU OVERLAY --- */}
            <AnimatePresence>
              {isMenuOpen && (
                <div className="fixed inset-0 bg-black/80 z-40 flex justify-start animate-fade-in" dir="rtl">
                  {/* Backdrop dismiss trigger */}
                  <div className="absolute inset-0" onClick={(e) => { e.stopPropagation(); setIsMenuOpen(false); }}></div>

                  {/* Sidebar Drawer */}
                  <motion.div
                    onClick={(e) => e.stopPropagation()}
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'tween', duration: 0.3 }}
                    className={`relative w-72 h-full flex flex-col justify-between z-50 overflow-hidden ${
                      isDark ? 'bg-[#161618] text-white border-l border-white/5' : 'bg-white text-gray-950 border-l border-gray-100 shadow-2xl'
                    }`}
                  >
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
                      {/* Logo and Close header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          {appIcon && typeof appIcon === 'string' && appIcon.trim() !== '' ? (
                            <img 
                              src={appIcon} 
                              alt="أيقونة التطبيق" 
                              className="w-8 h-8 rounded-xl object-cover shadow-sm border border-white/10" 
                            />
                          ) : null}
                          <span className="text-sm font-extrabold">الإعدادات</span>
                        </div>
                        <button
                          onClick={() => setIsMenuOpen(false)}
                          className={`p-1.5 rounded-lg ${isDark ? 'bg-white/5 text-gray-400 hover:text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Profile brief - Compact & Aesthetic Current Level Card */}
                      <div className={`px-3.5 py-2 rounded-xl border flex items-center justify-between gap-2 transition-all ${
                        isDark 
                          ? 'bg-gradient-to-r from-[#FF5F2E]/15 via-[#FF5F2E]/5 to-white/5 border-[#FF5F2E]/20 text-white' 
                          : 'bg-gradient-to-r from-orange-50/90 via-amber-50/40 to-gray-50 border-orange-200/60 text-gray-800 shadow-2xs'
                      }`}>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg bg-[#FF5F2E]/15 border border-[#FF5F2E]/30 flex items-center justify-center text-xs shrink-0">
                            🏆
                          </div>
                          <span className={`text-[10px] font-bold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>مستواك الحالي</span>
                        </div>
                        <span className="text-[11px] font-extrabold text-[#FF5F2E] bg-[#FF5F2E]/10 px-2 py-0.5 rounded-md border border-[#FF5F2E]/20 truncate max-w-[140px] text-left" dir="auto">
                          {currentLevelTitle}
                        </span>
                      </div>

                      {/* Navigation list */}
                      <div className="space-y-3">
                        {/* 1. Dark/Light Theme Selector Card - Ultra Compact */}
                        <div className={`px-3 py-2 rounded-xl border flex items-center justify-between gap-2 transition-all ${
                          isDark 
                            ? 'bg-zinc-900/80 border-zinc-800 text-white' 
                            : 'bg-white border-gray-200/80 text-gray-800 shadow-2xs'
                        }`}>
                          <div className="flex items-center gap-2 min-w-0">
                            <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border ${
                              isDark 
                                ? 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300' 
                                : 'bg-amber-500/15 border-amber-500/30 text-amber-600'
                            }`}>
                              {isDark ? <Moon className="w-3 h-3" /> : <Sun className="w-3 h-3 text-amber-500" />}
                            </div>
                            <span className={`text-[11px] font-bold truncate ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                              {isDark ? 'الوضع الداكن' : 'الوضع المضيء'}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={handleToggleTheme}
                            className={`w-8 h-4.5 rounded-full p-0.5 transition-all duration-300 focus:outline-hidden cursor-pointer shrink-0 ${
                              isDark ? 'bg-indigo-600' : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                            title={isDark ? "تفعيل الوضع المضيء" : "تفعيل الوضع الداكن"}
                          >
                            <div className={`w-3.5 h-3.5 rounded-full bg-white shadow-xs flex items-center justify-center transition-transform duration-300 ${
                              isDark ? 'translate-x-0' : '-translate-x-3.5'
                            }`}>
                              {isDark ? <Moon className="w-2 h-2 text-indigo-600" /> : <Sun className="w-2 h-2 text-amber-500" />}
                            </div>
                          </button>
                        </div>

                        {/* 2. Free Challenge Mode Toggle Card - Ultra Compact */}
                        <div className={`px-3 py-2 rounded-xl border flex items-center justify-between gap-2 transition-all ${
                          isFreeChallengeMode
                            ? (isDark 
                                ? 'bg-amber-950/20 border-amber-500/30 text-white' 
                                : 'bg-orange-50/70 border-orange-200 text-gray-800 shadow-2xs')
                            : (isDark 
                                ? 'bg-zinc-900/80 border-zinc-800 text-white' 
                                : 'bg-white border-gray-200/80 text-gray-800 shadow-2xs')
                        }`}>
                          <div className="flex items-center gap-2 min-w-0">
                            <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border ${
                              isFreeChallengeMode 
                                ? 'bg-[#FF5F2E]/20 border-[#FF5F2E]/40 text-[#FF5F2E]' 
                                : (isDark ? 'bg-zinc-800 border-zinc-700 text-gray-400' : 'bg-gray-100 border-gray-200 text-gray-500')
                            }`}>
                              {isFreeChallengeMode ? <Unlock className="w-3 h-3 text-[#FF5F2E]" /> : <Lock className="w-3 h-3" />}
                            </div>
                            <div className="flex items-center gap-1.5 truncate">
                              <span className={`text-[11px] font-bold truncate ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                                التحدي الحر
                              </span>
                              <span className={`text-[8px] font-bold px-1.5 py-0.2 rounded-md border shrink-0 ${
                                isFreeChallengeMode
                                  ? 'bg-[#FF5F2E]/15 border-[#FF5F2E]/30 text-[#FF5F2E]'
                                  : (isDark ? 'bg-zinc-800 border-zinc-700 text-gray-400' : 'bg-gray-100 border-gray-200 text-gray-500')
                              }`}>
                                {isFreeChallengeMode ? 'مفتوح 🔓' : 'مقيد 🔒'}
                              </span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={handleToggleFreeChallengeMode}
                            className={`w-8 h-4.5 rounded-full p-0.5 transition-all duration-300 focus:outline-hidden cursor-pointer shrink-0 ${
                              isFreeChallengeMode ? 'bg-[#FF5F2E]' : (isDark ? 'bg-zinc-800' : 'bg-gray-300 hover:bg-gray-400')
                            }`}
                            title="تفعيل التحدي الحر"
                          >
                            <div className={`w-3.5 h-3.5 rounded-full bg-white shadow-xs flex items-center justify-center transition-transform duration-300 ${
                              isFreeChallengeMode ? 'translate-x-0' : '-translate-x-3.5'
                            }`}>
                              {isFreeChallengeMode ? (
                                <Sparkles className="w-2 h-2 text-[#FF5F2E]" />
                              ) : (
                                <Lock className="w-2 h-2 text-gray-400" />
                              )}
                            </div>
                          </button>
                        </div>

                        {/* Status Banner when Free Challenge Mode is active */}
                        {(isFreeChallengeMode || savedNormalSeasonId) && (
                          <button
                            onClick={handleLockCurrentSeason}
                            className={`w-full py-2 px-3 rounded-xl border text-center text-[11px] font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                              isDark 
                                ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400 hover:bg-emerald-500/15' 
                                : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100/80 shadow-2xs'
                            }`}
                          >
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                            <span>تم فتح جميع المستويات</span>
                          </button>
                        )}

                        {/* 3. User Guide */}
                        <button
                          onClick={() => {
                            setIsTutorialModalOpen(true);
                          }}
                          className={`w-full py-2.5 px-3.5 rounded-xl text-right text-xs font-bold transition-all flex items-center justify-between cursor-pointer border ${
                            isDark 
                              ? 'bg-[#FF5F2E]/10 border-[#FF5F2E]/30 text-white hover:bg-[#FF5F2E]/20' 
                              : 'bg-orange-50 border-orange-200 text-[#FF5F2E] hover:bg-orange-100'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <HelpCircle className="w-4 h-4 text-[#FF5F2E]" />
                            <span>دليل الاستخدام</span>
                          </div>
                          <ChevronLeft className="w-4 h-4 text-[#FF5F2E]" />
                        </button>

                        {/* 4. Privacy Policy */}
                        <button
                          onClick={() => {
                            setLegalModalType('privacy');
                          }}
                          className={`w-full py-2.5 px-3.5 rounded-xl text-right text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                            isDark ? 'hover:bg-white/5 text-gray-200' : 'hover:bg-gray-50 text-gray-700'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-[#FF5F2E]" />
                            <span>سياسة الخصوصية</span>
                          </div>
                          <ChevronLeft className="w-4 h-4 text-gray-400" />
                        </button>

                        {/* 5. Terms of Use */}
                        <button
                          onClick={() => {
                            setLegalModalType('terms');
                          }}
                          className={`w-full py-2.5 px-3.5 rounded-xl text-right text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                            isDark ? 'hover:bg-white/5 text-gray-200' : 'hover:bg-gray-50 text-gray-700'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-[#FF5F2E]" />
                            <span>شروط الاستخدام</span>
                          </div>
                          <ChevronLeft className="w-4 h-4 text-gray-400" />
                        </button>

                        {/* 6. Medical Disclaimer */}
                        <button
                          onClick={() => {
                            setLegalModalType('disclaimer');
                          }}
                          className={`w-full py-2.5 px-3.5 rounded-xl text-right text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                            isDark ? 'hover:bg-white/5 text-gray-200' : 'hover:bg-gray-50 text-gray-700'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-amber-500" />
                            <span>إخلاء المسؤولية الطبية</span>
                          </div>
                          <ChevronLeft className="w-4 h-4 text-gray-400" />
                        </button>

                        {/* 7. Intellectual Property & Copyright */}
                        <button
                          onClick={() => {
                            setLegalModalType('copyright');
                          }}
                          className={`w-full py-2.5 px-3.5 rounded-xl text-right text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                            isDark ? 'hover:bg-white/5 text-gray-200' : 'hover:bg-gray-50 text-gray-700'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Copyright className="w-4 h-4 text-[#FF5F2E]" />
                            <span>حقوق الملكية الفكرية</span>
                          </div>
                          <ChevronLeft className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>

                    {/* Version & Bottom dismiss trigger */}
                    <div className={`p-5 pt-3 border-t shrink-0 space-y-3 ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
                      {/* Version Badge with Aesthetic Styling */}
                      <div className={`flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl border transition-all ${
                        isDark 
                          ? 'bg-gradient-to-r from-[#FF5F2E]/10 via-amber-500/5 to-emerald-500/10 border-white/5' 
                          : 'bg-gradient-to-r from-orange-50 via-amber-50 to-emerald-50 border-orange-100/80 shadow-xs'
                      }`}>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-xs shadow-emerald-500/50 shrink-0"></span>
                        <span className="font-mono font-bold text-xs tracking-wide text-[#FF5F2E]" dir="ltr">
                          Home Workouts - v1.0.0.
                        </span>
                      </div>

                      <button
                        onClick={() => setIsMenuOpen(false)}
                        className="w-full py-2.5 bg-[#FF5F2E] hover:bg-[#FF912E] text-white font-extrabold text-xs rounded-xl transition-all text-center cursor-pointer shadow-lg shadow-[#FF5F2E]/20 active:scale-[0.98]"
                      >
                        إغلاق القائمة
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* --- COMPLIANCE MODALS ENGINE --- */}
            <AnimatePresence>
              {complianceModal && (
                <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4 animate-fade-in" dir="rtl">
                  {/* Backdrop */}
                  <div className="absolute inset-0" onClick={(e) => { e.stopPropagation(); setComplianceModal(null); }}></div>

                  {/* Modal Container */}
                  <div 
                    onClick={(e) => e.stopPropagation()}
                    className={`w-full max-w-sm rounded-3xl border overflow-hidden relative z-10 p-6 space-y-4 ${
                    isDark ? 'bg-[#161618] border-white/5 text-white' : 'bg-white border-gray-100 text-gray-900 shadow-2xl'
                  }`}>
                    
                    {/* Header close */}
                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                      <h4 className="text-sm font-extrabold">
                        {complianceModal === 'privacy' && '🛡️ سياسة الخصوصية وشروط الاستخدام'}
                      </h4>
                      <button
                        onClick={() => {
                          setComplianceModal(null);
                        }}
                        className={`p-1.5 rounded-lg ${isDark ? 'bg-white/5 text-gray-400 hover:text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Modal Content: Privacy Policy */}
                    {complianceModal === 'privacy' && (
                      <div className="space-y-3 text-left max-h-[60vh] overflow-y-auto pr-1 text-[11px] leading-relaxed" dir="ltr">
                        <h3 className="text-sm font-bold text-[#FF5F2E]">Privacy Policy</h3>
                        <p className="text-[10px] text-gray-400 font-semibold">Effective Date: August 3, 2026</p>
                        
                        <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                          Thank you for using our application.
                        </p>
                        <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                          We respect your privacy and are committed to protecting your information. This Privacy Policy explains how information is collected, used, and protected when you use our application.
                        </p>

                        <div className="space-y-1 pt-1">
                          <h4 className="font-bold text-[#FF5F2E]">Information We Collect</h4>
                          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                            Our application does not require users to create an account or sign in. We do not directly collect or store personal information such as your name, email address, phone number, or password.
                          </p>
                        </div>

                        <div className="space-y-1 pt-1">
                          <h4 className="font-bold text-[#FF5F2E]">Local Data Storage</h4>
                          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                            The application may store certain user data and preferences locally on your device to improve your experience and retain your settings. This information remains on your device only and is not transmitted to our servers or shared with any third parties.
                          </p>
                          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                            We do not have access to this locally stored data unless you choose to share it with us.
                          </p>
                        </div>

                        <div className="space-y-1 pt-1">
                          <h4 className="font-bold text-[#FF5F2E]">Advertising</h4>
                          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                            Our application uses Google AdMob to display advertisements. AdMob may automatically collect certain information, including but not limited to:
                          </p>
                          <ul className={`list-disc pl-4 space-y-0.5 text-[10px] ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            <li>Advertising ID</li>
                            <li>Device information</li>
                            <li>IP address</li>
                            <li>App usage information</li>
                            <li>Approximate location (where permitted by your device settings)</li>
                          </ul>
                          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                            This information is collected and processed by Google in accordance with its own Privacy Policy.
                          </p>
                          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                            For more information, please visit:<br />
                            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-sky-400 underline">
                              https://policies.google.com/privacy
                            </a>
                          </p>
                        </div>

                        <div className="space-y-1 pt-1">
                          <h4 className="font-bold text-[#FF5F2E]">Data Security</h4>
                          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                            We do not directly collect, store, or process your personal information. Any information collected through Google AdMob is managed securely by Google according to its own privacy and security practices.
                          </p>
                        </div>

                        <div className="space-y-1 pt-1">
                          <h4 className="font-bold text-[#FF5F2E]">Children's Privacy</h4>
                          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                            Our application is not intended to knowingly collect personal information from children. If you believe that a child has provided personal information through the application, please contact us so that appropriate action can be taken.
                          </p>
                        </div>

                        <div className="space-y-1 pt-1">
                          <h4 className="font-bold text-[#FF5F2E]">Third-Party Services</h4>
                          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                            This application uses the following third-party service:
                          </p>
                          <ul className={`list-disc pl-4 text-[10px] ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            <li>Google AdMob</li>
                          </ul>
                          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                            These services have their own Privacy Policies governing the collection and processing of information.
                          </p>
                        </div>

                        <div className="space-y-1 pt-1">
                          <h4 className="font-bold text-[#FF5F2E]">Changes to This Privacy Policy</h4>
                          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated Effective Date.
                          </p>
                        </div>

                        <div className="space-y-1 pt-1">
                          <h4 className="font-bold text-[#FF5F2E]">Contact Us</h4>
                          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                            If you have any questions or concerns about this Privacy Policy, please contact us at:
                          </p>
                          <p className="font-mono text-[10px] text-[#FF5F2E]">
                            Email: husseinn428@gmail.com
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Modal Content: 3. Social Media App Sharing */}
                    {complianceModal === 'social' && (
                      <div className="space-y-4">
                        {/* Header Description with Official App Icon */}
                        <div className="p-3.5 rounded-2xl bg-[#FF5F2E]/10 border border-[#FF5F2E]/20 flex items-center gap-3">
                          <img
                            src={appIcon || '/app-icon.jpg'}
                            alt="أيقونة التطبيق"
                            className="w-14 h-14 rounded-2xl object-cover shadow-md shrink-0 border border-white/10"
                            referrerPolicy="no-referrer"
                          />
                          <div className="space-y-1 text-right">
                            <h4 className="text-xs font-black text-[#FF5F2E] flex items-center gap-1.5">
                              <span>{APP_CONFIG.appName}</span>
                            </h4>
                            <p className={`text-[10px] leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                              شارك التطبيق مع عائلتك وأصدقائك للتشجيع على ممارسة الرياضة والحياة الصحية السليمة!
                            </p>
                          </div>
                        </div>

                        {/* Social Buttons List (WhatsApp, Telegram, Facebook, X) */}
                        <div className="space-y-2.5 pt-1">
                          {/* Share via WhatsApp */}
                          <button
                            onClick={() => executeSocialShare('whatsapp')}
                            className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-black rounded-2xl text-xs transition-all flex items-center justify-between cursor-pointer shadow-sm active:scale-98"
                          >
                            <div className="flex items-center gap-2.5">
                              <MessageCircle className="w-4 h-4 fill-current" />
                              <span>مشاركة عبر الواتساب (WhatsApp)</span>
                            </div>
                            <ChevronLeft className="w-4 h-4 opacity-70" />
                          </button>

                          {/* Share via Telegram */}
                          <button
                            onClick={() => executeSocialShare('telegram')}
                            className="w-full py-3.5 px-4 bg-[#229ED9] hover:bg-[#1f8ec3] text-white font-black rounded-2xl text-xs transition-all flex items-center justify-between cursor-pointer shadow-sm active:scale-98"
                          >
                            <div className="flex items-center gap-2.5">
                              <Send className="w-4 h-4 fill-current translate-x-0.5" />
                              <span>مشاركة عبر التلغرام (Telegram)</span>
                            </div>
                            <ChevronLeft className="w-4 h-4 opacity-70" />
                          </button>

                          {/* Share via Facebook */}
                          <button
                            onClick={() => executeSocialShare('facebook')}
                            className="w-full py-3.5 px-4 bg-[#1877F2] hover:bg-[#166fe2] text-white font-black rounded-2xl text-xs transition-all flex items-center justify-between cursor-pointer shadow-sm active:scale-98"
                          >
                            <div className="flex items-center gap-2.5">
                              <Instagram className="w-4 h-4" />
                              <span>مشاركة عبر فيسبوك (Facebook)</span>
                            </div>
                            <ChevronLeft className="w-4 h-4 opacity-70" />
                          </button>

                          {/* Share via Twitter / X */}
                          <button
                            onClick={() => executeSocialShare('twitter')}
                            className="w-full py-3.5 px-4 bg-zinc-900 hover:bg-black border border-white/10 text-white font-black rounded-2xl text-xs transition-all flex items-center justify-between cursor-pointer shadow-sm active:scale-98"
                          >
                            <div className="flex items-center gap-2.5">
                              <Share2 className="w-4 h-4" />
                              <span>مشاركة عبر منصة إكس (Twitter/X)</span>
                            </div>
                            <ChevronLeft className="w-4 h-4 opacity-70" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </AnimatePresence>

            {/* Modular Legal Modal for Privacy, Terms, Disclaimer, Copyright */}
            <LegalModal
              type={legalModalType}
              isOpen={!!legalModalType}
              onClose={() => setLegalModalType(null)}
              isDark={isDark}
            />

            {/* Bottom Smartphone Navigation Bar (Fixed Bottom & Sticky layout as requested) */}
            <div className={`border-t flex flex-col shrink-0 z-30 transition-all ${headerBgClass}`}>
              <div className="px-2 py-2 flex justify-around items-center w-full">
                {/* Workouts tab button */}
                <button
                  onClick={() => handleTabChange('workout')}
                  className={`flex flex-col items-center gap-1 p-1 transition-all cursor-pointer ${
                    currentTab === 'workout' ? 'text-[#FF5F2E] font-extrabold' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Dumbbell className={`w-4.5 h-4.5 transition-transform ${currentTab === 'workout' ? 'scale-110 text-[#FF5F2E]' : 'scale-100'}`} />
                  <span className="text-[8px] font-bold">التمارين</span>
                </button>

                {/* Seasons tab button */}
                <button
                  onClick={() => handleTabChange('seasons')}
                  className={`flex flex-col items-center gap-1 p-1 transition-all cursor-pointer ${
                    currentTab === 'seasons' ? 'text-[#FF5F2E] font-extrabold' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Trophy className={`w-4.5 h-4.5 transition-transform ${currentTab === 'seasons' ? 'scale-110 text-[#FF5F2E]' : 'scale-100'}`} />
                  <span className="text-[8px] font-bold">المستويات</span>
                </button>

                {/* Achievements tab button */}
                <button
                  onClick={() => handleTabChange('achievements')}
                  className={`flex flex-col items-center gap-1 p-1 transition-all cursor-pointer ${
                    currentTab === 'achievements' ? 'text-[#FF5F2E] font-extrabold' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Award className={`w-4.5 h-4.5 transition-transform ${currentTab === 'achievements' ? 'scale-110 text-[#FF5F2E]' : 'scale-100'}`} />
                  <span className="text-[8px] font-bold">إنجازاتي</span>
                </button>

                {/* Nutrition tab button - professionally highlighted to grab attention */}
                <button
                  onClick={() => handleTabChange('nutrition')}
                  className={`flex flex-col items-center gap-1 p-1 relative transition-all cursor-pointer rounded-xl px-2.5 py-1 ${
                    currentTab === 'nutrition' 
                      ? 'bg-[#FF5F2E]/15 text-[#FF5F2E] font-black shadow-xs shadow-[#FF5F2E]/20 border border-[#FF5F2E]/30' 
                      : 'text-gray-400 hover:text-white bg-amber-500/5 hover:bg-amber-500/10 border border-dashed border-amber-500/20'
                  }`}
                >
                  {/* Small animated badge on top of the icon */}
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <Apple className={`w-4.5 h-4.5 transition-transform ${currentTab === 'nutrition' ? 'scale-115 text-[#FF5F2E] rotate-6' : 'scale-100 text-amber-500 animate-pulse'}`} />
                  <span className="text-[8px] font-black">التغذية 🍏</span>
                </button>
   
                {/* Calculator Tab */}
                <button
                  onClick={() => handleTabChange('calculator')}
                  className={`flex flex-col items-center gap-1 p-1 transition-all cursor-pointer ${
                    currentTab === 'calculator' ? 'text-[#FF5F2E] font-extrabold' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Calculator className={`w-4.5 h-4.5 transition-transform ${currentTab === 'calculator' ? 'scale-110 text-[#FF5F2E]' : 'scale-100'}`} />
                  <span className="text-[8px] font-bold">الحاسبة</span>
                </button>

                {/* Journal Tab */}
                <button
                  onClick={() => handleTabChange('journal')}
                  className={`flex flex-col items-center gap-1 p-1 transition-all cursor-pointer ${
                    currentTab === 'journal' ? 'text-[#FF5F2E] font-extrabold' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <CalendarDays className={`w-4.5 h-4.5 transition-transform ${currentTab === 'journal' ? 'scale-110 text-[#FF5F2E]' : 'scale-100'}`} />
                  <span className="text-[8px] font-bold">اليوميات</span>
                </button>

                {/* Videos Tab */}
                <button
                  onClick={() => handleTabChange('encyclopedia')}
                  className={`flex flex-col items-center gap-1 p-1 transition-all cursor-pointer ${
                    currentTab === 'encyclopedia' ? 'text-[#FF5F2E] font-extrabold' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Video className={`w-4.5 h-4.5 transition-transform ${currentTab === 'encyclopedia' ? 'scale-110 text-[#FF5F2E]' : 'scale-100'}`} />
                  <span className="text-[8px] font-bold">الفيديوهات</span>
                </button>
              </div>
            </div>

            {/* Success Celebration Modal for Season Completion */}
            {celebrationSeasonName && (
              <SuccessCelebration
                seasonName={celebrationSeasonName}
                userName={userStats.userName}
                isDark={isDark}
                onNextSeason={() => {
                  const currentIndex = seasonsList.findIndex(s => s.id === currentSeasonId);
                  const nextSeason = seasonsList[currentIndex + 1];
                  if (nextSeason) {
                    setCurrentSeasonId(nextSeason.id);
                    localStorage.setItem('rashaka_current_season_id', nextSeason.id);
                  }
                  setCelebrationSeasonName(null);
                  setActivePlayingDay(null);
                  setSelectedDayPreview(null);
                  window.location.href = window.location.pathname + "?tab=workout";
                }}
              />
            )}

            {/* Reset Progress Confirmation Modal */}
            <ConfirmModal
              isOpen={isResetConfirmOpen}
              onClose={() => setIsResetConfirmOpen(false)}
              onConfirm={executeResetProgress}
              title="إعادة ضبط رحلتك الرياضية"
              message="هل أنت متأكد تماماً من رغبتك في مسح كافة البيانات وإعادة ضبط جميع التقدم المحرز، واليوميات، والمستويات المنجزة للبدء من جديد تماماً؟ هذا الإجراء لا يمكن التراجع عنه."
              confirmText="نعم، أعد الضبط بالكامل"
              cancelText="إلغاء"
              type="danger"
              isDark={isDark}
            />

            {/* Save Stats / Reset Plan Confirmation Modal */}
            <ConfirmModal
              isOpen={isCalcConfirmOpen}
              onClose={() => setIsCalcConfirmOpen(false)}
              onConfirm={executeSaveCalcStats}
              title="تحديث البيانات وإعادة الجدولة"
              message="تنبيه: تحديث قياساتك الشخصية وهدفك الرياضي سيتطلب إعادة تهيئة خطة الـ 30 يوماً الذكية، مما يعني عودتك إلى خطوات الإعداد الأولى (لتحديث الاسم، الأفاتار، والمدرب الصوتي). هل ترغب في المتابعة وتحديث خطتك اليومية الآن؟"
              confirmText="نعم، أرغب في المتابعة"
              cancelText="إغلاق"
              type="warning"
              isDark={isDark}
            />

            {/* Season Activation Confirmation Modal */}
            <ConfirmModal
              isOpen={seasonConfirmModalOpen}
              onClose={() => setSeasonConfirmModalOpen(false)}
              onConfirm={() => {
                if (selectedSeasonIdToActivate) {
                  setCurrentSeasonId(selectedSeasonIdToActivate);
                  localStorage.setItem('rashaka_current_season_id', selectedSeasonIdToActivate);
                  window.location.href = window.location.pathname + "?tab=workout";
                }
              }}
              title="تفعيل المستوى الجديد"
              message={`🔓 وضع التحدي الحر: لقد اخترت الانتقال إلى (${selectedSeasonNameToActivate})!

سيتم الآن تفعيل هذا المستوى بشكل كامل، بينما يتم قفل المستويات الأخرى للحفاظ على تركيزك الرياضي الحالي.

سيبدأ التحدي من اليوم الأول النشط في هذا المستوى. إذا قررت العودة إلى مستواك السابق لاحقاً، ستجد تقدمك محفوظاً بالكامل وستتمكن من اللعب من مكان ما وقفت بالضبط! 👍`}
              confirmText="موافق"
              cancelText="إلغاء"
              type="warning"
              isDark={isDark}
            />

            {/* Comprehensive App Tutorial / Guide Modal */}
            {isTutorialModalOpen && (
              <TutorialGuideModal
                isOpen={isTutorialModalOpen}
                onClose={() => setIsTutorialModalOpen(false)}
                isDark={isDark}
              />
            )}

          </>
        )}

      </div>
    </div>
  );
}
