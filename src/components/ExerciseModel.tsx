import React, { useEffect, useRef, useState, memo, useCallback } from 'react';
import { EXERCISES_DB } from '../data/exercises';
import { Pause, Loader2, Video } from 'lucide-react';

interface ExerciseModelProps {
  type: 'jumping-jacks' | 'squats' | 'crunches' | 'russian-twist' | 'plank' | 'leg-raises' | 'cobra-stretch';
  isPlaying?: boolean;
  mp4Url?: string;
  exerciseNameEn?: string;
  heightClass?: string;
  showBadge?: boolean;
}

export const ExerciseModel: React.FC<ExerciseModelProps> = memo(({ 
  type, 
  isPlaying = true, 
  mp4Url, 
  exerciseNameEn, 
  showBadge = true 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isBuffering, setIsBuffering] = useState<boolean>(true);
  const [hasLoadedData, setHasLoadedData] = useState<boolean>(false);
  const prevSourceRef = useRef<string>('');

  // Look up the exercise strictly by matching English name (nameEn) if provided, or fallback to animationType
  const exercise = exerciseNameEn
    ? Object.values(EXERCISES_DB).find((ex) => ex.nameEn?.trim().toLowerCase() === exerciseNameEn.trim().toLowerCase())
    : Object.values(EXERCISES_DB).find((ex) => ex.animationType === type);

  const videoSource = mp4Url || exercise?.mp4Url || exercise?.videoUrl || '';

  // Event handlers based on real HTML5 video state (no arbitrary timeouts)
  const handleReady = useCallback(() => {
    const video = videoRef.current;
    if (video && video.readyState >= 2) {
      setHasLoadedData(true);
      setIsBuffering(false);
    }
  }, []);

  const handlePlaying = useCallback(() => {
    setHasLoadedData(true);
    setIsBuffering(false);
  }, []);

  const handleBuffering = useCallback(() => {
    const video = videoRef.current;
    // Only show buffering if video hasn't loaded first frame or is actively waiting for data
    if (!video || video.readyState < 3) {
      setIsBuffering(true);
    }
  }, []);

  const handleError = useCallback(() => {
    // Graceful error fallback: stop spinning loader
    setHasLoadedData(true);
    setIsBuffering(false);
  }, []);

  // Load video ONLY when video source actually changes (prevent reload on re-render / timer ticks)
  useEffect(() => {
    if (!videoSource) {
      setHasLoadedData(true);
      setIsBuffering(false);
      prevSourceRef.current = '';
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    // Only reload if the source URL actually changed
    if (prevSourceRef.current !== videoSource) {
      prevSourceRef.current = videoSource;

      // Check if video is already ready from previous buffer/cache
      if (video.readyState >= 2) {
        setHasLoadedData(true);
        setIsBuffering(false);
      } else {
        setHasLoadedData(false);
        setIsBuffering(true);
      }

      if (isPlaying) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setHasLoadedData(true);
              setIsBuffering(false);
            })
            .catch(() => {
              // Browser autoplay policy or abort
            });
        }
      }
    }
  }, [videoSource, isPlaying]);

  // Synchronize play/pause state without reloading or resetting the video
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSource) return;

    if (isPlaying) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setHasLoadedData(true);
            setIsBuffering(false);
          })
          .catch(() => {});
      }
    } else {
      video.pause();
    }
  }, [isPlaying, videoSource]);

  // Handle seamless video loop without black flash
  const handleLoopEnd = useCallback(() => {
    const video = videoRef.current;
    if (video && videoSource) {
      video.currentTime = 0;
      if (isPlaying) {
        video.play().catch(() => {});
      }
    }
  }, [isPlaying, videoSource]);

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
          {/* Loading Spinner ONLY during actual initial buffering before frames are ready */}
          {!hasLoadedData && isBuffering && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-20 transition-opacity duration-200">
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="w-7 h-7 text-[#FF5F2E] animate-spin" />
                <span className="text-[10px] text-gray-300 font-bold">جاري تحميل عرض التمرين...</span>
              </div>
            </div>
          )}

          {/* HTML5 Video Element with High-Performance Mobile & WebView Attributes */}
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
            referrerPolicy="no-referrer"
            onCanPlay={handleReady}
            onLoadedData={handleReady}
            onPlaying={handlePlaying}
            onWaiting={handleBuffering}
            onStalled={handleBuffering}
            onError={handleError}
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
    </div>
  );
});
