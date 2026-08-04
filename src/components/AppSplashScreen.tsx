import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Flame } from 'lucide-react';
// @ts-ignore
import onboardingBg from '../assets/images/onboarding_bg_1784266836754.jpg';
// @ts-ignore
import appIcon from '../assets/images/app_icon_1784528616960.jpg';

// Instant image preloader for zero-delay splash screen render
if (typeof window !== 'undefined') {
  try {
    if (onboardingBg && typeof onboardingBg === 'string' && onboardingBg.trim() !== '') {
      const bgImg = new Image();
      bgImg.src = onboardingBg;
    }
    if (appIcon && typeof appIcon === 'string' && appIcon.trim() !== '') {
      const iconImg = new Image();
      iconImg.src = appIcon;
    }
  } catch (e) {}
}

interface AppSplashScreenProps {
  onComplete: () => void;
  isDark?: boolean;
}

export const AppSplashScreen: React.FC<AppSplashScreenProps> = ({ onComplete, isDark = false }) => {
  const [isSplashFading, setIsSplashFading] = useState<boolean>(false);

  useEffect(() => {
    // Start fading out 1 second before completion (at 6 seconds)
    const fadeTimer = setTimeout(() => {
      setIsSplashFading(true);
    }, 6000);

    // Transition to the main app after 7 seconds
    const completionTimer = setTimeout(() => {
      onComplete();
    }, 7000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completionTimer);
    };
  }, [onComplete]);

  return (
    <div className={`flex-1 flex flex-col justify-between h-full p-6 overflow-hidden relative transition-opacity duration-1000 ease-in-out ${isSplashFading ? 'opacity-0' : 'opacity-100'} ${isDark ? 'text-white' : 'text-gray-900'}`} dir="rtl">
      {/* Full screen professional sports background image */}
      {onboardingBg && typeof onboardingBg === 'string' && onboardingBg.trim() !== '' ? (
        <img
          src={onboardingBg}
          alt="Onboarding Background"
          loading="eager"
          decoding="sync"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none z-0"
        />
      ) : null}

      {/* Dynamic tint gradient overlay based on theme */}
      <div className={`absolute inset-0 backdrop-blur-[1px] z-10 ${
        isDark 
          ? 'bg-gradient-to-b from-[#0E0E12]/90 via-[#0E0E12]/75 to-[#0E0E12]/95' 
          : 'bg-gradient-to-b from-white/95 via-amber-50/85 to-white/95'
      }`}></div>
      
      {/* Header spacer */}
      <div className="z-20"></div>

      {/* Central Logo, Name and Illustration */}
      <div className="flex flex-col items-center text-center space-y-6 z-20">
        {/* Animated Logo/Badge */}
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="relative w-28 h-28 rounded-[30px] flex items-center justify-center shadow-xl shadow-[#FF5F2E]/25 overflow-hidden"
        >
          {appIcon && typeof appIcon === 'string' && appIcon.trim() !== '' ? (
            <img 
              src={appIcon} 
              alt="App Icon" 
              loading="eager"
              decoding="sync"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          ) : null}
        </motion.div>

        {/* Application Title */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="space-y-2"
        >
          <h1 className={`text-3xl font-black tracking-tight animate-pulse ${isDark ? 'text-white' : 'text-gray-900'}`}>تمارين رياضية ولياقة بدنية</h1>
          <p className="text-xs text-[#FF5F2E] tracking-widest font-black uppercase">Physical Exercise and Fitness</p>
        </motion.div>

        {/* Glowing vector sports shield representing fitness */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="w-full max-w-xs relative flex items-center justify-center h-32"
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-15">
            <svg width="250" height="150" viewBox="0 0 250 150" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 20 H240 M40 50 H210 M20 80 H230 M60 110 H190" stroke={isDark ? 'white' : '#FF5F2E'} strokeWidth="2" strokeDasharray="5 5" />
            </svg>
          </div>

          <div className="w-28 h-28 rounded-full border border-dashed border-[#FF5F2E]/30 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-[#FF5F2E]/10 border border-[#FF5F2E]/20 flex items-center justify-center shadow-lg shadow-[#FF5F2E]/10">
              <Flame className="w-10 h-10 text-[#FF5F2E] animate-pulse" />
            </div>
          </div>
        </motion.div>

        {/* Motivational Quote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className={`text-sm font-bold px-6 max-w-xs leading-relaxed ${isDark ? 'text-gray-200' : 'text-gray-800'}`}
        >
          "ابدأ رحلتك نحو جسم أقوى وصحة أفضل."
        </motion.p>
      </div>

      {/* Loading Indicator at Bottom */}
      <div className="flex flex-col items-center space-y-4 pb-8 z-20">
        <div className={`w-2/3 h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-gray-200'}`}>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 7.0, ease: 'linear' }}
            className="h-full bg-gradient-to-r from-[#FF5F2E] to-[#FF912E]"
          ></motion.div>
        </div>
        <span className={`text-[10px] font-bold tracking-widest font-mono ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>جاري تهيئة بيئة التدريب...</span>
      </div>
    </div>
  );
};
