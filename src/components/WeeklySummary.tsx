import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  TrendingUp,
  Flame,
  Scale,
  Trophy,
  Calendar,
  Zap,
  CheckCircle2,
  Sparkles,
  Plus,
  Activity,
  Award,
  ArrowDownRight,
  ArrowUpRight,
  Minus
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ReferenceLine
} from 'recharts';
import { DailyLog, UserStats } from '../types';

interface WeeklySummaryProps {
  dailyLogs: Record<string, DailyLog>;
  userStats: UserStats;
  isDark: boolean;
  onLogWeight?: (weight: number) => void;
}

export const WeeklySummary: React.FC<WeeklySummaryProps> = ({
  dailyLogs,
  userStats,
  isDark,
  onLogWeight
}) => {
  const [activeChartTab, setActiveChartTab] = useState<'weight' | 'calories'>('weight');
  const [newWeightInput, setNewWeightInput] = useState<string>('');
  const [showWeightSuccess, setShowWeightSuccess] = useState<boolean>(false);

  // Generate the last 7 days array (YYYY-MM-DD) ending today
  const last7Days = useMemo(() => {
    const days = [];
    const today = new Date();
    const dayNamesAr = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const dateNum = String(d.getDate()).padStart(2, '0');
      const dateKey = `${year}-${month}-${dateNum}`;
      const dayName = dayNamesAr[d.getDay()];
      const shortLabel = `${dayName} ${d.getDate()}/${d.getMonth() + 1}`;

      days.push({
        dateKey,
        dayName,
        shortLabel,
        isToday: i === 0
      });
    }
    return days;
  }, []);

  // Map 7-day data with real daily logs + smart step-by-step weight progression
  const chartData = useMemo(() => {
    const daysKeys = last7Days.map(d => d.dateKey);
    const knownWeights: (number | undefined)[] = daysKeys.map(dateKey => {
      const log = dailyLogs[dateKey];
      return (log?.weightLogged && log.weightLogged > 0) ? log.weightLogged : undefined;
    });

    const filledIndices = knownWeights
      .map((val, idx) => (val !== undefined ? idx : -1))
      .filter(idx => idx !== -1);

    const computedWeights: number[] = new Array(daysKeys.length);

    if (filledIndices.length === 0) {
      // Check if user has an older logged weight in dailyLogs prior to last7Days[0]
      const allPastLogKeys = Object.keys(dailyLogs)
        .filter(k => k <= daysKeys[daysKeys.length - 1] && dailyLogs[k]?.weightLogged && dailyLogs[k].weightLogged! > 0)
        .sort();
      
      const lastKnownHistoricalWeight = allPastLogKeys.length > 0
        ? dailyLogs[allPastLogKeys[allPastLogKeys.length - 1]].weightLogged!
        : (userStats.weight || 70);

      for (let i = 0; i < daysKeys.length; i++) {
        computedWeights[i] = lastKnownHistoricalWeight;
      }
    } else {
      // Fill explicit logged points
      filledIndices.forEach(idx => {
        computedWeights[idx] = knownWeights[idx]!;
      });

      // A) Fill before the first explicit log index
      const firstIdx = filledIndices[0];
      const firstVal = computedWeights[firstIdx];
      
      const priorDates = Object.keys(dailyLogs)
        .filter(k => k < daysKeys[0] && dailyLogs[k]?.weightLogged && dailyLogs[k].weightLogged! > 0)
        .sort();

      let priorVal: number;
      if (priorDates.length > 0) {
        priorVal = dailyLogs[priorDates[priorDates.length - 1]].weightLogged!;
      } else if (userStats.prevWeight && userStats.prevWeight !== firstVal) {
        priorVal = userStats.prevWeight;
      } else if (userStats.startWeight && userStats.startWeight !== firstVal) {
        priorVal = userStats.startWeight;
      } else {
        priorVal = firstVal > 55 ? firstVal + 5 : firstVal + 2;
      }

      for (let i = 0; i < firstIdx; i++) {
        const ratio = (i + 1) / (firstIdx + 1);
        computedWeights[i] = Math.round((priorVal + (firstVal - priorVal) * ratio) * 10) / 10;
      }

      // B) Fill between explicit log indices (Linear interpolation)
      for (let k = 0; k < filledIndices.length - 1; k++) {
        const startIdx = filledIndices[k];
        const endIdx = filledIndices[k + 1];
        const startVal = computedWeights[startIdx];
        const endVal = computedWeights[endIdx];

        for (let i = startIdx + 1; i < endIdx; i++) {
          const ratio = (i - startIdx) / (endIdx - startIdx);
          computedWeights[i] = Math.round((startVal + (endVal - startVal) * ratio) * 10) / 10;
        }
      }

      // C) Fill after the last explicit log index: carry forward last logged weight
      const lastIdx = filledIndices[filledIndices.length - 1];
      const lastVal = computedWeights[lastIdx];
      for (let i = lastIdx + 1; i < daysKeys.length; i++) {
        computedWeights[i] = lastVal;
      }
    }

    return last7Days.map((day, idx) => {
      const log = dailyLogs[day.dateKey];
      const weightVal = computedWeights[idx];
      const caloriesBurned = log?.caloriesBurned || 0;
      const caloriesEaten = log?.caloriesEaten || 0;
      const exercisesCount = log?.completedExercisesCount || 0;

      return {
        dateKey: day.dateKey,
        dayName: day.dayName,
        label: day.shortLabel,
        isToday: day.isToday,
        weight: weightVal,
        caloriesBurned,
        caloriesEaten,
        exercisesCount,
        hasExplicitLog: knownWeights[idx] !== undefined
      };
    });
  }, [last7Days, dailyLogs, userStats.weight, userStats.prevWeight, userStats.startWeight]);

  // Calculated aggregated weekly stats
  const totalWeeklyCaloriesBurned = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.caloriesBurned, 0);
  }, [chartData]);

  const totalWeeklyExercises = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.exercisesCount, 0);
  }, [chartData]);

  const activeDaysCount = useMemo(() => {
    return chartData.filter((d) => d.caloriesBurned > 0 || d.exercisesCount > 0).length;
  }, [chartData]);

  const initialWeight7DaysAgo = chartData[0]?.weight || userStats.weight;
  const latestWeightToday = chartData[chartData.length - 1]?.weight || userStats.weight;
  const weightDiff = Math.round((latestWeightToday - initialWeight7DaysAgo) * 10) / 10;

  // Handle Quick Weight Log Submit
  const handleQuickWeightSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(newWeightInput);
    if (!isNaN(parsed) && parsed > 20 && parsed < 300) {
      if (onLogWeight) {
        onLogWeight(parsed);
      }
      setNewWeightInput('');
      setShowWeightSuccess(true);
      setTimeout(() => setShowWeightSuccess(false), 2500);
    }
  };

  const renderCustomDot = (props: any) => {
    const { cx, cy, payload, index } = props;
    if (cx === undefined || cy === undefined) return null;

    const isLast = index === chartData.length - 1;
    const hasLog = payload?.hasExplicitLog;

    if (isLast) {
      return (
        <g key={`dot-last-${index}`}>
          <circle cx={cx} cy={cy} r={9} fill="#10B981" fillOpacity={0.25} />
          <circle cx={cx} cy={cy} r={5.5} fill="#10B981" stroke="#ffffff" strokeWidth={2} />
        </g>
      );
    }

    if (hasLog) {
      return (
        <circle
          key={`dot-log-${index}`}
          cx={cx}
          cy={cy}
          r={4.5}
          fill="#10B981"
          stroke="#ffffff"
          strokeWidth={2}
        />
      );
    }

    return (
      <circle
        key={`dot-${index}`}
        cx={cx}
        cy={cy}
        r={3}
        fill="#10B981"
        stroke={isDark ? '#18181B' : '#ffffff'}
        strokeWidth={1.5}
        opacity={0.8}
      />
    );
  };

  const cardBg = isDark ? 'bg-[#18181B] border-white/10' : 'bg-white border-gray-100 shadow-md';
  const subTextClass = isDark ? 'text-gray-400' : 'text-gray-600';

  return (
    <div className="space-y-6" dir="rtl">
      
      {/* Header Banner */}
      <div className={`p-5 rounded-3xl border ${cardBg} relative overflow-hidden`}>
        <div className="absolute left-0 top-0 w-32 h-32 bg-[#FF5F2E]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-[#FF5F2E] text-white rounded-2xl shadow-sm">
                <Activity className="w-5 h-5" />
              </span>
              <div>
                <span className="text-[10px] text-[#FF5F2E] font-black tracking-wider uppercase">
                  تحديثات الأداء الأسبوعية
                </span>
                <h3 className={`text-base font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  الملخص الأسبوعي (آخر 7 أيام)
                </h3>
              </div>
            </div>
          </div>

          {/* Quick Weight Log Inline Widget */}
          <form onSubmit={handleQuickWeightSubmit} className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-36">
              <input
                type="number"
                step="0.1"
                placeholder={`وزن اليوم (${latestWeightToday}كجم)`}
                value={newWeightInput}
                onChange={(e) => setNewWeightInput(e.target.value)}
                className={`w-full px-3 py-2 text-xs rounded-xl border outline-none font-bold transition-all ${
                  isDark
                    ? 'bg-[#222225] border-white/10 text-white placeholder-gray-500 focus:border-[#FF5F2E]'
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#FF5F2E]'
                }`}
              />
              <span className="absolute left-2 top-2 text-[10px] text-gray-400 font-bold pointer-events-none">كجم</span>
            </div>
            <button
              type="submit"
              className="px-3 py-2 bg-[#FF5F2E] hover:bg-[#e04f22] text-white rounded-xl text-xs font-black transition-all flex items-center gap-1 shrink-0 cursor-pointer shadow-xs active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>تسجيل</span>
            </button>
          </form>
        </div>

        {showWeightSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs font-bold flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>تم حفظ وزن اليوم بنجاح وتحديث الرسوم البيانية!</span>
          </motion.div>
        )}
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Card 1: Burned Calories */}
        <div className={`p-4 rounded-2xl border ${cardBg} space-y-1 relative overflow-hidden`}>
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-gray-400">حرق الأسبوع 🔥</span>
            <div className="p-1.5 bg-[#FF5F2E]/10 text-[#FF5F2E] rounded-xl">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-black font-mono text-[#FF5F2E] pt-1">
            {totalWeeklyCaloriesBurned} <span className="text-[10px] text-gray-400 font-sans">سعرة</span>
          </div>
          <span className="text-[9px] text-gray-400 block font-bold">
            في {activeDaysCount} أيام نشطة
          </span>
        </div>

        {/* Card 2: Weight Evolution */}
        <div className={`p-4 rounded-2xl border ${cardBg} space-y-1 relative overflow-hidden`}>
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-gray-400">تطور الوزن ⚖️</span>
            <div className="p-1.5 bg-sky-500/10 text-sky-400 rounded-xl">
              <Scale className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5 pt-1">
            <span className={`text-xl font-black font-mono ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {latestWeightToday}
            </span>
            <span className="text-[10px] text-gray-400 font-sans">كجم</span>
            
            {weightDiff !== 0 && (
              <span className={`text-[10px] font-black flex items-center gap-0.5 px-1.5 py-0.5 rounded-full ${
                weightDiff < 0
                  ? 'bg-emerald-500/10 text-emerald-400'
                  : 'bg-amber-500/10 text-amber-500'
              }`}>
                {weightDiff < 0 ? <ArrowDownRight className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
                {Math.abs(weightDiff)} كجم
              </span>
            )}
          </div>
          <span className="text-[9px] text-gray-400 block font-bold">
            {weightDiff < 0
              ? 'انخفاض إيجابي ملحوظ! 👏'
              : weightDiff > 0
              ? 'زيادة في الوزن/الكتلة 💪'
              : 'وزن ثابت ومستقر 🎯'}
          </span>
        </div>

        {/* Card 3: Exercises Completed */}
        <div className={`p-4 rounded-2xl border ${cardBg} space-y-1 relative overflow-hidden`}>
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-gray-400">التمارين المنجزة 🏋️‍♂️</span>
            <div className="p-1.5 bg-purple-500/10 text-purple-400 rounded-xl">
              <Trophy className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-black font-mono text-purple-400 pt-1">
            {totalWeeklyExercises} <span className="text-[10px] text-gray-400 font-sans">تمرين</span>
          </div>
          <span className="text-[9px] text-gray-400 block font-bold">
            استمرار ممتاز للاستشفاء العضلي
          </span>
        </div>

        {/* Card 4: Commitment Rate */}
        <div className={`p-4 rounded-2xl border ${cardBg} space-y-1 relative overflow-hidden`}>
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-gray-400">نسبة الالتزام ⚡</span>
            <div className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-xl">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-black font-mono text-emerald-400 pt-1">
            {Math.round((activeDaysCount / 7) * 100)}%
          </div>
          <span className="text-[9px] text-gray-400 block font-bold">
            {activeDaysCount >= 5 ? 'التزام بطل طوال الأسبوع! 🚀' : 'زد نشاطك للأيام القادمة'}
          </span>
        </div>
      </div>

      {/* Main Charts Toggle & Canvas Container */}
      <div className={`p-5 rounded-3xl border ${cardBg} space-y-4`}>
        {/* Toggle Switch */}
        <div className="flex justify-between items-center border-b border-gray-500/10 pb-3">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveChartTab('weight')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                activeChartTab === 'weight'
                  ? 'bg-[#FF5F2E] text-white shadow-xs'
                  : isDark
                  ? 'bg-[#222225] text-gray-400 hover:text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>مخطط تطور الوزن</span>
            </button>

            <button
              onClick={() => setActiveChartTab('calories')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                activeChartTab === 'calories'
                  ? 'bg-[#FF5F2E] text-white shadow-xs'
                  : isDark
                  ? 'bg-[#222225] text-gray-400 hover:text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>مخطط سعرات التمرين</span>
            </button>
          </div>

          <span className="text-[10px] text-gray-400 font-bold hidden sm:inline-block">
            بيانات التتبع اليومية (Recharts)
          </span>
        </div>

        {/* Recharts Canvas */}
        <div className="w-full h-64 pt-2">
          {activeChartTab === 'weight' ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="weightGradientLoss" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="weightGradientGain" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="weightGradientDefault" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF5F2E" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#FF5F2E" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} />
                <XAxis dataKey="dayName" stroke={isDark ? '#888888' : '#666666'} fontSize={10} tickLine={false} />
                <YAxis
                  domain={['dataMin - 1', 'dataMax + 1']}
                  allowDecimals={true}
                  stroke={isDark ? '#888888' : '#666666'}
                  fontSize={10}
                  tickLine={false}
                  tickFormatter={(val) => `${Number(val).toFixed(1)}`}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      const strokeColor = '#10B981';
                      return (
                        <div className={`p-3 rounded-2xl border text-right shadow-lg backdrop-blur-md ${
                          isDark ? 'bg-[#121214]/95 border-white/10 text-white' : 'bg-white/95 border-gray-200 text-gray-900'
                        }`}>
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-[10px] text-gray-400 font-bold">{data.label}</p>
                            {data.hasExplicitLog && (
                              <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-md font-bold">
                                قياس يدوي ✓
                              </span>
                            )}
                          </div>
                          <p className="text-xs font-black mt-1" style={{ color: strokeColor }}>
                            الوزن: {data.weight} كجم
                          </p>
                          {data.caloriesBurned > 0 && (
                            <p className="text-[10px] text-emerald-400 font-mono mt-0.5">
                              الحرق: {data.caloriesBurned} سعرة
                            </p>
                          )}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="weight"
                  stroke="#10B981"
                  strokeWidth={3.5}
                  fillOpacity={1}
                  fill="url(#weightGradientLoss)"
                  dot={renderCustomDot}
                  activeDot={{
                    r: 7,
                    fill: '#10B981',
                    stroke: '#ffffff',
                    strokeWidth: 2
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} />
                <XAxis dataKey="dayName" stroke={isDark ? '#888888' : '#666666'} fontSize={10} tickLine={false} />
                <YAxis stroke={isDark ? '#888888' : '#666666'} fontSize={10} tickLine={false} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className={`p-3 rounded-2xl border text-right shadow-lg backdrop-blur-md ${
                          isDark ? 'bg-[#121214]/95 border-white/10 text-white' : 'bg-white/95 border-gray-200 text-gray-900'
                        }`}>
                          <p className="text-[10px] text-gray-400 font-bold">{data.label}</p>
                          <p className="text-xs font-black text-[#FF5F2E] mt-0.5">
                            حرقت: {data.caloriesBurned} سعرة حرارية
                          </p>
                          <p className="text-[10px] text-purple-400 font-bold mt-0.5">
                            التمارين: {data.exercisesCount} تمرين منجز
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="caloriesBurned" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.isToday ? '#FF5F2E' : entry.caloriesBurned > 0 ? '#38BDF8' : (isDark ? '#27272A' : '#E4E4E7')}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Interactive Motivational Tip Footer */}
        <div className={`p-3.5 rounded-2xl border flex items-center gap-3 ${
          isDark ? 'bg-[#222225] border-white/5' : 'bg-gray-50 border-gray-100'
        }`}>
          <div className="p-2 bg-amber-500/10 text-amber-500 rounded-xl shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <p className="text-[11px] font-extrabold leading-relaxed text-gray-300">
            {activeDaysCount >= 4
              ? '🎯 أحسنت جداً! الاستمرارية هي السر الحقيقي لإعادة تشكيل جسمك والوصول للرشاقة المطلوبة.'
              : '💪 كل خطوة وتمرين تقوم به اليوم يربك الدهون ويقربك خطوات كبيرة من جسمك المثالي!'}
          </p>
        </div>
      </div>
    </div>
  );
};
