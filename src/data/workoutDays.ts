import { WorkoutDay, UserStats } from '../types';
import { EXERCISES_DB } from './exercises';
import { getSwappedExercisesMap } from '../utils/exerciseSwapper';

/**
 * Intelligent Personalized Workout Engine
 * Generates custom 30-day adaptive workout levels (120 Days total across 4 Levels).
 * Tailors workout structure, exercise selection, duration, rest times, and calorie burn based on:
 * 1. User Goal ('loss' / 'maintain' / 'gain' / 'fitness')
 * 2. User Activity Level (Sedentary <=1.2, Light 1.375, Moderate 1.55, Very Active >=1.725)
 * 3. Level Progression (Level 1, Level 2, Level 3, Level 4)
 * 4. Time-based Exercises (No reps, fixed 30s or 45s rest per exercise complexity)
 * 5. Dynamic Calorie Burn calculation per exercise and full session
 * 6. Non-repetition & variety across consecutive days
 */
export const generateWorkoutDaysForUser = (userStats: UserStats, seasonId: string): WorkoutDay[] => {
  const allExercises = Object.values(EXERCISES_DB);
  const exerciseMap = EXERCISES_DB;

  const {
    weight = 70,
    height = 168,
    age = 26,
    gender = 'أنثى',
    activityLevel = 1.375,
    goal = 'loss'
  } = userStats;

  // 1. Determine Level/Season (Level 1, 2, 3, or 4)
  let seasonLevel = 1;
  if (seasonId.includes('season_2') || seasonId.endsWith('2') || seasonId.includes('level_2')) seasonLevel = 2;
  else if (seasonId.includes('season_3') || seasonId.endsWith('3') || seasonId.includes('level_3')) seasonLevel = 3;
  else if (seasonId.includes('season_4') || seasonId.endsWith('4') || seasonId.includes('level_4')) seasonLevel = 4;

  // 2. Normalize Goal
  const normalizedGoal: 'loss' | 'maintain' | 'gain' = 
    goal === 'maintain' ? 'maintain' : goal === 'gain' ? 'gain' : 'loss';

  // 3. User Activity Level Classification
  const isSedentary = activityLevel <= 1.25;
  const isLight = activityLevel > 1.25 && activityLevel <= 1.45;
  const isModerate = activityLevel > 1.45 && activityLevel <= 1.65;
  const isVeryActive = activityLevel > 1.65;

  // 4. Safety & Body Analysis
  const heightMeters = height / 100;
  const bmi = heightMeters > 0 ? weight / (heightMeters * heightMeters) : 22;
  const isHighBmi = bmi >= 28;
  const isOlder = age >= 40;

  // 5. Allowed Difficulties per Season Level
  const allowedDifficulties: ('مبتدئ' | 'متوسط' | 'متقدم' | 'احترافي')[] = [];
  if (seasonLevel === 1) {
    allowedDifficulties.push('مبتدئ', 'متوسط');
  } else if (seasonLevel === 2) {
    allowedDifficulties.push('مبتدئ', 'متوسط', 'متقدم');
  } else if (seasonLevel === 3) {
    allowedDifficulties.push('متوسط', 'متقدم', 'احترافي');
  } else {
    allowedDifficulties.push('متوسط', 'متقدم', 'احترافي');
  }

  // Filter Safe Candidates matching level difficulties and health safety
  const safeCandidates = allExercises.filter(ex => {
    // Difficulty match
    if (!allowedDifficulties.includes(ex.difficulty)) return false;

    // Health safety filter for high BMI or older adults in early levels
    if ((isHighBmi || isOlder) && seasonLevel <= 2) {
      if (['1127', '1152', '1153', '1176'].includes(ex.id)) return false; // High impact depth/box jumps
    }
    return true;
  });

  // 6. Build Specialized Pools Based on Goal (Requirement #5)
  // Warmup Pool
  const warmupPool = allExercises.filter(ex => 
    ex.category === 'الإحماء' || 
    ex.category === 'الإطالات والاستشفاء' || 
    ex.tags?.includes('إحماء') ||
    ['1132', '1133', '1182', '1183', '1184', '1185', '1168', '1175'].includes(ex.id)
  );

  // Cool-down / Stretch Pool
  const stretchPool = allExercises.filter(ex => 
    ex.category === 'الإطالات والاستشفاء' || 
    ex.tags?.includes('إطالة') ||
    ['1108', '1109', '1116', '1118', '1121', '1123', '1124', '1135', '1138', '1194', '1198', '1199'].includes(ex.id)
  );

  let poolA: typeof allExercises = [];
  let poolB: typeof allExercises = [];
  let poolC: typeof allExercises = [];

  if (normalizedGoal === 'loss') {
    // GOAL 1: FAT LOSS & BELLY SHREDDING (تخسيس دهون البطن والكرش)
    // Strictly Cardio, Abs, Waist, Obliques & Core exercises only
    const lossCandidates = safeCandidates.filter(ex => {
      const isCardio = ex.category === 'الكارديو' || ex.tags?.some(t => ['الكارديو', 'حرق الدهون', 'تخسيس', 'كارديو'].includes(t));
      const isAbsWaist = ex.category === 'البطن والكرش' || ex.muscleGroup === 'عضلات البطن والخصر' || 
        ex.targetMuscle?.includes('بطن') || ex.targetMuscle?.includes('خصر') || ex.targetMuscle?.includes('جانبين') ||
        ['abs', 'waist', 'obliques'].includes(ex.bodyPart || '');
      return isCardio || isAbsWaist;
    });

    poolA = lossCandidates.filter(ex => ex.category === 'الكارديو' || ex.tags?.includes('كارديو'));
    poolB = lossCandidates.filter(ex => ex.category === 'البطن والكرش' || ex.targetMuscle?.includes('بطن'));
    poolC = lossCandidates.filter(ex => ex.targetMuscle?.includes('خصر') || ex.targetMuscle?.includes('جانبين') || ex.muscleGroup === 'عضلات البطن والخصر');

    // Fallbacks if pool is narrow
    if (poolA.length < 5) poolA = lossCandidates.length > 0 ? lossCandidates : safeCandidates;
    if (poolB.length < 5) poolB = lossCandidates.length > 0 ? lossCandidates : safeCandidates;
    if (poolC.length < 5) poolC = lossCandidates.length > 0 ? lossCandidates : safeCandidates;

  } else if (normalizedGoal === 'maintain') {
    // GOAL 2: TONING & WAIST SCULPTING (شد الترهلات والحصول على خصر مثالي)
    // Toning, waist, abs, core, posture, flexibility, and full-body sculpting
    poolA = safeCandidates.filter(ex => 
      ex.category === 'البطن والكرش' || 
      ex.targetMuscle?.includes('خصر') || 
      ex.targetMuscle?.includes('بطن') ||
      ex.tags?.some(t => ['شد', 'خصر', 'تنسيق', 'قوام'].includes(t))
    );
    poolB = safeCandidates.filter(ex => 
      ex.category === 'الساقين' || 
      ex.targetMuscle?.includes('مؤخرة') || 
      ex.targetMuscle?.includes('فخذ') ||
      ex.muscleGroup === 'الجزء السفلي والفخذين'
    );
    poolC = safeCandidates.filter(ex => 
      ['الصدر', 'الظهر', 'الكتفين'].includes(ex.category || '') || 
      ex.muscleGroup === 'الجزء العلوي والذراعين' ||
      ex.category === 'الإطالات والاستشفاء'
    );

    if (poolA.length < 5) poolA = safeCandidates;
    if (poolB.length < 5) poolB = safeCandidates;
    if (poolC.length < 5) poolC = safeCandidates;

  } else {
    // GOAL 3: MUSCLE GAIN & HYPERTROPHY (بناء اللياقة البدنية والكتلة العضلية)
    // Full body strength exercises with weekly muscle group distribution
    poolA = safeCandidates.filter(ex => 
      ['الصدر', 'الكتفين'].includes(ex.category || '') || 
      ex.muscleGroup === 'الجزء العلوي والذراعين'
    );
    poolB = safeCandidates.filter(ex => 
      ['الظهر', 'البطن والكرش'].includes(ex.category || '') || 
      ex.targetMuscle?.includes('ظهر') || ex.targetMuscle?.includes('بطن')
    );
    poolC = safeCandidates.filter(ex => 
      ['الساقين'].includes(ex.category || '') || 
      ex.muscleGroup === 'الجزء السفلي والفخذين'
    );

    if (poolA.length < 5) poolA = safeCandidates;
    if (poolB.length < 5) poolB = safeCandidates;
    if (poolC.length < 5) poolC = safeCandidates;
  }

  // 7. Session Size & Intensity Base based on Activity Level (Requirement #6)
  let baseMinEx = 7;
  let baseMaxEx = 9;

  if (isSedentary) {
    baseMinEx = 5;
    baseMaxEx = 7;
  } else if (isLight) {
    baseMinEx = 7;
    baseMaxEx = 9;
  } else if (isModerate) {
    baseMinEx = 8;
    baseMaxEx = 11;
  } else { // Very active
    baseMinEx = 10;
    baseMaxEx = 14;
  }

  // Scale with Season Level
  baseMinEx += (seasonLevel - 1) * 2;
  baseMaxEx += (seasonLevel - 1) * 2;

  const workoutDaysList: WorkoutDay[] = [];
  let previousDayExercises: string[] = [];

  // 8. Generate 30 Progressive Days for Current Level
  for (let dayNum = 1; dayNum <= 30; dayNum++) {
    // Progressive Overload ratio across the 30 days (0.0 to 1.0)
    const monthProgress = (dayNum - 1) / 29;

    // Rest Day condition: Every 5th or 6th day
    const isRestDay = dayNum % 5 === 0;

    let difficultyLabel: 'مبتدئ' | 'متوسط' | 'متقدم' | 'احترافي' = 'مبتدئ';
    if (seasonLevel === 1) difficultyLabel = dayNum > 20 ? 'متوسط' : 'مبتدئ';
    else if (seasonLevel === 2) difficultyLabel = dayNum > 15 ? 'متقدم' : 'متوسط';
    else if (seasonLevel === 3) difficultyLabel = dayNum > 15 ? 'احترافي' : 'متقدم';
    else difficultyLabel = 'احترافي';

    if (isRestDay) {
      const restTitlesAr = [
        `اليوم ${dayNum}: يوم راحة واستشفاء للمفاصل`,
        `اليوم ${dayNum}: استراحة شحن طاقة العضلات`,
        `اليوم ${dayNum}: يوم استرخاء وإطالة خفيفة`,
        `اليوم ${dayNum}: راحة واسترداد عافية الجسم`
      ];
      const restTitlesEn = [
        `Day ${dayNum}: Rest & Joint Recovery`,
        `Day ${dayNum}: Muscle Recharge Break`,
        `Day ${dayNum}: Relax & Light Stretch`,
        `Day ${dayNum}: Body Recovery Day`
      ];

      workoutDaysList.push({
        dayNumber: dayNum,
        titleAr: restTitlesAr[dayNum % restTitlesAr.length],
        titleEn: restTitlesEn[dayNum % restTitlesEn.length],
        exercises: [],
        difficulty: difficultyLabel,
        isRestDay: true,
        estimatedTime: 0,
        caloriesEstimate: 0,
        totalSets: 0,
        targetMuscles: ['راحة عضلية تامة'],
        restTimePerSet: 0,
        intensityLabel: 'استشفاء',
        workoutType: 'راحة واستشفاء'
      });

      previousDayExercises = [];
      continue;
    }

    // Target exercise count for this day (Progressive Overload)
    const targetExerciseCount = Math.min(
      18,
      Math.max(5, Math.round(baseMinEx + (baseMaxEx - baseMinEx) * monthProgress))
    );

    // Number of sets (Requirement #3 & Overload)
    const totalSets = seasonLevel >= 3 ? (dayNum > 15 ? 4 : 3) : 3;

    // Titles based on Goal & Level
    let titleAr = '';
    let titleEn = '';
    let workoutType = '';

    if (normalizedGoal === 'loss') {
      titleAr = `اليوم ${dayNum}: حرق الدهون ونحت البطن والخصر (المستوى ${seasonLevel})`;
      titleEn = `Day ${dayNum}: Fat Shred & Waist Sculpt (Level ${seasonLevel})`;
      workoutType = 'كارديو وحرق دهون مكثف';
    } else if (normalizedGoal === 'maintain') {
      titleAr = `اليوم ${dayNum}: شد الترهلات ونحت القوام (المستوى ${seasonLevel})`;
      titleEn = `Day ${dayNum}: Body Toning & Posture (Level ${seasonLevel})`;
      workoutType = 'شد وتقوية العضلات';
    } else {
      titleAr = `اليوم ${dayNum}: بناء القوة والكتلة العضلية (المستوى ${seasonLevel})`;
      titleEn = `Day ${dayNum}: Hypertrophy & Strength (Level ${seasonLevel})`;
      workoutType = 'تضخيم وبناء القوة';
    }

    // 9. Select Exercises for Day (Requirement #10: Non-repetition across consecutive days)
    const dayExercises: string[] = [];

    // Warmup Exercise (1)
    if (warmupPool.length > 0) {
      const warmupCandidate = warmupPool.find(ex => !previousDayExercises.includes(ex.id)) || warmupPool[0];
      if (warmupCandidate) dayExercises.push(warmupCandidate.id);
    }

    // Main Exercises
    const mainPools = [poolA, poolB, poolC];
    let attempt = 0;
    const requiredMains = Math.max(3, targetExerciseCount - 2);

    while (dayExercises.length < requiredMains + 1 && attempt < 80) {
      const poolIdx = (dayNum * 13 + attempt * 7 + seasonLevel * 17) % mainPools.length;
      const currentPool = mainPools[poolIdx];
      const exIdx = (dayNum * 29 + attempt * 19 + seasonLevel * 31) % currentPool.length;
      const candidate = currentPool[exIdx];

      if (candidate) {
        const notInCurrentDay = !dayExercises.includes(candidate.id);
        const notInPreviousDay = !previousDayExercises.includes(candidate.id) || attempt > 40;

        if (notInCurrentDay && notInPreviousDay) {
          dayExercises.push(candidate.id);
        }
      }
      attempt++;
    }

    // Cool-down / Stretch Exercise (1)
    if (stretchPool.length > 0) {
      const stretchCandidate = stretchPool.find(ex => !dayExercises.includes(ex.id) && !previousDayExercises.includes(ex.id)) || stretchPool[0];
      if (stretchCandidate && !dayExercises.includes(stretchCandidate.id)) {
        dayExercises.push(stretchCandidate.id);
      }
    }

    // Deduplicate
    const uniqueExercises = Array.from(new Set(dayExercises));
    previousDayExercises = [...uniqueExercises];

    // 10. Time-Based Exercise Duration & Fixed Rest Time Calculation (Requirements #7 & #8)
    // Requirement #8: Fixed rest per exercise: 30s for simple exercises, 45s for difficult/intermediate exercises
    let sumActiveSec = 0;
    let sumRestSec = 0;
    let sumCalories = 0;
    let simpleCount = 0;
    let hardCount = 0;

    const genderFactor = gender === 'ذكر' ? 1.08 : 0.94;
    const ageFactor = Math.max(0.85, 1 - Math.max(0, age - 25) * 0.002);
    const actMultiplier = Math.max(0.9, Math.min(1.3, activityLevel / 1.375));

    uniqueExercises.forEach((exId, idx) => {
      const ex = exerciseMap[exId];
      if (ex) {
        // Requirement #7: Duration calculation if missing or scaling
        let durationSec = ex.duration || 30;
        if (ex.difficulty === 'مبتدئ' || ex.category === 'الإحماء' || ex.category === 'الإطالات والاستشفاء') {
          durationSec = 30;
        } else if (ex.difficulty === 'متوسط') {
          durationSec = 40;
        } else if (ex.difficulty === 'متقدم' || ex.difficulty === 'احترافي') {
          durationSec = 45;
        }

        // Slight duration adjustment based on level progress (+5s in higher levels)
        if (seasonLevel >= 3) durationSec += 5;

        // Requirement #8: Fixed rest times: 30s for simple exercises, 45s for difficult exercises
        const isSimple = ex.difficulty === 'مبتدئ' || ex.category === 'الإحماء' || ex.category === 'الإطالات والاستشفاء';
        const exRestSec = isSimple ? 30 : 45;

        if (isSimple) simpleCount++;
        else hardCount++;

        // Active duration total across all sets
        const exTotalActiveSec = durationSec * totalSets;
        sumActiveSec += exTotalActiveSec;

        // Rest duration (between sets and after exercise)
        const exTotalRestSec = exRestSec * totalSets;
        sumRestSec += exTotalRestSec;

        // Requirement #9: Calorie calculation per exercise
        const met = (ex.caloriesPerMin ? ex.caloriesPerMin * 1.15 : 6.5) + (seasonLevel * 0.3);
        const calPerSec = ((met * 3.5 * weight) / 200 / 60) * genderFactor * ageFactor * actMultiplier;
        const exCalories = calPerSec * exTotalActiveSec;
        sumCalories += exCalories;
      }
    });

    // Add rest calorie burn (resting MET ~1.5)
    const restCalPerSec = ((1.5 * 3.5 * weight) / 200 / 60) * genderFactor * ageFactor;
    sumCalories += restCalPerSec * sumRestSec;

    // Average rest time per set for the day metadata (Requirement #8: 30s or 45s)
    const restTimePerSet = hardCount >= simpleCount ? 45 : 30;

    // Total estimated duration in minutes
    const totalSessionSec = sumActiveSec + sumRestSec;
    const estimatedTime = Math.max(8, Math.round(totalSessionSec / 60));

    // Target Muscles Aggregation
    const muscleSet = new Set<string>();
    uniqueExercises.forEach(exId => {
      const ex = exerciseMap[exId];
      if (ex) {
        if (ex.targetMuscle) muscleSet.add(ex.targetMuscle);
        else if (ex.bodyPart) muscleSet.add(ex.bodyPart);
        else if (ex.category) muscleSet.add(ex.category);
      }
    });

    const targetMuscles = Array.from(muscleSet).slice(0, 4);
    if (targetMuscles.length === 0) targetMuscles.push('كامل الجسم', 'عضلات الكور');

    let intensityLabel = 'مناسبة ومتدرجة';
    if (seasonLevel === 1) intensityLabel = 'منخفضة خفيفة';
    else if (seasonLevel === 2) intensityLabel = 'متوسطة متناسقة';
    else if (seasonLevel === 3) intensityLabel = 'عالية المجهود';
    else intensityLabel = 'عالية جداً (HIIT)';

    const swappedMap = getSwappedExercisesMap();
    const swapKey = `${seasonId}_day_${dayNum}`;
    let finalExercises = uniqueExercises;

    if (swappedMap[swapKey] && Array.isArray(swappedMap[swapKey]) && swappedMap[swapKey].length === uniqueExercises.length) {
      finalExercises = swappedMap[swapKey];
      // Recalculate calories for swapped list
      const swappedExerciseObjects = finalExercises.map(id => EXERCISES_DB[id]).filter(Boolean);
      const swappedCaloriesOneSet = swappedExerciseObjects.reduce((acc, ex) => {
        const rate = ex.caloriesPerMin || 6;
        const dur = (ex.duration || 30) / 60;
        return acc + (rate * dur * (weight / 70) * (activityLevel / 1.375));
      }, 0);
      sumCalories = swappedCaloriesOneSet * totalSets;
    }

    workoutDaysList.push({
      dayNumber: dayNum,
      titleAr,
      titleEn,
      exercises: finalExercises,
      difficulty: difficultyLabel,
      isRestDay: false,
      estimatedTime,
      caloriesEstimate: Math.max(30, Math.round(sumCalories)),
      totalSets,
      targetMuscles,
      restTimePerSet,
      intensityLabel,
      workoutType
    });
  }

  return workoutDaysList;
};

// Default export for initial state
export const WORKOUT_DAYS_DB: WorkoutDay[] = generateWorkoutDaysForUser(
  {
    weight: 70,
    height: 168,
    age: 26,
    gender: 'أنثى',
    activityLevel: 1.375,
    goal: 'loss',
    onboarded: false
  },
  'loss_season_1'
);
