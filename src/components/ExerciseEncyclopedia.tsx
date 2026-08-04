import React, { useState, useMemo, useCallback, useDeferredValue, useEffect } from 'react';
import { EXERCISES_DB } from '../data/exercises';
import { Exercise } from '../types';
import { Search, Info, Flame, Clock, PlayCircle, Star, Dumbbell, Video, RotateCcw, AlertCircle } from 'lucide-react';
import { ExerciseModel } from './ExerciseModel';

interface ExerciseEncyclopediaProps {
  isDark?: boolean;
}

// Global session cache to ensure instant loading when reopening the videos section
const sessionHydratedExerciseCache = new Set<string>();
let isSessionFullyHydrated = false;

// Custom emoji generator for exercises based on exercise metadata
const getExerciseEmoji = (exercise: Exercise): string => {
  const name = (exercise.nameEn || '').toLowerCase();
  const cat = (exercise.category || '').toLowerCase();
  const muscle = (exercise.targetMuscle || exercise.bodyPart || '').toLowerCase();

  if (name.includes('stretch') || cat.includes('إطالة') || cat.includes('استشفاء')) return '🧘‍♀️';
  if (name.includes('jump') || name.includes('jack') || name.includes('rope')) return '🏃‍♂️';
  if (name.includes('squat') || name.includes('lunge') || name.includes('leg') || muscle.includes('ساق') || muscle.includes('فخذ')) return '🦵';
  if (name.includes('push') || name.includes('press') || name.includes('chest') || muscle.includes('صدر')) return '🏋️‍♂️';
  if (name.includes('crunch') || name.includes('plank') || name.includes('abs') || name.includes('twist') || muscle.includes('بطن')) return '⚡';
  if (name.includes('arm') || name.includes('bicep') || name.includes('tricep') || name.includes('curl') || muscle.includes('ذراع')) return '💪';
  if (name.includes('back') || name.includes('row') || name.includes('pull') || muscle.includes('ظهر')) return '🏋️‍♀️';
  if (name.includes('run') || name.includes('sprint') || name.includes('high knee') || name.includes('cardio')) return '🔥';
  if (name.includes('box') || name.includes('punch')) return '🥊';
  
  return '🏋️';
};

