export interface Exercise {
  id: string;
  nameAr: string;
  nameEn: string;
  category?: string; // الفئة: الإحماء، الكارديو، البطن والكرش، الصدر، الظهر، الكتفين، الذراعين، الساقين، المؤخرة، الجسم بالكامل، الإطالات والاستشفاء
  bodyPart?: string; // الجزء المستهدف من الجسم
  targetMuscle?: string; // العضلة المستهدفة
  secondaryMuscles?: string[]; // العضلات المساعدة
  equipment?: string; // الأدوات المستخدمة
  description: string;
  duration: number; // in seconds
  caloriesPerMin: number;
  caloriesApprox?: number; // السعرات التقريبية
  animationType: 'jumping-jacks' | 'squats' | 'crunches' | 'russian-twist' | 'plank' | 'leg-raises' | 'cobra-stretch';
  steps: string[];
  tips: string[];
  tags?: string[]; // كلمات مفتاحية للتوصية والتصفية
  muscleGroup: 'كامل الجسم' | 'عضلات البطن والخصر' | 'الجزء السفلي والفخذين' | 'الإطالات والاستشفاء' | 'الجزء العلوي والذراعين';
  difficulty: 'مبتدئ' | 'متوسط' | 'متقدم' | 'احترافي';
  videoUrl?: string;
  mp4Url?: string;
  imageUrl?: string;
}

export interface WorkoutDay {
  dayNumber: number;
  titleAr: string;
  titleEn: string;
  exercises: string[]; // array of exercise ids
  difficulty: 'مبتدئ' | 'متوسط' | 'متقدم' | 'احترافي';
  isRestDay: boolean;
  estimatedTime: number; // in minutes
  caloriesEstimate: number; // approximate calories burned
  totalSets?: number;
  targetMuscles?: string[];
  restTimePerSet?: number; // in seconds
  intensityLabel?: string;
  workoutType?: string;
}

export interface UserStats {
  weight: number; // kg
  height: number; // cm
  age: number;
  gender: 'ذكر' | 'أنثى';
  activityLevel: number; // TDEE multiplier
  goal: 'loss' | 'maintain' | 'gain' | 'fitness'; // loss = تخسيس, maintain = شد القوام, gain = تضخيم, fitness = لياقة
  targetWeight?: number; // target weight in kg
  startWeight?: number; // initial starting weight in kg
  prevWeight?: number; // previous weight before last update
  voiceGender?: 'male' | 'female'; // voice assistant coach gender
  onboarded?: boolean; // whether onboarding was completed
  userName?: string;
  userAvatar?: string;
}

export interface DailyLog {
  date: string; // YYYY-MM-DD
  weightLogged?: number;
  waterCups: number; // each cup is 250ml
  caloriesBurned: number;
  caloriesEaten: number;
  completedExercisesCount: number;
  completedDays: number[]; // days completed in general
}

export interface JournalTask {
  id: string;
  text: string;
  completed: boolean;
}

export interface Season {
  id: string;
  nameAr: string;
  description: string;
  difficulty: string;
  emoji: string;
  imageUrl?: string;
  color: string;
}

export interface SeasonCertificate {
  id: string;
  seasonId: string;
  seasonName: string;
  completedAt: string;
  totalDays: number;
  commitmentRate: number;
}

export interface FoodItem {
  id: string;
  nameAr: string;
  nameEn: string;
  category: 'protein' | 'carb' | 'fat' | 'vegetable' | 'veg' | 'fruit' | 'nut' | 'dairy' | 'fish' | 'poultry' | 'meat' | 'egg' | 'grain' | 'starchy_veg' | 'legume' | 'sugar' | 'drink' | 'meal' | 'vitamin' | 'mineral';
  calories: number; // per serving/portion
  protein: number; // g
  carbs: number; // g
  fats: number; // g
  fiber: number; // g
  sugar: number; // g
  sodium: number; // mg
  calcium: number; // mg
  iron: number; // mg
  potassium: number; // mg
  magnesium: number; // mg
  vitamins: string[]; // e.g. ["A", "C", "D"]
  benefits: string[];
  sideEffects: string; // for overconsumption
  recommendedDaily: string;
  bestTime: string; // optimal eating time
  forLoss: boolean;
  forGain: boolean;
  forDiabetes: boolean;
  forKeto: boolean;
  forVegetarian: boolean;
  servingSize: string; // e.g. "كوب", "100 جرام"
  weightGrams: number;
  satietyIndex: number; // 1 to 5
  imageUrl: string;
  fallbackImageUrl?: string;
  recipes?: string[]; // recipes it belongs to
  prepMethods?: string[];
  alternatives?: string[]; // alternative food IDs
}

export interface FoodLogItem {
  id: string;
  foodId: string;
  nameAr: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'pre_workout' | 'post_workout' | 'before_sleep';
  servings: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  loggedAt: string; // ISO string or simple time
}

export interface DailyNutritionLog {
  date: string; // YYYY-MM-DD
  items: FoodLogItem[];
  waterCups: number;
}


