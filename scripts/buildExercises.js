import fs from 'fs';
import path from 'path';

const rawData = JSON.parse(fs.readFileSync('./src/data/100workouts.json', 'utf8'));

const nameArMap = {
  "1107": "تمرين عجلة البطن",
  "1108": "التواء العمود الفقري الجالس (أردها ماتسيندراسانا)",
  "1109": "إطالة الذراع والأكتاف",
  "1110": "تمرين الطير والكلب المتقدم (رفع اليدين)",
  "1111": "تمرين الطير والكلب للثبات",
  "1112": "وضعية الجسر للظهر والمؤخرة",
  "1113": "سكوات البلغاري المباشر (لانجز مرتفع)",
  "1114": "تمرين البربي الشامل",
  "1115": "ركض ركل الخلفية للكارديو",
  "1116": "إطالة وضعية القطة للظهر",
  "1117": "تمرين الشاتورانجا إلى الكوبرا العلوية",
  "1118": "وضعية الطفل للاسترخاء",
  "1119": "تمرين الضغط المتفجر مع التصفق",
  "1120": "تمرين الضغط بقبضة ضيقة للترايسبس",
  "1121": "إطالة الفخذ الخلفي بشريط المقاومة",
  "1122": "تمرين الوقوف على الساعدين مع الركل",
  "1123": "إطالة وضعية البقرة للظهر",
  "1124": "إطالة الكتف العرضية",
  "1125": "وضعية الغراب للاتزان والقوة",
  "1126": "تمرين الضغط المنحدر (الأقدام مرتفعة)",
  "1127": "تمرين القفز من المرتفعات (ديبث جامب)",
  "1128": "تمرين ضغط الماس للصدر والترايسبس",
  "1129": "ثبات البلانك والدولفين للكور",
  "1130": "ثبات وضعية الكلب المتجه لأسفل",
  "1131": "تمرين راية التنين (دراغون فلاج)",
  "1132": "إطالة الذراعين الديناميكية",
  "1133": "إطالة الجزء العلوي الحركية",
  "1134": "سباق الأقدام السريعة بوضعية منخفضة",
  "1135": "الانثناء الأمامي مع انحناء الحوض",
  "1136": "الطعن الأمامي للمؤخرة والفخذ",
  "1137": "وضعية العجلة الكاملة للظهر",
  "1138": "الانحناء الأمامي الجالس الخفيف",
  "1139": "جسر المؤخرة (جلوت بريدج)",
  "1140": "تمرين السكوات الكأسي (جوبلت)",
  "1141": "الرفع النصفي الانتقالي لليوجا",
  "1142": "رفع الأرجل أثناء التعلق للبطن",
  "1143": "رفع الركبتين وركل الخلفية المزدوج",
  "1144": "رفع الركبتين السريع للكارديو",
  "1145": "دوائر الورك لمرونة الحوض",
  "1146": "إطالة مثنيات الورك بالركوع",
  "1147": "تمرين إطالة الورك والحوض",
  "1148": "طعن إطالة مثنيات الورك",
  "1149": "ثبات التقعر (هولو هولد) للبطن",
  "1150": "تمرين مشية الدودة (إنش وورم)",
  "1151": "تمرين الضغط المائل (اليدين مرتفعة)",
  "1152": "تمرين القفز على الصندوق (بوكس جامب)",
  "1153": "تمرين السكوات مع القفز",
  "1154": "نط الحبل الجانبي مع رفع الركبة",
  "1155": "تمرين القفز الجانبي (جامبينج جاك)",
  "1156": "نبضات تنفس كابالاباتي للبطن",
  "1157": "تمرين الضغط على قبضات اليد",
  "1158": "ثبات حرف L للبطن والقوة",
  "1159": "الركض الجانبي السريع (شافل)",
  "1160": "رفع الأرجل للتحضير للوقوف على الرأس",
  "1161": "إطالة الساقين مع اليدين على الخصر",
  "1162": "أرجحة الساق للأمام والخلف",
  "1163": "أرجحة الساق الدائرية",
  "1164": "أرجحة الساق جانباً",
  "1165": "تمرين أرجحة الساقين",
  "1166": "تسلق الجبل (ماونتن كلايمبر)",
  "1167": "وضعية الجبل إلى الانحناء الأمامي",
  "1168": "نصف دائرة الرقبة للاسترخاء",
  "1169": "تمرين العقلة السلبية (نزول بطيء)",
  "1170": "تمرين الضغط بيد واحدة",
  "1171": "وضعية المثلث المفتوح للصدر",
  "1172": "تمرين ضغط البايك للأكتاف",
  "1173": "تمرين السكوات على رجل واحدة (بيستول)",
  "1174": "سكوات البيستول المدعم بالدعائم",
  "1175": "الركض الخفيف في المكان",
  "1176": "قفزات البلانك الجانبية المتقدمة",
  "1177": "قفزات فتح الأرجل في وضعية البلانك",
  "1178": "تمرين ثبات البلانك للبطن والكور",
  "1179": "تمرين العقلة (سحب للظهر)",
  "1180": "جسر الظهر العلوي والتمدد للخلف",
  "1181": "الانحناء والمُد في وضعية المثلث",
  "1182": "دوران مفصل الكتف الشامل",
  "1183": "دوائر الأكتاف للاسترخاء",
  "1184": "إطالة تسخين الأكتاف",
  "1185": "تمرين إطالة وتليين الأكتاف",
  "1186": "ثبات البلانك الجانبي على الكوع",
  "1187": "أرجحة الساقين الجانبية الديناميكية",
  "1188": "تمرين المعدة الكامل (سِت أب)",
  "1189": "موجة العمود الفقري مع السكوات",
  "1190": "سباق الركض السريع الفترات",
  "1191": "تدريب الفترات عالية الشدة للركض",
  "1192": "تمرين الضغط القياسي للصدر",
  "1193": "الركل الواقف للأمام والخلف",
  "1194": "إطالة عضلة الفخذ الخلفية واقفاً",
  "1195": "إطالة الورك والحوض واقفاً",
  "1196": "إطالة عضلة الفخذ الأمامية واقفاً",
  "1197": "تمرين سكوات السومو بالفخذين",
  "1198": "التنفس الاستشفائي المستلقي",
  "1199": "إطالة الفخذ الخلفي PNF المستلقية",
  "1200": "بداية الطاولة وجسر الظهر العلوي",
  "1201": "الانحناء الأمامي الجالس بظهر مستقيم",
  "1202": "الوقوف على الرأس بقاعدة ثلاثية",
  "1203": "تمرين المعدة الملتوي للخصر",
  "1204": "تنفس أوجايي لبناء الحرارة",
  "1205": "إطالة التبريد للجزء العلوي",
  "1206": "وضعية أوتاناسانا (الانحناء الأمامي)",
  "1207": "وضعية المحارب 1 للاستقرار",
  "1208": "تمرين الضغط بقبضة واسعة"
};

