import React, { useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';

export const WORKOUT_LEVEL_IMAGE_URLS = [
  'https://pub-20b9769bcd4d4837866658db8f318f37.r2.dev/%D8%B5%D9%88%D8%B1%20%D9%85%D8%B3%D8%AA%D9%88%D9%8A%D8%A7%D8%AA%20%D8%A7%D9%84%D8%AA%D9%85%D8%A7%D8%B1%D9%8A%D9%86%20%D9%81%D9%8A%20%D8%B4%D8%A7%D8%B4%D8%A9%20%D8%A7%D9%84%D8%A8%D8%AF%D8%A7%D9%8A%D8%A9/1-%20Simple.webp',
  'https://pub-20b9769bcd4d4837866658db8f318f37.r2.dev/%D8%B5%D9%88%D8%B1%20%D9%85%D8%B3%D8%AA%D9%88%D9%8A%D8%A7%D8%AA%20%D8%A7%D9%84%D8%AA%D9%85%D8%A7%D8%B1%D9%8A%D9%86%20%D9%81%D9%8A%20%D8%B4%D8%A7%D8%B4%D8%A9%20%D8%A7%D9%84%D8%A8%D8%AF%D8%A7%D9%8A%D8%A9/2-%20Average.webp',
  'https://pub-20b9769bcd4d4837866658db8f318f37.r2.dev/%D8%B5%D9%88%D8%B1%20%D9%85%D8%B3%D8%AA%D9%88%D9%8A%D8%A7%D8%AA%20%D8%A7%D9%84%D8%AA%D9%85%D8%A7%D8%B1%D9%8A%D9%86%20%D9%81%D9%8A%20%D8%B4%D8%A7%D8%B4%D8%A9%20%D8%A7%D9%84%D8%A8%D8%AF%D8%A7%D9%8A%D8%A9/3-%20Advanced.webp',
  'https://pub-20b9769bcd4d4837866658db8f318f37.r2.dev/%D8%B5%D9%88%D8%B1%20%D9%85%D8%B3%D8%AA%D9%88%D9%8A%D8%A7%D8%AA%20%D8%A7%D9%84%D8%AA%D9%85%D8%A7%D8%B1%D9%8A%D9%86%20%D9%81%D9%8A%20%D8%B4%D8%A7%D8%B4%D8%A9%20%D8%A7%D9%84%D8%A8%D8%AF%D8%A7%D9%8A%D8%A9/4-%20Difficult.webp'
];

export const preloadWorkoutLevelImages = () => {
  if (typeof window === 'undefined') return;
  WORKOUT_LEVEL_IMAGE_URLS.forEach((url) => {
    const img = new Image();
    img.src = encodeURI(decodeURI(url));
  });
};

// Immediate background preloading trigger on module import
if (typeof window !== 'undefined') {
  preloadWorkoutLevelImages();
}

interface WorkoutLevelsDiagramProps {
  isDark?: boolean;
}

export const WorkoutLevelsDiagram: React.FC<WorkoutLevelsDiagramProps> = ({ isDark = true }) => {
  useEffect(() => {
    preloadWorkoutLevelImages();
  }, []);

  const levels = [
    {
      num: '1',
      title: 'بسيط',
      desc: 'تمارين بسيطة لبداية رحلتك ولياقتك',
      ringColor: '#22c55e',
      glowShadow: 'rgba(34, 197, 94, 0.45)',
      badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/50',
      badgeGlow: '0 0 10px rgba(34, 197, 94, 0.3)',
      imageUrl: WORKOUT_LEVEL_IMAGE_URLS[0],
      imgScale: 'scale-100'
    },
    {
      num: '2',
      title: 'متوسط',
      desc: 'تمارين متوسطة لبناء اللياقة والقدرة',
      ringColor: '#eab308',
      glowShadow: 'rgba(234, 179, 8, 0.45)',
      badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/50',
      badgeGlow: '0 0 10px rgba(234, 179, 8, 0.3)',
      imageUrl: WORKOUT_LEVEL_IMAGE_URLS[1],
      imgScale: 'scale-100'
    },
    {
      num: '3',
      title: 'متقدم',
      desc: 'تمارين متقدمة لتطوير القوة والقدرة',
      ringColor: '#FF5F2E',
      glowShadow: 'rgba(255, 95, 46, 0.45)',
      badgeBg: 'bg-[#FF5F2E]/10 text-[#FF5F2E] border-[#FF5F2E]/50',
      badgeGlow: '0 0 10px rgba(255, 95, 46, 0.3)',
      imageUrl: WORKOUT_LEVEL_IMAGE_URLS[2],
      imgScale: 'scale-[0.82]'
    },
    {
      num: '4',
      title: 'صعب',
      desc: 'تمارين عالية الشدة لتحدي حدودك',
      ringColor: '#ef4444',
      glowShadow: 'rgba(239, 68, 68, 0.45)',
      badgeBg: 'bg-red-500/10 text-red-400 border-red-500/50',
      badgeGlow: '0 0 10px rgba(239, 68, 68, 0.3)',
      imageUrl: WORKOUT_LEVEL_IMAGE_URLS[3],
      imgScale: 'scale-100'
    }
  ];

  return (
    <div className={`p-3.5 sm:p-5 rounded-2xl border relative overflow-hidden transition-all ${
      isDark 
        ? 'bg-gradient-to-b from-[#161619] to-[#0d0d0f] border-white/10 shadow-2xl shadow-black/80' 
        : 'bg-gradient-to-b from-white to-gray-50 border-gray-200 shadow-md'
    }`} dir="rtl">
      
      {/* Background Ambient Neon Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#FF5F2E]/10 via-transparent to-transparent pointer-events-none" />

      {/* Header Banner */}
      <div className="text-center space-y-1 mb-4 relative z-10">
        <h3 className={`text-xs sm:text-sm font-black tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
          <span>مراحل التمارين </span>
          <span className="text-emerald-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]">من السهل </span>
          <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>إلى </span>
          <span className="text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">الصعب</span>
        </h3>
      </div>

      {/* Main Diagram Area */}
      <div className="relative z-10 space-y-3">

        {/* Top 4 Glowing Circles with Custom Level Images */}
        <div className="grid grid-cols-4 gap-1 sm:gap-2">
          {levels.map((lvl) => (
            <div key={`top-${lvl.num}`} className="flex justify-center">
              <div 
                className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center backdrop-blur-md transition-transform hover:scale-105"
                style={{
                  boxShadow: `0 0 16px ${lvl.glowShadow}, inset 0 0 10px ${lvl.glowShadow}`,
                  border: `2px solid ${lvl.ringColor}`,
                  background: isDark ? 'rgba(10, 10, 12, 0.85)' : 'rgba(255, 255, 255, 0.9)'
                }}
              >
                {/* Inner clipped circle for the image */}
                <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-black/20">
                  <img 
                    src={encodeURI(decodeURI(lvl.imageUrl))} 
                    alt={lvl.title} 
                    className={`w-full h-full object-cover rounded-full transition-transform ${lvl.imgScale || 'scale-100'}`}
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== lvl.imageUrl) {
                        target.src = lvl.imageUrl;
                      }
                    }}
                  />
                </div>

                {/* Dashed outer orbit ring effect */}
                <div 
                  className="absolute -inset-1.5 rounded-full border border-dashed opacity-70 animate-[spin_20s_linear_infinite] pointer-events-none"
                  style={{ borderColor: lvl.ringColor }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Continuous Neon Progress Bar Track with Numbers & Chevrons */}
        <div className="relative py-2 my-1">
          
          {/* Main Glowing Slanted / Pill Track Frame */}
          <div 
            className="w-full h-10 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-between px-2 sm:px-4 relative border overflow-hidden backdrop-blur-md"
            style={{
              background: isDark 
                ? 'linear-gradient(90deg, rgba(34,197,94,0.12) 0%, rgba(234,179,8,0.12) 33%, rgba(255,95,46,0.12) 66%, rgba(239,68,68,0.12) 100%)' 
                : 'linear-gradient(90deg, rgba(34,197,94,0.08) 0%, rgba(234,179,8,0.08) 33%, rgba(255,95,46,0.08) 66%, rgba(239,68,68,0.08) 100%)',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0,0,0,0.15)',
              boxShadow: '0 0 20px rgba(255, 95, 46, 0.15)'
            }}
          >
            {/* Horizontal glowing gradient line inside track */}
            <div 
              className="absolute inset-x-2 top-1/2 -translate-y-1/2 h-1.5 rounded-full opacity-70 z-0"
              style={{
                background: 'linear-gradient(to left, #22c55e 0%, #eab308 35%, #FF5F2E 70%, #ef4444 100%)'
              }}
            />

            {/* 4 Nodes and Inter-node Chevrons */}
            {levels.map((lvl, idx) => (
              <React.Fragment key={`track-${lvl.num}`}>
                
                {/* Node Circle Number */}
                <div className="relative z-10 flex items-center justify-center">
                  <div 
                    className="w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-black font-mono text-xs sm:text-sm text-white shadow-lg border-2 transition-all transform hover:scale-110"
                    style={{
                      borderColor: '#ffffff',
                      backgroundColor: lvl.ringColor,
                      boxShadow: `0 0 14px ${lvl.ringColor}, inset 0 0 6px rgba(0,0,0,0.4)`
                    }}
                  >
                    {lvl.num}
                  </div>
                </div>

                {/* Chevron arrows indicator between nodes */}
                {idx < levels.length - 1 && (
                  <div className="relative z-10 flex items-center justify-center gap-0.5 opacity-80 scale-75 sm:scale-100">
                    <ChevronLeft className="w-3.5 h-3.5 text-white animate-pulse" style={{ color: levels[idx + 1].ringColor }} />
                    <ChevronLeft className="w-3.5 h-3.5 text-white opacity-70" style={{ color: levels[idx + 1].ringColor }} />
                    <ChevronLeft className="w-3.5 h-3.5 text-white opacity-40" style={{ color: levels[idx + 1].ringColor }} />
                  </div>
                )}

              </React.Fragment>
            ))}

          </div>
        </div>

        {/* Bottom Level Badges & Descriptions Grid */}
        <div className="grid grid-cols-4 gap-1 sm:gap-2 pt-0.5">
          {levels.map((lvl) => (
            <div key={`bottom-${lvl.num}`} className="flex flex-col items-center text-center space-y-1">
              
              {/* Glowing Pill Badge */}
              <div 
                className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-black border w-full max-w-[65px] sm:max-w-[80px] truncate ${lvl.badgeBg}`}
                style={{ boxShadow: lvl.badgeGlow }}
              >
                {lvl.title}
              </div>

              {/* Description */}
              <p className={`text-[8px] sm:text-[9.5px] leading-tight font-medium max-w-[75px] sm:max-w-[100px] ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {lvl.desc}
              </p>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
