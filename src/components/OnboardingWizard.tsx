import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Dumbbell, 
  Flame, 
  Scale, 
  Ruler, 
  Calendar, 
  Activity, 
  Target, 
  Volume2, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  TrendingDown, 
  TrendingUp, 
  ChevronRight,
  Heart,
  Play,
  Pause
} from 'lucide-react';
// @ts-ignore
import { UserStats } from '../types';
import { audioManager } from '../lib/audioManager';
import { COACHES } from '../config/audioConfig';

interface OnboardingWizardProps {
  onComplete: (stats: UserStats) => void;
  isDark?: boolean;
}

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ onComplete, isDark = false }) => {
  const [step, setStep] = useState<number>(0); // Start directly with name and avatar
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisText, setAnalysisText] = useState<string>('جاري تحليل البيانات المدخلة...');
  const [showSummary, setShowSummary] = useState<boolean>(false);

  // Form State
  const [userName, setUserName] = useState<string>('');
  const [userAvatar, setUserAvatar] = useState<string>('🏋️‍♀️');
  const [gender, setGender] = useState<'ذكر' | 'أنثى'>('أنثى');
  const [age, setAge] = useState<number>(26);
  const [weight, setWeight] = useState<number>(72);
  const [targetWeight, setTargetWeight] = useState<number>(62);
  const [height, setHeight] = useState<number>(165);
  const [activityLevel, setActivityLevel] = useState<number>(1.375); // TDEE multiplier
  const [goal, setGoal] = useState<'loss' | 'maintain' | 'gain'>('loss');
  const [voiceGender, setVoiceGender] = useState<'male' | 'female'>(() => audioManager.getCoach());
  const [previewPlayingCoach, setPreviewPlayingCoach] = useState<'female' | 'male' | null>(null);

  // Cleanup audio on unmount or step change
  useEffect(() => {
    return () => {
      audioManager.stopAudio();
    };
  }, []);

  // Multi-step loading messages
  const getAnalysisMessages = () => {
    let goalText = 'للتخسيس ونحت الخصر';
    if (goal === 'maintain') {
      goalText = 'لشد الجسم ونحت القوام الجمالي';
    } else if (goal === 'gain') {
      goalText = 'لبناء العضلات وتطوير القوة البدنية';
    }
    return [
      'جاري تحليل طبيعة الجسم وحساب مؤشر كتلة الجسم (BMI)...',
      'جاري تحديد معدل الأيض الأساسي وحساب السعرات النشطة للتمرين...',
      'جاري تقدير احتياجك اليومي من الكربوهيدرات والبروتينات والمياه...',
      'جاري تهيئة صوت المدرب المخصص للذكاء الاصطناعي بنجاح...',
      `جاري جدولة خطة تحدي الـ 30 يوماً ${goalText} لجسدك...`
    ];
  };

  useEffect(() => {
    if (isAnalyzing) {
      let index = 0;
      const messages = getAnalysisMessages();
      const interval = setInterval(() => {
        if (index < messages.length) {
          setAnalysisText(messages[index]);
          index++;
        } else {
          clearInterval(interval);
          setIsAnalyzing(false);
          setShowSummary(true);
        }
      }, 1200);

      return () => clearInterval(interval);
    }
  }, [isAnalyzing, goal]);

  // Calculations
  const bmi = parseFloat((weight / ((height / 100) * (height / 100))).toFixed(1));
  
  // BMR (Mifflin-St Jeor Equation)
  const bmr = Math.round(
    gender === 'ذكر'
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161
  );

  // TDEE (Total Daily Energy Expenditure)
  const tdee = Math.round(bmr * activityLevel);

  // Recommended Daily Calorie Budget based on goal
  const calorieBudget = Math.round(
    goal === 'loss'
      ? tdee - 500 // Fat loss deficit
      : goal === 'gain'
      ? tdee + 300 // Lean bulk surplus
      : tdee // Maintenance
  );

  // Recommended Daily Water Cups (each cup is 250ml)
  const waterCups = Math.round((weight * 35) / 250);

  const handleNext = () => {
    audioManager.stopAudio();
    setPreviewPlayingCoach(null);
    if (step === 0) {
      if (!userName.trim()) {
        setUserName(gender === 'ذكر' ? 'البطل' : 'البطلة');
      }
      setStep(1);
    } else if (step < 8) {
      setStep((prev) => Math.min(8, prev + 1));
    } else {
      // Trigger AI Plan Generation Simulation
      setIsAnalyzing(true);
    }
  };

  const handlePrev = () => {
    audioManager.stopAudio();
    setPreviewPlayingCoach(null);
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleFinish = () => {
    audioManager.stopAudio();
    setPreviewPlayingCoach(null);
    const finalStats: UserStats = {
      weight,
      height,
      age,
      gender,
      activityLevel,
      goal,
      targetWeight,
      voiceGender,
      onboarded: true,
      userName: userName.trim(),
      userAvatar: userAvatar
    };
    audioManager.setCoach(voiceGender);
    onComplete(finalStats);
  };

  // Get BMI Status
  const getBmiStatus = (bmiValue: number) => {
    if (bmiValue < 18.5) return { text: 'نقص في الوزن', color: 'text-amber-400 bg-amber-400/10' };
    if (bmiValue < 25) return { text: 'وزن مثالي ورائع', color: 'text-emerald-400 bg-emerald-400/10' };
    if (bmiValue < 30) return { text: 'زيادة في الوزن', color: 'text-orange-400 bg-orange-400/10' };
    return { text: 'سمنة مفرطة', color: 'text-rose-400 bg-rose-400/10' };
  };

  const bmiStatus = getBmiStatus(bmi);

  const cardBgClass = isDark ? 'bg-[#1A1A1A] border-white/5' : 'bg-white border-gray-200 shadow-xs';
  const textTitleClass = isDark ? 'text-white' : 'text-gray-900';
  const textMutedClass = isDark ? 'text-gray-400' : 'text-gray-600';

  return (
    <div className={`flex-1 flex flex-col justify-between h-full p-5 transition-colors duration-300 animate-fade-in ${isDark ? 'bg-[#121212] text-white' : 'bg-[#FAFAFA] text-gray-900'}`} dir="rtl">
      
      {/* 1. ANALYSIS SCREEN OVERLAY */}
      {isAnalyzing && (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full border-4 border-[#FF5F2E]/20 border-t-[#FF5F2E] animate-spin"></div>
            <Sparkles className="w-8 h-8 text-[#FF912E] absolute inset-0 m-auto animate-pulse" />
          </div>
          <div className="space-y-2 max-w-xs mx-auto">
            <h3 className={`text-lg font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>الذكاء الاصطناعي يقوم بحساباتك...</h3>
            <p className={`text-xs leading-relaxed min-h-[40px] transition-all duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {analysisText}
            </p>
          </div>
        </div>
      )}

      {/* 2. SUMMARY SCREEN OVERLAY */}
      {showSummary && !isAnalyzing && (
        <div className="flex-1 flex flex-col justify-between space-y-5 animate-fade-in py-2">
          <div className="space-y-4">
            {/* Celebration Header */}
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-gradient-to-tr from-[#FF5F2E] to-[#FF912E] rounded-full flex items-center justify-center mx-auto shadow-lg shadow-[#FF5F2E]/20">
                <Heart className="w-7 h-7 text-white fill-current" />
              </div>
              <h2 className={`text-xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>تم توليد خطتك الرياضية المخصصة!</h2>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>بناءً على معلوماتك وجيناتك المدخلة، إليك ملخص الخطة:</p>
            </div>

            {/* Health & Plan Cards Grid */}
            <div className="grid grid-cols-2 gap-3">
              
              {/* BMI Card */}
              <div className={`p-3.5 rounded-2xl border space-y-1 ${isDark ? 'bg-[#1A1A1A] border-white/5' : 'bg-white border-gray-200 shadow-xs'}`}>
                <span className={`text-[10px] font-bold block ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>مؤشر كتلة جسمك (BMI)</span>
                <span className={`text-xl font-mono font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>{bmi}</span>
                <span className={`text-[9px] px-2 py-0.5 rounded-md font-bold inline-block mt-1 ${bmiStatus.color}`}>
                  {bmiStatus.text}
                </span>
              </div>

              {/* Water Card */}
              <div className={`p-3.5 rounded-2xl border space-y-1 ${isDark ? 'bg-[#1A1A1A] border-white/5' : 'bg-white border-gray-200 shadow-xs'}`}>
                <span className={`text-[10px] font-bold block ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>مستهدف الماء اليومي</span>
                <span className="text-xl font-mono font-black text-[#FF912E]">{waterCups} <span className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>أكواب</span></span>
                <p className={`text-[8px] leading-none mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>ما يعادل {waterCups * 250 / 1000} لتر يومياً لترطيب مثالي.</p>
              </div>

              {/* TDEE Card */}
              <div className={`p-3.5 rounded-2xl border space-y-1 ${isDark ? 'bg-[#1A1A1A] border-white/5' : 'bg-white border-gray-200 shadow-xs'}`}>
                <span className={`text-[10px] font-bold block ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>حرقك اليومي (TDEE)</span>
                <span className={`text-xl font-mono font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>{tdee} <span className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>سعرة</span></span>
                <p className={`text-[8px] leading-none mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>معدل الطاقة الإجمالي المصروف يومياً.</p>
              </div>

              {/* Target Calorie Budget */}
              <div className={`border p-3.5 rounded-2xl space-y-1 ${isDark ? 'bg-[#FF5F2E]/5 border-[#FF5F2E]/15' : 'bg-orange-50/80 border-orange-200 shadow-xs'}`}>
                <span className="text-[10px] text-[#FF5F2E] font-bold block">ميزانية السعرات المستهدفة</span>
                <span className="text-xl font-mono font-black text-[#FF5F2E]">{calorieBudget} <span className={`text-[10px] ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>سعرة</span></span>
                <p className={`text-[8px] leading-none mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {goal === 'loss' ? 'عجز مدروس لنسف الدهون.' : goal === 'gain' ? 'فائض لبناء عضلات صافية.' : 'محافظة وتثبيت لقوام مشدود.'}
                </p>
              </div>

            </div>

            {/* Plan Info Overview Box */}
            <div className={`p-4 rounded-2xl border space-y-2 text-right ${isDark ? 'bg-[#1A1A1A] border-white/5' : 'bg-white border-gray-200 shadow-xs'}`}>
              <span className="text-[10px] text-[#FF912E] font-extrabold block">🏷️ اسم البرنامج التمريني المخصص:</span>
              <h4 className={`text-sm font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>برنامج {goal === 'loss' ? 'نسف الكرش ونحت الخصر الفائق (30 يوماً)' : goal === 'gain' ? 'تطوير الكتلة العضلية والقوة المتفجرة' : 'الرشاقة وتنسيق القوام المثالي'}</h4>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                تم دمج محرك توجيه التمارين المخصص لك، وسيتولى المدرب الصوتي ({voiceGender === 'male' ? COACHES.male.name : COACHES.female.name}) تزويدك بالتعليمات وبث روح التحدي يومياً لمساعدتك على الانتقال من وزن {weight} كجم إلى وزن مستهدف {targetWeight} كجم!
              </p>
            </div>
          </div>

          {/* CTA Confirm */}
          <button
            onClick={handleFinish}
            className="w-full py-4 bg-gradient-to-r from-[#FF5F2E] to-[#FF912E] hover:opacity-90 active:scale-98 text-white font-extrabold rounded-2xl text-xs transition-all shadow-md shadow-[#FF5F2E]/20 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>ابدأ رحلتك الرياضية الآن</span>
            <ArrowRight className="w-4 h-4 transform rotate-180" />
          </button>
        </div>
      )}

      {/* 3. MULTI-STEP WIZARD SCREENS */}
      {!isAnalyzing && !showSummary && (
        <div className="flex-1 flex flex-col justify-between h-full">
          
          {/* Header & Progress Indicator */}
          {step > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black text-[#FF5F2E]">تمارين رياضية ولياقة بدنية</span>
                  <span className="text-[9px] bg-white/5 px-2 py-0.5 rounded-md text-gray-400">الذكاء الاصطناعي</span>
                </div>
                <span className="text-xs font-mono font-bold text-[#FF5F2E]">صفحة {step} من 8</span>
              </div>

              {/* Micro Progress Bar */}
              <div className="w-full bg-[#1A1A1A] h-1.5 rounded-full overflow-hidden flex flex-row-reverse">
                <div 
                  className="bg-gradient-to-r from-[#FF5F2E] to-[#FF912E] h-full transition-all duration-300"
                  style={{ width: `${(step / 8) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Custom Header for Step 0 (Profile Setup) */}
          {step === 0 && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black text-[#FF5F2E]">تمارين رياضية ولياقة بدنية</span>
                  <span className={`text-[9px] px-2 py-0.5 rounded-md font-bold ${isDark ? 'bg-white/5 text-[#FF5F2E]' : 'bg-orange-50 text-[#FF5F2E]'}`}>الخطوة الأولى</span>
                </div>
                <span className="text-xs font-mono font-bold text-[#FF5F2E]">الملف الشخصي 👤</span>
              </div>
              
              <div className={`w-full h-1.5 rounded-full overflow-hidden flex flex-row-reverse ${isDark ? 'bg-[#1A1A1A]' : 'bg-gray-200'}`}>
                <div className="bg-gradient-to-r from-[#FF5F2E] to-[#FF912E] h-full w-[10%]"></div>
              </div>
            </div>
          )}

          {/* Body Section for Each Step */}
          <div className="flex-1 flex flex-col justify-center py-6">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                
                {/* STEP 0: NAME AND AVATAR */}
                {step === 0 && (
                  <div className="space-y-4 text-right">
                    <div className="space-y-1 text-center">
                      <h3 className={`text-xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>ما اسمك؟</h3>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>أهلاً بك في تمارين رياضية ولياقة بدنية. كيف نناديك خلال رحلتك الرياضية؟</p>
                    </div>

                    <div className="space-y-2">
                      <label className={`text-xs font-bold block ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>الاسم أو اللقب</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleNext();
                            }
                          }}
                          placeholder="مثال: أحمد، سارة، البطل..."
                          maxLength={15}
                          className={`w-full p-4 pr-11 rounded-2xl border text-sm focus:border-[#FF5F2E] focus:outline-none transition-all text-right ${
                            isDark
                              ? 'bg-[#1A1A1A] border-white/5 text-white placeholder-gray-500'
                              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 shadow-xs'
                          }`}
                        />
                        <User className="w-5 h-5 text-gray-400 absolute top-4 right-4" />
                      </div>
                    </div>

                    <div className="space-y-3 pt-1">
                      <label className={`text-xs font-bold block text-right ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>اختر الأفاتار الرياضي الخاص بك</label>
                      
                      {/* Male Avatars */}
                      <div className="space-y-1.5">
                        <span className={`text-[10px] font-bold block ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>أفاتارات للذكور:</span>
                        <div className="grid grid-cols-6 gap-2">
                          {[
                            { id: 'm1', emoji: '🏋️‍♂️' },
                            { id: 'm2', emoji: '🏃‍♂️' },
                            { id: 'm3', emoji: '🚴‍♂️' },
                            { id: 'm4', emoji: '🥊' },
                            { id: 'm5', emoji: '🏊‍♂️' },
                            { id: 'm6', emoji: '🧘‍♂️' }
                          ].map((av) => (
                            <button
                              key={av.id}
                              type="button"
                              onClick={() => {
                                setUserAvatar(av.emoji);
                                setGender('ذكر'); // Smart auto-preset
                              }}
                              className={`aspect-square rounded-2xl flex items-center justify-center text-2xl transition-all cursor-pointer ${
                                userAvatar === av.emoji
                                  ? 'bg-[#FF5F2E] text-white ring-4 ring-[#FF5F2E]/30 scale-105'
                                  : isDark
                                  ? 'bg-[#1A1A1A] hover:bg-white/5 border border-white/5 text-white'
                                  : 'bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 shadow-xs'
                              }`}
                            >
                              {av.emoji}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Female Avatars */}
                      <div className="space-y-1.5 pt-1">
                        <span className={`text-[10px] font-bold block ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>أفاتارات للإناث:</span>
                        <div className="grid grid-cols-6 gap-2">
                          {[
                            { id: 'f1', emoji: '🏋️‍♀️' },
                            { id: 'f2', emoji: '🏃‍♀️' },
                            { id: 'f3', emoji: '🚴‍♀️' },
                            { id: 'f4', emoji: '🥊' },
                            { id: 'f5', emoji: '🏊‍♀️' },
                            { id: 'f6', emoji: '🧘‍♀️' }
                          ].map((av) => (
                            <button
                              key={av.id}
                              type="button"
                              onClick={() => {
                                setUserAvatar(av.emoji);
                                setGender('أنثى'); // Smart auto-preset
                              }}
                              className={`aspect-square rounded-2xl flex items-center justify-center text-2xl transition-all cursor-pointer ${
                                userAvatar === av.emoji
                                  ? 'bg-[#FF5F2E] text-white ring-4 ring-[#FF5F2E]/30 scale-105'
                                  : isDark
                                  ? 'bg-[#1A1A1A] hover:bg-white/5 border border-white/5 text-white'
                                  : 'bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 shadow-xs'
                              }`}
                            >
                              {av.emoji}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 1: GENDER */}
                {step === 1 && (
                  <div className="space-y-4 text-center">
                    <div className="space-y-1.5">
                      <h3 className={`text-lg font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>اختر جنسك لتخصيص محرك التمارين</h3>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>يساعدنا هذا في ضبط شدة التمارين ومقدار الحرق الأساسي بدقة عالية.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <button
                        onClick={() => setGender('أنثى')}
                        className={`p-5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-3 ${
                          gender === 'أنثى'
                            ? 'border-[#FF5F2E] bg-[#FF5F2E]/10 text-[#FF5F2E] font-black shadow-md'
                            : isDark
                            ? 'border-white/5 bg-[#1A1A1A] hover:bg-white/5 text-gray-300'
                            : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-800 shadow-xs'
                        }`}
                      >
                        <span className="text-4xl">🙋‍♀️</span>
                        <div className={`text-xs font-extrabold ${gender === 'أنثى' ? 'text-[#FF5F2E]' : isDark ? 'text-white' : 'text-gray-900'}`}>أنثى</div>
                        <span className={`text-[8px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>نحت الخصر وتنسيق القوام</span>
                      </button>

                      <button
                        onClick={() => setGender('ذكر')}
                        className={`p-5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-3 ${
                          gender === 'ذكر'
                            ? 'border-[#FF5F2E] bg-[#FF5F2E]/10 text-[#FF5F2E] font-black shadow-md'
                            : isDark
                            ? 'border-white/5 bg-[#1A1A1A] hover:bg-white/5 text-gray-300'
                            : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-800 shadow-xs'
                        }`}
                      >
                        <span className="text-4xl">🙋‍♂️</span>
                        <div className={`text-xs font-extrabold ${gender === 'ذكر' ? 'text-[#FF5F2E]' : isDark ? 'text-white' : 'text-gray-900'}`}>ذكر</div>
                        <span className={`text-[8px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>بناء اللياقة وتقوية عضلات البطن</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: AGE */}
                {step === 2 && (
                  <div className="space-y-4 text-center">
                    <div className="space-y-1.5">
                      <h3 className={`text-lg font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>كم يبلغ عمرك؟</h3>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>تختلف كفاءة عمليات الأيض ومعدل الحرق الآمن تبعاً للعمر.</p>
                    </div>

                    <div className={`p-6 rounded-2xl border space-y-4 ${isDark ? 'bg-[#1A1A1A] border-white/5' : 'bg-white border-gray-200 shadow-xs'}`}>
                      <div className="text-4xl font-mono font-black text-[#FF5F2E]">
                        {age} <span className={`text-xs ${isDark ? 'text-white' : 'text-gray-800'}`}>سنة</span>
                      </div>
                      
                      {/* Age interactive button grid or simple slider */}
                      <div className="flex justify-center items-center gap-4">
                        <button 
                          onClick={() => setAge(Math.max(12, age - 1))}
                          className={`w-10 h-10 font-bold rounded-lg border flex items-center justify-center text-lg cursor-pointer ${
                            isDark
                              ? 'bg-[#222222] hover:bg-white/5 text-white border-white/5'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-900 border-gray-200'
                          }`}
                        >
                          -
                        </button>
                        <input
                          type="range"
                          min="12"
                          max="75"
                          value={age}
                          onChange={(e) => setAge(parseInt(e.target.value))}
                          className={`flex-1 accent-[#FF5F2E] h-1.5 rounded-lg cursor-pointer ${isDark ? 'bg-[#222222]' : 'bg-gray-200'}`}
                        />
                        <button 
                          onClick={() => setAge(Math.min(75, age + 1))}
                          className={`w-10 h-10 font-bold rounded-lg border flex items-center justify-center text-lg cursor-pointer ${
                            isDark
                              ? 'bg-[#222222] hover:bg-white/5 text-white border-white/5'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-900 border-gray-200'
                          }`}
                        >
                          +
                        </button>
                      </div>

                      <div className={`text-[10px] text-center leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        نصيحة: تمارين الرشاقة مصممة لتناسب المدى العمري من 12 إلى 75 سنة بكفاءة وأمان تامين.
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: CURRENT WEIGHT */}
                {step === 3 && (
                  <div className="space-y-4 text-center">
                    <div className="space-y-1.5">
                      <h3 className={`text-lg font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>ما هو وزنك الحالي؟</h3>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>مفتاح رئيسي لحساب مؤشر كتلة الجسم وتحديد الاحتياج الحقيقي من الطاقة.</p>
                    </div>

                    <div className={`p-6 rounded-2xl border space-y-4 ${isDark ? 'bg-[#1A1A1A] border-white/5' : 'bg-white border-gray-200 shadow-xs'}`}>
                      <div className="text-4xl font-mono font-black text-[#FF912E]">
                        {weight} <span className={`text-xs ${isDark ? 'text-white' : 'text-gray-800'}`}>كجم</span>
                      </div>

                      <div className="flex justify-center items-center gap-4">
                        <button 
                          onClick={() => setWeight(Math.max(35, weight - 1))}
                          className={`w-10 h-10 font-bold rounded-lg border flex items-center justify-center text-lg cursor-pointer ${
                            isDark
                              ? 'bg-[#222222] hover:bg-white/5 text-white border-white/5'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-900 border-gray-200'
                          }`}
                        >
                          -
                        </button>
                        <input
                          type="range"
                          min="35"
                          max="160"
                          value={weight}
                          onChange={(e) => setWeight(parseInt(e.target.value))}
                          className={`flex-1 accent-[#FF912E] h-1.5 rounded-lg cursor-pointer ${isDark ? 'bg-[#222222]' : 'bg-gray-200'}`}
                        />
                        <button 
                          onClick={() => setWeight(Math.min(160, weight + 1))}
                          className={`w-10 h-10 font-bold rounded-lg border flex items-center justify-center text-lg cursor-pointer ${
                            isDark
                              ? 'bg-[#222222] hover:bg-white/5 text-white border-white/5'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-900 border-gray-200'
                          }`}
                        >
                          +
                        </button>
                      </div>

                      <span className="text-[10px] bg-[#FF5F2E]/10 text-[#FF5F2E] font-bold px-3 py-1 rounded-full inline-block">
                        مقياس الوزن المعياري: {weight < 50 ? 'نحيف وقابل للزيادة' : weight < 80 ? 'وزن متوسط / نشط' : 'وزن يحتاج لإذابة وحرق الدهون'}
                      </span>
                    </div>
                  </div>
                )}

                {/* STEP 4: TARGET WEIGHT */}
                {step === 4 && (
                  <div className="space-y-4 text-center">
                    <div className="space-y-1.5">
                      <h3 className={`text-lg font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>ما هو وزنك المستهدف؟</h3>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>تحديد الهدف بوضوح يحفزك للالتزام ويسمح بحساب العجز الغذائي الملائم.</p>
                    </div>

                    <div className={`p-6 rounded-2xl border space-y-4 ${isDark ? 'bg-[#1A1A1A] border-white/5' : 'bg-white border-gray-200 shadow-xs'}`}>
                      <div className="text-4xl font-mono font-black text-emerald-500">
                        {targetWeight} <span className={`text-xs ${isDark ? 'text-white' : 'text-gray-800'}`}>كجم</span>
                      </div>

                      <div className="flex justify-center items-center gap-4">
                        <button 
                          onClick={() => setTargetWeight(Math.max(35, targetWeight - 1))}
                          className={`w-10 h-10 font-bold rounded-lg border flex items-center justify-center text-lg cursor-pointer ${
                            isDark
                              ? 'bg-[#222222] hover:bg-white/5 text-white border-white/5'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-900 border-gray-200'
                          }`}
                        >
                          -
                        </button>
                        <input
                          type="range"
                          min="35"
                          max="160"
                          value={targetWeight}
                          onChange={(e) => setTargetWeight(parseInt(e.target.value))}
                          className={`flex-1 accent-emerald-500 h-1.5 rounded-lg cursor-pointer ${isDark ? 'bg-[#222222]' : 'bg-gray-200'}`}
                        />
                        <button 
                          onClick={() => setTargetWeight(Math.min(160, targetWeight + 1))}
                          className={`w-10 h-10 font-bold rounded-lg border flex items-center justify-center text-lg cursor-pointer ${
                            isDark
                              ? 'bg-[#222222] hover:bg-white/5 text-white border-white/5'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-900 border-gray-200'
                          }`}
                        >
                          +
                        </button>
                      </div>

                      <div className={`text-[10px] leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {weight - targetWeight > 0 ? (
                          <span className="text-[#FF5F2E] font-bold">المستهدف هو نزول {weight - targetWeight} كجم من كتلة الدهون وبناء الخصر الرياضي.</span>
                        ) : weight - targetWeight < 0 ? (
                          <span className="text-emerald-500 font-bold">المستهدف هو زيادة {targetWeight - weight} كجم لبناء قوام قوي وصحي.</span>
                        ) : (
                          <span>المستهدف هو ثبات الوزن وشد العضلات وتفادي الترهلات.</span>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 5: HEIGHT */}
                {step === 5 && (
                  <div className="space-y-4 text-center">
                    <div className="space-y-1.5">
                      <h3 className={`text-lg font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>ما هو طولك بالسنتمتر؟</h3>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>الطول هو العامل الأهم لحساب مساحة توزيع كتلة الجسم ونسبة الخصر المثالية.</p>
                    </div>

                    <div className={`p-6 rounded-2xl border space-y-4 ${isDark ? 'bg-[#1A1A1A] border-white/5' : 'bg-white border-gray-200 shadow-xs'}`}>
                      <div className="text-4xl font-mono font-black text-[#FF5F2E]">
                        {height} <span className={`text-xs ${isDark ? 'text-white' : 'text-gray-800'}`}>سم</span>
                      </div>

                      <div className="flex justify-center items-center gap-4">
                        <button 
                          onClick={() => setHeight(Math.max(120, height - 1))}
                          className={`w-10 h-10 font-bold rounded-lg border flex items-center justify-center text-lg cursor-pointer ${
                            isDark
                              ? 'bg-[#222222] hover:bg-white/5 text-white border-white/5'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-900 border-gray-200'
                          }`}
                        >
                          -
                        </button>
                        <input
                          type="range"
                          min="120"
                          max="220"
                          value={height}
                          onChange={(e) => setHeight(parseInt(e.target.value))}
                          className={`flex-1 accent-[#FF5F2E] h-1.5 rounded-lg cursor-pointer ${isDark ? 'bg-[#222222]' : 'bg-gray-200'}`}
                        />
                        <button 
                          onClick={() => setHeight(Math.min(220, height + 1))}
                          className={`w-10 h-10 font-bold rounded-lg border flex items-center justify-center text-lg cursor-pointer ${
                            isDark
                              ? 'bg-[#222222] hover:bg-white/5 text-white border-white/5'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-900 border-gray-200'
                          }`}
                        >
                          +
                        </button>
                      </div>

                      <div className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        مقياس الطول: {height < 155 ? 'طول مدمج مثالي' : height < 178 ? 'طول متوسط رياضي' : 'قامة ممشوقة وطويلة'}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 6: ACTIVITY LEVEL */}
                {step === 6 && (
                  <div className="space-y-4 text-center">
                    <div className="space-y-1.5">
                      <h3 className={`text-lg font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>ما هو مستوى نشاطك اليومي؟</h3>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>تقدير معدل الحركة اليومي يمنح الخوارزمية دقة تامة لحساب السعرات النشطة.</p>
                    </div>

                    <div className="flex flex-col gap-2 pt-1 max-h-[300px] overflow-y-auto pr-1">
                      {[
                        { val: 1.2, label: 'خامل ومستقر', desc: 'جلوس مستمر في المكتب، لا أمارس الرياضة مطلقاً' },
                        { val: 1.375, label: 'نشاط خفيف', desc: 'مشي بسيط، تمارين منزلية خفيفة (1-3 أيام/أسبوع)' },
                        { val: 1.55, label: 'نشاط متوسط', desc: 'تمرين منتظم وشاق ونمط حياة نشط (3-5 أيام/أسبوع)' },
                        { val: 1.725, label: 'رياضي نشط جداً', desc: 'تمرينات يومية قاسية أو وظيفة تتطلب جهداً عضلياً مستمراً' }
                      ].map((act) => (
                        <button
                          key={act.val}
                          onClick={() => setActivityLevel(act.val)}
                          className={`w-full text-right p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col gap-1 ${
                            activityLevel === act.val
                              ? 'border-[#FF5F2E] bg-[#FF5F2E]/10 text-[#FF5F2E] font-black shadow-xs'
                              : isDark
                              ? 'border-white/5 bg-[#1A1A1A] hover:bg-[#222222] text-gray-300'
                              : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-800 shadow-xs'
                          }`}
                        >
                          <span className={`text-xs font-black ${activityLevel === act.val ? 'text-[#FF5F2E]' : isDark ? 'text-white' : 'text-gray-900'}`}>{act.label}</span>
                          <span className={`text-[10px] font-medium leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{act.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 7: MAIN FITNESS GOAL */}
                {step === 7 && (
                  <div className="space-y-4 text-center">
                    <div className="space-y-1.5">
                      <h3 className={`text-lg font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>ما هو هدفك الرياضي الرئيسي؟</h3>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>ستقوم الخوارزمية بجدولة وحساب مستهدفات الطاقة التمرينية لتلائم هدفك.</p>
                    </div>

                    <div className="flex flex-col gap-3 pt-1">
                      {[
                        { key: 'loss', icon: '🔥', title: 'تخسيس دهون الكرش والبطن الكلي', desc: 'التركيز على إذابة دهون الخصر، وحرق السعرات العالية.' },
                        { key: 'maintain', icon: '✨', title: 'شد الترهلات والحصول على خصر مثالي', desc: 'التركيز على الإطالات المتكاملة، البلانك، وشد الأنسجة.' },
                        { key: 'gain', icon: '💪', title: 'بناء اللياقة البدنية والكتلة العضلية', desc: 'تحفيز القوة الانفجارية، تقوية الأساس (الكور) والظهر.' }
                      ].map((item) => (
                        <button
                          key={item.key}
                          onClick={() => setGoal(item.key as any)}
                          className={`w-full text-right p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
                            goal === item.key
                              ? 'border-[#FF5F2E] bg-[#FF5F2E]/10 text-[#FF5F2E] shadow-xs'
                              : isDark
                              ? 'border-white/5 bg-[#1A1A1A] hover:bg-[#222222] text-gray-300'
                              : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-800 shadow-xs'
                          }`}
                        >
                          <span className="text-3xl shrink-0">{item.icon}</span>
                          <div className="flex flex-col items-start gap-1">
                            <span className={`text-xs font-black ${goal === item.key ? 'text-[#FF5F2E]' : isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</span>
                            <span className={`text-[10px] font-medium leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.desc}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 8: VOICE COACH SELECTION */}
                {step === 8 && (
                  <div className="space-y-4 text-center">
                    <div className="space-y-1.5">
                      <h3 className={`text-lg font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>اختر مدربك الصوتي</h3>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>اختر المدرب الصوتي المفضل الذي سيرافقك ويحفزك في جميع تمارينك دون الحاجة للإنترنت.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                      {/* Female Coach Card: Amira */}
                      <div
                        onClick={() => {
                          setVoiceGender('female');
                          audioManager.setCoach('female');
                        }}
                        className={`p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between gap-3 relative overflow-hidden ${
                          voiceGender === 'female'
                            ? 'border-[#FF5F2E] bg-[#FF5F2E]/10 ring-2 ring-[#FF5F2E]/30 shadow-md'
                            : isDark
                            ? 'border-white/5 bg-[#1A1A1A] hover:bg-white/5 text-gray-300'
                            : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-800 shadow-xs'
                        }`}
                      >
                        <div className="space-y-2 flex flex-col items-center">
                          <span className="text-4xl">👩</span>
                          <div className={`text-sm font-extrabold ${voiceGender === 'female' ? 'text-[#FF5F2E]' : isDark ? 'text-white' : 'text-gray-900'}`}>
                            {COACHES.female.name}
                          </div>
                          <p className={`text-[9px] leading-tight ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            "{COACHES.female.previewText}"
                          </p>
                        </div>

                        {/* Audio Preview Play Button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setVoiceGender('female');
                            audioManager.setCoach('female');
                            if (previewPlayingCoach === 'female') {
                              audioManager.stopAudio();
                              setPreviewPlayingCoach(null);
                            } else {
                              audioManager.stopAudio();
                              setPreviewPlayingCoach('female');
                              audioManager.playAudio('preview', 'female').then(() => {
                                setPreviewPlayingCoach(null);
                              });
                            }
                          }}
                          className={`mt-2 w-full py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 text-[11px] font-bold transition-all ${
                            previewPlayingCoach === 'female'
                              ? 'bg-[#FF5F2E] text-white shadow-sm'
                              : 'bg-[#FF5F2E]/15 text-[#FF5F2E] hover:bg-[#FF5F2E]/25'
                          }`}
                        >
                          {previewPlayingCoach === 'female' ? (
                            <>
                              <Pause className="w-3.5 h-3.5 fill-current" />
                              <span>إيقاف المعاينة</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3.5 h-3.5 fill-current" />
                              <span>معاينة الصوت</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Male Coach Card: Hussein */}
                      <div
                        onClick={() => {
                          setVoiceGender('male');
                          audioManager.setCoach('male');
                        }}
                        className={`p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between gap-3 relative overflow-hidden ${
                          voiceGender === 'male'
                            ? 'border-[#FF5F2E] bg-[#FF5F2E]/10 ring-2 ring-[#FF5F2E]/30 shadow-md'
                            : isDark
                            ? 'border-white/5 bg-[#1A1A1A] hover:bg-white/5 text-gray-300'
                            : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-800 shadow-xs'
                        }`}
                      >
                        <div className="space-y-2 flex flex-col items-center">
                          <span className="text-4xl">👨</span>
                          <div className={`text-sm font-extrabold ${voiceGender === 'male' ? 'text-[#FF5F2E]' : isDark ? 'text-white' : 'text-gray-900'}`}>
                            {COACHES.male.name}
                          </div>
                          <p className={`text-[9px] leading-tight ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            "{COACHES.male.previewText}"
                          </p>
                        </div>

                        {/* Audio Preview Play Button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setVoiceGender('male');
                            audioManager.setCoach('male');
                            if (previewPlayingCoach === 'male') {
                              audioManager.stopAudio();
                              setPreviewPlayingCoach(null);
                            } else {
                              audioManager.stopAudio();
                              setPreviewPlayingCoach('male');
                              audioManager.playAudio('preview', 'male').then(() => {
                                setPreviewPlayingCoach(null);
                              });
                            }
                          }}
                          className={`mt-2 w-full py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 text-[11px] font-bold transition-all ${
                            previewPlayingCoach === 'male'
                              ? 'bg-[#FF5F2E] text-white shadow-sm'
                              : 'bg-[#FF5F2E]/15 text-[#FF5F2E] hover:bg-[#FF5F2E]/25'
                          }`}
                        >
                          {previewPlayingCoach === 'male' ? (
                            <>
                              <Pause className="w-3.5 h-3.5 fill-current" />
                              <span>إيقاف المعاينة</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3.5 h-3.5 fill-current" />
                              <span>معاينة الصوت</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>

          </div>

          {/* Navigation Controls Sticky Footer */}
          <div className={`flex gap-4 border-t pt-4 shrink-0 ${isDark ? 'border-white/5' : 'border-gray-200'}`}>
            {step > 0 && (
              <button
                onClick={handlePrev}
                className={`px-5 py-3 font-extrabold rounded-2xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer border ${
                  isDark
                    ? 'bg-[#1A1A1A] hover:bg-white/5 text-white border-white/5'
                    : 'bg-white hover:bg-gray-100 text-gray-800 border-gray-200 shadow-xs'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>السابق</span>
              </button>
            )}

            <button
              onClick={handleNext}
              className="flex-1 py-3.5 bg-gradient-to-r from-[#FF5F2E] to-[#FF912E] hover:opacity-90 active:scale-98 text-white font-extrabold rounded-2xl text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
            >
              <span>{step === 8 ? 'تحليل البيانات وصناعة الخطة' : 'الاستمرار'}</span>
              <ArrowRight className="w-3.5 h-3.5 transform rotate-180" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
