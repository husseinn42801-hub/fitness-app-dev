import React, { useEffect, useRef, useState } from 'react';
import { EXERCISES_DB } from '../data/exercises';
import { Pause, Loader2, Video, Dumbbell, Maximize2, Minimize2 } from 'lucide-react';

interface ExerciseModelProps {
  type: 'jumping-jacks' | 'squats' | 'crunches' | 'russian-twist' | 'plank' | 'leg-raises' | 'cobra-stretch';
  isPlaying?: boolean;
  mp4Url?: string;
  exerciseNameEn?: string;
  heightClass?: string;
  onToggleFullscreen?: () => void;
  isFullscreen?: boolean;
}

export const ExerciseModel: React.FC<ExerciseModelProps> = ({ 
  type, 
  isPlaying = true, 
  mp4Url, 
  exerciseNameEn, 
  heightClass = 'h-52 sm:h-64',
  onToggleFullscreen,
  isFullscreen = false
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isBuffering, setIsBuffering] = useState<boolean>(true);
  const [hasLoadedData, setHasLoadedData] = useState<boolean>(false);

  // Look up the exercise strictly by matching English name (nameEn) if provided, or fallback to animationType
  const exercise = exerciseNameEn
    ? Object.values(EXERCISES_DB).find((ex) => ex.nameEn?.trim().toLowerCase() === exerciseNameEn.trim().toLowerCase())
    : Object.values(EXERCISES_DB).find((ex) => ex.animationType === type);

  const videoSource = mp4Url || exercise?.mp4Url || exercise?.videoUrl || '';

  const markVideoReady = () => {
    setHasLoadedData(true);
    setIsBuffering(false);
  };

  // Load and play video when source URL changes
  useEffect(() => {
    if (!videoSource) {
      setHasLoadedData(true);
      setIsBuffering(false);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    setHasLoadedData(false);
    setIsBuffering(true);

    // Fast Safety Timeout: ensure loading spinner disappears within 1 second MAX under any network condition
    const timer = setTimeout(() => {
      markVideoReady();
    }, 1000);

    try {
      video.load();
      if (isPlaying) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              markVideoReady();
            })
            .catch(() => {
              markVideoReady();
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
  }, [videoSource]);

  // Synchronize play/pause state without resetting or re-loading video source
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSource) return;

    if (isPlaying) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            markVideoReady();
          })
          .catch(() => {
            markVideoReady();
          });
      }
    } else {
      video.pause();
    }
  }, [isPlaying, videoSource]);

  // Handle seamless video loop without reload or black screen flash
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
      className={`relative w-full ${heightClass} flex items-center justify-center bg-gradient-to-b from-[#1C1816] via-[#120F0D] to-[#0A0807] rounded-3xl border-2 border-white/10 ring-1 ring-white/10 overflow-hidden shadow-2xl group`}
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
          {/* Loading Spinner ONLY if video data hasn't loaded yet AND within early buffering phase */}
          {!hasLoadedData && isBuffering && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-20 transition-opacity duration-200">
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="w-7 h-7 text-[#FF5F2E] animate-spin" />
                <span className="text-[10px] text-gray-300 font-bold">جاري تحميل عرض التمرين...</span>
              </div>
            </div>
          )}

          {/* HTML5 Video Element with High-Performance Mobile & Web Attributes - Seamless Loop */}
          {videoSource ? (
            <video
              ref={videoRef}
              src={videoSource}
            className="absolute inset-0 w-full h-full object-cover rounded-3xl opacity-100 transition-opacity duration-300"
            loop
            muted
            playsInline
            // @ts-ignore
            webkit-playsinline="true"
            autoPlay
            preload="auto"
            controlsList="nodownload"
            disablePictureInPicture
            referrerPolicy="no-referrer"
            onCanPlay={markVideoReady}
            onCanPlayThrough={markVideoReady}
            onLoadedData={markVideoReady}
            onLoadedMetadata={markVideoReady}
            onPlaying={markVideoReady}
            onTimeUpdate={markVideoReady}
            onError={markVideoReady}
            onEnded={handleLoopEnd}
          />
          ) : null}

          {/* Top Left Media badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/70 text-white rounded-full text-[10px] font-bold tracking-wider backdrop-blur-md shadow-sm z-20 border border-white/10">
            <span className={`w-1.5 h-1.5 rounded-full ${isPlaying && hasLoadedData ? 'bg-[#FF5F2E] animate-pulse' : 'bg-amber-400'}`}></span>
            <span className="text-gray-200">عرض أداء التمرين</span>
          </div>

          {/* Play/Pause feedback Overlay when paused */}
          {!isPlaying && hasLoadedData && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] z-15 transition-all animate-fade-in">
              <div className="p-4 bg-black/60 rounded-full border border-white/10 shadow-lg text-[#FF5F2E] scale-110">
                <Pause className="w-8 h-8 fill-current" />
              </div>
            </div>
          )}

          {/* YouTube-style Fullscreen Toggle Button - Bottom Right */}
          {onToggleFullscreen && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFullscreen();
              }}
              className="absolute bottom-3 right-3 flex items-center justify-center p-2 rounded-xl bg-black/75 hover:bg-[#FF5F2E] text-white backdrop-blur-md border border-white/20 shadow-lg transition-all hover:scale-110 active:scale-95 z-30 cursor-pointer group/fs"
              title={isFullscreen ? "تصغير الشاشة (Portrait)" : "تكبير الشاشة (Fullscreen / Landscape)"}
              type="button"
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4 text-white group-hover/fs:rotate-90 transition-transform" />
              ) : (
                <Maximize2 className="w-4 h-4 text-white group-hover/fs:scale-110 transition-transform" />
              )}
            </button>
          )}
        </>
      )}
    </div>
  );
};
