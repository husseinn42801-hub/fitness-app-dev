import { FoodItem } from '../types';
import { POULTRY_ITEMS } from './foods/poultry';
import { MEAT_ITEMS } from './foods/meat';
import { FISH_ITEMS } from './foods/fish';
import { EGG_ITEMS, DAIRY_ITEMS } from './foods/eggsAndDairy';
import { GRAIN_ITEMS, CARB_ITEMS } from './foods/grainsAndCarbs';
import { LEGUME_ITEMS, FAT_ITEMS } from './foods/legumesAndFats';
import { NUT_ITEMS } from './foods/nutsAndSeeds';
import { VEG_ITEMS, FRUIT_ITEMS } from './foods/vegAndFruits';

// Central nutrition database uniting all food categories
export const NUTRITION_DB: FoodItem[] = [
  ...POULTRY_ITEMS,
  ...MEAT_ITEMS,
  ...FISH_ITEMS,
  ...EGG_ITEMS,
  ...DAIRY_ITEMS,
  ...GRAIN_ITEMS,
  ...CARB_ITEMS,
  ...LEGUME_ITEMS,
  ...FAT_ITEMS,
  ...NUT_ITEMS,
  ...VEG_ITEMS,
  ...FRUIT_ITEMS
];

export interface MealTemplate {
  id: string;
  nameAr: string;
  nameEn: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'pre_workout' | 'post_workout' | 'before_sleep';
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  timeAr: string;
  imageUrl: string;
  ingredients: string[];
  prepInstructions: string[];
}

