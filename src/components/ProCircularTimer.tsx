import React from 'react';
import { motion } from 'motion/react';

interface ProCircularTimerProps {
  value: number;
  total: number;
  label?: string;
  subLabel?: string;
  theme?: 'orange' | 'sky' | 'emerald';
  isDark?: boolean;
  size?: number; // size in px
}

export const ProCircularTimer: React.FC<ProCircularTimerProps> = ({
  value,
  total,
  label,
  subLabel = 'ثانية',
  theme = 'orange',
  isDark = true,
  size = 96
}) => {
  const safeTotal = total > 0 ? total : 30;
  const progress = Math.max(0, Math.min(1, value / safeTotal));
  
  const radius = 40;
  const strokeWidth = 5.5;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  const themeColors = {
    orange: {
      gradientId: `grad-orange-${size}`,
      startColor: '#FFA03A',
      endColor: '#FF5F2E',
      glowBg: 'bg-[#FF5F2E]/15',
      shadow: 'drop-shadow-[0_0_10px_rgba(255,95,46,0.4)]',
      textColor: 'text-[#FF5F2E]',
      badgeBg: 'bg-[#FF5F2E]/10',
    },
    sky: {
      gradientId: `grad-sky-${size}`,
      startColor: '#38BDF8',
      endColor: '#0EA5E9',
      glowBg: 'bg-sky-500/15',
      shadow: 'drop-shadow-[0_0_10px_rgba(14,165,233,0.4)]',
      textColor: 'text-sky-400',
      badgeBg: 'bg-sky-500/10',
    },
    emerald: {
      gradientId: `grad-emerald-${size}`,
      startColor: '#34D399',
      endColor: '#10B981',
      glowBg: 'bg-emerald-500/15',
      shadow: 'drop-shadow-[0_0_10px_rgba(16,185,129,0.4)]',
      textColor: 'text-emerald-400',
      badgeBg: 'bg-emerald-500/10',
    },
  }[theme];

  return (
    <div 
      className="relative flex items-center justify-center group shrink-0 select-none"
      style={{ width: size, height: size }}
    >
      {/* Soft Ambient Glowing Backlight */}
      <motion.div 
        className={`absolute inset-1 rounded-full ${themeColors.glowBg} blur-md`}
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* SVG Ring Container */}
      <svg 
        className={`relative w-full h-full transform -rotate-90 ${themeColors.shadow}`} 
        viewBox="0 0 100 100"
      >
        <defs>
          <linearGradient id={themeColors.gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={themeColors.startColor} />
            <stop offset="100%" stopColor={themeColors.endColor} />
          </linearGradient>
        </defs>

        {/* Tech Outer Micro-Dash Ring */}
        <circle 
          cx="50" 
          cy="50" 
          r="46" 
          stroke={isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"} 
          strokeWidth="1.2" 
          strokeDasharray="2 3" 
          fill="transparent" 
        />

        {/* Track Base Circle */}
        <circle 
          cx="50" 
          cy="50" 
          r={radius} 
          stroke={isDark ? "rgba(255,255,255,0.08)" : "#E5E7EB"} 
          strokeWidth={strokeWidth} 
          fill="transparent" 
        />

        {/* Animated Smooth Progress Arc */}
        <motion.circle 
          cx="50" 
          cy="50" 
          r={radius} 
          stroke={`url(#${themeColors.gradientId})`} 
          strokeWidth={strokeWidth} 
          strokeLinecap="round"
          fill="transparent" 
          strokeDasharray={circumference}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.9, ease: "linear" }}
        />
      </svg>

      {/* Central HUD Display with smooth tick pulse */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
        {label && (
          <span className={`text-[8px] font-extrabold tracking-widest uppercase mb-0.5 ${themeColors.textColor}`}>
            {label}
          </span>
        )}
        
        <motion.span
          key={value}
          initial={{ scale: 1.12, opacity: 0.9 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={`text-2xl sm:text-3xl font-black font-mono leading-none tracking-tight ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          {value}
        </motion.span>

        {subLabel && (
          <span className="text-[8px] font-bold text-gray-400 mt-0.5">
            {subLabel}
          </span>
        )}
      </div>
    </div>
  );
};
