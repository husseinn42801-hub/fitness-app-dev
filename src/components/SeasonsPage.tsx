import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Lock, Trophy, Star, ChevronLeft, Flame, Calendar, Dumbbell, Clock, Target, CheckCircle2 } from 'lucide-react';
import { Season, UserStats } from '../types';
import { SEASONS_DB, LEVEL_IMAGES } from '../data/seasons';
import { generateWorkoutDaysForUser } from '../data/workoutDays';

interface SeasonsPageProps {
  completedDaysBySeason: Record<string, number[]>;
  currentSeasonId: string;
  onSelectSeason: (seasonId: string) => void;
  isDark: boolean;
  seasonsList?: Season[];
  isFreeChallengeMode?: boolean;
  userStats?: UserStats;
}

const LevelCardImage: React.FC<{ season: Season; index: number }> = ({ season, index }) => {
  const [hasError, setHasError] = useState(false);
  const levelNumber = (index % 4) + 1;
  const imageUrl = season.imageUrl || LEVEL_IMAGES[levelNumber] || LEVEL_IMAGES[1];

  return (
    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/5 p-0.5 flex items-center justify-center shrink-0 overflow-hidden">
      {!hasError ? (
        <img
          src={imageUrl}
          alt={season.nameAr}
          className="w-full h-full object-contain"
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
        />
      ) : (
        <span className="text-3xl flex items-center justify-center">
          {season.emoji}
        </span>
      )}
    </div>
  );
};

