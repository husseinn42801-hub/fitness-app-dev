import React, { useEffect, useRef, useState, useMemo } from 'react';
import { EXERCISES_DB } from '../data/exercises';
import { Pause, Loader2, Video, Sparkles } from 'lucide-react';
import { videoCacheManager } from '../utils/videoCacheManager';

interface ExerciseModelProps {
  type: 'jumping-jacks' | 'squats' | 'crunches' | 'russian-twist' | 'plank' | 'leg-raises' | 'cobra-stretch';
  isPlaying?: boolean;
  mp4Url?: string;
  exerciseNameEn?: string;
  heightClass?: string;
  showBadge?: boolean;
  onVideoReady?: () => void;
  onLoadingChange?: (isLoading: boolean) => void;
}

export const ExerciseModel: React.FC<ExerciseModelProps> = ({ 
  type, 
  isPlaying = true, 
  mp4Url, 
  exerciseNameEn, 
  showBadge = true,
  onVideoReady,
  onLoadingChange
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Look up the exercise strictly by matching English name (nameEn) if provided, or fallback to animationType
  const exercise = useMemo(() => {
    return exerciseNameEn
      ? Object.values(EXERCISES_DB).find((ex) => ex.nameEn?.trim().toLowerCase() === exerciseNameEn.trim().toLowerCase())
      : Object.values(EXERCISES_DB).find((ex) => ex.animationType === type);
  }, [exerciseNameEn, type]);

  const rawVideoSource = mp4Url || exercise?.mp4Url || exercise?.videoUrl || '';

  // Initial state based on whether this URL is already cached/ready in RAM
  const [isCachedInitially] = useState<boolean>(() => videoCacheManager.isCached(rawVideoSource));
  const [hasLoadedData, setHasLoadedData] = useState<boolean>(isCachedInitially);
  const [isBuffering, setIsBuffering] = useState<boolean>(!isCachedInitially && Boolean(rawVideoSource));
  const [hasError, setHasError] = useState<boolean>(false);

  // Resolved video source (Blob URL or cached URL or original)
  const [activeSource, setActiveSource] = useState<string>(() => {
    return videoCacheManager.getCachedUrl(rawVideoSource);
  });

  const onVideoReadyRef = useRef(onVideoReady);
  const onLoadingChangeRef = useRef(onLoadingChange);

  useEffect(() => {
    onVideoReadyRef.current = onVideoReady;
    onLoadingChangeRef.current = onLoadingChange;
  }, [onVideoReady, onLoadingChange]);

  // Mark video as ready and notify parents
  const markVideoReady = () => {
    setHasLoadedData(true);
    setIsBuffering(false);
    setHasError(false);
    onLoadingChangeRef.current?.(false);
    onVideoReadyRef.current?.();
  };

  // Resolve and cache video blob asynchronously when rawVideoSource changes
  useEffect(() => {
    let isCancelled = false;

    if (!rawVideoSource) {
      setActiveSource('');
      setHasLoadedData(true);
      setIsBuffering(false);
      setHasError(false);
      onLoadingChangeRef.current?.(false);
      return;
    }

    // Check if the current source is already ready in RAM
    const isReadyInRam = videoCacheManager.isCached(rawVideoSource);
    if (!isReadyInRam) {
      setHasLoadedData(false);
      setIsBuffering(true);
      onLoadingChangeRef.current?.(true);
    } else {
      setHasLoadedData(true);
      setIsBuffering(false);
      onLoadingChangeRef.current?.(false);
    }

    // Fetch or verify Blob URL in background
    videoCacheManager.getVideoBlobUrl(rawVideoSource).then((blobUrl) => {
      if (!isCancelled && blobUrl) {
        setActiveSource((prev) => (prev !== blobUrl ? blobUrl : prev));
      }
    }).catch(() => {});

    // Pre-buffer HTML5 element in memory
    videoCacheManager.prepareVideoElement(rawVideoSource).then(() => {
      if (!isCancelled && videoRef.current && videoRef.current.readyState >= 2) {
        markVideoReady();
      }
    });

    // Safety timeout: Ensure loading screen never hangs more than 3.5 seconds
    const safetyTimer = setTimeout(() => {
      if (!isCancelled) {
        markVideoReady();
      }
    }, 3500);

    return () => {
      isCancelled = true;
      clearTimeout(safetyTimer);
    };
  }, [rawVideoSource]);

  // Direct Event Listeners on HTML5 Video Element for optimal reliability
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !activeSource) return;

    // Check if readyState is already satisfactory
    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      markVideoReady();
    }

    const handleLoadStart = () => {
      if (!videoCacheManager.isCached(rawVideoSource)) {
        setIsBuffering(true);
        onLoadingChangeRef.current?.(true);
      }
    };

    const handleLoadedData = () => {
      markVideoReady();
    };

    const handleCanPlay = () => {
      markVideoReady();
    };

    const handleCanPlayThrough = () => {
      markVideoReady();
    };

    const handlePlaying = () => {
      markVideoReady();
    };

    const handleWaiting = () => {
      setIsBuffering(true);
    };

    const handleError = () => {
      console.warn('Video failed to load source:', activeSource);
      setHasError(true);
      markVideoReady(); // Unblock UI so user can still see fallback
    };

    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('loadedmetadata', handleLoadedData);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('canplaythrough', handleCanPlayThrough);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('stalled', handleWaiting);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('loadedmetadata', handleLoadedData);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('stalled', handleWaiting);
      video.removeEventListener('error', handleError);
    };
  }, [activeSource, rawVideoSource]);

  // Playback control when active source or isPlaying changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !activeSource) return;

    // Guarantee mute for zero-latency autoplay on iOS/Android
    video.muted = true;
    video.defaultMuted = true;

    if (isPlaying) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            markVideoReady();
          })
          .catch(() => {
            // Autoplay safety catch
            markVideoReady();
          });
      }
    } else {
      video.pause();
    }
  }, [activeSource, isPlaying]);

  const showLoadingOverlay = Boolean(rawVideoSource && (!hasLoadedData || isBuffering) && !hasError);

  return (
    <div 
      className="relative w-full aspect-square max-w-[260px] xs:max-w-[280px] sm:max-w-[300px] mx-auto flex items-center justify-center bg-[#0D0A08] rounded-2xl border-2 border-white/10 ring-1 ring-white/10 overflow-hidden shadow-xl group"
      style={{
        WebkitMaskImage: '-webkit-radial-gradient(white, black)',
        transform: 'translateZ(0)',
      }}
    >
      {!rawVideoSource ? (
        <div className="flex flex-col items-center justify-center text-center p-6 space-y-3 z-10">
          <div className="w-14 h-14 rounded-2xl bg-[#FF5F2E]/10 border border-[#FF5F2E]/30 flex items-center justify-center text-[#FF5F2E] shadow-lg shadow-[#FF5F2E]/10">
            <Video className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-black text-white">
              {exercise?.nameAr || 'تمرين رياضي'}
            </h4>
            <p className="text-[11px] text-gray-400 font-medium">
              في انتظار إضافة رابط الفيديو الجديد...
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Subtle high-precision loading overlay during video preparation */}
          {showLoadingOverlay && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0D0A08]/90 backdrop-blur-md z-30 transition-opacity duration-300">
              <div className="relative flex items-center justify-center mb-3">
                <div className="absolute w-12 h-12 rounded-full bg-[#FF5F2E]/20 animate-ping" />
                <div className="w-11 h-11 rounded-full bg-[#FF5F2E]/15 border border-[#FF5F2E]/30 flex items-center justify-center">
                  <Loader2 className="w-6 h-6 text-[#FF5F2E] animate-spin" />
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
                <span className="text-[10px] text-gray-200 font-bold">جاري تجهيز عرض التمرين...</span>
              </div>
            </div>
          )}

          {/* HTML5 Video Element with Native Hardware Acceleration & Fluid Looping */}
          {activeSource && (
            <video
              ref={videoRef}
              key={activeSource}
              src={activeSource}
              className={`w-full h-full object-contain mx-auto my-auto rounded-2xl transition-opacity duration-300 ${
                hasLoadedData ? 'opacity-100' : 'opacity-0'
              }`}
              loop
              muted
              autoPlay
              playsInline
              // @ts-ignore
              webkit-playsinline="true"
              x5-playsinline="true"
              preload="auto"
              controlsList="nodownload nofullscreen noremoteplayback"
              disablePictureInPicture
              // @ts-ignore
              disableRemotePlayback
              referrerPolicy="no-referrer"
            />
          )}

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
};