// High-performance lazy-loading video thumbnail component using IntersectionObserver
const VideoThumbnail: React.FC<{ videoSrc: string; isDark?: boolean }> = React.memo(({ videoSrc, isDark = false }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const [isInViewport, setIsInViewport] = React.useState<boolean>(false);
  const [isVideoLoaded, setIsVideoLoaded] = React.useState<boolean>(false);
  const [hasError, setHasError] = React.useState<boolean>(false);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el || !videoSrc) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInViewport(true);
          } else {
            // Unmount video element when out of viewport to keep memory low on low-end devices
            setIsInViewport(false);
            setIsVideoLoaded(false);
          }
        });
      },
      {
        rootMargin: '200px 0px 200px 0px', // Load slightly before scrolling into view
        threshold: 0.01,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [videoSrc]);

  React.useEffect(() => {
    const v = videoRef.current;
    if (v && isInViewport) {
      v.play().catch(() => {});
    }
  }, [isInViewport, isVideoLoaded]);

  if (!videoSrc || !videoSrc.trim() || hasError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-1 text-[#FF5F2E] bg-black/40">
        <Dumbbell className="w-6 h-6" />
        <span className="text-[9px] font-mono text-gray-400">PREVIEW</span>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-full relative flex items-center justify-center overflow-hidden">
      {/* Skeleton / Shimmer placeholder while video element is unmounted or buffering */}
      {(!isInViewport || !isVideoLoaded) && (
        <div className={`absolute inset-0 z-10 animate-shimmer flex items-center justify-center ${
          isDark ? 'bg-white/10' : 'bg-gray-800/20 shimmer-light'
        }`}>
          <PlayCircle className="w-6 h-6 text-white/30 animate-pulse" />
        </div>
      )}

      {/* Conditionally rendered video element for minimal memory footprint */}
      {isInViewport && (
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={() => setIsVideoLoaded(true)}
          onCanPlay={() => setIsVideoLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover pointer-events-none transition-opacity duration-300 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
});

// Professional Skeleton Loading Card matching exact dimensions, radius, and elements of ExerciseCard
const SkeletonCard: React.FC<{ isDark: boolean }> = React.memo(({ isDark }) => {
  return (
    <div
      className={`p-4 rounded-3xl border flex gap-4 relative overflow-hidden animate-shimmer ${
        isDark ? 'bg-[#1A1A1A] border-white/5' : 'bg-white border-gray-100 shadow-sm shimmer-light'
      }`}
    >
      {/* Favorite star button placeholder top-left */}
      <div className="absolute left-4 top-4 p-1.5 rounded-full">
        <div className={`w-4 h-4 rounded-full ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} />
      </div>

      {/* Video thumbnail square placeholder */}
      <div className={`w-24 h-24 rounded-2xl shrink-0 ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} />

      {/* Details skeleton */}
      <div className="flex-1 space-y-2 min-w-0 pr-1 pt-0.5">
        {/* Category tag pill */}
        <div className={`h-4 w-20 rounded-full ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} />

        {/* Exercise name title */}
        <div className={`h-5 w-32 rounded-lg ${isDark ? 'bg-white/15' : 'bg-gray-300'}`} />

        {/* Set count & Duration / Calories lines */}
        <div className="space-y-1.5 pt-1">
          <div className={`h-3 w-28 rounded-md ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} />
          <div className={`h-3 w-36 rounded-md ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} />
        </div>
      </div>
    </div>
  );
});

// Memoized individual Exercise Card component for smooth, lag-free list rendering
interface ExerciseCardProps {
  exercise: Exercise;
  isDark: boolean;
  isFavorite: boolean;
  onSelect: (ex: Exercise) => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = React.memo(({
  exercise,
  isDark,
  isFavorite,
  onSelect,
  onToggleFavorite,
}) => {
  const totalCals = Math.round((exercise.caloriesPerMin || 6) * ((exercise.duration || 30) / 60) * 3);
  const recommendedSets = `3 مجموعات × ${exercise.duration || 30} ثانية`;
  const videoSrc = exercise.mp4Url || exercise.videoUrl || '';

  return (
    <div
      onClick={() => onSelect(exercise)}
      className={`p-4 rounded-3xl border hover:border-[#FF5F2E]/30 transition-all cursor-pointer flex gap-4 relative ${
        isDark ? 'bg-[#1A1A1A] border-white/5' : 'bg-white border-gray-100 shadow-sm'
      }`}
    >
      {/* Favorite toggle star */}
      <button
        onClick={(e) => onToggleFavorite(exercise.id, e)}
        className="absolute left-4 top-4 p-1.5 rounded-full hover:scale-110 active:scale-95 transition-all z-20 cursor-pointer"
        title={isFavorite ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
      >
        <Star className={`w-4 h-4 ${
          isFavorite 
            ? 'text-amber-400 fill-amber-400' 
            : (isDark ? 'text-gray-600 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600')
        }`} />
      </button>

      {/* Exercise video thumbnail preview */}
      <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 bg-black border border-white/10 relative flex items-center justify-center">
        <VideoThumbnail videoSrc={videoSrc} isDark={isDark} />
        {/* Custom exercise emoji badge */}
        <span className="absolute top-1.5 right-1.5 w-6 h-6 rounded-lg bg-black/60 backdrop-blur-md text-xs flex items-center justify-center border border-white/10 shadow-sm z-20">
          {getExerciseEmoji(exercise)}
        </span>
      </div>

      {/* Exercise details */}
      <div className="flex-1 space-y-1.5 min-w-0 pr-1">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block ${
          isDark ? 'bg-white/5 text-gray-400' : 'bg-gray-100 text-gray-600'
        }`}>
          {exercise.muscleGroup}
        </span>
        
        {/* English Name Only with Emoji */}
        <div className="flex items-center gap-1.5 truncate">
          <h3 className={`text-sm font-black font-mono uppercase tracking-wide truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {exercise.nameEn}
          </h3>
        </div>
        
        <div className="flex flex-col gap-1 text-[10px] text-gray-400 font-semibold pt-1">
          <span className="flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-[#FF5F2E] shrink-0" />
            <span className="font-mono text-white/90 font-bold">{totalCals} سعرة إجمالاً</span>
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span className="font-mono text-sky-300 font-bold">{recommendedSets}</span>
          </span>
        </div>
      </div>
    </div>
  );
});

export const ExerciseEncyclopedia: React.FC<ExerciseEncyclopediaProps> = ({ isDark = false }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const deferredQuery = useDeferredValue(searchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  // Progressive hydration & cache states
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(!isSessionFullyHydrated);
  const [hydratedIds, setHydratedIds] = useState<Set<string>>(() => new Set(sessionHydratedExerciseCache));
  const [loadError, setLoadError] = useState<string | null>(null);

  // Background hydration & video preloading
  const startLoadingAndPreload = useCallback(() => {
    setLoadError(null);
    if (isSessionFullyHydrated) {
      setIsInitialLoading(false);
      return;
    }

    setIsInitialLoading(true);

    try {
      const allExercises = Object.values(EXERCISES_DB) as Exercise[];

      // Preload video metadata for the first batch of exercises
      const firstBatch = allExercises.slice(0, 8);
      firstBatch.forEach((ex) => {
        const videoSrc = ex.mp4Url || ex.videoUrl;
        if (videoSrc) {
          const v = document.createElement('video');
          v.preload = 'metadata';
          v.src = videoSrc;
        }
      });

      // Hydrate initial batch smoothly after a brief 250ms delay
      const timer1 = setTimeout(() => {
        const nextSet = new Set(sessionHydratedExerciseCache);
        firstBatch.forEach((ex) => {
          nextSet.add(ex.id);
          sessionHydratedExerciseCache.add(ex.id);
        });
        setHydratedIds(new Set(nextSet));

        // Hydrate remaining exercises
        const timer2 = setTimeout(() => {
          allExercises.forEach((ex) => {
            nextSet.add(ex.id);
            sessionHydratedExerciseCache.add(ex.id);
          });
          setHydratedIds(new Set(nextSet));
          isSessionFullyHydrated = true;
          setIsInitialLoading(false);
        }, 150);

        return () => clearTimeout(timer2);
      }, 250);

      return () => clearTimeout(timer1);
    } catch (err) {
      setLoadError('تعذر تحميل بيانات الفيديوهات. يرجى التأكد من الاتصال وإعادة المحاولة.');
      setIsInitialLoading(false);
    }
  }, []);

  useEffect(() => {
    const cleanup = startLoadingAndPreload();
    return () => {
      if (cleanup) cleanup();
    };
  }, [startLoadingAndPreload]);

  // Favorite exercises state with persistence
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('rashaka_favorite_exercises');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const toggleFavorite = useCallback((exerciseId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    requestAnimationFrame(() => {
      setFavoriteIds((prev) => {
        const updated = prev.includes(exerciseId)
          ? prev.filter(id => id !== exerciseId)
          : [...prev, exerciseId];
        try {
          localStorage.setItem('rashaka_favorite_exercises', JSON.stringify(updated));
        } catch {
          // ignore storage error
        }
        return updated;
      });
    });
  }, []);

  const handleSelectExercise = useCallback((ex: Exercise | null) => {
    requestAnimationFrame(() => {
      setSelectedExercise(ex);
    });
  }, []);

  const handleSelectCategory = useCallback((catId: string) => {
    requestAnimationFrame(() => {
      setSelectedCategory(catId);
    });
  }, []);

  const exercises = useMemo(() => Object.values(EXERCISES_DB) as Exercise[], []);

  // Define muscle categories matching exactly the muscleGroup field of Exercise
  const categories = useMemo(() => [
    { id: 'all', name: 'الكل' },
    { id: 'favorites', name: '⭐ المفضلة' },
    { id: 'عضلات البطن والخصر', name: 'عضلات البطن والخصر' },
    { id: 'كامل الجسم', name: 'كامل الجسم' },
    { id: 'الجزء السفلي والفخذين', name: 'الجزء السفلي والفخذين' },
    { id: 'الجزء العلوي والذراعين', name: 'الجزء العلوي والذراعين' },
    { id: 'الإطالات والاستشفاء', name: 'الإطالات والاستشفاء' },
  ], []);

  // Filter exercises based on deferred query and muscleGroup
  const filteredExercises = useMemo(() => {
    const query = deferredQuery.toLowerCase().trim();
    return exercises.filter((ex) => {
      const matchesSearch = !query || 
        ex.nameAr.toLowerCase().includes(query) ||
        ex.nameEn.toLowerCase().includes(query) ||
        ex.muscleGroup.toLowerCase().includes(query) ||
        ex.difficulty.toLowerCase().includes(query) ||
        ex.description.toLowerCase().includes(query) ||
        (ex.steps && ex.steps.some((step) => step.toLowerCase().includes(query))) ||
        (ex.tips && ex.tips.some((tip) => tip.toLowerCase().includes(query)));
      
      const matchesCategory = 
        selectedCategory === 'all' ? true :
        selectedCategory === 'favorites' ? favoriteIds.includes(ex.id) :
        ex.muscleGroup === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [exercises, deferredQuery, selectedCategory, favoriteIds]);

  return (
    <div className={`space-y-6 pb-20 ${isDark ? 'text-white' : 'text-gray-950'}`} dir="rtl">
      {/* Search and Category Filter section - ALWAYS VISIBLE IMMEDIATELY */}
      <div className={`p-5 rounded-3xl border shadow-xs space-y-4 ${
        isDark ? 'bg-[#1A1A1A] border-white/5' : 'bg-white border-gray-100 shadow-sm'
      }`}>
        <div className="relative">
          <input
            type="text"
            placeholder="ابحث عن تمرين... (مثال: بلانك، سكوات)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full py-3 pr-10 pl-4 border rounded-2xl text-xs font-semibold focus:outline-hidden focus:border-[#FF5F2E] ${
              isDark ? 'bg-[#222222] border-white/5 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400'
            }`}
          />
          <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-3.5" />
        </div>

        {/* Scrollable category pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar scroll-smooth">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleSelectCategory(cat.id)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#FF5F2E] text-white shadow-xs'
                  : (isDark ? 'bg-[#222222] text-gray-400 hover:text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of exercise cards or Skeleton placeholders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loadError ? (
          <div className={`col-span-full p-8 text-center rounded-3xl border space-y-3 ${
            isDark ? 'bg-[#1A1A1A] border-white/5 text-gray-300' : 'bg-white border-gray-100 text-gray-700 shadow-sm'
          }`}>
            <AlertCircle className="w-8 h-8 text-[#FF5F2E] mx-auto" />
            <p className="text-xs font-bold">{loadError}</p>
            <button
              onClick={startLoadingAndPreload}
              className="px-5 py-2.5 bg-[#FF5F2E] hover:bg-[#FF5F2E]/90 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer inline-flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة المحاولة</span>
            </button>
          </div>
        ) : isInitialLoading && hydratedIds.size === 0 ? (
          /* Render 6 to 8 Skeleton Cards during initial preloading phase */
          Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={`skeleton-initial-${index}`} isDark={isDark} />
          ))
        ) : (
          filteredExercises.map((exercise) => {
            const isHydrated = hydratedIds.has(exercise.id) || isSessionFullyHydrated;

            if (!isHydrated) {
              return <SkeletonCard key={`skeleton-${exercise.id}`} isDark={isDark} />;
            }

            return (
              <div key={exercise.id} className="animate-fade-in-fast">
                <ExerciseCard
                  exercise={exercise}
                  isDark={isDark}
                  isFavorite={favoriteIds.includes(exercise.id)}
                  onSelect={handleSelectExercise}
                  onToggleFavorite={toggleFavorite}
                />
              </div>
            );
          })
        )}

        {!isInitialLoading && !loadError && filteredExercises.length === 0 && (
          <div className="col-span-full text-center py-10 text-xs text-gray-400">
            لا توجد تمارين تطابق بحثك حالياً. جرب كلمات أخرى!
          </div>
        )}
      </div>

      {/* MODAL DETAILED VIEW */}
      {selectedExercise && (() => {
        const modalTotalCals = Math.round((selectedExercise.caloriesPerMin || 6) * ((selectedExercise.duration || 30) / 60) * 3);
        const modalRecommendedSets = `3 مجموعات × ${selectedExercise.duration || 30} ثانية`;

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop (X Close Trigger) */}
            <div 
              onClick={() => handleSelectExercise(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xs"
            ></div>

            {/* Modal Container */}
            <div className={`w-full max-w-md rounded-3xl border overflow-hidden relative z-10 animate-fade-in ${
              isDark ? 'bg-[#121212] border-white/5 text-white' : 'bg-white border-gray-100 text-gray-900'
            }`}>
              {/* Header info */}
              <div className={`p-4 flex justify-between items-center border-b ${
                isDark ? 'bg-[#1A1A1A] border-white/5' : 'bg-gray-50 border-gray-100'
              }`}>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xl shrink-0">{getExerciseEmoji(selectedExercise)}</span>
                    <h3 className={`text-base font-black font-mono uppercase tracking-wide ${isDark ? 'text-white' : 'text-gray-950'}`}>
                      {selectedExercise.nameEn}
                    </h3>
                    <button
                      onClick={(e) => toggleFavorite(selectedExercise.id, e)}
                      className="p-1 rounded-full hover:scale-110 active:scale-95 transition-all cursor-pointer"
                      title={favoriteIds.includes(selectedExercise.id) ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
                    >
                      <Star className={`w-4.5 h-4.5 ${
                        favoriteIds.includes(selectedExercise.id) 
                          ? 'text-amber-400 fill-amber-400' 
                          : (isDark ? 'text-gray-600 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600')
                      }`} />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleSelectExercise(null)}
                  className={`p-2 rounded-xl transition-all cursor-pointer ${
                    isDark ? 'bg-[#222222] text-gray-300 hover:text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  ✕ إغلاق
                </button>
              </div>

              <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
                {/* Display ONLY the Video Box */}
                <div className="w-full animate-fade-in">
                  <ExerciseModel type={selectedExercise.animationType} isPlaying={true} mp4Url={selectedExercise.mp4Url} exerciseNameEn={selectedExercise.nameEn} />
                </div>

                {/* Estimate counters & Time-based sets matching outside */}
                <div className="grid grid-cols-2 gap-3">
                  <div className={`p-3 rounded-2xl text-center border ${
                    isDark ? 'bg-[#1A1A1A] border-white/5' : 'bg-gray-50 border-gray-100'
                  }`}>
                    <span className="text-[10px] text-gray-400 font-semibold block mb-1">السعرات التقريبية</span>
                    <span className="text-sm font-extrabold text-[#FF5F2E] font-mono">
                      {modalTotalCals} <span className="text-[10px] font-sans font-medium text-gray-400">سعرة إجمالاً</span>
                    </span>
                  </div>
                  <div className={`p-3 rounded-2xl text-center border ${
                    isDark ? 'bg-[#1A1A1A] border-white/5' : 'bg-gray-50 border-gray-100'
                  }`}>
                    <span className="text-[10px] text-gray-400 font-semibold block mb-1">المجموعة المقترحة</span>
                    <span className="text-sm font-extrabold text-sky-400 font-mono">
                      {modalRecommendedSets}
                    </span>
                  </div>
                </div>

                {/* Additional exercise specs metadata */}
                <div className={`p-3 rounded-2xl border grid grid-cols-3 gap-2 text-center ${
                  isDark ? 'bg-[#1A1A1A] border-white/5 text-gray-300' : 'bg-gray-50 border-gray-100 text-gray-700'
                }`}>
                  <div>
                    <span className="text-[9px] text-gray-400 block font-bold">العضلة المستهدفة</span>
                    <span className="text-[11px] font-bold text-[#FF5F2E] truncate block">{selectedExercise.targetMuscle || selectedExercise.muscleGroup}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-400 block font-bold">المستوى</span>
                    <span className="text-[11px] font-bold text-emerald-400 truncate block">{selectedExercise.difficulty || 'جميع المستويات'}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-400 block font-bold">المعدات</span>
                    <span className="text-[11px] font-bold text-sky-400 truncate block">{selectedExercise.equipment || 'بدون أدوات'}</span>
                  </div>
                </div>

                {/* Tips block */}
                {selectedExercise.tips && selectedExercise.tips.length > 0 && (
                  <div className={`p-3.5 rounded-2xl border ${
                    isDark ? 'bg-amber-500/5 border-amber-500/10' : 'bg-amber-500/5 border-amber-500/15'
                  }`}>
                    <span className="text-[11px] font-bold text-[#FF5F2E] flex items-center gap-1 mb-1">
                      <Star className="w-4 h-4 fill-current" />
                      <span>نصيحة الكابتن للأداء المثالي:</span>
                    </span>
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{selectedExercise.tips.join(' ')}</p>
                  </div>
                )}

                {/* Sequential Steps instructions */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-gray-400 block">خطوات التنفيذ بالتفصيل:</span>
                  <ul className="space-y-2 pr-1">
                    {selectedExercise.steps.map((step, idx) => (
                      <li key={idx} className="text-xs flex items-start gap-2.5 leading-relaxed">
                        <span className={`w-4 h-4 rounded-full text-[10px] font-bold font-mono flex items-center justify-center shrink-0 mt-0.5 ${
                          isDark ? 'bg-[#222222] text-gray-400' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {idx + 1}
                        </span>
                        <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
