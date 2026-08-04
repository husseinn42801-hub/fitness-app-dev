import { Exercise } from "../types";

/**
 * Complete Database of 108 Exercises
 * All metadata, Arabic explanations, muscle targetings, categories, difficulty levels, and tags included.
 */
export const EXERCISES_DB: Record<string, Exercise> = {
  "achilles_stretch": {
    "id": "achilles_stretch",
    "nameAr": "إطالة وتر أكيليس (عرقوب القدم)",
    "nameEn": "Achilles Stretch",
    "category": "الإطالات والاستشفاء",
    "bodyPart": "الساقين والربلة",
    "targetMuscle": "وتر أكيليس وربلة الساق",
    "secondaryMuscles": [
      "مفصل الكاحل",
      "عضلات الساق الخلفية"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين إطالة يركز على إرخاء وتر أكيليس وربلة الساق لمنع التشنجات وزيادة مرونة الكاحل.",
    "duration": 30,
    "caloriesPerMin": 3,
    "caloriesApprox": 15,
    "animationType": "cobra-stretch",
    "steps": [
      "قف مواجهاً للحائط وضغط يديك عليه.",
      "ارجع إحدى الساقين للخلف مع إبقاء الكعب ملامساً للأرض.",
      "اثنِ الركبة الأمامية ببطء حتى تشعر بالشاط في الساق الخلفية."
    ],
    "tips": [
      "حافظ على استقامة الظهر والكعب على الأرض.",
      "تنفس ببطء واستقر لمدة 20-30 ثانية."
    ],
    "tags": [
      "إطالة",
      "مرونة",
      "الكاحل",
      "استشفاء",
      "بدون معدات",
      "تمارين منزلية",
      "مبتدئ"
    ],
    "muscleGroup": "الإطالات والاستشفاء",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/1-Achilles%20Stretch.mp4",
    "mp4Url": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/1-Achilles%20Stretch.mp4",
    "imageUrl": ""
  },
  "add_stretch": {
    "id": "add_stretch",
    "nameAr": "إطالة العضلات الضامة للفخذ",
    "nameEn": "Add Stretch",
    "category": "الإطالات والاستشفاء",
    "bodyPart": "الجزء السفلي والحوض",
    "targetMuscle": "العضلات الضامة (Adductors)",
    "secondaryMuscles": [
      "عضلات الحوض",
      "الفخذ الداخلي"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين لتطوير مرونة الفخذ الداخلي وعضلات الحوض وتخفيف الشد العضلي بعد التمارين.",
    "duration": 30,
    "caloriesPerMin": 3,
    "caloriesApprox": 15,
    "animationType": "cobra-stretch",
    "steps": [
      "اجلس على الأرض وضُم باطن القدمين لبعضهما.",
      "امسك القدمين بيديك واضغط بالركبتين بلطف نحو الأسفل.",
      "انحنِ للامام قليلاً مع الحفاظ على استقامة الظهر."
    ],
    "tips": [
      "لا تضغط بقوة مفرطة، الإطالة يجب أن تكون مريحة.",
      "حافظ على تنفس عميق أثناء التمرين."
    ],
    "tags": [
      "إطالة",
      "الفخذ الداخلي",
      "الحوض",
      "استشفاء",
      "بدون معدات",
      "مبتدئ"
    ],
    "muscleGroup": "الإطالات والاستشفاء",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/2-Add%20Stretch.mp4",
    "mp4Url": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/2-Add%20Stretch.mp4",
    "imageUrl": ""
  },
  "air_drivers": {
    "id": "air_drivers",
    "nameAr": "تمرين قيادة الهواء للأكتاف",
    "nameEn": "Air Drivers",
    "category": "الإحماء",
    "bodyPart": "الأكتاف والجزء العلوي",
    "targetMuscle": "عضلات الكتف (Deltoids)",
    "secondaryMuscles": [
      "أعلى الظهر",
      "الذراعين"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين حركي ممتاز لإحماء مفصل الكتف وتنشيط الدورة الدموية في الجزء العلوي.",
    "duration": 30,
    "caloriesPerMin": 5,
    "caloriesApprox": 25,
    "animationType": "jumping-jacks",
    "steps": [
      "قف مستقيماً وافرد ذراعيك للأمام في مستوى الصدر.",
      "قم بتدوير الذراعين كأنك تمسك بمقود سيارة وتديره يميناً ويساراً.",
      "حافظ على سرعة منتظمة وثبات الكور."
    ],
    "tips": [
      "حافظ على شد عضلات البطن طوال الحركة.",
      "لا تخفض الذراعين أثناء التمرين."
    ],
    "tags": [
      "إحماء",
      "الكتفين",
      "الجسم بالكامل",
      "تخسيس",
      "شد الجسم",
      "مبتدئ"
    ],
    "muscleGroup": "الجزء العلوي والذراعين",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/3-Air%20Drivers.mp4",
    "mp4Url": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/3-Air%20Drivers.mp4",
    "imageUrl": ""
  },
  "alternating_forward_lunge": {
    "id": "alternating_forward_lunge",
    "nameAr": "طعن أمامي متناول للساقين",
    "nameEn": "Alternating Forward Lunge",
    "category": "الساقين",
    "bodyPart": "الجزء السفلي والفخذين",
    "targetMuscle": "العضلات الرباعية والأرداف (Quadriceps & Glutes)",
    "secondaryMuscles": [
      "عضلات الفخذ الخلفية",
      "الكور"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين مركزي لبناء عضلات الفخذين والأرداف وتحسين التوازن والرشاقة.",
    "duration": 45,
    "caloriesPerMin": 8,
    "caloriesApprox": 40,
    "animationType": "squats",
    "steps": [
      "قف بانتصاب مع وضع اليدين على الخصر.",
      "اخطُ خطوة واسعة للأمام باحدى الساقين واثنِ الركبة حتى زاوية 90 درجة.",
      "ادفع بالأرض بالقدم الأمامية للعودة لوضع الاستعداد وكرر بالساق الأخرى."
    ],
    "tips": [
      "لا تدع الركبة الأمامية تتجاوز أطراف الأصابع.",
      "حافظ على استقامة جذعك."
    ],
    "tags": [
      "الساقين",
      "المؤخرة",
      "شد الجسم",
      "بناء العضلات",
      "حرق الدهون",
      "بدون معدات",
      "متوسط"
    ],
    "muscleGroup": "الجزء السفلي والفخذين",
    "difficulty": "متوسط",
    "videoUrl": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/4-Alternating%20Forward%20Lunge.mp4",
    "mp4Url": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/4-Alternating%20Forward%20Lunge.mp4",
    "imageUrl": ""
  },
  "alternating_kettlebell_lunge_jumps": {
    "id": "alternating_kettlebell_lunge_jumps",
    "nameAr": "قفزات الطعن المتناوبة مع كيتل بل",
    "nameEn": "Alternating Kettlebell Lunge Jumps",
    "category": "الكارديو",
    "bodyPart": "الساقين والجسم بالكامل",
    "targetMuscle": "عضلات الفخذين والمؤخرة (Quads & Glutes)",
    "secondaryMuscles": [
      "عضلات القلب والأوعية الدموية",
      "الكور"
    ],
    "equipment": "كيتل بل",
    "description": "تمرين متفجر يجمع بين القوة البدنية وحرق الدهون العالي مع استخدام وزن إضافي.",
    "duration": 60,
    "caloriesPerMin": 12,
    "caloriesApprox": 60,
    "animationType": "squats",
    "steps": [
      "امسك الكيتل بل أمام صدرك بوضع الطعن.",
      "اقفز بقوة في الهواء وقم بتبديل وضعية القدمين في الهواء.",
      "اهبط بمرونة في وضعية الطعن بالساق الأخرى وكرر بالحركة المتواصلة."
    ],
    "tips": [
      "احرص على الهبوط الناعم لحماية الركبتين.",
      "حافظ على التحكم بالوزن طوال القفز."
    ],
    "tags": [
      "الكارديو",
      "حرق الدهون",
      "تخسيس",
      "الساقين",
      "المؤخرة",
      "كيتل بل",
      "متقدم"
    ],
    "muscleGroup": "كامل الجسم",
    "difficulty": "متقدم",
    "videoUrl": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/5-Alternating%20Kettlebell%20Lunge%20Jumps.mp4",
    "mp4Url": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/5-Alternating%20Kettlebell%20Lunge%20Jumps.mp4",
    "imageUrl": ""
  },
  "alternating_superman": {
    "id": "alternating_superman",
    "nameAr": "تمرين السوبرمان المتناوب للظهر",
    "nameEn": "Alternating Superman",
    "category": "الظهر",
    "bodyPart": "الظهر وأسفل الظهر",
    "targetMuscle": "عضلات أسفل الظهر (Erector Spinae)",
    "secondaryMuscles": [
      "الأرداف",
      "الأكتاف الخلفية"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين فعال جداً لتقوية الظهر والجزء الخلفي من الجسم وتحسين القامة.",
    "duration": 45,
    "caloriesPerMin": 5,
    "caloriesApprox": 25,
    "animationType": "cobra-stretch",
    "steps": [
      "استلقِ على بطنك مع فرد الذراعين والساقين.",
      "ارفع الذراع اليمنى والساق اليسرى في نفس الوقت عن الأرض ببطء.",
      "اثبت لثانية ثم اخفضهما وكرر مع الذراع اليسرى والساق اليمنى."
    ],
    "tips": [
      "لا ترفع رأسك بشكل مفرط لتجنب إجهاد الرقبة.",
      "ركز على انقباض عضلات الظهر."
    ],
    "tags": [
      "الظهر",
      "شد الجسم",
      "بدون معدات",
      "تمارين منزلية",
      "مبتدئ"
    ],
    "muscleGroup": "الجزء العلوي والذراعين",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/6-Alternating%20Superman.mp4",
    "mp4Url": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/6-Alternating%20Superman.mp4",
    "imageUrl": ""
  },
  "angle_pose": {
    "id": "angle_pose",
    "nameAr": "وضعية الزاوية لليوجا والتوازن",
    "nameEn": "Angle Pose",
    "category": "الإطالات والاستشفاء",
    "bodyPart": "الكور والجذع",
    "targetMuscle": "عضلات الجذع الجانبية والحوض",
    "secondaryMuscles": [
      "عضلات الفخذ",
      "الظهر"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "وضعية تعزز الاستقرار والتوازن وتزيد من مرونة الخصر والجزء السفلي.",
    "duration": 45,
    "caloriesPerMin": 4,
    "caloriesApprox": 20,
    "animationType": "cobra-stretch",
    "steps": [
      "قف بتباعد مناسب بين القدمين.",
      "انحنِ بجذعك جانباً وافرد اليد العلوية باتجاه السقف.",
      "حافظ على الثبات والتنفس الهادئ لمدة 20 ثانية لكل جانب."
    ],
    "tips": [
      "حافظ على استقامة الصدر وعدم الانحناء للأمام."
    ],
    "tags": [
      "إطالة",
      "مرونة",
      "توازن",
      "استشفاء",
      "مبتدئ"
    ],
    "muscleGroup": "الإطالات والاستشفاء",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/7-Angle%20Pose.mp4",
    "mp4Url": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/7-Angle%20Pose.mp4",
    "imageUrl": ""
  },
  "angle_pose_stretch": {
    "id": "angle_pose_stretch",
    "nameAr": "إطالة وضعية الزاوية للخصر",
    "nameEn": "Angle Pose Stretch",
    "category": "الإطالات والاستشفاء",
    "bodyPart": "الخصر والجذع",
    "targetMuscle": "عضلات الخصر والعضلات الماربة (Obliques)",
    "secondaryMuscles": [
      "أسفل الظهر",
      "الورك"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين إطالة لفك الشد العضلي في منطقة الجوانب والخصر بعد التمارين الشاقة.",
    "duration": 45,
    "caloriesPerMin": 4,
    "caloriesApprox": 20,
    "animationType": "cobra-stretch",
    "steps": [
      "قف وافتح القدمين بعرض الكتفين.",
      "ارفع ذراعك فوق رأسك وانحنِ للجزء المقابل ببطء.",
      "اشعر بالشاط المريح على طول جانب جسمك."
    ],
    "tips": [
      "حافظ على التنفس المريح دون حبس النفس."
    ],
    "tags": [
      "إطالة",
      "الخصر",
      "الكرش",
      "استشفاء",
      "مبتدئ"
    ],
    "muscleGroup": "الإطالات والاستشفاء",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/8-Angle%20Pose%20Stretch.mp4",
    "mp4Url": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/8-Angle%20Pose%20Stretch.mp4",
    "imageUrl": ""
  },
  "ankle_circles": {
    "id": "ankle_circles",
    "nameAr": "تدوير الكاحل لليونة المفاصل",
    "nameEn": "Ankle Circles",
    "category": "الإحماء",
    "bodyPart": "الكاحل والقدمين",
    "targetMuscle": "مفصل الكاحل وأربطة القدم",
    "secondaryMuscles": [
      "ربلة الساق"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين تهيئة وتنشيط لمفصل الكاحل قبل التمارين الكارديو والقدمين.",
    "duration": 30,
    "caloriesPerMin": 3,
    "caloriesApprox": 15,
    "animationType": "jumping-jacks",
    "steps": [
      "قف أو اجلس مع رفع قدم واحدة قليلاً عن الأرض.",
      "قم بتدوير الكاحل بحركة دائرية باتجاه عقارب الساعة ثم عكسها.",
      "كرر الحركة لكل قدم لمدة 15-20 ثانية."
    ],
    "tips": [
      "اجعل الحركة بطيئة وواسعة أقصى قدر ممكن."
    ],
    "tags": [
      "إحماء",
      "الكاحل",
      "مرونة",
      "بدون معدات",
      "مبتدئ"
    ],
    "muscleGroup": "الإطالات والاستشفاء",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/9-Ankle%20Circles.mp4",
    "mp4Url": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/9-Ankle%20Circles.mp4",
    "imageUrl": ""
  },
  "ankle_dorsiflexion": {
    "id": "ankle_dorsiflexion",
    "nameAr": "تمرين انثناء الكاحل للأعلى",
    "nameEn": "Ankle Dorsiflexion",
    "category": "الإحماء",
    "bodyPart": "الكاحل والساق",
    "targetMuscle": "عضلة الساق الأمامية (Tibialis Anterior)",
    "secondaryMuscles": [
      "مفصل الكاحل"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تقوية العضلة الأمامية للساق لحماية مفصل الكاحل والركبة أثناء الركض والقفز.",
    "duration": 30,
    "caloriesPerMin": 3,
    "caloriesApprox": 15,
    "animationType": "jumping-jacks",
    "steps": [
      "استند بظهرك إلى الحائط واجعل قدميك بعيدتين عن الحائط بضع خطوات.",
      "ارفع أصابع قدميك للأعلى باتجاه الساق مع البقاء على الكعبين.",
      "اخفضهما ببطء وكرر التكرارات."
    ],
    "tips": [
      "ركز على الانقباض العضلي في مقدمة الساق."
    ],
    "tags": [
      "إحماء",
      "الساقين",
      "تقوية المفاصل",
      "مبتدئ"
    ],
    "muscleGroup": "الإطالات والاستشفاء",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/10-Ankle%20Dorsiflexion.mp4",
    "mp4Url": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/10-Ankle%20Dorsiflexion.mp4",
    "imageUrl": ""
  },
  "ankle_touches": {
    "id": "ankle_touches",
    "nameAr": "تمرين لمس الكاحلين لشد البطن الجانبي",
    "nameEn": "Ankle Touches",
    "category": "البطن والكرش",
    "bodyPart": "البطن والخصر",
    "targetMuscle": "عضلات البطن الجانبية (Obliques)",
    "secondaryMuscles": [
      "عضلات البطن المستقيمة"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين رائع لنحت الخصر وإزالة الدهون الجانبية وتفعيل عضلات البطن العلوي والجوانب.",
    "duration": 45,
    "caloriesPerMin": 6,
    "caloriesApprox": 30,
    "animationType": "crunches",
    "steps": [
      "استلقِ على ظهرك واثنِ الركبتين مع تثبيت القدمين على الأرض.",
      "ارفع كتفيك قليلاً عن الأرض وانحنِ جانباً للمس كاحلك الأيمن بيدك اليمنى.",
      "عد للنتصف ثم انحنِ للمس الكاحل الأيسر باليد اليسرى بالتجانس."
    ],
    "tips": [
      "حافظ على الرقبة مسترخية وتطلع للسقف."
    ],
    "tags": [
      "البطن",
      "الكرش",
      "تخسيس",
      "شد الجسم",
      "بدون معدات",
      "مبتدئ"
    ],
    "muscleGroup": "عضلات البطن والخصر",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/11-Ankle%20Touches.mp4",
    "mp4Url": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/11-Ankle%20Touches.mp4",
    "imageUrl": ""
  },
  "arm_circles": {
    "id": "arm_circles",
    "nameAr": "دوائر الذراعين الأمامية",
    "nameEn": "Arm Circles",
    "category": "الإحماء",
    "bodyPart": "الأكتاف والذراعين",
    "targetMuscle": "الأكتاف (Deltoids)",
    "secondaryMuscles": [
      "أعلى الصدر",
      "أعلى الظهر"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين حركي كلاسيكي ممتاز لتسخين مفصل الكتف والأذرع وتقوية التحمل.",
    "duration": 30,
    "caloriesPerMin": 4,
    "caloriesApprox": 20,
    "animationType": "jumping-jacks",
    "steps": [
      "قف بانتصاب وافرد الذراعين جانباً بمستوى الكتفين.",
      "قم بتدوير الذراعين بحركات دائرية صغيرة للأمام.",
      "زد حجم الدائرة تدريجياً."
    ],
    "tips": [
      "حافظ على ارتفاع الذراعين وعدم إنزالهما."
    ],
    "tags": [
      "إحماء",
      "الكتفين",
      "الذراعين",
      "شد الجسم",
      "مبتدئ"
    ],
    "muscleGroup": "الجزء العلوي والذراعين",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/12-13-Arm%20Circles.mp4",
    "mp4Url": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/12-13-Arm%20Circles.mp4",
    "imageUrl": ""
  },
  "arm_circles_reverse": {
    "id": "arm_circles_reverse",
    "nameAr": "دوائر الذراعين الخلفية",
    "nameEn": "Arm Circles Reverse",
    "category": "الإحماء",
    "bodyPart": "الأكتاف وأعلى الظهر",
    "targetMuscle": "الكتف الخلفي وأعلى الظهر",
    "secondaryMuscles": [
      "الذراعين"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين تدوير الذراعين للخلف لفتح الصدر وتحسين قامة الجسم وتنشيط الكتف الخلفي.",
    "duration": 30,
    "caloriesPerMin": 4,
    "caloriesApprox": 20,
    "animationType": "jumping-jacks",
    "steps": [
      "قف وافرد ذراعيك جانباً بمستوى الكتفين.",
      "قم بتدوير الذراعين للخلف بحركات دائرية متناسقة.",
      "استمر بالدوران لمدة 30 ثانية."
    ],
    "tips": [
      "ضم لوحي الكتف للخلف أثناء الدوران."
    ],
    "tags": [
      "إحماء",
      "الكتفين",
      "الظهر",
      "بدون معدات",
      "مبتدئ"
    ],
    "muscleGroup": "الجزء العلوي والذراعين",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/13-Arm%20Circles%20Reverse.mp4",
    "mp4Url": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/13-Arm%20Circles%20Reverse.mp4",
    "imageUrl": ""
  },
  "back_lunge_with_band": {
    "id": "back_lunge_with_band",
    "nameAr": "طعن خلفي باستخدام شريط المقاومة",
    "nameEn": "Back Lunge With Band",
    "category": "الساقين",
    "bodyPart": "الساقين والمؤخرة",
    "targetMuscle": "عضلات الفخذ والأرداف (Quads & Glutes)",
    "secondaryMuscles": [
      "عضلات الكور",
      "التوازن"
    ],
    "equipment": "شريط مقاومة (باند)",
    "description": "تمرين طعن خلفي مدعم بشريط مقاومة لزيادة التفعيل العضلي ونحت المؤخرة.",
    "duration": 45,
    "caloriesPerMin": 8,
    "caloriesApprox": 40,
    "animationType": "squats",
    "steps": [
      "ضع شريط المقاومة حول الفخذين أعلى الركبة.",
      "اخطُ خطوة واسعة للخلف باحدى الساقين واثنِ الركبتين لزاوية قائمة.",
      "ادفع بالقدم الأمامية للعودة لوضع البداية وكرر."
    ],
    "tips": [
      "حافظ على بقاء الركبة ثابتة وعدم انحرافها للداخل."
    ],
    "tags": [
      "الساقين",
      "المؤخرة",
      "بناء العضلات",
      "شد الجسم",
      "شريط مقاومة",
      "متوسط"
    ],
    "muscleGroup": "الجزء السفلي والفخذين",
    "difficulty": "متوسط",
    "videoUrl": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/14-Back%20Lunge%20With%20Band.mp4",
    "mp4Url": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/14-Back%20Lunge%20With%20Band.mp4",
    "imageUrl": ""
  },
  "back_squat_single_leg": {
    "id": "back_squat_single_leg",
    "nameAr": "سكوات أحادي الساق لتقوية الفخذ",
    "nameEn": "Back Squat Single Leg",
    "category": "الساقين",
    "bodyPart": "الساقين والمؤخرة",
    "targetMuscle": "العضلات الرباعية والأرداف",
    "secondaryMuscles": [
      "عضلات الكور والاتزان"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين متتقدم جداً لبناء القوة والتوازن العالي في كل ساق على حدة.",
    "duration": 60,
    "caloriesPerMin": 9,
    "caloriesApprox": 45,
    "animationType": "squats",
    "steps": [
      "قف على ساق واحدة وافرد الساق الأخرى للأمام قليلاً.",
      "اثنِ ركبة الساق المرتكزة وانزل بمؤخرتك للخلف ببطء.",
      "ادفع بأسفل القدم للعودة إلى وضعية الاستقامة."
    ],
    "tips": [
      "يمكن الاستعانة بحائط أو كرسي للتوازن في البداية."
    ],
    "tags": [
      "الساقين",
      "المؤخرة",
      "بناء العضلات",
      "شد الجسم",
      "متقدم"
    ],
    "muscleGroup": "الجزء السفلي والفخذين",
    "difficulty": "متقدم",
    "videoUrl": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/15-Back%20Squat%20Single%20Leg.mp4",
    "mp4Url": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/15-Back%20Squat%20Single%20Leg.mp4",
    "imageUrl": ""
  },
  "back_stretch": {
    "id": "back_stretch",
    "nameAr": "تمرين إطالة واستعادة مرونة الظهر",
    "nameEn": "Back Stretch",
    "category": "الإطالات والاستشفاء",
    "bodyPart": "الظهر بالكامل",
    "targetMuscle": "عضلات الظهر الطويلة والعمود الفقري",
    "secondaryMuscles": [
      "الأكتاف",
      "الرقبة"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "إطالة وشاط شامل لعضلات الظهر لتخفيف الآلام والإجهاد الناتج عن الجلوس الطويل.",
    "duration": 30,
    "caloriesPerMin": 3,
    "caloriesApprox": 15,
    "animationType": "cobra-stretch",
    "steps": [
      "اجلس على كعبيك وانحنِ بجذعك للأمام حتى يلمس جبهتك الأرض.",
      "امدد ذراعيك للأمام أقصى حد واستشعر الشاط في الظهر.",
      "اثبت لمدة 30 ثانية مع تنفس هادئ."
    ],
    "tips": [
      "دَع جسمك يسترخي بالكامل دون أي شد."
    ],
    "tags": [
      "إطالة",
      "الظهر",
      "استشفاء",
      "بدون معدات",
      "مبتدئ"
    ],
    "muscleGroup": "الإطالات والاستشفاء",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/16-Back%20Stretch.mp4",
    "mp4Url": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/16-Back%20Stretch.mp4",
    "imageUrl": ""
  },
  "bent_leg_twist": {
    "id": "bent_leg_twist",
    "nameAr": "التواء الساقين المثنيتين للخصر والظهر",
    "nameEn": "Bent Leg Twist",
    "category": "البطن والكرش",
    "bodyPart": "البطن والخصر",
    "targetMuscle": "عضلات الخصر والعضلات الماربة (Obliques)",
    "secondaryMuscles": [
      "أسفل الظهر"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين ممتاز لتليين أسفل الظهر ونحت الخصر والتخلص من الزوائد الجانبية.",
    "duration": 30,
    "caloriesPerMin": 5,
    "caloriesApprox": 25,
    "animationType": "russian-twist",
    "steps": [
      "استلقِ على ظهرك وافرد ذراعيك جانباً باعتدال.",
      "ارفع ركبتيك واثنهما بدرجة 90 مئوية.",
      "انزل بالركبتين معاً نحو الجانب الأيمن ثم الأيسر بالتجانس."
    ],
    "tips": [
      "حافظ على ملامسة الكتفين للأرض طوال التمرين."
    ],
    "tags": [
      "البطن",
      "الكرش",
      "الخصر",
      "تخسيس",
      "شد الجسم",
      "مبتدئ"
    ],
    "muscleGroup": "عضلات البطن والخصر",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/17-Bent%20Leg%20Twist.mp4",
    "mp4Url": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/17-Bent%20Leg%20Twist.mp4",
    "imageUrl": ""
  },
  "bicycle_crunches": {
    "id": "bicycle_crunches",
    "nameAr": "تمرين دراجة البطن (بايسكل كرانش)",
    "nameEn": "Bicycle Crunches",
    "category": "البطن والكرش",
    "bodyPart": "البطن والخصر",
    "targetMuscle": "عضلات البطن الكلية والخصر",
    "secondaryMuscles": [
      "مُثنيات الورك"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "من أقوى التمارين العلمية المستهدفة لشد كامل عضلات البطن والخصر وحرق الدهون.",
    "duration": 45,
    "caloriesPerMin": 8,
    "caloriesApprox": 40,
    "animationType": "crunches",
    "steps": [
      "استلقِ على ظهرك وضغط يديك خلف رأسك.",
      "ارفع كتفيك وركبتيك عن الأرض.",
      "قرّب الكوع الأيمن نحو الركبة اليسرى مع فرد الساق الأخرى، ثم العكس بحركة البدال."
    ],
    "tips": [
      "لا تسحب رقبتك بيديك، الحركة تأتي من تجويف البطن."
    ],
    "tags": [
      "البطن",
      "الكرش",
      "حرق الدهون",
      "تخسيس",
      "شد الجسم",
      "متوسط"
    ],
    "muscleGroup": "عضلات البطن والخصر",
    "difficulty": "متوسط",
    "videoUrl": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/18-Bicycle%20Crunches.mp4",
    "mp4Url": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/18-Bicycle%20Crunches.mp4",
    "imageUrl": ""
  },
  "bird_dog": {
    "id": "bird_dog",
    "nameAr": "تمرين الطير والكلب لتوازن وثبات الظهر",
    "nameEn": "Bird Dog",
    "category": "البطن والكرش",
    "bodyPart": "الظهر والكور",
    "targetMuscle": "العضلات العميقة للبطن والظهر (Core & Lower Back)",
    "secondaryMuscles": [
      "الأرداف",
      "الأكتاف"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين أساسي لتقوية الكور وحماية العمود الفقري وتحسين الاتزان الحركي.",
    "duration": 30,
    "caloriesPerMin": 5,
    "caloriesApprox": 25,
    "animationType": "plank",
    "steps": [
      "ارتكز على أطرافك الأربعة (اليدين والركبتين).",
      "افرد يدك اليمنى للأمام وساقك اليسرى للخلف حتى تصبحا على خط واحد مع الجسم.",
      "اثبت لثانية ثم عد وابدأ بالجانب الآخر."
    ],
    "tips": [
      "حافظ على استقامة الظهر ومنع انحناء الحوض."
    ],
    "tags": [
      "البطن",
      "الظهر",
      "شد الجسم",
      "توازن",
      "بدون معدات",
      "مبتدئ"
    ],
    "muscleGroup": "عضلات البطن والخصر",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/19-Bird%20Dog.mp4",
    "mp4Url": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/19-Bird%20Dog.mp4",
    "imageUrl": ""
  },
  "calf_raise": {
    "id": "calf_raise",
    "nameAr": "رفع ربلة الساق (بطات الساقين)",
    "nameEn": "Calf Raise",
    "category": "الساقين",
    "bodyPart": "الساقين السفليين",
    "targetMuscle": "عضلات الساق الخلفية (Gastrocnemius & Soleus)",
    "secondaryMuscles": [
      "الكاحل"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين يستهدف تقوية وتقسيم عضلات ربلة الساق وزيادة ثبات القدمين.",
    "duration": 30,
    "caloriesPerMin": 5,
    "caloriesApprox": 25,
    "animationType": "squats",
    "steps": [
      "قف بانتصاب مع فتح القدمين بعرض الحوض.",
      "ارفع جسمك لأعلى قدر مستطاع بالارتكاز على مشط القدم.",
      "اثبت في القمة لحظة ثم اخفض كعبيك ببطء."
    ],
    "tips": [
      "يمكنك أداؤه على حافة درجة لزيادة مدى الحركة."
    ],
    "tags": [
      "الساقين",
      "شد الجسم",
      "بناء العضلات",
      "بدون معدات",
      "مبتدئ"
    ],
    "muscleGroup": "الجزء السفلي والفخذين",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/20-Calf%20Raise.mp4",
    "mp4Url": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/20-Calf%20Raise.mp4",
    "imageUrl": ""
  },
  "calf_stretch": {
    "id": "calf_stretch",
    "nameAr": "إطالة عضلة الساق الخلفية (الربلة)",
    "nameEn": "Calf Stretch",
    "category": "الإطالات والاستشفاء",
    "bodyPart": "الساقين السفليين",
    "targetMuscle": "عضلة الساق الخلفية (Calf)",
    "secondaryMuscles": [
      "وتر العرقوب"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين إطالة لفك الشد والتشنجات في عضلات الربلة بعد الجري أو التمارين.",
    "duration": 30,
    "caloriesPerMin": 3,
    "caloriesApprox": 15,
    "animationType": "cobra-stretch",
    "steps": [
      "ضع يديك على الجدار، واجعل إحدى القدمين خلف الأخرى.",
      "ابحث عن الشد بضغط كعبك الخلفي إلى الأرض وثني الركبة الأمامية.",
      "اثبت 20 ثانية ثم بدّل للقدم الأخرى."
    ],
    "tips": [
      "حافظ على بقاء كعب الساق الخلفية مثبتاً بالأرض."
    ],
    "tags": [
      "إطالة",
      "الساقين",
      "استشفاء",
      "بدون معدات",
      "مبتدئ"
    ],
    "muscleGroup": "الإطالات والاستشفاء",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/21-Calf%20Stretch.mp4",
    "mp4Url": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/21-Calf%20Stretch.mp4",
    "imageUrl": ""
  },
  "camel_pose": {
    "id": "camel_pose",
    "nameAr": "وضعية الجمل لفتح الصدر والظهر",
    "nameEn": "Camel Pose",
    "category": "الإطالات والاستشفاء",
    "bodyPart": "الصدر والظهر",
    "targetMuscle": "عضلات الصدر والبطن والعمود الفقري",
    "secondaryMuscles": [
      "الأكتاف",
      "الفخذ الأمامي"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "وضعية يوجا قوية لفتح قفص الصدر وتمديد عضلات البطن وتحسين استقامة القامة.",
    "duration": 45,
    "caloriesPerMin": 4,
    "caloriesApprox": 20,
    "animationType": "cobra-stretch",
    "steps": [
      "اجثُ على ركبتيك واجعل جسمك مستقيماً.",
      "انحنِ بجذعك للخلف ببطء وامسك كعبيك بيديك.",
      "ادفع الحوض للأمام وافتح الصدر باتجاه السقف."
    ],
    "tips": [
      "عد ببطء للوضع الأصلي وتجنب الحركات الفجائية."
    ],
    "tags": [
      "إطالة",
      "الصدر",
      "الظهر",
      "استشفاء",
      "متوسط"
    ],
    "muscleGroup": "الإطالات والاستشفاء",
    "difficulty": "متوسط",
    "videoUrl": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/22-Camel%20Pose.mp4",
    "mp4Url": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/22-Camel%20Pose.mp4",
    "imageUrl": ""
  },
  "cat_stretch": {
    "id": "cat_stretch",
    "nameAr": "إطالة القطة لليونة العمود الفقري",
    "nameEn": "Cat Stretch",
    "category": "الإطالات والاستشفاء",
    "bodyPart": "الظهر بالكامل",
    "targetMuscle": "عضلات الظهر والرقبة والعمود الفقري",
    "secondaryMuscles": [
      "الكور"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين مرونة كلاسيكي يقلل الضغط عن فقرات الظهر ويرخي الأعصاب المشدودة.",
    "duration": 30,
    "caloriesPerMin": 3,
    "caloriesApprox": 15,
    "animationType": "cobra-stretch",
    "steps": [
      "ارتكز على أطرافك الأربعة.",
      "اقوس ظهرك للأعلى مع سحب رأسك للأسفل نحو الصدر (وضع القطة).",
      "اثبت لثوانٍ مع زفير عميق."
    ],
    "tips": [
      "قم بالحركة ببطء وتناغم مع التنفس."
    ],
    "tags": [
      "إطالة",
      "الظهر",
      "استشفاء",
      "بدون معدات",
      "مبتدئ"
    ],
    "muscleGroup": "الإطالات والاستشفاء",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/23-Cat%20Stretch.mp4",
    "mp4Url": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/23-Cat%20Stretch.mp4",
    "imageUrl": ""
  },
  "chase_the_rabbits": {
    "id": "chase_the_rabbits",
    "nameAr": "تمرين ملاحقة الأرانب للياقة والساقين",
    "nameEn": "Chase the Rabbits",
    "category": "الكارديو",
    "bodyPart": "كامل الجسم",
    "targetMuscle": "عضلات الساقين والقلب",
    "secondaryMuscles": [
      "عضلات الكور",
      "الأكتاف"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين كارديو سريع وممتع يرفع معدل نبضات القلب ويعزز حرق السعرات الحرارية.",
    "duration": 45,
    "caloriesPerMin": 10,
    "caloriesApprox": 50,
    "animationType": "jumping-jacks",
    "steps": [
      "قف بوضعية الاستعداد ثم قم بالركض السريع في المكان مع تحريك الأذرع بسرعة.",
      "انتقل بخطوات جانبية سريعة خاطفة يميناً ويساراً.",
      "حافظ على وتيرة سريعة ومستمرة."
    ],
    "tips": [
      "هبط على أطراف أصابع القدمين للحد من الصدمات."
    ],
    "tags": [
      "الكارديو",
      "حرق الدهون",
      "تخسيس",
      "الساقين",
      "متوسط"
    ],
    "muscleGroup": "كامل الجسم",
    "difficulty": "متوسط",
    "videoUrl": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/24-Chase%20the%20Rabbits.mp4",
    "mp4Url": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/24-Chase%20the%20Rabbits.mp4",
    "imageUrl": ""
  },
  "child_pose": {
    "id": "child_pose",
    "nameAr": "وضعية الطفل للاسترخاء وإطالة الظهر",
    "nameEn": "Child Pose",
    "category": "الإطالات والاستشفاء",
    "bodyPart": "الظهر والحوض",
    "targetMuscle": "عضلات الظهر والأرداف",
    "secondaryMuscles": [
      "الأكتاف",
      "الفخذين"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين يوجا مريح للغاية يهدئ الجهاز العصبي ويرخي عضلات الظهر والجذع.",
    "duration": 45,
    "caloriesPerMin": 3,
    "caloriesApprox": 15,
    "animationType": "cobra-stretch",
    "steps": [
      "اجلس على كعبيك وافتح ركبتيك قليلاً.",
      "انحنِ للأمام وافرد يديك على الأرض أمامك.",
      "أرح جبهتك على الأرض واسترخِ بالكامل."
    ],
    "tips": [
      "ركز على التنفس العميق من البطن."
    ],
    "tags": [
      "إطالة",
      "الظهر",
      "استشفاء",
      "بدون معدات",
      "مبتدئ"
    ],
    "muscleGroup": "الإطالات والاستشفاء",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/25-Child%20Pose.mp4",
    "mp4Url": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/25-Child%20Pose.mp4",
    "imageUrl": ""
  },
  "close_grip_push_up": {
    "id": "close_grip_push_up",
    "nameAr": "تمرين الضغط بقبضة ضيقة للترايسبس والصدر",
    "nameEn": "Close Grip Push Up",
    "category": "الذراعين",
    "bodyPart": "الذراعين والصدر",
    "targetMuscle": "عضلة الترايسبس (Triceps)",
    "secondaryMuscles": [
      "منتصف الصدر",
      "الأكتاف الأمامية"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين قوي لتقوية وتحديد ذراع الترايسبس وبناء الجزء الداخلي من الصدر.",
    "duration": 45,
    "caloriesPerMin": 8,
    "caloriesApprox": 40,
    "animationType": "plank",
    "steps": [
      "ضع يديك على الأرض بقبضة ضيقة أقل من عرض الكتفين.",
      "انزل بجسمك ببطء نحو الأرض مع إبقاء الكوعين قريباً من الجسد.",
      "ادفع الأرض بقوة للعودة لوضعية البداية."
    ],
    "tips": [
      "حافظ على استقامة الجسم وعدم نزول الحوض."
    ],
    "tags": [
      "الذراعين",
      "الصدر",
      "شد الجسم",
      "بناء العضلات",
      "بدون معدات",
      "متوسط"
    ],
    "muscleGroup": "الجزء العلوي والذراعين",
    "difficulty": "متوسط",
    "videoUrl": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/26-Close%20Grip%20Push%20Up.mp4",
    "mp4Url": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/26-Close%20Grip%20Push%20Up.mp4",
    "imageUrl": ""
  },
  "cobra_pose": {
    "id": "cobra_pose",
    "nameAr": "وضعية الكوبرا لإطالة البطن والظهر",
    "nameEn": "Cobra Pose",
    "category": "الإطالات والاستشفاء",
    "bodyPart": "البطن والظهر",
    "targetMuscle": "عضلات البطن المستقيمة والظهر",
    "secondaryMuscles": [
      "الأكتاف",
      "الصدر"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين إطالة ممتاز لعضلات البطن بعد تمارين البطن الشديدة وتقوية العمود الفقري.",
    "duration": 45,
    "caloriesPerMin": 4,
    "caloriesApprox": 20,
    "animationType": "cobra-stretch",
    "steps": [
      "استلقِ على بطنك وضع كفيك بجانب صدرك.",
      "ادفع الأرض بيديك وارفع صدرك وأعلى جسمك لأعلى مع إبقاء الحوض ملامساً للأرض.",
      "تطلع للأعلى قليلاً واثبت لـ 20 ثانية."
    ],
    "tips": [
      "لا تضغط بقوة مفرطة على أسفل الظهر."
    ],
    "tags": [
      "إطالة",
      "البطن",
      "الكرش",
      "الظهر",
      "استشفاء",
      "مبتدئ"
    ],
    "muscleGroup": "الإطالات والاستشفاء",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/27-Cobra%20Pose.mp4",
    "mp4Url": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/27-Cobra%20Pose.mp4",
    "imageUrl": ""
  },
  "crunch": {
    "id": "crunch",
    "nameAr": "تمرين طحن البطن الكلاسيكي (كرانش)",
    "nameEn": "Crunch",
    "category": "البطن والكرش",
    "bodyPart": "البطن العلوي",
    "targetMuscle": "عضلات البطن المستقيمة العلوية (Rectus Abdominis)",
    "secondaryMuscles": [
      "الكور"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "التمرين الأساسي الأشهر لتقوية وتحديد عضلات البطن العلوية والتخلص من البروز.",
    "duration": 30,
    "caloriesPerMin": 6,
    "caloriesApprox": 30,
    "animationType": "crunches",
    "steps": [
      "استلقِ على ظهرك واثنِ ركبتيك وضع أطراف أظافرك خلف رأسك.",
      "ارفع لوحي كتفيك عن الأرض بعصر عضلات البطن.",
      "اثبت في القمة لحظة ثم انزل ببطء."
    ],
    "tips": [
      "تجنب شد الرقبة بيديك، ركز على العصر البطني."
    ],
    "tags": [
      "البطن",
      "الكرش",
      "تخسيس",
      "شد الجسم",
      "بدون معدات",
      "مبتدئ"
    ],
    "muscleGroup": "عضلات البطن والخصر",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/28-Crunch.mp4",
    "mp4Url": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/28-Crunch.mp4",
    "imageUrl": ""
  },
  "crunch_reach_up": {
    "id": "crunch_reach_up",
    "nameAr": "تمرين طحن البطن مع المدى للقمة",
    "nameEn": "Crunch Reach Up",
    "category": "البطن والكرش",
    "bodyPart": "البطن العلوي والأوسط",
    "targetMuscle": "عضلات البطن المستقيمة (Abs)",
    "secondaryMuscles": [
      "الأكتاف"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تعديل رائع للكرانش يضمن التفعيل الكامل لعضلات البطن بدون إجهاد الرقبة.",
    "duration": 45,
    "caloriesPerMin": 7,
    "caloriesApprox": 35,
    "animationType": "crunches",
    "steps": [
      "استلقِ على ظهرك واثنِ الركبتين وافرد الذراعين للأعلى باتجاه السقف.",
      "ارفع الكتفين للأعلى كأنك تحاول لمس السقف بيديك.",
      "اثبت في القمة ثم انزل ببطء للأسفل."
    ],
    "tips": [
      "حافظ على بقاء الذراعين مفرودتين تماماً."
    ],
    "tags": [
      "البطن",
      "الكرش",
      "شد الجسم",
      "تخسيس",
      "بدون معدات",
      "مبتدئ"
    ],
    "muscleGroup": "عضلات البطن والخصر",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/29-Crunch%20Reach%20Up.mp4",
    "mp4Url": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/29-Crunch%20Reach%20Up.mp4",
    "imageUrl": ""
  },
  "deadbug": {
    "id": "deadbug",
    "nameAr": "تمرين الحشرة الميتة لاستقرار الكور",
    "nameEn": "DeadBug",
    "category": "البطن والكرش",
    "bodyPart": "البطن والجذع",
    "targetMuscle": "عضلات البطن العميقة (Transverse Abdominis)",
    "secondaryMuscles": [
      "مُثنيات الورك",
      "أسفل الظهر"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين آمن جداً لحماية الظهر وتسطيح الكرش وتقوية الثبات المحوري للبطن.",
    "duration": 45,
    "caloriesPerMin": 5,
    "caloriesApprox": 25,
    "animationType": "crunches",
    "steps": [
      "استلقِ على ظهرك وافرد الذراعين للسقف واثنِ الركبتين لزاوية 90 درجة.",
      "مدد ذراعك اليمنى للخلف وساقك اليسرى للأمام ببطء دون لمس الأرض.",
      "عد للوضع الأصلي وكرر مع الذراع اليسرى والساق اليمنى."
    ],
    "tips": [
      "الصق أسفل الظهر تماماً بالأرض طوال الحركة."
    ],
    "tags": [
      "البطن",
      "الكرش",
      "شد الجسم",
      "بدون معدات",
      "مبتدئ"
    ],
    "muscleGroup": "عضلات البطن والخصر",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/30-DeadBug.mp4",
    "mp4Url": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/30-DeadBug.mp4",
    "imageUrl": ""
  },
  "deadlift": {
    "id": "deadlift",
    "nameAr": "تمرين الرفعة المميتة (ديدليفت)",
    "nameEn": "Deadlift",
    "category": "الظهر",
    "bodyPart": "السلسلة الخلفية بالجسم",
    "targetMuscle": "عضلات الظهر السفلية والأرداف والفخذ الخلفي",
    "secondaryMuscles": [
      "الكور",
      "عضلات الساعد والقدمين"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين ملكي لتقوية السلسلة الخلفية كاملة وبناء القوة والقامة المنتصبة.",
    "duration": 45,
    "caloriesPerMin": 8,
    "caloriesApprox": 40,
    "animationType": "squats",
    "steps": [
      "قف بفتح القدمين بعرض الحوض مع الانحناء من الورك.",
      "اخفض جذعك للأمام مع إبقاء الظهر مستقيماً تماماً والركبتين منثنيتين قليلاً.",
      "ادفع بالورك للأمام وضم الأرداف للوصول للانتصاب."
    ],
    "tips": [
      "تجنب تقويس الظهر مطلقاً أثناء الحركة."
    ],
    "tags": [
      "الظهر",
      "الساقين",
      "المؤخرة",
      "بناء العضلات",
      "شد الجسم",
      "متوسط"
    ],
    "muscleGroup": "الجزء السفلي والفخذين",
    "difficulty": "متوسط",
    "videoUrl": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/31-Deadlift.mp4",
    "mp4Url": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/31-Deadlift.mp4",
    "imageUrl": ""
  },
  "diamond_push_up": {
    "id": "diamond_push_up",
    "nameAr": "تمرين ضغط الماس لشد الترايسبس والصدر",
    "nameEn": "Diamond Push Up",
    "category": "الذراعين",
    "bodyPart": "الذراعين والصدر",
    "targetMuscle": "عضلة الترايسبس (Triceps)",
    "secondaryMuscles": [
      "الصدر الداخلي",
      "الأكتاف الأمامية"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين متقدم بوضع السبابتين والإبهامين بشكل شكل ألماسة للتركيز العالي على الترايسبس.",
    "duration": 60,
    "caloriesPerMin": 9,
    "caloriesApprox": 45,
    "animationType": "plank",
    "steps": [
      "اصنع شكل ألماسة بيديك على الأرض تحت منتصف الصدر.",
      "اخفض جسمك حتى يلمس صدرك يديك.",
      "ادفع بصلابة للعودة لأعلى مع انقباض الترايسبس."
    ],
    "tips": [
      "حافظ على استقامة خط الجسم من الرأس للكعبين."
    ],
    "tags": [
      "الذراعين",
      "الصدر",
      "بناء العضلات",
      "شد الجسم",
      "متقدم"
    ],
    "muscleGroup": "الجزء العلوي والذراعين",
    "difficulty": "متقدم",
    "videoUrl": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/32-Diamond%20Push%20Up.mp4",
    "mp4Url": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/32-Diamond%20Push%20Up.mp4",
    "imageUrl": ""
  },
  "elevated_knee_crunch": {
    "id": "elevated_knee_crunch",
    "nameAr": "طحن البطن مع رفع الركبتين",
    "nameEn": "Elevated Knee Crunch",
    "category": "البطن والكرش",
    "bodyPart": "البطن السفلي والعلوي",
    "targetMuscle": "عضلات البطن المستقيمة (Abs)",
    "secondaryMuscles": [
      "مُثنيات الورك"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين يزيد الضغط على البطن السفلي والعلوي بسبب وضعية رفع القدمين بالأعلى.",
    "duration": 45,
    "caloriesPerMin": 7,
    "caloriesApprox": 35,
    "animationType": "crunches",
    "steps": [
      "استلقِ على ظهرك واثنِ الركبتين بزاوية 90 درجة في الهواء.",
      "ارفع رأسك وكتفيك بعصر عضلات البطن نحو الركبتين.",
      "انزل ببطء وكرر التكرارات."
    ],
    "tips": [
      "حافظ على تثبيت الزاوية في الركبتين أثناء الحركة."
    ],
    "tags": [
      "البطن",
      "الكرش",
      "تخسيس",
      "شد الجسم",
      "متوسط"
    ],
    "muscleGroup": "عضلات البطن والخصر",
    "difficulty": "متوسط",
    "videoUrl": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/33-Elevated%20Knee%20Crunch.mp4",
    "mp4Url": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/33-Elevated%20Knee%20Crunch.mp4",
    "imageUrl": ""
  },
  "feet_elevated_bench_dip": {
    "id": "feet_elevated_bench_dip",
    "nameAr": "غطس الترايسبس مع رفع القدمين على بنش",
    "nameEn": "Feet Elevated Bench Dip",
    "category": "الذراعين",
    "bodyPart": "الذراعين والأكتاف",
    "targetMuscle": "عضلة الترايسبس (Triceps)",
    "secondaryMuscles": [
      "الأكتاف الخلفية",
      "أعلى الصدر"
    ],
    "equipment": "بنش / مقعد",
    "description": "تمرين غطس مكثف للذراعين باستخدام مقعد أو بنش لزيادة الحمل والتحدي العضلي.",
    "duration": 60,
    "caloriesPerMin": 9,
    "caloriesApprox": 45,
    "animationType": "plank",
    "steps": [
      "ضع يديك على بنش خلفك وقدميك مرفوعتين على مقعد أو سطح مرتفع آخر.",
      "اخفض جسمك بثني الكوعين لزاوية 90 درجة.",
      "ادفع بالذراعين للعودة لوضع البداية."
    ],
    "tips": [
      "حافظ على الظهر قريباً جداً من حافة البنش."
    ],
    "tags": [
      "الذراعين",
      "شد الجسم",
      "بناء العضلات",
      "بنش / مقعد",
      "متقدم"
    ],
    "muscleGroup": "الجزء العلوي والذراعين",
    "difficulty": "متقدم",
    "videoUrl": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/34-Feet%20Elevated%20Bench%20Dip.mp4",
    "mp4Url": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/34-Feet%20Elevated%20Bench%20Dip.mp4",
    "imageUrl": ""
  },
  "forward_rotations": {
    "id": "forward_rotations",
    "nameAr": "تدوير الأكتاف للأمام",
    "nameEn": "Forward Rotations",
    "category": "الإحماء",
    "bodyPart": "الأكتاف والرقبة",
    "targetMuscle": "عضلات الكتف وأعلى الظهر",
    "secondaryMuscles": [
      "الرقبة"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين حركي ببرنامج الإحماء لتنشيط وتليين مفصل الكتف وتجنب الإصابات.",
    "duration": 30,
    "caloriesPerMin": 3,
    "caloriesApprox": 15,
    "animationType": "jumping-jacks",
    "steps": [
      "قف بانتصاب وأرخِ ذراعيك بجانبك.",
      "قم بتدوير كتفيك بحركات دائرية واسعة للأمام.",
      "كرر الدوران لمدة 20-30 ثانية."
    ],
    "tips": [
      "ركز على المدى الحركي الكامل للدوران."
    ],
    "tags": [
      "إحماء",
      "الكتفين",
      "بدون معدات",
      "مبتدئ"
    ],
    "muscleGroup": "الجزء العلوي والذراعين",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/35-Forward%20Rotations.mp4",
    "mp4Url": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/35-Forward%20Rotations.mp4",
    "imageUrl": ""
  },
  "glute_bridge_dip": {
    "id": "glute_bridge_dip",
    "nameAr": "جسر الأرداف مع الانخفاض والرفع",
    "nameEn": "Glute Bridge Dip",
    "category": "المؤخرة",
    "bodyPart": "الحوض والأرداف",
    "targetMuscle": "عضلات الأرداف الكبرى (Gluteus Maximus)",
    "secondaryMuscles": [
      "الفخذ الخلفي",
      "أسفل الظهر"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين مستهدف جداً لرفع وتدوير المؤخرة وتقوية عضلات الحوض والظهر.",
    "duration": 45,
    "caloriesPerMin": 6,
    "caloriesApprox": 30,
    "animationType": "squats",
    "steps": [
      "استلقِ على ظهرك واثنِ الركبتين وثبّت كعبيك على الأرض.",
      "ادفع بحوضك للأعلى حتى يصبح جسمك خطاً مستقيماً وانعصر الأرداف.",
      "اخفض حوضك ببطء بالقرب من الأرض واعد الرفع."
    ],
    "tips": [
      "اعصر عضلات المؤخرة بقوة عند الوصول للقمة."
    ],
    "tags": [
      "المؤخرة",
      "الساقين",
      "شد الجسم",
      "بناء العضلات",
      "مبتدئ"
    ],
    "muscleGroup": "الجزء السفلي والفخذين",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/36-Glute%20Bridge%20Dip.mp4",
    "mp4Url": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/36-Glute%20Bridge%20Dip.mp4",
    "imageUrl": ""
  },
  "half_lotus_stretch": {
    "id": "half_lotus_stretch",
    "nameAr": "إطالة نصف اللوتس لفتح الورك",
    "nameEn": "Half Lotus Stretch",
    "category": "الإطالات والاستشفاء",
    "bodyPart": "الحوض والفخذين",
    "targetMuscle": "عضلات الورك والفخذ الداخلي",
    "secondaryMuscles": [
      "الركبتين",
      "أسفل الظهر"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "وضعية يوجا كلاسيكية تحسن المرونة في الحوض والورك وتريح أسفل الظهر.",
    "duration": 30,
    "caloriesPerMin": 3,
    "caloriesApprox": 15,
    "animationType": "cobra-stretch",
    "steps": [
      "اجلس على الأرض واثنِ ساقاً وضع القدم فوق الفخذ المقابل.",
      "دع الركبة الأخرى تنخفض نحو الأرض واجلس بظهر مستقيم.",
      "اثبت واستنشق بهدوء لمدة 30 ثانية."
    ],
    "tips": [
      "لا تجبر الركبة على الانخفاض إذا شعرت بألم."
    ],
    "tags": [
      "إطالة",
      "مرونة",
      "الحوض",
      "استشفاء",
      "مبتدئ"
    ],
    "muscleGroup": "الإطالات والاستشفاء",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/37-Half%20Lotus%20Stretch.mp4",
    "mp4Url": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/37-Half%20Lotus%20Stretch.mp4",
    "imageUrl": ""
  },
  "half_moon_stretch": {
    "id": "half_moon_stretch",
    "nameAr": "إطالة الهلال لنحت الجوانب",
    "nameEn": "Half Moon Stretch",
    "category": "الإطالات والاستشفاء",
    "bodyPart": "الخصر والجذع",
    "targetMuscle": "عضلات الخصر والجانبين (Obliques & Latissimus)",
    "secondaryMuscles": [
      "الظهر",
      "الأكتاف"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "إطالة جانبية ممتازة لفك الشد في الخصر والعمود الفقري وزيادة المرونة الجانبية.",
    "duration": 30,
    "caloriesPerMin": 4,
    "caloriesApprox": 20,
    "animationType": "cobra-stretch",
    "steps": [
      "قف واضم قدميك وافرد ذراعيك فوق رأسك مع شبك الأصابع.",
      "انحنِ بجذعك ببطء نحو الجانب الأيمن ليشكل جسمك منحنى الهلال.",
      "اثبت ثم كرر للجانب الأيسر."
    ],
    "tips": [
      "احرص على تثبيت الحوض وعدم دورانه."
    ],
    "tags": [
      "إطالة",
      "الخصر",
      "الكرش",
      "مرونة",
      "مبتدئ"
    ],
    "muscleGroup": "الإطالات والاستشفاء",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/38-Half%20Moon%20Stretch.mp4",
    "mp4Url": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/38-Half%20Moon%20Stretch.mp4",
    "imageUrl": ""
  },
  "hamstring_extension": {
    "id": "hamstring_extension",
    "nameAr": "تمديد وإطالة عضلات الفخذ الخلفية",
    "nameEn": "Hamstring Extension",
    "category": "الإطالات والاستشفاء",
    "bodyPart": "الفخذ الخلفي",
    "targetMuscle": "عضلات الفخذ الخلفية (Hamstrings)",
    "secondaryMuscles": [
      "ربلة الساق",
      "أسفل الظهر"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين تمديد رائع لزيادة المرونة في الفخذ الخلفي وتقليل احتمالية الإصابات العضلية.",
    "duration": 30,
    "caloriesPerMin": 3,
    "caloriesApprox": 15,
    "animationType": "cobra-stretch",
    "steps": [
      "استلقِ على ظهرك وارفع ساقاً واحدة مستقيمة باتجاه السقف.",
      "امسك الساق بيديك خلف الفخذ واسحبها ببطء ونحو صدرك.",
      "حافظ على الساق الأخرى مفرودة على الأرض."
    ],
    "tips": [
      "حافظ على الركبة مفرودة قدر الإمكان."
    ],
    "tags": [
      "إطالة",
      "الساقين",
      "استشفاء",
      "مبتدئ"
    ],
    "muscleGroup": "الإطالات والاستشفاء",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/39-Hamstring%20Extension.mp4",
    "mp4Url": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/39-Hamstring%20Extension.mp4",
    "imageUrl": ""
  },
  "heel_touch_jumps": {
    "id": "heel_touch_jumps",
    "nameAr": "قفزات لمس الكعبين للياقة الحركية",
    "nameEn": "Heel Touch Jumps",
    "category": "الكارديو",
    "bodyPart": "الساقين وجسم بالكامل",
    "targetMuscle": "عضلات الساقين والأرداف والقلب",
    "secondaryMuscles": [
      "الكور"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين ديناميكي متفجر يحرق الدهون ويعزز اللياقة البدنية والسرعة الحركية.",
    "duration": 60,
    "caloriesPerMin": 11,
    "caloriesApprox": 55,
    "animationType": "jumping-jacks",
    "steps": [
      "اقفز للأعلى باعتدال وفي الهواء ثنِ ركبتيك للخلف للمس الكعبين بيديك.",
      "اهبط بمرونة على مشط القدمين واكرر الحركة فوراً."
    ],
    "tips": [
      "احرص على امتصاص الصدمة بالهبوط المرن."
    ],
    "tags": [
      "الكارديو",
      "حرق الدهون",
      "تخسيس",
      "الساقين",
      "متوسط"
    ],
    "muscleGroup": "كامل الجسم",
    "difficulty": "متوسط",
    "videoUrl": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/40-Heel%20Touch%20Jumps.mp4",
    "mp4Url": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/40-Heel%20Touch%20Jumps.mp4",
    "imageUrl": ""
  },
  "high_jumps": {
    "id": "high_jumps",
    "nameAr": "القفز العالي لتفجير الطاقة وحرق الدهون",
    "nameEn": "High Jumps",
    "category": "الكارديو",
    "bodyPart": "الساقين والجسم بالكامل",
    "targetMuscle": "عضلات الفخذين والأرداف وربلة الساق",
    "secondaryMuscles": [
      "الكور",
      "عضلات القلب"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين قفز عمودي مكثف لرفع القوة التفجيرية وحرق كميات كبيرة من السعرات.",
    "duration": 60,
    "caloriesPerMin": 12,
    "caloriesApprox": 60,
    "animationType": "jumping-jacks",
    "steps": [
      "قف باعتدال واثنِ الركبتين قليلاً للتحضير.",
      "ادفع بصلابة بقدميك وافقز لأعلى ارتفاع ممكن مع دفع الذراعين للسقف.",
      "اهبط بمرونة واعد القفز فوراً."
    ],
    "tips": [
      "حافظ على ثبات الكور أثناء القفز."
    ],
    "tags": [
      "الكارديو",
      "حرق الدهون",
      "تخسيس",
      "متقدم"
    ],
    "muscleGroup": "كامل الجسم",
    "difficulty": "متقدم",
    "videoUrl": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/41-High%20Jumps.mp4",
    "mp4Url": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/41-High%20Jumps.mp4",
    "imageUrl": ""
  },
  "high_knee": {
    "id": "high_knee",
    "nameAr": "تمرين رفع الركبتين العالي السريع",
    "nameEn": "High Knee",
    "category": "الكارديو",
    "bodyPart": "البطن السفلي والساقين",
    "targetMuscle": "مُثنيات الورك وعضلات البطن السفلية",
    "secondaryMuscles": [
      "الفخذين",
      "القلب والأوعية"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "من أشهر تمارين الكارديو لحرق دهون الكرش والبطن وتنشيط الجسم بالكامل.",
    "duration": 45,
    "caloriesPerMin": 10,
    "caloriesApprox": 50,
    "animationType": "jumping-jacks",
    "steps": [
      "اركض في المكان مع رفع الركبتين متناوباً ليصل ارتفاعهما لمستوى الخصر.",
      "حرك يديك بالتناغم مع الساقين بشكل سريع."
    ],
    "tips": [
      "حافظ على استقامة الظهر والتنفس المنتظم."
    ],
    "tags": [
      "الكارديو",
      "البطن",
      "الكرش",
      "حرق الدهون",
      "تخسيس",
      "متوسط"
    ],
    "muscleGroup": "كامل الجسم",
    "difficulty": "متوسط",
    "videoUrl": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/42-High%20Knee.mp4",
    "mp4Url": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/42-High%20Knee.mp4",
    "imageUrl": ""
  },
  "high_knee_march": {
    "id": "high_knee_march",
    "nameAr": "مشية رفع الركبتين العالي (للمبتدئين)",
    "nameEn": "High Knee March",
    "category": "الإحماء",
    "bodyPart": "الساقين والبطن",
    "targetMuscle": "مُثنيات الورك وعضلات البطن",
    "secondaryMuscles": [
      "الفخذين"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "نسخة معتدلة بدون قفز لرفع الركبتين، مناسبة للإحماء أو للمبتدئين وكبار السن.",
    "duration": 30,
    "caloriesPerMin": 6,
    "caloriesApprox": 30,
    "animationType": "jumping-jacks",
    "steps": [
      "قف بانتصاب واخطُ في المكان بخطوات منتظمة.",
      "ارفع كل ركبة ببطء لأعلى مستوى ممكن مع تبديل الأذرع."
    ],
    "tips": [
      "ركز على الانقباض في البطن عند رفع كل ركبة."
    ],
    "tags": [
      "إحماء",
      "البطن",
      "الكارديو",
      "بدون معدات",
      "مبتدئ"
    ],
    "muscleGroup": "كامل الجسم",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/43-High%20Knee%20March.mp4",
    "mp4Url": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/43-High%20Knee%20March.mp4",
    "imageUrl": ""
  },
  "high_knees_jogging": {
    "id": "high_knees_jogging",
    "nameAr": "هرولة رفع الركبتين العالي",
    "nameEn": "High Knees Jogging",
    "category": "الكارديو",
    "bodyPart": "كامل الجسم والساقين",
    "targetMuscle": "عضلات البطن والساقين والقلب",
    "secondaryMuscles": [
      "الكور"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تجميع بين الهرولة السريعة ورفع الركبتين العالي للتخلص السريع من دهون البطن والجسم.",
    "duration": 45,
    "caloriesPerMin": 10,
    "caloriesApprox": 50,
    "animationType": "jumping-jacks",
    "steps": [
      "هرول في المكان بمرونة عالية وزد ارتفاع رفع الركبتين تدريجياً لارتفاع الخصر.",
      "استمر بإيقاع سريع متواصل لمدة 30-45 ثانية."
    ],
    "tips": [
      "حافظ على الارتكاز على أمشاط القدمين."
    ],
    "tags": [
      "الكارديو",
      "حرق الدهون",
      "تخسيس",
      "البطن",
      "متوسط"
    ],
    "muscleGroup": "كامل الجسم",
    "difficulty": "متوسط",
    "videoUrl": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/44-High%20Knees%20Jogging.mp4",
    "mp4Url": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/44-High%20Knees%20Jogging.mp4",
    "imageUrl": ""
  },
  "high_knees_touch": {
    "id": "high_knees_touch",
    "nameAr": "رفع الركبتين العالي مع لمس اليدين",
    "nameEn": "High Knees Touch",
    "category": "الكارديو",
    "bodyPart": "البطن والساقين",
    "targetMuscle": "عضلات البطن السفلية ومُثنيات الورك",
    "secondaryMuscles": [
      "الفخذين",
      "الأكتاف"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين يضمن الوصول لارتفاع الركبة الصحيح بلمس كفي اليدين مع كل تكرار.",
    "duration": 45,
    "caloriesPerMin": 9,
    "caloriesApprox": 45,
    "animationType": "jumping-jacks",
    "steps": [
      "اضبط كفي يديك أمام جسمك بمستوى الخصر.",
      "ارفع ركبتك اليمنى للمس الكف الأيمن ثم اليسرى للمس الكف الأيسر بالتناوب السريع."
    ],
    "tips": [
      "لا تخفض يديك للركبة، بل ارفع ركبتك لليدين."
    ],
    "tags": [
      "البطن",
      "الكرش",
      "الكارديو",
      "تخسيس",
      "متوسط"
    ],
    "muscleGroup": "عضلات البطن والخصر",
    "difficulty": "متوسط",
    "videoUrl": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/45-High%20Knees%20Touch.mp4",
    "mp4Url": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/45-High%20Knees%20Touch.mp4",
    "imageUrl": ""
  },
  "hip_abductor_oblique_crunch": {
    "id": "hip_abductor_oblique_crunch",
    "nameAr": "طحن البطن الجانبي مع إبعاد الورك",
    "nameEn": "Hip Abductor Oblique Crunch",
    "category": "البطن والكرش",
    "bodyPart": "الخصر والأرداف الجانبية",
    "targetMuscle": "عضلات الخصر والعضلات المقربة للورك (Obliques & Abductors)",
    "secondaryMuscles": [
      "المؤخرة"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين مزدوج ينحت الخصر ويقوي الجزء الجانبي من المؤخرة لتناسق الجوانب.",
    "duration": 45,
    "caloriesPerMin": 7,
    "caloriesApprox": 35,
    "animationType": "crunches",
    "steps": [
      "استلقِ جانباً مع إسناد رأسك بيدك.",
      "ارفع ساقك العلوية جانباً وفي نفس الوقت انحنِ بجذعك العلوي نحو الساق المرفوعة.",
      "اخفضهما ببطء وكرر للجانبين."
    ],
    "tips": [
      "حافظ على العصر العضلي في الخصر والجوانب."
    ],
    "tags": [
      "البطن",
      "الكرش",
      "الخصر",
      "المؤخرة",
      "شد الجسم",
      "متوسط"
    ],
    "muscleGroup": "عضلات البطن والخصر",
    "difficulty": "متوسط",
    "videoUrl": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/46-Hip%20Abductor%20Oblique%20Crunch.mp4",
    "mp4Url": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/46-Hip%20Abductor%20Oblique%20Crunch.mp4",
    "imageUrl": ""
  },
  "hip_hinge": {
    "id": "hip_hinge",
    "nameAr": "انثناء مفصل الورك لتقوية السلسلة الخلفية",
    "nameEn": "Hip Hinge",
    "category": "الجسم بالكامل",
    "bodyPart": "الحوض والظهر",
    "targetMuscle": "عضلات الأرداف والفخذ الخلفي والظهر",
    "secondaryMuscles": [
      "الكور"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "التمرين الأساسي لتعلم الحركة الصحيحة لانثناء الورك وحماية الظهر في جميع التمارين.",
    "duration": 45,
    "caloriesPerMin": 5,
    "caloriesApprox": 25,
    "animationType": "squats",
    "steps": [
      "قف بانتصاب وضع يديك على الخصر أو خلف الرأس.",
      "ادفع بمؤخرتك للخلف وانحنِ بجذعك للأمام مع إبقاء الظهر مسطحاً تماماً.",
      "ادفع بالورك للأمام للعودة بانتصاب."
    ],
    "tips": [
      "الانثناء يكون من مفصل الورك وليس من الظهر."
    ],
    "tags": [
      "الظهر",
      "الساقين",
      "المؤخرة",
      "تعلم التكنيك",
      "مبتدئ"
    ],
    "muscleGroup": "الجزء السفلي والفخذين",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/47-Hip%20Hinge.mp4",
    "mp4Url": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/47-Hip%20Hinge.mp4",
    "imageUrl": ""
  },
  "hollow_body_hold": {
    "id": "hollow_body_hold",
    "nameAr": "وضعية ثبات الجسم المجوف (هولو بودي)",
    "nameEn": "Hollow Body Hold",
    "category": "البطن والكرش",
    "bodyPart": "البطن والكور بالكامل",
    "targetMuscle": "عضلات البطن العميقة والمستقيمة",
    "secondaryMuscles": [
      "مُثنيات الورك",
      "الفخذ الأمامي"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "من أقوى تمارين الثبات لعصر كافة ألياف البطن وبناء كور صلب كالحديد.",
    "duration": 60,
    "caloriesPerMin": 8,
    "caloriesApprox": 40,
    "animationType": "plank",
    "steps": [
      "استلقِ على ظهرك وافرد ذراعيك فوق رأسك وساقيك للأمام.",
      "ارفع كتفيك وساقيك بضعة سنتيمترات عن الأرض ليتخذ جسمك شكل القوس المجوف.",
      "اثبت في هذه الوضعية مع تثبيت أسفل الظهر بالأرض."
    ],
    "tips": [
      "إن وجدتها صعبة ثنِ الركبتين قليلاً نحو الصدر."
    ],
    "tags": [
      "البطن",
      "الكرش",
      "شد الجسم",
      "بناء العضلات",
      "متقدم"
    ],
    "muscleGroup": "عضلات البطن والخصر",
    "difficulty": "متقدم",
    "videoUrl": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/48-Hollow%20Body%20Hold.mp4",
    "mp4Url": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/48-Hollow%20Body%20Hold.mp4",
    "imageUrl": ""
  },
  "incline_diamond_pushup": {
    "id": "incline_diamond_pushup",
    "nameAr": "تمرين ضغط الماس المنحدر على بنش",
    "nameEn": "Incline Diamond Pushup",
    "category": "الذراعين",
    "bodyPart": "الذراعين والصدر السفلي",
    "targetMuscle": "عضلة الترايسبس والصدر",
    "secondaryMuscles": [
      "الأكتاف"
    ],
    "equipment": "بنش / مقعد",
    "description": "نسخة أسهل قليلاً من ضغط الماس باستخدام حافة بنش أو طاولة للتركيز على الذراعين.",
    "duration": 45,
    "caloriesPerMin": 7,
    "caloriesApprox": 35,
    "animationType": "plank",
    "steps": [
      "ضع يديك بوضعية ألماسة على بنش مرتفع.",
      "اخفض صدرك نحو البنش ببطء.",
      "ادفع للخلف بقوة مع شد الذراعين."
    ],
    "tips": [
      "حافظ على ثبات الجذع واستقامة الظهر."
    ],
    "tags": [
      "الذراعين",
      "الصدر",
      "شد الجسم",
      "بنش / مقعد",
      "متوسط"
    ],
    "muscleGroup": "الجزء العلوي والذراعين",
    "difficulty": "متوسط",
    "videoUrl": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/49-Incline%20Diamond%20Pushup.mp4",
    "mp4Url": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/49-Incline%20Diamond%20Pushup.mp4",
    "imageUrl": ""
  },
  "inner_thigh_pulse": {
    "id": "inner_thigh_pulse",
    "nameAr": "نبضات الفخذ الداخلي لشد الترهلات",
    "nameEn": "Inner Thigh Pulse",
    "category": "الساقين",
    "bodyPart": "الفخذ الداخلي",
    "targetMuscle": "العضلات الضامة للفخذ (Inner Thighs)",
    "secondaryMuscles": [
      "عضلات الحوض"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين ممتاز ومستهدف للتخلص من ترهلات الفخذ الداخلي وشد المنطقة.",
    "duration": 45,
    "caloriesPerMin": 5,
    "caloriesApprox": 25,
    "animationType": "squats",
    "steps": [
      "استلقِ على جانبك مع وضع الساق العلوية مطوية أمامك.",
      "ارفع الساق السفلية المفرودة لأعلى ولأسفل بحركات نبضية قصيرة متتابعة.",
      "كرر للجانب الآخر."
    ],
    "tips": [
      "حافظ على استقامة الساق المرفوعة طوال النبضات."
    ],
    "tags": [
      "الساقين",
      "شد الجسم",
      "تخسيس",
      "بدون معدات",
      "مبتدئ"
    ],
    "muscleGroup": "الجزء السفلي والفخذين",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/50-Inner%20Thigh%20Pulse.mp4",
    "mp4Url": "https://pub-23b284ea855b4820a78e476ee763b34d.r2.dev/app-videos/50-Inner%20Thigh%20Pulse.mp4",
    "imageUrl": ""
  },
  "jump_rope": {
    "id": "jump_rope",
    "nameAr": "تمرين نط الحبل (أو القفز التخيلي)",
    "nameEn": "Jump Rope",
    "category": "الكارديو",
    "bodyPart": "كامل الجسم",
    "targetMuscle": "عضلات الساقين والقلب والأذرع",
    "secondaryMuscles": [
      "ربلة الساق",
      "الكور"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "أحد أقوى تمارين الكارديو الشاملة لحرق الدهون وتنسيق قوام الجسم واللياقة.",
    "duration": 60,
    "caloriesPerMin": 12,
    "caloriesApprox": 60,
    "animationType": "jumping-jacks",
    "steps": [
      "تخيل أنك تمسك بحبل قفز أو امسك بحبل حقيقي.",
      "ادور معصميك وافقز بمرونة أعلى الأرض ببضعة سنتيمترات.",
      "حافظ على القفز المتناسق على أمشاط القدمين."
    ],
    "tips": [
      "حافظ على انثناء بسيط جداً في الركبتين لمنع الصدمات."
    ],
    "tags": [
      "الكارديو",
      "حرق الدهون",
      "تخسيس",
      "شد الجسم",
      "متوسط"
    ],
    "muscleGroup": "كامل الجسم",
    "difficulty": "متوسط",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/51-Jump%20Rope.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/51-Jump%20Rope.mp4",
    "imageUrl": ""
  },
  "jump_squat": {
    "id": "jump_squat",
    "nameAr": "تمرين قرفصاء القفز المتفجر (جامب سكوات)",
    "nameEn": "Jump Squat",
    "category": "الكارديو",
    "bodyPart": "الساقين والمؤخرة",
    "targetMuscle": "العضلات الرباعية والأرداف",
    "secondaryMuscles": [
      "عضلات الساق الخلفية",
      "القلب"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "دمج القرفصاء مع القفز العمودي لتفجير عضلات الساقين وحرق السعرات بكثافة.",
    "duration": 60,
    "caloriesPerMin": 11,
    "caloriesApprox": 55,
    "animationType": "squats",
    "steps": [
      "انزل في وضعية السكوات الكلاسيكية.",
      "ادفع بالأرض بقوة وافقز لأعلى قدر مستطاع في الهواء.",
      "اهبط بمرونة مباشرة بوضعية السكوات وكرر."
    ],
    "tips": [
      "الهبوط يجب أن يكون سلس وناعم لحماية مفصل الركبة."
    ],
    "tags": [
      "الكارديو",
      "حرق الدهون",
      "الساقين",
      "المؤخرة",
      "تخسيس",
      "متقدم"
    ],
    "muscleGroup": "كامل الجسم",
    "difficulty": "متقدم",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/52-Jump%20Squat.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/52-Jump%20Squat.mp4",
    "imageUrl": ""
  },
  "jumping_jacks": {
    "id": "jumping_jacks",
    "nameAr": "تمرين القفز مع فتح وإغلاق الذراعين (جامبينج جاكس)",
    "nameEn": "Jumping Jacks",
    "category": "الإحماء",
    "bodyPart": "كامل الجسم",
    "targetMuscle": "عضلات الساقين والأكتاف والقلب",
    "secondaryMuscles": [
      "الكور"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "التمرين الإحمائي الأبرز لرفع حرارة الجسم وضخ الدم في كافة العضلات.",
    "duration": 30,
    "caloriesPerMin": 9,
    "caloriesApprox": 45,
    "animationType": "jumping-jacks",
    "steps": [
      "قف بانتصاب مع إغلاق القدمين بجانب بعضهما واليدين بجانب الجسم.",
      "اقفز وافتح قدميك جانباً وفي نفس الوقت ارفع يديك لقتياعهما فوق رأسك.",
      "عد فوراً بفضة ثانية لوضع الاستعداد وكرر بانتظام."
    ],
    "tips": [
      "حافظ على الهبوط بمرونة على أمشاط القدمين."
    ],
    "tags": [
      "إحماء",
      "الكارديو",
      "حرق الدهون",
      "تخسيس",
      "بدون معدات",
      "مبتدئ"
    ],
    "muscleGroup": "كامل الجسم",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/53-Jumping%20Jacks.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/53-Jumping%20Jacks.mp4",
    "imageUrl": ""
  },
  "knee_back_stretch": {
    "id": "knee_back_stretch",
    "nameAr": "إطالة سحب الركبة للخلف للفخذ",
    "nameEn": "Knee Back Stretch",
    "category": "الإطالات والاستشفاء",
    "bodyPart": "الساقين والفخذ",
    "targetMuscle": "عضلة الفخذ الأمامية (Quadriceps)",
    "secondaryMuscles": [
      "مُثنيات الورك"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "إطالة ممتازة للفخذ الأمامي والورك لتخفيف الشد الناتج عن التمارين والسير.",
    "duration": 30,
    "caloriesPerMin": 3,
    "caloriesApprox": 15,
    "animationType": "cobra-stretch",
    "steps": [
      "قف واستند على حائط للتوازن.",
      "امسك قدمك من الخلف بيديك واسحب الكعب نحو المؤخرة.",
      "حافظ على توازي الركبتين واستقامة القامة."
    ],
    "tips": [
      "لا تقوس ظهرك أثناء سحب القدم."
    ],
    "tags": [
      "إطالة",
      "الساقين",
      "استشفاء",
      "بدون معدات",
      "مبتدئ"
    ],
    "muscleGroup": "الإطالات والاستشفاء",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/54-Knee%20Back%20Stretch.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/54-Knee%20Back%20Stretch.mp4",
    "imageUrl": ""
  },
  "knee_chest_hug": {
    "id": "knee_chest_hug",
    "nameAr": "تمرين ضم الركبة للصدر لإطالة الظهر",
    "nameEn": "Knee Chest Hug",
    "category": "الإطالات والاستشفاء",
    "bodyPart": "أسفل الظهر والحوض",
    "targetMuscle": "عضلات أسفل الظهر والأرداف",
    "secondaryMuscles": [
      "مُثنيات الورك"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين إطالة مريح يزيل الشد عن أسفل الظهر والحوض ويعزز الاسترخاء.",
    "duration": 30,
    "caloriesPerMin": 3,
    "caloriesApprox": 15,
    "animationType": "cobra-stretch",
    "steps": [
      "استلقِ على ظهرك وافرد ساقيك.",
      "ارفع ركبة واحدة واسحبها بكتفيك ويديك ببطء نحو صدرك واحضنها.",
      "اثبت لـ 20 ثانية ثم كرر بالساق الأخرى."
    ],
    "tips": [
      "حافظ على الرأس والرقبة مستقرين على الأرض."
    ],
    "tags": [
      "إطالة",
      "الظهر",
      "استشفاء",
      "بدون معدات",
      "مبتدئ"
    ],
    "muscleGroup": "الإطالات والاستشفاء",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/55-Knee%20Chest%20Hug.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/55-Knee%20Chest%20Hug.mp4",
    "imageUrl": ""
  },
  "knee_kicks": {
    "id": "knee_kicks",
    "nameAr": "تمرين ركلات الركبة الأمامية",
    "nameEn": "Knee Kicks",
    "category": "الكارديو",
    "bodyPart": "البطن والساقين",
    "targetMuscle": "عضلات البطن السفلية ومُثنيات الورك",
    "secondaryMuscles": [
      "الفخذ الأمامي"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "ركلات حركة ديناميكية لتنشيط عضلات البطن السفلي وحرق الدهون وتحسين المرونة.",
    "duration": 30,
    "caloriesPerMin": 7,
    "caloriesApprox": 35,
    "animationType": "jumping-jacks",
    "steps": [
      "قف بانتصاب واضم يديك أمام صدرك.",
      "ارفع الركبة للأعلى ثم افرد الساق للركل للأمام بأسلوب متناسق ومرن.",
      "كرر التبديل بين الساقين."
    ],
    "tips": [
      "حافظ على شد عضلات البطن للتحكم بالحركة."
    ],
    "tags": [
      "البطن",
      "الكرش",
      "الكارديو",
      "بدون معدات",
      "مبتدئ"
    ],
    "muscleGroup": "كامل الجسم",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/56-Knee%20Kicks.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/56-Knee%20Kicks.mp4",
    "imageUrl": ""
  },
  "knee_push_up": {
    "id": "knee_push_up",
    "nameAr": "تمرين الضغط على الركب (للمبتدئين)",
    "nameEn": "Knee Push Up",
    "category": "الصدر",
    "bodyPart": "الجزء العلوي والذراعين",
    "targetMuscle": "عضلات الصدر (Pectorals)",
    "secondaryMuscles": [
      "الترايسبس",
      "الأكتاف الأمامية"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "النسخة التمهيدية الأفضل لتمرين الضغط لبناء قوة الجزء العلوي بثبات وأمان.",
    "duration": 30,
    "caloriesPerMin": 6,
    "caloriesApprox": 30,
    "animationType": "plank",
    "steps": [
      "ضع يديك وركبتيك على الأرض مع إبقاء خط الجسم من الرأس للركب مستقيماً.",
      "اخفض صدرك نحو الأرض وثنِ الكوعين لزاوية 45 درجة.",
      "ادفع الأرض بيديك للعودة للأعلى."
    ],
    "tips": [
      "تجنب إسقاط الحوض للأسفل."
    ],
    "tags": [
      "الصدر",
      "الذراعين",
      "شد الجسم",
      "بدون معدات",
      "مبتدئ"
    ],
    "muscleGroup": "الجزء العلوي والذراعين",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/57-Knee%20Push%20Up.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/57-Knee%20Push%20Up.mp4",
    "imageUrl": ""
  },
  "knee_side_band": {
    "id": "knee_side_band",
    "nameAr": "رفع الركبة الجانبي بشريط المقاومة",
    "nameEn": "Knee Side Band",
    "category": "المؤخرة",
    "bodyPart": "الأرداف والخصر",
    "targetMuscle": "عضلات المؤخرة الجانبية (Gluteus Medius)",
    "secondaryMuscles": [
      "الخصر"
    ],
    "equipment": "شريط مقاومة (باند)",
    "description": "تمرين تفعيل جانبي ممتاز لتشغيل المؤخرة وملء الخفسات ونحت الورك.",
    "duration": 45,
    "caloriesPerMin": 7,
    "caloriesApprox": 35,
    "animationType": "squats",
    "steps": [
      "ضع شريط المقاومة فوق الركبتين.",
      "قف أو اجثُ وادفع الركبة جانباً ضد مقاومة الشريط.",
      "اعصر المؤخرة الجانبية واعد الساق ببطء."
    ],
    "tips": [
      "حافظ على ثبات الحوض وعدم ميلان الجسم."
    ],
    "tags": [
      "المؤخرة",
      "الساقين",
      "شريط مقاومة",
      "شد الجسم",
      "متوسط"
    ],
    "muscleGroup": "الجزء السفلي والفخذين",
    "difficulty": "متوسط",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/58-Knee%20Side%20Band.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/58-Knee%20Side%20Band.mp4",
    "imageUrl": ""
  },
  "leg_crunch": {
    "id": "leg_crunch",
    "nameAr": "طحن البطن مع رفـع الساقين العمودي",
    "nameEn": "Leg Crunch",
    "category": "البطن والكرش",
    "bodyPart": "البطن الكلي",
    "targetMuscle": "عضلات البطن العلوي والسفلي",
    "secondaryMuscles": [
      "مُثنيات الورك"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين يجمع بين رفع الساقين والكرانش لاستهداف ألياف البطن بالكامل في نفس الوقت.",
    "duration": 45,
    "caloriesPerMin": 7,
    "caloriesApprox": 35,
    "animationType": "crunches",
    "steps": [
      "استلقِ على ظهرك وافرد ساقيك باتجاه السقف.",
      "ارفع كتفيك عن الأرض بعصر عضلات البطن محاولاً لمس أصابع قدميك.",
      "اخفض الكتفين ببطء وكرر."
    ],
    "tips": [
      "حافظ على استقامة الساقين قدر المستطاع."
    ],
    "tags": [
      "البطن",
      "الكرش",
      "تخسيس",
      "شد الجسم",
      "متوسط"
    ],
    "muscleGroup": "عضلات البطن والخصر",
    "difficulty": "متوسط",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/59-Leg%20Crunch.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/59-Leg%20Crunch.mp4",
    "imageUrl": ""
  },
  "leg_kicks": {
    "id": "leg_kicks",
    "nameAr": "ركلات الساقين الخلفية والجانبية",
    "nameEn": "Leg Kicks",
    "category": "المؤخرة",
    "bodyPart": "الأرداف والساقين",
    "targetMuscle": "عضلات الأرداف (Glutes)",
    "secondaryMuscles": [
      "الفخذ الخلفي"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين حركي لشد وتقوية عضلات المؤخرة والفخذ وتنشيط الجزء السفلي.",
    "duration": 45,
    "caloriesPerMin": 6,
    "caloriesApprox": 30,
    "animationType": "squats",
    "steps": [
      "استند على حائط أو اركب على أطرافك الأربعة.",
      "اركل بساقك للخلف ببطء مع عصر عضلات المؤخرة.",
      "اعد الساق ببطء للبدء وكرر للجانبين."
    ],
    "tips": [
      "لا تقوس الظهر أثناء الركل للخلف."
    ],
    "tags": [
      "المؤخرة",
      "الساقين",
      "شد الجسم",
      "بدون معدات",
      "مبتدئ"
    ],
    "muscleGroup": "الجزء السفلي والفخذين",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/60-Leg%20Kicks.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/60-Leg%20Kicks.mp4",
    "imageUrl": ""
  },
  "leg_lifts": {
    "id": "leg_lifts",
    "nameAr": "تمرين رفع الساقين المستقيمة للبطن السفلي",
    "nameEn": "Leg Lifts",
    "category": "البطن والكرش",
    "bodyPart": "البطن السفلي",
    "targetMuscle": "عضلات البطن السفلية (Lower Abs)",
    "secondaryMuscles": [
      "مُثنيات الورك"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "التمرين الذهبي المسئول عن شد أسفل البطن والتخلص من الكرش السفلي بفعالية.",
    "duration": 45,
    "caloriesPerMin": 7,
    "caloriesApprox": 35,
    "animationType": "leg-raises",
    "steps": [
      "استلقِ على ظهرك وضع يديك تحت حوضك للاسناد.",
      "ارفع ساقيك المفرودتين لأعلى حتى تشكلا زاوية 90 درجة مع الجسم.",
      "اخفضهما ببطء شديد دون أن تلمس الكعبان الأرض."
    ],
    "tips": [
      "احرص على إبقاء أسفل الظهر ملاصقاً تماماً للأرض."
    ],
    "tags": [
      "البطن",
      "الكرش",
      "حرق الدهون",
      "تخسيس",
      "شد الجسم",
      "متوسط"
    ],
    "muscleGroup": "عضلات البطن والخصر",
    "difficulty": "متوسط",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/61-Leg%20Lifts.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/61-Leg%20Lifts.mp4",
    "imageUrl": ""
  },
  "leg_pull_in": {
    "id": "leg_pull_in",
    "nameAr": "سحب الساقين للصدر لشد الكرش",
    "nameEn": "Leg Pull In",
    "category": "البطن والكرش",
    "bodyPart": "البطن الكلي والسفلي",
    "targetMuscle": "عضلات البطن السفلية والجذع",
    "secondaryMuscles": [
      "مُثنيات الورك"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين مريح وفعال جداً لضم الركبتين نحو الصدر وعصر البطن لتسطيح المعدة.",
    "duration": 45,
    "caloriesPerMin": 6,
    "caloriesApprox": 30,
    "animationType": "crunches",
    "steps": [
      "اجلس على الأرض مع إسناد يديك خلفك والانحناء للجذع للخلف قليلاً.",
      "افرد ساقيك للأمام ثم اسحبهما بالثني نحو صدرك بعصر البطن.",
      "اعد فرد الساقين ببطء وكرر."
    ],
    "tips": [
      "حافظ على التوازن وثبات الجزء العلوي من الجسم."
    ],
    "tags": [
      "البطن",
      "الكرش",
      "تخسيس",
      "شد الجسم",
      "مبتدئ"
    ],
    "muscleGroup": "عضلات البطن والخصر",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/62-Leg%20Pull%20In.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/62-Leg%20Pull%20In.mp4",
    "imageUrl": ""
  },
  "leg_up_to_sides": {
    "id": "leg_up_to_sides",
    "nameAr": "رفع الساقين وتوسيعهما للجانبين",
    "nameEn": "Leg Up to Sides",
    "category": "البطن والكرش",
    "bodyPart": "البطن والفخذ الداخلي",
    "targetMuscle": "عضلات البطن السفلية والعضلات الضامة",
    "secondaryMuscles": [
      "مُثنيات الورك"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين مدمج يستهدف البطن السفلي ويفرد الفخذ الداخلي لنحت الساقين والبطن.",
    "duration": 45,
    "caloriesPerMin": 7,
    "caloriesApprox": 35,
    "animationType": "leg-raises",
    "steps": [
      "استلقِ على ظهرك وارفع ساقيك المفرودتين للسقف.",
      "افتح الساقين للخارج جانباً ببطء ثم اجمعهما في المنتصف وافضهما قليلاً.",
      "كرر الحركة بانتظام."
    ],
    "tips": [
      "السيطرة والبطء أثناء الحركة يمنح نتائج أفضل."
    ],
    "tags": [
      "البطن",
      "الكرش",
      "الساقين",
      "تخسيس",
      "متوسط"
    ],
    "muscleGroup": "عضلات البطن والخصر",
    "difficulty": "متوسط",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/63-Leg%20Up%20to%20Sides.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/63-Leg%20Up%20to%20Sides.mp4",
    "imageUrl": ""
  },
  "lying_reverse_crunch_up": {
    "id": "lying_reverse_crunch_up",
    "nameAr": "طحن البطن العكسي من الاستلقاء",
    "nameEn": "Lying Reverse Crunch Up",
    "category": "البطن والكرش",
    "bodyPart": "البطن السفلي",
    "targetMuscle": "عضلات البطن السفلية",
    "secondaryMuscles": [
      "الكور"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين يعتمد على رفع الحوض عن الأرض بعصر عضلات البطن السفلي لتحديد البطن.",
    "duration": 45,
    "caloriesPerMin": 7,
    "caloriesApprox": 35,
    "animationType": "crunches",
    "steps": [
      "استلقِ على ظهرك واثنِ الركبتين بزاوية 90 درجة.",
      "ارفع حوضك وأسفل ظهرك عن الأرض متجهاً بالركبتين نحو صدرك.",
      "عد ببطء للأسفل وكرر التكرارات."
    ],
    "tips": [
      "لا تستخدم النتوء أو المرجحة، استخدم القوة البطنية."
    ],
    "tags": [
      "البطن",
      "الكرش",
      "تخسيس",
      "شد الجسم",
      "متوسط"
    ],
    "muscleGroup": "عضلات البطن والخصر",
    "difficulty": "متوسط",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/64-Lying%20Reverse%20Crunch%20Up.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/64-Lying%20Reverse%20Crunch%20Up.mp4",
    "imageUrl": ""
  },
  "mountain_climber": {
    "id": "mountain_climber",
    "nameAr": "تمرين تسلق الجبل (ماونتن كلايمبر)",
    "nameEn": "Mountain Climber",
    "category": "الكارديو",
    "bodyPart": "كامل الجسم والبطن",
    "targetMuscle": "عضلات البطن والقلب والأكتاف",
    "secondaryMuscles": [
      "الفخذين",
      "الترايسبس"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "ديناميت حرق الدهون الأقوى الذي يجمع بين قوة البلانك وحرق الكارديو المكثف.",
    "duration": 60,
    "caloriesPerMin": 11,
    "caloriesApprox": 55,
    "animationType": "plank",
    "steps": [
      "ابدأ بوضعية الضغط مرتكزاً على يديك وأصابع قدميك.",
      "اسحب ركبتك اليمنى نحو صدرك بسرعة ثم عد بها واسحب الركبة اليسرى.",
      "استمر بالتبديل السريع كأنك تركض على الأرض."
    ],
    "tips": [
      "حافظ على بقاء الحوض منخفضاً وثبات الأكتاف فوق اليدين."
    ],
    "tags": [
      "الكارديو",
      "البطن",
      "الكرش",
      "حرق الدهون",
      "تخسيس",
      "متوسط"
    ],
    "muscleGroup": "كامل الجسم",
    "difficulty": "متوسط",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/65-Mountain%20Climber.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/65-Mountain%20Climber.mp4",
    "imageUrl": ""
  },
  "oblique_crunch": {
    "id": "oblique_crunch",
    "nameAr": "طحن البطن الجانبي لنحت الخصر",
    "nameEn": "Oblique Crunch",
    "category": "البطن والكرش",
    "bodyPart": "الخصر والجوانب",
    "targetMuscle": "عضلات البطن الجانبية (Obliques)",
    "secondaryMuscles": [
      "البطن العلوي"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين يستهدف إزالة الدهون الجانبية وتحديد انحناءات الخصر بأسلوب مباشر.",
    "duration": 30,
    "caloriesPerMin": 6,
    "caloriesApprox": 30,
    "animationType": "crunches",
    "steps": [
      "استلقِ على ظهرك واثنِ ركبتيك واسقطهما نحو الجانب الأيمن على الأرض.",
      "ضع يديك خلف رأسك وارفع كتفيك لأعلى بعصر الخصر.",
      "كرر للتكرارات المطلوبة ثم اعكس الساقين للجانب الآخر."
    ],
    "tips": [
      "ركز على عصر الجانب العلوي للخصر عند الارتفاع."
    ],
    "tags": [
      "البطن",
      "الكرش",
      "الخصر",
      "تخسيس",
      "شد الجسم",
      "مبتدئ"
    ],
    "muscleGroup": "عضلات البطن والخصر",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/66-Oblique%20Crunch.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/66-Oblique%20Crunch.mp4",
    "imageUrl": ""
  },
  "plank": {
    "id": "plank",
    "nameAr": "تمرين ثبات البلانك الكلاسيكي",
    "nameEn": "Plank",
    "category": "البطن والكرش",
    "bodyPart": "الجذع والكور بالكامل",
    "targetMuscle": "عضلات الكور والبطن العميقة (Core)",
    "secondaryMuscles": [
      "الأكتاف",
      "الأرداف",
      "الظهر"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "التمرين الأسطوري لبناء القوة المحورية وتسطيح البطن وحماية الظهر من الآلام.",
    "duration": 45,
    "caloriesPerMin": 6,
    "caloriesApprox": 30,
    "animationType": "plank",
    "steps": [
      "ارتكز على الساعدين وأطراف أصابع القدمين على الأرض.",
      "حافظ على خط مستقيم كالمسطرة من الرأس وحتى الكعبين.",
      "اشدد عضلات البطن والأرداف واثبت لـ 30-60 ثانية."
    ],
    "tips": [
      "تجنب رفع المؤخرة لأعلى أو إسقاط الحوض لأسفل."
    ],
    "tags": [
      "البطن",
      "الكرش",
      "شد الجسم",
      "توازن",
      "بدون معدات",
      "مبتدئ"
    ],
    "muscleGroup": "عضلات البطن والخصر",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/67-Plank.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/67-Plank.mp4",
    "imageUrl": ""
  },
  "plank_hip_rotation": {
    "id": "plank_hip_rotation",
    "nameAr": "بلانك مع تدوير وتناوب الورك",
    "nameEn": "Plank Hip Rotation",
    "category": "البطن والكرش",
    "bodyPart": "الخصر والبطن",
    "targetMuscle": "عضلات الخصر والبطن العميقة",
    "secondaryMuscles": [
      "الأكتاف",
      "الظهر"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تعديل ديناميكي للبلانك يضيف التدوير لنحت الخصر وإذابة الدهون الجانبية.",
    "duration": 45,
    "caloriesPerMin": 8,
    "caloriesApprox": 40,
    "animationType": "plank",
    "steps": [
      "ابدأ بوضعية البلانك على الساعدين.",
      "قم بدوران الحوض والورك ببطء ليلبس الجانب الأيمن كاد يلمس الأرض.",
      "عد للمنتصف وادور نحو الجانب الأيسر بالتناوب."
    ],
    "tips": [
      "حافظ على الساعدين مثبتين بصلابة على الأرض."
    ],
    "tags": [
      "البطن",
      "الكرش",
      "الخصر",
      "شد الجسم",
      "تخسيس",
      "متوسط"
    ],
    "muscleGroup": "عضلات البطن والخصر",
    "difficulty": "متوسط",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/68-Plank%20Hip%20Rotation.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/68-Plank%20Hip%20Rotation.mp4",
    "imageUrl": ""
  },
  "plank_kickback": {
    "id": "plank_kickback",
    "nameAr": "تمرين البلانك مع ركلة الساق الخلفية",
    "nameEn": "Plank Kickback",
    "category": "المؤخرة",
    "bodyPart": "الأرداف والبطن",
    "targetMuscle": "عضلات الأرداف والكور",
    "secondaryMuscles": [
      "الفخذ الخلفي",
      "الأكتاف"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تجميع ذكي بين ثبات الكور وتقوية المؤخرة برفع الساق للخلف في وضعية البلانك.",
    "duration": 45,
    "caloriesPerMin": 8,
    "caloriesApprox": 40,
    "animationType": "plank",
    "steps": [
      "اصعد لوضعية البلانك على اليدين المفرودتين.",
      "ارفع ساقك اليمنى المفرودة للخلف والأعلى بعصر المؤخرة.",
      "اخفضها وكرر بالساق اليسرى بالتجانس."
    ],
    "tips": [
      "لا تقوس الظهر عند رفع الساق."
    ],
    "tags": [
      "المؤخرة",
      "البطن",
      "الكرش",
      "شد الجسم",
      "متوسط"
    ],
    "muscleGroup": "عضلات البطن والخصر",
    "difficulty": "متوسط",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/69-Plank%20Kickback.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/69-Plank%20Kickback.mp4",
    "imageUrl": ""
  },
  "plank_walk_out": {
    "id": "plank_walk_out",
    "nameAr": "تمرين المشي باليدين لثبات الجسم (المشية العنكبوتية)",
    "nameEn": "Plank Walk Out",
    "category": "الجسم بالكامل",
    "bodyPart": "كامل الجسم والكور",
    "targetMuscle": "عضلات البطن والأكتاف والهمسترينج",
    "secondaryMuscles": [
      "الصدر",
      "الذراعين"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين وظيفي رائع يزيد المرونة ويقوي كافة عضلات والجذع والجسم.",
    "duration": 45,
    "caloriesPerMin": 9,
    "caloriesApprox": 45,
    "animationType": "plank",
    "steps": [
      "قف بانتصاب واثنِ جذعك للأمام حتى تلمس كفاك الأرض.",
      "امشِ بيديك خطوة بخطوة للأمام حتى تصل لوضعية البلانك الكاملة.",
      "توقف لحظة ثم امشِ بيديك للخلف للعودة للوقوف."
    ],
    "tips": [
      " حافظ على استقامة الساقين قدر المستطاع أثناء المشي."
    ],
    "tags": [
      "الجسم بالكامل",
      "البطن",
      "الكرش",
      "مرونة",
      "شد الجسم",
      "متوسط"
    ],
    "muscleGroup": "كامل الجسم",
    "difficulty": "متوسط",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/70-Plank%20Walk%20Out.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/70-Plank%20Walk%20Out.mp4",
    "imageUrl": ""
  },
  "plank_with_jumps": {
    "id": "plank_with_jumps",
    "nameAr": "بلانك القفز بفتح وإغلاق القدمين",
    "nameEn": "Plank with Jumps",
    "category": "الكارديو",
    "bodyPart": "البطن والكور والجسم",
    "targetMuscle": "عضلات البطن والقلب والأكتاف",
    "secondaryMuscles": [
      "الفخذين",
      "الأرداف"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين يجمع بين الثبات العالي للبلانك والقفز الديناميكي لرفع حرق الدهون لقمته.",
    "duration": 45,
    "caloriesPerMin": 10,
    "caloriesApprox": 50,
    "animationType": "plank",
    "steps": [
      "ابدأ بوضعية البلانك مرتكزاً على اليدين المفرودتين.",
      "اقفز وافتح قدميك جانباً ثم اقفز واجمعهما ثانية بأسلوب متواصل سريع.",
      "حافظ على ثبات الأكتاف والجذع."
    ],
    "tips": [
      "لا تدع الحوض يتذبذب لأعلى ولأسفل أثناء القفز."
    ],
    "tags": [
      "الكارديو",
      "البطن",
      "الكرش",
      "حرق الدهون",
      "تخسيس",
      "متوسط"
    ],
    "muscleGroup": "كامل الجسم",
    "difficulty": "متوسط",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/71-Plank%20with%20Jumps.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/71-Plank%20with%20Jumps.mp4",
    "imageUrl": ""
  },
  "push_ups_with_feet_elevated_narrow": {
    "id": "push_ups_with_feet_elevated_narrow",
    "nameAr": "ضغط بقبضة ضيقة مع رفع القدمين على بنش",
    "nameEn": "Push Ups with Feet Elevated, Narrow",
    "category": "الصدر",
    "bodyPart": "الصدر العلوي والترايسبس",
    "targetMuscle": "عضلة الترايسبس والصدر العلوي",
    "secondaryMuscles": [
      "الأكتاف الأمامية"
    ],
    "equipment": "بنش / مقعد",
    "description": "تمرين ضغط احترافي ومكثف جداً للتركيز الصارم على الترايسبس والصدر العلوي.",
    "duration": 45,
    "caloriesPerMin": 10,
    "caloriesApprox": 50,
    "animationType": "plank",
    "steps": [
      "ضع قدميك فوق بنش مرتفع ويديك على الأرض بقبضة ضيقة.",
      "اخفض جسمك حتى يقترب صدرك من الأرض.",
      "ادفع الأرض بقوة للعودة لوضع البداية."
    ],
    "tips": [
      "يتطلب قوة عالية في الترايسبس والكور."
    ],
    "tags": [
      "الصدر",
      "الذراعين",
      "بناء العضلات",
      "شد الجسم",
      "احترافي"
    ],
    "muscleGroup": "الجزء العلوي والذراعين",
    "difficulty": "احترافي",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/72-Push%20Ups%20with%20Feet%20Elevated%2C%20Narrow.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/72-Push%20Ups%20with%20Feet%20Elevated%2C%20Narrow.mp4",
    "imageUrl": ""
  },
  "quad_stretch": {
    "id": "quad_stretch",
    "nameAr": "إطالة عضلة الفخذ الأمامية (الرباعية)",
    "nameEn": "Quad Stretch",
    "category": "الإطالات والاستشفاء",
    "bodyPart": "الفخذ الأمامي",
    "targetMuscle": "عضلة الفخذ الأمامية (Quadriceps)",
    "secondaryMuscles": [
      "مُثنيات الورك",
      "الكاحل"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "إطالة أساسية جداً بعد تمارين السكوات والطعن لإعادة المرونة للفخذ الأمامي.",
    "duration": 30,
    "caloriesPerMin": 3,
    "caloriesApprox": 15,
    "animationType": "cobra-stretch",
    "steps": [
      "قف على ساق واحدة واسند بيدك على حائط لثباتك.",
      "اثنِ الساق الأخرى للخلف وامسك القدم بيديك واسحبها ببطء نحو الأرداف.",
      "اثبت لـ 20-30 ثانية لكل ساق."
    ],
    "tips": [
      "حافظ على بقاء الركبتين متجاورتين."
    ],
    "tags": [
      "إطالة",
      "الساقين",
      "استشفاء",
      "بدون معدات",
      "مبتدئ"
    ],
    "muscleGroup": "الإطالات والاستشفاء",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/73-Quad%20Stretch.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/73-Quad%20Stretch.mp4",
    "imageUrl": ""
  },
  "reverse_lunge": {
    "id": "reverse_lunge",
    "nameAr": "تمرين الطعن الخلفي (ريفرس لانج)",
    "nameEn": "Reverse Lunge",
    "category": "الساقين",
    "bodyPart": "الساقين والمؤخرة",
    "targetMuscle": "عضلات الفخذ والأرداف (Quads & Glutes)",
    "secondaryMuscles": [
      "الفخذ الخلفي",
      "الكور"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين طعن آمن جداً على الركبة يركز على شد الفخذين وتدوير وتنسيق المؤخرة.",
    "duration": 45,
    "caloriesPerMin": 7,
    "caloriesApprox": 35,
    "animationType": "squats",
    "steps": [
      "قف بانتصاب واخطُ خطوة واسعة للخلف باحدى الساقين.",
      "اخفض حوضك حتى تشكل الركبتان زاوية 90 درجة.",
      "ادفع بصلابة بالقدم الأمامية للعودة بانتصاب وكرر."
    ],
    "tips": [
      "حافظ على بقاء الوزن على كعب القدم الأمامية."
    ],
    "tags": [
      "الساقين",
      "المؤخرة",
      "شد الجسم",
      "تخسيس",
      "مبتدئ"
    ],
    "muscleGroup": "الجزء السفلي والفخذين",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/74-Reverse%20Lunge.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/74-Reverse%20Lunge.mp4",
    "imageUrl": ""
  },
  "running_on_treadmill": {
    "id": "running_on_treadmill",
    "nameAr": "الركض على السير الرياضي (تريدميل)",
    "nameEn": "Running on Treadmill",
    "category": "الكارديو",
    "bodyPart": "كامل الجسم",
    "targetMuscle": "عضلات الساقين والقلب والأوعية",
    "secondaryMuscles": [
      "الكور",
      "الأرداف"
    ],
    "equipment": "سير رياضي",
    "description": "تمرين الكارديو التقليدي الأقوى لرفع اللياقة وتدمير الدهون المتراكمة بالجسم.",
    "duration": 45,
    "caloriesPerMin": 12,
    "caloriesApprox": 60,
    "animationType": "jumping-jacks",
    "steps": [
      "اصعد على السير الرياضي واضبط السرعة المناسبة لمستواك.",
      "اركض بقامة منتصبة وتحريك مرن للأذرع.",
      "استمر بالركض بانتظام."
    ],
    "tips": [
      "اهبط بمرونة على منتصف القدم وتجنب الصدم بقوة."
    ],
    "tags": [
      "الكارديو",
      "حرق الدهون",
      "تخسيس",
      "سير رياضي",
      "متوسط"
    ],
    "muscleGroup": "كامل الجسم",
    "difficulty": "متوسط",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/75-Running%20on%20Treadmill.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/75-Running%20on%20Treadmill.mp4",
    "imageUrl": ""
  },
  "russian_twist": {
    "id": "russian_twist",
    "nameAr": "التوائي الروسي لشد البطن الجانبي",
    "nameEn": "Russian Twist",
    "category": "البطن والكرش",
    "bodyPart": "الخصر والبطن",
    "targetMuscle": "عضلات البطن الجانبية (Obliques)",
    "secondaryMuscles": [
      "البطن المستقيمة"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين رائع جداً ومجرب لإزالة دهون الخصر والجوانب ونحت البطن بامتياز.",
    "duration": 45,
    "caloriesPerMin": 8,
    "caloriesApprox": 40,
    "animationType": "russian-twist",
    "steps": [
      "اجلس على الأرض واثنِ ركبتيك وانحنِ بجذعك للخلف بزاوية 45 درجة.",
      "ارفع قدميك عن الأرض قليلاً وشبك يديك أمامك.",
      "ادور بجذعك ويديك يميناً ويساراً بالتجانس مع عصر الخصر."
    ],
    "tips": [
      "الدوران يكون من الصدر والجذع وليس من الذراعين فقط."
    ],
    "tags": [
      "البطن",
      "الكرش",
      "الخصر",
      "تخسيس",
      "شد الجسم",
      "متوسط"
    ],
    "muscleGroup": "عضلات البطن والخصر",
    "difficulty": "متوسط",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/76-Russian%20Twist.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/76-Russian%20Twist.mp4",
    "imageUrl": ""
  },
  "russian_twist_with_kettlebell": {
    "id": "russian_twist_with_kettlebell",
    "nameAr": "التوائي الروسي مع وزن كيتل بل",
    "nameEn": "Russian Twist with Kettlebell",
    "category": "البطن والكرش",
    "bodyPart": "الخصر والبطن",
    "targetMuscle": "عضلات البطن الجانبية والجذع",
    "secondaryMuscles": [
      "الأكتاف",
      "الذراعين"
    ],
    "equipment": "كيتل بل",
    "description": "نسخة مكثفة من التوست الروسي باستخدام وزن إضافي لنحت وتحديد عضلات البطن والخصر.",
    "duration": 60,
    "caloriesPerMin": 10,
    "caloriesApprox": 50,
    "animationType": "russian-twist",
    "steps": [
      "امسك كيتل بل بكتفيك أمام صدرك في وضعية التوست الروسي.",
      "ادور بالوزن وجذعك كاملاً نحو الجانب الأيمن ثم الأيسر ببطء وسيطرة.",
      "حافظ على توازن القدمين بالمكث."
    ],
    "tips": [
      "حافظ على السيطرة الكاملة على الوزن لمنع أي إجهاد لأسفل الظهر."
    ],
    "tags": [
      "البطن",
      "الكرش",
      "الخصر",
      "كيتل بل",
      "تخسيس",
      "متقدم"
    ],
    "muscleGroup": "عضلات البطن والخصر",
    "difficulty": "متقدم",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/77-Russian%20Twist%20with%20Kettlebell.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/77-Russian%20Twist%20with%20Kettlebell.mp4",
    "imageUrl": ""
  },
  "scalene_stretch": {
    "id": "scalene_stretch",
    "nameAr": "إطالة عضلات الرقبة والأكتاف الجانبية",
    "nameEn": "Scalene Stretch",
    "category": "الإطالات والاستشفاء",
    "bodyPart": "الرقبة والأكتاف",
    "targetMuscle": "عضلات الرقبة الجانبية (Scalenes)",
    "secondaryMuscles": [
      "أعلى الكتف"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين بسيط يزيل الشد والصداع الناتج عن التوتر وإجهاد الرقبة أمام الشاشات.",
    "duration": 30,
    "caloriesPerMin": 2,
    "caloriesApprox": 10,
    "animationType": "cobra-stretch",
    "steps": [
      "اجلس أو قف بانتصاب.",
      "أمل رأسك ببطء نحو الكتف الأيمن وضع يدك اليمنى بلطف فوق الرأس للتثبيت.",
      "استشعر الشاط اللطيف في الجانب الأيسر للرقبة واثبت 20 ثانية."
    ],
    "tips": [
      "لا تسحب رأسك بقوة، دَع ثقل اليد يقوم بالإطالة."
    ],
    "tags": [
      "إطالة",
      "الرقبة",
      "استشفاء",
      "بدون معدات",
      "مبتدئ"
    ],
    "muscleGroup": "الإطالات والاستشفاء",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/78-Scalene%20Stretch.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/78-Scalene%20Stretch.mp4",
    "imageUrl": ""
  },
  "scissor_kick": {
    "id": "scissor_kick",
    "nameAr": "تمرين مقص الساقين للبطن السفلي (سيسور كيك)",
    "nameEn": "Scissor Kick",
    "category": "البطن والكرش",
    "bodyPart": "البطن السفلي والخصر",
    "targetMuscle": "عضلات البطن السفلية",
    "secondaryMuscles": [
      "الفخذ الداخلي",
      "مُثنيات الورك"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "حركة مقص متقاطعة للساقين بالقرب من الأرض لنحت وحرق دهون الكرش السفلي.",
    "duration": 45,
    "caloriesPerMin": 8,
    "caloriesApprox": 40,
    "animationType": "leg-raises",
    "steps": [
      "استلقِ على ظهرك وارفع ساقيك المفرودتين بضعة سنتيمترات عن الأرض.",
      "قم بتبديل وتسالك الساقين فوق وتحت بعضهما بحركة المقص السريعة.",
      "استمر بانتظام لمدة 30-45 ثانية."
    ],
    "tips": [
      "ثبت أسفل ظهرك بالأرض طوال مدة الحركة."
    ],
    "tags": [
      "البطن",
      "الكرش",
      "حرق الدهون",
      "تخسيس",
      "شد الجسم",
      "متوسط"
    ],
    "muscleGroup": "عضلات البطن والخصر",
    "difficulty": "متوسط",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/79-Scissor%20Kick.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/79-Scissor%20Kick.mp4",
    "imageUrl": ""
  },
  "seated_leg_raise": {
    "id": "seated_leg_raise",
    "nameAr": "رفع الساقين من الجلوس لشد البطن",
    "nameEn": "Seated Leg Raise",
    "category": "البطن والكرش",
    "bodyPart": "البطن والمعدة",
    "targetMuscle": "عضلات البطن السفلية والعلوية",
    "secondaryMuscles": [
      "الفخذ الأمامي"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين بطن مريح يمكن أداؤه على الأرض أو الكرسي لتضييق الخصر وتسطيح البطن.",
    "duration": 30,
    "caloriesPerMin": 6,
    "caloriesApprox": 30,
    "animationType": "crunches",
    "steps": [
      "اجلس بثبات واسند كفيك خلفك.",
      "ارفع ركبتيك أو ساقيك المفرودتين لأعلى ببطء بعصر البطن.",
      "اخفضهما ببطء واعد الرفع قبل ملامسة الأرض."
    ],
    "tips": [
      "حافظ على انقباض عضلات البطن أثناء الانخفاض."
    ],
    "tags": [
      "البطن",
      "الكرش",
      "تخسيس",
      "شد الجسم",
      "مبتدئ"
    ],
    "muscleGroup": "عضلات البطن والخصر",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/80-Seated%20Leg%20Raise.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/80-Seated%20Leg%20Raise.mp4",
    "imageUrl": ""
  },
  "shoulder_stretch": {
    "id": "shoulder_stretch",
    "nameAr": "تمرين إطالة وتليين عضلات الكتف",
    "nameEn": "Shoulder Stretch",
    "category": "الإطالات والاستشفاء",
    "bodyPart": "الأكتاف",
    "targetMuscle": "عضلات الكتف (Deltoids)",
    "secondaryMuscles": [
      "أعلى الظهر"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "إطالة كلاسيكية لإرخاء عضلات الكتف بعد تمارين الجزء العلوي وتجنب الشد.",
    "duration": 30,
    "caloriesPerMin": 3,
    "caloriesApprox": 15,
    "animationType": "cobra-stretch",
    "steps": [
      "اقطع ذراعك الأيمن أمام صدرك.",
      "امسك الذراع بيدك اليسرى عند الكوع واسحبها ببطء نحو صدرك.",
      "اثبت لـ 20 ثانية ثم اعكس الذراعين."
    ],
    "tips": [
      "ابقِ كتفك منخفضاً ولا ترفعه نحو أذنك."
    ],
    "tags": [
      "إطالة",
      "الكتفين",
      "استشفاء",
      "بدون معدات",
      "مبتدئ"
    ],
    "muscleGroup": "الإطالات والاستشفاء",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/81-Shoulder%20Stretch.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/81-Shoulder%20Stretch.mp4",
    "imageUrl": ""
  },
  "side_bridge_with_leg_raise": {
    "id": "side_bridge_with_leg_raise",
    "nameAr": "الجسر الجانبي مع رفع الساق العلوي",
    "nameEn": "Side Bridge with Leg Raise",
    "category": "البطن والكرش",
    "bodyPart": "الخصر والمؤخرة الجانبية",
    "targetMuscle": "عضلات الخصر والأرداف الجانبية",
    "secondaryMuscles": [
      "الأكتاف",
      "الكور"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين قوة وتوازن جانبي يشد الجوانب ويرفع المؤخرة ويقوي وثبات الكور.",
    "duration": 60,
    "caloriesPerMin": 9,
    "caloriesApprox": 45,
    "animationType": "plank",
    "steps": [
      "ارتكز بوضعية الجسر الجانبي على ساعدك وقدمك.",
      "ارفع حوضك لأعلى ثم ارفع ساقك العلوية المفرودة باتجاه السقف.",
      "اخفض الساق ببطء وكرر ثم اعكس للجانب الآخر."
    ],
    "tips": [
      "حافظ على استقامة خط الجسم بالكامل."
    ],
    "tags": [
      "البطن",
      "الكرش",
      "الخصر",
      "المؤخرة",
      "متقدم"
    ],
    "muscleGroup": "عضلات البطن والخصر",
    "difficulty": "متقدم",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/82-Side%20Bridge%20with%20Leg%20Raise.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/82-Side%20Bridge%20with%20Leg%20Raise.mp4",
    "imageUrl": ""
  },
  "side_leg_lifts": {
    "id": "side_leg_lifts",
    "nameAr": "رفع الساقين الجانبي لشد الورك والمؤخرة",
    "nameEn": "Side Leg Lifts",
    "category": "المؤخرة",
    "bodyPart": "الورك والأرداف",
    "targetMuscle": "عضلات الورك والمؤخرة الجانبية (Abductors)",
    "secondaryMuscles": [
      "الخصر"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين رائع ونظيف لشد منطقة الجوانب وملء العضلة الجانبية للمؤخرة.",
    "duration": 30,
    "caloriesPerMin": 5,
    "caloriesApprox": 25,
    "animationType": "squats",
    "steps": [
      "استلقِ على جانبك مع استقامة الجسم.",
      "ارفع ساقك العلوية المفرودة لأعلى لزاوية 45 درجة.",
      "اخفض الساق ببطء دون أن تلمس الساق الأخرى وكرر."
    ],
    "tips": [
      "وجه أصابع القدم للأمام أثناء الرفع."
    ],
    "tags": [
      "المؤخرة",
      "الساقين",
      "شد الجسم",
      "بدون معدات",
      "مبتدئ"
    ],
    "muscleGroup": "الجزء السفلي والفخذين",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/83-Side%20Leg%20Lifts.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/83-Side%20Leg%20Lifts.mp4",
    "imageUrl": ""
  },
  "side_plank": {
    "id": "side_plank",
    "nameAr": "تمرين البلانك الجانبي للخصر",
    "nameEn": "Side Plank",
    "category": "البطن والكرش",
    "bodyPart": "الخصر والجوانب",
    "targetMuscle": "عضلات الخصر الجانبية (Obliques)",
    "secondaryMuscles": [
      "الكور",
      "الأكتاف"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "التمرين الأساسي الأشهر لإذابة الدهون الجانبية وبناء قوة وثبات للخصر.",
    "duration": 45,
    "caloriesPerMin": 7,
    "caloriesApprox": 35,
    "animationType": "plank",
    "steps": [
      "استلقِ على جانبك وارفع جسمك مرتكزاً على ساعدك وحافة قدمك الجانبية.",
      "ارفع حوضك لتشكل خطاً مستقيماً واثبت لـ 30 ثانية لكل جانب."
    ],
    "tips": [
      "حافظ على بقاء الكوع تحت الكتف تماماً."
    ],
    "tags": [
      "البطن",
      "الكرش",
      "الخصر",
      "شد الجسم",
      "تخسيس",
      "متوسط"
    ],
    "muscleGroup": "عضلات البطن والخصر",
    "difficulty": "متوسط",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/84-Side%20Plank.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/84-Side%20Plank.mp4",
    "imageUrl": ""
  },
  "side_to_side_wheeling": {
    "id": "side_to_side_wheeling",
    "nameAr": "تأرجح وتدوير الجذع الجانبي",
    "nameEn": "Side to Side Wheeling",
    "category": "الإحماء",
    "bodyPart": "الجذع والخصر",
    "targetMuscle": "عضلات العمود الفقري والخصر",
    "secondaryMuscles": [
      "الأكتاف"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين تليين حركي ممتاز لإعداد الجذع والخصر للتمارين الرياضية.",
    "duration": 30,
    "caloriesPerMin": 4,
    "caloriesApprox": 20,
    "animationType": "russian-twist",
    "steps": [
      "قف بفتح القدمين بعرض الكتفين وافرد ذراعيك جانباً.",
      "ادور بجذعك وذراعيك جانباً يميناً ويساراً بسلاسة وانسيابية."
    ],
    "tips": [
      "حافظ على ثبات القدمين بالأرض أثناء الدوران."
    ],
    "tags": [
      "إحماء",
      "الخصر",
      "مرونة",
      "بدون معدات",
      "مبتدئ"
    ],
    "muscleGroup": "عضلات البطن والخصر",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/85-Side%20to%20Side%20Wheeling.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/85-Side%20to%20Side%20Wheeling.mp4",
    "imageUrl": ""
  },
  "single_leg_backwards": {
    "id": "single_leg_backwards",
    "nameAr": "ركلات الساق الأحادي للخلف للأرداف",
    "nameEn": "Single Leg Backwards",
    "category": "المؤخرة",
    "bodyPart": "الأرداف والفخذ الخلفي",
    "targetMuscle": "عضلة المؤخرة الكبرى (Gluteus Maximus)",
    "secondaryMuscles": [
      "الفخذ الخلفي"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين بسيط وفعال يستهدف رفع وتنسيق عضلات المؤخرة بوزن الجسم.",
    "duration": 30,
    "caloriesPerMin": 6,
    "caloriesApprox": 30,
    "animationType": "squats",
    "steps": [
      "قف واستند بيديك على حائط.",
      "ارفع ساقاً واحدة للخلف ببطء مع ضغط وعصر عضلات المؤخرة.",
      "عد ببطء وكرر لكل ساق."
    ],
    "tips": [
      "ركز على الانقباض العضلي في القمة."
    ],
    "tags": [
      "المؤخرة",
      "الساقين",
      "شد الجسم",
      "بدون معدات",
      "مبتدئ"
    ],
    "muscleGroup": "الجزء السفلي والفخذين",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/86-Single%20Leg%20Backwards.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/86-Single%20Leg%20Backwards.mp4",
    "imageUrl": ""
  },
  "sit_up": {
    "id": "sit_up",
    "nameAr": "تمرين الجلوس الكامل للبطن (سيت أب)",
    "nameEn": "Sit Up",
    "category": "البطن والكرش",
    "bodyPart": "البطن الكلي",
    "targetMuscle": "عضلات البطن المستقيمة كاملة",
    "secondaryMuscles": [
      "مُثنيات الورك"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "التمرين الكلاسيكي القوي للنهوض بالكامل بعصر عضلات البطن وبناء قوة جدار البطن.",
    "duration": 45,
    "caloriesPerMin": 8,
    "caloriesApprox": 40,
    "animationType": "crunches",
    "steps": [
      "استلقِ على ظهرك واثنِ ركبتيك وثبت قدميك على الأرض.",
      "ارفع جذعك بالكامل من الأرض للوصول لوضعية الجلوس بالقرب من الركبتين.",
      "انزل ببطء وكنترول للظهر وكرر."
    ],
    "tips": [
      "النزول البطين يزيد الاستفادة العضلية."
    ],
    "tags": [
      "البطن",
      "الكرش",
      "حرق الدهون",
      "تخسيس",
      "شد الجسم",
      "متوسط"
    ],
    "muscleGroup": "عضلات البطن والخصر",
    "difficulty": "متوسط",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/87-Sit%20Up.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/87-Sit%20Up.mp4",
    "imageUrl": ""
  },
  "sitting_twists": {
    "id": "sitting_twists",
    "nameAr": "التواء الخصر من وضع الجلوس",
    "nameEn": "Sitting Twists",
    "category": "البطن والكرش",
    "bodyPart": "الخصر وأسفل الظهر",
    "targetMuscle": "عضلات الخصر والعمود الفقري",
    "secondaryMuscles": [
      "الكور"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين مريح يلين فقرات الظهر وينحت منطقة الجوانب بسهولة ونعومة.",
    "duration": 30,
    "caloriesPerMin": 5,
    "caloriesApprox": 25,
    "animationType": "russian-twist",
    "steps": [
      "اجلس بانتصاب على الأرض مع فرد الساقين للأمام.",
      "ادور بجذعك ويديك للجانب الأيمن واثبت لثانيتين.",
      "عد للمنتصف وادور للجانب الأيسر."
    ],
    "tips": [
      "حافظ على استقامة العمود الفقري أثناء الدوران."
    ],
    "tags": [
      "البطن",
      "الكرش",
      "الخصر",
      "بدون معدات",
      "مبتدئ"
    ],
    "muscleGroup": "عضلات البطن والخصر",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/88-Sitting%20Twists.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/88-Sitting%20Twists.mp4",
    "imageUrl": ""
  },
  "spider_abs": {
    "id": "spider_abs",
    "nameAr": "تمرين عنكبوت البطن الجانبي (سبايدر أبس)",
    "nameEn": "Spider Abs",
    "category": "البطن والكرش",
    "bodyPart": "الخصر والبطن الكلي",
    "targetMuscle": "عضلات البطن الجانبية والكور",
    "secondaryMuscles": [
      "الأكتاف",
      "الفخذين"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين حركي ممتع في وضعية البلانك يجذب الركبة جانباً للكوع لنحت الجوانب.",
    "duration": 45,
    "caloriesPerMin": 9,
    "caloriesApprox": 45,
    "animationType": "plank",
    "steps": [
      "ابدأ بوضعية البلانك على اليدين المفرودتين.",
      "اسحب ركبتك اليمنى جانباً باتجاه كوعك الأيمن بعصر الخصر.",
      "عد بها وكرر للركبة اليسرى كعنكبوت متسلق."
    ],
    "tips": [
      "حافظ على استقرار الحوض وعدم انخفاضه."
    ],
    "tags": [
      "البطن",
      "الكرش",
      "الخصر",
      "شد الجسم",
      "متوسط"
    ],
    "muscleGroup": "عضلات البطن والخصر",
    "difficulty": "متوسط",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/89-Spider%20Abs.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/89-Spider%20Abs.mp4",
    "imageUrl": ""
  },
  "spinal_twist": {
    "id": "spinal_twist",
    "nameAr": "إطالة التواء العمود الفقري للاسترخاء",
    "nameEn": "Spinal Twist",
    "category": "الإطالات والاستشفاء",
    "bodyPart": "العمود الفقري والظهر",
    "targetMuscle": "عضلات الظهر والخصر والعمود الفقري",
    "secondaryMuscles": [
      "الأكتاف"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "إطالة ممتازة لإلغاء إجهاد الضغط السكني وتليين فقرات الظهر بالكامل.",
    "duration": 30,
    "caloriesPerMin": 3,
    "caloriesApprox": 15,
    "animationType": "cobra-stretch",
    "steps": [
      "استلقِ على ظهرك واجذب ركبتك اليمنى نحو الصدر ثم اسقطها عبر جسمك للجانب الأيسر.",
      "افرد ذراعك الأيمن جانباً وانظر نحوه.",
      "اثبت 30 ثانية وكرر للجانب الآخر."
    ],
    "tips": [
      "حافظ على ملامسة الكتفين للأرض."
    ],
    "tags": [
      "إطالة",
      "الظهر",
      "استشفاء",
      "بدون معدات",
      "مبتدئ"
    ],
    "muscleGroup": "الإطالات والاستشفاء",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/90-Spinal%20Twist.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/90-Spinal%20Twist.mp4",
    "imageUrl": ""
  },
  "squat": {
    "id": "squat",
    "nameAr": "تمرين القرفصاء الكلاسيكي (سكوات)",
    "nameEn": "Squat",
    "category": "الساقين",
    "bodyPart": "الساقين والمؤخرة",
    "targetMuscle": "العضلات الرباعية والأرداف (Quads & Glutes)",
    "secondaryMuscles": [
      "الفخذ الخلفي",
      "الكور"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "ملك تمارين الجزء السفلي لبناء وتقوية الفخذين والمؤخرة وحرق السعرات الحرارية.",
    "duration": 45,
    "caloriesPerMin": 8,
    "caloriesApprox": 40,
    "animationType": "squats",
    "steps": [
      "قف بفتح القدمين بعرض الكتفين مع توجيه الأصابع للخارج قليلاً.",
      "ادفع بمؤخرتك للخلف وانزل كأنك تجلس على كرسي حتى توازي الفخذان الأرض.",
      "ادفع بكعبيك للعودة بانتصاب."
    ],
    "tips": [
      "حافظ على استقامة الظهر والصدر مرفوعاً."
    ],
    "tags": [
      "الساقين",
      "المؤخرة",
      "بناء العضلات",
      "شد الجسم",
      "تخسيس",
      "مبتدئ"
    ],
    "muscleGroup": "الجزء السفلي والفخذين",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/91-Squat.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/91-Squat.mp4",
    "imageUrl": ""
  },
  "standing_chest_fly": {
    "id": "standing_chest_fly",
    "nameAr": "تمرين فتح وضغط الصدر من الوقوف",
    "nameEn": "Standing Chest Fly",
    "category": "الصدر",
    "bodyPart": "الصدر والأكتاف",
    "targetMuscle": "عضلات الصدر (Pectorals)",
    "secondaryMuscles": [
      "الأكتاف الأمامية"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين حركي لفتح الصدر وتحسين القامة وتفعيل عضلات الصدر العلوي.",
    "duration": 30,
    "caloriesPerMin": 5,
    "caloriesApprox": 25,
    "animationType": "jumping-jacks",
    "steps": [
      "قف بانتصاب وافتح ذراعيك جانباً بمستوى الصدر مع انحناء خفيف في الكوعين.",
      "اجمع يديك وكوعيك معاً أمام صدرك واعصر الصدر.",
      "افتح الذراعين للخلف ببطء وكرر."
    ],
    "tips": [
      "اعصر الصدر بقوة عند التجميع."
    ],
    "tags": [
      "الصدر",
      "شد الجسم",
      "بدون معدات",
      "مبتدئ"
    ],
    "muscleGroup": "الجزء العلوي والذراعين",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/92-Standing%20Chest%20Fly.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/92-Standing%20Chest%20Fly.mp4",
    "imageUrl": ""
  },
  "standing_hamstring_curls": {
    "id": "standing_hamstring_curls",
    "nameAr": "ثني الفخذ الخلفي من الوقوف",
    "nameEn": "Standing Hamstring Curls",
    "category": "الساقين",
    "bodyPart": "الفخذ الخلفي",
    "targetMuscle": "عضلات الفخذ الخلفية (Hamstrings)",
    "secondaryMuscles": [
      "الأرداف"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين بسيط وعزلي يركز على شد عضلات الفخذ الخلفية وإبرز تقسيمها.",
    "duration": 30,
    "caloriesPerMin": 5,
    "caloriesApprox": 25,
    "animationType": "squats",
    "steps": [
      "قف باستقامة مع الاستناد على كرسي للتوازن.",
      "اثنِ كعب قدمك ببطء نحو المؤخرة بعصر الفخذ الخلفي.",
      "اخفض الساق ببطء وكرر بالتناوب."
    ],
    "tips": [
      "حافظ على توازي الركبتين أثناء الثني."
    ],
    "tags": [
      "الساقين",
      "شد الجسم",
      "بدون معدات",
      "مبتدئ"
    ],
    "muscleGroup": "الجزء السفلي والفخذين",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/93-Standing%20Hamstring%20Curls.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/93-Standing%20Hamstring%20Curls.mp4",
    "imageUrl": ""
  },
  "standing_isometric_pallof_press_hold": {
    "id": "standing_isometric_pallof_press_hold",
    "nameAr": "ثبات ثني الخصر الايزومتري من الوقوف",
    "nameEn": "Standing Isometric Pallof Press Hold",
    "category": "البطن والكرش",
    "bodyPart": "الكور والخصر",
    "targetMuscle": "العضلات العميقة للبطن والخصر",
    "secondaryMuscles": [
      "الأكتاف"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين ثبات يقاوم الدوران لتقوية ثبات الجذع وحماية الظهر من الإصابات.",
    "duration": 45,
    "caloriesPerMin": 6,
    "caloriesApprox": 30,
    "animationType": "plank",
    "steps": [
      "قف بفتح القدمين وافرد ذراعيك للأمام مع شبك اليدين بصلابة.",
      "اقاوم أي حركة واثبت في المنتصف بعصر عضلات البطن بالكامل.",
      "اثبت لـ 30 ثانية مع تنفس منتظم."
    ],
    "tips": [
      "اشدد البطن والأرداف بقوة طوال الثبات."
    ],
    "tags": [
      "البطن",
      "الكرش",
      "شد الجسم",
      "توازن",
      "متوسط"
    ],
    "muscleGroup": "عضلات البطن والخصر",
    "difficulty": "متوسط",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/94-Standing%20Isometric%20Pallof%20Press%20Hold.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/94-Standing%20Isometric%20Pallof%20Press%20Hold.mp4",
    "imageUrl": ""
  },
  "standing_knee_to_elbow_crunches": {
    "id": "standing_knee_to_elbow_crunches",
    "nameAr": "طحن البطن من الوقوف (ركبة للكوع)",
    "nameEn": "Standing Knee to Elbow Crunches",
    "category": "البطن والكرش",
    "bodyPart": "البطن والخصر",
    "targetMuscle": "عضلات البطن الجانبية والمستقيمة",
    "secondaryMuscles": [
      "مُثنيات الورك"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين بطن مريح بدون الحاجة للاستلقاء على الأرض، حارق ممتاز لدهون الخصر.",
    "duration": 45,
    "caloriesPerMin": 7,
    "caloriesApprox": 35,
    "animationType": "crunches",
    "steps": [
      "قف وضع يديك خلف رأسك.",
      "ارفع ركبتك اليمنى جانباً واهبط بكوعك الأيمن للمسها بعصر الخصر.",
      "عد لوضع الوقوف وكرر للجانب الأيسر بالتناوب."
    ],
    "tips": [
      "ركز على عصر الجانب العضلي للخصر عند الالتقاء."
    ],
    "tags": [
      "البطن",
      "الكرش",
      "الخصر",
      "تخسيس",
      "مبتدئ"
    ],
    "muscleGroup": "عضلات البطن والخصر",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/95-Standing%20Knee%20to%20Elbow%20Crunches.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/95-Standing%20Knee%20to%20Elbow%20Crunches.mp4",
    "imageUrl": ""
  },
  "straight_arms_sit_up": {
    "id": "straight_arms_sit_up",
    "nameAr": "سيت أب مع ذراعين مفرودتين للسقف",
    "nameEn": "Straight Arms Sit Up",
    "category": "البطن والكرش",
    "bodyPart": "البطن الكلي",
    "targetMuscle": "عضلات البطن المستقيمة كاملة",
    "secondaryMuscles": [
      "الأكتاف"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تعديل رائع لسيت أب يساعد في الصعود المستقيم وتحديد عضلات البطن بوضوح.",
    "duration": 45,
    "caloriesPerMin": 8,
    "caloriesApprox": 40,
    "animationType": "crunches",
    "steps": [
      "استلقِ على ظهرك وافرد ذراعيك دائماً باتجاه السقف.",
      "اصعد بجذعك كاملاً لأعلى مع إبقاء الذراعين مفرودتين فوق الرأس.",
      "انزل ببطء وكنترول للأرض وكرر."
    ],
    "tips": [
      "حافظ على توجيه الذراعين للسقف طوال التمرين."
    ],
    "tags": [
      "البطن",
      "الكرش",
      "شد الجسم",
      "تخسيس",
      "متوسط"
    ],
    "muscleGroup": "عضلات البطن والخصر",
    "difficulty": "متوسط",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/96-Straight%20Arms%20Sit%20Up.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/96-Straight%20Arms%20Sit%20Up.mp4",
    "imageUrl": ""
  },
  "straight_leg_lift": {
    "id": "straight_leg_lift",
    "nameAr": "رفع الساق المفرودة لشد الفخذ والبطن",
    "nameEn": "Straight Leg Lift",
    "category": "الساقين",
    "bodyPart": "الفخذ الأمامي والبطن",
    "targetMuscle": "عضلة الفخذ الأمامية ومُثنيات الورك",
    "secondaryMuscles": [
      "البطن السفلي"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين آمن وبسيط لتقوية الفخذ الأمامي والمفصل وتثبيت الركبة.",
    "duration": 45,
    "caloriesPerMin": 5,
    "caloriesApprox": 25,
    "animationType": "leg-raises",
    "steps": [
      "استلقِ على ظهرك واثنِ ساقاً وافرد الأخرى على الأرض.",
      "ارفع الساق المفرودة لأعلى ببطء حتى تتوازى مع ركبة الساق المنثنية.",
      "اخفضها ببطء دون أن تلمس الأرض وكرر."
    ],
    "tips": [
      "حافظ على الساق مفرودة تماماً أثناء الرفع."
    ],
    "tags": [
      "الساقين",
      "شد الجسم",
      "بدون معدات",
      "مبتدئ"
    ],
    "muscleGroup": "الجزء السفلي والفخذين",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/97-Straight%20Leg%20Lift.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/97-Straight%20Leg%20Lift.mp4",
    "imageUrl": ""
  },
  "straight_sit_up": {
    "id": "straight_sit_up",
    "nameAr": "تمرين سيت أب المستقيم للبطن",
    "nameEn": "Straight Sit Up",
    "category": "البطن والكرش",
    "bodyPart": "البطن المستقيمة",
    "targetMuscle": "عضلات البطن المستقيمة (Rectus Abdominis)",
    "secondaryMuscles": [
      "الكور"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين سيت أب مستقيم لبناء قوة وتحمل عضلات الجذع وتسطيح الكرش.",
    "duration": 45,
    "caloriesPerMin": 8,
    "caloriesApprox": 40,
    "animationType": "crunches",
    "steps": [
      "استلقِ على ظهرك واثنِ الركبتين مع وضع يديك على الصدر.",
      "اصعد ببطء للجلوس بعصر عضلات البطن.",
      "انزل بتدرج وسيطرة للأسفل وكرر."
    ],
    "tips": [
      "لا تستخدم الدفع السريع، اعتمد على انقباض البطن."
    ],
    "tags": [
      "البطن",
      "الكرش",
      "تخسيس",
      "شد الجسم",
      "متوسط"
    ],
    "muscleGroup": "عضلات البطن والخصر",
    "difficulty": "متوسط",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/98-Straight%20Sit%20Up.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/98-Straight%20Sit%20Up.mp4",
    "imageUrl": ""
  },
  "superman_with_scaption": {
    "id": "superman_with_scaption",
    "nameAr": "سوبرمان مع ضم وعصر لوحي الكتف",
    "nameEn": "Superman with Scaption",
    "category": "الظهر",
    "bodyPart": "الظهر والأكتاف",
    "targetMuscle": "عضلات الظهر وأعلى الظهر (Erector Spinae & Rhomboids)",
    "secondaryMuscles": [
      "الأكتاف الخلفية",
      "الأرداف"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تعديل محترف لتمرين السوبرمان يضيف حركة سحب الذراعين لعلاج تحدب الظهر.",
    "duration": 45,
    "caloriesPerMin": 6,
    "caloriesApprox": 30,
    "animationType": "cobra-stretch",
    "steps": [
      "استلقِ على بطنك وافرد ذراعيك بشكل حرف Y.",
      "ارفع صدرك وساقيك عن الأرض وسحب كوعيك للخلف لعصر لوحي الكتف.",
      "مدد ذراعيك واعد التكرار بانتظام."
    ],
    "tips": [
      "اعصر أعلى الظهر بقوة في قمة الحركة."
    ],
    "tags": [
      "الظهر",
      "الأكتاف",
      "تحسين القامة",
      "شد الجسم",
      "متوسط"
    ],
    "muscleGroup": "الجزء العلوي والذراعين",
    "difficulty": "متوسط",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/99-Superman%20with%20Scaption.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/99-Superman%20with%20Scaption.mp4",
    "imageUrl": ""
  },
  "supine_bicycle": {
    "id": "supine_bicycle",
    "nameAr": "دراجة البطن من الاستلقاء الأرضي",
    "nameEn": "Supine Bicycle",
    "category": "البطن والكرش",
    "bodyPart": "البطن والخصر",
    "targetMuscle": "عضلات البطن الكلية والخصر",
    "secondaryMuscles": [
      "مُثنيات الورك"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "حركة البدال للتبادل السريع بالقدمين مع تقريب الكوع المقابل لنحت الخصر والبطن.",
    "duration": 45,
    "caloriesPerMin": 8,
    "caloriesApprox": 40,
    "animationType": "crunches",
    "steps": [
      "استلقِ على ظهرك وضغط يديك خلف رأسك.",
      "حرك ساقيك بحركة البدال الدائرية مع تدوير الصدر للمس الكوع بالركبة المقابلة بالتناوب."
    ],
    "tips": [
      "حافظ على سلاسة وانسيابية الحركة."
    ],
    "tags": [
      "البطن",
      "الكرش",
      "الخصر",
      "تخسيس",
      "متوسط"
    ],
    "muscleGroup": "عضلات البطن والخصر",
    "difficulty": "متوسط",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/100-Supine%20Bicycle.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/100-Supine%20Bicycle.mp4",
    "imageUrl": ""
  },
  "supine_k_c": {
    "id": "supine_k_c",
    "nameAr": "تمرين سحب الركبة للصدر من الاستلقاء",
    "nameEn": "Supine K-C",
    "category": "البطن والكرش",
    "bodyPart": "البطن السفلي",
    "targetMuscle": "عضلات البطن السفلية",
    "secondaryMuscles": [
      "مُثنيات الورك"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين بسيط وسلس لسحب الركبتين معاً نحو الصدر لتشغيل أسفل البطن.",
    "duration": 30,
    "caloriesPerMin": 6,
    "caloriesApprox": 30,
    "animationType": "crunches",
    "steps": [
      "استلقِ على ظهرك وافرد ساقيك على الأرض.",
      "اثنِ الركبتين واسحبهما معاً نحو صدرك بعصر البطن.",
      "اعد فرد الساقين ببطء وكرر."
    ],
    "tips": [
      "لا تلمس الأرض بكعبيك عند فرد الساقين."
    ],
    "tags": [
      "البطن",
      "الكرش",
      "تخسيس",
      "شد الجسم",
      "مبتدئ"
    ],
    "muscleGroup": "عضلات البطن والخصر",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/101-Supine%20K-C.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/101-Supine%20K-C.mp4",
    "imageUrl": ""
  },
  "the_pilates_hundred": {
    "id": "the_pilates_hundred",
    "nameAr": "تمرين مئة بيلاتس الشهير للبطن",
    "nameEn": "The Pilates Hundred",
    "category": "البطن والكرش",
    "bodyPart": "البطن والجذع بالكامل",
    "targetMuscle": "عضلات البطن العميقة والمستقيمة",
    "secondaryMuscles": [
      "الذراعين",
      "الفخذين"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين البيلاتس الكلاسيكي لرفع القوة والتحمل في الكور مع النبض المتواصل بالذراعين.",
    "duration": 45,
    "caloriesPerMin": 8,
    "caloriesApprox": 40,
    "animationType": "crunches",
    "steps": [
      "استلقِ على ظهرك وارفع كتفيك وساقيك المفرودتين لزاوية 45 درجة.",
      "افرد ذراعيك بجانبك وقم بالنبض بالذراعين لأعلى ولأسفل بحركات سريعة.",
      "تنفس بشهيق لـ 5 نبضات وزفير لـ 5 نبضات حتى تصل لـ 100 نبضة."
    ],
    "tips": [
      "حافظ على ثبات الكور وأسفل الظهر على الأرض."
    ],
    "tags": [
      "البطن",
      "الكرش",
      "بيلاتس",
      "شد الجسم",
      "متوسط"
    ],
    "muscleGroup": "عضلات البطن والخصر",
    "difficulty": "متوسط",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/102-The%20Pilates%20Hundred.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/102-The%20Pilates%20Hundred.mp4",
    "imageUrl": ""
  },
  "toe_touch": {
    "id": "toe_touch",
    "nameAr": "تمرين لمس أصابع القدمين للبطن",
    "nameEn": "Toe Touch",
    "category": "البطن والكرش",
    "bodyPart": "البطن العلوي والأوسط",
    "targetMuscle": "عضلات البطن المستقيمة (Abs)",
    "secondaryMuscles": [
      "الفخذ الخلفي"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين مستهدف جداً لرفع الصدر ومحاولة لمس أصابع القدم المرفوعة بالسقف.",
    "duration": 45,
    "caloriesPerMin": 7,
    "caloriesApprox": 35,
    "animationType": "crunches",
    "steps": [
      "استلقِ على ظهرك وارفع ساقيك مفرودتين تماماً للسقف.",
      "افرد يديك وارفع لوحي الكتف عن الأرض محاولاً لمس أصابع قدميك بيدك.",
      "اخفض الكتفين ببطء وكرر."
    ],
    "tips": [
      "حافظ على الساقين مفرودتين لأعلى قدر المستطاع."
    ],
    "tags": [
      "البطن",
      "الكرش",
      "شد الجسم",
      "تخسيس",
      "مبتدئ"
    ],
    "muscleGroup": "عضلات البطن والخصر",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/103-Toe%20Touch.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/103-Toe%20Touch.mp4",
    "imageUrl": ""
  },
  "triceps_dip": {
    "id": "triceps_dip",
    "nameAr": "تمرين غطس الذراعين للترايسبس (ترايسبس ديب)",
    "nameEn": "Triceps Dip",
    "category": "الذراعين",
    "bodyPart": "الذراعين والصدر",
    "targetMuscle": "عضلة الترايسبس (Triceps)",
    "secondaryMuscles": [
      "الأكتاف الأمامية",
      "أعلى الصدر"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "التمرين الأساسي الفعال لشد ترهلات الذراعين وتقوية عضلة الترايسبس.",
    "duration": 45,
    "caloriesPerMin": 7,
    "caloriesApprox": 35,
    "animationType": "plank",
    "steps": [
      "اجلس على الأرض واثنِ ركبتيك وضع كفيك خلفك متوجهين للأمام.",
      "ارفع حوضك قليلاً عن الأرض واثنِ كوعيك للخلف للانخفاض ببطء.",
      "ادفع الأرض بيديك للعودة بانتصاب الذراعين."
    ],
    "tips": [
      "حافظ على بقاء الكوعين متجهين للخلف وليس للجانبين."
    ],
    "tags": [
      "الذراعين",
      "شد الجسم",
      "بناء العضلات",
      "مبتدئ"
    ],
    "muscleGroup": "الجزء العلوي والذراعين",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/104-Triceps%20Dip.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/104-Triceps%20Dip.mp4",
    "imageUrl": ""
  },
  "triceps_dip_bench_assisted": {
    "id": "triceps_dip_bench_assisted",
    "nameAr": "غطس الترايسبس بمساعدة الكرسي أو البنش",
    "nameEn": "Triceps Dip, Bench Assisted",
    "category": "الذراعين",
    "bodyPart": "الذراعين والصدر",
    "targetMuscle": "عضلة الترايسبس (Triceps)",
    "secondaryMuscles": [
      "الأكتاف الأمامية"
    ],
    "equipment": "بنش / مقعد",
    "description": "استخدام مقعد يزيد من مدى الحركة وعمق الانخفاض لنتائج أفضل في شد الذراعين.",
    "duration": 45,
    "caloriesPerMin": 8,
    "caloriesApprox": 40,
    "animationType": "plank",
    "steps": [
      "ضع يديك على حافة بنش أو كرسي ثابت خلفك وافرد قدميك للأمام.",
      "اخفض جسمك عمودياً بثني الكوعين لزاوية 90 درجة.",
      "ادفع بصلابة بيديك للعودة لأعلى مع شد الترايسبس."
    ],
    "tips": [
      "ابقِ ظهرك قريباً جداً من حافة الكرسي."
    ],
    "tags": [
      "الذراعين",
      "شد الجسم",
      "بنش / مقعد",
      "متوسط"
    ],
    "muscleGroup": "الجزء العلوي والذراعين",
    "difficulty": "متوسط",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/105-Triceps%20Dip%2C%20Bench%20Assisted.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/105-Triceps%20Dip%2C%20Bench%20Assisted.mp4",
    "imageUrl": ""
  },
  "up_down_plank": {
    "id": "up_down_plank",
    "nameAr": "بلانك الصعود والهبوط (أب داون بلانك)",
    "nameEn": "Up Down Plank",
    "category": "الجسم بالكامل",
    "bodyPart": "الأكتاف والذراعين والكور",
    "targetMuscle": "عضلات الترايسبس والأكتاف والبطن",
    "secondaryMuscles": [
      "الصدر",
      "الكور"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "تمرين حركي يرفع قوة الذراعين والأكتاف ويختبر ثبات الكور في التنقل.",
    "duration": 45,
    "caloriesPerMin": 9,
    "caloriesApprox": 45,
    "animationType": "plank",
    "steps": [
      "ابدأ بوضعية البلانك على الساعدين.",
      "ادفع بيدك اليمنى ثم اليسرى للصعود لوضية البلانك المفرود.",
      "اخفض ساعدك الأيمن ثم الأيسر للعودة للساعدين وكرر بالتناوب."
    ],
    "tips": [
      "قلل من اهتزاز الحوض أثناء التنقل."
    ],
    "tags": [
      "الجسم بالكامل",
      "الذراعين",
      "البطن",
      "الكارديو",
      "متوسط"
    ],
    "muscleGroup": "كامل الجسم",
    "difficulty": "متوسط",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/106-Up%20Down%20Plank.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/106-Up%20Down%20Plank.mp4",
    "imageUrl": ""
  },
  "wide_arm_push_up": {
    "id": "wide_arm_push_up",
    "nameAr": "تمرين الضغط بقبضة واسعة لبناء الصدر",
    "nameEn": "Wide Arm Push Up",
    "category": "الصدر",
    "bodyPart": "الصدر والأكتاف",
    "targetMuscle": "عضلات الصدر الخارجية (Pectorals)",
    "secondaryMuscles": [
      "الأكتاف الأمامية",
      "الترايسبس"
    ],
    "equipment": "بدون معدات (وزن الجسم)",
    "description": "توسيع مسافة اليدين يركز الضغط العضلي بشكل أكبر على تكبير وتحديد الصدر.",
    "duration": 45,
    "caloriesPerMin": 8,
    "caloriesApprox": 40,
    "animationType": "plank",
    "steps": [
      "ضع كفيك على الأرض بمسافة أوسع من الكتفين بشكل ملحوظ.",
      "اخفض صدرك نحو الأرض مع فتح الكوعين للجانبين.",
      "ادفع الأرض بقوة للعودة لوضعية البداية."
    ],
    "tips": [
      "حافظ على خط جسمك مستقيماً وثابت الكور."
    ],
    "tags": [
      "الصدر",
      "بناء العضلات",
      "شد الجسم",
      "متوسط"
    ],
    "muscleGroup": "الجزء العلوي والذراعين",
    "difficulty": "متوسط",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/107-Wide%20Arm%20Push%20Up.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/107-Wide%20Arm%20Push%20Up.mp4",
    "imageUrl": ""
  },
  "wide_grip_incline_push_up": {
    "id": "wide_grip_incline_push_up",
    "nameAr": "ضغط بقبضة واسعة منحدر على بنش",
    "nameEn": "Wide Grip Incline Push Up",
    "category": "الصدر",
    "bodyPart": "الصدر السفلي والأكتاف",
    "targetMuscle": "عضلات الصدر السفلي والواسع",
    "secondaryMuscles": [
      "الترايسبس",
      "الأكتاف"
    ],
    "equipment": "بنش / مقعد",
    "description": "استخدام سطح مرتفع يسهل الضغط الواسع ويوجهه لنحت الصدر السفلي بكل أريحية.",
    "duration": 45,
    "caloriesPerMin": 7,
    "caloriesApprox": 35,
    "animationType": "plank",
    "steps": [
      "ضع يديك بقبضة واسعة على بنش مرتفع.",
      "اخفض صدرك ببطء نحو حافة البنش.",
      "ادفع للأعلى للعودة بانتصاب."
    ],
    "tips": [
      "مناسب جداً لبناء قوة الصدر للمبتدئين."
    ],
    "tags": [
      "الصدر",
      "شد الجسم",
      "بنش / مقعد",
      "مبتدئ"
    ],
    "muscleGroup": "الجزء العلوي والذراعين",
    "difficulty": "مبتدئ",
    "videoUrl": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/108-Wide%20Grip%20Incline%20Push%20Up.mp4",
    "mp4Url": "https://pub-c3e565e1d89048dabb8cc76bda59ede4.r2.dev/app-videos%202/108-Wide%20Grip%20Incline%20Push%20Up.mp4",
    "imageUrl": ""
  }
};
