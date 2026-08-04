import { WorkoutDay, UserStats } from '../types';
import { EXERCISES_DB } from './exercises';

/**
 * Professional Intelligent Workout Generator Engine
 * Generates 30 highly structured, adaptive workout days.
 * Strictly adheres to user body metrics, fitness level, and goals.
 *
 * Key Capabilities:
 * 1. 4 Distinct Levels (Beginner 15-20m/8-10ex, Intermediate 20-30m/10-14ex, Advanced 30-40m/12-16ex, Pro 40-60m/15-20ex).
 * 2. 30-Day Progressive Overload & Dynamic Exercise Scaling.
 * 3. Dynamic MET-based Calorie Burning Formula based on Weight, Age, Gender, Duration, Sets & Intensity.
 * 4. Goal-Tailored Exercise Pools (Fat Loss / Belly Shredding, Body Toning, Muscle Gain, Fitness & Endurance).
 * 5. Full Workout Summary Metadata (Duration, Exercises Count, Sets Count, Calories, Target Muscles, Difficulty).
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
  if (seasonId.includes('season_2') || seasonId.endsWith('2')) seasonLevel = 2;
  else if (seasonId.includes('season_3') || seasonId.endsWith('3')) seasonLevel = 3;
  else if (seasonId.includes('season_4') || seasonId.endsWith('4')) seasonLevel = 4;

  // 2. Body Safety Analysis
  const heightMeters = height / 100;
  const bmi = heightMeters > 0 ? weight / (heightMeters * heightMeters) : 22;

  const isOverweight = bmi >= 28;
  const isOlder = age >= 40;
  const isTeen = age < 18;

  // 3. Level-Based Constraints Table
  let minEx = 8, maxEx = 10;
  let minDur = 15, maxDur = 20;
  let minRest = 25, maxRest = 30;
  let baseLevelMET = 5.0;
  let levelIntensityLabel = 'منخفضة';
  let difficultyLabel: 'مبتدئ' | 'متوسط' | 'متقدم' | 'احترافي' = 'مبتدئ';
  const allowedDifficulties: ('مبتدئ' | 'متوسط' | 'متقدم' | 'احترافي')[] = [];

  if (seasonLevel === 1) { // Level 1 (مبتدئ)
    minEx = 8; maxEx = 10;
    minDur = 15; maxDur = 20;
    minRest = 25; maxRest = 30;
    baseLevelMET = 5.0;
    levelIntensityLabel = 'منخفضة خفيفة';
    difficultyLabel = 'مبتدئ';
    allowedDifficulties.push('مبتدئ', 'متوسط');
  } else if (seasonLevel === 2) { // Level 2 (متوسط)
    minEx = 10; maxEx = 14;
    minDur = 20; maxDur = 30;
    minRest = 20; maxRest = 25;
    baseLevelMET = 6.8;
    levelIntensityLabel = 'متوسطة متناسقة';
    difficultyLabel = 'متوسط';
    allowedDifficulties.push('مبتدئ', 'متوسط', 'متقدم');
  } else if (seasonLevel === 3) { // Level 3 (متقدم)
    minEx = 12; maxEx = 16;
    minDur = 30; maxDur = 40;
    minRest = 15; maxRest = 20;
    baseLevelMET = 8.8;
    levelIntensityLabel = 'عالية المجهود';
    difficultyLabel = 'متقدم';
    allowedDifficulties.push('متوسط', 'متقدم', 'احترافي');
  } else { // Level 4 (احترافي)
    minEx = 15; maxEx = 20;
    minDur = 40; maxDur = 60;
    minRest = 10; maxRest = 15;
    baseLevelMET = 11.2;
    levelIntensityLabel = 'عالية جداً (HIIT & Supersets)';
    difficultyLabel = 'احترافي';
    allowedDifficulties.push('متوسط', 'متقدم', 'احترافي');
  }

  // 4. Exercise Pools Creation from EXERCISES_DB
  const warmupPool = allExercises.filter(
    ex => ex.category === 'الإحماء' || ex.tags?.includes('إحماء')
  );

  const stretchPool = allExercises.filter(
    ex => ex.category === 'الإطالات والاستشفاء' || ex.tags?.includes('إطالة')
  );

  // Filter Safe Main Candidates
  const safeMainCandidates = allExercises.filter(ex => {
    if (
      ex.category === 'الإحماء' ||
      ex.category === 'الإطالات والاستشفاء' ||
      ex.tags?.includes('إحماء') ||
      ex.tags?.includes('إطالة')
    ) {
      return false;
    }

    if (!allowedDifficulties.includes(ex.difficulty)) return false;

    // Safety checks for overweight or older adults
    if ((isOverweight || isOlder) && ['high_jumps', 'jump_squat', 'plank_with_jumps'].includes(ex.id)) {
      return false;
    }

    if (isTeen && ['push_ups_with_feet_elevated_narrow', 'side_bridge_with_leg_raise'].includes(ex.id)) {
      return false;
    }

    return true;
  });

  // 5. Categorize Main Pools based on Goal
  let poolA: typeof allExercises = [];
  let poolB: typeof allExercises = [];
  let poolC: typeof allExercises = [];

  if (goal === 'loss') {
    // FAT LOSS / BELLY SHREDDING: Cardio, Core/Abs, Full-body
    poolA = safeMainCandidates.filter(
      ex => ex.category === 'الكارديو' || ex.category === 'الجسم بالكامل' || ex.tags?.some(t => ['الكارديو', 'حرق الدهون', 'تخسيس'].includes(t))
    );
    poolB = safeMainCandidates.filter(
      ex => ex.category === 'البطن والكرش' || ex.muscleGroup === 'عضلات البطن والخصر' || ex.tags?.some(t => ['البطن', 'الكرش', 'الخصر'].includes(t))
    );
    poolC = safeMainCandidates.filter(
      ex => ['الساقين', 'المؤخرة', 'الذراعين', 'الصدر'].includes(ex.category || '')
    );
  } else if (goal === 'maintain') {
    // TONING & SCULPTING: Posture, Glutes/Legs, Upper Toning
    poolA = safeMainCandidates.filter(
      ex => ex.category === 'البطن والكرش' || ex.category === 'الظهر' || ex.tags?.some(t => ['شد الجسم', 'تنسيق', 'الخصر'].includes(t))
    );
    poolB = safeMainCandidates.filter(
      ex => ['المؤخرة', 'الساقين'].includes(ex.category || '') || ex.tags?.some(t => ['المؤخرة', 'الساقين'].includes(t))
    );
    poolC = safeMainCandidates.filter(
      ex => ['الذراعين', 'الصدر', 'الكتفين'].includes(ex.category || '')
    );
  } else if (goal === 'gain') {
    // MUSCLE GAIN / HYPERTROPHY: Compound Strength, Power Core
    poolA = safeMainCandidates.filter(
      ex => ['الصدر', 'الذراعين', 'الظهر', 'الكتفين'].includes(ex.category || '')
    );
    poolB = safeMainCandidates.filter(
      ex => ['الساقين', 'المؤخرة'].includes(ex.category || '')
    );
    poolC = safeMainCandidates.filter(
      ex => ex.category === 'البطن والكرش' || ex.category === 'الجسم بالكامل'
    );
  } else {
    // FITNESS & ENDURANCE: Cardio, Circuit, Flexibility & Core
    poolA = safeMainCandidates.filter(
      ex => ex.category === 'الكارديو' || ex.category === 'الجسم بالكامل'
    );
    poolB = safeMainCandidates.filter(
      ex => ex.category === 'البطن والكرش' || ex.category === 'الساقين'
    );
    poolC = safeMainCandidates.filter(
      ex => ['الذراعين', 'الكتفين', 'الظهر'].includes(ex.category || '')
    );
  }

  // Safety Fallbacks
  if (poolA.length === 0) poolA = safeMainCandidates;
  if (poolB.length === 0) poolB = safeMainCandidates;
  if (poolC.length === 0) poolC = safeMainCandidates;

  const workoutDaysList: WorkoutDay[] = [];

  // 6. Generate 30 Progressive Overload Days
  for (let dayNum = 1; dayNum <= 30; dayNum++) {
    // Progress factor (0.0 to 1.0)
    const monthProgress = (dayNum - 1) / 29;

    // Rest Day condition: every 5th or 6th day
    const isRestDay = dayNum % 5 === 0;

    let titleAr = '';
    let titleEn = '';
    let workoutType = '';

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
      titleAr = restTitlesAr[dayNum % restTitlesAr.length];
      titleEn = restTitlesEn[dayNum % restTitlesEn.length];
      workoutType = 'راحه واستشفاء';

      workoutDaysList.push({
        dayNumber: dayNum,
        titleAr,
        titleEn,
        exercises: [],
        difficulty: difficultyLabel,
        isRestDay: true,
        estimatedTime: 0,
        caloriesEstimate: 0,
        totalSets: 0,
        targetMuscles: ['راحة عضلية تامة'],
        restTimePerSet: 0,
        intensityLabel: 'استشفاء',
        workoutType
      });
      continue;
    }

    // Dynamic exercise count for this day (Progressive Overload)
    const targetExerciseCount = Math.min(
      maxEx,
      Math.max(minEx, Math.round(minEx + (maxEx - minEx) * monthProgress))
    );

    // Dynamic rest time between sets (decreases over 30 days)
    const restTimePerSet = Math.max(
      minRest,
      Math.round(maxRest - (maxRest - minRest) * monthProgress)
    );

    // Dynamic Sets per exercise
    const totalSets = seasonLevel >= 3 ? (dayNum > 15 ? 4 : 3) : 3;

    // Build Titles based on Goal
    if (goal === 'loss') {
      titleAr = `اليوم ${dayNum}: حرق الدهون ونحت البطن والخصر`;
      titleEn = `Day ${dayNum}: Fat Shred & Waist Sculpt`;
      workoutType = 'كارديو وحرق دهون مكثف';
    } else if (goal === 'maintain') {
      titleAr = `اليوم ${dayNum}: شد الترهلات ونحت القوام المثالي`;
      titleEn = `Day ${dayNum}: Body Toning & Posture Sculpt`;
      workoutType = 'شد وتقوية العضلات';
    } else if (goal === 'gain') {
      titleAr = `اليوم ${dayNum}: بناء العضلات القوية وتطوير القوة`;
      titleEn = `Day ${dayNum}: Muscle Hypertrophy & Strength`;
      workoutType = 'تضخيم وبناء القوة';
    } else {
      titleAr = `اليوم ${dayNum}: رفع اللياقة وقوة التحمل والمرونة`;
      titleEn = `Day ${dayNum}: Fitness, Endurance & Balance`;
      workoutType = 'تحمل ولياقة شاملة';
    }

    // 7. Assemble Non-repeating Exercise Selection
    const dayExercises: string[] = [];

    // Warmup Exercise (1)
    if (warmupPool.length > 0) {
      const warmupEx = warmupPool[(dayNum * 11 + seasonLevel * 7) % warmupPool.length];
      dayExercises.push(warmupEx.id);
    }

    // Main Exercises (targetExerciseCount - 2)
    const mainPools = [poolA, poolB, poolC];
    let attempt = 0;
    const requiredMains = targetExerciseCount - 2;

    while (dayExercises.length < requiredMains + 1 && attempt < 40) {
      const slot = dayExercises.length - 1 + attempt;
      const poolIdx = (dayNum * 13 + slot * 17 + seasonLevel * 23) % mainPools.length;
      const currentPool = mainPools[poolIdx];
      const exIdx = (dayNum * 29 + slot * 19 + seasonLevel * 37) % currentPool.length;
      const candidate = currentPool[exIdx];

      if (candidate && !dayExercises.includes(candidate.id)) {
        dayExercises.push(candidate.id);
      }
      attempt++;
    }

    // Cool-down / Stretch Exercise (1)
    if (stretchPool.length > 0) {
      const stretchEx = stretchPool[(dayNum * 7 + seasonLevel * 13) % stretchPool.length];
      if (!dayExercises.includes(stretchEx.id)) {
        dayExercises.push(stretchEx.id);
      }
    }

    // Deduplicate
    const uniqueExercises = Array.from(new Set(dayExercises));

    // 8. Scientific Dynamic Calorie & Time Calculation Engine
    // MET formula: Burn per min = (MET * 3.5 * weight) / 200
    // Adjustments: Gender (male +8%, female -6%), Age (-0.2% per year above 25)
    const genderFactor = gender === 'ذكر' ? 1.08 : 0.94;
    const ageFactor = Math.max(0.85, 1 - Math.max(0, age - 25) * 0.002);

    let totalActiveSec = 0;
    let sumMETs = 0;

    uniqueExercises.forEach(exId => {
      const ex = exerciseMap[exId];
      if (ex) {
        const dur = ex.duration || 30;
        totalActiveSec += dur * totalSets;
        
        // Approximate MET from exercise metadata
        const exMET = (ex.caloriesPerMin ? ex.caloriesPerMin * 1.2 : 6.0) + (seasonLevel * 0.5);
        sumMETs += exMET;
      }
    });

    const totalRestSec = restTimePerSet * ((uniqueExercises.length * totalSets) - 1);
    const totalSessionSec = totalActiveSec + totalRestSec;

    const avgActiveMET = uniqueExercises.length > 0 ? (sumMETs / uniqueExercises.length) : baseLevelMET;
    
    const activeMinutes = totalActiveSec / 60;
    const restMinutes = totalRestSec / 60;

    // Active CPM & Rest CPM
    const activeCPM = (avgActiveMET * 3.5 * weight / 200) * genderFactor * ageFactor;
    const restCPM = (1.8 * 3.5 * weight / 200) * genderFactor * ageFactor;

    // Session Calories Burned
    const sessionCalories = Math.round((activeCPM * activeMinutes) + (restCPM * restMinutes));
    
    // Estimated time in minutes
    const estimatedTime = Math.max(minDur, Math.round(totalSessionSec / 60));

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

    workoutDaysList.push({
      dayNumber: dayNum,
      titleAr,
      titleEn,
      exercises: uniqueExercises,
      difficulty: difficultyLabel,
      isRestDay: false,
      estimatedTime,
      caloriesEstimate: Math.max(25, sessionCalories),
      totalSets,
      targetMuscles,
      restTimePerSet,
      intensityLabel: levelIntensityLabel,
      workoutType
    });
  }

  return workoutDaysList;
};

// Default export for initial state/fallbacks
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
