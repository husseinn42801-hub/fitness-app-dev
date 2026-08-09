import React from 'react';
import { motion } from 'motion/react';

interface HudBannerTimerProps {
  value: number;
  total?: number;
  label?: string;
  theme?: 'orange' | 'cyan' | 'emerald';
  isDark?: boolean;
  className?: string;
}

export const HudBannerTimer: React.FC<HudBannerTimerProps> = ({
  value,
  total = 15,
  label = '',
  theme = 'orange',
  isDark = true,
  className = ''
}) => {
  const safeTotal = total > 0 ? total : 15;
  const progress = Math.max(0, Math.min(1, value / safeTotal));

  // Theme color configurations
  const themeStyles = {
    orange: {
      primary: '#FF5F2E',
      secondary: '#FF912E',
      glow: 'rgba(255, 95, 46, 0.6)',
      glowSoft: 'rgba(255, 95, 46, 0.25)',
      darkBg: '#0D0805',
      centerBg: '#180E09',
      gradId: 'hud-grad-orange',
      textAccent: 'text-[#FF5F2E]',
      shadowFilter: 'drop-shadow(0px 0px 8px rgba(255,95,46,0.6))',
    },
    cyan: {
      primary: '#00F2FE',
      secondary: '#00A8FF',
      glow: 'rgba(0, 242, 254, 0.6)',
      glowSoft: 'rgba(0, 242, 254, 0.25)',
      darkBg: '#050B14',
      centerBg: '#091322',
      gradId: 'hud-grad-cyan',
      textAccent: 'text-[#00F2FE]',
      shadowFilter: 'drop-shadow(0px 0px 8px rgba(0,242,254,0.6))',
    },
    emerald: {
      primary: '#10B981',
      secondary: '#34D399',
      glow: 'rgba(16, 185, 129, 0.6)',
      glowSoft: 'rgba(16, 185, 129, 0.25)',
      darkBg: '#040F0A',
      centerBg: '#081C13',
      gradId: 'hud-grad-emerald',
      textAccent: 'text-emerald-400',
      shadowFilter: 'drop-shadow(0px 0px 8px rgba(16,185,129,0.6))',
    }
  }[theme];

  return (
    <div className={`relative flex flex-col items-center justify-center select-none w-full max-w-[250px] xs:max-w-[280px] sm:max-w-[310px] mx-auto ${className}`}>
      
      {/* Outer ambient glow backlight */}
      <div 
        className="absolute inset-0 rounded-3xl blur-xl transition-all duration-500 opacity-60 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${themeStyles.glow} 0%, transparent 70%)`
        }}
      />

      {/* Main SVG Sci-Fi HUD Banner Container */}
      <div className="relative w-full aspect-[400/100] flex items-center justify-center">
        <svg 
          viewBox="0 0 400 100" 
          className="w-full h-full overflow-visible"
          style={{ filter: themeStyles.shadowFilter }}
        >
          <defs>
            {/* Gradient for Chevrons & Borders */}
            <linearGradient id={themeStyles.gradId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={themeStyles.primary} />
              <stop offset="100%" stopColor={themeStyles.secondary} />
            </linearGradient>

            {/* Inactive Dark Chevron Fill */}
            <linearGradient id="hud-chevron-dark" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isDark ? "#222" : "#CBD5E1"} />
              <stop offset="100%" stopColor={isDark ? "#111" : "#94A3B8"} />
            </linearGradient>

            {/* Glowing filter for bars */}
            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. Outer Hexagonal Frame Path */}
          <path
            d="M 45 12 
               L 145 12 
               L 152 17 
               L 248 17 
               L 255 12 
               L 355 12 
               L 388 50 
               L 355 88 
               L 255 88 
               L 248 83 
               L 152 83 
               L 145 88 
               L 45 88 
               L 12 50 Z"
            fill={isDark ? themeStyles.darkBg : "#F8FAFC"}
            stroke={themeStyles.primary}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Inner Accent Hairline Border */}
          <path
            d="M 49 16 
               L 143 16 
               L 150 20 
               L 250 20 
               L 257 16 
               L 351 16 
               L 382 50 
               L 351 84 
               L 257 84 
               L 250 80 
               L 150 80 
               L 143 84 
               L 49 84 
               L 18 50 Z"
            fill="none"
            stroke={themeStyles.primary}
            strokeWidth="0.8"
            strokeOpacity="0.4"
          />

          {/* 2. CENTER NUMBER BOX */}
          <path
            d="M 148 18 
               L 252 18 
               L 242 82 
               L 158 82 Z"
            fill={isDark ? themeStyles.centerBg : "#FFFFFF"}
            stroke={isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)"}
            strokeWidth="1.5"
          />

          {/* 3. TOP & BOTTOM GLOWING HORIZONTAL ACCENT BARS */}
          <line 
            x1="150" y1="12" 
            x2="250" y2="12" 
            stroke={themeStyles.primary} 
            strokeWidth="4" 
            strokeLinecap="round"
            filter="url(#neonGlow)"
          />
          <line 
            x1="150" y1="88" 
            x2="250" y2="88" 
            stroke={themeStyles.primary} 
            strokeWidth="4" 
            strokeLinecap="round"
            filter="url(#neonGlow)"
          />

          {/* 4. LEFT CHEVRONS (3 Chevron Arrows pointing left: <<<) */}
          {/* Chevron 1 (Leftmost) */}
          <path
            d="M 68 22 L 32 50 L 68 78 L 88 78 L 52 50 L 88 22 Z"
            fill={progress > 0.1 ? `url(#${themeStyles.gradId})` : "url(#hud-chevron-dark)"}
            stroke={isDark ? "#000" : "#FFF"}
            strokeWidth="1"
          />
          {/* Chevron 2 (Middle Left) */}
          <path
            d="M 96 22 L 60 50 L 96 78 L 116 78 L 80 50 L 116 22 Z"
            fill={progress > 0.4 ? `url(#${themeStyles.gradId})` : "url(#hud-chevron-dark)"}
            stroke={isDark ? "#000" : "#FFF"}
            strokeWidth="1"
          />
          {/* Chevron 3 (Inner Left) */}
          <path
            d="M 124 22 L 88 50 L 124 78 L 144 78 L 108 50 L 144 22 Z"
            fill={progress > 0.7 ? `url(#${themeStyles.gradId})` : "url(#hud-chevron-dark)"}
            stroke={isDark ? "#000" : "#FFF"}
            strokeWidth="1"
          />

          {/* 5. RIGHT CHEVRONS (3 Chevron Arrows pointing right: >>>) */}
          {/* Chevron 3 (Inner Right) */}
          <path
            d="M 276 22 L 312 50 L 276 78 L 256 78 L 292 50 L 256 22 Z"
            fill={progress > 0.7 ? `url(#${themeStyles.gradId})` : "url(#hud-chevron-dark)"}
            stroke={isDark ? "#000" : "#FFF"}
            strokeWidth="1"
          />
          {/* Chevron 2 (Middle Right) */}
          <path
            d="M 304 22 L 340 50 L 304 78 L 284 78 L 320 50 L 284 22 Z"
            fill={progress > 0.4 ? `url(#${themeStyles.gradId})` : "url(#hud-chevron-dark)"}
            stroke={isDark ? "#000" : "#FFF"}
            strokeWidth="1"
          />
          {/* Chevron 1 (Rightmost) */}
          <path
            d="M 332 22 L 368 50 L 332 78 L 312 78 L 348 50 L 312 22 Z"
            fill={progress > 0.1 ? `url(#${themeStyles.gradId})` : "url(#hud-chevron-dark)"}
            stroke={isDark ? "#000" : "#FFF"}
            strokeWidth="1"
          />
        </svg>

        {/* Overlay HTML text for smooth animated countdown number */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
          <motion.span
            key={value}
            initial={{ scale: 1.25, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className={`text-2xl xs:text-3xl sm:text-4xl font-black font-mono tracking-tight leading-none ${
              isDark ? 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]' : 'text-gray-900'
            }`}
          >
            {value}
          </motion.span>
        </div>
      </div>

      {/* Optional Label underneath or above */}
      {label && (
        <span className={`text-[10px] sm:text-xs font-black tracking-widest uppercase mt-1 ${themeStyles.textAccent}`}>
          {label}
        </span>
      )}
    </div>
  );
};
