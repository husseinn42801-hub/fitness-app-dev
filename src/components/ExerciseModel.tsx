import React, { useEffect, useRef, useState, useMemo } from 'react';
import Hls from 'hls.js';
import { EXERCISES_DB } from '../data/exercises';
import { Pause, Loader2, Video } from 'lucide-react';
import { videoCacheManager } from '../utils/videoCacheManager';

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
  const hlsRef = useRef<Hls | null>(null);
  const [isBuffering, setIsBuffering] = useState<boolean>(false);
  const [hasLoadedData, setHasLoadedData] = useState<boolean>(false);

  // Look up the exercise strictly by matching English name (nameEn) if provided, or fallback to animationType
  const exercise = useMemo(() => {
    return exerciseNameEn
      ? Object.values(EXERCISES_DB).find((ex) => ex.nameEn?.trim().toLowerCase() === exerciseNameEn.trim().toLowerCase())
      : Object.values(EXERCISES_DB).find((ex) => ex.animationType === type);
  }, [exerciseNameEn, type]);

  const rawVideoSource = mp4Url || exercise?.mp4Url || exercise?.videoUrl || '';
  const isHlsStream = Boolean(rawVideoSource && (rawVideoSource.includes('.m3u8') || rawVideoSource.includes('/hls/')));

  // Resolved video source for non-HLS streams (Blob URL or cached URL or original)
  const [activeSource, setActiveSource] = useState<string>(() => {
    if (isHlsStream) return rawVideoSource;
    return videoCacheManager.getCachedUrl(rawVideoSource);
  });

  // Resolve and cache video blob asynchronously for MP4 files
  useEffect(() => {
    let isCancelled = false;

    if (!rawVideoSource) {
      setActiveSource('');
      setHasLoadedData(true);
      setIsBuffering(false);
      return;
    }

    if (isHlsStream) {
      setActiveSource(rawVideoSource);
      return;
    }

    // Check if already in RAM blob cache
    const synchronousCached = videoCacheManager.getCachedUrl(rawVideoSource);
    if (synchronousCached !== rawVideoSource) {
      setActiveSource(synchronousCached);
    }

    // Fetch Blob URL in background
    videoCacheManager.getVideoBlobUrl(rawVideoSource).then((blobUrl) => {
      if (!isCancelled && blobUrl) {
        setActiveSource((prev) => (prev !== blobUrl ? blobUrl : prev));
      }
    }).catch(() => {});

    return () => {
      isCancelled = true;
    };
  }, [rawVideoSource, isHlsStream]);

  const markVideoReady = () => {
    setHasLoadedData(true);
    setIsBuffering(false);
  };

  // Setup HLS.js or native HTML5 video stream
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !activeSource) return;

    // Clean up any previous HLS instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    if (isHlsStream) {
      if (Hls.isSupported()) {
        const hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
          backBufferLength: 30,
          maxBufferLength: 20,
          capLevelToPlayerSize: true, // Automatically adapt stream bitrate to element size & network
        });
        hlsRef.current = hls;
        hls.loadSource(activeSource);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          markVideoReady();
          if (isPlaying) {
            video.play().catch(() => markVideoReady());
          }
        });

        hls.on(Hls.Events.ERROR, (_event, data) => {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                hls.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                hls.recoverMediaError();
                break;
              default:
                hls.destroy();
                break;
            }
          }
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Native Safari HLS support
        video.src = activeSource;
      }
    } else {
      // Standard MP4 / Cached Blob URL
      if (video.src !== activeSource) {
        video.src = activeSource;
      }
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [activeSource, isHlsStream]);

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
            markVideoReady();
          });
      }
    } else {
      video.pause();
    }
  }, [activeSource, isPlaying]);

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
          {/* Subtle loading spinner only when initial data is loading */}
          {!hasLoadedData && isBuffering && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-20 transition-opacity duration-200">
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="w-7 h-7 text-[#FF5F2E] animate-spin" />
                <span className="text-[10px] text-gray-300 font-bold">جاري تحميل عرض التمرين...</span>
              </div>
            </div>
          )}

          {/* HTML5 Video Element with Dual HLS & Hardware-Accelerated Blob Engine */}
          <video
            ref={videoRef}
            className="w-full h-full object-contain mx-auto my-auto rounded-2xl opacity-100 transition-opacity duration-300"
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
            onCanPlay={markVideoReady}
            onCanPlayThrough={markVideoReady}
            onLoadedData={markVideoReady}
            onLoadedMetadata={markVideoReady}
            onPlaying={markVideoReady}
            onWaiting={() => setIsBuffering(true)}
            onError={markVideoReady}
          />

          {/* Top Left Media badge */}
          {showBadge && (
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/70 text-white rounded-full text-[10px] font-bold tracking-wider backdrop-blur-md shadow-sm z-20 border border-white/10">
              <span className={`w-1.5 h-1.5 rounded-full ${isPlaying && hasLoadedData ? 'bg-[#FF5F2E] animate-pulse' : 'bg-amber-400'}`}></span>
              <span className="text-gray-200">
                {isHlsStream ? 'بث فائق الدقة (HLS)' : 'عرض أداء التمرين'}
              </span>
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
