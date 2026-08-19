import React, { useState, useEffect, useMemo } from 'react';
import { UserStats } from '../types';
import { Calculator, Sparkles, Scale, Activity, Trophy, Apple, Flame, Droplet, Plus, Trash2, Utensils, CheckCircle2, AlertTriangle, User, Target, Save, RefreshCw } from 'lucide-react';
import { ConfirmModal } from './ConfirmModal';

interface CalorieCalculatorProps {
  onSaveStats: (stats: UserStats) => void;
  savedStats?: UserStats;
  isDark?: boolean;
}

interface CalcMealItem {
  id: string;
  name: string;
  mealType: 'إفطار' | 'غداء' | 'عشاء' | 'وجبة خفيفة';
  calories: number;
  timeStr: string;
}

export const CalorieCalculator: React.FC<CalorieCalculatorProps> = React.memo(({ onSaveStats, savedStats, isDark = false }) => {
  // Body Parameters State
  const [weight, setWeight] = useState<number>(savedStats?.weight || 75);
  const [height, setHeight] = useState<number>(savedStats?.height || 170);
  const [age, setAge] = useState<number>(savedStats?.age || 28);
  const [gender, setGender] = useState<'ذكر' | 'أنثى'>(savedStats?.gender || 'أنثى');
  const [activityLevel, setActivityLevel] = useState<number>(savedStats?.activityLevel || 1.375);
  const [goal, setGoal] = useState<'loss' | 'maintain' | 'gain' | 'fitness'>(savedStats?.goal || 'loss');
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState<boolean>(false);

  // Sync state if savedStats prop updates from outside
  useEffect(() => {
    if (savedStats) {
      if (savedStats.weight) setWeight(savedStats.weight);
      if (savedStats.height) setHeight(savedStats.height);
      if (savedStats.age) setAge(savedStats.age);
      if (savedStats.gender) setGender(savedStats.gender);
      if (savedStats.activityLevel) setActivityLevel(savedStats.activityLevel);
      if (savedStats.goal) setGoal(savedStats.goal);
    }
  }, [savedStats]);

  // Calculated Results State
  const [bmr, setBmr] = useState<number>(0);
  const [tdee, setTdee] = useState<number>(0);
  const [targetCalories, setTargetCalories] = useState<number>(0);
  const [bmi, setBmi] = useState<number>(0);
  const [bmiStatus, setBmiStatus] = useState<string>('');
  const [bmiColor, setBmiColor] = useState<string>('');
  const [waterGoal, setWaterGoal] = useState<number>(0); // in Liters

  // Daily Meal Logging State
  const todayKey = useMemo(() => new Date().toISOString().split('T')[0], []);
  
  const [calcMeals, setCalcMeals] = useState<CalcMealItem[]>(() => {
    try {
      const stored = localStorage.getItem(`rashaka_calc_daily_meals_${todayKey}`);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Error reading calc daily meals:', e);
    }
    return [
      { id: '1', name: 'بيضتان مسلوقتان مع خبز أسمر', mealType: 'إفطار', calories: 320, timeStr: '08:30 ص' },
      { id: '2', name: 'صدر دجاج مشوي مع أرز وسلطة', mealType: 'غداء', calories: 550, timeStr: '02:15 م' }
    ];
  });

  const [mealNameInput, setMealNameInput] = useState<string>('');
  const [mealTypeInput, setMealTypeInput] = useState<'إفطار' | 'غداء' | 'عشاء' | 'وجبة خفيفة'>('إفطار');
  const [mealCaloriesInput, setMealCaloriesInput] = useState<string>('');

  // Persist calcMeals to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(`rashaka_calc_daily_meals_${todayKey}`, JSON.stringify(calcMeals));
    } catch (e) {
      console.error('Error saving calc daily meals:', e);
    }
  }, [calcMeals, todayKey]);

  // Total consumed calories calculation
  const totalConsumedCalories = useMemo(() => {
    return calcMeals.reduce((acc, item) => acc + item.calories, 0);
  }, [calcMeals]);

  // Breakdown calories by meal type
  const mealTypeBreakdown = useMemo(() => {
    const acc = { 'إفطار': 0, 'غداء': 0, 'عشاء': 0, 'وجبة خفيفة': 0 };
    calcMeals.forEach(item => {
      if (acc[item.mealType] !== undefined) {
        acc[item.mealType] += item.calories;
      }
    });
    return acc;
  }, [calcMeals]);

  // Calculate stats dynamically and synchronously whenever inputs change
  useEffect(() => {
    // 1. BMI Calculation: Weight (kg) / Height^2 (m)
    const validWeight = Math.max(20, weight || 70);
    const validHeight = Math.max(100, height || 170);
    const validAge = Math.max(10, age || 25);

    const heightInMeters = validHeight / 100;
    const bmiVal = validWeight / (heightInMeters * heightInMeters);
    setBmi(parseFloat(bmiVal.toFixed(1)));

    if (bmiVal < 18.5) {
      setBmiStatus('نقص في الوزن');
      setBmiColor(isDark ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' : 'text-amber-700 bg-amber-50 border-amber-200');
    } else if (bmiVal < 25) {
      setBmiStatus('وزن صحي ومثالي');
      setBmiColor(isDark ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-emerald-700 bg-emerald-50 border-emerald-200');
    } else if (bmiVal < 30) {
      setBmiStatus('زيادة في الوزن');
      setBmiColor(isDark ? 'text-orange-400 bg-orange-500/10 border-orange-500/20' : 'text-orange-700 bg-orange-50 border-orange-200');
    } else {
      setBmiStatus('سمنة (يستلزم تخسيس)');
      setBmiColor(isDark ? 'text-rose-400 bg-rose-500/10 border-rose-500/20' : 'text-rose-700 bg-rose-50 border-rose-200');
    }

    // 2. BMR Calculation (Mifflin-St Jeor Equation)
    let bmrVal = 0;
    if (gender === 'ذكر') {
      bmrVal = 10 * validWeight + 6.25 * validHeight - 5 * validAge + 5;
    } else {
      bmrVal = 10 * validWeight + 6.25 * validHeight - 5 * validAge - 161;
    }
    setBmr(Math.round(bmrVal));

    // 3. TDEE Calculation
    const activeMult = activityLevel || 1.375;
    const tdeeVal = bmrVal * activeMult;
    setTdee(Math.round(tdeeVal));

    // 4. Target Calories based on Goal
    let target = tdeeVal;
    if (goal === 'loss') {
      target = tdeeVal - 500; // Caloric deficit
    } else if (goal === 'gain') {
      target = tdeeVal + 350; // Caloric surplus
    }
    setTargetCalories(Math.max(1200, Math.round(target)));

    // 5. Water Goal: Weight in kg * 35 ml
    const waterLit = (validWeight * 35) / 1000;
    setWaterGoal(parseFloat(waterLit.toFixed(1)));
  }, [weight, height, age, gender, activityLevel, goal, isDark]);

  const handleSave = () => {
    onSaveStats({
      weight,
      height,
      age,
      gender,
      activityLevel,
      goal,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleAddMeal = (e: React.FormEvent) => {
    e.preventDefault();
    const cals = parseInt(mealCaloriesInput, 10);
    const name = mealNameInput.trim() || `وجبة ${mealTypeInput}`;
    if (isNaN(cals) || cals <= 0) return;

    const newMeal: CalcMealItem = {
      id: `${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name,
      mealType: mealTypeInput,
      calories: cals,
      timeStr: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    };

    setCalcMeals(prev => [...prev, newMeal]);
    setMealNameInput('');
    setMealCaloriesInput('');
  };

  const handleDeleteMeal = (id: string) => {
    setCalcMeals(prev => prev.filter(item => item.id !== id));
  };

  const handleClearMeals = () => {
    setIsClearConfirmOpen(true);
  };

  const executeClearMeals = () => {
    setCalcMeals([]);
  };

  // Macros Calculation
  const carbPct = goal === 'loss' ? 0.4 : goal === 'gain' ? 0.5 : 0.45;
  const proteinPct = goal === 'loss' ? 0.35 : goal === 'gain' ? 0.3 : 0.3;
  const fatPct = goal === 'loss' ? 0.25 : goal === 'gain' ? 0.2 : 0.25;

  const carbsGrams = Math.round((targetCalories * carbPct) / 4);
  const proteinGrams = Math.round((targetCalories * proteinPct) / 4);
  const fatGrams = Math.round((targetCalories * fatPct) / 9);

  // Calorie difference and progress percent
  const calorieDiff = targetCalories - totalConsumedCalories;
  const progressRatio = Math.min(100, Math.round((totalConsumedCalories / (targetCalories || 1)) * 100));

  return (
    <div className={`space-y-6 pb-20 ${isDark ? 'text-white' : 'text-gray-900'}`} dir="rtl">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#FF5F2E] to-[#FF912E] rounded-3xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="absolute -left-10 -bottom-10 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
        <div className="flex items-center gap-3 relative z-10">
          <div className="p-2.5 bg-white/20 rounded-2xl shrink-0">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-medium">حسابات دقيقة ومتزامنة</span>
            <h2 className="text-xl font-bold mt-1">حاسبة السعرات والمؤشرات اليومية</h2>
          </div>
        </div>
        <p className="text-xs text-white/90 mt-3 leading-relaxed">
          قم بتحديث مدخلات جسمك وهدفك للحصول على حسابات دقيقة فورية ومزامنة وجبات اليوم للوصول لهدفك السعري بكل ثقة وسلاسة.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* =========================================================
            PANEL 2: SYNCHRONIZED CALORIE & ENERGY RESULTS
            ========================================================= */}
        <div className={`border p-6 rounded-3xl shadow-xs space-y-4 ${
          isDark ? 'bg-[#1A1A1A] border-white/5' : 'bg-white border-gray-100 shadow-sm'
        }`}>
          <div className="flex justify-between items-center">
            <span className={`text-[10px] px-2.5 py-1 rounded-full font-mono uppercase tracking-wider font-bold ${
              isDark ? 'bg-white/10 text-[#FF912E]' : 'bg-[#FF912E]/10 text-[#FF5F2E]'
            }`}>
              احتياج السعرات المستهدف المحسوب
            </span>
            <span className="text-[10px] text-gray-400 font-medium">متزامن مع مدخلاتك</span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-[#FF5F2E] font-mono">{targetCalories}</span>
            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>سعرة حرارية / اليوم</span>
          </div>
          
          {/* Target energy indicator bar */}
          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between text-[11px] text-gray-400 font-medium">
              <span>عجز تخسيس (-500)</span>
              <span>تثبيت التوازن</span>
              <span>فائض تضخيم (+350)</span>
            </div>
            <div className={`w-full h-2.5 rounded-full overflow-hidden ${isDark ? 'bg-[#222222]' : 'bg-gray-100'}`}>
              <div 
                className="bg-gradient-to-r from-[#FF5F2E] to-[#FF912E] h-full rounded-full transition-all duration-500"
                style={{ width: goal === 'loss' ? '35%' : goal === 'maintain' ? '65%' : '100%' }}
              ></div>
            </div>
          </div>

          {/* BMR and TDEE Calculations Grid */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
              <div className="flex items-center gap-1.5 text-gray-400 text-[11px] mb-1 font-semibold">
                <Flame className="w-3.5 h-3.5 text-[#FF5F2E]" />
                <span>الأيض الأساسي (BMR)</span>
              </div>
              <span className={`text-lg font-bold font-mono ${isDark ? 'text-white' : 'text-gray-900'}`}>{bmr} <span className="text-[10px] text-gray-400 font-sans">سعرة</span></span>
              <p className="text-[9px] text-gray-400 mt-1 leading-tight">سعرات الحرق التلقائي أثناء الراحة والنوم.</p>
            </div>
            
            <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
              <div className="flex items-center gap-1.5 text-gray-400 text-[11px] mb-1 font-semibold">
                <Activity className="w-3.5 h-3.5 text-emerald-500" />
                <span>الحرق الكامل (TDEE)</span>
              </div>
              <span className={`text-lg font-bold font-mono ${isDark ? 'text-white' : 'text-gray-900'}`}>{tdee} <span className="text-[10px] text-gray-400 font-sans">سعرة</span></span>
              <p className="text-[9px] text-gray-400 mt-1 leading-tight">إجمالي الحرق اليومي شاملاً المشي والنشاط.</p>
            </div>
          </div>
        </div>

        {/* =========================================================
            PANEL 3: DAILY MEAL TRACKER & VISUAL PROGRESS GAUGE
            ========================================================= */}
        <div className={`border p-6 rounded-3xl space-y-5 ${
          isDark ? 'bg-[#1A1A1A] border-white/5' : 'bg-white border-gray-100 shadow-sm'
        }`}>
          {/* Header of Visual Indicator */}
          <div className="flex flex-wrap justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-[#FF5F2E]/10 text-[#FF5F2E] rounded-xl">
                <Utensils className="w-5 h-5" />
              </div>
              <div>
                <h3 className={`font-black text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  مؤشر وجبات اليوم وسعراتك المستهدفة
                </h3>
                <span className="text-[10px] text-gray-400 font-medium block mt-0.5">
                  مجموع السعرات المتناولة مقابل الهدف اليومي المحسوب ({targetCalories} سعرة)
                </span>
              </div>
            </div>

            {calcMeals.length > 0 && (
              <button
                onClick={handleClearMeals}
                className="text-[10px] text-rose-400 hover:text-rose-500 font-bold transition-all flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>تفريغ الوجبات</span>
              </button>
            )}
          </div>

          {/* VISUAL PROGRESS INDICATOR CARD */}
          <div className={`p-5 rounded-2xl border relative overflow-hidden space-y-3.5 ${
            isDark ? 'bg-[#222226] border-white/5' : 'bg-gradient-to-br from-amber-500/5 to-[#FF5F2E]/5 border-amber-500/20'
          }`}>
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-bold text-gray-400">
                مجموع السعرات لليوم
              </span>
              <div className="text-left font-mono">
                <span className="text-2xl font-black text-[#FF5F2E]">{totalConsumedCalories}</span>
                <span className="text-xs text-gray-400"> / {targetCalories} سعرة</span>
              </div>
            </div>

            {/* Progress Gauge Bar */}
            <div className="space-y-1.5">
              <div className={`w-full h-3.5 rounded-full overflow-hidden p-0.5 border ${
                isDark ? 'bg-black/40 border-white/10' : 'bg-gray-200/80 border-gray-300/60'
              }`}>
                <div
                  className={`h-full rounded-full transition-all duration-700 shadow-xs ${
                    totalConsumedCalories > targetCalories
                      ? 'bg-gradient-to-r from-rose-500 to-red-600'
                      : totalConsumedCalories >= targetCalories * 0.9
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                      : 'bg-gradient-to-r from-[#FF5F2E] to-[#FF912E]'
                  }`}
                  style={{ width: `${progressRatio}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[10px] font-bold text-gray-400">
                <span>المستهلك: {progressRatio}%</span>
                <span>
                  {calorieDiff > 0
                    ? `متبقي ${calorieDiff} سعرة`
                    : calorieDiff === 0
                    ? 'وصلت للهدف تماماً'
                    : `تجاوزت بـ ${Math.abs(calorieDiff)} سعرة`}
                </span>
              </div>
            </div>

            {/* Dynamic Status Indicator Message */}
            <div className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs font-bold ${
              calorieDiff > 0
                ? isDark ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : calorieDiff === 0
                ? isDark ? 'bg-sky-500/10 border-sky-500/20 text-sky-400' : 'bg-sky-50 border-sky-200 text-sky-800'
                : isDark ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}>
              {calorieDiff > 0 ? (
                <>
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                  <span>أنت قريب من هدفك! متبقي لك {calorieDiff} سعرة حرارية للوصول لاحتياجك اليومي الموصى به.</span>
                </>
              ) : calorieDiff === 0 ? (
                <>
                  <Sparkles className="w-4 h-4 shrink-0 text-sky-500" />
                  <span>ممتاز جداً! وصلت تماماً لسعراتك المستهدفة لهذا اليوم ببراعة وحسب الخطة.</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>تنبيه: لقد تجاوزت سعراتك المستهدفة اليوم بـ {Math.abs(calorieDiff)} سعرة حرارية! يمكنك أداء بعض التمارين للحرق.</span>
                </>
              )}
            </div>

            {/* Meals Breakdown by Type */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-dashed border-gray-500/20">
              <div className={`p-2.5 rounded-xl border text-center ${isDark ? 'bg-white/5 border-white/5' : 'bg-white border-gray-100 shadow-2xs'}`}>
                <span className="text-[10px] text-gray-400 block font-bold">🍳 الإفطار</span>
                <span className="text-sm font-black font-mono text-[#FF5F2E]">{mealTypeBreakdown['إفطار']} <span className="text-[9px] font-sans text-gray-400">سعرة</span></span>
              </div>
              <div className={`p-2.5 rounded-xl border text-center ${isDark ? 'bg-white/5 border-white/5' : 'bg-white border-gray-100 shadow-2xs'}`}>
                <span className="text-[10px] text-gray-400 block font-bold">🍗 الغداء</span>
                <span className="text-sm font-black font-mono text-[#FF5F2E]">{mealTypeBreakdown['غداء']} <span className="text-[9px] font-sans text-gray-400">سعرة</span></span>
              </div>
              <div className={`p-2.5 rounded-xl border text-center ${isDark ? 'bg-white/5 border-white/5' : 'bg-white border-gray-100 shadow-2xs'}`}>
                <span className="text-[10px] text-gray-400 block font-bold">🥗 العشاء</span>
                <span className="text-sm font-black font-mono text-[#FF5F2E]">{mealTypeBreakdown['عشاء']} <span className="text-[9px] font-sans text-gray-400">سعرة</span></span>
              </div>
              <div className={`p-2.5 rounded-xl border text-center ${isDark ? 'bg-white/5 border-white/5' : 'bg-white border-gray-100 shadow-2xs'}`}>
                <span className="text-[10px] text-gray-400 block font-bold">🥜 وجبة خفيفة</span>
                <span className="text-sm font-black font-mono text-[#FF5F2E]">{mealTypeBreakdown['وجبة خفيفة']} <span className="text-[9px] font-sans text-gray-400">سعرة</span></span>
              </div>
            </div>
          </div>

          {/* ADD MEAL FORM */}
          <form onSubmit={handleAddMeal} className="space-y-3 pt-1">
            <span className="text-xs font-bold text-gray-400 block">إضافة وجبة جديدة للسجل:</span>
            
            {/* Meal Type Buttons Selector */}
            <div className="grid grid-cols-4 gap-2">
              {(['إفطار', 'غداء', 'عشاء', 'وجبة خفيفة'] as const).map((type) => {
                const icons = { 'إفطار': '🍳', 'غداء': '🍗', 'عشاء': '🥗', 'وجبة خفيفة': '🥜' };
                const isSelected = mealTypeInput === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setMealTypeInput(type)}
                    className={`py-2 px-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-1 border ${
                      isSelected
                        ? 'bg-[#FF5F2E] text-white border-[#FF5F2E] shadow-xs'
                        : isDark
                        ? 'bg-[#222225] text-gray-300 border-white/5 hover:bg-[#2A2A2E]'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-base">{icons[type]}</span>
                    <span>{type}</span>
                  </button>
                );
              })}
            </div>

            {/* Meal Name & Calories Input Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="اسم الوجبة (مثال: الشوفان والموز)..."
                value={mealNameInput}
                onChange={(e) => setMealNameInput(e.target.value)}
                className={`sm:col-span-2 px-3.5 py-2.5 rounded-xl border text-xs focus:outline-hidden focus:border-[#FF5F2E] font-medium ${
                  isDark ? 'bg-[#222225] border-white/5 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-200 text-gray-800'
                }`}
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  required
                  placeholder="السعرات (kcal)"
                  value={mealCaloriesInput}
                  onChange={(e) => setMealCaloriesInput(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-hidden focus:border-[#FF5F2E] font-bold font-mono ${
                    isDark ? 'bg-[#222225] border-white/5 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-200 text-gray-800'
                  }`}
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-gradient-to-r from-[#FF5F2E] to-[#FF912E] hover:opacity-90 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0 shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة</span>
                </button>
              </div>
            </div>
          </form>

          {/* LIST OF TODAY'S MEALS */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-bold text-gray-400 block">الوجبات المضافة اليوم ({calcMeals.length}):</span>
            
            {calcMeals.length === 0 ? (
              <div className={`text-center py-6 rounded-2xl border ${isDark ? 'bg-white/5 border-white/5 text-gray-400' : 'bg-gray-50 border-gray-100 text-gray-500'} text-xs font-medium`}>
                لم تضف أي وجبة حتى الآن. اختر نوع الوجبة وأدخل السعرات أعلاه!
              </div>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {calcMeals.map((item) => {
                  const typeBadges = {
                    'إفطار': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
                    'غداء': 'bg-[#FF5F2E]/10 text-[#FF5F2E] border-[#FF5F2E]/20',
                    'عشاء': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
                    'وجبة خفيفة': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                  };

                  return (
                    <div
                      key={item.id}
                      className={`p-3 rounded-2xl border flex justify-between items-center transition-all ${
                        isDark ? 'bg-[#222225] border-white/5' : 'bg-gray-50 border-gray-100'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[9px] px-2 py-0.5 rounded-full border font-bold ${typeBadges[item.mealType]}`}>
                            {item.mealType}
                          </span>
                          <h4 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {item.name}
                          </h4>
                        </div>
                        <span className="text-[9px] text-gray-400 font-mono block">
                          التوقيت: {item.timeStr}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-sm font-black font-mono text-[#FF5F2E]">
                          +{item.calories} <span className="text-[9px] font-sans text-gray-400">سعرة</span>
                        </span>
                        <button
                          onClick={() => handleDeleteMeal(item.id)}
                          className="p-1.5 text-rose-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all cursor-pointer"
                          title="حذف الوجبة"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* =========================================================
            PANEL 4: BMI & WATER GOAL
            ========================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* BMI Card */}
          <div className={`border p-5 rounded-3xl flex items-center justify-between gap-4 ${
            isDark ? 'bg-[#1A1A1A] border-white/5' : 'bg-white border-gray-100 shadow-sm'
          }`}>
            <div className="space-y-1">
              <span className={`text-xs block ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>مؤشر كتلة جسمك (BMI)</span>
              <div className="flex items-baseline gap-1.5">
                <span className={`text-2xl font-extrabold font-mono ${isDark ? 'text-white' : 'text-gray-900'}`}>{bmi}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${bmiColor}`}>{bmiStatus}</span>
              </div>
              <span className="text-[10px] text-gray-400 block pt-1">
                محسوب من طولي ({height}سم) وزني ({weight}كجم)
              </span>
            </div>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl border shrink-0 ${
              isDark ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'
            }`}>
              ⚖️
            </div>
          </div>

          {/* Water goal recommendation */}
          <div className={`border p-5 rounded-3xl flex items-center gap-4 ${
            isDark ? 'bg-sky-500/10 border-sky-500/20' : 'bg-sky-50 border-sky-100 shadow-xs'
          }`}>
            <div className="p-3 bg-sky-500 text-white rounded-2xl shrink-0">
              <Droplet className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className={`text-xs font-semibold block ${isDark ? 'text-sky-400' : 'text-sky-700'}`}>معدل شرب الماء اليومي الموصى به</span>
              <span className={`text-lg font-extrabold font-mono ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {waterGoal} لتر <span className={`text-xs font-normal ${isDark ? 'text-sky-300' : 'text-sky-600'} font-sans`}>(حوالي {Math.round(waterGoal * 4)} أكواب)</span>
              </span>
              <span className="text-[10px] text-sky-400/80 block">35مل لكل كجم من وزنه</span>
            </div>
          </div>
        </div>

        {/* =========================================================
            PANEL 5: MACRONUTRIENT BREAKDOWN
            ========================================================= */}
        <div className={`p-6 rounded-3xl border shadow-xs space-y-4 ${
          isDark ? 'bg-[#1A1A1A] border-white/5' : 'bg-white border-gray-100 shadow-sm'
        }`}>
          <h3 className={`font-bold text-sm flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-950'}`}>
            <Apple className="w-5 h-5 text-[#FF5F2E]" />
            <span>توزيع العناصر الغذائية الموصى به لمقدار {targetCalories} سعرة</span>
          </h3>
          <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            تقسيم مثالي لبناء عضلات مشدودة ومحاربة شحوم الكرش بمعدل غني بالبروتين المفيد.
          </p>

          <div className="grid grid-cols-3 gap-3 pt-2">
            {/* Proteins */}
            <div className="bg-[#FF5F2E]/5 p-4 rounded-2xl border border-[#FF5F2E]/10 flex flex-col items-center text-center">
              <span className="text-xs font-semibold text-[#FF5F2E] mb-1">البروتينات</span>
              <span className={`text-xl font-extrabold font-mono ${isDark ? 'text-white' : 'text-gray-900'}`}>{proteinGrams}g</span>
              <span className="text-[10px] text-gray-400 font-medium mt-1">{(proteinPct * 100)}% من طعامك</span>
            </div>

            {/* Carbs */}
            <div className="bg-[#FF912E]/5 p-4 rounded-2xl border border-[#FF912E]/10 flex flex-col items-center text-center">
              <span className="text-xs font-semibold text-[#FF912E] mb-1">الكربوهيدرات</span>
              <span className={`text-xl font-extrabold font-mono ${isDark ? 'text-white' : 'text-gray-900'}`}>{carbsGrams}g</span>
              <span className="text-[10px] text-gray-400 font-medium mt-1">{(carbPct * 100)}% من طعامك</span>
            </div>

            {/* Fats */}
            <div className="bg-emerald-500/5 p-4 rounded-2xl border border-emerald-500/10 flex flex-col items-center text-center">
              <span className="text-xs font-semibold text-emerald-500 mb-1">الدهون الصحية</span>
              <span className={`text-xl font-extrabold font-mono ${isDark ? 'text-white' : 'text-gray-900'}`}>{fatGrams}g</span>
              <span className="text-[10px] text-gray-400 font-medium mt-1">{(fatPct * 100)}% من طعامك</span>
            </div>
          </div>
        </div>

      </div>

      <ConfirmModal
        isOpen={isClearConfirmOpen}
        onClose={() => setIsClearConfirmOpen(false)}
        onConfirm={executeClearMeals}
        title="تصفير وجبات اليوم"
        message="هل أنت متأكد من تفريغ سجل وجباتك اليومية لهذا اليوم؟"
        confirmText="تصفير الوجبات"
        cancelText="إلغاء"
        type="danger"
        isDark={isDark}
      />
    </div>
  );
});


