import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Check, Flame, Lock, Sparkles } from 'lucide-react';
import { WorkoutDay } from '../types';
import { EXERCISES_DB } from '../data/exercises';
import { videoCacheManager } from '../utils/videoCacheManager';

interface WorkoutDaysProps {
  workoutDays: WorkoutDay[];
  completedDays: number[];
  isDark: boolean;
  onSelectDay: (dayNumber: number) => void;
  onResetProgress?: () => void;
  onSelectNextSeason?: () => void;
}

/**
 * Virtualized & Animated WorkoutDays Component
 * Features smooth spring micro-interactions, animated completion badges,
 * and active next-day pulsing highlights for a lively interactive UI.
 */
export const WorkoutDays: React.FC<WorkoutDaysProps> = ({
  workoutDays,
  completedDays,
  isDark,
  onSelectDay,
  onSelectNextSeason,
}) => {
  // Find the current active (next unlocked & non-completed) day number
  const activeDay = workoutDays.find(
    (d) => !completedDays.includes(d.dayNumber) && (d.dayNumber === 1 || completedDays.includes(d.dayNumber - 1))
  );
  const activeDayNumber = activeDay?.dayNumber;

  // Background preload next active day's videos for instant playback
  useEffect(() => {
    if (activeDay && activeDay.exercises && activeDay.exercises.length > 0) {
      const urls = activeDay.exercises
        .map((id) => EXERCISES_DB[id]?.mp4Url || EXERCISES_DB[id]?.videoUrl)
        .filter((u): u is string => Boolean(u && u.trim()));
      if (urls.length > 0) {
        videoCacheManager.preloadVideos(urls);
      }
    }
  }, [activeDay]);

  return (
    <div className="space-y-3" dir="rtl">
      {/* 30 Days Completion & Next Level Banner */}
      {completedDays.length >= 30 && onSelectNextSeason && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-3xl bg-gradient-to-r from-amber-500/15 via-[#FF5F2E]/15 to-purple-500/15 border border-[#FF5F2E]/30 space-y-2.5 text-right shadow-lg"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-2xl p-2 rounded-2xl bg-[#FF5F2E]/10 shrink-0">🏆</span>
            <div className="space-y-0.5">
              <h4 className={`text-xs font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
                مبارك! أكملت كافة أيام هذا المستوى (30 يوماً) بنجاح! 🎉
              </h4>
              <p className="text-[10px] text-gray-400 font-medium">
                جاهز للتحدي الجديد؟ اضغط أدناه للانتقال المباشر للمستوى التالي!
              </p>
            </div>
          </div>
          <button
            onClick={onSelectNextSeason}
            className="w-full py-3.5 bg-gradient-to-r from-[#FF5F2E] to-[#FF912E] hover:opacity-95 active:scale-98 text-white font-black rounded-2xl text-xs transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
          >
            <span>انتقل للمستوى التالي الآن 🚀</span>
          </button>
        </motion.div>
      )}

      {/* Grid Title */}
      <div className="flex justify-between items-center px-1 pt-1">
        <div className="flex items-center gap-2">
          <h3 className={`font-black text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
            برنامج تحدي الـ 30 يوماً
          </h3>
          <span className="text-[10px] bg-[#FF5F2E]/10 text-[#FF5F2E] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 animate-pulse" />
            {completedDays.length} / {workoutDays.length || 30}
          </span>
        </div>
        <span className="text-[10px] text-gray-400 font-semibold">
          اختر يوماً للبدء
        </span>
      </div>

      {/* Static 30 Days Grid Layout with Framer Motion animations */}
      <div className="grid grid-cols-4 gap-3">
        {workoutDays.map((day, index) => {
          const isCompleted = completedDays.includes(day.dayNumber);
          const isUnlocked = day.dayNumber === 1 || completedDays.includes(day.dayNumber - 1);
          const isActiveNextDay = day.dayNumber === activeDayNumber;

          return (
            <motion.button
              key={day.dayNumber}
              initial={{ opacity: 0, scale: 0.85, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.25, delay: Math.min(index * 0.015, 0.3), ease: 'easeOut' }}
              whileHover={isUnlocked ? { scale: 1.05, y: -2 } : {}}
              whileTap={isUnlocked ? { scale: 0.93 } : {}}
              onClick={() => {
                if (isUnlocked) {
                  onSelectDay(day.dayNumber);
                }
              }}
              disabled={!isUnlocked}
              className={`relative aspect-square rounded-2xl flex flex-col items-center justify-center border transition-all cursor-pointer overflow-hidden ${
                isCompleted
                  ? 'border-emerald-400/60 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-950/20'
                  : isActiveNextDay
                  ? isDark
                    ? 'border-[#FF5F2E] bg-gradient-to-br from-[#1C1C1E] to-[#251814] text-white shadow-lg shadow-[#FF5F2E]/15 ring-2 ring-[#FF5F2E]/40'
                    : 'border-[#FF5F2E] bg-gradient-to-br from-white to-orange-50 text-gray-900 shadow-lg shadow-[#FF5F2E]/10 ring-2 ring-[#FF5F2E]/30'
                  : isUnlocked
                  ? isDark
                    ? 'border-white/10 bg-[#1C1C1E] hover:border-[#FF5F2E]/60 text-white shadow-xs'
                    : 'border-gray-200 bg-white hover:border-[#FF5F2E]/60 text-gray-800 shadow-sm'
                  : isDark
                  ? 'border-white/5 bg-[#171717]/40 text-gray-600 cursor-not-allowed opacity-35'
                  : 'border-gray-100 bg-gray-100 text-gray-400 cursor-not-allowed opacity-40'
              }`}
            >
              {/* Subtle Ambient Glow for Active Next Day */}
              {isActiveNextDay && (
                <span className="absolute inset-0 bg-gradient-to-tr from-[#FF5F2E]/10 to-transparent pointer-events-none animate-pulse" />
              )}

              {/* Day Label */}
              <span className={`text-[10px] font-bold block ${isCompleted ? 'opacity-90' : 'opacity-75'}`}>
                اليوم
              </span>

              {/* Day Number */}
              <span className="text-xl font-black font-mono leading-none mt-0.5">
                {day.dayNumber}
              </span>

              {/* Status Badge / Icon Animation */}
              <div className="absolute bottom-2 flex items-center justify-center">
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                    className="flex items-center gap-1 bg-white/25 backdrop-blur-xs px-1.5 py-0.5 rounded-full"
                  >
                    <Check className="w-3 h-3 text-white stroke-[3]" />
                    <span className="text-[9px] font-extrabold text-white">تم</span>
                  </motion.div>
                ) : day.isRestDay ? (
                  <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-md ${
                    isUnlocked 
                      ? 'bg-[#FF5F2E]/10 text-[#FF5F2E] border border-[#FF5F2E]/20' 
                      : (isDark ? 'bg-white/5 text-gray-500' : 'bg-gray-200 text-gray-400')
                  }`}>راحة ☕</span>
                ) : isActiveNextDay ? (
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="flex items-center gap-0.5 bg-[#FF5F2E] text-white px-1.5 py-0.5 rounded-full"
                  >
                    <Flame className="w-2.5 h-2.5 fill-current" />
                    <span className="text-[8px] font-extrabold">ابدأ</span>
                  </motion.div>
                ) : isUnlocked ? (
                  <span className="text-[8px] opacity-75 font-mono">~{day.estimatedTime} د</span>
                ) : (
                  <Lock className="w-2.5 h-2.5 opacity-40" />
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

interface VirtualizedExerciseListProps {
  exerciseIds: string[];
  isDark: boolean;
}

/**
 * Lightweight Virtualized Exercise List inside preview modal
 */
export const VirtualizedExerciseList: React.FC<VirtualizedExerciseListProps> = ({
  exerciseIds,
  isDark,
}) => {
  // Preload videos in preview list
  useEffect(() => {
    if (exerciseIds && exerciseIds.length > 0) {
      const urls = exerciseIds
        .map((id) => EXERCISES_DB[id]?.mp4Url || EXERCISES_DB[id]?.videoUrl)
        .filter((u): u is string => Boolean(u && u.trim()));
      if (urls.length > 0) {
        videoCacheManager.preloadVideos(urls);
      }
    }
  }, [exerciseIds]);

  return (
    <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1 scrollbar-thin">
      {exerciseIds.map((exId, index) => {
        const ex = EXERCISES_DB[exId];
        if (!ex) return null;

        return (
          <div
            key={`${exId}-${index}`}
            className={`flex justify-between items-center p-3 border rounded-2xl transition-colors ${
              isDark ? 'bg-[#222225]/40 border-white/5' : 'bg-gray-50 border-gray-100 shadow-2xs'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 bg-[#FF5F2E]/10 text-[10px] text-[#FF5F2E] font-black rounded-full flex items-center justify-center shrink-0">
                {index + 1}
              </span>
              <div>
                <h4 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {ex.nameAr}
                </h4>
                <span className="text-[9px] text-gray-400 font-mono font-medium block uppercase mt-0.5">
                  {ex.nameEn}
                </span>
              </div>
            </div>
            <span
              className={`text-[9px] font-extrabold px-2 py-0.5 rounded-md shrink-0 ${
                isDark ? 'bg-white/5 text-[#FF5F2E]' : 'bg-[#FF5F2E]/10 text-[#FF5F2E]'
              }`}
            >
              {`3 مجموعات × ${ex.duration}ث`}
            </span>
          </div>
        );
      })}
    </div>
  );
};
