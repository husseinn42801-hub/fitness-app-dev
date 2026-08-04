import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Trophy, Medal, Flame, Clock, Zap, Share2, Eye, X, Calendar, Star, ShieldCheck, User, Edit3, TrendingUp, BarChart4, Milestone, Sparkles, CheckCircle2, Target } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend, Cell } from 'recharts';
import { SeasonCertificate, DailyLog, UserStats } from '../types';
import { SEASONS_DB } from '../data/seasons';
import { generateWorkoutDaysForUser } from '../data/workoutDays';

interface AchievementsPageProps {
  completedDaysBySeason: Record<string, number[]>;
  certificates: SeasonCertificate[];
  dailyLogs: Record<string, DailyLog>;
  isDark: boolean;
  userStats: UserStats;
  onUpdateProfile: (name: string, avatar: string) => void;
  seasonsList?: any[];
  currentSeasonId?: string;
  onSelectSeason?: (seasonId: string) => void;
}

export const AchievementsPage: React.FC<AchievementsPageProps> = ({
  completedDaysBySeason,
  certificates,
  dailyLogs,
  isDark,
  userStats,
  onUpdateProfile,
  seasonsList = SEASONS_DB,
  currentSeasonId,
  onSelectSeason
}) => {
  const [selectedCert, setSelectedCert] = useState<SeasonCertificate | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(userStats.userName || '');
  const [editAvatar, setEditAvatar] = useState(userStats.userAvatar || '🏋️‍♂️');

  const avatarsList = {
    male: [
      { id: 'm1', emoji: '🏋️‍♂️' },
      { id: 'm2', emoji: '🏃‍♂️' },
      { id: 'm3', emoji: '🚴‍♂️' },
      { id: 'm4', emoji: '🥊' },
      { id: 'm5', emoji: '🏊‍♂️' },
      { id: 'm6', emoji: '🧘‍♂️' }
    ],
    female: [
      { id: 'f1', emoji: '🏋️‍♀️' },
      { id: 'f2', emoji: '🏃‍♀️' },
      { id: 'f3', emoji: '🚴‍♀️' },
      { id: 'f4', emoji: '🥊' },
      { id: 'f5', emoji: '🏊‍♀️' },
      { id: 'f6', emoji: '🧘‍♀️' }
    ]
  };

  const openEditModal = () => {
    setEditName(userStats.userName || '');
    setEditAvatar(userStats.userAvatar || '🏋️‍♂️');
    setIsEditingProfile(true);
  };

  const handleSaveProfile = () => {
    if (!editName.trim()) return;
    onUpdateProfile(editName.trim(), editAvatar);
    setIsEditingProfile(false);
  };

  // Calculate aggregated stats from daily logs
  const totalCompletedDaysCount = Object.keys(completedDaysBySeason).reduce(
    (acc, key) => acc + (completedDaysBySeason[key] || []).length,
    0
  );

  const completedSeasonsCount = seasonsList.filter(
    (s) => (completedDaysBySeason[s.id] || []).length === 30
  ).length;

  const logsArray = Object.keys(dailyLogs).map(key => dailyLogs[key]);

  const totalExercisesCount = logsArray.reduce(
    (acc, log) => acc + (log.completedExercisesCount || 0),
    0
  );

  const totalWorkoutTime = logsArray.reduce(
    (acc, log) => acc + Math.round((log.completedExercisesCount || 0) * 2.5),
    0
  );

  const totalCaloriesBurned = logsArray.reduce(
    (acc, log) => acc + (log.caloriesBurned || 0),
    0
  );

  // Extract real weight data from daily logs
  const weightData = Object.keys(dailyLogs)
    .map((dateStr) => ({
      date: dateStr,
      weight: dailyLogs[dateStr].weightLogged,
    }))
    .filter((item) => item.weight !== undefined && item.weight > 0)
    .sort((a, b) => a.date.localeCompare(b.date));

  // Fallback to avoid empty graph when user hasn't logged weight yet
  const chartData = [...weightData];
  const isDemoData = weightData.length < 2;

  if (isDemoData) {
    const baseWeight = userStats.weight || 70;
    const today = new Date();
    chartData.length = 0; // clear
    for (let i = 4; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const simulatedWeight = baseWeight + (i * 0.3) - 0.5;
      chartData.push({
        date: dateStr,
        weight: parseFloat(simulatedWeight.toFixed(1)),
      });
    }
  }

  const formatXAxisDate = (dateStr: string) => {
    try {
      const dateObj = new Date(dateStr);
      return dateObj.toLocaleDateString('ar-EG', { month: 'short', day: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  // Calculate Best Commitment Streak from logs
  const calculateStreak = (): number => {
    const dates = Object.keys(dailyLogs)
      .filter((k) => (dailyLogs[k].completedDays || []).length > 0)
      .map((k) => new Date(k))
      .sort((a, b) => a.getTime() - b.getTime());

    if (dates.length === 0) return 0;

    let maxStreak = 0;
    let currentStreak = 0;
    let prevDate: Date | null = null;

    for (const currentDate of dates) {
      if (!prevDate) {
        currentStreak = 1;
      } else {
        const diffTime = Math.abs(currentDate.getTime() - prevDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          currentStreak++;
        } else if (diffDays > 1) {
          if (currentStreak > maxStreak) {
            maxStreak = currentStreak;
          }
          currentStreak = 1;
        }
      }
      prevDate = currentDate;
    }

    return Math.max(maxStreak, currentStreak);
  };

  const bestStreak = calculateStreak();

  // Calculate burned and target calories for each season
  const seasonCaloriesData = useMemo(() => {
    return (seasonsList || []).map((season) => {
      const stats = userStats || { weight: 70, height: 168, age: 26, gender: 'أنثى', activityLevel: 1.375, goal: 'loss' };
      const days = generateWorkoutDaysForUser(stats, season.id);
      const completedDays = completedDaysBySeason[season.id] || [];
      
      const actualCalories = days.reduce((sum, day) => {
        if (completedDays.includes(day.dayNumber)) {
          return sum + (day.caloriesEstimate || 0);
        }
        return sum;
      }, 0);

      const targetCalories = days.reduce((sum, day) => sum + (day.caloriesEstimate || 0), 0);

      return {
        name: season.nameAr,
        shortName: season.nameAr.length > 12 ? season.nameAr.substring(0, 12) + '...' : season.nameAr,
        'السعرات المحروقة الفعلية': Math.round(actualCalories),
        'إجمالي السعرات المستهدفة': Math.round(targetCalories),
      };
    });
  }, [seasonsList, completedDaysBySeason, userStats]);

  const activeLevelInfo = useMemo(() => {
    let currentSeason = (seasonsList || []).find((s) => s.id === currentSeasonId);

    if (!currentSeason) {
      currentSeason = (seasonsList || []).find((s) => {
        const days = completedDaysBySeason[s.id] || [];
        return days.length < 30;
      });
    }

    if (!currentSeason) {
      currentSeason = (seasonsList || [])[0] || SEASONS_DB[0];
    }

    const completedDays = (completedDaysBySeason[currentSeason.id] || []).length;
    const remainingDays = Math.max(0, 30 - completedDays);
    const progressPercent = Math.min(100, Math.round((completedDays / 30) * 100));
    const isCompleted = completedDays >= 30;

    return {
      season: currentSeason,
      completedDays,
      remainingDays,
      progressPercent,
      isCompleted,
    };
  }, [seasonsList, completedDaysBySeason, currentSeasonId]);

  const statCardClass = isDark 
    ? 'bg-[#1E1E22] border-white/5 text-white' 
    : 'bg-white border-gray-200 text-gray-900 shadow-xs';

  const emptyClass = isDark
    ? 'bg-[#1C1C1E]/60 text-gray-500'
    : 'bg-gray-50 text-gray-400 border-gray-100';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="space-y-6 pb-20"
      dir="rtl"
    >
      {/* 1. Profile Card Block */}
      <div className={`p-5 rounded-3xl border flex items-center justify-between shadow-xs ${statCardClass}`}>
        <div className="flex items-center gap-4">
          {/* Glowing Sport Avatar Badge */}
          <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FF5F2E] to-[#FF912E] flex items-center justify-center text-3xl shadow-md shadow-[#FF5F2E]/20">
            <span className="relative z-10">{userStats.userAvatar || '🏋️‍♂️'}</span>
            <div className="absolute -bottom-0.5 -right-0.5 bg-emerald-500 w-3.5 h-3.5 rounded-full border-2 border-[#121212] flex items-center justify-center animate-pulse" title="نشط">
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
          </div>

          {/* User Name & Details */}
          <div className="space-y-1 text-right">
            <h3 className={`text-base font-black tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {userStats.userName || 'بطل رشاقة'}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-[9px] bg-[#FF5F2E]/10 text-[#FF5F2E] font-bold px-2 py-0.5 rounded-md">
                {userStats.gender === 'ذكر' ? 'بطل رياضي ⚡' : 'بطلة رياضية ✨'}
              </span>
              <span className="text-[9px] bg-white/5 text-gray-400 font-medium px-2 py-0.5 rounded-md">
                الوزن: {userStats.weight || 70} كجم
              </span>
            </div>
          </div>
        </div>

        {/* Edit Profile Button */}
        <button
          onClick={openEditModal}
          className="p-2.5 rounded-2xl bg-[#FF5F2E]/10 text-[#FF5F2E] hover:bg-[#FF5F2E]/15 hover:scale-102 active:scale-98 transition-all cursor-pointer flex items-center gap-1.5 border border-[#FF5F2E]/15"
          title="تعديل الملف الشخصي"
        >
          <Edit3 className="w-4 h-4" />
          <span className="text-[10px] font-black hidden sm:inline">تعديل</span>
        </button>
      </div>

      {/* 2. Edit Profile Modal (AnimatePresence) */}
      <AnimatePresence>
        {isEditingProfile && (
          <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4" dir="rtl">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`w-full max-w-sm rounded-[32px] p-6 space-y-5 border shadow-2xl relative ${
                isDark ? 'bg-[#18181B] border-white/10 text-white' : 'bg-white border-gray-200 text-gray-900'
              }`}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsEditingProfile(false)}
                className={`absolute left-4 top-4 p-2 rounded-full transition-all cursor-pointer ${
                  isDark ? 'bg-[#222225] text-gray-400 hover:text-white' : 'bg-gray-100 text-gray-500 hover:text-gray-900'
                }`}
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center space-y-1 pt-2">
                <h3 className={`text-base font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>تعديل الملف الشخصي</h3>
                <p className="text-xs text-gray-400">قم بتحديث اسمك أو الأفاتار الرياضي الخاص بك</p>
              </div>

              {/* Name input */}
              <div className="space-y-1.5 text-right">
                <label className="text-xs font-bold text-gray-400 block">الاسم</label>
                <div className="relative">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="أدخل اسمك..."
                    maxLength={15}
                    className={`w-full p-3.5 pr-10 rounded-2xl border text-sm focus:border-[#FF5F2E] focus:outline-none transition-all text-right ${
                      isDark ? 'bg-[#1A1A1E] border-white/5 text-white animate-fade-in' : 'bg-gray-50 border-gray-200 text-gray-900'
                    }`}
                  />
                  <User className="w-4 h-4 text-gray-500 absolute top-4 right-3.5" />
                </div>
              </div>

              {/* Avatar Selector */}
              <div className="space-y-3 pt-1 text-right">
                <label className="text-xs font-bold text-gray-400 block">اختر أفاتار جديد</label>
                
                {/* Male Avatars */}
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-500 font-bold block">أفاتارات للذكور:</span>
                  <div className="grid grid-cols-6 gap-2">
                    {avatarsList.male.map((av) => (
                      <button
                        key={av.id}
                        type="button"
                        onClick={() => setEditAvatar(av.emoji)}
                        className={`aspect-square rounded-xl flex items-center justify-center text-xl transition-all cursor-pointer ${
                          editAvatar === av.emoji
                            ? 'bg-[#FF5F2E] text-white ring-3 ring-[#FF5F2E]/30 scale-105'
                            : 'bg-white/5 border border-white/5'
                        }`}
                      >
                        {av.emoji}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Female Avatars */}
                <div className="space-y-1 pt-1">
                  <span className="text-[10px] text-gray-500 font-bold block">أفاتارات للإناث:</span>
                  <div className="grid grid-cols-6 gap-2">
                    {avatarsList.female.map((av) => (
                      <button
                        key={av.id}
                        type="button"
                        onClick={() => setEditAvatar(av.emoji)}
                        className={`aspect-square rounded-xl flex items-center justify-center text-xl transition-all cursor-pointer ${
                          editAvatar === av.emoji
                            ? 'bg-[#FF5F2E] text-white ring-3 ring-[#FF5F2E]/30 scale-105'
                            : 'bg-white/5 border border-white/5'
                        }`}
                      >
                        {av.emoji}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSaveProfile}
                disabled={!editName.trim()}
                className={`w-full py-3.5 bg-gradient-to-r from-[#FF5F2E] to-[#FF912E] hover:opacity-90 active:scale-98 text-white font-extrabold rounded-2xl text-xs transition-all shadow-md shadow-[#FF5F2E]/20 cursor-pointer flex items-center justify-center gap-2 ${
                  !editName.trim() ? 'opacity-40 cursor-not-allowed' : ''
                }`}
              >
                <span>حفظ التغييرات</span>
                <ShieldCheck className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. Level Completion & Progress Celebration Banner */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="relative overflow-hidden rounded-[32px] p-6 border bg-gradient-to-br from-[#1C1A27] via-[#12111A] to-[#0A0910] text-white shadow-xl shadow-purple-950/20 border-purple-500/20"
      >
        {/* Glowing Background Orbs */}
        <div className="absolute -top-12 -left-12 w-36 h-36 bg-[#FF5F2E]/20 rounded-full blur-2xl pointer-events-none animate-pulse"></div>
        <div className="absolute -bottom-12 -right-12 w-44 h-44 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-4">
          {/* Top Banner Badge */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-black shadow-md shadow-amber-500/20">
                <Trophy className="w-4 h-4 fill-current" />
              </span>
              <div>
                <span className="text-[10px] text-amber-400 font-extrabold uppercase tracking-wider block">
                  تقدم المستوى الحالي
                </span>
                <h3 className="text-sm font-black text-white">
                  {activeLevelInfo.season.nameAr}
                </h3>
              </div>
            </div>

            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="p-2 rounded-2xl bg-white/5 border border-white/10 text-amber-300 text-xs font-mono font-bold flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{activeLevelInfo.progressPercent}%</span>
            </motion.div>
          </div>

          {/* Animated Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[10px] font-bold">
              <span className="text-gray-300 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                أنجزت {activeLevelInfo.completedDays} من 30 يوماً
              </span>
              <span className="text-amber-400 font-mono">
                {activeLevelInfo.remainingDays > 0
                  ? `متبقي ${activeLevelInfo.remainingDays} يوماً`
                  : 'مكتمل بنجاح! 🎉'}
              </span>
            </div>

            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/10 relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${activeLevelInfo.progressPercent}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full rounded-full bg-gradient-to-r from-amber-500 via-[#FF5F2E] to-purple-500 shadow-sm relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </motion.div>
            </div>
          </div>

          {/* Congratulatory & Encouraging Message Box */}
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
            <div className="text-2xl shrink-0 mt-0.5">
              {activeLevelInfo.isCompleted ? '👑' : '🎉'}
            </div>
            <div className="space-y-1 text-right">
              <p className="text-xs font-extrabold text-white leading-relaxed">
                {activeLevelInfo.isCompleted
                  ? `مبارك الإنجاز الذهبي! لقد أكملت 30 يوماً متتالياً بنجاح في ${activeLevelInfo.season.nameAr}! 🏆`
                  : `أحسنت صنعاً يا بطل! تم إنهاء ${activeLevelInfo.completedDays} يوماً بنجاح.`}
              </p>
              <p className="text-[10px] text-gray-300 leading-relaxed font-medium">
                {activeLevelInfo.isCompleted
                  ? 'تم فتح شهادة التقدير الرسمية ويمكنك رؤيتها الآن والانتقال للمستوى التالي بحماس واقتدار!'
                  : `متبقي لك فقط ${activeLevelInfo.remainingDays} يوماً للوصول للمستوى التالي وتوثيق إنجازك بقلادة الفوز الذهبية 🚀`}
              </p>
            </div>
          </div>

          {activeLevelInfo.isCompleted && (
            <div className="pt-2">
              <button
                onClick={() => {
                  const currentIndex = seasonsList.findIndex(s => s.id === activeLevelInfo.season.id);
                  const nextSeason = seasonsList[currentIndex + 1];
                  if (nextSeason && onSelectSeason) {
                    onSelectSeason(nextSeason.id);
                  }
                }}
                className="w-full py-3 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-500 hover:brightness-105 active:scale-98 text-black font-black rounded-2xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                <span>الانتقال للمستوى التالي 🚀</span>
              </button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Header */}
      <div className="space-y-1.5">
        <span className="text-[10px] bg-amber-500 text-black font-extrabold px-2.5 py-0.5 rounded-full uppercase">
          معرض إنجازاتي وأوسمتي الرياضية
        </span>
        <h2 className={`text-base font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>أرقامك وميدالياتك الذهبية</h2>
        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          تتبع إنجازاتك، وشاهد الميداليات وشهادات التقدير الاحترافية التي حصدتها بكفاءتك ومثابرتك البطلة!
        </p>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-2 gap-3.5">
        <div className={`p-4 rounded-2xl border flex flex-col justify-between ${statCardClass}`}>
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-gray-400 font-bold">المستويات المكتملة</span>
            <span className="text-xl">🏆</span>
          </div>
          <span className="text-2xl font-black font-mono text-[#FF5F2E] mt-2">{completedSeasonsCount}</span>
        </div>

        <div className={`p-4 rounded-2xl border flex flex-col justify-between ${statCardClass}`}>
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-gray-400 font-bold">إجمالي الأيام المكتملة</span>
            <span className="text-xl">📅</span>
          </div>
          <span className="text-2xl font-black font-mono text-emerald-500 mt-2">{totalCompletedDaysCount}</span>
        </div>

        <div className={`p-4 rounded-2xl border flex flex-col justify-between ${statCardClass}`}>
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-gray-400 font-bold">إجمالي التمارين</span>
            <span className="text-xl">🏋️</span>
          </div>
          <span className="text-2xl font-black font-mono text-sky-400 mt-2">{totalExercisesCount}</span>
        </div>

        <div className={`p-4 rounded-2xl border flex flex-col justify-between ${statCardClass}`}>
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-gray-400 font-bold">وقت التدريب التقريبي</span>
            <span className="text-xl">⏱️</span>
          </div>
          <span className="text-2xl font-black font-mono text-indigo-400 mt-2">{totalWorkoutTime} <span className="text-[10px] font-bold">د</span></span>
        </div>

        <div className={`p-4 rounded-2xl border flex flex-col justify-between ${statCardClass}`}>
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-gray-400 font-bold">السعرات المحروقة</span>
            <span className="text-xl">🔥</span>
          </div>
          <span className="text-2xl font-black font-mono text-amber-500 mt-2">{~~totalCaloriesBurned} <span className="text-[10px] font-bold">سعرة</span></span>
        </div>

        <div className={`p-4 rounded-2xl border flex flex-col justify-between ${statCardClass}`}>
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-gray-400 font-bold">أفضل سلسلة التزام</span>
            <span className="text-xl">⚡</span>
          </div>
          <span className="text-2xl font-black font-mono text-rose-500 mt-2">{bestStreak} <span className="text-[10px] font-bold">يوم</span></span>
        </div>
      </div>

      {/* Seasonal Calories Burned Bar Chart */}
      <div className={`p-5 rounded-3xl border space-y-4 ${statCardClass}`}>
        <div className="flex justify-between items-center">
          <h3 className={`font-extrabold text-sm flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <BarChart4 className="w-4.5 h-4.5 text-[#FF5F2E]" />
            <span>تحليل حرق السعرات الحرارية لكل مستوى</span>
          </h3>
        </div>
        <p className="text-[10px] text-gray-400 leading-relaxed">
          يوضح هذا الرسم البياني مقارنة بين السعرات الحرارية المحروقة الفعلية والسعرات الإجمالية المستهدفة لكل من المستويات المخصصة لهدفك الرياضي الحالي.
        </p>

        <div className="h-60 w-full pt-2 font-mono text-xs" dir="ltr">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={seasonCaloriesData}
              margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} vertical={false} />
              <XAxis 
                dataKey="shortName" 
                tick={{ fill: isDark ? '#888' : '#666', fontSize: 9 }}
                stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}
              />
              <YAxis 
                tick={{ fill: isDark ? '#888' : '#666', fontSize: 9 }}
                stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: isDark ? '#1F1F23' : '#FFFFFF', 
                  borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                  borderRadius: '16px',
                  color: isDark ? '#FFFFFF' : '#111111',
                  direction: 'rtl',
                  textAlign: 'right'
                }}
                formatter={(value, name) => [value, name]}
              />
              <Legend 
                wrapperStyle={{ direction: 'rtl', pt: 10 }} 
                iconSize={10} 
                iconType="circle"
              />
              <Bar 
                dataKey="السعرات المحروقة الفعلية" 
                fill="#FF5F2E" 
                radius={[4, 4, 0, 0]} 
              />
              <Bar 
                dataKey="إجمالي السعرات المستهدفة" 
                fill={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.15)"} 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Medals Showcase */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className={`font-extrabold text-sm flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <Medal className="w-4.5 h-4.5 text-[#FF5F2E]" />
            <span>نظام الأوسمة والميداليات لمستويات التدريب</span>
          </h3>
          <span className="text-[10px] bg-[#FF5F2E]/10 text-[#FF5F2E] font-black px-2.5 py-0.5 rounded-full">
            أوسمتي الرياضية
          </span>
        </div>
        
        <p className="text-[10px] text-gray-400 leading-relaxed">
          تحصل على ميدالية افتراضية فريدة ومستقلة عند إتمام 30 يوماً من التدريب لكل مستوى (المستوى 1، 2، 3، 4) لتسجيل إنجازك الأسطوري وتطوير لياقتك!
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {seasonsList.map((season, idx) => {
            const completedCount = (completedDaysBySeason[season.id] || []).length;
            const isCompleted = completedCount >= 30;
            const progressPercentage = Math.min(100, Math.round((completedCount / 30) * 100));

            // Custom assets for each level
            const levelInfo = [
              { label: 'المستوى 1', medal: '🥉', title: 'الميدالية البرونزية', color: 'text-amber-600', glow: 'bg-amber-600/20' },
              { label: 'المستوى 2', medal: '🥈', title: 'الميدالية الفضية', color: 'text-slate-400', glow: 'bg-slate-400/20' },
              { label: 'المستوى 3', medal: '🥇', title: 'الميدالية الذهبية', color: 'text-yellow-400', glow: 'bg-yellow-400/20' },
              { label: 'المستوى 4', medal: '🏆', title: 'كأس التاج الأسطوري', color: 'text-emerald-400', glow: 'bg-emerald-400/20' }
            ][idx] || { label: `مستوى ${idx + 1}`, medal: '🏅', title: 'وسام التميز', color: 'text-[#FF5F2E]', glow: 'bg-[#FF5F2E]/20' };

            return (
              <motion.div
                key={season.id}
                whileHover={isCompleted ? { scale: 1.04, y: -2 } : { scale: 1.01 }}
                className={`relative p-3.5 rounded-2xl border transition-all ${statCardClass} flex flex-col items-center text-center justify-between min-h-[160px] ${
                  isCompleted 
                    ? 'border-amber-500/30 shadow-md shadow-amber-500/5' 
                    : 'opacity-85 border-white/5'
                }`}
              >
                {/* Level Tag */}
                <div className="w-full flex justify-between items-center mb-1">
                  <span className="text-[8px] font-black text-gray-400 uppercase tracking-wider">
                    {levelInfo.label}
                  </span>
                  {isCompleted ? (
                    <span className="text-[8px] bg-emerald-500/10 text-emerald-500 font-extrabold px-1.5 py-0.5 rounded-md">
                      تم الفوز ✨
                    </span>
                  ) : (
                    <span className="text-[8px] bg-gray-500/10 text-gray-400 font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                      🔒 قيد التقدم
                    </span>
                  )}
                </div>

                {/* Medal Icon & Animation */}
                <div className="relative my-2 flex items-center justify-center">
                  {isCompleted ? (
                    <div className="relative">
                      <span className="text-5xl block animate-bounce" style={{ animationDuration: '3s' }}>
                        {levelInfo.medal}
                      </span>
                      <div className={`absolute inset-0 ${levelInfo.glow} rounded-full blur-md animate-pulse`}></div>
                    </div>
                  ) : (
                    <div className="relative grayscale opacity-40">
                      <span className="text-5xl block">
                        {levelInfo.medal}
                      </span>
                      <span className="absolute -bottom-1 -right-1 text-[9px] bg-[#121212]/90 p-0.5 rounded-full border border-white/10">
                        🔒
                      </span>
                    </div>
                  )}
                </div>

                {/* Title & Stats */}
                <div className="w-full space-y-1.5 mt-2">
                  <span className={`text-[10px] font-black block tracking-tight ${isCompleted ? 'text-amber-500 font-bold' : 'text-gray-400'}`}>
                    {levelInfo.title}
                  </span>
                  <p className={`text-[9px] font-medium leading-tight truncate w-full ${isDark ? 'text-gray-300' : 'text-gray-600'}`} title={season.nameAr}>
                    {season.nameAr}
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="w-full space-y-1 pt-1">
                    <div className="flex justify-between items-center text-[8px] font-mono font-bold">
                      <span className={isCompleted ? 'text-emerald-500' : 'text-gray-400'}>
                        {completedCount}/30 يوم
                      </span>
                      <span className="text-gray-400">
                        {progressPercentage}%
                      </span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          isCompleted 
                            ? 'bg-gradient-to-r from-amber-500 to-yellow-400' 
                            : 'bg-gradient-to-r from-[#FF5F2E] to-[#FF912E]'
                        }`}
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Certificates Section */}
      <div className="space-y-3">
        <h3 className={`font-extrabold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>📜 شهادات الإتمام الاحترافية</h3>

        {certificates.length === 0 ? (
          <div className={`p-6 text-center rounded-2xl border ${emptyClass}`}>
            <span className="text-3xl block mb-2">📜</span>
            <p className="text-xs font-bold leading-relaxed">لم تحصل على أي شهادات إتمام بعد.</p>
            <p className="text-[10px] opacity-75 mt-0.5">عند إنهائك الكامل لأي مستوى، ستصدر شهادتك باسمك هنا فوراً!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${statCardClass}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl p-2 rounded-xl bg-white/5 flex items-center justify-center">
                    📜
                  </span>
                  <div>
                    <h4 className="text-xs font-black text-[#FF5F2E]">
                      {cert.seasonName}
                    </h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      تاريخ الإصدار: {cert.completedAt}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="p-2.5 bg-[#FF5F2E]/10 hover:bg-[#FF5F2E]/20 text-[#FF5F2E] rounded-xl transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 border border-[#FF5F2E]/20"
                    title="عرض الشهادة"
                  >
                    <Eye className="w-4 h-4 text-[#FF5F2E]" />
                    <span className="text-[10px] font-bold">عرض الشهادة</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Certificate Viewer Modal Popup */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md" dir="rtl">
            <div className="absolute inset-0" onClick={() => setSelectedCert(null)}></div>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`w-full max-w-sm rounded-3xl p-6 border ${
                isDark ? 'bg-[#141414] border-white/10 text-white' : 'bg-white border-gray-100 text-gray-900'
              } shadow-2xl relative z-10 max-h-[90vh] overflow-y-auto`}
            >
              <button
                onClick={() => setSelectedCert(null)}
                className={`absolute top-4 left-4 p-2 rounded-full transition-all cursor-pointer z-20 ${
                  isDark ? 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900'
                }`}
              >
                <X className="w-4 h-4" />
              </button>

              {/* Styled Certificate Card inside Modal */}
              <div className="border-4 border-amber-500/20 rounded-2xl p-4 text-center space-y-4 relative bg-[#0D0A08] text-white">
                <div className="space-y-1">
                  <span className="text-2xl">🥇</span>
                  <h3 className="text-sm font-black text-amber-500 tracking-tight">شهادة إتمام احترافية</h3>
                  <div className="w-20 h-0.5 bg-amber-500/20 mx-auto"></div>
                </div>

                <p className="text-[10px] text-gray-400">
                  يسر برنامج تمارين رياضية ولياقة بدنية منح هذه الشهادة لـ
                </p>

                <h2 className="text-base font-black text-white">البطل المثابر / البطلة الرياضية</h2>

                <p className="text-[10px] text-gray-400 leading-relaxed">
                  تَقديراً للالتزام والتَّفوق الكامِل في إنهاء مَهام تَماريِن:
                </p>

                <div className="bg-[#1A1512] py-2 px-4 rounded-xl border border-amber-500/10">
                  <span className="text-xs font-black text-[#FF5F2E] block">
                    مستوى: {selectedCert.seasonName}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2.5 pt-1 text-[8px] text-gray-300">
                  <div className="bg-white/5 p-1.5 rounded-lg border border-white/5">
                    <span className="block text-gray-500">الأيام</span>
                    <span className="font-mono font-bold text-amber-500">{selectedCert.totalDays}</span>
                  </div>
                  <div className="bg-white/5 p-1.5 rounded-lg border border-white/5">
                    <span className="block text-gray-500">الالتزام</span>
                    <span className="font-mono font-bold text-emerald-500">{selectedCert.commitmentRate}%</span>
                  </div>
                  <div className="bg-white/5 p-1.5 rounded-lg border border-white/5">
                    <span className="block text-gray-500">التاريخ</span>
                    <span className="font-mono font-bold text-sky-500">{selectedCert.completedAt}</span>
                  </div>
                </div>

                <div className="text-[9px] text-gray-500 italic pt-2">
                  "جسم رياضي وصحة مثالية خطوة بخطوة"
                </div>
              </div>

              {/* Utility Close Button */}
              <div className="mt-4">
                <button
                  onClick={() => setSelectedCert(null)}
                  className="w-full py-3 bg-[#FF5F2E]/10 hover:bg-[#FF5F2E]/20 text-[#FF5F2E] border border-[#FF5F2E]/20 font-black rounded-2xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <X className="w-4 h-4 text-[#FF5F2E]" />
                  <span>إغلاق المعاينة</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
