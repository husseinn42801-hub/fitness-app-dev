import { Exercise, UserStats, WorkoutDay } from '../types';
import { EXERCISES_DB } from '../data/exercises';

/**
 * Interface for swap storage map: seasonId_day_X -> array of exercise IDs
 */
export type SwappedExercisesMap = Record<string, string[]>;

/**
 * Retrieve saved custom swapped exercises map from localStorage
 */
export const getSwappedExercisesMap = (): SwappedExercisesMap => {
  try {
    if (typeof localStorage !== 'undefined') {
      const raw = localStorage.getItem('roshaka_swapped_exercises');
      if (raw) {
        return JSON.parse(raw);
      }
    }
  } catch (e) {
    console.error("Failed to read swapped exercises from localStorage", e);
  }
  return {};
};

/**
 * Save a swapped exercise choice for a given season and day index into localStorage
 */
export const saveSwappedExerciseInStorage = (
  seasonId: string,
  dayNumber: number,
  exerciseIndex: number,
  newExerciseId: string,
  originalDayExercises: string[]
): string[] => {
  try {
    const map = getSwappedExercisesMap();
    const key = `${seasonId}_day_${dayNumber}`;
    
    // Start with existing saved list or fallback to default original day exercises
    const currentList = map[key] && map[key].length === originalDayExercises.length 
      ? [...map[key]] 
      : [...originalDayExercises];
    
    if (exerciseIndex >= 0 && exerciseIndex < currentList.length) {
      currentList[exerciseIndex] = newExerciseId;
    }

    map[key] = currentList;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('roshaka_swapped_exercises', JSON.stringify(map));
    }
    return currentList;
  } catch (e) {
    console.error("Failed to save swapped exercise into localStorage", e);
    return originalDayExercises;
  }
};

/**
 * Calculate calories for an exercise dynamically based on user parameters
 */
export const calculateExerciseCalories = (
  exercise: Exercise,
  userStats?: UserStats
): number => {
  const weight = userStats?.weight || 70;
  const activityLevel = userStats?.activityLevel || 1.375;
  const durationInSec = exercise.duration || 30;
  const durationInMin = durationInSec / 60;
  
  const baseRate = exercise.caloriesPerMin || 6;
  const weightFactor = weight / 70;
  const activityFactor = activityLevel / 1.375;
  
  const total = baseRate * durationInMin * weightFactor * activityFactor;
  return Math.max(1, Math.round(total));
};

/**
 * Recalculate total session calories and total time for a WorkoutDay
 */
export const recalculateWorkoutDayTotals = (
  day: WorkoutDay,
  userStats?: UserStats
): WorkoutDay => {
  const exercises = day.exercises
    .map(id => EXERCISES_DB[id])
    .filter((ex): ex is Exercise => Boolean(ex));

  if (exercises.length === 0) return day;

  // Calculate total calories across all sets
  const totalSets = day.totalSets || 3;
  const totalCaloriesOneSet = exercises.reduce((sum, ex) => sum + calculateExerciseCalories(ex, userStats), 0);
  const totalCaloriesAllSets = totalCaloriesOneSet * totalSets;

  // Calculate total time in minutes (exercise time + rest time)
  const totalExerciseSecOneSet = exercises.reduce((sum, ex) => sum + (ex.duration || 30), 0);
  const restSecPerSet = day.restTimePerSet || 15;
  const totalRestSecOneSet = exercises.length * restSecPerSet;
  const totalSecAllSets = (totalExerciseSecOneSet + totalRestSecOneSet) * totalSets;
  const estimatedTimeMin = Math.max(5, Math.round(totalSecAllSets / 60));

  return {
    ...day,
    caloriesEstimate: totalCaloriesAllSets,
    estimatedTime: estimatedTimeMin
  };
};

/**
 * Smart Recommendation Engine for Exercise Swap
 * Selects an ideal alternative exercise based on:
 * 1. User Goal ('loss' / 'maintain' / 'gain' / 'fitness')
 * 2. Target Muscle / Muscle Group matching original exercise
 * 3. User Activity Level
 * 4. Current Season / Level Difficulty
 * 5. Non-repetition (Excludes current & already chosen swap IDs)
 */
