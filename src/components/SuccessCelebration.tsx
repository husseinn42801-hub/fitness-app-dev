import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Trophy, Award, ArrowLeft, Star } from 'lucide-react';
// @ts-ignore
import goldenTrophyImg from '../assets/images/golden_trophy_cup_1785369511939.jpg';

interface SuccessCelebrationProps {
  seasonName: string;
  onNextSeason: () => void;
  isDark: boolean;
}

export const SuccessCelebration: React.FC<SuccessCelebrationProps> = ({
  seasonName,
  onNextSeason,
  isDark
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Play a beautiful, triumphant audio chime on mount (Web Audio API)
  useEffect(() => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioCtx();
      
      const playTone = (freq: number, start: number, duration: number, type: OscillatorType = 'sine') => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime + start);
        gain.gain.setValueAtTime(0, audioCtx.currentTime + start);
        gain.gain.linearRampToValueAtTime(0.12, audioCtx.currentTime + start + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + start + duration);
        osc.start(audioCtx.currentTime + start);
        osc.stop(audioCtx.currentTime + start + duration);
      };

      // Triumphant Arpeggio (C major, joyful resolution)
      playTone(261.63, 0.0, 0.4); // C4
      playTone(329.63, 0.15, 0.4); // E4
      playTone(392.00, 0.3, 0.4); // G4
      playTone(523.25, 0.45, 0.6); // C5
      playTone(659.25, 0.6, 0.8, 'triangle'); // E5 (with a softer timbre)
      playTone(783.99, 0.75, 1.2, 'sine'); // G5
    } catch (e) {
      console.warn("Victory sound generation failed:", e);
    }
  }, []);

  // HTML5 Canvas Confetti Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvasRef.current) return;
      width = canvasRef.current.width = window.innerWidth;
      height = canvasRef.current.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      color: string;
      speedX: number;
      speedY: number;
      rotation: number;
      rotationSpeed: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * -height - 20; // start above viewport
        this.size = Math.random() * 8 + 6;
        
        // Shiny celebratory palette
        const colors = [
          '#FF5F2E', // Rashaka Core Orange
          '#FF912E', // Soft Amber Orange
          '#FFD700', // Gold
          '#38BDF8', // Sky Blue
          '#34D399', // Emerald Green
          '#EC4899', // Pink
          '#8B5CF6'  // Purple
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 5 + 3;
        this.rotation = Math.random() * Math.PI;
        this.rotationSpeed = Math.random() * 0.05 - 0.025;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        // Reset particle if it drifts off bottom
        if (this.y > height) {
          this.y = -20;
          this.x = Math.random() * width;
          this.speedY = Math.random() * 5 + 3;
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.translate(this.x, this.y);
        c.rotate(this.rotation);
        c.fillStyle = this.color;
        // Draw elegant diamond/rectangle confetti piece
        c.fillRect(-this.size / 2, -this.size / 2, this.size, this.size / 1.5);
        c.restore();
      }
    }

    const particles: Particle[] = Array.from({ length: 120 }, () => new Particle());

    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      animationId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#080605]/90 backdrop-blur-xl overflow-hidden" dir="rtl">
      {/* Dynamic Animated Ambient Background Gradients & Glow Rays */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Glowing Orbs */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-b from-amber-500/25 via-[#FF5F2E]/15 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-t from-yellow-500/20 via-amber-600/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-0 w-[300px] h-[300px] bg-gradient-to-r from-orange-600/15 to-transparent rounded-full blur-3xl" />
        
        {/* Subtle Rotating Light Rays */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-400/30 via-transparent to-transparent pointer-events-none"
        />
      </div>

      {/* Background Interactive Confetti Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

      {/* Main Celebration Card */}
      <motion.div
        initial={{ scale: 0.88, y: 35, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 22, stiffness: 190 }}
        className={`w-full max-w-md rounded-[38px] p-6 text-center border relative z-20 space-y-5 overflow-hidden ${
          isDark 
            ? 'bg-gradient-to-b from-[#1C1613] via-[#140E0C] to-[#0D0908] border-amber-500/30 text-white shadow-[0_0_60px_rgba(255,145,46,0.25)]' 
            : 'bg-gradient-to-b from-amber-50/90 via-white to-orange-50/80 border-amber-400/40 text-gray-950 shadow-2xl shadow-amber-950/20'
        }`}
      >
        {/* Inner Top Spotlight Gradient Rim */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-80" />

        {/* Animated Golden Trophy Luxury Stage */}
        <div className="relative w-44 h-44 mx-auto flex items-center justify-center my-1">
          {/* Multi-layered Stage Glows & Rotating Rings */}
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/40 via-orange-500/30 to-yellow-300/25 rounded-full blur-2xl animate-pulse" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="absolute -inset-3 rounded-full border-2 border-amber-400/25 border-dashed pointer-events-none"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            className="absolute -inset-6 rounded-full border border-orange-500/15 border-dotted pointer-events-none"
          />
          
          {/* Luxury Frame Container */}
          <div className="relative w-40 h-40 rounded-3xl bg-gradient-to-b from-[#2A201A] via-[#1A130F] to-[#0A0705] border-2 border-amber-400/50 p-2 shadow-[0_10px_35px_rgba(255,145,46,0.35)] flex items-center justify-center overflow-hidden group">
            {/* Radial Core Light Beam */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-400/35 via-orange-600/15 to-transparent pointer-events-none" />
            
            {goldenTrophyImg && typeof goldenTrophyImg === 'string' && goldenTrophyImg.trim() !== '' ? (
              <motion.img 
                src={goldenTrophyImg} 
                alt="كأس البطولة الذهبي" 
                className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)] z-10"
                referrerPolicy="no-referrer"
                animate={{ y: [-4, 4, -4], rotate: [0, 2, -2, 0] }}
                transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut" }}
              />
            ) : null}

            {/* Floating Sparkle Badges */}
            <div className="absolute top-2 right-2 z-20 bg-amber-500/20 backdrop-blur-md px-2 py-0.5 rounded-full border border-amber-400/40 flex items-center gap-1 shadow-xs">
              <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
              <span className="text-[10px] font-black text-amber-200">30 يوماً</span>
            </div>
          </div>
        </div>

        {/* Celebratory Text */}
        <div className="space-y-1.5">
          <h2 className="text-2.5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 flex items-center justify-center gap-2 drop-shadow-sm">
            <Sparkles className="w-6 h-6 text-amber-400 animate-spin-slow" />
            <span>ألــف مَــبـرُوكــ! 🎉</span>
          </h2>
          <p className="text-xs sm:text-sm font-extrabold text-amber-400">لقد أكملت الموسم بجدارة واحترافية عالية!</p>
          
          <div className={`p-3.5 rounded-2xl border ${
            isDark ? 'bg-amber-950/20 border-amber-500/20' : 'bg-amber-50 border-amber-200/80'
          } mt-2.5`}>
            <span className="text-[10px] text-gray-400 block font-bold mb-1">الموسم المكتمل</span>
            <span className="text-base font-black text-white bg-gradient-to-r from-[#FF5F2E] to-[#FF912E] px-4 py-1.5 rounded-xl inline-block shadow-md">
              {seasonName}
            </span>
          </div>
        </div>

        {/* Reward Status Messages */}
        <div className={`space-y-3 text-xs text-right border p-3.5 rounded-2xl ${
          isDark ? 'bg-white/5 border-white/10' : 'bg-white/80 border-gray-200'
        }`}>
          <div className="flex items-center gap-2.5">
            <span className="text-xl shrink-0">🥇</span>
            <div>
              <span className="font-black block text-amber-400">ميدالية ذهبية محصودة</span>
              <p className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>تمت إضافة الميدالية بنجاح لمعرض إنجازاتك الشخصية.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2.5">
            <span className="text-xl shrink-0">📜</span>
            <div>
              <span className="font-black block text-emerald-400">شهادة إتمام جديدة</span>
              <p className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>تم تفعيل شهادتك الاحترافية المعتمدة لحفظها ومشاركتها.</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-xl shrink-0">🔓</span>
            <div>
              <span className="font-black block text-sky-400">تم فتح الموسم التالي تلقائياً</span>
              <p className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>يمكنك الآن الارتقاء بمستواك الرياضي في التحدي التالي.</p>
            </div>
          </div>
        </div>

        {/* Next Season Action Button */}
        <div className="pt-1">
          <button
            onClick={onNextSeason}
            className="w-full py-4 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-500 hover:brightness-105 active:scale-98 text-black font-black rounded-2xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-xl shadow-amber-500/25 cursor-pointer border border-amber-300/40"
          >
            <span>ابدأ الموسم التالي الآن 🚀</span>
            <ArrowLeft className="w-4 h-4 text-black stroke-[2.5]" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