export const SeasonsPage: React.FC<SeasonsPageProps> = ({
  completedDaysBySeason,
  currentSeasonId,
  onSelectSeason,
  isDark,
  seasonsList = SEASONS_DB,
  isFreeChallengeMode = false,
  userStats
}) => {
  const stats = userStats || { weight: 70, height: 168, age: 26, gender: 'أنثى', activityLevel: 1.375, goal: 'loss' };

  // Helper to check if a season is unlocked
  const isSeasonUnlocked = (seasonId: string): boolean => {
    if (isFreeChallengeMode) {
      return seasonId === currentSeasonId;
    }
    if (seasonsList.length === 0) return false;
    if (seasonId === seasonsList[0].id) return true;
    const idx = seasonsList.findIndex((s) => s.id === seasonId);
    if (idx <= 0) return false;
    
    // Check if the immediate previous season is completed 100% (30 days completed)
    const prevSeasonId = seasonsList[idx - 1].id;
    const completedDays = completedDaysBySeason[prevSeasonId] || [];
    return completedDays.length === 30;
  };

  const cardClass = isDark 
    ? 'bg-[#1F1F23]/80 border-white/5 text-white' 
    : 'bg-white border-gray-200 text-gray-900 shadow-xs';

  const pillClass = isDark
    ? 'bg-white/5 border-white/10 text-gray-200'
    : 'bg-gray-50 border-gray-200 text-gray-700';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pb-20"
      dir="rtl"
    >
      {/* Page Header */}
      <div className="space-y-1.5">
        <span className="text-[10px] bg-[#FF5F2E] text-white font-bold px-2.5 py-0.5 rounded-full uppercase">
          نظام تحدي المستويات الرياضي
        </span>
        <h2 className={`text-base font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>مستويات الرشاقة والتحول البدني</h2>
        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          تتفاعل بيانات وإحصائيات كل مستوى تلقائياً مع برنامج تمارينك اليومي ونسبة إنجازك. أكمل كل مستوى 100% لفتح التالي!
        </p>
      </div>

      {/* Seasons list */}
      <div className="space-y-4">
        {seasonsList.map((season, index) => {
          const completedDays = completedDaysBySeason[season.id] || [];
          const completedCount = completedDays.length;
          const progressPercent = Math.min(100, Math.round((completedCount / 30) * 100));
          const unlocked = isSeasonUnlocked(season.id);
          const isActive = currentSeasonId === season.id;
          const isCompleted = completedCount >= 30;

          // Dynamically compute level statistics from user program
          const seasonWorkoutDays = generateWorkoutDaysForUser(stats, season.id);
          const activeDays = seasonWorkoutDays.filter(d => !d.isRestDay);
          const totalExercisesInLevel = seasonWorkoutDays.reduce((sum, d) => sum + (d.exercises?.length || 0), 0);
          const avgExercisesPerDay = Math.round(totalExercisesInLevel / Math.max(1, activeDays.length));
          
          const totalLevelMinutes = seasonWorkoutDays.reduce((sum, d) => sum + (d.estimatedTime || 0), 0);
          const avgMinutesPerDay = Math.round(totalLevelMinutes / Math.max(1, activeDays.length));

          const totalTargetCalories = seasonWorkoutDays.reduce((sum, d) => sum + (d.caloriesEstimate || 0), 0);
          const burnedCalories = seasonWorkoutDays
            .filter(d => completedDays.includes(d.dayNumber))
            .reduce((sum, d) => sum + (d.caloriesEstimate || 0), 0);

          let goalLabel = 'حرق الدهون والبطن';
          if (stats.goal === 'maintain') goalLabel = 'شد القوام والخصر';
          else if (stats.goal === 'gain') goalLabel = 'بناء العضلات والقوة';

          return (
            <div
              key={season.id}
              className={`border rounded-3xl p-5 relative overflow-hidden transition-all duration-300 group ${cardClass} ${
                isActive 
                  ? 'border-[#FF5F2E]/60 ring-2 ring-[#FF5F2E]/50 scale-[1.01] shadow-xl shadow-[#FF5F2E]/20 shadow-[0_0_20px_rgba(255,95,46,0.18)]' 
                  : 'border-[#FF5F2E]/25 hover:border-[#FF5F2E]/50 opacity-95 hover:opacity-100 shadow-md shadow-[#FF5F2E]/5 hover:shadow-[#FF5F2E]/15'
              }`}
            >
              {/* Top Glowing Orange Edge Line */}
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#FF5F2E] to-transparent ${isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-90'} rounded-t-3xl pointer-events-none transition-opacity duration-300`} />

              {/* Outer/Inner Glowing Orange Border Effect */}
              <div className={`absolute inset-0 rounded-3xl border ${isActive ? 'border-[#FF5F2E]/40' : 'border-[#FF5F2E]/20 group-hover:border-[#FF5F2E]/35'} pointer-events-none transition-colors duration-300 shadow-[0_0_12px_rgba(255,95,46,0.08)_inset]`} />

              {/* Subtle Level Color Gradient Edge Overlay */}
              <div className={`absolute inset-0 rounded-3xl pointer-events-none border border-transparent bg-gradient-to-br ${season.color || 'from-[#FF5F2E] to-[#FF912E]'} ${isActive ? 'opacity-35' : 'opacity-20 group-hover:opacity-30'} transition-opacity duration-300 [mask:linear-gradient(#fff_0_0)_padding-box,linear-gradient(#fff_0_0)] [mask-composite:exclude]`} />

              {/* Season Background Decorative Glow */}
              <div className={`absolute -right-8 -bottom-8 w-36 h-36 bg-gradient-to-br ${season.color || 'from-[#FF5F2E] to-[#FF912E]'} ${isActive ? 'opacity-25' : 'opacity-10 group-hover:opacity-20'} blur-2xl rounded-full pointer-events-none transition-opacity duration-300`}></div>

              {/* Card top row */}
              <div className="flex justify-between items-start gap-3 relative z-10">
                <div className="flex items-center gap-3">
                  <LevelCardImage season={season} index={index} />
                  <div>
                    <h3 className={`text-sm font-extrabold ${isDark ? 'text-white' : 'text-gray-900'} flex items-center gap-2 flex-wrap`}>
                      <span>{season.nameAr}</span>
                      {isActive && (
                        <span className="text-[9px] bg-[#FF5F2E]/10 text-[#FF5F2E] border border-[#FF5F2E]/20 font-black px-2 py-0.5 rounded-md animate-pulse">
                          المستوى النشط حالياً ⚡
                        </span>
                      )}
                      {isCompleted && (
                        <span className="text-[9px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-black px-2 py-0.5 rounded-md flex items-center gap-1">
                          <Trophy className="w-3 h-3 text-emerald-500" />
                          <span>مكتمل 100% 🏆</span>
                        </span>
                      )}
                    </h3>
                    <p className={`text-[10px] leading-relaxed mt-1 max-w-[210px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {season.description}
                    </p>
                  </div>
                </div>

                <div className="text-left shrink-0">
                  {unlocked ? (
                    <div className="flex flex-col items-end">
                      <span className="text-xl font-black font-mono text-[#FF5F2E]">
                        {progressPercent}%
                      </span>
                      <span className={`text-[9px] font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {completedCount} / 30 يوماً
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-end text-rose-500 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded-xl">
                      <Lock className="w-3.5 h-3.5" />
                      <span className="text-[8px] font-black mt-0.5">مغلق</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Dynamic Level Stats Summary Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 relative z-10">
                <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${pillClass}`}>
                  <Dumbbell className="w-3.5 h-3.5 text-[#FF5F2E] shrink-0" />
                  <div className="text-right">
                    <span className="text-[8px] text-gray-400 block font-bold">التمارين</span>
                    <span className="text-[10px] font-black font-mono">~{avgExercisesPerDay} تمارين/يوم</span>
                  </div>
                </div>

                <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${pillClass}`}>
                  <Clock className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <div className="text-right">
                    <span className="text-[8px] text-gray-400 block font-bold">المدة</span>
                    <span className="text-[10px] font-black font-mono">~{avgMinutesPerDay} د/يوم</span>
                  </div>
                </div>

                <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${pillClass}`}>
                  <Flame className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <div className="text-right">
                    <span className="text-[8px] text-gray-400 block font-bold">السعرات</span>
                    <span className="text-[10px] font-black font-mono">{totalTargetCalories.toLocaleString()} سعرة</span>
                  </div>
                </div>

                <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${pillClass}`}>
                  <Target className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <div className="text-right truncate">
                    <span className="text-[8px] text-gray-400 block font-bold">الهدف</span>
                    <span className="text-[10px] font-black truncate block">{goalLabel}</span>
                  </div>
                </div>
              </div>

              {/* Progress bar visual */}
              {unlocked && (
                <div className="mt-4 space-y-1 relative z-10">
                  <div className="flex justify-between items-center text-[9px] font-bold">
                    <span className="text-gray-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      إنجاز الأيام: {completedCount} / 30
                    </span>
                    <span className="text-[#FF5F2E] font-mono">
                      السعرات المحروقة: {Math.round(burnedCalories)} / {Math.round(totalTargetCalories)}
                    </span>
                  </div>
                  <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-[#222222]' : 'bg-gray-100'}`}>
                    <div 
                      className={`bg-gradient-to-r ${season.color || 'from-[#FF5F2E] to-[#FF912E]'} h-full rounded-full transition-all duration-500`}
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Action row */}
              <div className="mt-4 pt-3.5 border-t border-white/5 flex justify-between items-center relative z-10">
                <span className="text-[10px] text-gray-400 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    الصعوبة: {season.difficulty}
                  </span>
                </span>

                {unlocked ? (
                  isActive ? (
                    <button
                      disabled
                      className="px-4 py-1.5 bg-[#FF5F2E]/10 text-[#FF5F2E] border border-[#FF5F2E]/20 text-[10px] font-black rounded-xl cursor-default"
                    >
                      أنت تتدرب في هذا المستوى حالياً 🏋️
                    </button>
                  ) : (
                    <button
                      onClick={() => onSelectSeason(season.id)}
                      className="px-4 py-1.5 bg-gradient-to-r from-[#FF5F2E] to-[#FF912E] text-white text-[10px] font-black rounded-xl transition-all hover:scale-103 active:scale-97 shadow-xs cursor-pointer flex items-center gap-1"
                    >
                      <span>الانتقال للمستوى</span>
                      <ChevronLeft className="w-3 h-3" />
                    </button>
                  )
                ) : (
                  isFreeChallengeMode ? (
                    <button
                      onClick={() => onSelectSeason(season.id)}
                      className="px-4 py-1.5 bg-[#FF5F2E]/20 border border-[#FF5F2E]/30 text-[#FF5F2E] text-[10px] font-black rounded-xl transition-all hover:scale-103 active:scale-97 cursor-pointer flex items-center gap-1 hover:bg-[#FF5F2E]/30"
                    >
                      <span>فتح وتفعيل المستوى 🔓</span>
                      <ChevronLeft className="w-3 h-3" />
                    </button>
                  ) : (
                    <span className="text-[9px] text-rose-500 font-extrabold flex items-center gap-1 bg-rose-500/5 px-2.5 py-1 rounded-lg border border-rose-500/10">
                      🔒 أكمل المستوى السابق أولاً بنسبة 100%
                    </span>
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};