export const getAlternativeExercise = (
  currentExercise: Exercise,
  userStats: UserStats,
  seasonId: string,
  usedExerciseIdsInDay: string[] = []
): Exercise => {
  const allExercises = Object.values(EXERCISES_DB);
  const goal = userStats?.goal || 'loss';
  const activityLevel = userStats?.activityLevel || 1.375;

  // Determine Level (1, 2, 3, or 4)
  let seasonLevel = 1;
  if (seasonId.includes('season_2') || seasonId.endsWith('2') || seasonId.includes('level_2')) seasonLevel = 2;
  else if (seasonId.includes('season_3') || seasonId.endsWith('3') || seasonId.includes('level_3')) seasonLevel = 3;
  else if (seasonId.includes('season_4') || seasonId.endsWith('4') || seasonId.includes('level_4')) seasonLevel = 4;

  // Candidate Exclusion: Filter out current exercise and all exercises already used in this day session
  const candidates = allExercises.filter(ex => 
    ex.id !== currentExercise.id && !usedExerciseIdsInDay.includes(ex.id)
  );

  // Fallback pool if all candidates were excluded
  const poolToUse = candidates.length > 0 
    ? candidates 
    : allExercises.filter(ex => ex.id !== currentExercise.id);

  // Helper to check target muscle similarity
  const isAbsOrCore = (ex: Exercise) => {
    const cat = ex.category || '';
    const target = ex.targetMuscle || '';
    const grp = ex.muscleGroup || '';
    return cat.includes('بطن') || cat.includes('كرش') || target.includes('بطن') || target.includes('خصر') || grp.includes('بطن');
  };

  const isChest = (ex: Exercise) => {
    return (ex.category || '').includes('صدر') || (ex.targetMuscle || '').includes('صدر');
  };

  const isBack = (ex: Exercise) => {
    return (ex.category || '').includes('ظهر') || (ex.targetMuscle || '').includes('ظهر');
  };

  const isLegs = (ex: Exercise) => {
    return (ex.category || '').includes('ساق') || (ex.category || '').includes('فخذ') || (ex.targetMuscle || '').includes('ساق') || (ex.targetMuscle || '').includes('فخذ') || (ex.muscleGroup || '').includes('سفلي');
  };

  const isArmsShoulders = (ex: Exercise) => {
    return (ex.category || '').includes('ذراع') || (ex.category || '').includes('كتف') || (ex.targetMuscle || '').includes('ذراع') || (ex.targetMuscle || '').includes('كتف');
  };

  // Activity Level difficulty preference
  const preferredDifficulties: string[] = [];
  if (activityLevel <= 1.25) {
    preferredDifficulties.push('مبتدئ');
  } else if (activityLevel <= 1.45) {
    preferredDifficulties.push('مبتدئ', 'متوسط');
  } else if (activityLevel <= 1.65) {
    preferredDifficulties.push('متوسط');
  } else {
    preferredDifficulties.push('متوسط', 'متقدم', 'احترافي');
  }

  // Season level difficulty preference
  if (seasonLevel === 1 && !preferredDifficulties.includes('مبتدئ')) {
    preferredDifficulties.unshift('مبتدئ');
  } else if (seasonLevel >= 3 && !preferredDifficulties.includes('متقدم')) {
    preferredDifficulties.push('متقدم');
  }

  // Score each candidate exercise
  const scored = poolToUse.map(ex => {
    let score = 0;

    // 1. Goal Alignment
    if (goal === 'loss') {
      // Goal 1: Fat Loss & Belly Shredding
      if (isAbsOrCore(ex) || ex.category === 'الكارديو' || ex.category === 'الإحماء') {
        score += 350;
      }
    } else if (goal === 'maintain') {
      // Goal 2: Toning & Waist Perfection
      if (isAbsOrCore(ex) || ex.category === 'الخصر' || (ex.targetMuscle || '').includes('خصر') || ex.category === 'الجزء السفلي والفخذين') {
        score += 350;
      }
    } else {
      // Goal 3 & 4: Muscle Building & Strength
      // Prioritize matching the exact body region of currentExercise
      if (isChest(currentExercise) && isChest(ex)) score += 400;
      else if (isBack(currentExercise) && isBack(ex)) score += 400;
      else if (isLegs(currentExercise) && isLegs(ex)) score += 400;
      else if (isArmsShoulders(currentExercise) && isArmsShoulders(ex)) score += 400;
      else if (isAbsOrCore(currentExercise) && isAbsOrCore(ex)) score += 400;
    }

    // 2. Exact or Related Muscle Group Match
    if (ex.targetMuscle && currentExercise.targetMuscle && ex.targetMuscle === currentExercise.targetMuscle) {
      score += 450; // Exact target muscle match
    } else if (ex.bodyPart && currentExercise.bodyPart && ex.bodyPart === currentExercise.bodyPart) {
      score += 300; // Same body part
    } else if (ex.muscleGroup === currentExercise.muscleGroup) {
      score += 200; // Same muscle group category
    }

    // 3. Category Match
    if (ex.category && currentExercise.category && ex.category === currentExercise.category) {
      score += 200;
    }

    // 4. Difficulty match
    if (ex.difficulty === currentExercise.difficulty) {
      score += 250;
    } else if (preferredDifficulties.includes(ex.difficulty)) {
      score += 150;
    }

    // 5. Duration Proximity Match (prefer similar duration)
    const durationDiff = Math.abs((ex.duration || 30) - (currentExercise.duration || 30));
    if (durationDiff === 0) score += 100;
    else if (durationDiff <= 15) score += 50;

    return { exercise: ex, score };
  });

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);

  // Return top scoring exercise, ensuring fallback
  return scored[0]?.exercise || allExercises[0];
};
