import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Apple,
  Flame,
  Search,
  Plus,
  Trash2,
  Heart,
  AlertCircle,
  Sparkles,
  Scale,
  Info,
  Check,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  X,
  Activity,
  Dumbbell,
  Coffee,
  Droplet,
  Utensils,
  BookOpen,
  Clock,
  HelpCircle,
  RefreshCw,
  HeartHandshake
} from 'lucide-react';

import { UserStats, FoodItem, FoodLogItem, DailyNutritionLog } from '../types';
import { NUTRITION_DB, MEAL_TEMPLATES, INGREDIENT_REPLACEMENTS, MealTemplate } from '../data/nutritionDb';
import { LazyImage } from './LazyImage';

interface SmartNutritionProps {
  userStats: UserStats;
  isDark: boolean;
  onUpdateStats: (updated: UserStats) => void;
}

const DAILY_NUTRITION_TIPS = [
  "شرب كوب من الماء قبل وجباتك بـ 30 دقيقة يساعد على الهضم ويسيطر على مستويات الجوع بفعالية.",
  "تناول البروتين في وجبة الفطور يحفز خلايا حرق الدهون ويمنحك شعوراً بالشبع لمدد أطول خلال اليوم.",
  "استبدل الزيوت المهدرجة والمصنعة بزيت الزيتون البكر الممتاز والدهون الصحية المفيدة مثل الأفوكادو والمكسرات النيئة.",
  "احرص على ملء نصف طبقك بالخضروات الورقية والملونة للحصول على أعلى نسبة من الألياف والفيتامينات الضرورية.",
  "التقليل من الصوديوم والملح الزائد يمنع احتباس السوائل تحت الجلد ويحافظ على توازن ضغط الدم الشرياني.",
  "امضغ طعامك ببطء شديد؛ يستغرق الدماغ حوالي 20 دقيقة كاملة لإرسال إشارات الشبع والامتلاء التام.",
  "الشوفان والكينوا والقمح الكامل مصادر رائعة للألياف والنشويات المعقدة التي تمد جسمك بطاقة نظيفة ومستدامة.",
  "تناول حفنة صغيرة من المكسرات النيئة كوجبة خفيفة يدعم صحة قلبك وشرايينك بفضل الأوميغا 3 والدهون المفيدة.",
  "ابتعد تماماً عن السكريات المصنعة والمشروبات الغازية لتقليل الالتهابات واستبدلها بحبات الفواكه الطازجة الكاملة.",
  "تجنب الوجبات الثقيلة قبل النوم بـ 3 ساعات لضمان جودة نوم عميقة ومريحة وتحسين كفاءة الهضم وحرق الدهون.",
  "إضافة عصير الليمون أو خل التفاح الطبيعي المخفف إلى وجباتك يسهل الهضم ويزيد من امتصاص الحديد والمعادن.",
  "الشاي الأخضر غير المحلى يعد مضاد أكسدة رائعاً ومعززاً طبيعياً لعمليات الأيض والتمثيل الغذائي في خلايا الجسم.",
  "الزبادي اليوناني الطبيعي وجبة خفيفة مثالية غنية ببروتين الكازين والمستنبتات الحية المفيدة جداً لصحة الأمعاء.",
  "وجبة ما بعد التمرين ضرورية جداً؛ يحتاجها جسمك من البروتين والنشويات لإعادة الاستشفاء العضلي وتغذية الأنسجة.",
  "الطبخ والتحضير المنزلي الذكي يمنحك تحكماً كاملاً بجودة المكونات والدهون المضافة لتضمن التزاماً مطلقاً بحميتك."
];