const targetArMap = {
  "abs": "عضلات البطن",
  "delts": "عضلات الكتف",
  "lats": "عضلات الظهر العريضة",
  "glutes": "عضلات المؤخرة",
  "quads": "عضلات الفخذ الأمامية",
  "hamstrings": "عضلات الفخذ الخلفية",
  "chest": "عضلات الصدر",
  "neck": "عضلات الرقبة",
  "obliques": "عضلات الخصر والجانبين"
};

const secondaryMusclesArMap = {
  "lower back": "أسفل الظهر",
  "shoulders": "الأكتاف",
  "obliques": "الخصر والجانبان",
  "traps": "عضلات الترافيز",
  "upper arms": "الذراعان والبايل والتراي",
  "abs": "عضلات البطن",
  "glutes": "المؤخرة",
  "hamstrings": "الفخذ الخلفي",
  "quads": "الفخذ الأمامي",
  "chest": "الصدر",
  "calves": "عضلات الساق السفلية",
  "hip flexors": "مثنيات الورك",
  "lower arms": "الساعدان",
  "biceps": "عضلات البايسبس",
  "rhomboids": "أعلى الظهر"
};

const bodyPartArMap = {
  "waist": "عضلات البطن والخصر",
  "shoulders": "الأكتاف",
  "back": "الظهر",
  "upper legs": "الفخذين والساقين",
  "lower legs": "الساقين السفلية",
  "cardio": "كامل الجسم",
  "chest": "الصدر",
  "neck": "الرقبة"
};