export const MEAL_TEMPLATES: Record<string, MealTemplate[]> = {
  loss: [
    {
      id: 'loss_bf',
      nameAr: 'فطور التخسيس الذهبي',
      nameEn: 'Slimming Golden Breakfast',
      type: 'breakfast',
      calories: 310,
      protein: 22,
      carbs: 35,
      fats: 8,
      timeAr: '7:30 - 9:00 صباحاً',
      imageUrl: 'https://pub-84cd88da68d64f358673a64b20d67d90.r2.dev/%D9%82%D8%B3%D9%85%20%D8%B5%D9%88%D8%B1%20%D8%A7%D9%84%D8%A8%D9%8A%D8%B6/1-Boiled%20Egg.jpeg',
      ingredients: [
        'بيضتين كاملتين مسلوقتين',
        '40 جرام شوفان كامل مطبوخ بماء ورشة قرفة',
        'نصف كوب توت بري أو فراولة طازجة',
        'كوب قهوة سوداء أو شاي أخضر بدون سكر'
      ],
      prepInstructions: [
        'قم بسلق البيض لمدة 8 دقائق، ثم قشره.',
        'اطبخ الشوفان مع كوب من الماء الساخن والقرفة حتى يتماسك القوام.',
        'قدم الطبق بشكل جذاب بجانب حبات التوت والقهوة الصباحية الدافئة لتحفيز الحرق.'
      ]
    },
    {
      id: 'loss_lunch',
      nameAr: 'غداء نحت البطن والخصر',
      nameEn: 'Belly-Shred Lunch',
      type: 'lunch',
      calories: 420,
      protein: 38,
      carbs: 40,
      fats: 10,
      timeAr: '1:30 - 3:00 مساءً',
      imageUrl: 'https://pub-84cd88da68d64f358673a64b20d67d90.r2.dev/%D9%82%D8%B3%D9%85%20%D8%B5%D9%88%D8%B1%20%D8%AF%D9%88%D8%A7%D8%AC%D9%86/1-Grilled%20Chicken%20Breast.jpeg',
      ingredients: [
        '150 جرام صدور دجاج مشوية ومتبلة بالأعشاب والزعتر',
        '100 جرام أرز بني دايت مسلوق بماء وملح بحري فقط',
        'كوب كبير بروكلي طازج مطهو على البخار بالليمون والثوم',
        'نصف ملعقة زيت زيتون بكر مسكوبة على الخضار'
      ],
      prepInstructions: [
        'تبل صدور الدجاج بالثوم والليمون والزعتر ثم اشوها على الجريل بدون زيت.',
        'قم بسلق الأرز البني جيداً.',
        'اسلق البروكلي على البخار لـ 5 دقائق ثم اعصر الليمون واضف الزيت البكر بلمسات نهائية.'
      ]
    },
    {
      id: 'loss_pre',
      nameAr: 'طاقة الكارديو (قبل التمرين)',
      nameEn: 'Cardio Fuel (Pre-Workout)',
      type: 'pre_workout',
      calories: 140,
      protein: 2,
      carbs: 28,
      fats: 1,
      timeAr: 'قبل التمرين بـ 45 دقيقة',
      imageUrl: 'https://pub-84cd88da68d64f358673a64b20d67d90.r2.dev/%D9%82%D8%B3%D9%85%20%D8%B5%D9%88%D8%B1%20%D8%A7%D9%84%D9%81%D9%88%D8%A7%D9%83%D9%87/1-Fresh%20Green%20Apple.jpg',
      ingredients: [
        'تفاحة خضراء متوسطة مقطعة شرائح',
        'رشة قرفة مطحونة ناعمة لضبط حساسية الأنسولين',
        'كوب شاي أخضر بالنعناع دافئ لتسريع الأيض'
      ],
      prepInstructions: [
        'قطع التفاحة بعد غسلها جيداً.',
        'رش القرفة على الشرائح.',
        'تناولها مع كوب الشاي الأخضر الدافئ لتبدأ تمرينك بحماس وقدرة حرق قصوى!'
      ]
    },
    {
      id: 'loss_post',
      nameAr: 'استشفاء العضلات (بعد التمرين)',
      nameEn: 'Muscle Recovery (Post-Workout)',
      type: 'post_workout',
      calories: 250,
      protein: 28,
      carbs: 15,
      fats: 6,
      timeAr: 'خلال 45 دقيقة بعد التمرين',
      imageUrl: 'https://pub-84cd88da68d64f358673a64b20d67d90.r2.dev/%D9%82%D8%B3%D9%85%20%D8%B5%D9%88%D8%B1%20%D8%A7%D8%B3%D9%85%D8%A7%D9%83/2-Canned%20Tuna%20in%20Water.jpeg',
      ingredients: [
        'علبة تونة دايت بالماء مصفاة ومغسولة بالخل والليمون',
        'شريحة واحدة خبز توست بني كامل الحبوب',
        'خيار مقطع شرائح طازجة للتبريد والترطيب'
      ],
      prepInstructions: [
        'صفِّ التونة تماماً ثم اخلطها بعصير الليمون والخل والكمون والملح البحري الخفيف.',
        'حمص التوست حميصاً خفيفاً وضعي التونة فوقه مع تناول الخيار المنعش.'
      ]
    },
    {
      id: 'loss_dinner',
      nameAr: 'عشاء دايت خفيف وهادئ',
      nameEn: 'Light Diet Dinner',
      type: 'dinner',
      calories: 210,
      protein: 24,
      carbs: 8,
      fats: 9,
      timeAr: '7:30 - 9:00 مساءً',
      imageUrl: 'https://pub-84cd88da68d64f358673a64b20d67d90.r2.dev/%D9%82%D8%B3%D9%85%20%D8%B5%D9%88%D8%B1%20%D8%A7%D9%84%D8%A7%D9%84%D8%A8%D8%A7%D9%86%20%D9%88%D8%A7%D9%84%D8%A7%D8%AC%D8%A8%D8%A7%D9%86/2-Non-Fat%20Greek%20Yogurt.jpeg',
      ingredients: [
        '150 جرام زبادي يوناني خالي الدسم',
        'ملعقة صغيرة بذور الشيا الغنية بالألياف',
        '10 حبات لوز نيء مفروم',
        'رشة فانيليا سائلة طبيعية'
      ],
      prepInstructions: [
        'ضع الزبادي اليوناني في كوب عميق.',
        'اخلط بذور الشيا والفانيليا مع الزبادي واتركها لـ 5 دقائق لتتشرب الألياف.',
        'زين السطح بحبات اللوز المقرمش وتناولها بهدوء لتغذية عضلاتك ليلاً ببطء.'
      ]
    },
    {
      id: 'loss_sleep',
      nameAr: 'مكافح الجوع (قبل النوم بـ 30 دقيقة)',
      nameEn: 'Hunger Crusher (Before Sleep)',
      type: 'before_sleep',
      calories: 80,
      protein: 10,
      carbs: 2,
      fats: 3,
      timeAr: 'قبل النوم بنصف ساعة',
      imageUrl: 'https://pub-84cd88da68d64f358673a64b20d67d90.r2.dev/%D9%82%D8%B3%D9%85%20%D8%B5%D9%88%D8%B1%20%D8%A7%D9%84%D8%A7%D9%84%D8%A8%D8%A7%D9%86%20%D9%88%D8%A7%D9%84%D8%A7%D8%AC%D8%A8%D8%A7%D9%86/1-Natural%20Cottage%20Cheese.jpg',
      ingredients: [
        '50 جرام جبنة قريش طبيعية مهروسة بالكمون ورشة نعناع جاف',
        'كوب بابونج (شيح) دافئ لتهدئة الأعصاب والنوم العميق والمريح'
      ],
      prepInstructions: [
        'اهرسي الجبنة القريش مع الكمون.',
        'اشرب البابونج الدافئ لتستريح تماماً وتحارب الكورتيزول مسبب الكرش!'
      ]
    }
  ],
  gain: [
    {
      id: 'gain_bf',
      nameAr: 'فطور التضخيم الخارق بالبروتين',
      nameEn: 'Anabolic High Protein Breakfast',
      type: 'breakfast',
      calories: 620,
      protein: 38,
      carbs: 75,
      fats: 18,
      timeAr: '7:00 - 8:30 صباحاً',
      imageUrl: 'https://pub-84cd88da68d64f358673a64b20d67d90.r2.dev/%D9%82%D8%B3%D9%85%20%D8%B5%D9%88%D8%B1%20%D8%AD%D8%A8%D9%88%D8%A8%20%D9%88%D9%86%D8%B4%D9%88%D9%8A%D8%A7%D8%AA/1-Rolled%20Oats.webp',
      ingredients: [
        '3 بيضات كاملة مطبوخة بمسحة زبدة طبيعية',
        '70 جرام شوفان خام مطبوخ بكوب حليب كامل الدسم',
        'موزة كبيرة ناضجة مقطعة شرائح مع ملعقة عسل كبيرة',
        'حفنة زبيب ومكسرات مفرومة'
      ],
      prepInstructions: [
        'أعد عجة البيض بالزبدة الطبيعية وتبلها بالملح والفلفل.',
        'اطبخ الشوفان مع الحليب الساخن لـ 5 دقائق، ثم أضف الموز المقطع والعسل والزبيب والمكسرات.',
        'تناول الفطور مع كوب من الماء لتبدأ بوم تضخيم مثالي غني بالمغذيات!'
      ]
    },
    {
      id: 'gain_lunch',
      nameAr: 'وجبة العضلات الوحشية',
      nameEn: 'Muscle Monster Lunch',
      type: 'lunch',
      calories: 780,
      protein: 52,
      carbs: 95,
      fats: 22,
      timeAr: '1:00 - 2:30 مساءً',
      imageUrl: 'https://pub-84cd88da68d64f358673a64b20d67d90.r2.dev/%D9%82%D8%B3%D9%85%20%D8%B5%D9%88%D8%B1%20%D9%84%D8%AD%D9%88%D9%85/1-Grilled%20Beef%20Steak.jpeg',
      ingredients: [
        '180 جرام ستيك لحم بقري مشوي ببهارات الثوم والروزماري',
        '200 جرام أرز بني أو أبيض بسمتي مطهو بلمسات صحية',
        'نصف حبة أفوكادو متوسطة شرائح',
        'طبق سلطة خضراء غنية بالجرجير والسبانخ وزيت الزيتون'
      ],
      prepInstructions: [
        'اشوِ ستيك اللحم لدرجة النضج المفضلة لديك.',
        'اطبخ الأرز البسمتي مع البهارات.',
        'قدم الطبق مع شرائح الأفوكادو الطازجة والسلطة مع رش زيت الزيتون البكر.'
      ]
    },
    {
      id: 'gain_pre',
      nameAr: 'طاقة الضخ العضلي',
      nameEn: 'Anabolic Pump (Pre-Workout)',
      type: 'pre_workout',
      calories: 310,
      protein: 6,
      carbs: 48,
      fats: 12,
      timeAr: 'قبل التمرين بساعة ونصف',
      imageUrl: 'https://pub-84cd88da68d64f358673a64b20d67d90.r2.dev/%D9%82%D8%B3%D9%85%20%D8%B5%D9%88%D8%B1%20%D8%A7%D9%84%D9%81%D9%88%D8%A7%D9%83%D9%87/3-Fresh%20Banana.jpg',
      ingredients: [
        'موزة متوسطة الحجم',
        'ملعقة كبيرة زبدة فول سوداني طبيعية ناعمة',
        'شريحة توست بني كامل الحبوب',
        'كوب قهوة إسبريسو مزدوج لطاقة الكافيين والتركيز'
      ],
      prepInstructions: [
        'ادهن زبدة الفول السوداني على شريحة التوست.',
        'قطع الموز وضع الشرائح على الشريحة وتناولها مع فنجان القهوة الساخنة.'
      ]
    },
    {
      id: 'gain_post',
      nameAr: 'بناء وتعبئة الجليكوجين',
      nameEn: 'Hypertrophy Shake (Post-Workout)',
      type: 'post_workout',
      calories: 450,
      protein: 36,
      carbs: 55,
      fats: 10,
      timeAr: 'خلال 30 دقيقة بعد التمرين',
      imageUrl: 'https://pub-84cd88da68d64f358673a64b20d67d90.r2.dev/%D9%82%D8%B3%D9%85%20%D8%B5%D9%88%D8%B1%20%D8%A7%D9%83%D9%85%D8%A7%D9%83/1-Grilled%20Salmon.jpeg',
      ingredients: [
        '150 جرام سلمون مشوي بالفرن',
        '150 جرام بطاطا حلوة مشوية ومهروسة',
        'كوب خضار مشكل سوتيه لتأمين مضادات الأكسدة'
      ],
      prepInstructions: [
        'اشو السلمون في الفرن بالأعشاب الطازجة.',
        'تبل البطاطا الحلوة المشوية بقليل من الملح البحري واهرسها جيداً لتغذية خلاياك المنهكة.'
      ]
    },
    {
      id: 'gain_dinner',
      nameAr: 'عشاء تضخيم العضلات الهادئ',
      nameEn: 'Anabolic Night Dinner',
      type: 'dinner',
      calories: 410,
      protein: 34,
      carbs: 45,
      fats: 12,
      timeAr: '8:00 - 9:30 مساءً',
      imageUrl: 'https://pub-84cd88da68d64f358673a64b20d67d90.r2.dev/%D9%82%D8%B3%D9%85%20%D8%B5%D9%88%D8%B1%20%D8%A7%D9%84%D8%A8%D9%82%D9%88%D9%84%D9%8A%D8%A7%D8%AA/1-Boiled%20Lentils.jpg',
      ingredients: [
        '150 جرام عدس أحمر أو أصفر مطبوخ كشوربة سميكة بالتوابل',
        '100 جرام صدر ديك رومي مشوي شرائح باردة ونظيفة',
        'طبق مخلل طبيعي خفيف أو خيار طازج'
      ],
      prepInstructions: [
        'اطبخ شوربة العدس بمرقة لحم أو ماء وكمون وكركم وبصل وثوم.',
        'قدم الشوربة الدافئة بجانب شريحة حبش مشوية والملفوف.'
      ]
    },
    {
      id: 'gain_sleep',
      nameAr: 'استشفاء ليل الكازين الخارق',
      nameEn: 'Casein Slow-Release Sleep Fuel',
      type: 'before_sleep',
      calories: 220,
      protein: 26,
      carbs: 8,
      fats: 10,
      timeAr: 'قبل النوم بـ 30 دقيقة',
      imageUrl: 'https://pub-84cd88da68d64f358673a64b20d67d90.r2.dev/%D9%82%D8%B3%D9%85%20%D8%B5%D9%88%D8%B1%20%D8%A7%D9%84%D8%A7%D9%84%D8%A8%D8%A7%D9%86%20%D9%88%D8%A7%D9%84%D8%A7%D8%AC%D8%A8%D8%A7%D9%86/1-Natural%20Cottage%20Cheese.jpg',
      ingredients: [
        '150 جرام جبنة قريش طبيعية مخلوطة بملعقة خلاط لصوص كريمي',
        'حفنة صغيرة لوز نيء (حوالي 15 حبة)',
        'رشة عسل طبيعي صغيرة للتحلية وضبط الكورتيزول ليلاً'
      ],
      prepInstructions: [
        'اخلط الجبنة بالخلاط مع ملعقة مياه و رشة فانيليا و قطرة عسل حتى تصبح كالزبادي الكريمي.',
        'انثر المكسرات واللوز على السطح وتناولها لتنعم بليلة من النمو العضلي الكثيف المستقر.'
      ]
    }
  ],
  maintain: [
    {
      id: 'm_bf',
      nameAr: 'فطور اللياقة والنشاط',
      nameEn: 'Fitness & Vitality Breakfast',
      type: 'breakfast',
      calories: 420,
      protein: 28,
      carbs: 50,
      fats: 11,
      timeAr: '7:30 - 9:00 صباحاً',
      imageUrl: 'https://pub-84cd88da68d64f358673a64b20d67d90.r2.dev/%D9%82%D8%B3%D9%85%20%D8%B5%D9%88%D8%B1%20%D8%A7%D9%84%D8%A8%D9%8A%D8%B6/1-Boiled%20Egg.jpeg',
      ingredients: [
        'بيضتين مسلوقتين كاملتين + بياض بيضتين إضافي',
        '50 جرام شوفان خام مطبوخ بنصف كوب حليب قليل الدسم',
        'نصف حبة موز مقطعة + ملعقة صغيرة عسل نقي',
        'كوب قهوة بالحليب خالي الدسم بدون سكر'
      ],
      prepInstructions: [
        'اسلق البيض وقشره.',
        'أعد الشوفان بالحليب والعسل والموز.',
        'تناول وجبتك لتنعم بتركيز ولياقة مثالية طوال اليوم.'
      ]
    },
    {
      id: 'm_lunch',
      nameAr: 'غداء التوازن والرشاقة',
      nameEn: 'Balanced Lean Lunch',
      type: 'lunch',
      calories: 550,
      protein: 42,
      carbs: 60,
      fats: 14,
      timeAr: '1:30 - 3:00 مساءً',
      imageUrl: 'https://pub-84cd88da68d64f358673a64b20d67d90.r2.dev/%D9%82%D8%B3%D9%85%20%D8%B5%D9%88%D8%B1%20%D8%A7%D9%83%D9%85%D8%A7%D9%83/1-Grilled%20Salmon.jpeg',
      ingredients: [
        '150 جرام سلمون مشوي بالفرن أو صدور دجاج متبلة',
        '120 جرام أرز بني مسلوق ومطبوخ جيداً',
        'نصف حبة أفوكادو صغيرة مقطعة شرائح',
        'طبق خضار سوتيه (كوسة، فلفل ألوان، فاصوليا خضراء)'
      ],
      prepInstructions: [
        'اشوِ السلمون أو الدجاج بالفرن بالأعشاب والليمون.',
        'قدم الوجبة دافئة مع الأرز ومكعبات الأفوكادو الشهية والخضروات السوتيه.'
      ]
    },
    {
      id: 'm_pre',
      nameAr: 'طاقة الأداء والتحمل',
      nameEn: 'Performance Energy (Pre)',
      type: 'pre_workout',
      calories: 210,
      protein: 4,
      carbs: 35,
      fats: 6,
      timeAr: 'قبل التمرين بساعة ونصف',
      imageUrl: 'https://pub-84cd88da68d64f358673a64b20d67d90.r2.dev/%D9%82%D8%B3%D9%85%20%D8%B5%D9%88%D8%B1%20%D8%A7%D9%84%D9%81%D9%88%D8%A7%D9%83%D9%87/1-Fresh%20Green%20Apple.jpg',
      ingredients: [
        'تفاحة طازجة كاملة بجميع أليافها',
        '10 حبات لوز نيء مقرمش وطبيعي',
        'كوب شاي أخضر بالزنجبيل الدافئ لتنشيط الدوران والمجهود'
      ],
      prepInstructions: [
        'تناول التفاحة الخضراء وحبات اللوز ببطء لتوفير طاقة ممتازة ثابتة طوال تمرينك.'
      ]
    },
    {
      id: 'm_post',
      nameAr: 'استشفاء وتغذية متكاملة',
      nameEn: 'Full Spectrum Recovery (Post)',
      type: 'post_workout',
      calories: 350,
      protein: 32,
      carbs: 35,
      fats: 8,
      timeAr: 'خلال ساعة بعد تمرينك',
      imageUrl: 'https://pub-84cd88da68d64f358673a64b20d67d90.r2.dev/%D9%82%D8%B3%D9%85%20%D8%B5%D9%88%D8%B1%20%D8%AF%D9%88%D8%A7%D8%AC%D9%86/1-Grilled%20Chicken%20Breast.jpeg',
      ingredients: [
        '120 جرام صدور دجاج مشوية بنعومة على البخار',
        '120 جرام بطاطا حلوة مشوية بالفرن',
        'طبق سلطة خيار وجرجير وخس طازج بخل التفاح'
      ],
      prepInstructions: [
        'احرص على غسل الخضار جيداً وعمل السلطة مع الليمون وخل التفاح لتنظيف الأمعاء.',
        'تناول الوجبة لتعزيز الاستشفاء العضلي وتغذية الخلايا سريعاً.'
      ]
    },
    {
      id: 'm_dinner',
      nameAr: 'عشاء الرشاقة وصحة الجسم',
      nameEn: 'Clean Balance Dinner',
      type: 'dinner',
      calories: 320,
      protein: 28,
      carbs: 20,
      fats: 10,
      timeAr: '7:30 - 9:00 مساءً',
      imageUrl: 'https://pub-84cd88da68d64f358673a64b20d67d90.r2.dev/%D9%82%D8%B3%D9%85%20%D8%B5%D9%88%D8%B1%20%D8%A7%D9%84%D8%A7%D9%84%D8%A8%D8%A7%D9%86%20%D9%88%D8%A7%D9%84%D8%A7%D8%AC%D8%A8%D8%A7%D9%86/2-Non-Fat%20Greek%20Yogurt.jpeg',
      ingredients: [
        '150 جرام زبادي يوناني أو جبنة قريش خفيفة',
        'نصف كوب فراولة وتوت طازج مفروم',
        'حفنة مكسرات مشكلة (لوز، جوز) حوالي 20 جرام',
        'ملعقة صغيرة بذور شيا أو الكتان المطحون'
      ],
      prepInstructions: [
        'امزج المكونات مع الزبادي للحصول على طبق عشاء لذيذ، مشبع، مريح للمعدة، وغني بالمركبات الحامية والبروتين بطيء الامتصاص.'
      ]
    },
    {
      id: 'm_sleep',
      nameAr: 'استرخاء ونوم عميق',
      nameEn: 'Relaxation & Recovery Sleep Fuel',
      type: 'before_sleep',
      calories: 90,
      protein: 8,
      carbs: 3,
      fats: 4,
      timeAr: 'قبل النوم بنصف ساعة',
      imageUrl: 'https://pub-84cd88da68d64f358673a64b20d67d90.r2.dev/%D9%82%D8%B3%D9%85%20%D8%B5%D9%88%D8%B1%20%D8%A7%D9%84%D8%A7%D9%84%D8%A8%D8%A7%D9%86%20%D9%88%D8%A7%D9%84%D8%A7%D8%AC%D8%A8%D8%A7%D9%86/1-Natural%20Cottage%20Cheese.jpg',
      ingredients: [
        '50 جرام جبنة قريش ناعمة بالزعتر وزيت الزيتون البكر',
        'كوب يانسون دافئ مهدئ لتنظيم الضغط وعمل هرمون النمو'
      ],
      prepInstructions: [
        'تناول اللقمة البسيطة واشرب اليانسون المهدئ لتضمن نوماً هادئاً واستشفاءً للياقة خلاياك بالكامل.'
      ]
    }
  ]
};