export function SmartNutrition({ userStats, isDark, onUpdateStats }: SmartNutritionProps) {
  const activeTip = useMemo(() => {
    const d = new Date();
    const index = (d.getDate() + d.getMonth() * 31) % DAILY_NUTRITION_TIPS.length;
    return DAILY_NUTRITION_TIPS[index];
  }, []);

  const currentTodayDate = useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }, []);

  // --- STATS & AUTO CALCULATIONS ---
  // Calculates BMR using Mifflin-St Jeor Formula
  const calculatedBmr = useMemo(() => {
    const { weight, height, age, gender } = userStats;
    if (gender === 'ذكر') {
      return Math.round(10 * weight + 6.25 * height - 5 * age + 5);
    } else {
      return Math.round(10 * weight + 6.25 * height - 5 * age - 161);
    }
  }, [userStats]);

  // Calculates TDEE based on activity multiplier
  const calculatedTdee = useMemo(() => {
    // Mapping activity multiplier if it's a code or text
    let multiplier = 1.375;
    if (userStats.activityLevel) {
      multiplier = userStats.activityLevel;
    }
    return Math.round(calculatedBmr * multiplier);
  }, [calculatedBmr, userStats.activityLevel]);

  // Calculates Target Calories and Macros based on user goal
  const dietGoalValues = useMemo(() => {
    const { goal, weight } = userStats;
    let targetCalories = calculatedTdee;
    let proteinPerKg = 1.8;
    let fatPercent = 0.25; // 25% of calories from fat

    if (goal === 'loss') {
      // 500 kcal deficit
      targetCalories = calculatedTdee - 500;
      proteinPerKg = 2.2; // High protein to preserve muscle in deficit
    } else if (goal === 'gain') {
      // 400 kcal surplus
      targetCalories = calculatedTdee + 400;
      proteinPerKg = 2.0;
    } else if (goal === 'maintain') {
      targetCalories = calculatedTdee;
      proteinPerKg = 1.6;
    } else {
      // recomp / body tone (slight deficit with high protein)
      targetCalories = calculatedTdee - 250;
      proteinPerKg = 2.1;
    }

    // Ensure we don't fall below survival calorie limit
    if (targetCalories < 1200) targetCalories = 1200;

    const proteinGrams = Math.round(weight * proteinPerKg);
    const proteinCalories = proteinGrams * 4;
    const fatCalories = targetCalories * fatPercent;
    const fatGrams = Math.round(fatCalories / 9);
    const carbCalories = targetCalories - (proteinCalories + fatCalories);
    const carbGrams = Math.round(carbCalories / 4);

    // Recommended daily water in cups (250ml each)
    const waterLiters = (weight * 35) / 1000 + 0.5; // weight * 35ml + extra for active
    const targetWaterCups = Math.ceil(waterLiters / 0.25);

    // Suitable number of meals
    let recommendedMeals = 4;
    if (goal === 'gain') recommendedMeals = 5;
    if (goal === 'loss') recommendedMeals = 3;

    return {
      calories: targetCalories,
      protein: proteinGrams,
      carbs: carbGrams,
      fats: fatGrams,
      waterCups: targetWaterCups,
      waterLiters: Math.round(waterLiters * 10) / 10,
      mealsCount: recommendedMeals
    };
  }, [calculatedTdee, userStats]);

  // --- STATE MANAGEMENT ---
  const [activeSubTab, setActiveSubTab] = useState<'library' | 'meals' | 'dashboard'>('library');
  
  // Smart floating health tip state (3 seconds duration, 24 hours cooldown)
  const [showFloatingHealthTip, setShowFloatingHealthTip] = useState<boolean>(false);
  const [floatingHealthTipText, setFloatingHealthTipText] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [dietFilter, setDietFilter] = useState<'all' | 'keto' | 'diabetes' | 'vegetarian' | 'loss'>('all');
  const [nutrientFilter, setNutrientFilter] = useState<'all' | 'high_protein' | 'low_carb' | 'low_calorie'>('all');
  
  const [selectedFoodItem, setSelectedFoodItem] = useState<FoodItem | null>(null);
  const [selectedFoodSource, setSelectedFoodSource] = useState<'library' | 'tracker' | null>(null);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('rashaka_nutrition_favorites');
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  // Daily Logging State
  const [nutritionLog, setNutritionLog] = useState<DailyNutritionLog>(() => {
    try {
      const stored = localStorage.getItem(`rashaka_nutrition_log_${currentTodayDate}`);
      if (stored) return JSON.parse(stored);
    } catch (e) { console.error(e); }
    return { date: currentTodayDate, items: [], waterCups: 0 };
  });

  // Logging modal / popup helper
  const [loggingFood, setLoggingFood] = useState<FoodItem | null>(null);
  const [loggingMealType, setLoggingMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack' | 'pre_workout' | 'post_workout' | 'before_sleep'>('breakfast');
  const [loggingServings, setLoggingServings] = useState<number>(1);

  // Custom Macronutrients Logging State
  const [isCustomMacroModalOpen, setIsCustomMacroModalOpen] = useState<boolean>(false);
  const [customMealName, setCustomMealName] = useState<string>('');
  const [customMealType, setCustomMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack' | 'pre_workout' | 'post_workout' | 'before_sleep'>('lunch');
  const [customProtein, setCustomProtein] = useState<string>('25');
  const [customCarbs, setCustomCarbs] = useState<string>('40');
  const [customFats, setCustomFats] = useState<string>('10');
  const [customServings, setCustomServings] = useState<number>(1);

  // Sync favorites & logs to localStorage on changes
  useEffect(() => {
    localStorage.setItem('rashaka_nutrition_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(`rashaka_nutrition_log_${currentTodayDate}`, JSON.stringify(nutritionLog));
  }, [nutritionLog, currentTodayDate]);

  // Trigger smart health floating notification (4 seconds duration, 24 hours cooldown)
  useEffect(() => {
    try {
      const lastShownStr = localStorage.getItem('rashaka_health_tip_last_shown');
      const now = Date.now();
      const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

      if (!lastShownStr || (now - parseInt(lastShownStr, 10)) >= TWENTY_FOUR_HOURS) {
        const d = new Date();
        const index = (d.getDate() + d.getMonth() * 31) % DAILY_NUTRITION_TIPS.length;
        const tipText = DAILY_NUTRITION_TIPS[index] || '💧 تناول كوب ماء متوازن يحافظ على نشاط أيضك وحرق دهون الجسم بكفاءة!';
        setFloatingHealthTipText(tipText);
        setShowFloatingHealthTip(true);

        localStorage.setItem('rashaka_health_tip_last_shown', now.toString());

        const timer = setTimeout(() => {
          setShowFloatingHealthTip(false);
        }, 4000);

        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.error('Error handling smart health notification:', e);
    }
  }, []);

  // --- PERSISTENCE SYNCRONIZATION WITH GLOBAL PROGRESS ---
  // In addition to storing inside nutrition log, we can sync calories eaten to the general dailyLog inside App state if needed.
  // We compute total calories eaten from nutritionLog
  const totals = useMemo(() => {
    return nutritionLog.items.reduce(
      (acc, item) => {
        acc.calories += Math.round(item.calories * item.servings);
        acc.protein += Math.round(item.protein * item.servings);
        acc.carbs += Math.round(item.carbs * item.servings);
        acc.fats += Math.round(item.fats * item.servings);
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fats: 0 }
    );
  }, [nutritionLog]);

  // Sync caloriesEaten with daily logs ofApp
  useEffect(() => {
    try {
      const storedLogs = localStorage.getItem('rashaka_daily_logs');
      const allLogs = storedLogs ? JSON.parse(storedLogs) : {};
      const todayRecord = allLogs[currentTodayDate] || {
        date: currentTodayDate,
        waterCups: 0,
        caloriesBurned: 0,
        caloriesEaten: 0,
        completedExercisesCount: 0,
        completedDays: []
      };

      if (todayRecord.caloriesEaten !== totals.calories) {
        todayRecord.caloriesEaten = totals.calories;
        allLogs[currentTodayDate] = todayRecord;
        localStorage.setItem('rashaka_daily_logs', JSON.stringify(allLogs));
        // Dispatches custom event to notify parent App state of update if needed
        window.dispatchEvent(new Event('storage'));
      }
    } catch (e) {
      console.error("Failed to sync calorie logs:", e);
    }
  }, [totals.calories, currentTodayDate]);

  // --- FAVORITE & LOGIC METHODS ---
  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fav => fav !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const handleOpenLoggingModal = (item: FoodItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setLoggingFood(item);
    setLoggingServings(1);
    // Suggest meal type depending on current hour
    const hr = new Date().getHours();
    if (hr >= 5 && hr < 11) setLoggingMealType('breakfast');
    else if (hr >= 11 && hr < 16) setLoggingMealType('lunch');
    else if (hr >= 16 && hr < 21) setLoggingMealType('dinner');
    else setLoggingMealType('snack');
  };

  const handleSaveFoodLog = () => {
    if (!loggingFood) return;

    const newItem: FoodLogItem = {
      id: `${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      foodId: loggingFood.id,
      nameAr: loggingFood.nameAr,
      mealType: loggingMealType,
      servings: loggingServings,
      calories: loggingFood.calories,
      protein: loggingFood.protein,
      carbs: loggingFood.carbs,
      fats: loggingFood.fats,
      loggedAt: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    };

    setNutritionLog(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));

    setLoggingFood(null);
  };

  const handleSaveCustomMacroLog = () => {
    const p = Math.max(0, parseFloat(customProtein) || 0);
    const c = Math.max(0, parseFloat(customCarbs) || 0);
    const f = Math.max(0, parseFloat(customFats) || 0);
    const name = customMealName.trim() || 'وجبة مخصصة بالماكروز';
    const calsPerServing = Math.round(p * 4 + c * 4 + f * 9);

    const newItem: FoodLogItem = {
      id: `custom_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      foodId: 'custom_macro',
      nameAr: name,
      mealType: customMealType,
      servings: customServings,
      calories: calsPerServing,
      protein: p,
      carbs: c,
      fats: f,
      loggedAt: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    };

    setNutritionLog(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));

    setIsCustomMacroModalOpen(false);
    setCustomMealName('');
  };

  const handleDeleteLogItem = (itemId: string) => {
    setNutritionLog(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId)
    }));
  };

  const handleClearAllLogs = () => {
    if (window.confirm('هل أنت متأكد من رغبتك في تفريغ سجل وجباتك لهذا اليوم بأكمله؟')) {
      setNutritionLog(prev => ({
        ...prev,
        items: []
      }));
    }
  };

  const getFoodEmoji = (category?: string) => {
    switch (category) {
      case 'starchy_veg': return '🥔';
      case 'grain': return '🌾';
      case 'carb': return '🍚';
      case 'legume': return '🫘';
      case 'vegetable': case 'veg': return '🥦';
      case 'fruit': return '🍎';
      case 'poultry': return '🍗';
      case 'meat': return '🥩';
      case 'fish': return '🐟';
      case 'egg': return '🥚';
      case 'dairy': return '🥛';
      case 'fat': return '🫒';
      case 'nut': return '🥜';
      default: return '🥗';
    }
  };

  // --- DIETARY STYLES & FILTERS ---
  // Food items category dictionary
  const CATEGORIES = [
    { id: 'all', label: 'الكل', emoji: '🍽' },
    { id: 'protein', label: 'البروتينات', emoji: '🥩' },
    { id: 'poultry', label: 'الدواجن', emoji: '🍗' },
    { id: 'meat', label: 'اللحوم الحمراء', emoji: '🥩' },
    { id: 'fish', label: 'الأسماك', emoji: '🐟' },
    { id: 'egg', label: 'البيض', emoji: '🥚' },
    { id: 'dairy', label: 'منتجات الألبان', emoji: '🥛' },
    { id: 'carb', label: 'الكربوهيدرات', emoji: '🍚' },
    { id: 'grain', label: 'الحبوب والنشويات', emoji: '🌾' },
    { id: 'starchy_veg', label: 'الخضروات النشوية', emoji: '🥔' },
    { id: 'legume', label: 'البقوليات', emoji: '🫘' },
    { id: 'fat', label: 'الزيوت الصحية', emoji: '🫒' },
    { id: 'nut', label: 'المكسرات', emoji: '🥜' },
    { id: 'vegetable', label: 'الخضروات', emoji: '🥦' },
    { id: 'fruit', label: 'الفواكه', emoji: '🍎' }
  ];

  // Filters food items list based on query, category, and health system checkboxes
  const filteredFoodItems = useMemo(() => {
    return NUTRITION_DB.filter(item => {
      // 1. Text search
      const q = searchQuery.toLowerCase().trim();
      const matchText = q === '' ||
        item.nameAr.toLowerCase().includes(q) ||
        item.nameEn.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);

      // 2. Category selection
      const matchCategory = selectedCategory === 'all' || 
        item.category === selectedCategory ||
        (selectedCategory === 'vegetable' && (item.category === 'veg' || item.category === 'vegetable')) ||
        (selectedCategory === 'protein' && ['poultry', 'meat', 'fish', 'egg', 'dairy'].includes(item.category)) ||
        (selectedCategory === 'carb' && ['grain', 'legume', 'carb', 'starchy_veg'].includes(item.category));

      // 3. Diet systems filters
      let matchDiet = true;
      if (dietFilter === 'keto') matchDiet = item.forKeto;
      else if (dietFilter === 'diabetes') matchDiet = item.forDiabetes;
      else if (dietFilter === 'vegetarian') matchDiet = item.forVegetarian;
      else if (dietFilter === 'loss') matchDiet = item.forLoss;

      // 4. Nutrient limits filters
      let matchNutrient = true;
      if (nutrientFilter === 'high_protein') matchNutrient = item.protein >= 15;
      else if (nutrientFilter === 'low_carb') matchNutrient = item.carbs <= 10;
      else if (nutrientFilter === 'low_calorie') matchNutrient = item.calories <= 100;

      return matchText && matchCategory && matchDiet && matchNutrient;
    });
  }, [searchQuery, selectedCategory, dietFilter, nutrientFilter]);

  // Selected meal plan template depending on goal
  const currentGoalPlan: MealTemplate[] = useMemo(() => {
    const goal = userStats.goal || 'loss';
    const planKey = goal === 'loss' ? 'loss' : goal === 'gain' ? 'gain' : 'maintain';
    return MEAL_TEMPLATES[planKey] || MEAL_TEMPLATES.loss;
  }, [userStats.goal]);

  // Dynamic visual parameters for UI
  const themeCardClass = isDark ? 'bg-[#1E1E22] border-white/5' : 'bg-white border-gray-100 shadow-md';
  const themeBtnTabClass = (active: boolean) => active
    ? 'bg-[#FF5F2E] text-white font-extrabold'
    : (isDark ? 'bg-[#1E1E22] text-gray-400 hover:text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200');

  // Calculates percentage completion of target calories
  const caloriePercent = Math.min(Math.round((totals.calories / dietGoalValues.calories) * 100), 100);
  const proteinPercent = Math.min(Math.round((totals.protein / dietGoalValues.protein) * 100), 100);
  const carbsPercent = Math.min(Math.round((totals.carbs / dietGoalValues.carbs) * 100), 100);
  const fatsPercent = Math.min(Math.round((totals.fats / dietGoalValues.fats) * 100), 100);

  // Calculates BMI (Body Mass Index)
  const calculatedBmi = useMemo(() => {
    const heightInMeters = userStats.height / 100;
    const bmiVal = userStats.weight / (heightInMeters * heightInMeters);
    return Math.round(bmiVal * 10) / 10;
  }, [userStats]);

  const bmiStatusText = useMemo(() => {
    if (calculatedBmi < 18.5) return { text: 'نقص في الوزن', color: 'text-amber-400' };
    if (calculatedBmi >= 18.5 && calculatedBmi < 25) return { text: 'وزن مثالي ورشيق', color: 'text-emerald-500' };
    if (calculatedBmi >= 25 && calculatedBmi < 30) return { text: 'زيادة طفيفة بالوزن', color: 'text-[#FF5F2E]' };
    return { text: 'سمنة مفرطة', color: 'text-rose-500' };
  }, [calculatedBmi]);

  return (
    <div className="space-y-4 pb-24" dir="rtl">
      
      {/* 1. Top Search Bar (Scrolls naturally with content) */}
      <div className={`pt-1 pb-1 transition-colors ${
        isDark ? 'bg-transparent' : 'bg-transparent'
      }`}>
        <div className={`relative w-full flex items-center border rounded-2xl ${
          isDark ? 'bg-[#1E1E22] border-white/5 text-white' : 'bg-white border-gray-200 text-gray-800'
        }`}>
          <Search className="w-4 h-4 text-gray-400 mr-3 absolute right-3" />
          <input
            type="text"
            placeholder="ابحث عن طعام بالعربية أو الإنجليزية..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (e.target.value && activeSubTab !== 'library') {
                setActiveSubTab('library');
              }
            }}
            className="w-full py-2.5 pr-10 pl-4 text-xs bg-transparent focus:outline-hidden"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute left-3 p-1 text-gray-400 hover:text-white cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Scrollable Sub-Tabs Navigation (Moves and scrolls away with content) */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none shrink-0 pt-1">
        {/* 1st: مكتبة الأغذية */}
        <button
          onClick={() => setActiveSubTab('library')}
          className={`px-4 py-2.5 rounded-full text-[11px] whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${themeBtnTabClass(activeSubTab === 'library')}`}
        >
          <Utensils className="w-3.5 h-3.5" />
          <span>مكتبة الأغذية</span>
        </button>

        {/* 2nd: الخطة الذكية - Eye-Catching Glowing Button */}
        <button
          onClick={() => setActiveSubTab('meals')}
          className={`shrink-0 px-4 py-2.5 rounded-full text-xs font-black whitespace-nowrap transition-all duration-300 cursor-pointer flex items-center gap-1.5 active:scale-95 shadow-lg ${
            activeSubTab === 'meals'
              ? 'bg-gradient-to-r from-[#FF5F2E] via-[#FF7A2E] to-[#FF912E] text-white ring-4 ring-[#FF5F2E]/40 scale-105 shadow-[#FF5F2E]/50'
              : 'bg-gradient-to-r from-[#FF5F2E] via-[#FF7A2E] to-[#FF912E] text-white hover:brightness-110 shadow-[#FF5F2E]/35 ring-2 ring-[#FF5F2E]/50 animate-pulse'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-200 shrink-0 animate-spin" style={{ animationDuration: '4s' }} />
          <span>الخطة الذكية</span>
          <span className="bg-white text-[#FF5F2E] text-[9px] font-black px-1.5 py-0.5 rounded-full shadow-xs">
            مقترحة 🔥
          </span>
        </button>

        {/* 3rd: لوحة المتابعة */}
        <button
          onClick={() => setActiveSubTab('dashboard')}
          className={`px-4 py-2.5 rounded-full text-[11px] whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${themeBtnTabClass(activeSubTab === 'dashboard')}`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>لوحة المتابعة</span>
        </button>
      </div>

      {/* =======================================================
          SUB-TAB 1: FOOD TRACKING DASHBOARD 
          ======================================================= */}
      {activeSubTab === 'dashboard' && (
        <div className="space-y-6">
          
          {/* نصيحة اليوم الذكية */}
          <div className={`p-4 rounded-3xl border border-dashed flex items-start gap-3.5 relative overflow-hidden ${
            isDark 
              ? 'bg-[#FF5F2E]/5 border-[#FF5F2E]/30 text-white' 
              : 'bg-[#FF5F2E]/5 border-[#FF5F2E]/20 text-gray-900'
          }`}>
            <div className="absolute right-0 top-0 w-16 h-16 bg-[#FF5F2E]/10 rounded-full blur-xl pointer-events-none"></div>
            <div className="p-2 bg-[#FF5F2E] text-white rounded-2xl shadow-xs shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <div className="space-y-1">
              <span className="text-[9px] font-black text-[#FF5F2E] tracking-wider block">⚡ نصيحة التغذية السليمة لليوم</span>
              <p className="text-[11px] font-bold leading-relaxed">{activeTip}</p>
            </div>
          </div>
          
          {/* Calorie Progress Ring / Bar Summary */}
          <div className={`p-5 rounded-3xl border ${themeCardClass} relative overflow-hidden`}>
            <div className="absolute left-0 bottom-0 w-24 h-24 bg-[#FF5F2E]/5 rounded-full blur-2xl"></div>
            
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-1">
                <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-black px-2 py-0.5 rounded-full">
                  سجل اليوم الحالي
                </span>
                <h3 className={`text-sm font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>مجموع السعرات والمغذيات اليومية</h3>
              </div>
              <div className="text-left">
                <span className="text-2xl font-black font-mono text-[#FF5F2E]">{totals.calories}</span>
                <span className="text-[10px] text-gray-400 font-bold"> / {dietGoalValues.calories} سعرة</span>
              </div>
            </div>

            {/* Main Progress Bar */}
            <div className="space-y-2">
              <div className={`w-full h-3 rounded-full overflow-hidden ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    totals.calories > dietGoalValues.calories
                      ? 'bg-rose-500'
                      : 'bg-gradient-to-l from-[#FF5F2E] to-[#FF912E]'
                  }`}
                  style={{ width: `${caloriePercent}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[10px] text-gray-400 font-bold">
                <span>المستهلك: {caloriePercent}%</span>
                <span>المتبقي: {Math.max(0, dietGoalValues.calories - totals.calories)} سعرة</span>
              </div>
            </div>

            {/* Exceeded Target Calorie warning */}
            {totals.calories > dietGoalValues.calories && (
              <div className="mt-4 p-3 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-start gap-2.5 text-rose-400">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p className="text-[10px] leading-relaxed font-bold">
                  تنبيه ذكي: لقد تجاوزت سعراتك الحرارية الموصى بها لهذا اليوم بمقدار {totals.calories - dietGoalValues.calories} سعرة! يرجى ممارسة تمرين إضافي أو شرب كوب ماء لتقليل الشهية.
                </p>
              </div>
            )}

            {/* Macros Breakdown Bars */}
            <div className="grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-dashed border-gray-500/10">
              {/* Protein */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-bold">
                  <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>🥩 بروتين</span>
                  <span className="text-emerald-500 font-mono">{totals.protein}ج / {dietGoalValues.protein}ج</span>
                </div>
                <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
                  <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${proteinPercent}%` }}></div>
                </div>
              </div>

              {/* Carbs */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-bold">
                  <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>🍚 كربوهيدرات</span>
                  <span className="text-sky-400 font-mono">{totals.carbs}ج / {dietGoalValues.carbs}ج</span>
                </div>
                <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
                  <div className="bg-sky-400 h-full rounded-full transition-all duration-500" style={{ width: `${carbsPercent}%` }}></div>
                </div>
              </div>

              {/* Fats */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-bold">
                  <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>🥑 دهون صحية</span>
                  <span className="text-amber-500 font-mono">{totals.fats}ج / {dietGoalValues.fats}ج</span>
                </div>
                <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
                  <div className="bg-amber-500 h-full rounded-full transition-all duration-500" style={{ width: `${fatsPercent}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* User parameters review brief */}
          <div className="grid grid-cols-4 gap-2.5">
            <div className={`p-3 rounded-2xl border text-center ${themeCardClass}`}>
              <span className="text-[8px] text-gray-400 block font-black">جسمك الحالي</span>
              <span className={`text-[11px] font-black block mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{userStats.weight} كجم</span>
            </div>
            <div className={`p-3 rounded-2xl border text-center ${themeCardClass}`}>
              <span className="text-[8px] text-gray-400 block font-black">مؤشر الكتلة BMI</span>
              <span className={`text-[11px] font-black block mt-1 ${bmiStatusText.color}`}>{calculatedBmi} ({bmiStatusText.text})</span>
            </div>
            <div className={`p-3 rounded-2xl border text-center ${themeCardClass}`}>
              <span className="text-[8px] text-gray-400 block font-black">حاجتك للماء</span>
              <span className="text-[11px] font-black block text-sky-400 mt-1">{dietGoalValues.waterLiters} لتر</span>
            </div>
            <div className={`p-3 rounded-2xl border text-center ${themeCardClass}`}>
              <span className="text-[8px] text-gray-400 block font-black">الأيض الأساسي BMR</span>
              <span className={`text-[11px] font-black block mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{calculatedBmr} سعرة</span>
            </div>
          </div>

          {/* Todays Registered Meals list */}
          <div className="space-y-3">
            <div className="flex flex-wrap justify-between items-center gap-2 px-1">
              <div className="flex items-center gap-2">
                <h4 className={`text-xs font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>سجل الأكلات المتناولة اليوم</h4>
                <button
                  onClick={() => setIsCustomMacroModalOpen(true)}
                  className="px-2.5 py-1 bg-[#FF5F2E]/10 hover:bg-[#FF5F2E]/20 text-[#FF5F2E] border border-[#FF5F2E]/30 rounded-full text-[10px] font-black transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  <span>تسجيل وجبة بالماكروز</span>
                </button>
              </div>

              {nutritionLog.items.length > 0 && (
                <button
                  onClick={handleClearAllLogs}
                  className="text-[10px] text-rose-400 hover:text-rose-500 transition-all font-black flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>تصفير وجبات اليوم</span>
                </button>
              )}
            </div>

            {nutritionLog.items.length === 0 ? (
              <div className={`text-center py-8 rounded-2xl border ${themeCardClass} space-y-2`}>
                <span className="text-3xl">🍲</span>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} font-bold`}>لم تسجل أي وجبة بعد اليوم.</p>
                <button
                  onClick={() => setActiveSubTab('library')}
                  className="mt-2 text-[10px] text-[#FF5F2E] hover:underline font-extrabold cursor-pointer"
                >
                  تصفح المكتبة وسجل وجباتك لتتبع سعراتك 🚀
                </button>
              </div>
            ) : (
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                {nutritionLog.items.map((item) => {
                  const mealTypeNames: Record<string, string> = {
                    breakfast: 'إفطار',
                    lunch: 'غداء',
                    dinner: 'عشاء',
                    snack: 'وجبة خفيفة',
                    pre_workout: 'قبل التمرين',
                    post_workout: 'بعد التمرين',
                    before_sleep: 'قبل النوم'
                  };
                  const baseFoodItem = NUTRITION_DB.find(f => f.id === item.foodId) || NUTRITION_DB.find(f => f.nameAr === item.nameAr || f.nameAr.startsWith(item.nameAr) || item.nameAr.startsWith(f.nameAr));
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        if (baseFoodItem) {
                          setSelectedFoodItem(baseFoodItem);
                          setSelectedFoodSource('tracker');
                        }
                      }}
                      className={`p-3 rounded-2xl border flex justify-between items-center transition-all duration-200 ${
                        baseFoodItem ? 'cursor-pointer hover:border-[#FF5F2E]/40 active:scale-[0.99]' : ''
                      } ${themeCardClass}`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[8px] px-2 py-0.5 rounded-full font-black ${
                            isDark ? 'bg-white/5 text-gray-300' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {mealTypeNames[item.mealType] || 'وجبة'}
                          </span>
                          <h5 className={`text-xs font-black flex items-center gap-1 ${isDark ? 'text-white font-black' : 'text-gray-900 font-black'}`}>
                            {item.nameAr}
                            {baseFoodItem && <span className="text-[9px] text-gray-400 font-normal">ℹ️</span>}
                          </h5>
                        </div>
                        <p className="text-[9px] text-gray-400 font-bold">
                          الكمية: {item.servings} حصة • {item.loggedAt}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-4 text-left">
                        <div>
                          <span className="text-xs font-black font-mono text-[#FF5F2E] block">
                            +{Math.round(item.calories * item.servings)} سعرة
                          </span>
                          <span className="text-[8px] text-gray-400 block font-mono">
                            ب:{Math.round(item.protein * item.servings)}ج • ك:{Math.round(item.carbs * item.servings)}ج • د:{Math.round(item.fats * item.servings)}ج
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteLogItem(item.id);
                          }}
                          className="p-1.5 rounded-lg text-rose-400 hover:text-rose-500 hover:bg-rose-500/10 transition-all cursor-pointer"
                          title="حذف الأكلة من السجل"
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
      )}

      {/* =======================================================
          SUB-TAB 2: SMART MEAL PLAN GENERATOR 
          ======================================================= */}
      {activeSubTab === 'meals' && (
        <div className="space-y-6">
          
          {/* Header Description of custom plan */}
          <div className={`p-4 rounded-3xl border text-right relative overflow-hidden ${themeCardClass}`}>
            <div className="absolute left-0 bottom-0 w-24 h-24 bg-[#FF5F2E]/5 rounded-full blur-xl"></div>
            <span className="text-[9px] bg-[#FF5F2E] text-white font-bold px-2 py-0.5 rounded-full">
              خطة نظامك الغذائي المقترح حسب هدفك
            </span>
            <h3 className={`text-base font-black mt-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              نظام غذائي لـ {
                userStats.goal === 'loss' ? 'عجز السعرات والتخسيس' :
                userStats.goal === 'gain' ? 'زيادة السعرات والتضخيم وبناء العضلات' :
                userStats.goal === 'maintain' ? 'المحافظة على الوزن والرشاقة' : 'شد الجسم والتوازن العالي للبروتين'
              }
            </h3>
            <p className={`text-xs mt-1.5 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              قام خبير التغذية الذكي في تطبيقنا بجدولة هذه الوجبات اليومية الست خصيصاً لتتناسب مع وزنك الحالي واحتياجك اليومي من الطاقة لتتمكن من نحت بطنك وخصرك وبناء عضلاتك في غضون 30 يوماً!
            </p>
          </div>

          {/* Meals list loop */}
          <div className="space-y-4">
            {currentGoalPlan.map((meal) => {
              const mealTypeIcons: Record<string, string> = {
                breakfast: '🍳',
                lunch: '🥗',
                dinner: '🍽',
                snack: '🥜',
                pre_workout: '🍌',
                post_workout: '🥩',
                before_sleep: '🥛'
              };

              return (
                <div
                  key={meal.id}
                  className={`group border rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#FF5F2E]/10 hover:-translate-y-1 hover:border-[#FF5F2E]/40 flex flex-col ${themeCardClass}`}
                >
                  {/* Photo Banner with Lazy Loading */}
                  <div className="relative h-32 bg-gray-900 overflow-hidden">
                    <LazyImage
                      src={meal.imageUrl}
                      categoryOrType={meal.type}
                      fallbackEmoji="🍲"
                      alt={meal.nameAr}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                    <div className="absolute right-4 bottom-3 text-right">
                      <span className="inline-flex items-center gap-1 text-[10px] bg-black/60 backdrop-blur-md text-[#FF7A2E] font-black px-2.5 py-1 rounded-full border border-[#FF5F2E]/30 shadow-xs mb-1">
                        {mealTypeIcons[meal.type] || '🍽'} {meal.timeAr}
                      </span>
                      <h4 className="text-sm font-black text-white drop-shadow-sm">{meal.nameAr}</h4>
                    </div>
                    <div className="absolute left-4 bottom-3 text-left flex flex-col items-end">
                      <span className="text-xs font-black text-emerald-300 bg-emerald-950/70 backdrop-blur-md border border-emerald-500/30 px-2.5 py-1 rounded-full shadow-xs font-mono">
                        {meal.calories} سعرة
                      </span>
                      <span className="text-[8.5px] text-gray-200 font-bold font-mono mt-1 bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-xs">
                        ب:{meal.protein}ج • ك:{meal.carbs}ج • د:{meal.fats}ج
                      </span>
                    </div>
                  </div>

                  {/* Ingredients and Instructions */}
                  <div className="p-4 space-y-3">
                    <div className="space-y-1.5">
                      <span className="text-[9.5px] text-[#FF5F2E] font-black flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF5F2E] animate-pulse"></span>
                        المكونات الأساسية للوجبة:
                      </span>
                      <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                        {meal.ingredients.map((ing, i) => (
                          <li key={i} className={`text-[10px] font-bold flex items-center gap-1.5 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                            <span className="w-1.5 h-1.5 bg-[#FF5F2E]/60 rounded-full shrink-0"></span>
                            {ing}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2.5 border-t border-gray-500/10 space-y-1.5">
                      <span className="text-[9.5px] text-gray-400 block font-black">خطوات الإعداد والتحضير:</span>
                      <div className={`text-[10px] leading-relaxed space-y-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {meal.prepInstructions.map((step, idx) => (
                          <p key={idx} className="flex gap-1.5 items-start">
                            <span className="font-mono text-[#FF5F2E] shrink-0 font-black bg-[#FF5F2E]/10 px-1.5 py-0.5 rounded-md text-[9px]">
                              {idx + 1}
                            </span>
                            <span className="mt-0.5">{step}</span>
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =======================================================
          SUB-TAB 3: COMPREHENSIVE FOOD ENCYCLOPEDIA / LIBRARY
          ======================================================= */}
      {activeSubTab === 'library' && (
        <div className="space-y-4">
          
          {/* Category Icons Horizontal list */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-[10px] whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 font-bold ${
                  selectedCategory === cat.id
                    ? 'bg-[#FF5F2E]/10 border border-[#FF5F2E]/30 text-[#FF5F2E] font-black'
                    : (isDark ? 'bg-[#1E1E22] text-gray-400 border border-white/5 hover:text-white' : 'bg-gray-50 border border-gray-100 text-gray-600')
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Health dietary and nutrient filters row */}
          <div className="grid grid-cols-2 gap-2 text-[9px] font-black">
            {/* System select filter */}
            <select
              value={dietFilter}
              onChange={(e) => setDietFilter(e.target.value as any)}
              className={`p-2.5 rounded-xl border focus:outline-hidden ${
                isDark ? 'bg-[#1E1E22] border-white/5 text-white' : 'bg-white border-gray-200 text-gray-700'
              }`}
            >
              <option value="all">فلترة حسب نظام الحمية</option>
              <option value="keto">مناسب لنظام الكيتو 🥑</option>
              <option value="diabetes">مناسب لمرضى السكر 🩸</option>
              <option value="vegetarian">مناسب للنباتيين 🌱</option>
              <option value="loss">مناسب للتخسيس والوزن 📉</option>
            </select>

            {/* Nutrients filter option */}
            <select
              value={nutrientFilter}
              onChange={(e) => setNutrientFilter(e.target.value as any)}
              className={`p-2.5 rounded-xl border focus:outline-hidden ${
                isDark ? 'bg-[#1E1E22] border-white/5 text-white' : 'bg-white border-gray-200 text-gray-700'
              }`}
            >
              <option value="all">فلترة حسب تركيز المغذيات</option>
              <option value="high_protein">بروتين مرتفع (أكثر من 15ج)</option>
              <option value="low_carb">كربوهيدرات منخفضة (أقل من 10ج)</option>
              <option value="low_calorie">سعرات منخفضة (أقل من 100 سعرة)</option>
            </select>
          </div>

          {/* Food Grid Display list */}
          <div className="grid grid-cols-2 gap-3">
            {filteredFoodItems.map((item) => {
              const isFav = favorites.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedFoodItem(item);
                    setSelectedFoodSource('library');
                  }}
                  className={`border rounded-2xl overflow-hidden transition-all duration-300 hover:scale-101 cursor-pointer flex flex-col justify-between ${themeCardClass}`}
                >
                  <div className="relative h-20 bg-gray-900">
                    <LazyImage
                      src={item.imageUrl}
                      fallbackSrc={item.fallbackImageUrl}
                      categoryOrType={item.category}
                      fallbackEmoji={getFoodEmoji(item.category)}
                      alt={item.nameAr}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover opacity-85"
                    />
                    
                    {/* Favorite Button */}
                    <button
                      onClick={(e) => handleToggleFavorite(item.id, e)}
                      className={`absolute left-2.5 top-2.5 p-1.5 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                        isFav
                          ? 'bg-rose-500 text-white'
                          : 'bg-black/40 text-gray-300 hover:text-white hover:bg-black/60'
                      }`}
                    >
                      <Heart className="w-3.5 h-3.5 fill-current" />
                    </button>

                    {/* Satiety Index badge */}
                    <div className="absolute right-2.5 top-2.5 px-2 py-0.5 bg-black/40 backdrop-blur-md rounded-md text-[8px] font-black text-amber-400">
                      مؤشر شبع: {item.satietyIndex}/5
                    </div>
                  </div>

                  <div className="p-3 space-y-1.5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className={`text-xs font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.nameAr}</h4>
                      <span className="text-[8px] text-gray-400 font-medium font-mono uppercase block">{item.nameEn}</span>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-dashed border-gray-500/10">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-emerald-500 font-mono font-black">{item.calories} سعرة</span>
                        <span className="text-gray-400 font-mono text-[8px]">{item.servingSize}</span>
                      </div>

                      {/* Micro visual bar representation */}
                      <div className="grid grid-cols-3 gap-1 text-[8px] font-mono font-bold text-center">
                        <div className="bg-emerald-500/10 text-emerald-500 px-1 py-0.5 rounded-md">ب:{item.protein}ج</div>
                        <div className="bg-sky-500/10 text-sky-400 px-1 py-0.5 rounded-md">ك:{item.carbs}ج</div>
                        <div className="bg-amber-500/10 text-amber-500 px-1 py-0.5 rounded-md">د:{item.fats}ج</div>
                      </div>

                      {/* Add directly to daily logger button */}
                      <button
                        onClick={(e) => handleOpenLoggingModal(item, e)}
                        className="w-full py-1.5 bg-[#FF5F2E] hover:bg-[#FF5F2E]/90 text-white rounded-lg font-black text-[9px] flex items-center justify-center gap-1 mt-1 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>تسجيل باليوميات</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredFoodItems.length === 0 && (
            <div className={`text-center py-10 rounded-2xl border ${themeCardClass}`}>
              <span className="text-4xl block mb-2">🔍</span>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} font-bold`}>
                عذراً، لم نجد أي مادة غذائية تطابق بحثك حالياً. يرجى تجربة كلمات بحثية أخرى.
              </p>
            </div>
          )}
        </div>
      )}

      {/* =======================================================
          MODAL 1: ADD FOOD LOG QUANTITY & MEAL POPUP 
          ======================================================= */}
      <AnimatePresence>
        {loggingFood && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" dir="rtl">
            <div className="absolute inset-0" onClick={() => setLoggingFood(null)}></div>
            
            <div className={`w-full max-w-sm rounded-3xl border p-6 space-y-4 relative z-10 ${
              isDark ? 'bg-[#161618] border-white/10 text-white' : 'bg-white border-gray-100 text-gray-900 shadow-2xl'
            }`}>
              <div className="flex justify-between items-start border-b border-gray-500/10 pb-2">
                <div>
                  <span className="text-[9px] text-[#FF5F2E] font-black block">تسجيل أكلة باليوميات</span>
                  <h4 className="text-sm font-black mt-0.5">{loggingFood.nameAr}</h4>
                </div>
                <button
                  onClick={() => setLoggingFood(null)}
                  className={`p-1.5 rounded-lg ${isDark ? 'bg-white/5 text-gray-400 hover:text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Meal Select Category */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-gray-400 font-black block">نوع الوجبة:</label>
                <select
                  value={loggingMealType}
                  onChange={(e) => setLoggingMealType(e.target.value as any)}
                  className={`w-full p-2.5 rounded-xl border text-xs focus:outline-hidden ${
                    isDark ? 'bg-white/5 border-white/5 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'
                  }`}
                >
                  <option value="breakfast">🍳 وجبة الإفطار</option>
                  <option value="lunch">🥗 وجبة الغداء</option>
                  <option value="dinner">🍽 وجبة العشاء</option>
                  <option value="snack">🥜 وجبة خفيفة (سناك)</option>
                  <option value="pre_workout">🍌 قبل التمرين</option>
                  <option value="post_workout">🥩 بعد التمرين</option>
                  <option value="before_sleep">🥛 قبل النوم</option>
                </select>
              </div>

              {/* Servings Slider / input */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-black">
                  <span className="text-gray-400">عدد الحصص (Serving):</span>
                  <span className="text-[#FF5F2E] font-mono">{loggingServings} حصة</span>
                </div>
                <input
                  type="range"
                  min={0.5}
                  max={5}
                  step={0.5}
                  value={loggingServings}
                  onChange={(e) => setLoggingServings(Number(e.target.value))}
                  className="w-full accent-[#FF5F2E] h-1 bg-gray-600 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[8px] text-gray-400 font-bold">
                  <span>0.5 (نصف حصة)</span>
                  <span>1.0</span>
                  <span>2.0</span>
                  <span>3.0</span>
                  <span>5.0 (كبير جداً)</span>
                </div>
              </div>

              {/* Nutritional preview after multiplier */}
              <div className={`p-3 rounded-2xl border ${isDark ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'} text-xs font-bold`}>
                <span className="text-[9px] text-gray-400 block mb-1">القيم المسجلة لليوميات:</span>
                <div className="flex justify-between font-mono text-[#FF5F2E] text-sm font-black mb-1.5">
                  <span>السعرات الإجمالية:</span>
                  <span>{Math.round(loggingFood.calories * loggingServings)} سعرة</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 text-[10px] font-mono text-center">
                  <div className="bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded-lg">ب: {Math.round(loggingFood.protein * loggingServings)}ج</div>
                  <div className="bg-sky-500/10 text-sky-400 px-2 py-1 rounded-lg">ك: {Math.round(loggingFood.carbs * loggingServings)}ج</div>
                  <div className="bg-amber-500/10 text-amber-500 px-2 py-1 rounded-lg">د: {Math.round(loggingFood.fats * loggingServings)}ج</div>
                </div>
              </div>

              {/* Save trigger */}
              <button
                onClick={handleSaveFoodLog}
                className="w-full py-3 bg-gradient-to-r from-[#FF5F2E] to-[#FF912E] hover:opacity-90 text-white font-extrabold text-xs rounded-2xl transition-all cursor-pointer"
              >
                تأكيد التسجيل في المفكرة اليومية 👍
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* =======================================================
          MODAL 2: FOOD DETAIL PAGE / DRAWER 
          ======================================================= */}
      <AnimatePresence>
        {selectedFoodItem && (
          <div className="fixed inset-0 bg-black/80 z-40 flex items-end justify-center" dir="rtl">
            <div className="absolute inset-0" onClick={() => setSelectedFoodItem(null)}></div>
            
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className={`relative max-w-md w-full border-t rounded-t-[36px] overflow-hidden z-50 max-h-[92%] overflow-y-auto ${
                isDark ? 'bg-[#161618] border-white/10 text-white' : 'bg-white border-gray-200 text-gray-900 shadow-2xl'
              }`}
            >
              <div className="relative h-44 bg-gray-900">
                <LazyImage
                  src={selectedFoodItem.imageUrl}
                  fallbackSrc={selectedFoodItem.fallbackImageUrl}
                  categoryOrType={selectedFoodItem.category}
                  fallbackEmoji={getFoodEmoji(selectedFoodItem.category)}
                  alt={selectedFoodItem.nameAr}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedFoodItem(null)}
                  className={`absolute left-5 top-5 p-2 rounded-full transition-all cursor-pointer ${
                    isDark ? 'bg-black/40 text-gray-300 hover:text-white' : 'bg-white/80 text-gray-700 hover:text-gray-900'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute right-5 bottom-4 text-right">
                  <span className="text-[10px] bg-[#FF5F2E] text-white font-black px-2.5 py-0.5 rounded-full block w-max uppercase mb-1">
                    {selectedFoodItem.servingSize}
                  </span>
                  <h3 className="text-base font-black text-white">{selectedFoodItem.nameAr}</h3>
                  <span className="text-[10px] text-gray-300 font-medium font-mono uppercase mt-0.5 block">{selectedFoodItem.nameEn}</span>
                </div>
              </div>

              {/* Nutrition & Detailed values */}
              <div className="p-6 space-y-5">
                
                {/* Core Macros visually detailed */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black">القيم الغذائية المجهرية:</span>
                    <span className="text-xs font-black font-mono text-emerald-500">{selectedFoodItem.calories} سعرة حرارية</span>
                  </div>

                  {/* Macros grid */}
                  <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono font-bold">
                    <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-xl border border-emerald-500/15">
                      <span className="block text-[8px] text-gray-400">بروتين</span>
                      <span className="text-xs font-black">{selectedFoodItem.protein}ج</span>
                    </div>
                    <div className="p-2 bg-sky-500/10 text-sky-400 rounded-xl border border-sky-500/15">
                      <span className="block text-[8px] text-gray-400">كربوهيدرات</span>
                      <span className="text-xs font-black">{selectedFoodItem.carbs}ج</span>
                    </div>
                    <div className="p-2 bg-amber-500/10 text-amber-500 rounded-xl border border-amber-500/15">
                      <span className="block text-[8px] text-gray-400">دهون صحية</span>
                      <span className="text-xs font-black">{selectedFoodItem.fats}ج</span>
                    </div>
                  </div>

                  {/* Micronutrients row */}
                  <div className={`p-3 rounded-2xl grid grid-cols-5 gap-2 text-[9px] font-mono font-bold text-center ${
                    isDark ? 'bg-white/5' : 'bg-gray-50'
                  }`}>
                    <div>
                      <span className="text-gray-400 block">ألياف</span>
                      <span className={isDark ? 'text-white' : 'text-gray-800'}>{selectedFoodItem.fiber}ج</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block">سكر</span>
                      <span className={isDark ? 'text-white' : 'text-gray-800'}>{selectedFoodItem.sugar}ج</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block">صوديوم</span>
                      <span className="text-amber-500">{selectedFoodItem.sodium}مج</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block">حديد</span>
                      <span className="text-rose-400">{selectedFoodItem.iron}مج</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block">مغنيسيوم</span>
                      <span className="text-indigo-400">{selectedFoodItem.magnesium}مج</span>
                    </div>
                  </div>
                </div>

                {/* Benefits List */}
                <div className="space-y-1.5">
                  <h4 className="text-xs font-black flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span>الفوائد والمميزات الصحية:</span>
                  </h4>
                  <ul className="space-y-1">
                    {selectedFoodItem.benefits.map((ben, i) => (
                      <li key={i} className={`text-[10px] leading-relaxed font-bold flex gap-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="text-emerald-500 shrink-0">•</span>
                        <span>{ben}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Overconsumption warning */}
                <div className="space-y-1">
                  <h4 className="text-xs font-black text-rose-400 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>الأضرار والتحذير عند الإفراط:</span>
                  </h4>
                  <p className={`text-[10px] leading-relaxed font-bold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {selectedFoodItem.sideEffects}
                  </p>
                </div>

                {/* Recommended intake and best time to eat */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className={`p-2.5 rounded-2xl border ${isDark ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                    <span className="text-[9px] text-gray-400 block font-black">الكمية اليومية الموصى بها</span>
                    <p className={`text-[10px] font-black mt-0.5 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{selectedFoodItem.recommendedDaily}</p>
                  </div>
                  <div className={`p-2.5 rounded-2xl border ${isDark ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                    <span className="text-[9px] text-gray-400 block font-black">أفضل وقت لتناوله</span>
                    <p className={`text-[10px] font-black mt-0.5 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{selectedFoodItem.bestTime}</p>
                  </div>
                </div>

                {/* Healthy prep/methods list */}
                {selectedFoodItem.prepMethods && selectedFoodItem.prepMethods.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-[9px] text-gray-400 block font-black">أفضل طرق تحضير واستخدام صحية:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedFoodItem.prepMethods.map((meth, i) => (
                        <span
                          key={i}
                          className={`text-[9px] px-2.5 py-1 rounded-lg font-bold border ${
                            isDark ? 'bg-white/5 border-white/5 text-gray-300' : 'bg-gray-100 border-gray-200 text-gray-700 shadow-2xs'
                          }`}
                        >
                          {meth}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dynamic Smart Replacement / Alternatives Engine */}
                <div className="pt-4 border-t border-dashed border-gray-500/10 space-y-2">
                  <div className="flex items-center gap-1 text-[#FF5F2E]">
                    <RefreshCw className="w-4 h-4 shrink-0" />
                    <span className="text-xs font-black">محرك البدائل الغذائية الذكية:</span>
                  </div>

                  {INGREDIENT_REPLACEMENTS[selectedFoodItem.id] ? (
                    <div className="space-y-2">
                      <p className={`text-[10px] leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        إذا لم يتوفر لديك {selectedFoodItem.nameAr} حالياً، يقترح لك كوتش التغذية الاستعانة بأحد البدائل التالية للحفاظ على استقرار سعراتك ونظامك الغذائي بذكاء:
                      </p>
                      <div className="space-y-2">
                        {INGREDIENT_REPLACEMENTS[selectedFoodItem.id].map((rep, idx) => (
                          <div
                            key={idx}
                            onClick={() => {
                              const matchFood = NUTRITION_DB.find(f => f.id === rep.replacementId);
                              if (matchFood) {
                                setSelectedFoodItem(matchFood);
                              }
                            }}
                            className={`p-2.5 rounded-xl border flex flex-col gap-1 text-right cursor-pointer transition-all hover:scale-101 hover:border-[#FF5F2E]/40 ${
                              isDark ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-gray-50 border-gray-100 hover:bg-gray-100'
                            }`}
                          >
                            <div className="flex justify-between text-[10px] font-black">
                              <span className="text-[#FF5F2E] flex items-center gap-1">
                                <HeartHandshake className="w-3.5 h-3.5" />
                                <span>البديل: {rep.nameAr}</span>
                              </span>
                              <span className="text-emerald-500 font-mono">النسبة المقترحة: {rep.ratio}</span>
                            </div>
                            <p className="text-[9px] text-gray-400 font-bold leading-normal">{rep.note}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className={`text-[9px] leading-relaxed text-gray-400 font-medium`}>
                      هذا المكون يعتبر مصدراً صحياً أساسياً متميزاً؛ في حال رغبتك بالتبديل، ركز على تناول مكون من نفس العائلة ببروتينات أو كربوهيدرات معقدة مساوية لتوازن يومياتك.
                    </p>
                  )}
                </div>

                {/* Save to Log from Details drawer */}
                {selectedFoodSource !== 'tracker' && (
                  <div className="pt-4">
                    <button
                      onClick={(e) => handleOpenLoggingModal(selectedFoodItem, e)}
                      className="w-full py-3.5 bg-gradient-to-r from-[#FF5F2E] to-[#FF912E] hover:opacity-90 text-white font-extrabold text-xs rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4 text-white" />
                      <span>تسجيل هذا العنصر في سجل وجبات اليوم</span>
                    </button>
                  </div>
                )}

              </div>
            </motion.div>
          </div>
        )}
        {/* Custom Macro Logging Modal */}
        {isCustomMacroModalOpen && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" dir="rtl">
            <div className="absolute inset-0" onClick={() => setIsCustomMacroModalOpen(false)}></div>
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`relative max-w-md w-full rounded-3xl p-6 space-y-5 z-10 border shadow-2xl ${
                isDark ? 'bg-[#18181B] border-white/10 text-white' : 'bg-white border-gray-100 text-gray-900'
              }`}
            >
              <div className="flex justify-between items-center pb-2 border-b border-gray-500/10">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-[#FF5F2E]/10 text-[#FF5F2E] rounded-xl">
                    <Apple className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black">تسجيل وجبة مخصصة (الماكروز)</h3>
                    <p className="text-[10px] text-gray-400 font-bold">أدخل البروتين، الكربوهيدرات، والدهون</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCustomMacroModalOpen(false)}
                  className={`p-2 rounded-full cursor-pointer ${isDark ? 'bg-white/5 text-gray-400 hover:text-white' : 'bg-gray-100 text-gray-500'}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                {/* Meal Name */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-400 block">اسم الوجبة</label>
                  <input
                    type="text"
                    placeholder="مثال: طبق دجاج بالأرز وسلطة"
                    value={customMealName}
                    onChange={(e) => setCustomMealName(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-2xl border text-xs font-bold outline-none ${
                      isDark ? 'bg-[#222225] border-white/10 text-white placeholder-gray-500 focus:border-[#FF5F2E]' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-[#FF5F2E]'
                    }`}
                  />
                </div>

                {/* Meal Category */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-400 block">فئة الوجبة</label>
                  <select
                    value={customMealType}
                    onChange={(e) => setCustomMealType(e.target.value as any)}
                    className={`w-full px-3.5 py-2.5 rounded-2xl border text-xs font-bold outline-none ${
                      isDark ? 'bg-[#222225] border-white/10 text-white focus:border-[#FF5F2E]' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-[#FF5F2E]'
                    }`}
                  >
                    <option value="breakfast">🍳 إفطار</option>
                    <option value="lunch">🍗 غداء</option>
                    <option value="dinner">🥗 عشاء</option>
                    <option value="snack">🍎 وجبة خفيفة</option>
                    <option value="pre_workout">⚡ قبل التمرين</option>
                    <option value="post_workout">🥩 بعد التمرين</option>
                    <option value="before_sleep">🥛 قبل النوم</option>
                  </select>
                </div>

                {/* Macro Inputs */}
                <div className="grid grid-cols-3 gap-2.5">
                  {/* Protein */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-emerald-400 block">🥩 بروتين (ج)</label>
                    <input
                      type="number"
                      min="0"
                      value={customProtein}
                      onChange={(e) => setCustomProtein(e.target.value)}
                      className={`w-full px-3 py-2 rounded-xl border text-xs font-mono font-bold outline-none text-center ${
                        isDark ? 'bg-[#222225] border-emerald-500/30 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                      }`}
                    />
                  </div>

                  {/* Carbs */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-sky-400 block">🍚 كربوهيدرات (ج)</label>
                    <input
                      type="number"
                      min="0"
                      value={customCarbs}
                      onChange={(e) => setCustomCarbs(e.target.value)}
                      className={`w-full px-3 py-2 rounded-xl border text-xs font-mono font-bold outline-none text-center ${
                        isDark ? 'bg-[#222225] border-sky-500/30 text-sky-400' : 'bg-sky-50 border-sky-200 text-sky-700'
                      }`}
                    />
                  </div>

                  {/* Fats */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-amber-500 block">🥑 دهون (ج)</label>
                    <input
                      type="number"
                      min="0"
                      value={customFats}
                      onChange={(e) => setCustomFats(e.target.value)}
                      className={`w-full px-3 py-2 rounded-xl border text-xs font-mono font-bold outline-none text-center ${
                        isDark ? 'bg-[#222225] border-amber-500/30 text-amber-500' : 'bg-amber-50 border-amber-200 text-amber-700'
                      }`}
                    />
                  </div>
                </div>

                {/* Servings */}
                <div className="flex items-center justify-between p-3 rounded-2xl border border-gray-500/10">
                  <span className="text-xs font-bold">عدد الحصص:</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setCustomServings(Math.max(0.5, customServings - 0.5))}
                      className="w-7 h-7 rounded-lg bg-gray-500/10 hover:bg-gray-500/20 text-xs font-bold cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-xs font-mono font-black">{customServings}</span>
                    <button
                      type="button"
                      onClick={() => setCustomServings(customServings + 0.5)}
                      className="w-7 h-7 rounded-lg bg-gray-500/10 hover:bg-gray-500/20 text-xs font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Calculated Calories Box */}
                <div className={`p-3 rounded-2xl border text-center ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                  <span className="text-[10px] text-gray-400 block font-bold">السعرات المحسوبة تلقائياً لهذه الوجبة:</span>
                  <span className="text-xl font-mono font-black text-[#FF5F2E] block mt-0.5">
                    {Math.round(((parseFloat(customProtein) || 0) * 4 + (parseFloat(customCarbs) || 0) * 4 + (parseFloat(customFats) || 0) * 9) * customServings)} سعرة
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleSaveCustomMacroLog}
                  className="flex-1 py-3 bg-[#FF5F2E] hover:bg-[#e04f22] text-white font-extrabold text-xs rounded-2xl transition-all cursor-pointer shadow-md"
                >
                  حفظ الوجبة في السجل 🚀
                </button>
                <button
                  type="button"
                  onClick={() => setIsCustomMacroModalOpen(false)}
                  className={`px-4 py-3 rounded-2xl text-xs font-bold cursor-pointer ${
                    isDark ? 'bg-white/5 text-gray-400 hover:text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  إلغاء
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
