import { Season } from '../types';

export const LEVEL_IMAGES: Record<number | string, string> = {
  1: 'https://pub-84cd88da68d64f358673a64b20d67d90.r2.dev/%D9%82%D8%B3%D9%85%20%D8%B5%D9%88%D8%B1%20%D8%A7%D9%84%D9%85%D8%B3%D8%AA%D9%88%D9%8A%D8%A7%D8%AA/%D8%B5%D9%88%D8%B1%20%D8%A7%D9%84%D9%85%D8%B3%D8%AA%D9%88%D9%8A%D8%A7%D8%AA/Level%201.png',
  2: 'https://pub-84cd88da68d64f358673a64b20d67d90.r2.dev/%D9%82%D8%B3%D9%85%20%D8%B5%D9%88%D8%B1%20%D8%A7%D9%84%D9%85%D8%B3%D8%AA%D9%88%D9%8A%D8%A7%D8%AA/%D8%B5%D9%88%D8%B1%20%D8%A7%D9%84%D9%85%D8%B3%D8%AA%D9%88%D9%8A%D8%A7%D8%AA/Level%202.png',
  3: 'https://pub-84cd88da68d64f358673a64b20d67d90.r2.dev/%D9%82%D8%B3%D9%85%20%D8%B5%D9%88%D8%B1%20%D8%A7%D9%84%D9%85%D8%B3%D8%AA%D9%88%D9%8A%D8%A7%D8%AA/%D8%B5%D9%88%D8%B1%20%D8%A7%D9%84%D9%85%D8%B3%D8%AA%D9%88%D9%8A%D8%A7%D8%AA/Level%203.png',
  4: 'https://pub-84cd88da68d64f358673a64b20d67d90.r2.dev/%D9%82%D8%B3%D9%85%20%D8%B5%D9%88%D8%B1%20%D8%A7%D9%84%D9%85%D8%B3%D8%AA%D9%88%D9%8A%D8%A7%D8%AA/%D8%B5%D9%88%D8%B1%20%D8%A7%D9%84%D9%85%D8%B3%D8%AA%D9%88%D9%8A%D8%A7%D8%AA/Level%204.png',
};

export const SEASONS_BY_GOAL: Record<'loss' | 'maintain' | 'gain', Season[]> = {
  loss: [
    {
      id: 'loss_season_1',
      nameAr: 'إذابة الكرش الحارقة',
      description: 'المستوى الأول: تحفيز الحرق الأساسي للجسم وتفتيت دهون البطن والخصر المتراكمة.',
      difficulty: 'مبتدئ',
      emoji: '🔥',
      imageUrl: LEVEL_IMAGES[1],
      color: 'from-[#FF3B00] via-[#FF5F2E] to-[#FF2E00]'
    },
    {
      id: 'loss_season_2',
      nameAr: 'كارديو نحت الأجناب والخواصر',
      description: 'المستوى الثاني: استهداف دهون الجوانب والخواصر مع تمارين كارديو مكثفة لحرق السعرات.',
      difficulty: 'متوسط',
      emoji: '🏃',
      imageUrl: LEVEL_IMAGES[2],
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'loss_season_3',
      nameAr: 'تفتيت دهون الأحشاء العميقة',
      description: 'المستوى الثالث: تمارين HIIT متقدمة لكامل الجسم ترفع معدلات الأيض والحرق لساعات طوال.',
      difficulty: 'متقدم',
      emoji: '⚡',
      imageUrl: LEVEL_IMAGES[3],
      color: 'from-emerald-500 to-teal-600'
    },
    {
      id: 'loss_season_4',
      nameAr: 'تحدي البطن المسطحة الأسطوري',
      description: 'المستوى الرابع: تمرين ناري عالي الشدة للتحول النهائي ونحت عضلات البطن بالكامل.',
      difficulty: 'احترافي',
      emoji: '🥇',
      imageUrl: LEVEL_IMAGES[4],
      color: 'from-amber-500 to-yellow-600'
    }
  ],
  maintain: [
    {
      id: 'tone_season_1',
      nameAr: 'نحت الخصر وتعديل القوام',
      description: 'المستوى الأول: شد العضلات الأساسية وتثبيت توازن القوام للحد من الترهلات وتحسين الاستقامة.',
      difficulty: 'مبتدئ',
      emoji: '✨',
      imageUrl: LEVEL_IMAGES[1],
      color: 'from-teal-400 to-emerald-500'
    },
    {
      id: 'tone_season_2',
      nameAr: 'تنسيق البطن والكور الفائق',
      description: 'المستوى الثاني: تمارين استهدافية لتقوية وشد منطقة الكور وتحسين مرونة عضلات الظهر.',
      difficulty: 'متوسط',
      emoji: '🎯',
      imageUrl: LEVEL_IMAGES[2],
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'tone_season_3',
      nameAr: 'شد الأطراف والجسم المتطور',
      description: 'المستوى الثالث: زيادة صلابة المفاصل وشد الترهلات العميقة بتمارين تجمع التوازن والقوة.',
      difficulty: 'متقدم',
      emoji: '🌟',
      imageUrl: LEVEL_IMAGES[3],
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 'tone_season_4',
      nameAr: 'القوام الرياضي المنحوت المتكامل',
      description: 'المستوى الرابع: نحت دقيق وجميل لكل زاوية عضلية للحصول على مظهر متناسق ومشدود بالكامل.',
      difficulty: 'احترافي',
      emoji: '👑',
      imageUrl: LEVEL_IMAGES[4],
      color: 'from-orange-500 to-red-600'
    }
  ],
  gain: [
    {
      id: 'gain_season_1',
      nameAr: 'تأسيس البناء والقوة العضلية',
      description: 'المستوى الأول: تهيئة الألياف العضلية الضعيفة وتحفيز الجهاز العصبي للاستجابة للمقاومة.',
      difficulty: 'مبتدئ',
      emoji: '💪',
      imageUrl: LEVEL_IMAGES[1],
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'gain_season_2',
      nameAr: 'تطوير كتلة وحجم العضلات الكبرى',
      description: 'المستوى الثاني: زيادة حجم المجموعات العضلية كالأفخاذ والصدر وتطوير قوة التحمل العضلي.',
      difficulty: 'متوسط',
      emoji: '🏋️',
      imageUrl: LEVEL_IMAGES[2],
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'gain_season_3',
      nameAr: 'تحدي التضخيم العضلي المكثف',
      description: 'المستوى الثالث: كسر الهضبة بتمارين مركبة قوية تزيد من الكثافة والقوة الانفجارية للأنسجة.',
      difficulty: 'متقدم',
      emoji: '💥',
      imageUrl: LEVEL_IMAGES[3],
      color: 'from-emerald-500 to-teal-600'
    },
    {
      id: 'gain_season_4',
      nameAr: 'الكتلة والقوة الانفجارية للأبطال',
      description: 'المستوى الرابع: قمة برامج القوة العضلية وبناء الكتلة الصلبة للوصول لأعلى مستويات اللياقة.',
      difficulty: 'احترافي',
      emoji: '⚡',
      imageUrl: LEVEL_IMAGES[4],
      color: 'from-amber-500 to-yellow-600'
    }
  ]
};

// Fallback legacy SEASONS_DB list for other places importing it statically
export const SEASONS_DB: Season[] = SEASONS_BY_GOAL.loss;
