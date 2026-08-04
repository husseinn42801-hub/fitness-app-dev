/**
 * Centralized Audio Configuration for Voice Coaches (Offline MP3 Audio System)
 * 
 * To update audio URLs or local MP3 file paths in the future,
 * update the arrays below without modifying application logic.
 */

export interface CoachInfo {
  id: 'female' | 'male';
  name: string; // e.g. 'كابتن أميرة' or 'كابتن حسين'
  title: string;
  emoji: string;
  previewText: string;
}

export type AudioCategory = 
  | 'preview'
  | 'get_ready'
  | 'start'
  | 'rest'
  | 'encourage'
  | 'pre_rest_end'
  | 'exercise_complete'
  | 'workout_complete'
  | 'achievement';

export const COACHES: Record<'female' | 'male', CoachInfo> = {
  female: {
    id: 'female',
    name: 'كابتن أميرة',
    title: 'كابتن أميرة (صوت أنثوي)',
    emoji: '👩',
    previewText: 'مرحبًا، أنا الكابتن أميرة، هيا بنا نجعل التمارين أسهل، وأكثر متعة.'
  },
  male: {
    id: 'male',
    name: 'كابتن حسين',
    title: 'كابتن حسين (صوت ذكوري)',
    emoji: '👨',
    previewText: 'مرحبًا، أنا الكابتن حسين، هيا بنا نجعل التمارين أسهل، وأكثر متعة.'
  }
};

/**
 * File mapping for each coach and category.
 * Supports 3 randomized variations per stage for both Amira and Hussein.
 */
