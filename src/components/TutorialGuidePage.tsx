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
  Target
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
  const cardBg = isDark ? 'bg-[#1C1C20] border-white/10' : 'bg-white border-gray-200 shadow-sm';
  const bannerBg = isDark 
    ? 'bg-gradient-to-br from-[#FF5F2E]/15 to-transparent border-[#FF5F2E]/30' 
    : 'bg-orange-50/90 border-orange-200 shadow-xs';

  return (
    <div className={`fixed inset-0 z-[60] flex flex-col w-full h-full overflow-hidden ${
      isDark ? 'bg-[#121214] text-white' : 'bg-gray-50 text-gray-900'
    }`} dir="rtl">
      {/* Full-Screen Page Header */}
      <header className={`px-4 md:px-8 py-4 border-b flex items-center justify-between shrink-0 z-20 shadow-sm ${
        isDark ? 'border-white/10 bg-[#1A1A1E]' : 'border-gray-200 bg-white'
      }`}>
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className={`p-2.5 rounded-2xl transition-all cursor-pointer flex items-center gap-2 ${
              isDark 
                ? 'bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-200'
            }`}
            title="رجوع إلى التطبيق"
          >
            <ArrowRight className="w-4 h-4 text-[#FF5F2E]" />
            <span className="text-xs font-bold hidden sm:inline">العودة للتطبيق</span>
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#FF5F2E] to-[#FF912E] flex items-center justify-center shadow-md">
              <HelpCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className={`text-sm md:text-base font-black tracking-tight flex items-center gap-2 ${textPrimary}`}>
                <span>دليل استخدام تطبيق التمارين الرياضية</span>
                <span className="text-[10px] bg-[#FF5F2E]/15 text-[#FF5F2E] px-2 py-0.5 rounded-full font-bold">الشامل</span>
              </h1>
              <p className={`text-[10px] md:text-[11px] font-bold ${textSubtle}`}>
                المرجع الكامل لتوجيهات التمارين، التغذية، والمميزات الذكية
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onBack}
          className="py-2 px-4 bg-gradient-to-r from-[#FF5F2E] to-[#FF912E] hover:opacity-95 active:scale-98 text-white font-extrabold rounded-xl text-xs transition-all shadow-md cursor-pointer flex items-center gap-1.5"
        >
          <span>ابدأ الآن 🚀</span>
        </button>
      </header>

      {/* Tab Navigation Menu Bar */}
      <nav className={`px-4 md:px-8 py-3 border-b flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0 z-10 ${
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
              className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-gradient-to-r from-[#FF5F2E] to-[#FF912E] text-white shadow-md shadow-[#FF5F2E]/20 scale-102'
                  : isDark
                  ? 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10'
                  : 'bg-gray-100 text-gray-700 hover:text-gray-900 hover:bg-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Scrollable Section Main Content Area */}
      <main 
        ref={contentRef} 
        className="flex-1 overflow-y-auto px-4 md:px-8 py-6 max-w-6xl w-full mx-auto space-y-6 scrollbar-thin"
      >
        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className={`p-5 rounded-3xl border ${bannerBg}`}>
              <h2 className="text-base font-black text-[#FF5F2E] flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5" />
                مرحباً بك في تطبيق التمارين الرياضية الذكي! 🚀
              </h2>
              <p className={`text-xs md:text-sm leading-relaxed font-bold ${textMuted}`}>
                تم تصميم <b className={textPrimary}>تطبيق التمارين الرياضية</b> ليكون مدربك الشخصي وموجهك الرياضي اليومي. يعتمد التطبيق على خوارزميات رياضية دقيقة وتوجيه صوتي تفاعلي حي لمساعدتك في حرق الدهون، بناء العضلات، وتنظيم وجباتك اليومية بدون حرمان.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className={`p-4 rounded-2xl border ${cardBg}`}>
                <div className="flex items-center gap-2 text-xs font-black mb-2 text-amber-500">
                  <Dumbbell className="w-4 h-4" />
                  <span>1. التمارين والمواسم</span>
                </div>
                <p className={`text-xs leading-normal font-bold ${textMuted}`}>
                  خطط تمارين يومية متدرجة تناسب جميع المستويات، مع مؤقت ذكي وتحديد المجموعات والجلسات.
                </p>
              </div>

              <div className={`p-4 rounded-2xl border ${cardBg}`}>
                <div className="flex items-center gap-2 text-xs font-black mb-2 text-emerald-500">
                  <Volume2 className="w-4 h-4" />
                  <span>2. المدرب الصوتي الحي</span>
                </div>
                <p className={`text-xs leading-normal font-bold ${textMuted}`}>
                  اختر بين كابتن أميرة وكابتن حسين لتلقي تعليمات تشجيعية عشوائية وتوجيهات أداء حية أثناء التمرين.
                </p>
              </div>

              <div className={`p-4 rounded-2xl border ${cardBg}`}>
                <div className="flex items-center gap-2 text-xs font-black mb-2 text-sky-500">
                  <Utensils className="w-4 h-4" />
                  <span>3. حاسبة ومفكرة التغذية</span>
                </div>
                <p className={`text-xs leading-normal font-bold ${textMuted}`}>
                  حساب دقيق لنسب المغذيات (البروتين، الكربوهيدرات، الدهون) وتسجيل الوجبات لتتبع السعرات المتبقية.
                </p>
              </div>

              <div className={`p-4 rounded-2xl border ${cardBg}`}>
                <div className="flex items-center gap-2 text-xs font-black mb-2 text-purple-500">
                  <Trophy className="w-4 h-4" />
                  <span>4. الأوسمة والتحديات</span>
                </div>
                <p className={`text-xs leading-normal font-bold ${textMuted}`}>
                  احصل على أوسمة الإنجاز وتتبع الاستمرارية اليومية (Streaks) لرفع مستوى لياقتك يومياً.
                </p>
              </div>
            </div>

            {/* FAQ Collapsibles */}
            <div className="pt-4">
              <h3 className="text-sm font-black text-[#FF5F2E] mb-3 px-1 flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                الأسئلة الأكثر شيوعاً
              </h3>
              <div className="space-y-3">
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
                    className={`rounded-2xl border overflow-hidden transition-colors ${cardBg}`}
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className={`w-full p-4 text-right flex items-center justify-between text-xs md:text-sm font-black cursor-pointer ${textPrimary}`}
                    >
                      <span className="flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-[#FF5F2E]" />
                        {item.q}
                      </span>
                      <ChevronDown className={`w-4 h-4 text-[#FF5F2E] transition-transform ${openFaqIndex === idx ? 'rotate-180' : ''}`} />
                    </button>
                    {openFaqIndex === idx && (
                      <div className={`p-4 pt-0 text-xs font-bold leading-relaxed border-t ${
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
          <motion.div key="workout" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className={`p-5 rounded-3xl border ${bannerBg}`}>
              <h2 className="text-base font-extrabold text-[#FF5F2E] flex items-center gap-2 mb-2">
                <Dumbbell className="w-5 h-5" />
                نظام مشغل التمارين التفاعلي
              </h2>
              <p className={`text-xs md:text-sm leading-relaxed font-bold ${textMuted}`}>
                يشتمل مشغل التمارين على مؤقت رقمي، شاشات توضيحية للحركة، وتدفق تلقائي للمجموعات وفترات الراحة لضمان تمرين دقيق وآمن.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className={`text-sm font-black px-1 ${textSubheading}`}>تسلسل الصوت والتوجيه الصوتي الاحترافي</h3>

              <div className="grid grid-cols-1 gap-3">
                <div className={`p-4 rounded-2xl border flex items-start gap-3.5 ${cardBg}`}>
                  <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center shrink-0 font-mono font-black text-sm">1</div>
                  <div>
                    <span className={`text-xs md:text-sm font-black block ${textPrimary}`}>مرحلة الاستعداد (Get Ready)</span>
                    <span className={`text-xs block mt-1 leading-relaxed font-bold ${textMuted}`}>
                      قبل بدء الحركة، يتم تشغيل توجيه صوتي عشوائي لتحفيزك وتنبيهك للاستعداد وأخذ الوضعية الصحيحة.
                    </span>
                  </div>
                </div>

                <div className={`p-4 rounded-2xl border flex items-start gap-3.5 ${cardBg}`}>
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center shrink-0 font-mono font-black text-sm">2</div>
                  <div>
                    <span className={`text-xs md:text-sm font-black block ${textPrimary}`}>بداية كل مجموعة (Start Set 1, 2, 3)</span>
                    <span className={`text-xs block mt-1 leading-relaxed font-bold ${textMuted}`}>
                      عند انطلاق مؤقت المجموعة الأولى، الثانية، أو الثالثة، ينطلق صوت المدرب بحماس لإعطائك إشارة الانطلاق الحقيقية.
                    </span>
                  </div>
                </div>

                <div className={`p-4 rounded-2xl border flex items-start gap-3.5 ${cardBg}`}>
                  <div className="w-8 h-8 rounded-xl bg-sky-500/15 text-sky-500 flex items-center justify-center shrink-0 font-mono font-black text-sm">3</div>
                  <div>
                    <span className={`text-xs md:text-sm font-black block ${textPrimary}`}>منتصف التمرين 50% (Encouragement)</span>
                    <span className={`text-xs block mt-1 leading-relaxed font-bold ${textMuted}`}>
                      في منتصف مدة كل مجموعة بالضبط (50%)، يتدخل الكابتن بصوت تشجيعي عشوائي من قائمة التشجيع دون تكرار لدعمك على الاستمرار.
                    </span>
                  </div>
                </div>

                <div className={`p-4 rounded-2xl border flex items-start gap-3.5 ${cardBg}`}>
                  <div className="w-8 h-8 rounded-xl bg-purple-500/15 text-purple-500 flex items-center justify-center shrink-0 font-mono font-black text-sm">4</div>
                  <div>
                    <span className={`text-xs md:text-sm font-black block ${textPrimary}`}>فترة الراحة بين المجموعات (Rest Period)</span>
                    <span className={`text-xs block mt-1 leading-relaxed font-bold ${textMuted}`}>
                      عند انتهاء المجموعة، تبدأ فترة الراحة المحددة مع صوت توجيهي من المدرب لتنظيم تنفسك والاسترخاء.
                    </span>
                  </div>
                </div>

                <div className={`p-4 rounded-2xl border flex items-start gap-3.5 ${cardBg}`}>
                  <div className="w-8 h-8 rounded-xl bg-[#FF5F2E]/15 text-[#FF5F2E] flex items-center justify-center shrink-0 font-mono font-black text-sm">5</div>
                  <div>
                    <span className={`text-xs md:text-sm font-black block ${textPrimary}`}>إكمال الجلسة والتحدي (Workout Complete)</span>
                    <span className={`text-xs block mt-1 leading-relaxed font-bold ${textMuted}`}>
                      عند إنهاء جميع تمارين اليوم بالكامل، ينطلق صوت التهنئة والاحتفال بالألعاب النارية لتكريم إنجازك.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Coach Selection Info */}
            <div className={`p-4 rounded-2xl border flex items-center justify-between ${cardBg}`}>
              <div className="flex items-center gap-3">
                <Volume2 className="w-5 h-5 text-[#FF5F2E]" />
                <div>
                  <span className={`text-xs font-black block ${textPrimary}`}>اختيار المدرب الصوتي (أميرة / حسين)</span>
                  <span className={`text-xs block mt-0.5 font-bold ${textSubtle}`}>يمكنك تغيير المدرب في أي وقت بالضغط على أيقونته أعلى المشغل.</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 3. NUTRITION TAB */}
        {activeTab === 'nutrition' && (
          <motion.div key="nutrition" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className={`p-5 rounded-3xl border ${bannerBg}`}>
              <h2 className="text-base font-extrabold text-[#FF5F2E] flex items-center gap-2 mb-2">
                <Utensils className="w-5 h-5" />
                دليل التغذية الذكية وتتبع السعرات
              </h2>
              <p className={`text-xs md:text-sm leading-relaxed font-bold ${textMuted}`}>
                التغذية هي 70% من معادلة النجاح. يقوم تطبيق التمارين الرياضية بحساب احتياجك اليومي من السعرات وتوزيع المغذيات الكبرى (Macros) بدقة لمساعدتك على الوصول لوزنك المستهدف.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`p-4 rounded-2xl border ${cardBg}`}>
                <div className="w-9 h-9 rounded-xl bg-rose-500/15 text-rose-500 flex items-center justify-center mb-3 font-bold text-sm">🥩</div>
                <span className="text-xs md:text-sm font-black block text-rose-500">البروتين (Protein)</span>
                <p className={`text-xs leading-relaxed mt-1 font-bold ${textMuted}`}>
                  حجر الأساس لبناء وتصليح العضلات والشعور بالشبع لفترات طويلة. مصادره: الدجاج، اللحوم، البيض، الأسماك، البقوليات.
                </p>
              </div>

              <div className={`p-4 rounded-2xl border ${cardBg}`}>
                <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center mb-3 font-bold text-sm">🍚</div>
                <span className="text-xs md:text-sm font-black block text-amber-500">الكربوهيدرات (Carbs)</span>
                <p className={`text-xs leading-relaxed mt-1 font-bold ${textMuted}`}>
                  مصدر الطاقة الرئيسي للتمارين والتفكير. مصادرها: الأرز، الشوفان، البطاطا، الخبز الكامل، الفواكه.
                </p>
              </div>

              <div className={`p-4 rounded-2xl border ${cardBg}`}>
                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center mb-3 font-bold text-sm">🥑</div>
                <span className="text-xs md:text-sm font-black block text-emerald-500">الدهون الصحية (Fats)</span>
                <p className={`text-xs leading-relaxed mt-1 font-bold ${textMuted}`}>
                  ضرورية لتوازن الهرمونات وصحة المفاصل والدماغ. مصادرها: زيت الزيتون، المكسرات، الأفوكادو، بذور الشيا.
                </p>
              </div>
            </div>

            <div className={`p-5 rounded-2xl border space-y-3 ${cardBg}`}>
              <h3 className={`text-xs md:text-sm font-black flex items-center gap-2 ${textSubheading}`}>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                كيفية تسجيل الوجبات اليومية:
              </h3>
              <ul className={`text-xs space-y-2 pr-4 list-disc leading-relaxed font-bold ${textMuted}`}>
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
          <motion.div key="calculator" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className={`p-5 rounded-3xl border ${bannerBg}`}>
              <h2 className="text-base font-extrabold text-[#FF5F2E] flex items-center gap-2 mb-2">
                <Calculator className="w-5 h-5" />
                حاسبة اللياقة والأيض الذكية
              </h2>
              <p className={`text-xs md:text-sm leading-relaxed font-bold ${textMuted}`}>
                تساعدك الحاسبة المدمجة على قياس مؤشرات جسمك الحيوية بدقة وتتبع التغيرات في وزنك ونسبة الدهون.
              </p>
            </div>

            <div className="space-y-4">
              <div className={`p-4 rounded-2xl border ${cardBg}`}>
                <span className="text-xs md:text-sm font-black text-amber-500 block mb-1">مؤشر كتلة الجسم (BMI)</span>
                <p className={`text-xs leading-relaxed font-bold ${textMuted}`}>
                  يعتمد على نسبة الوزن للطول لتحديد ما إذا كان وزنك صحياً، تحت الطبيعي، أو يحتاج لخسارة دهون.
                </p>
              </div>

              <div className={`p-4 rounded-2xl border ${cardBg}`}>
                <span className="text-xs md:text-sm font-black text-emerald-500 block mb-1">معدل الأيض الأساسي (BMR)</span>
                <p className={`text-xs leading-relaxed font-bold ${textMuted}`}>
                  عدد السعرات الحرارية التي يحرقها جسمك تلقائياً في حالة الراحة التامة للبقاء على قيد الحياة.
                </p>
              </div>

              <div className={`p-4 rounded-2xl border ${cardBg}`}>
                <span className="text-xs md:text-sm font-black text-[#FF5F2E] block mb-1">احتياج الطاقة اليومي (TDEE)</span>
                <p className={`text-xs leading-relaxed font-bold ${textMuted}`}>
                  مجموع السعرات المستهلكة مع حساب نشاطك اليومي والتمارين الرياضية، وهو الرقم المحدد لخطة التنشيف أو التضخيم.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* 5. JOURNAL & WATER TAB */}
        {activeTab === 'journal' && (
          <motion.div key="journal" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className={`p-5 rounded-3xl border ${bannerBg}`}>
              <h2 className="text-base font-extrabold text-[#FF5F2E] flex items-center gap-2 mb-2">
                <BookOpen className="w-5 h-5" />
                اليوميات وشرب الماء
              </h2>
              <p className={`text-xs md:text-sm leading-relaxed font-bold ${textMuted}`}>
                تابع حالتك البدنية والنفسية ومعدل شرب الماء اليومي لبناء عادات صحية مستدامة.
              </p>
            </div>

            <div className="space-y-4">
              <div className={`p-4 rounded-2xl border ${cardBg}`}>
                <div className="flex items-center gap-2 text-xs md:text-sm font-black mb-2 text-sky-500">
                  <Droplets className="w-4 h-4" />
                  <span>سجل شرب الماء اليومي</span>
                </div>
                <p className={`text-xs leading-relaxed font-bold ${textMuted}`}>
                  سجل أكواب الماء اليومية لتصل للهدف (2.5 - 3.5 لتر). يساعد الماء في زيادة حرق الدهون وتحسين الهضم.
                </p>
              </div>

              <div className={`p-4 rounded-2xl border ${cardBg}`}>
                <div className="flex items-center gap-2 text-xs md:text-sm font-black mb-2 text-rose-500">
                  <Heart className="w-4 h-4" />
                  <span>تدوين المزاج واليوميات</span>
                </div>
                <p className={`text-xs leading-relaxed font-bold ${textMuted}`}>
                  سجل انطباعاتك اليومية ومستوى طاقتك لمتابعة تطورك النفسي والبدني أسبوعاً بعد أسبوع.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* 6. TIPS FOR ULTIMATE RESULTS TAB */}
        {activeTab === 'tips' && (
          <motion.div key="tips" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className={`p-5 rounded-3xl border ${bannerBg}`}>
              <h2 className="text-base font-extrabold text-[#FF5F2E] flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5" />
                أسرار الوصول للجسم المثالي بسرعة 🏆
              </h2>
              <p className={`text-xs md:text-sm leading-relaxed font-bold ${textMuted}`}>
                الالتزام بهذه النصائح الخمس يضمن لك تحقيق نتائج ملموسة واضحة في خلال أول 14 يوماً:
              </p>
            </div>

            <div className="space-y-3">
              {[
                { title: '1. الاستمرارية اليومية (Consistency)', desc: 'التمرين لمدة 20 دقيقة يومياً أفضل من التمرين لساعتين مرة واحدة في الأسبوع. حافظ على السلسلة اليومية (Streaks).' },
                { title: '2. شرب الماء بكثرة', desc: 'اشرب كوب ماء قبل كل وجبة وكوب أثناء التمرين لتنشيط الدورة الدموية وتوفير بيئة مثالية لحرق الدهون.' },
                { title: '3. النوم الكافي (7 - 8 ساعات)', desc: 'يتم بناء وتصليح العضلات وحرق معظم السعرات أثناء النوم العميق ليلاً.' },
                { title: '4. التركيز مع توجيهات المدرب الصوتي', desc: 'استمع لتعليمات الكابتن أميرة/حسين وخذ فترات الراحة كاملة دون استعجال لضمان السلامة.' },
                { title: '5. تتبع الوجبات بدون تعقيد', desc: 'حتى إن لم تسجل جرامات الأكل بدقة، حافظ على زيادة البروتين والتقليل من السكريات والمشروبات الغازية.' }
              ].map((tip, idx) => (
                <div key={idx} className={`p-4 rounded-2xl border ${cardBg}`}>
                  <span className="text-xs md:text-sm font-black text-[#FF5F2E] block mb-1">{tip.title}</span>
                  <p className={`text-xs leading-relaxed font-bold ${textMuted}`}>{tip.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </main>

      {/* Footer Bar */}
      <footer className={`p-4 border-t flex items-center justify-between shrink-0 z-20 ${
        isDark ? 'border-white/10 bg-[#16161A]' : 'border-gray-200 bg-white shadow-md'
      }`}>
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-[#FF5F2E]" />
          <span className={`text-xs font-bold ${textSubtle}`}>تطبيق التمارين الرياضية - رفيقك اليومي</span>
        </div>
        <button
          onClick={onBack}
          className="py-2.5 px-6 bg-gradient-to-r from-[#FF5F2E] to-[#FF912E] hover:opacity-90 active:scale-98 text-white font-extrabold rounded-xl text-xs transition-all shadow-md cursor-pointer"
        >
          فهمت، ابدأ الآن 🚀
        </button>
      </footer>
    </div>
  );
};