// Alternative and replacement suggestions for items
export const INGREDIENT_REPLACEMENTS: Record<string, { replacementId: string; nameAr: string; ratio: string; note: string }[]> = {
  chicken_breast: [
    { replacementId: 'turkey_breast', nameAr: 'صدر حبش (ديك رومي)', ratio: '1:1', note: 'بديل نقي فائق البروتين والحد الأدنى من الدهون.' },
    { replacementId: 'tuna_water', nameAr: 'تونة بالماء (دايت)', ratio: '1:1', note: 'بديل سريع غني بالبروتين والحديد وسهل الإعداد والتحضير.' },
    { replacementId: 'cottage_cheese', nameAr: 'جبنة قريش طبيعية', ratio: '1:1.2', note: 'بديل نباتي ألباني غني بالكالسيوم والبروتين بطيء الهضم.' }
  ],
  beef_ribeye: [
    { replacementId: 'salmon_grilled', nameAr: 'سلمون مشوي', ratio: '1:1', note: 'يوفر بروتين ممتاز بالإضافة لأحماض أوميغا 3 لمقاومة الالتهابات.' },
    { replacementId: 'chicken_breast', nameAr: 'صدور دجاج مشوية', ratio: '1:1', note: 'أقل في الدهون والسعرات الحرارية وأعلى نقاءً.' }
  ],
  boiled_egg: [
    { replacementId: 'cottage_cheese', nameAr: 'جبنة قريش طبيعية', ratio: '50 جرام لكل بيضة', note: 'تمنح كمية بروتين مساوية بطيئة الامتصاص.' },
    { replacementId: 'egg_white', nameAr: 'بياض بيض مسلوق', ratio: 'بياض بيضتين لكل بيضة كاملة', note: 'يقلل الدهون والسعرات للنصف مع الحفاظ على كمية البروتين.' }
  ],
  oats_raw: [
    { replacementId: 'sweet_potato', nameAr: 'بطاطا حلوة مشوية', ratio: '2:1 (مثال: 100 جرام بطاطا بديل لـ 50 جرام شوفان)', note: 'كربوهيدرات معقدة ممتازة، ممتلئة بفيتامين أ والألياف.' },
    { replacementId: 'quinoa_cooked', nameAr: 'كينوا مطبوخة', ratio: '1.5:1', note: 'توفر بروتيناً كاملاً خالياً من الغلوتين ومؤشراً جلايسيمياً منخفضاً.' }
  ],
  avocado: [
    { replacementId: 'olive_oil', nameAr: 'زيت زيتون بكر ممتاز', ratio: 'ملعقة كبيرة بديل لنصف حبة أفوكادو', note: 'دهون أحادية صحية ممتازة للقلب وحرق دهون البطن.' },
    { replacementId: 'almonds_raw', nameAr: 'لوز نيء غير مملح', ratio: '30 جرام بديل لنصف حبة أفوكادو', note: 'غني بفيتامين هـ والمغنيسيوم والبروتين والدهون الحامية.' }
  ]
};