export const AUDIO_FILES: Record<'female' | 'male', Record<AudioCategory, string[]>> = {
  female: {
    preview: [
      'https://pub-6eb377b9db5f49cda18c7bc16d5a1780.r2.dev/AudioCutter/preview%20Amira.mp3'
    ],
    get_ready: [
      'https://pub-6eb377b9db5f49cda18c7bc16d5a1780.r2.dev/AudioCutter/get_ready1%20Amira.mp3',
      'https://pub-6eb377b9db5f49cda18c7bc16d5a1780.r2.dev/AudioCutter/get_ready2%20Amira.mp3',
      'https://pub-6eb377b9db5f49cda18c7bc16d5a1780.r2.dev/AudioCutter/get_ready3%20Amira.mp3'
    ],
    start: [
      'https://pub-6eb377b9db5f49cda18c7bc16d5a1780.r2.dev/AudioCutter/start1%20Amira.mp3',
      'https://pub-6eb377b9db5f49cda18c7bc16d5a1780.r2.dev/AudioCutter/start2%20Amira.mp3',
      'https://pub-6eb377b9db5f49cda18c7bc16d5a1780.r2.dev/AudioCutter/start3%20Amira.mp3'
    ],
    rest: [
      'https://pub-6eb377b9db5f49cda18c7bc16d5a1780.r2.dev/AudioCutter/rest1%20Amira.mp3',
      'https://pub-6eb377b9db5f49cda18c7bc16d5a1780.r2.dev/AudioCutter/rest2%20Amira.mp3',
      'https://pub-6eb377b9db5f49cda18c7bc16d5a1780.r2.dev/AudioCutter/rest3%20Amira.mp3'
    ],
    encourage: [
      'https://pub-6eb377b9db5f49cda18c7bc16d5a1780.r2.dev/AudioCutter/encourage1%20Amira.mp3',
      'https://pub-6eb377b9db5f49cda18c7bc16d5a1780.r2.dev/AudioCutter/encourage2%20Amira.mp3',
      'https://pub-6eb377b9db5f49cda18c7bc16d5a1780.r2.dev/AudioCutter/encourage3%20Amira.mp3'
    ],
    pre_rest_end: [
      'https://pub-6eb377b9db5f49cda18c7bc16d5a1780.r2.dev/AudioCutter/encourage1%20Amira.mp3',
      'https://pub-6eb377b9db5f49cda18c7bc16d5a1780.r2.dev/AudioCutter/encourage2%20Amira.mp3',
      'https://pub-6eb377b9db5f49cda18c7bc16d5a1780.r2.dev/AudioCutter/encourage3%20Amira.mp3'
    ],
    exercise_complete: [
      'https://pub-6eb377b9db5f49cda18c7bc16d5a1780.r2.dev/AudioCutter/workout_complete1%20Amira.mp3',
      'https://pub-6eb377b9db5f49cda18c7bc16d5a1780.r2.dev/AudioCutter/workout_complete2%20Amira.mp3',
      'https://pub-6eb377b9db5f49cda18c7bc16d5a1780.r2.dev/AudioCutter/workout_complete3%20Amira.mp3'
    ],
    workout_complete: [
      'https://pub-6eb377b9db5f49cda18c7bc16d5a1780.r2.dev/AudioCutter/workout_complete1%20Amira.mp3',
      'https://pub-6eb377b9db5f49cda18c7bc16d5a1780.r2.dev/AudioCutter/workout_complete2%20Amira.mp3',
      'https://pub-6eb377b9db5f49cda18c7bc16d5a1780.r2.dev/AudioCutter/workout_complete3%20Amira.mp3'
    ],
    achievement: [
      'https://pub-6eb377b9db5f49cda18c7bc16d5a1780.r2.dev/AudioCutter/workout_complete1%20Amira.mp3',
      'https://pub-6eb377b9db5f49cda18c7bc16d5a1780.r2.dev/AudioCutter/workout_complete2%20Amira.mp3',
      'https://pub-6eb377b9db5f49cda18c7bc16d5a1780.r2.dev/AudioCutter/workout_complete3%20Amira.mp3'
    ]
  },
  male: {
    preview: [
      'https://pub-6eb377b9db5f49cda18c7bc16d5a1780.r2.dev/AudioCutter/preview%20hussein.mp3'
    ],
    get_ready: [
      'https://pub-6eb377b9db5f49cda18c7bc16d5a1780.r2.dev/AudioCutter/get_ready1%20hussein.mp3',
      'https://pub-6eb377b9db5f49cda18c7bc16d5a1780.r2.dev/AudioCutter/get_ready2%20hussein.mp3',
      'https://pub-6eb377b9db5f49cda18c7bc16d5a1780.r2.dev/AudioCutter/get_ready3%20hussein.mp3'
    ],
    start: [
      'https://pub-6eb377b9db5f49cda18c7bc16d5a1780.r2.dev/AudioCutter/start1%20hussein.mp3',
      'https://pub-6eb377b9db5f49cda18c7bc16d5a1780.r2.dev/AudioCutter/start2%20hussein.mp3',
      'https://pub-6eb377b9db5f49cda18c7bc16d5a1780.r2.dev/AudioCutter/start3%20hussein.mp3'
    ],
    rest: [
      'https://pub-6eb377b9db5f49cda18c7bc16d5a1780.r2.dev/AudioCutter/rest1%20hussein.mp3',
      'https://pub-6eb377b9db5f49cda18c7bc16d5a1780.r2.dev/AudioCutter/rest2%20hussein.mp3',
      'https://pub-6eb377b9db5f49cda18c7bc16d5a1780.r2.dev/AudioCutter/rest3%20hussein.mp3'
    ],
    encourage: [
      'https://pub-6eb377b9db5f49cda18c7bc16d5a1780.r2.dev/AudioCutter/encourage1%20hussein.mp3',
      'https://pub-6eb377b9db5f49cda18c7bc16d5a1780.r2.dev/AudioCutter/encourage2%20hussein.mp3',
      'https://pub-6eb377b9db5f49cda18c7bc16d5a1780.r2.dev/AudioCutter/encourage3%20hussein.mp3'
    ],
    pre_rest_end: [
      'https://pub-6eb377b9db5f49cda18c7bc16d5a1780.r2.dev/AudioCutter/encourage1%20hussein.mp3',
      'https://pub-6eb377b9db5f49cda18c7bc16d5a1780.r2.dev/AudioCutter/encourage2%20hussein.mp3',
      'https://pub-6eb377b9db5f49cda18c7bc16d5a1780.r2.dev/AudioCutter/encourage3%20hussein.mp3'
    ],
    exercise_complete: [
      'https://pub-6eb377b9db5f49cda18c7bc16d5a1780.r2.dev/AudioCutter/workout_complete1%20hussein.mp3',
      'https://pub-6eb377b9db5f49cda18c7bc16d5a1780.r2.dev/AudioCutter/workout_complete2%20hussein.mp3',
      'https://pub-6eb377b9db5f49cda18c7bc16d5a1780.r2.dev/AudioCutter/workout_complete3%20hussein.mp3'
    ],
    workout_complete: [
      'https://pub-6eb377b9db5f49cda18c7bc16d5a1780.r2.dev/AudioCutter/workout_complete1%20hussein.mp3',
      'https://pub-6eb377b9db5f49cda18c7bc16d5a1780.r2.dev/AudioCutter/workout_complete2%20hussein.mp3',
      'https://pub-6eb377b9db5f49cda18c7bc16d5a1780.r2.dev/AudioCutter/workout_complete3%20hussein.mp3'
    ],
    achievement: [
      'https://pub-6eb377b9db5f49cda18c7bc16d5a1780.r2.dev/AudioCutter/workout_complete1%20hussein.mp3',
      'https://pub-6eb377b9db5f49cda18c7bc16d5a1780.r2.dev/AudioCutter/workout_complete2%20hussein.mp3',
      'https://pub-6eb377b9db5f49cda18c7bc16d5a1780.r2.dev/AudioCutter/workout_complete3%20hussein.mp3'
    ]
  }
};