const difficultyArMap = {
  "beginner": "مبتدئ",
  "intermediate": "متوسط",
  "advanced": "متقدم"
};

const exercisesDB = {};

rawData.forEach((item) => {
  const id = item.id;
  const diff = item.difficulty || 'beginner';
  const diffAr = difficultyArMap[diff] || 'مبتدئ';
  const categoryRaw = item.category || 'strength';

  // Determine Arabic category and muscleGroup
  let categoryAr = 'شد وتقوية العضلات';
  let muscleGroup = 'كامل الجسم';

  if (categoryRaw === 'stretching' || categoryRaw === 'mobility' || categoryRaw === 'rehabilitation' || item.bodyPart === 'neck') {
    categoryAr = 'الإطالات والاستشفاء';
    muscleGroup = 'الإطالات والاستشفاء';
  } else if (categoryRaw === 'cardio' || item.bodyPart === 'cardio') {
    categoryAr = 'الكارديو';
    muscleGroup = 'كامل الجسم';
  } else if (item.bodyPart === 'waist' || item.target === 'abs' || item.target === 'obliques') {
    categoryAr = 'البطن والكرش';
    muscleGroup = 'عضلات البطن والخصر';
  } else if (item.bodyPart === 'upper legs' || item.bodyPart === 'lower legs' || item.target === 'quads' || item.target === 'hamstrings' || item.target === 'glutes') {
    categoryAr = 'الساقين';
    muscleGroup = 'الجزء السفلي والفخذين';
  } else if (item.bodyPart === 'shoulders' || item.target === 'delts') {
    categoryAr = 'الكتفين';
    muscleGroup = 'الجزء العلوي والذراعين';
  } else if (item.bodyPart === 'back' || item.target === 'lats') {
    categoryAr = 'الظهر';
    muscleGroup = 'الجزء العلوي والذراعين';
  } else if (item.bodyPart === 'chest' || item.target === 'chest') {
    categoryAr = 'الصدر';
    muscleGroup = 'الجزء العلوي والذراعين';
  }

  // Duration rule
  let duration = 30;
  if (categoryAr === 'الإطالات والاستشفاء' || diff === 'beginner') {
    duration = 30;
  } else if (diff === 'intermediate') {
    duration = 45;
  } else if (diff === 'advanced') {
    duration = 60;
  }

  // Calorie rule
  let caloriesPerMin = 6;
  if (categoryAr === 'الإطالات والاستشفاء') {
    caloriesPerMin = 4;
  } else if (categoryAr === 'الكارديو' || categoryRaw === 'plyometrics' || diff === 'advanced') {
    caloriesPerMin = 10;
  } else if (diff === 'intermediate') {
    caloriesPerMin = 7;
  }

  const caloriesApprox = Math.round(caloriesPerMin * (duration / 60));

  // Animation type
  let animationType = 'jumping-jacks';
  if (item.target === 'abs' || item.target === 'obliques' || item.bodyPart === 'waist') {
    if (item.name.includes('plank')) animationType = 'plank';
    else if (item.name.includes('twist')) animationType = 'russian-twist';
    else animationType = 'crunches';
  } else if (item.target === 'quads' || item.target === 'glutes' || item.target === 'hamstrings') {
    animationType = 'squats';
  } else if (categoryAr === 'الإطالات والاستشفاء') {
    animationType = 'cobra-stretch';
  } else if (categoryAr === 'الكارديو') {
    animationType = 'jumping-jacks';
  }

  // Secondary muscles translated
  const secondaryMusclesAr = (item.secondaryMuscles || []).map(m => secondaryMusclesArMap[m] || m);

  // Tips array
  const tips = [
    `حافظ على استقامة الظهر والتنفس المنتظم أثناء أداء ${nameArMap[id] || item.name}.`,
    `ركز على انقباض العضلات المستهدفة (${targetArMap[item.target] || item.target}) طوال مدة الأداء (${duration} ثانية).`
  ];

  const videoUrlsMap = {
    "1107": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1107.mp4",
    "1108": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1108.mp4",
    "1109": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1109.mp4",
    "1110": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1110.mp4",
    "1111": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1111.mp4",
    "1112": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1112.mp4",
    "1113": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1113.mp4",
    "1114": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1114.mp4",
    "1115": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1115.mp4",
    "1116": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1116.mp4",
    "1117": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1117.mp4",
    "1118": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1118.mp4",
    "1119": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1119.mp4",
    "1120": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1120.mp4",
    "1121": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1121.mp4",
    "1122": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1122.mp4",
    "1123": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1123.mp4",
    "1124": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1124.mp4",
    "1125": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1125.mp4",
    "1126": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1126.mp4",
    "1127": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1127.mp4",
    "1128": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1128.mp4",
    "1129": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1129.mp4",
    "1130": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1130.mp4",
    "1131": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1131.mp4",
    "1132": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1132.mp4",
    "1133": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1133.mp4",
    "1134": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1134.mp4",
    "1135": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1135.mp4",
    "1136": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1136.mp4",
    "1137": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1137.mp4",
    "1138": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1138.mp4",
    "1139": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1139.mp4",
    "1140": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1140.mp4",
    "1141": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1141.mp4",
    "1142": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1142.mp4",
    "1143": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1143.mp4",
    "1144": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1144.mp4",
    "1145": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1145.mp4",
    "1146": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1146.mp4",
    "1147": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1147.mp4",
    "1148": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1148.mp4",
    "1149": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1149.mp4",
    "1150": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1150.mp4",
    "1151": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1151.mp4",
    "1152": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1152.mp4",
    "1153": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1153.mp4",
    "1154": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1154.mp4",
    "1155": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1155.mp4",
    "1156": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1156.mp4",
    "1157": "https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/1157.mp4"
  };

  const videoUrl = item.mp4Url || item.videoUrl || videoUrlsMap[id] || `https://pub-e5d59e9dddd94ba9b74e5e54caa957f7.r2.dev/${id}.mp4`;

  exercisesDB[id] = {
    id: id,
    nameAr: nameArMap[id] || item.name,
    nameEn: item.name,
    category: categoryAr,
    bodyPart: bodyPartArMap[item.bodyPart] || item.bodyPart,
    targetMuscle: targetArMap[item.target] || item.target,
    secondaryMuscles: secondaryMusclesAr,
    equipment: item.equipment === 'body weight' ? 'وزن الجسم' : item.equipment === 'resistance band' ? 'شريط المقاومة' : item.equipment,
    description: item.description,
    duration: duration,
    caloriesPerMin: caloriesPerMin,
    caloriesApprox: caloriesApprox,
    animationType: animationType,
    steps: item.instructions || [],
    tips: tips,
    tags: [categoryAr, targetArMap[item.target] || item.target, diffAr],
    muscleGroup: muscleGroup,
    difficulty: diffAr,
    videoUrl: videoUrl,
    mp4Url: videoUrl,
    imageUrl: ""
  };
});

const tsOutput = `import { Exercise } from '../types';

/**
 * Single Source of Truth for 100 Exercises
 * Completely duration-based (Time-based), zero reps.
 * Pre-calculated calories, durations, rest profiles, and translated metadata.
 */
export const EXERCISES_DB: Record<string, Exercise> = ${JSON.stringify(exercisesDB, null, 2)};
`;

fs.writeFileSync('./src/data/exercises.ts', tsOutput, 'utf8');
console.log('Successfully generated exercises.ts with 100 duration-based exercises!');
