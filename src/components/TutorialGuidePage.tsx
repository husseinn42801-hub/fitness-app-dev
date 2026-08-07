import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Dumbbell,
  Utensils,
  Calculator,
  BookOpen,
  Volume2,
  Trophy,
  Droplets,
  Heart,
  HelpCircle,
  ChevronDown,
  Sparkles,
  CheckCircle2,
  Award,
  Zap,
  Target,
  X
} from 'lucide-react';

interface TutorialGuidePageProps {
  onBack: () => void;
  isDark: boolean;
}

type TabType = 'overview' | 'workout' | 'nutrition' | 'calculator' | 'journal' | 'tips';

export const TutorialGuidePage: React.FC<TutorialGuidePageProps> = ({
  onBack,
  isDark,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // Scroll to top automatically whenever activeTab changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTab]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleTabSelect = (tabId: TabType) => {
    setActiveTab(tabId);
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  };

  const textPrimary = isDark ? 'text-white' : 'text-gray-900';
  const textSubheading = isDark ? 'text-gray-200' : 'text-gray-800';
  const textMuted = isDark ? 'text-gray-300' : 'text-gray-700';
  const textSubtle = isDark ? 'text-gray-400' : 'text-gray-600';
  const cardBg = isDark ? 'bg-[#1C1C20] border-white/10' : 'bg-white border-gray-200 shadow-2xs';
  const bannerBg = isDark 
    ? 'bg-gradient-to-br from-[#FF5F2E]/15 via-transparent to-transparent border-[#FF5F2E]/25' 
    : 'bg-orange-50/80 border-orange-200/70 shadow-2xs';

  return (
    <div className={`fixed inset-0 z-[60] flex flex-col w-full h-full overflow-hidden ${
      isDark ? 'bg-[#121214] text-white' : 'bg-gray-50 text-gray-900'
    }`} dir="rtl">
      {/* Full-Screen Page Header - Professional & Balanced */}
      <header className={`px-4 md:px-6 py-3 border-b flex items-center justify-between shrink-0 z-20 shadow-xs ${
        isDark ? 'border-white/10 bg-[#1A1A1E]' : 'border-gray-200/80 bg-white'
      }`}>
        {/* Right Section (RTL Start): Icon + Title & Subtitle */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FF5F2E] to-[#FF912E] flex items-center justify-center shadow-xs shrink-0">
            <HelpCircle className="w-4.5 h-4.5 text-white" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className={`text-sm md:text-base font-extrabold tracking-tight truncate ${textPrimary}`}>
                دليل استخدام التطبيق
              </h1>
              <span className="text-[9px] bg-[#FF5F2E]/15 text-[#FF5F2E] px-2 py-0.5 rounded-md font-bold shrink-0">
                الشامل
              </span>
            </div>
            <p className={`text-[11px] font-medium truncate mt-0.5 ${textSubtle}`}>
              مرجعك الكامل للتمارين والتغذية والمميزات الذكية
            </p>
          </div>
        </div>

        {/* Left Section (RTL End): Single Clear Return Button */}
        <button
          onClick={onBack}
          className={`py-1.5 px-3 md:px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 border ${
            isDark 
              ? 'bg-white/5 hover:bg-white/10 text-white border-white/15' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-200'
          }`}
          title="رجوع إلى التطبيق"
        >
          <ArrowRight className="w-4 h-4 text-[#FF5F2E]" />
          <span>العودة للتطبيق</span>
        </button>
      </header>

      {/* Tab Navigation Menu Bar - Compact */}
      <nav className={`px-3 md:px-6 py-2 border-b flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 z-10 ${
        isDark ? 'border-white/5 bg-[#16161A]' : 'border-gray-200 bg-white'
      }`}>
        {[
          { id: 'overview', label: 'نظرة عامة', icon: Sparkles },
          { id: 'workout', label: 'التمارين والمدرب', icon: Dumbbell },
          { id: 'nutrition', label: 'التغذية والسعرات', icon: Utensils },
          { id: 'calculator', label: 'حاسبة اللياقة', icon: Calculator },
          { id: 'journal', label: 'اليوميات والماء', icon: BookOpen },
          { id: 'tips', label: 'نصائح النجاح', icon: Target },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabSelect(tab.id as TabType)}
              className={`py-1.5 px-3 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-gradient-to-r from-[#FF5F2E] to-[#FF912E] text-white shadow-xs'
                  : isDark
                  ? 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10'
                  : 'bg-gray-100 text-gray-700 hover:text-gray-900 hover:bg-gray-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Scrollable Section Main Content Area */}
      <main 
        ref={contentRef} 
        className="flex-1 overflow-y-auto px-3 md:px-6 py-4 max-w-5xl w-full mx-auto space-y-4 scrollbar-thin"
      >
        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <motion.div key="overview" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className={`p-3.5 rounded-xl border ${bannerBg}`}>
              <h2 className="text-xs font-bold text-[#FF5F2E] flex items-center gap-1.5 mb-1">
                <span>مرحباً بك في تطبيق التمارين الرياضية الذكي!</span>
              </h2>
              <p className={`text-[11px] md:text-xs leading-relaxed font-normal ${textMuted}`}>
                تم تصميم <b className={textPrimary}>تطبيق التمارين الرياضية</b> ليكون مدربك الشخصي وموجهك الرياضي اليومي. يعتمد التطبيق على خوارزميات رياضية دقيقة وتوجيه صوتي تفاعلي حي لمساعدتك في حرق الدهون، بناء العضلات، وتنظيم وجباتك اليومية بدون حرمان.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              <div className={`p-3 rounded-xl border ${cardBg}`}>
                <div className="flex items-center gap-1.5 text-[11px] font-bold mb-1 text-amber-500">
                  <Dumbbell className="w-3.5 h-3.5 shrink-0" />
                  <span>1. التمارين والمواسم</span>
                </div>
                <p className={`text-[10.5px] leading-relaxed ${textMuted}`}>
                  خطط تمارين يومية متدرجة تناسب جميع المستويات، مع مؤقت ذكي وتحديد المجموعات والجلسات.
                </p>
              </div>

              <div className={`p-3 rounded-xl border ${cardBg}`}>
                <div className="flex items-center gap-1.5 text-[11px] font-bold mb-1 text-emerald-500">
                  <Volume2 className="w-3.5 h-3.5 shrink-0" />
                  <span>2. المدرب الصوتي الحي</span>
                </div>
                <p className={`text-[10.5px] leading-relaxed ${textMuted}`}>
                  اختر بين كابتن أميرة وكابتن حسين لتلقي تعليمات تشجيعية عشوائية وتوجيهات أداء حية أثناء التمرين.
                </p>
              </div>

              <div className={`p-3 rounded-xl border ${cardBg}`}>
                <div className="flex items-center gap-1.5 text-[11px] font-bold mb-1 text-sky-500">
                  <Utensils className="w-3.5 h-3.5 shrink-0" />
                  <span>3. حاسبة ومفكرة التغذية</span>
                </div>
                <p className={`text-[10.5px] leading-relaxed ${textMuted}`}>
                  حساب دقيق لنسب المغذيات (البروتين، الكربوهيدرات، الدهون) وتسجيل الوجبات لتتبع السعرات المتبقية.
                </p>
              </div>

              <div className={`p-3 rounded-xl border ${cardBg}`}>
                <div className="flex items-center gap-1.5 text-[11px] font-bold mb-1 text-purple-500">
                  <Trophy className="w-3.5 h-3.5 shrink-0" />
                  <span>4. الأوسمة والتحديات</span>
                </div>
                <p className={`text-[10.5px] leading-relaxed ${textMuted}`}>
                  احصل على أوسمة الإنجاز وتتبع الاستمرارية اليومية (Streaks) لرفع مستوى لياقتك يومياً.
                </p>
              </div>
            </div>

            {/* FAQ Collapsibles - Compact */}
            <div className="pt-2">
              <h3 className="text-xs font-bold text-[#FF5F2E] mb-2 px-0.5">
                الأسئلة الأكثر شيوعاً
              </h3>
              <div className="space-y-2">
                {[
                  {
                    q: 'كيف أبدأ أول تمرين لي بشكل صحيح؟',
                    a: 'اختر تبويب "التمارين"، اضغط على اليوم الحالي المتاح لك، ثم اضغط "بدء التمرين". سينقلك التطبيق مباشرة إلى مشغل التمارين التفاعلي مع صوت المدرب.'
                  },
                  {
                    q: 'كيف يتم حفظ اختيار الكابتن الصوتي؟',
                    a: 'عند اختيار كابتن أميرة أو كابتن حسين، يتم حفظ هذا الاختيار تلقائياً. يمكنك التبديل بينهما في أي وقت بالضغط على أيقونة المدرب أعلى شاشة مشغل التمرين.'
                  },
                  {
                    q: 'ما هو وضع التحدي الحر؟',
                    a: 'يسمح لك وضع التحدي الحر (من القائمة الجانبية) بفتح جميع أيام ومستويات المواسم دون الحاجة لإنهاء الأيام بالترتيب، مما يمنحك مرونة كاملة في التمرين.'
                  }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`rounded-xl border overflow-hidden transition-colors ${cardBg}`}
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className={`w-full p-2.5 text-right flex items-center justify-between text-xs font-bold cursor-pointer ${textPrimary}`}
                    >
                      <span className="flex items-center gap-1.5">
                        <span className="text-[#FF5F2E]">•</span>
                        {item.q}
                      </span>
                      <ChevronDown className={`w-3.5 h-3.5 text-[#FF5F2E] shrink-0 transition-transform ${openFaqIndex === idx ? 'rotate-180' : ''}`} />
                    </button>
                    {openFaqIndex === idx && (
                      <div className={`p-2.5 pt-0 text-[11px] leading-relaxed border-t ${
                        isDark ? 'border-white/5 text-gray-300' : 'border-gray-100 text-gray-700'
                      }`}>
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* 2. WORKOUT & AUDIO COACH TAB */}
        {activeTab === 'workout' && (
          <motion.div key="workout" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className={`p-3.5 rounded-xl border ${bannerBg}`}>
              <h2 className="text-xs font-bold text-[#FF5F2E] flex items-center gap-1.5 mb-1">
                <span>نظام مشغل التمارين التفاعلي</span>
              </h2>
              <p className={`text-[11px] md:text-xs leading-relaxed font-normal ${textMuted}`}>
                يشتمل مشغل التمارين على مؤقت رقمي، شاشات توضيحية للحركة، وتدفق تلقائي للمجموعات وفترات الراحة لضمان تمرين دقيق وآمن.
              </p>
            </div>

            <div className="space-y-2.5">
              <h3 className={`text-xs font-bold px-0.5 ${textSubheading}`}>تسلسل الصوت والتوجيه الصوتي الاحترافي</h3>

              <div className="grid grid-cols-1 gap-2">
                <div className={`p-2.5 rounded-xl border flex items-start gap-2.5 ${cardBg}`}>
                  <div className="w-6 h-6 rounded-lg bg-amber-500/15 text-amber-500 flex items-center justify-center shrink-0 font-mono font-bold text-xs">1</div>
                  <div>
                    <span className={`text-xs font-bold block ${textPrimary}`}>مرحلة الاستعداد (Get Ready)</span>
                    <span className={`text-[10.5px] block mt-0.5 leading-relaxed ${textMuted}`}>
                      قبل بدء الحركة، يتم تشغيل توجيه صوتي عشوائي لتحفيزك وتنبيهك للاستعداد وأخذ الوضعية الصحيحة.
                    </span>
                  </div>
                </div>

                <div className={`p-2.5 rounded-xl border flex items-start gap-2.5 ${cardBg}`}>
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/15 text-emerald-500 flex items-center justify-center shrink-0 font-mono font-bold text-xs">2</div>
                  <div>
                    <span className={`text-xs font-bold block ${textPrimary}`}>بداية كل مجموعة (Start Set 1, 2, 3)</span>
                    <span className={`text-[10.5px] block mt-0.5 leading-relaxed ${textMuted}`}>
                      عند انطلاق مؤقت المجموعة الأولى، الثانية، أو الثالثة، ينطلق صوت المدرب بحماس لإعطائك إشارة الانطلاق الحقيقية.
                    </span>
                  </div>
                </div>

                <div className={`p-2.5 rounded-xl border flex items-start gap-2.5 ${cardBg}`}>
                  <div className="w-6 h-6 rounded-lg bg-sky-500/15 text-sky-500 flex items-center justify-center shrink-0 font-mono font-bold text-xs">3</div>
                  <div>
                    <span className={`text-xs font-bold block ${textPrimary}`}>منتصف التمرين 50% (Encouragement)</span>
                    <span className={`text-[10.5px] block mt-0.5 leading-relaxed ${textMuted}`}>
                      في منتصف مدة كل مجموعة بالضبط (50%)، يتدخل الكابتن بصوت تشجيعي عشوائي من قائمة التشجيع دون تكرار لدعمك على الاستمرار.
                    </span>
                  </div>
                </div>

                <div className={`p-2.5 rounded-xl border flex items-start gap-2.5 ${cardBg}`}>
                  <div className="w-6 h-6 rounded-lg bg-purple-500/15 text-purple-500 flex items-center justify-center shrink-0 font-mono font-bold text-xs">4</div>
                  <div>
                    <span className={`text-xs font-bold block ${textPrimary}`}>فترة الراحة بين المجموعات (Rest Period)</span>
                    <span className={`text-[10.5px] block mt-0.5 leading-relaxed ${textMuted}`}>
                      عند انتهاء المجموعة، تبدأ فترة الراحة المحددة مع صوت توجيهي من المدرب لتنظيم تنفسك والاسترخاء.
                    </span>
                  </div>
                </div>

                <div className={`p-2.5 rounded-xl border flex items-start gap-2.5 ${cardBg}`}>
                  <div className="w-6 h-6 rounded-lg bg-[#FF5F2E]/15 text-[#FF5F2E] flex items-center justify-center shrink-0 font-mono font-bold text-xs">5</div>
                  <div>
                    <span className={`text-xs font-bold block ${textPrimary}`}>إكمال الجلسة والتحدي (Workout Complete)</span>
                    <span className={`text-[10.5px] block mt-0.5 leading-relaxed ${textMuted}`}>
                      عند إنهاء جميع تمارين اليوم بالكامل، ينطلق صوت التهنئة والاحتفال بالألعاب النارية لتكريم إنجازك.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Coach Selection Info */}
            <div className={`p-3 rounded-xl border flex items-center gap-2.5 ${cardBg}`}>
              <Volume2 className="w-4 h-4 text-[#FF5F2E] shrink-0" />
              <div>
                <span className={`text-xs font-bold block ${textPrimary}`}>اختيار المدرب الصوتي (أميرة / حسين)</span>
                <span className={`text-[10px] block mt-0.5 ${textSubtle}`}>يمكنك تغيير المدرب في أي وقت بالضغط على أيقونته أعلى المشغل.</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* 3. NUTRITION TAB */}
        {activeTab === 'nutrition' && (
          <motion.div key="nutrition" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className={`p-3.5 rounded-xl border ${bannerBg}`}>
              <h2 className="text-xs font-bold text-[#FF5F2E] flex items-center gap-1.5 mb-1">
                <span>دليل التغذية الذكية وتتبع السعرات</span>
              </h2>
              <p className={`text-[11px] md:text-xs leading-relaxed font-normal ${textMuted}`}>
                التغذية هي 70% من معادلة النجاح. يقوم تطبيق التمارين الرياضية بحساب احتياجك اليومي من السعرات وتوزيع المغذيات الكبرى (Macros) بدقة لمساعدتك على الوصول لوزنك المستهدف.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
              <div className={`p-3 rounded-xl border ${cardBg}`}>
                <span className="text-xs font-bold block text-rose-500 mb-1">🥩 البروتين (Protein)</span>
                <p className={`text-[10.5px] leading-relaxed ${textMuted}`}>
                  حجر الأساس لبناء وتصليح العضلات والشعور بالشبع لفترات طويلة. مصادره: الدجاج، اللحوم، البيض، الأسماك، البقوليات.
                </p>
              </div>

              <div className={`p-3 rounded-xl border ${cardBg}`}>
                <span className="text-xs font-bold block text-amber-500 mb-1">🍚 الكربوهيدرات (Carbs)</span>
                <p className={`text-[10.5px] leading-relaxed ${textMuted}`}>
                  مصدر الطاقة الرئيسي للتمارين والتفكير. مصادرها: الأرز، الشوفان، البطاطا، الخبز الكامل، الفواكه.
                </p>
              </div>

              <div className={`p-3 rounded-xl border ${cardBg}`}>
                <span className="text-xs font-bold block text-emerald-500 mb-1">🥑 الدهون الصحية (Fats)</span>
                <p className={`text-[10.5px] leading-relaxed ${textMuted}`}>
                  ضرورية لتوازن الهرمونات وصحة المفاصل والدماغ. مصادرها: زيت الزيتون، المكسرات، الأفوكادو، بذور الشيا.
                </p>
              </div>
            </div>

            <div className={`p-3.5 rounded-xl border space-y-2 ${cardBg}`}>
              <h3 className={`text-xs font-bold flex items-center gap-1.5 ${textSubheading}`}>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                كيفية تسجيل الوجبات اليومية:
              </h3>
              <ul className={`text-[10.5px] space-y-1 pr-4 list-disc leading-relaxed ${textMuted}`}>
                <li>افتح تبويب <b>"التغذية"</b> للاطلاع على المتبقي من سعراتك اليومية.</li>
                <li>اختر الوجبة المراد تسجيلها (الفطور، الغداء، العشاء، أو الوجبات الخفيفة).</li>
                <li>اختر من قائمة الأطعمة المقترحة أو أدخل سعرات وجبتك الخاصة مع البحث السريع.</li>
                <li>يتم خفض السعرات المسجلة تلقائياً من المجموع اليومي المستهدف.</li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* 4. CALCULATOR TAB */}
        {activeTab === 'calculator' && (
          <motion.div key="calculator" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className={`p-3.5 rounded-xl border ${bannerBg}`}>
              <h2 className="text-xs font-bold text-[#FF5F2E] flex items-center gap-1.5 mb-1">
                <span>حاسبة اللياقة والأيض الذكية</span>
              </h2>
              <p className={`text-[11px] md:text-xs leading-relaxed font-normal ${textMuted}`}>
                تساعدك الحاسبة المدمجة على قياس مؤشرات جسمك الحيوية بدقة وتتبع التغيرات في وزنك ونسبة الدهون.
              </p>
            </div>

            <div className="space-y-2.5">
              <div className={`p-3 rounded-xl border ${cardBg}`}>
                <span className="text-xs font-bold text-amber-500 block mb-0.5">مؤشر كتلة الجسم (BMI)</span>
                <p className={`text-[10.5px] leading-relaxed ${textMuted}`}>
                  يعتمد على نسبة الوزن للطول لتحديد ما إذا كان وزنك صحياً، تحت الطبيعي، أو يحتاج لخسارة دهون.
                </p>
              </div>

              <div className={`p-3 rounded-xl border ${cardBg}`}>
                <span className="text-xs font-bold text-emerald-500 block mb-0.5">معدل الأيض الأساسي (BMR)</span>
                <p className={`text-[10.5px] leading-relaxed ${textMuted}`}>
                  عدد السعرات الحرارية التي يحرقها جسمك تلقائياً في حالة الراحة التامة للبقاء على قيد الحياة.
                </p>
              </div>

              <div className={`p-3 rounded-xl border ${cardBg}`}>
                <span className="text-xs font-bold text-[#FF5F2E] block mb-0.5">احتياج الطاقة اليومي (TDEE)</span>
                <p className={`text-[10.5px] leading-relaxed ${textMuted}`}>
                  مجموع السعرات المستهلكة مع حساب نشاطك اليومي والتمارين الرياضية، وهو الرقم المحدد لخطة التنشيف أو التضخيم.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* 5. JOURNAL & WATER TAB */}
        {activeTab === 'journal' && (
          <motion.div key="journal" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className={`p-3.5 rounded-xl border ${bannerBg}`}>
              <h2 className="text-xs font-bold text-[#FF5F2E] flex items-center gap-1.5 mb-1">
                <span>اليوميات وشرب الماء</span>
              </h2>
              <p className={`text-[11px] md:text-xs leading-relaxed font-normal ${textMuted}`}>
                تابع حالتك البدنية والنفسية ومعدل شرب الماء اليومي لبناء عادات صحية مستدامة.
              </p>
            </div>

            <div className="space-y-2.5">
              <div className={`p-3 rounded-xl border ${cardBg}`}>
                <div className="flex items-center gap-1.5 text-xs font-bold mb-1 text-sky-500">
                  <Droplets className="w-3.5 h-3.5 shrink-0" />
                  <span>سجل شرب الماء اليومي</span>
                </div>
                <p className={`text-[10.5px] leading-relaxed ${textMuted}`}>
                  سجل أكواب الماء اليومية لتصل للهدف (2.5 - 3.5 لتر). يساعد الماء في زيادة حرق الدهون وتحسين الهضم.
                </p>
              </div>

              <div className={`p-3 rounded-xl border ${cardBg}`}>
                <div className="flex items-center gap-1.5 text-xs font-bold mb-1 text-rose-500">
                  <Heart className="w-3.5 h-3.5 shrink-0" />
                  <span>تدوين المزاج واليوميات</span>
                </div>
                <p className={`text-[10.5px] leading-relaxed ${textMuted}`}>
                  سجل انطباعاتك اليومية ومستوى طاقتك لمتابعة تطورك النفسي والبدني أسبوعاً بعد أسبوع.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* 6. TIPS FOR ULTIMATE RESULTS TAB */}
        {activeTab === 'tips' && (
          <motion.div key="tips" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className={`p-3.5 rounded-xl border ${bannerBg}`}>
              <h2 className="text-xs font-bold text-[#FF5F2E] flex items-center gap-1.5 mb-1">
                <span>أسرار الوصول للجسم المثالي بسرعة</span>
              </h2>
              <p className={`text-[11px] md:text-xs leading-relaxed font-normal ${textMuted}`}>
                الالتزام بهذه النصائح الخمس يضمن لك تحقيق نتائج ملموسة واضحة في خلال أول 14 يوماً:
              </p>
            </div>

            <div className="space-y-2">
              {[
                { title: '1. الاستمرارية اليومية (Consistency)', desc: 'التمرين لمدة 20 دقيقة يومياً أفضل من التمرين لساعتين مرة واحدة في الأسبوع. حافظ على السلسلة اليومية (Streaks).' },
                { title: '2. شرب الماء بكثرة', desc: 'اشرب كوب ماء قبل كل وجبة وكوب أثناء التمرين لتنشيط الدورة الدموية وتوفير بيئة مثالية لحرق الدهون.' },
                { title: '3. النوم الكافي (7 - 8 ساعات)', desc: 'يتم بناء وتصليح العضلات وحرق معظم السعرات أثناء النوم العميق ليلاً.' },
                { title: '4. التركيز مع توجيهات المدرب الصوتي', desc: 'استمع لتعليمات الكابتن أميرة/حسين وخذ فترات الراحة كاملة دون استعجال لضمان السلامة.' },
                { title: '5. تتبع الوجبات بدون تعقيد', desc: 'حتى إن لم تسجل جرامات الأكل بدقة، حافظ على زيادة البروتين والتقليل من السكريات والمشروبات الغازية.' }
              ].map((tip, idx) => (
                <div key={idx} className={`p-2.5 rounded-xl border ${cardBg}`}>
                  <span className="text-xs font-bold text-[#FF5F2E] block mb-0.5">{tip.title}</span>
                  <p className={`text-[10.5px] leading-relaxed ${textMuted}`}>{tip.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </main>

      {/* Footer Bar - Compact */}
      <footer className={`p-3 border-t flex items-center justify-between shrink-0 z-20 ${
        isDark ? 'border-white/10 bg-[#16161A]' : 'border-gray-200 bg-white shadow-xs'
      }`}>
        <div className="flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-[#FF5F2E]" />
          <span className={`text-[11px] font-medium ${textSubtle}`}>تطبيق التمارين الرياضية - رفيقك اليومي</span>
        </div>
        <button
          onClick={onBack}
          className="py-1.5 px-4 bg-gradient-to-r from-[#FF5F2E] to-[#FF912E] hover:opacity-90 text-white font-bold rounded-lg text-xs transition-all shadow-xs cursor-pointer"
        >
          فهمت، ابدأ الآن
        </button>
      </footer>
    </div>
  );
};

