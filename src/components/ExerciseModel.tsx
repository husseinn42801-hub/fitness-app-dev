import React, { useEffect, useRef, useState, useCallback } from 'react';
import { EXERCISES_DB } from '../data/exercises';
import { Pause, Loader2, Video, RotateCw } from 'lucide-react';

interface ExerciseModelProps {
  type: 'jumping-jacks' | 'squats' | 'crunches' | 'russian-twist' | 'plank' | 'leg-raises' | 'cobra-stretch';
  isPlaying?: boolean;
  mp4Url?: string;
  exerciseNameEn?: string;
  heightClass?: string;
  showBadge?: boolean;
}

export const ExerciseModel: React.FC<ExerciseModelProps> = ({ 
  type, 
  isPlaying = true, 
  mp4Url, 
  exerciseNameEn, 
  showBadge = true 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prevSourceRef = useRef<string>('');
  const [isBuffering, setIsBuffering] = useState<boolean>(true);
  const [hasLoadedData, setHasLoadedData] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  // Look up the exercise strictly by matching English name (nameEn) if provided, or fallback to animationType
  const exercise = exerciseNameEn
    ? Object.values(EXERCISES_DB).find((ex) => ex.nameEn?.trim().toLowerCase() === exerciseNameEn.trim().toLowerCase())
    : Object.values(EXERCISES_DB).find((ex) => ex.animationType === type);

  const videoSource = mp4Url || exercise?.mp4Url || exercise?.videoUrl || '';

  const markVideoReady = useCallback(() => {
    setHasLoadedData(true);
    setIsBuffering(false);
    setHasError(false);
  }, []);

  const handleVideoError = useCallback(() => {
    setIsBuffering(false);
    setHasError(true);
  }, []);

  const handleRetry = useCallback(() => {
    setHasError(false);
    setIsBuffering(true);
    prevSourceRef.current = '';
    const video = videoRef.current;
    if (video && videoSource) {
      video.src = videoSource;
      video.load();
      if (isPlaying) {
        video.play().then(markVideoReady).catch(handleVideoError);
      }
    }
  }, [videoSource, isPlaying, markVideoReady, handleVideoError]);

  // 1. Source URL Change Handler: ONLY load when the source URL actually changes
  useEffect(() => {
    if (!videoSource) {
      prevSourceRef.current = '';
      markVideoReady();
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    // Avoid redundant re-load if source URL has not changed
    if (prevSourceRef.current === videoSource && !hasError) {
      return;
    }

    prevSourceRef.current = videoSource;
    setHasLoadedData(false);
    setIsBuffering(true);
    setHasError(false);

    // Fast Safety Timeout: ensure loading spinner disappears within 1.5 seconds MAX under any network condition
    const timer = setTimeout(() => {
      markVideoReady();
    }, 1500);

    try {
      video.src = videoSource;
      video.load();
      if (isPlaying) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => markVideoReady())
            .catch((err) => {
              // Video play might be blocked or buffering
              if (video.readyState >= 2) {
                markVideoReady();
              }
            });
        }
      } else {
        markVideoReady();
      }
    } catch (e) {
      markVideoReady();
    }

    return () => {
      clearTimeout(timer);
    };
  }, [videoSource, markVideoReady, hasError, isPlaying]);

  // 2. Play/Pause Synchronizer: pure play/pause WITHOUT resetting or re-loading video source
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSource || hasError) return;

    if (isPlaying) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => markVideoReady())
          .catch(() => {});
      }
    } else {
      video.pause();
    }
  }, [isPlaying, videoSource, markVideoReady, hasError]);

  // 3. Seamless native loop handler without reload or network re-fetch
  const handleLoopEnd = () => {
    const video = videoRef.current;
    if (video && videoSource) {
      video.currentTime = 0;
      if (isPlaying) {
        video.play().catch(() => {});
      }
    }
  };

  return (
    <div 
      className="relative w-full aspect-square max-w-[260px] xs:max-w-[280px] sm:max-w-[300px] mx-auto flex items-center justify-center bg-[#0D0A08] rounded-2xl border-2 border-white/10 ring-1 ring-white/10 overflow-hidden shadow-xl group"
      style={{
        WebkitMaskImage: '-webkit-radial-gradient(white, black)',
        transform: 'translateZ(0)',
      }}
    >
      {!videoSource ? (
        <div className="flex flex-col items-center justify-center text-center p-6 space-y-3 z-10">
          <div className="w-14 h-14 rounded-2xl bg-[#FF5F2E]/10 border border-[#FF5F2E]/30 flex items-center justify-center text-[#FF5F2E] shadow-lg shadow-[#FF5F2E]/10">
            <Video className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-black text-white">
              {exercise?.nameAr || 'تمرین رياضـي'}
            </h4>
            <p className="text-[11px] text-gray-400 font-medium">
              في انتظار إضافة رابط الفيديو الجديد...
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Network Failure State with Retry Button */}
          {hasError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-30 p-4 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                <Video className="w-6 h-6" />
              </div>
              <p className="text-xs text-gray-300 font-medium leading-relaxed">
                تعذر تحميل الفيديو بسبب ضعف الاتصال
              </p>
              <button
                type="button"
                onClick={handleRetry}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#FF5F2E] hover:bg-[#FF5F2E]/90 text-white rounded-xl text-xs font-bold shadow-lg transition-transform active:scale-95 cursor-pointer"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>إعادة المحاولة</span>
              </button>
            </div>
          ) : (
            <>
              {/* Loading Spinner ONLY if video data hasn't loaded yet AND within early buffering phase */}
              {!hasLoadedData && isBuffering && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-20 transition-opacity duration-200">
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="w-7 h-7 text-[#FF5F2E] animate-spin" />
                    <span className="text-[10px] text-gray-300 font-bold">جاري تحميل عرض التمرين...</span>
                  </div>
                </div>
              )}

              {/* HTML5 Video Element streaming directly online from R2 without Cache API / Blob / Base64 */}
              <video
                ref={videoRef}
                src={videoSource}
                className="w-full h-full object-contain mx-auto my-auto rounded-2xl opacity-100 transition-opacity duration-300"
                loop
                muted
                playsInline
                // @ts-ignore
                webkit-playsinline="true"
                autoPlay
                preload="auto"
                controlsList="nodownload"
                disablePictureInPicture
                // @ts-ignore
                referrerPolicy="no-referrer"
                onCanPlay={markVideoReady}
                onCanPlayThrough={markVideoReady}
                onLoadedData={markVideoReady}
                onLoadedMetadata={markVideoReady}
                onPlaying={markVideoReady}
                onError={handleVideoError}
                onEnded={handleLoopEnd}
              />

              {/* Top Left Media badge */}
              {showBadge && (
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/70 text-white rounded-full text-[10px] font-bold tracking-wider backdrop-blur-md shadow-sm z-20 border border-white/10">
                  <span className={`w-1.5 h-1.5 rounded-full ${isPlaying && hasLoadedData ? 'bg-[#FF5F2E] animate-pulse' : 'bg-amber-400'}`}></span>
                  <span className="text-gray-200">عرض أداء التمرين</span>
                </div>
              )}

              {/* Play/Pause feedback Overlay when paused */}
              {!isPlaying && hasLoadedData && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] z-15 transition-all animate-fade-in">
                  <div className="p-4 bg-black/60 rounded-full border border-white/10 shadow-lg text-[#FF5F2E] scale-110">
                    <Pause className="w-8 h-8 fill-current" />
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
